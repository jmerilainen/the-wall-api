import type { Pool } from "pg";
import db from ".";
import posts from "./migrations/posts";

(async (db: Pool) => {
  const client = await db.connect();

  console.log("Starting migrations...");

  try {
    await client.query("BEGIN");
    console.log(`Migrating table "posts"`);
    await client.query(posts.UP);
    await client.query("COMMIT");
    console.log("Done");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
    await db.end();
  }
})(db).catch((e) => console.log(e));
