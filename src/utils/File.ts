import moment from "moment";
import path from "path";
import slugify from "slugify";
import { IFile } from "./types/interface";
import { TDetailFile, TFile } from "./types/type";

export class File implements IFile<TFile, TDetailFile> {
  getDetailFile<
    I extends {
      type: string;
      fileName: string;
      folderPrefix?: string | undefined;
    }
  >({ fileName, type, folderPrefix }: I): TDetailFile {
    const { ext } = path.parse(fileName);
    let { name } = path.parse(fileName);
    name = `${slugify(name, { lower: true })}-${moment().format(
      "YYYYMMDDHHmmssSS"
    )}`;
    return { folderPrefix, fileName, ext, type, name };
  }
}
