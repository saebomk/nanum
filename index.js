import "core-js";
import express from "express";

const app = express();
const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on localhost:${PORT}`);
};

const handleHome = (req, res) => {
  console.log(req);
  res.send("Hello from home!");
};

const handleProfile = (req, res) => {
  console.log(req);
  res.send("This is my profile!");
};

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
