import db from "../db/Database.js";

const HandleImage = (request, response) => {
  const { id } = request.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      response.send(entries[0].entries);
    })
    .catch((error) => {
      response.status(400).json("Error while getting users", error);
    });
};

export default HandleImage;
