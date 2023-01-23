import mongoose from "mongoose";

export async function connectDb(urL: string): Promise<void> {
  mongoose.set("strictQuery", true);

  await mongoose.connect(urL);
}
