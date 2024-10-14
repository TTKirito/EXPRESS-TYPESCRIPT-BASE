import { GENERATE_STRING_ENUM } from "./types/enum";
import { IHeper } from "./types/interface";
import { THepler, ValidateGenerateRanString } from "./types/type";

export class Helper implements IHeper<THepler> {
  static instance: Helper;

  static getInstance() {
    if (!Helper.instance) {
      Helper.instance = new Helper();
    }
    return Helper.instance;
  }

  generateRandStr<
    I extends { length: number; type?: GENERATE_STRING_ENUM | undefined }
  >({ type = GENERATE_STRING_ENUM.MIX, length }: I): { token: string } {
    let characters: string = "";

    if (type === GENERATE_STRING_ENUM.MIX) {
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    } else if (type === GENERATE_STRING_ENUM.NUMERIC) {
      characters = "0123456789";
    } else if (type === GENERATE_STRING_ENUM.MIXIGNORECASE) {
      characters =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
    }

    let result: string = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return { token: result };
  }

  capitalizeFirstLetter<I extends { str: string }>({ str }: I): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
