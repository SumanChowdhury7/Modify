import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "../styles/detection.scss";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="face-expression">
      <div className="face-card">
        <div className="video-wrapper">
          <video ref={videoRef} playsInline />
        </div>

        <h2 className="expression-text">{expression}</h2>

        <button
          className="detect-btn"
          onClick={() =>
            detect({ landmarkerRef, videoRef, setExpression })
          }
        >
          Detect Expression
        </button>
      </div>
    </div>
  );
}