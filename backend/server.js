import path from "path";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import prodRoutes from "./routes/prodRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";


const __dirname = path.resolve();
dotenv.config({ path: "./.env" });

if (process.env.NODE_ENV === undefined) {
  dotenv.config({ path: "./.env" });
}

connectDB();

const app = express();

// Body parser
app.use(express.json());

// CORS
app.use(
  cors({
    origin: "*",
  })
);
// API routes
app.use("/api/user", userRoutes);
app.use("/prod",prodRoutes)



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
  )
);
