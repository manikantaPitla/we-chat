import React, { useRef, useState, useEffect } from "react";

import { FaPause } from "react-icons/fa6";
import { IoPlay } from "react-icons/io5";
import { AudioContainer, AudioManager } from "./styledComponent";
import { resizeLastMessage } from "../../utils/componentUtils";

function AudioFile({ audioData }) {
  const { audio, name } = audioData;
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const rangeRef = useRef(null);

  useEffect(() => {
    audioRef.current.onended = () => {
      setPlaying(false);
      muted && setMuted(false);
    };

    audioRef.current.onplay = () => {
      setPlaying(true);
    };

    audioRef.current.onpause = () => {
      setPlaying(false);
    };

    audioRef.current.ontimeupdate = () => {
      setCurrentTime(audioRef.current?.currentTime);
    };

    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current?.duration);

      let rangeSlider = rangeRef.current?.max;
      // eslint-disable-next-line
      rangeSlider = audioRef.current?.duration;
    };
  }, [muted]);

  const handleAudioControl = () => {
    if (audioRef.current.paused) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };

  const handleRangeChange = () => {
    audioRef.current.currentTime = rangeRef.current.value;
    setCurrentTime(audioRef.current.currentTime);
  };

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audio} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <AudioContainer>
        <AudioManager type="button" onClick={handleAudioControl}>
          {playing ? <FaPause /> : <IoPlay />}
        </AudioManager>
        <div>
          <input
            ref={rangeRef}
            type="range"
            value={currentTime}
            onChange={handleRangeChange}
          />
          <span>
            <p>{resizeLastMessage(name)}</p>
            <p>
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </span>
        </div>
      </AudioContainer>
    </>
  );
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

export default AudioFile;
