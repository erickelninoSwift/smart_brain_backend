import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "erickelnino",
    password: "",
    database: "smart_brain",
  },
});

export default db;
