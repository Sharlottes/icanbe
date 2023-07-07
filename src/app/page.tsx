"use client";

import VideoRecorder from "@/core/VideoRecorder";
import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

export default function Home() {
  const [resultURL, setResultURL] = useState("");
  const videoRecorder = useRef<VideoRecorder>(new VideoRecorder("webcam_video"));

  useEffect(() => {
    videoRecorder.current.startVideo();
  }, []);

  const handleClick = async () => {
    const url = videoRecorder.current.captureVideo();
    const { output } = await fetch(`/api/convertImage`, {
      method: "POST",
      body: JSON.stringify({
        url,
        prompt: "Stormtroopers in the Starwars",
      }),
    }).then<{ output: string }>((res) => res.json());
    console.log(output);
    setResultURL(output);
  };

  return (
    <main>
      <div
        style={{
          display: "flex",
        }}
      >
        <Webcam id="webcam_video" audio />
        <img src={resultURL} alt="" />
      </div>
      <button onClick={handleClick}>click me to capture!</button>
    </main>
  );
}
