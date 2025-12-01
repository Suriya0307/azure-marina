export async function speak(text) {
  try {
    console.log("🔊 Speaking:", text);

    const res = await fetch(
      "https://azure-marina-production-5c74.up.railway.app/api/voice",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      }
    );

    const audioArrayBuffer = await res.arrayBuffer();

    // … keep rest of your code unchanged
    const audioBlob = new Blob([audioArrayBuffer], {
      type: "audio/mpeg",
    });

    const audioUrl = URL.createObjectURL(audioBlob);
    const audioPlayer = new Audio(audioUrl);

    audioPlayer.onplay = () => console.log("🔈 Playing audio...");
    audioPlayer.onerror = (e) => console.log("❌ Audio play error:", e);

    audioPlayer.play();
  } catch (error) {
    console.error("❌ ElevenLabs Error:", error);
  }
}
