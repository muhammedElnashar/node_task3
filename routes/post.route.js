import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/post.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

export const postRoute = Router();

postRoute.get("/",auth,getAllPosts);

postRoute.get("/:id",auth, getPostById);

postRoute.post("/create",auth,createPost );

postRoute.patch("/update/:id",auth, updatePost);

postRoute.delete("/delete/:id",auth,deletePost);
