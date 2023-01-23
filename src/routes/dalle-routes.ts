import { Router } from "express";
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import { env } from "../config/env";

const router = Router();

const openAiConfig = new Configuration({
  apiKey: env.openAiApiKey,
});

const openAi = new OpenAIApi(openAiConfig);

router.post("/generate", async (req, res) => {
  const promptSchema = z.object({
    prompt: z.string().min(1),
  });

  try {
    const { prompt } = promptSchema.parse(req.body);

    const aiResponse = await openAi.createImage({
      prompt,
      response_format: "b64_json",
      n: 1,
      size: "1024x1024",
    });

    const image = aiResponse.data.data[0].b64_json;

    return res.status(200).json({ photo: image });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.issues });
    }

    if (err?.data?.response?.data?.error?.message) {
      return res
        .status(400)
        .json({ error: err.data.response.data.error.message });
    }

    return res.status(500).send("Internal Server Error");
  }
});

export { router as dalleRoutes };
