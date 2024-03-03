import db from "../db/Database.js";

const HandleImage = (request, response) => {
  const { id } = request.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      response.json(entries[0].entries);
    })
    .catch((error) => {
      console.log("error was found", error);
    });
};

export default HandleImage;
