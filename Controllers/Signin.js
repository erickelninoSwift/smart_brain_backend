import db from "../db/Database.js";
import bcrypt from "bcrypt";

const checkPassword = (passwordUser, passowrdHansed) => {
  return bcrypt.compareSync(passwordUser, passowrdHansed);
};

const HandleSignin = (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(400).json("Incorrect data entreed");
  }
  db.select("email", "hash")
    .from("login")
    .where({ email: request.body.email })
    .then((userFound) => {
      const result = checkPassword(request.body.password, userFound[0].hash);
      if (result) {
        db.select("*")
          .from("users")
          .where({
            email: request.body.email,
          })
          .then((userSelected) => {
            response.json(userSelected[0]);
          })
          .catch((error) => {
            return response
              .status(400)
              .json("user details couldnt be found ", error);
          });
      } else {
        response.json("User not found");
      }
    })
    .catch((err) => response.status(400).json("user not found "));
};

export default HandleSignin;
