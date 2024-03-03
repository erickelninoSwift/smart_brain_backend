import express, { response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import HandleRegister from "./Controllers/Register.js";
import HandleSignin from "./Controllers/Signin.js";
import HandleProfile from "./Controllers/HandleProfile.js";
import HandleImage from "./Controllers/HandleImage.js";
import HandleAPIcall from "./Controllers/HandleAPicall.js";
dotenv.config();
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.send("Application running very well");
});
app.post("/signin", HandleSignin);
app.post("/register", HandleRegister);
app.get("/profile/:id", HandleProfile);
app.put("/image", HandleImage);
app.post("/imageaddress", HandleAPIcall);

app.listen(PORT, () => {
  console.log("Server is Running on PORT ", PORT);
});
