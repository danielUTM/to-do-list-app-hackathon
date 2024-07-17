const { Client } = require("pg");
import dotenv from "dotenv";

const USERNAME = process.env.USERNAME;

module.exports.getClient = async () => {
  const client = new Client({
    user: USERNAME,
    password: "password",
    host: "localhost",
    port: 5432,
    database: "to_do_list_db",
  });
  await client.connect();
  return client;
};
