import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import { useSong } from "../hooks/useSong";
import "../styles/detection.scss";
import Player from "./player";

export default function FaceExpression() {

  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const { handleGetSong } = useSong();

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {

    init({ landmarkerRef, videoRef, streamRef });

    return () => {

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach(track => track.stop());
      }

    };

  }, []);


  const handleDetect = async () => {

    const mood = detect({
      landmarkerRef,
      videoRef,
      setExpression
    });

    if (mood) {

      // backend se song fetch
      await handleGetSong({ mood });

    }

  };


  return (

    <div className="detect-page">

      <div className="face-expression">

        <div className="face-card">

          <div className="video-wrapper">
            <video ref={videoRef} playsInline autoPlay />
          </div>

          <h2 className="expression-text">
            {expression}
          </h2>

          <button
            className="detect-btn"
            onClick={handleDetect}
          >
            Detect Expression
          </button>

        </div>

      </div>

      {/* Music Player */}
      <Player />

    </div>

  );

}