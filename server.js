const { createServer } = require("node:http")
const next = require("next")
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("User connected", socket.id);

        socket.on("chat", (msg) => {
            socket.broadcast.emit("chat", msg); // Send message to all except sender
        });

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Server ready on http://${hostname}:${port}`);
        });
});