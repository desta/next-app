import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

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
        io.use((socket, next) => {
            const username = socket.handshake.auth.username;
            if (!username) {
                return next(new Error("invalid username"));
            }
            socket.username = username;
            next();
        });
        
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push({
                userID: id,
                username: socket.username,
            });
        }
        socket.emit("users", users);
        
        socket.broadcast.emit("user connected", {
            userID: socket.id,
            username: socket.username,
        });

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
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});

// const { createServer } = require("node:http")
// const next = require("next")
// const { Server } = require("socket.io");

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
// const port = 3000;
// // when using middleware `hostname` and `port` must be provided below
// const app = next({ dev, hostname, port });
// const handler = app.getRequestHandler();

// app.prepare().then(() => {
//     const httpServer = createServer(handler);

//     const io = new Server(httpServer);

//     io.on("connection", (socket) => {
//         console.log("User connected", socket.id);

//         socket.on("chat", (msg) => {
//             socket.broadcast.emit("chat", msg); // Send message to all except sender
//         });

//         socket.on("disconnect", () => {
//             console.log("User disconnected", socket.id);
//         });
//     });

//     httpServer
//         .once("error", (err) => {
//             console.error(err);
//             process.exit(1);
//         })
//         .listen(port, () => {
//             console.log(`> Server ready on http://${hostname}:${port}`);
//         });
// });