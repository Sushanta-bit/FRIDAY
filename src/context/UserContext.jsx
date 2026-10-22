import React, { useState } from "react";
import { createContext } from "react";
import main from "../gemini";
export const datacontext = createContext();

function UserContext({ children }) {
  let [speaking, setspeaking] = useState(false);
  let [prompt, setPrompt] = useState("Listening...");
  let [response, setResponse] = useState(false);

  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);

    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1.4;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
  }
  async function aiResponse(prompt) {
    let text = await main(prompt);
    let newText = text
      .replaceAll("ChatGPT", "FRIDAY")
      .replaceAll("CHATGPT", "FRIDAY")
      .replaceAll("OpenAi", "Sushanta Paul")
      .replaceAll("OpenAI", "Sushanta Paul")
      .replaceAll("**", "")
      .replaceAll("*", "");
    setPrompt(newText);
    speak(newText);
    setResponse(true);
    setTimeout(() => {
      setspeaking(false);
    }, 5000);
  }
  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    if (e.results[currentIndex].isFinal) {
      let transcript = e.results[currentIndex][0].transcript;
      setPrompt(transcript);

      takeCommand(transcript.toLowerCase());
    }
  };
  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("opening Youtube");
      setPrompt("opening Youtube");
      setTimeout(() => {
        setspeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank");
      speak("opening Google");
      setPrompt("opening Google");
      setTimeout(() => {
        setspeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("linkedin")) {
      window.open("https://www.linkedin.com/", "_blank");
      speak("opening linkedin");
      setPrompt("opening LinkedIn");
      setTimeout(() => {
        setspeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("whatsapp")) {
      window.open("https://web.whatsapp.com/", "_blank");
      speak("opening whatsapp");
      setPrompt("opening WhatsApp");
      setTimeout(() => {
        setspeaking(false);
      }, 5000);
    } else {
      aiResponse(command);
    }
  }

  let value = {
    recognition,
    speaking,
    setspeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  };
  return (
    <div>
      <datacontext.Provider value={value}>{children}</datacontext.Provider>
    </div>
  );
}

export default UserContext;
