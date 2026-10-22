import "./App.css";
import React, { useContext } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from "./context/UserContext";
import speakgif from "./assets/speak.gif";
import aivoice from "./assets/aiVoice.gif";

import va from "./assets/ai.png";

function App() {
  let {
    recognition,
    speaking,
    setspeaking,
    prompt,
    response,
    setPrompt,
    setResponse,
  } = useContext(datacontext);

  return (
    <>
      <div className="main">
        <img src={va} alt="aiimage" id="firday" />
        <span>Hi I am Friday! Your Virtual Assistant</span>
        {!speaking ? (
          <button
            onClick={() => {
              setPrompt("Listening");
              setspeaking(true);
              recognition.start();
              setResponse(false);
            }}
          >
            Click Here <CiMicrophoneOn />
          </button>
        ) : (
          <div className="response">
            {!response ? (
              <img src={speakgif} alt="gif" id="speak" />
            ) : (
              <img src={aivoice} alt="GIF" id="aivoice" />
            )}

            <p>{prompt}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
