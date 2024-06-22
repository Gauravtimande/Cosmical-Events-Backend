import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { isDBConnected } from "./config/db.config";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import { userRouter } from "./routes/User-router";
import { VendorServiceRouter } from "./routes/VendorService-routers";
import { adminRouter } from "./routes/Admin-routers"

const app = express();
console.log('process.env.NODE_ENV--->',process.env.NODE_ENV)
// app.use(express.static('build'))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
isDBConnected();

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(loggerMiddleware);

// API routes
app.use("/api/v1/User", userRouter);
app.use("/api/v1/Vendor", VendorServiceRouter);
app.use("/api/v1/adminRoutes",adminRouter)

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

export default app;
