import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
} from "../controllers/user.controller.js";

export const userRoute = Router();

userRoute.get("/",getAllUsers);

userRoute.get("/:id", getUserById);

userRoute.post("/create", createUser);

userRoute.post("/login", login);

userRoute.patch("update/:id", updateUser);

userRoute.delete("dalete/:id", deleteUser);
