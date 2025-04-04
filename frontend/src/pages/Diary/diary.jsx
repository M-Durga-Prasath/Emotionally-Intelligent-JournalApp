import React, { useState, useEffect } from "react";
import "./diary.css";
import DashboardNavbar from "../Navbar/Navbar";
import Footers from "../footer/footers";

const AIDiary = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [hasSession, setHasSession] = useState(false);
  const [animateBackground, setAnimateBackground] = useState(true);

  // Load messages and draft on mount
  useEffect(() => {
    const storedMessages = JSON.parse(sessionStorage.getItem("diaryMessages"));
    const draft = sessionStorage.getItem("draftEntry");

    if (storedMessages && storedMessages.length > 0) {
      setMessages(storedMessages);
      setHasSession(true);
      setAnimateBackground(false);
    }

    if (draft) {
      setInput(draft);
      sessionStorage.removeItem("draftEntry"); // Delete as soon as it's loaded
    }
  }, []);

  const handleAnalyzeEmotion = async (text) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/analyze_emotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      console.log("Detected Emotion:", data.emotion);
    } catch (error) {
      console.error("Error analyzing emotion:", error);
    }
  };

  const handleSend = () => {
    if (input.trim() !== "") {
      const newMessage = { text: input, type: "user" };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      sessionStorage.setItem("diaryMessages", JSON.stringify(newMessages));
      setInput("");
      sessionStorage.removeItem("draftEntry");
      handleAnalyzeEmotion(input);

      if (!hasSession) {
        setHasSession(true);
        setAnimateBackground(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    sessionStorage.setItem("draftEntry", value);
  };

  return (
    <>
      <DashboardNavbar />
      <div className="diary-pageman">
        <div
          className={`diary-container ${hasSession ? "has-messages" : ""} ${
            animateBackground ? "animated-bg" : ""
          }`}
        >
          {/* Chat area (visible only after first message) */}
          {hasSession && (
            <div className="diary-chat">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`diary-message ${
                    msg.type === "user" ? "user" : ""
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          )}

          {/* Input Field */}
          <div
            className={`diary-input-container ${
              hasSession ? "input-moved" : ""
            }`}
          >
            <textarea
              className="diary-input"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Write your thoughts here..."
            />
            <button className="diary-send-btn" onClick={handleSend}>
              ➤
            </button>
          </div>
        </div>
      </div>
      <Footers />
    </>
  );
};

export default AIDiary;
