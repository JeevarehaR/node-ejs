import express from "express";
import { client } from "../index.js";
const router = express.Router();

router.get("/", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  console.log(request.query);
  const movies = await client
    .db("b38wd")
    .collection("movies")
    .find(request.query)
    .toArray();
  response.send(movies);
  console.log("movie is loaded successfully");
});

router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await client.db("b38wd").collection("movies").insertMany(data);
  response.send(result);
});

router.get("/:id", async function (request, response) {
  const { id } = request.params;
  //   console.log(request.params, id);
  //   const movie = movies.find((mv) => mv.id === id);
  const movie = await client
    .db("b38wd")
    .collection("movies")
    .findOne({ id: id });
  movie
    ? response.send(movie)
    : response.status(404).send({ msg: "movie not found" });
});

router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  const movie = await client
    .db("b38wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ msg: "movie not found" });
});

router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client
    .db("b38wd")
    .collection("movies")
    .deleteOne({ id: id });
  console.log(result);
  result.deletedCount > 0
    ? response.send({ msg: "movie deleted successfully 🔥🔥" })
    : response.status(404).send({ msg: "movie not found" });
});

export default router;