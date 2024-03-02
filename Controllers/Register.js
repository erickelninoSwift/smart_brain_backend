import bcrypt, { hash } from "bcrypt";
import db from "../db/Database.js";

const passwordHashing = (saltRounds, myPlaintextPassword) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(myPlaintextPassword, salt);
  return hash;
};

const HandleRegister = (request, response) => {
  const { email, password, name, entries } = request.body;

  if (email && password && name) {
    console.log("fields should not be left empty");

    const hashedPassword = passwordHashing(1, password);

    db.transaction((trx) => {
      return trx
        .insert({
          hash: hashedPassword,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((userEmail) => {
          trx("users")
            .insert({
              entries: entries,
              email: email,
              name: name,
              joined: new Date().getDate(),
            })
            .returning("*")
            .then((user) => {
              response.json(user);
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .catch((err) => {
          console.log("error while registering the user", err);
        });
    });
  }
};

export default HandleRegister;
