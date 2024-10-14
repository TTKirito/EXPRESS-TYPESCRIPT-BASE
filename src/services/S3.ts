import AWS from "aws-sdk";
import { IS3 } from "./types/interface/S3";
import { TS3 } from "./types/type/S3";

export default class S3 implements IS3<TS3> {
  static instance: S3;

  static getInstance() {
    if (!S3.instance) {
      S3.instance = new S3();
    }
    return S3.instance;
  }

  private s3: any;
  private bucket: string;
  private signedUrlExpireSeconds: number;

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION,
    });
    this.s3 = new AWS.S3();
    this.bucket = process.env.S3_BUCKET_NAME as string;
    this.signedUrlExpireSeconds =
      Number(process.env.S3_SIGNED_URL_TIMEOUT) || 10;
  }

  getUrlStorage<I extends { key: string; type: string }>({
    key,
    type,
  }: I): object {
    return this.s3.getSignedUrl("putObject", {
      Bucket: this.bucket,
      Key: key,
      ContentType: type,
      ACL: "public-read",
      Expires: this.signedUrlExpireSeconds,
    });
  }

  upload<I extends { body: any; name: string; type: string }>({
    body,
    name,
    type,
  }: I) {
    const params = {
      Body: body,
      Bucket: this.bucket,
      ContentType: type,
      Key: name,
      ACL: "public-read",
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(params, {}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
