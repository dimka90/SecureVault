import express from "express";
import * as dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import vaultRecoveryRouter from "./routes/recovery";

import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/errorHandler";
import routes from "./routes"; 
import sequelize from "./config/sequelize";
import vaultRouter from "./routes/vault";
import trusteeRouter from "./routes/trusteeRecovery";
import CronScheduler from "./services/cronSchedular";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet()); 
app.use(cors({
  origin: ["http://example.com", "http://anotherdomain.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later."
  }
});
app.use(limiter);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}
app.use("/api/recovery", vaultRecoveryRouter);
app.use("/api/vaults", vaultRouter);
app.use("/api/trustee-recovery", trusteeRouter);
app.use("/api", routes);


app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log(" Database connection established successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`API Health Check: http://localhost:${PORT}/api/health`);
      CronScheduler.startScheduler();
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
}

process.on("unhandledRejection", (err: Error) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});
process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  CronScheduler.stopScheduler();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  CronScheduler.stopScheduler();
  process.exit(0);
});




startServer();