import http from "http";
import { createRouter } from "./router";

const createServer = () => {
  const router = createRouter();

  const server = http.createServer(async (request, response) => {
    request.on("error", (error) => {
      console.error(error);
      response.statusCode = 400;
      response.end("Bad Request");
    });

    response.on("error", (error) => {
      console.error(error);
    });

    process.on("uncaughtException", function (error) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          message: error.message,
        })
      );
      console.error(`Error [${method}]: ${url} - ${error.message}`);
    });

    const { method, url } = request;

    console.log(`Request URL [${method}]: ${url}`);

    const buffers = [];

    for await (const chunk of request) {
      buffers.push(chunk);
    }

    const bufferData = Buffer.concat(buffers).toString();

    const params = new URLSearchParams(bufferData);

    if (method && url) {
      const currentRoute = router.resolve(method, url);

      if (currentRoute) {
        console.log(
          `Matched route [${currentRoute.method.toUpperCase()}]: ${
            currentRoute.id
          }`
        );

        const match = url.match(currentRoute.matcher);
        const groups = match?.groups || {};

        for (const prop in groups) {
          params.set(prop, groups[prop]);
        }

        const res = await currentRoute.controller({ request, params });

        if (!res) {
          response.end("");
          return;
        }

        response.writeHead(res.status, { "Content-Type": res.type });
        response.end(res.data);
        return;
      }
    }

    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Not found" }));
  });

  return {
    server,
    ...router,
  };
};

export { createServer };
