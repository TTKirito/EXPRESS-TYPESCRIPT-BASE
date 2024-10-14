import { TIS3 } from "../type/S3";

export interface IS3<U extends TIS3> {
  getUrlStorage<I extends U["TGetURl"]>(payload: I): object;
  upload<I extends U["TUpload"]>(payload: I): any;
}
