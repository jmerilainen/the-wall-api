import db from "../db";

const TABLE = "posts";

const create = async (content: string) => {
  return await db.query(
    `INSERT INTO ${TABLE} (content) VALUES ($1) RETURNING *`,
    [content]
  );
};

const all = async (limit = 100) => {
  return await db.query(`SELECT * FROM ${TABLE} ORDER BY id ASC LIMIT $1`, [
    limit,
  ]);
};

const get = async (id: number) => {
  return await db.query(`SELECT * FROM ${TABLE} WHERE id = $1 LIMIT 1`, [id]);
};

const update = async (id: number, content: string) => {
  return await db.query(
    `UPDATE ${TABLE} SET content = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [content, id]
  );
};

const destroy = async (id: number) => {
  return await db.query(`DELETE FROM ${TABLE} WHERE id = $1`, [id]);
};

export default {
  create,
  all,
  get,
  update,
  destroy,
};
