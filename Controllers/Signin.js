import db from "../db/Database.js";
import bcrypt from "bcrypt";

const checkPassword = (passwordUser, passowrdHansed) => {
  return bcrypt.compareSync(passwordUser, passowrdHansed);
};

const HandleSignin = (request, response) => {
  db.select("email", "hash")
    .from("login")
    .where({ email: request.body.email })
    .then((userFound) => {
      const result = checkPassword(request.body.password, userFound[0].hash);
      if (result && userFound.length > 0) {
        db.select("*")
          .from("users")
          .where({
            email: userFound[0].email,
          })
          .then((userSelected) => {
            response.send(userSelected[0]);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    })
    .catch((err) => console.log("error ", err));
};

export default HandleSignin;
