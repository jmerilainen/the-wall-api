import client from "./db";
import { createServer } from "./server";
import controllers from "./controllers";

const PORT = process.env.PORT || 8000;

const app = createServer();

client.connect();

app.get("/", controllers.home.index);

app.server.on("end", () => client.end());

app.server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
