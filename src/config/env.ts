import "dotenv/config";

const env = {
  clientHost: process.env.CLIENT as string,
  port: Number(process.env.PORT) ?? 3333,
  mongoUrl: process.env.MONGO_URL as string,
  openAiApiKey: process.env.OPENAI_API_KEY as string,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY as string,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET as string,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
};

export { env };
