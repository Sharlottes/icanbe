"use client";

import Image from "next/image";
import SpeechCollector from "@/components/SpeechCollector";
import VideoRecorder from "@/core/VideoRecorder";
import { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Webcam from "react-webcam";

import classNames from "./page.module.css";

export default function ConvertPage() {
  const [prompt, setPrompt] = useState("Stormtroopers in the Starwars");
  const [resultURL, setResultURL] = useState("");
  const videoRecorder = useRef<VideoRecorder>(new VideoRecorder("webcam_video"));
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });

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
      <div>
        <p className={classNames.title}>Be.vi</p>
      </div>

      <div className={classNames.body}>
        {isPc ? (
          <div className={classNames.pc_body}>
            <div>
              <Webcam id="webcam_video" audio />
              <div>
                <label>You will be </label>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
              </div>
              <SpeechCollector transcripts={prompt} setTranscripts={setPrompt} />
            </div>
            <img src={resultURL} alt="" />
          </div>
        ) : (
          <>
            <div className={classNames.webcam_container}>
              <Webcam id="webcam_video" audio />
              <img src={resultURL} alt="" />
            </div>

            <div>
              <label>You will be </label>
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            </div>
            <SpeechCollector transcripts={prompt} setTranscripts={setPrompt} />
          </>
        )}
      </div>

      <div className={`${classNames.end_area}`}>
        <button disabled={isProcessing} onClick={handleClick}>
          <Image src="/images/capture_icon.png" alt="capture_icon" width={35} height={35} />
        </button>
        <caption>{error}</caption>
      </div>
    </main>
  );
}
