import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Ocean } from "react-three-ocean";
import "./App.css";
import MarinaVoice from "./components/MarinaVoice";

// NOTE: removed startEmotionDetection import to run face-api directly here

const EMOTION_THEMES = {
  happy: "happy",
  sad: "sad",
  angry: "angry",
  calm: "calm",
  neutral: "calm",
  fearful: "sad",
  disgusted: "angry",
  surprised: "happy",
};

function SkyBox({ theme = "calm" }) {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new THREE.CubeTextureLoader();

    const texture = loader.load(
      [
        `/assets/skyboxes/${theme}/${theme}_east.jpg`,
        `/assets/skyboxes/${theme}/${theme}_west.jpg`,
        `/assets/skyboxes/${theme}/${theme}_up.jpg`,
        `/assets/skyboxes/${theme}/${theme}_down.jpg`,
        `/assets/skyboxes/${theme}/${theme}_north.jpg`,
        `/assets/skyboxes/${theme}/${theme}_south.jpg`,
      ],
      () => console.log(`Loaded ${theme} skybox`),
      undefined,
      (error) => console.error(`Error loading ${theme} skybox:`, error)
    );

    if (texture && texture.isCubeTexture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }

    scene.background = texture;

    return () => texture.dispose();
  }, [scene, theme]);

  return null;
}

function OceanScene({ emotion }) {
  const theme = EMOTION_THEMES[emotion] || "calm";

  return (
    <>
      <SkyBox theme={theme} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[-1, 1, 1]} intensity={1} />

      <Ocean
        dimensions={[20000, 20000]}
        size={256}
        distortionScale={3.7}
        normals="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
      />

      <OrbitControls enablePan={false} minDistance={10} maxDistance={200} />
    </>
  );
}

/* ---------------------------------------------------------
   🌊 Wave Audio Component
--------------------------------------------------------- */
function WaveAudio() {
  const { camera } = useThree();

  useEffect(() => {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.Audio(listener);
    const loader = new THREE.AudioLoader();

    loader.load(
      "/assets/waves.mp3",
      (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.45);
        sound.play();
      },
      undefined,
      (err) => console.error("Audio load error:", err)
    );

    return () => {
      sound.stop();
      camera.remove(listener);
    };
  }, [camera]);

  return null;
}
/* --------------------------------------------------------- */

export default function App() {
  const [currentEmotion, setCurrentEmotion] = useState("calm");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [oceanResponse, setOceanResponse] = useState("");

  const recognitionRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 🔥 NEW: subtitle text
  const [subtitle, setSubtitle] = useState("");

  // 🔥 Auto-hide subtitle after 4 sec
  useEffect(() => {
    if (!subtitle) return;
    const t = setTimeout(() => setSubtitle(""), 4000);
    return () => clearTimeout(t);
  }, [subtitle]);

  /* ---------------------------------------------------------
     FACE API — same as before (unchanged)
  --------------------------------------------------------- */
  useEffect(() => {
    let detectorInterval = null;
    let mounted = true;

    async function initFaceApi() {
      const faceapi = await import("face-api.js");

      const MODEL_URL = "/models";
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      } catch (err) {
        console.error("Failed to load face-api models:", err);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (!mounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Could not start webcam:", err);
        return;
      }

      detectorInterval = setInterval(async () => {
        if (!mounted) return;
        if (!videoRef.current || !canvasRef.current) return;
        if (videoRef.current.readyState < 2) return;

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions({ inputSize: 224 })
          )
          .withFaceExpressions();

        const displaySize = {
          width: videoRef.current.videoWidth || 320,
          height: videoRef.current.videoHeight || 240,
        };
        faceapi.matchDimensions(canvasRef.current, displaySize);

        const resized = faceapi.resizeResults(detections, displaySize);

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        resized.forEach((det) => {
          const box = det.detection.box;
          const x = box.x;
          const y = box.y;
          const w = box.width;
          const h = box.height;

          ctx.lineWidth = 2;
          ctx.strokeStyle = "lime";
          ctx.strokeRect(x, y, w, h);

          if (det.expressions) {
            const sorted = Object.entries(det.expressions).sort(
              (a, b) => b[1] - a[1]
            );
            let top = sorted[0][0];
            if (top === "neutral") top = "calm";

            ctx.fillStyle = "white";
            ctx.font = "16px Arial";
            ctx.textBaseline = "bottom";
            ctx.fillText(top, x, Math.max(12, y - 6));

            setCurrentEmotion(top);
          }
        });
      }, 250);
    }

    initFaceApi();

    return () => {
      mounted = false;
      if (detectorInterval) clearInterval(detectorInterval);
      const vid = videoRef.current;
      if (vid && vid.srcObject) {
        const tracks = vid.srcObject.getTracks();
        tracks.forEach((t) => t.stop());
      }
    };
  }, []);

  /* ---------------------------------------------------------
     SPEECH RECOGNITION (unchanged)
  --------------------------------------------------------- */
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  /* ---------------------------------------------------------
     UI + SUBTITLE RENDER
  --------------------------------------------------------- */
  return (
    <div className="app">
      <div className="ocean-container">
        <Canvas
          camera={{
            position: [0, 10, 50],
            fov: 55,
            near: 1,
            far: 20000,
          }}
        >
          <OceanScene emotion={currentEmotion} />

          {/* 🌊 Wave Audio Added Here */}
          <WaveAudio />
        </Canvas>
      </div>

      {/* 🔥 Floating Subtitle In Sky */}
      {subtitle && (
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "32px",
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "1px",
            textShadow: "0 0 15px rgba(240, 240, 240, 0.9)",
            backdropFilter: "blur(6px)",
            padding: "12px 28px",
            borderRadius: "14px",
            opacity: 1,
            animation: "fadeOut 8s forwards",
            zIndex: 9999,
          }}
        >
          {subtitle}
        </div>
      )}

      <style>
        {`
          @keyframes fadeOut {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
          }
        `}
      </style>

      {/* Existing webcam + UI (unchanged) */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          width: "300px",
          height: "220px",
          background: "rgba(255, 255, 255, 1)",
          borderRadius: "12px",
          overflow: "hidden",
          backdropFilter: "blur(4px)",
          padding: "5px",
          zIndex: 9999,
        }}
      >
        <video
          ref={videoRef}
          id="emotionVideo"
          autoPlay
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
            display: "block",
          }}
        />

        <canvas
          ref={canvasRef}
          id="faceCanvas"
          width={320}
          height={240}
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            width: "290px",
            height: "210px",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Existing oceanResponse popup (unchanged) */}
      <div className="ui-overlay">
        <div className="emotion-display">
          <div>
            Current Emotion: <strong>{currentEmotion}</strong>
          </div>
          {transcript && (
            <div style={{ fontSize: "14px", marginTop: "5px", opacity: 0.7 }}>
              "{transcript}"
            </div>
          )}
        </div>

        {oceanResponse && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "20px 30px",
              borderRadius: "15px",
              maxWidth: "500px",
              textAlign: "center",
              fontSize: "18px",
              backdropFilter: "blur(10px)",
              pointerEvents: "none",
            }}
          >
            {oceanResponse}
          </div>
        )}
      </div>

      <MarinaVoice onSubtitle={setSubtitle} />
    </div>
  );
}
