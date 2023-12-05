import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname=path.dirname(fileURLToPath(import.meta.url));
// setup the logger
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));

//Create server
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`Server is online! (Port:${port})`);
});

//Requests
app.get("/", (req, res) => {
  res.render("index.ejs");
  console.log(__dirname);
});
app.post("/submit", (req, res) => {
  const letterName = req.body["fName"].length + req.body["lName"].length;
  res.render("index.ejs", { letterNumber: letterName });
});
