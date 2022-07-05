import { createServer } from "./server";
import controllers from "./controllers";

const PORT = process.env.PORT || 8000;

const app = createServer();

app.get("/", controllers.home.index);
app.get("/posts", controllers.posts.index);
app.post("/posts", controllers.posts.create);
app.get(/^\/posts\/(?<id>\d+)$/, controllers.posts.show);
app.patch(/^\/posts\/(?<id>\d+)$/, controllers.posts.update);
app.delete(/^\/posts\/(?<id>\d+)$/, controllers.posts.destroy);

app.server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
