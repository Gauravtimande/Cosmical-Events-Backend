"use strict";
require("dotenv").config();
require("@babel/polyfill");
require("@babel/register");
const app = require("./app").default;
const path = require("path")
const http = require("http");
const server = http.createServer(app);
const env = process.env.NODE_ENV || "local";
const envData = require(path.join(__dirname, "./config", `${env}.config`));

if (process.env.NODE_ENV === "production") {
    const https = require("https")
    // const http = require("http")
    // const fs = require("fs")
    // // var https_options = {
    // //   key: fs.readFileSync("/home/ubuntu/SSL/STAR_replybot_ai.key"),
    // //   cert: fs.readFileSync("/home/ubuntu/SSL/STAR.replybot.ai.crt"),
    // //   ca: [
    // //     fs.readFileSync('/home/ubuntu/SSL/STAR.replybot.ai.p7b'),
    // //     fs.readFileSync('/home/ubuntu/SSL/STAR.replybot.ai.ca-bundle')
    // //   ]
    // // }
    // https.createServer(https_options, app).listen(443);
    // https.createServer(https_options, app).on("listening", () => { console.log(`Server running on ${process.env.NODE_ENV} mode on port 443`.yellow.bold) });
    //  const http = require("http")
     const PORT = envData.config?.port
    http.createServer(app).listen(process.env.PD_PORT);
    server.on("listening", () => { console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`) });
} else {
    const http = require("http")
    const PORT = envData.config?.port
    http.createServer(app).listen(5000);
    server.on("listening", () => { console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`) });
}