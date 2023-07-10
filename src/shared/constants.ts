import { config } from 'dotenv';
config();

export const enum GlobalRoute {
  PREFIX = 'api',
}

export const enum DroneRoute {
  REGISTER = 'register',
  LOAD_MEDICATION = 'load/medication',
  CHECK_DRONE_ITEMS = 'check/items/:droneId',
  CHECK_AVAILABLE_DRONES = '/available/all',
  CHECK_BATTERY_LEVEL = 'battery/check',
}

export const cloudinaryParams = {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  API_KEY: process.env.CLOUDINARY_API_KEY || '',
  API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
};
