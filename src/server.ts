import express from "express";
import process from "node:process";
import cors from "cors";

import { env } from "./config/env";
import { connectDb } from "./lib/mongodb";
import { postRoutes } from "./routes/post-routes";
import { dalleRoutes } from "./routes/dalle-routes";

const app = express();

app.use(cors({ origin: [env.clientHost] }));
app.use(express.json({ limit: "50mb" }));

//routes
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

async function start() {
  try {
    await connectDb(env.mongoUrl);

    app.listen(env.port, () =>
      console.log(`Server running on port ${env.port}`)
    );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

start();
