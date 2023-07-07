"use client";

import SpeechCollector from "@/components/SpeechCollector";
import VideoRecorder from "@/core/VideoRecorder";
import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

export default function Home() {
  const [prompt, setPrompt] = useState("Stormtroopers in the Starwars");
  const [resultURL, setResultURL] = useState("");
  const videoRecorder = useRef<VideoRecorder>(new VideoRecorder("webcam_video"));
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    videoRecorder.current.startVideo();
  }, []);

  const handleClick = async () => {
    setIsProcessing(true);
    const url = videoRecorder.current.captureVideo();
    const { output } = await fetch(`/api/convertImage`, {
      method: "POST",
      body: JSON.stringify({
        url,
        prompt,
      }),
    })
      .then<{ output: string }>((res) => res.json())
      .catch(() => ({ output: "" }));
    setResultURL(output);
    setIsProcessing(false);
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
        </button>{" "}
        {isProcessing && <span className="spinner" />}
      </div>
      <div>
        <label>Prompt: </label>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} style={{ width: "100%" }} />
      </div>
      <SpeechCollector transcripts={prompt} setTranscripts={setPrompt} />
    </main>
  );
}
