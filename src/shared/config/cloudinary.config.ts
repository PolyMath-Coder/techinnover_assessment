import { cloudinaryParams } from '../constants';
import { v2 } from 'cloudinary';

export const cloudinaryConfig = v2.config({
  cloud_name: cloudinaryParams.CLOUD_NAME,
  api_key: cloudinaryParams.API_KEY,
  api_secret: cloudinaryParams.API_SECRET,
});
