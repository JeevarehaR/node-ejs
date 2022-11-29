import bcrypt from "bcrypt";
import express from "express";
import { createUser, getUserByName } from "../services/user.service.js";
import jwt from "jsonwebtoken";
const router = express.Router();

async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword;
}

// generateHashedPassword();

router.post("/signup", async function (request, response) {
  const { username, password } = request.body;
  // console.log(data);
  const userFromDB = await getUserByName(username);
  if (userFromDB) {
    response.status(400).send({ message: "Username already exists" });
  } else if (password.length < 8) {
    response
      .status(400)
      .send({ message: "Password should be atleast 8 characters!" });
  } else {
    const hashedPassword = await generateHashedPassword(password);
    const result = await createUser({
      username: username,
      password: hashedPassword,
    });
    response.send(result);
  }
});

router.post("/login", async function (request, response) {
  const { username, password } = request.body;
  // console.log(data);
  const userFromDB = await getUserByName(username);
  if (!userFromDB) {
    response.status(401).send({ message: "Invalid Credentials" });
  } else {
    const storedDBPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password, storedDBPassword);
    if (isPasswordMatch) {
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
      response.send({ message: "Sucessful login", token: token });
    } else {
      response.status(401).send({ message: "Invalid Credentials" });
    }
  }
});

export default router;
