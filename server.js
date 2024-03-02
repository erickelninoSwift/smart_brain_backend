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

const PORT = process.env.PORT;

app.use(bodyParser.json());

app.get(
  "https://jackpot-ai-application-backend.onrender.com/",
  (request, response) => {
    response.send("Application running very well");
  }
);
app.post(
  "https://jackpot-ai-application-backend.onrender.com/signin",
  HandleSignin
);
app.post(
  "https://jackpot-ai-application-backend.onrender.com/register",
  HandleRegister
);
app.get(
  "https://jackpot-ai-application-backend.onrender.com/profile/:id",
  HandleProfile
);
app.put(
  "https://jackpot-ai-application-backend.onrender.com/image",
  HandleImage
);
app.post(
  "https://jackpot-ai-application-backend.onrender.com/imageaddress",
  HandleAPIcall
);

app.listen(PORT, () => {
  console.log("Server is Running on PORT ", PORT);
});
