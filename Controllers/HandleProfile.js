import db from "../db/Database.js";

const HandleProfile = (request, response) => {
  const { id } = request.params;

  db.select("*")
    .from("users")
    .where({
      id: id,
    })
    .then((allUsers) => {
      if (allUsers.length > 0) {
        response.send(allUsers[0]);
      }
    });
};

export default HandleProfile;
