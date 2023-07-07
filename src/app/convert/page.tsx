"use client";

import SpeechCollector from "@/components/SpeechCollector";
import VideoRecorder from "@/core/VideoRecorder";
import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

export default function ConvertPage() {
  const [prompt, setPrompt] = useState("Stormtroopers in the Starwars");
  const [resultURL, setResultURL] = useState("");
  const videoRecorder = useRef<VideoRecorder>(new VideoRecorder("webcam_video"));
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    videoRecorder.current.startVideo();
  }, []);

  const handleClick = async () => {
    setIsProcessing(true);
    setError("");
    const url = videoRecorder.current.captureVideo();
    try {
      const { output } = await fetch(`/api/convertImage`, {
        method: "POST",
        body: JSON.stringify({
          url,
          prompt,
        }),
      }).then<{ output: string }>((res) => res.json());
      setResultURL(output);
      setIsProcessing(false);
    } catch (e) {
      setError(String(e));
      setIsProcessing(false);
    }
  };

  return (
    <main>
      <div
        style={{
          display: "flex",
          maxHeight: "600px",
        }}
      >
        <Webcam id="webcam_video" audio />
        <img src={resultURL} alt="" />
      </div>
      <div>
        <button
          style={{
            display: "inline-block",
          }}
          disabled={isProcessing}
          onClick={handleClick}
        >
          click me to capture!
        </button>
        {isProcessing && <span className="spinner" />}
      </div>
      <caption style={{ color: "red", margin: "5px 0" }}>{error}</caption>
      <div>
        <label>Prompt: </label>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} style={{ width: "100%" }} />
      </div>
      <SpeechCollector transcripts={prompt} setTranscripts={setPrompt} />
    </main>
  );
}
