import { useState } from "react";
import "./sidebar.css";

export default function Sidebar({ handleSubmit, handleRemove, list }) {
  const [url, setUrl] = useState("");

  return (
    <div className="Sidebar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(url);
          setUrl("");
        }}
      >
        <input
          className="UrlInput"
          placeholder="Enter Video Url"
          value={url}
          type="url"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        ></input>
        <button type="submit">Add</button>
      </form>
      {list?.length ? (
        <ul className="Playlist" data-testid="Playlist">
          {list.map((item) => (
            <li key={item.id.toString()} data-testid={item.videoId}>
              <span>{item.title.length > 25 ? `${item.title.slice(0, 30)}...` : item.title}</span>
              <span>{item.duration}</span>
              <button onClick={() => handleRemove(item.id)}>x</button>
            </li>
          ))}
        </ul>
      ) : (
        "Playlist is empty"
      )}
    </div>
  );
}
