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

  uploadImage(file: Express.Multer.File): Promise<string> {
    return;
  }
}
