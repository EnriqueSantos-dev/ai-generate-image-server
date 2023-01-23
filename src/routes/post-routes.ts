import { Router } from "express";
import { cloudinary } from "../lib/cloudinary";
import { PostModel } from "../models/post";
import { z } from "zod";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find();

    const postsMapped = posts.map((post) => ({
      id: post._id,
      name: post.name,
      prompt: post.prompt,
      photo: post.photo,
    }));

    return res.status(200).json({ posts: postsMapped });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  const createPostSchema = z.object({
    name: z.string().min(1),
    prompt: z.string().min(1),
    photo: z.string().min(1),
  });

  try {
    const { photo, prompt, name } = createPostSchema.parse(req.body);

    const photoUrl = await cloudinary.uploader.upload(photo);

    await PostModel.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(201).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }

    res.status(500).send("Internal Server Error");
  }
});
export { router as postRoutes };
