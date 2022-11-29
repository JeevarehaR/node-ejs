import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function UpdateMovieByid(id, data) {
  return await client
    .db("b38wd")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}

export async function deleteMovieById(id) {
  return await client
    .db("b38wd")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}

export async function createMovies(data) {
  return await client.db("b38wd").collection("movies").insertMany(data);
}

export async function getMovieById(id) {
  console.log(id);
  return await client
    .db("b38wd")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}

export async function getAllMovies(request) {
  return await client
    .db("b38wd")
    .collection("movies")
    .find(request.query)
    .toArray();
}
