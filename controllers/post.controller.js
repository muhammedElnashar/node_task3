import { v4 as uuid } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import {loadData, saveData} from "../utils/helpers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFilePath = path.join(__dirname,"post.json");
let posts = [];
posts = loadData(dbFilePath);


export const getAllPosts = (req, res) => {

  const { query } = req;

  if (Object.keys(query).length > 0) {
    const filterdPosts = posts.filter((ele) => ele.age == query.age);
    res.status(200).json({ filterdPosts });
  }
  return res.status(200).json({ posts })
};                                            

export const getPostById = (req, res) => {
  const { id } = req.params;
  const post = posts.find((ele) => ele.id === id);
  res.status(200).json({ post: post });
};

export const createPost = (req, res) => {
  const { body } = req;
  if (Object.keys(body).length === 0) {
    return res.status(404).json({ message: "data required" });
  }
  const id = uuid();
  posts.push({ id, ...body });
  saveData(dbFilePath,posts);
  res.status(201).json({ posts });
};

export const updatePost = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const index = posts.findIndex((ele) => ele.id === id);
  if (index === -1) {
    res.status(404).json({ message: "no post found" });
  }
  posts[index] = {
    ...posts[index],
    ...body,
  };
  saveData(dbFilePath,posts);

  res.status(200).json({ post: posts[index] });
};

export const deletePost = (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex((ele) => ele.id === id);
  posts.splice(index, 1);
  saveData(dbFilePath,posts);
  res.status(200).json({ post: posts });
};
