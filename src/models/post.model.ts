import db from "../db";
import { sanitzeInput } from "../utils";

const TABLE = "posts";

interface Post {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

const format = (raw: Post) => {
  return {
    ...raw,
    content: sanitzeInput(raw.content),
  };
};

const all = async (limit = 100) => {
  return await db
    .query<Post>(`SELECT * FROM ${TABLE} ORDER BY id ASC LIMIT $1`, [limit])
    .then((res) => res.rows)
    .then((res) => res.map(format));
};

const get = async (id: number) => {
  return await db
    .query<Post>(`SELECT * FROM ${TABLE} WHERE id = $1 LIMIT 1`, [id])
    .then((res) => res.rows[0])
    .then((res) => format(res));
};

const create = async (content: string) => {
  return await db
    .query<Post>(`INSERT INTO ${TABLE} (content) VALUES ($1) RETURNING *`, [
      content,
    ])
    .then((res) => res.rows[0])
    .then((res) => format(res));
};

const update = async (id: number, content: string) => {
  return await db
    .query<Post>(
      `UPDATE ${TABLE} SET content = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [content, id]
    )
    .then((res) => res.rows[0])
    .then((res) => format(res));
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
