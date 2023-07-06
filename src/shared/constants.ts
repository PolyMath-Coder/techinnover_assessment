import { config } from 'dotenv';
config();

export const enum GlobalRoute {
  PREFIX = 'api',
}

export const cloudinaryParams = {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  API_KEY: process.env.CLOUDINARY_API_KEY || '',
  API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
};
