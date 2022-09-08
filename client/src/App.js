import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Player from "./components/player";

function App() {
  const [socket, setSocket] = useState();
  const [list, setList] = useState([]);
  const [video, setVideo] = useState();

  useEffect(() => {
    const socket = io(`http://${window.location.hostname}:4200`);
    socket.emit("join", "Only room");
    setSocket(socket);
    socket.on("updatePlaylist", (items) => {
      setList([...items]);
      setVideo(items[0]);
    });
    return () => {
      socket.off("updatePlaylist");
    };
  }, []);

  const handleSubmit = (url) => {
    socket.emit("addUrl", url);
  };

  const onVideoEnd = (id) => {
    setVideo();
    socket.emit("removeUrl", id);
  };

  const handleRemove = (id) => {
    socket.emit("removeUrl", id);
  };

  return (
    <div className="App">
      <div className="Board">
        <Sidebar handleSubmit={handleSubmit} handleRemove={handleRemove} list={list} />
        <Player onVideoEnd={onVideoEnd} video={video} />
      </div>
    </div>
  );
}

export default App;
