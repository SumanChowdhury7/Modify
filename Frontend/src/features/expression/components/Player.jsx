import { useRef, useState, useEffect } from "react";
import { useSong } from "../hooks/useSong";
import "../styles/player.scss";

export default function Player() {

  const { song } = useSong();

  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // new song load
  useEffect(() => {

    if (song?.url && audioRef.current) {

      audioRef.current.src = song.url;

      audioRef.current.load();

      audioRef.current.play();

      setPlaying(true);

      setProgress(0);

    }

  }, [song]);



  const togglePlay = () => {

    if (!audioRef.current) return;

    if (playing) {

      audioRef.current.pause();

    } else {

      audioRef.current.play();

    }

    setPlaying(!playing);

  };


  const forward = () => {

    audioRef.current.currentTime += 10;

  };


  const backward = () => {

    audioRef.current.currentTime -= 10;

  };


  const updateProgress = () => {

    if (!audioRef.current) return;

    setProgress(audioRef.current.currentTime);

  };


  const handleSeek = (e) => {

    const time = Number(e.target.value);

    audioRef.current.currentTime = time;

    setProgress(time);

  };


  const handleVolume = (e) => {

    const vol = Number(e.target.value);

    audioRef.current.volume = vol;

    setVolume(vol);

  };


  const formatTime = (time) => {

    if (!time) return "0:00";

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  };


  if (!song) return null;


  return (

    <div className="player">

      <audio
        ref={audioRef}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={() =>
          setDuration(audioRef.current.duration)
        }
      />


      <img
        className="poster"
        src={song.posterUrl}
        alt={song.title}
      />


      <div className="song-info">

        <h4>{song.title}</h4>

        <p>{song.mood}</p>

      </div>


      <div className="controls">

        <button onClick={backward}>⏮</button>

        <button onClick={togglePlay}>
          {playing ? "⏸" : "▶"}
        </button>

        <button onClick={forward}>⏭</button>

      </div>



      <div className="progress-container">

        <span>{formatTime(progress)}</span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={progress}
          onChange={handleSeek}
        />

        <span>{formatTime(duration)}</span>

      </div>



      <div className="volume">

        🔊

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
        />

      </div>

    </div>

  );

}