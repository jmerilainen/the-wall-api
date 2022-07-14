import type { Controller } from "../types/controller";
import { json } from "../server";
import post from "../models/post.model";

const index: Controller = async () => {
  try {
    const all = await post.all();

    return json(all);
  } catch (error) {
    console.error(error);

    return json([]);
  }
};

const create: Controller = async ({ params }) => {
  const content = params.get("content");

  if (!content) {
    throw new Error("Param 'content' is missing");
  }

  if (new TextEncoder().encode(content).length > 256) {
    throw new Error("Param 'content' is too big");
  }

  try {
    const item = await post.create(content);

    return json(item);
  } catch (error) {
    console.error(error);

    throw new Error("Post 'create' failed");
  }
};

const show: Controller = async ({ params }) => {
  const id = Number(params.get("id"));

  const item = await post.get(id);

  if (!item) {
    return json(
      {
        message: "Not found",
      },
      404
    );
  }

  return json(item);
};

const update: Controller = async ({ params }) => {
  const id = Number(params.get("id"));
  const content = params.get("content");

  if (!content) {
    throw new Error("Param 'content' is missing");
  }

  const item = await post.update(id, content);

  return json(item);
};

const destroy: Controller = async ({ params }) => {
  const id = Number(params.get("id"));

  const res = await post.destroy(id);

  if (!res.rowCount) {
    throw new Error("Bad request");
  }

  return json({});
};

export default {
  index,
  create,
  show,
  update,
  destroy,
};
