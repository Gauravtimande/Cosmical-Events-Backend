import path from "path";
import express from "express";
import bodyParser from "body-parser"
import cors from "cors";
import { isDBConnected } from "./config/db.config";
import loggerMiddleware from "./middlewares/loggerMiddleware";

import { userRouter } from "./routes/User-router";
import { VendorServiceRouter } from "./routes/VendorService-routers";

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.use(forceSsl());
app.use(cors());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
isDBConnected()


const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(loggerMiddleware);

app.use("/api/v1/User", userRouter)
app.use("/api/v2/Vendor",VendorServiceRouter)


if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
  app.use(express.static(path.join(__dirname, "frontend")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
  });
}
else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

export default app;
