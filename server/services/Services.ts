import { unlinkSync, existsSync } from "fs";
import { resolve } from "path";

export class Services {
  static deleteFile(path: string) {
    if (existsSync(resolve(path))) {
      unlinkSync(resolve(path));
    }
  }
}
