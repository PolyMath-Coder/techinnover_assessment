import { Injectable, InjectableOptions } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { extname } from 'path';
import { cloudinaryConfig } from '../config/cloudinary.config';

@Injectable()
export class FileUploadService {
  private cloudinaryUploadService: typeof cloudinary.uploader;

  constructor() {
    cloudinary.config(cloudinaryConfig);
    this.cloudinaryUploadService = cloudinary.uploader;
  }

  uploadImage(imageFile: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinaryUploadService.upload_stream(
        {},
        (error: Error, result: UploadApiResponse) => {
          if (result) resolve(result.secure_url);
          else reject(error);
        },
      );
      streamifier.createReadStream(imageFile.buffer).pipe(uploadStream);
    });
  }
}
