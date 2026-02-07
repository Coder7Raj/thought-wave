import express from "express";
import { addThought } from "../controllers/thought.controller.js";
import { upload } from "../middlewares/multer.js";

const thoughtRouter = express.Router();

thoughtRouter.post("/add_thought", upload.single("image"), addThought);

export default thoughtRouter;
