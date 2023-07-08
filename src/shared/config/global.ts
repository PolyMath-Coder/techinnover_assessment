import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export class GlobalUtil {
  static validateDocumentMimeType = (regex: RegExp) => {
    return (
      _fieldName: string,
      file: Express.Multer.File,
      cb: (error: Error, acceptFile: boolean) => void,
    ) => {
      if (!file.mimetype.match(regex)) {
        cb(
          new BadRequestException(
            `Unsupported file type "${extname(
              file.originalname,
            )}" for verification document`,
          ),
          false,
        );
      } else {
        cb(null, true);
      }
    };
  };
}
