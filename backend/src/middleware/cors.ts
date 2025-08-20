import cors from "cors";

const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-user-address"],
  credentials: true
};

export default corsOptions;
