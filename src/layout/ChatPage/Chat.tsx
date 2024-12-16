import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import "./Chat.css";
import apiClient from "../../config/apiClient";
import { useNavigate } from "react-router-dom";

type Message = {
  text: string;
  from: "user" | "system";
};

interface JWTPayload {
  userId?: number;
  name?: string;
  exp?: number; // Thời gian hết hạn (epoch time)
  [key: string]: any; // Cho phép các thuộc tính khác
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [access, setAccess] = useState(true);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  // Function to fetch messages from the server
  const fetchMessages = async () => {
    let userName = null;
    let context = "Tui cần hỗ trợ!";
    try {
      const token = localStorage.getItem("token");
      if (token) {
        userName = decodeJWT(token);
      }
      const response = await apiClient.get(`/api/chat/room/${userName}`);
      const newMessages = response.data.map((msg: any) => ({
        text: msg.content.trim(),
        from: msg.staff ? "system" : "user",
      }));
      setMessages(newMessages);
    } catch (error) {
      apiClient.post(`/api/chat/send/false?userName=${userName}`, context, {
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
  };

  function decodeJWT(token: string): JWTPayload | null {
    try {
      // Tách phần PAYLOAD (phần thứ hai) của token
      const payload = token.split(".")[1];

      // Giải mã Base64Url sang chuỗi JSON
      const decodedPayload = atob(
        payload.replace(/-/g, "+").replace(/_/g, "/"),
      );

      // Chuyển chuỗi JSON thành đối tượng JavaScript
      const obj = JSON.parse(decodedPayload) as JWTPayload;
      return obj.sub;
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  }

  useEffect(() => {
    // Fetch messages after deletion
    fetchMessages();

    // Set interval for fetching messages every 2 seconds
    const interval = setInterval(fetchMessages, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, from: "user" },
      ]);
      setInput("");

      let userName = null;
      try {
        const token = localStorage.getItem("token");
        if (token) {
          userName = decodeJWT(token);
        }
        const response = await apiClient.post(
          `/api/chat/send/false?userName=${userName}`,
          input,
          {
            headers: {
              "Content-Type": "text/plain",
            },
          },
        );
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="mx-auto flex h-3/5 flex-col bg-gray-100">
      <div className="flex items-center justify-center bg-gray-950 p-4 text-white">
        <span>Support</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex h-full min-h-[1000px] flex-col space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.from === "user" ? "justify-end" : ""}`}
            >
              <div
                className={`max-w-xs rounded-lg p-2 ${message.from === "user" ? "bg-slate-800 text-white" : "bg-gray-300 text-black"}`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center bg-white p-4">
        <InputText
          placeholder="Type your message..."
          className="flex-1 rounded-full border px-4 py-2 focus:outline-none"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="ml-2 rounded-full bg-yellow-400 p-2 text-white hover:bg-blue-600 focus:outline-none"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};
