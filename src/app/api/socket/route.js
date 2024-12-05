import { Server } from "socket.io";

export async function GET(request) {
    const io = new Server();
    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
    return new Response("Socket.io server is running", {
        status: 200,
    });
}