import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const db = knex({
  client: "pg",
  connection: {
    host:
      process.env.HOST ||
      "dpg-cnftquta73kc73dcofeg-a.oregon-postgres.render.com",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || "erickelnino",
    password: process.env.DB_PASS || "IPLXRbudYD3h9cTu6YRlt4c3jX7aJchV",
    database: process.env.DB_NAME || "smart_brain_ftau",
    ssl: true,
  },
});

export default db;

// const db = knex({
//   client: "pg",
//   connection: {
//     host: "dpg-cma6u2md3nmc73cmvtbg-a.oregon-postgres.render.com",
//     port: 5432,
//     user: "find_a_face_admin",
//     password: "rmyOI6ZdzKglnG0nWJh91OU1MV6GbqKN",
//     database: "find_a_face_db",
//     ssl: true,
//   },
// });
