import bcrypt, { hash } from "bcrypt";
import db from "../db/Database.js";
// const saltRounds = 2;
// const myPlaintextPassword = "s0//P4$$w0rD";

const passwordHashing = (saltRounds, myPlaintextPassword) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(myPlaintextPassword, salt);
  return hash;
};

const HandleRegister = (request, response) => {
  const { email, password, name } = request.body;
  if (!email || !password || !name) {
    return response.json("Incorrect format ");
  }
  const hashedPassword = passwordHashing(1, password);
  // const isRightPassword = checkPassword(password);
  // console.log(isRightPassword);
  db.transaction((trx) => {
    return trx
      .insert({
        hash: hashedPassword,
        email: email,
      })
      .into("login")
      .returning("*")
      .then((currentUser) => {
        return trx("users")
          .returning("*")
          .insert({
            email: currentUser[0].email,
            name: name,
            joined: new Date().getDay(),
          })
          .then((user) => {
            response.json(user[0]);
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .catch((err) => res.status(400).json("unable to register", err));
  });
};

export default HandleRegister;
