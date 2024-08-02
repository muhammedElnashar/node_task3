import express from "express";
import { userRoute } from "./routes/user.route.js";
import { error } from "./middlewares/error.middleware.js";
import { postRoute } from "./routes/post.route.js";

const app = express();

const PORT = 5200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/post",postRoute);

app.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

app.use(error);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
// cors: {
//   [];
// }

// front end application host a server my.app.com ==> my.backserver.com/user/list

// backend application host a server my.backserver.com
