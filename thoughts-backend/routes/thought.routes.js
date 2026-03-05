import express from "express";
import {
  addThought,
  getAllThoughts,
} from "../controllers/thought.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";

const thoughtRouter = express.Router();

// POST: Add a thought (auth + optional image)
// thoughtRouter.post("/add_thought", isAuth, upload.single("image"), addThought);
thoughtRouter.post("/add_thought", isAuth, upload.single("image"), addThought);
thoughtRouter.get("/get_thoughts", isAuth, getAllThoughts);

// Test route
// thoughtRouter.get("/test", (req, res) => {
//   res.send("Thought route working");
// });
// thoughtRouter.get("/test", (req, res) => {
//   res.send("Thought route working");
// });

export default thoughtRouter;
