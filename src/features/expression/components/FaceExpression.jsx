import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function EmotionDetector() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);

  const [emotion, setEmotion] = useState("Loading...");

  const lastVideoTime = useRef(-1);
  const currentEmotion = useRef("Loading...");
  const emotionHistory = useRef([]);
  const lastEmotionChange = useRef(Date.now());

  const STABILITY_FRAMES = 8; // smoothing
  const HOLD_TIME = 500; // ms

  /* ======================
     🎥 Start Camera
  ====================== */
  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });

      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    };

    startCamera();
  }, []);

  /* ======================
     🧠 Init MediaPipe
  ====================== */
  useEffect(() => {
    const init = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );

      landmarkerRef.current =
        await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-assets/face_landmarker_with_blendshapes.task",
            delegate: "CPU",
          },
          runningMode: "IMAGE",
          outputFaceBlendshapes: true,
        });

      videoRef.current.onloadeddata = async () => {
        await landmarkerRef.current.setOptions({
          runningMode: "VIDEO",
        });
        detectLoop();
      };
    };

    init();
  }, []);

  /* ======================
     🔁 Detection Loop
  ====================== */
  const detectLoop = () => {
    const detect = () => {
      if (
        landmarkerRef.current &&
        videoRef.current &&
        videoRef.current.readyState === 4
      ) {
        const video = videoRef.current;

        if (video.currentTime !== lastVideoTime.current) {
          lastVideoTime.current = video.currentTime;

          const results =
            landmarkerRef.current.detectForVideo(
              video,
              video.currentTime * 1000
            );

          if (results.faceBlendshapes?.length > 0) {
            const rawEmotion = classifyEmotion(
              results.faceBlendshapes[0].categories
            );

            // 🎯 Sliding Window Smoothing
            emotionHistory.current.push(rawEmotion);
            if (emotionHistory.current.length > STABILITY_FRAMES) {
              emotionHistory.current.shift();
            }

            // Count frequency
            const counts = {};
            emotionHistory.current.forEach((e) => {
              counts[e] = (counts[e] || 0) + 1;
            });

            const stableEmotion = Object.keys(counts).reduce(
              (a, b) => (counts[a] > counts[b] ? a : b)
            );

            // ⏱ Hold time to prevent flicker
            if (
              stableEmotion !== currentEmotion.current &&
              Date.now() - lastEmotionChange.current > HOLD_TIME
            ) {
              lastEmotionChange.current = Date.now();
              currentEmotion.current = stableEmotion;
              setEmotion(stableEmotion);
            }
          } else {
            setEmotion("No Face 😶");
          }
        }
      }

      requestAnimationFrame(detect);
    };

    detect();
  };

  /* ======================
     🧩 Emotion Logic
  ====================== */
  const classifyEmotion = (b) => {
    const v = (n) =>
      b.find((x) => x.categoryName === n)?.score || 0;

    const smile =
      v("mouthSmileLeft") + v("mouthSmileRight");

    const browDown =
      v("browDownLeft") + v("browDownRight");

    const eyeWide =
      v("eyeWideLeft") + v("eyeWideRight");

    const eyeSquint =
      v("eyeSquintLeft") + v("eyeSquintRight");

    const mouthOpen = v("jawOpen");

    // 😠 Angry (priority)
    if (
      browDown > 0.3 &&
      eyeSquint > 0.3 &&
      smile < 0.15
    )
      return "😠 Angry";

    // 🤩 Excited
    if (
      eyeWide > 0.2 &&
      mouthOpen > 0.2 &&
      smile > 0.3
    )
      return "🤩 Excited";

    // 😊 Happy
    if (smile > 0.5) return "😊 Happy";

    // 😢 Sad
    if (smile < 0.15 && mouthOpen < 0.15)
      return "😢 Sad";

    return "😐 Neutral";
  };

  /* ======================
     🎨 UI
  ====================== */
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Emotion Detection</h1>

      <video
        ref={videoRef}
        width="420"
        height="320"
        muted
        playsInline
        style={{
          borderRadius: "16px",
          marginTop: "20px",
          boxShadow: "0 0 25px rgba(0,0,0,0.5)",
        }}
      />

      <h2 style={{ marginTop: "30px", fontSize: "32px" }}>
        {emotion}
      </h2>
    </div>
  );
}