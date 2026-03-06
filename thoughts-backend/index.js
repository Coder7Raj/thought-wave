dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import thoughtRouter from "./routes/thought.routes.js";
import userRouter from "./routes/user.routes.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/thought", thoughtRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
