import { Server } from "socket.io";
import buildYoutubeObject from "./utils/youtube.js";

const urls = [];

const io = new Server(4200, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const timestamp = () => new Date().toUTCString();

io.on("connection", (socket) => {
  let socketRoom;

  socket.on("join", (room) => {
    socketRoom = room;
    console.log(`socketId: ${socket.id} to ${room} [${timestamp()}]`);
    socket.join(room);
    socket.emit("updatePlaylist", urls);
  });

  socket.on("addUrl", async (url) => {
    const obj = await buildYoutubeObject(url);
    urls.push({ url, ...obj });
    console.log(`url added: ${url} [${timestamp()}]`);
    io.to(socketRoom).emit("updatePlaylist", urls);
  });

  socket.on("removeUrl", async (id) => {
    const index = urls.findIndex((item) => item.id === id);
    if (index >= 0 && urls[index].id === id) {
      const url = urls[index].url;
      urls.splice(index, 1);
      console.log(`${url} removed [${timestamp()}]`);
      io.to(socketRoom).emit("updatePlaylist", urls);
    }
  });
});
