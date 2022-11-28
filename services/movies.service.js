import { client } from "../index.js";

export async function UpdateMovieByid(id, data) {
  return await client
    .db("b38wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}

export async function deleteMovieById(id) {
  return await client.db("b38wd").collection("movies").deleteOne({ id: id });
}

export async function createMovies(data) {
  return await client.db("b38wd").collection("movies").insertMany(data);
}

export async function getMovieById(id) {
  return await client.db("b38wd").collection("movies").findOne({ id: id });
}

export async function getAllMovies(request) {
  return await client
    .db("b38wd")
    .collection("movies")
    .find(request.query)
    .toArray();
}
