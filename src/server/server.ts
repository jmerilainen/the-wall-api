import http from "http";
import { createRouter } from "./router";

const createServer = () => {
  const router = createRouter();

  const server = http.createServer(async (request, response) => {
    const { method, url } = request;

    console.log(`Request [${method}]: ${url}`);

    /**
     * Handle errors
     */

    request.on("error", (error) => {
      console.error(error);
      response.statusCode = 400;
      response.end("Bad Request");
    });

    response.on("error", (error) => {
      console.error(error);
    });

    /**
     * Handle CORS
     */

    if (request.headers.origin) {
      response.setHeader("Access-Control-Allow-Origin", request.headers.origin);
    }

    if (method === "OPTIONS") {
      response.statusCode = 204;
      response.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE"
      );
      response.setHeader("Content-Length", "0");
      response.end();
      return;
    }

    /**
     * Handle form data
     */

    const buffers = [];

    for await (const chunk of request) {
      buffers.push(chunk);
    }

    const bufferData = Buffer.concat(buffers).toString();

    const params = new URLSearchParams(bufferData);

    /**
     * Handle routing & controllers
     */

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

        try {
          const res = await currentRoute.controller({ request, params });

          if (!res) {
            response.statusCode = 204;
            response.setHeader("Content-Length", "0");
            response.end();
            return;
          }

          response.writeHead(res.status, { "Content-Type": res.type });
          response.end(res.data);
        } catch (error: unknown) {
          if (error instanceof Error) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.end(
              JSON.stringify({
                message: error.message,
              })
            );
            console.error(`Error [${method}]: ${url} - ${error.message}`);
          }
        }

        return;
      }
    }

    /**
     * Handle default response
     */

    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Not found" }));
  });

  return {
    server,
    ...router,
  };
};

export { createServer };
