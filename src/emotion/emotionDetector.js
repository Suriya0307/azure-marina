import * as faceapi from "face-api.js";

export async function startEmotionDetection(onEmotion) {
  // Load models from /public/models/
  await faceapi.nets.tinyFaceDetector.load("/models/");
  await faceapi.nets.faceExpressionNet.load("/models/");

  console.log("Models loaded");

  const video = document.createElement("video");
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;
  // Show video in bottom-left small box
video.style.position = "fixed";
video.style.bottom = "20px";
video.style.left = "20px";
video.style.width = "260px";
video.style.height = "200px";
video.style.borderRadius = "15px";
video.style.objectFit = "cover";
video.style.zIndex = "99998";
video.style.boxShadow = "0 0 15px rgba(0,0,0,0.4)";

  document.body.appendChild(video);

  // --- EMOTION BOX UI (Bottom Left) ---
  const emotionBox = document.createElement("div");
  emotionBox.id = "emotion-box";
  emotionBox.style.position = "fixed";
  emotionBox.style.bottom = "20px";
  emotionBox.style.left = "20px";
  emotionBox.style.padding = "12px 20px";
  emotionBox.style.background = "rgba(0,0,0,0.6)";
  emotionBox.style.color = "white";
  emotionBox.style.fontSize = "18px";
  emotionBox.style.borderRadius = "10px";
  emotionBox.style.backdropFilter = "blur(4px)";
  emotionBox.style.zIndex = "99999";
  emotionBox.innerText = "Detecting emotion...";
  document.body.appendChild(emotionBox);

  // Start webcam
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  console.log("Webcam started…");

  // Run detection every 400 ms
  setInterval(async () => {
    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detection || !detection.expressions) return;

    // Get highest confidence emotion
    const sorted = Object.entries(detection.expressions).sort(
      (a, b) => b[1] - a[1]
    );

    let emotion = sorted[0][0];

    // convert "neutral" to "calm"
    if (emotion === "neutral") emotion = "calm";

    // UPDATE UI BOX
    emotionBox.innerText = `Emotion: ${emotion}`;

    // send to React / Three.js
    onEmotion(emotion);
  }, 400);
}
