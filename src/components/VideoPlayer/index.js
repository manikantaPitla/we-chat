import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video }) => {
  return <ReactPlayer width="200px" controls url={video} />;
};

export default VideoPlayer;
