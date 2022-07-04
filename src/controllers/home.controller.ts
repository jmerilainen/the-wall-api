import type { Controller } from "../types/controller";
import { json } from "../server";

const index: Controller = () => {
  return json({
    message: "Hello World!",
  });
};

export default {
  index,
};
