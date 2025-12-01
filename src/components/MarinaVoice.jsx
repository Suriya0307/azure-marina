import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { marinaBrain } from "../ai/chat";
import { speak } from "../ai/voice";

export default function MarinaVoice({ onSubtitle }) {
  const [listening, setListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  async function startListening() {
    setListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  }

  async function stopListening() {
    setListening(false);
    SpeechRecognition.stopListening();

    const userText = transcript.trim();
    if (!userText) return;

    const aiResponse = await marinaBrain(userText);

    // 🔥 Send subtitle to App.jsx
    if (onSubtitle) onSubtitle(aiResponse);

    await speak(aiResponse);
  }

  return (
    <button
      className={`marina-mic-btn ${listening ? "listening" : ""}`}
      onMouseDown={startListening}
      onMouseUp={stopListening}
      onTouchStart={startListening}
      onTouchEnd={stopListening}
    >
      {listening ? "🎤" : "🎙"}
    </button>
  );
}
