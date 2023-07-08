"use client";

import { useState, useRef, useEffect } from "react";
import classNames from "./SpeechCollector.module.css";

interface SpeechCollectorProps {
  transcripts: string;
  setTranscripts: (value: string) => void;
}
export default function SpeechCollector({ setTranscripts }: SpeechCollectorProps) {
  const [isListening, setIsListening] = useState(false);

  const speechRecognition = useRef<SpeechRecognition>();

  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.interimResults = true;
    recognition.lang = "ko-KR";
    recognition.continuous = false;
    recognition.maxAlternatives = 20000;
    recognition.onresult = function (e) {
      const texts = Array.from(e.results)
        .map((results) => results[0].transcript)
        .join("");

      setTranscripts(texts);
    };

    speechRecognition.current = recognition;
  }, []);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      audio: true,
    });
  }, []);

  const startListening = () => {
    setIsListening(true);
    if (!speechRecognition.current) return;
    speechRecognition.current.start();
    speechRecognition.current.continuous = true;
  };

  const stopListening = () => {
    setIsListening(false);
    speechRecognition.current?.stop();
  };

  const listeningReset = () => {
    stopListening();
    setTranscripts("");
    speechRecognition.current?.abort();
  };

  return (
    <div>
      <button onClick={isListening ? stopListening : startListening} className={classNames.input_button}>
        {isListening ? "Stop" : "Start"} Input
      </button>
      <button onClick={listeningReset} className={classNames.reset_button}>
        reset
      </button>
    </div>
  );
}
