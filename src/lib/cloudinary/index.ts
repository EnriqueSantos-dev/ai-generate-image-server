import { v2 } from "cloudinary";
import { env } from "../../config/env";

v2.config({
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret,
});

export { v2 as cloudinary };
