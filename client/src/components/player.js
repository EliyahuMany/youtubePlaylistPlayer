import YouTube from "react-youtube";

export default function Player({ video, onVideoEnd }) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
      mute: 1,
    },
  };

  return (
    <div data-testid="Player">
      <YouTube
        videoId={video?.videoId}
        opts={opts}
        onEnd={() => {
          onVideoEnd(video?.id);
        }}
      />
    </div>
  );
}
