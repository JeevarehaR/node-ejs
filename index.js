// const express = require("express"); --> type : "commonjs" //older syntax
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import moviesRouter from "./routes/movies.route.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";

dotenv.config();
console.log(process.env.MONGO_URL);
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}
export const client = await createConnection();
app.use(cors());

app.use(express.json());

app.get("/", function (request, response) {
  response.send("Hello 🙋‍♂️, 🌏🎊✨🤩 Welcome to movies App!");
});

app.get("/mobiles", async function (request, response) {
  const mobiles = await client
    .db("b38wd")
    .collection("mobiles")
    .find({})
    .toArray();
  response.send(mobiles);
});
app.post("/mobiles", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await client
    .db("b38wd")
    .collection("mobiles")
    .insertMany(data);
  response.send(result);
});

app.use("/movies", moviesRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
