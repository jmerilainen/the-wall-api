import { Client } from "pg";
import client from ".";
import posts from "./migrations/posts";

(async (client: Client) => {
  await client.connect();

  try {
    await client.query("BEGIN");
    await client.query(posts.UP);
    console.log(`Migrating table "posts"`);
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.end();
  }
})(client).catch((e) => console.log(e));
