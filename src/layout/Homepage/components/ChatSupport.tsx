import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import apiClient from "../../../config/apiClient";


interface JWTPayload {
  userId?: number;
  name?: string;
  exp?: number; // Thời gian hết hạn (epoch time)
  [key: string]: any; // Cho phép các thuộc tính khác
}

export const ChatSupport: React.FC = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [message, setMessage] = useState("");

  // Hàm để mở/đóng dialog
  const toggleDialog = () => {
    setIsDialogVisible((prevState) => !prevState);
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

  // Hàm để gửi tin nhắn
  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const token = localStorage.getItem("token");
        
        let userName = null;
        if (token) {
          userName = decodeJWT(token);
        }
        const response = await apiClient.post(`/api/chat/send/false?userName=${userName}`, message, {
          headers: {
            'Content-Type': 'text/plain',
          },
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <>
      {/* Nút mở chat */}
      <Button
        icon="pi pi-comments"
        className="fixed flex items-center justify-center w-12 h-12 text-black bg-yellow-400 rounded-full shadow-lg bottom-4 right-4 hover:bg-yellow-300"
        onClick={toggleDialog}
      />

      {/* Cửa sổ chat */}
      <Dialog
        visible={isDialogVisible}
        onHide={toggleDialog}
        header="Chat Support"
        className="fixed bottom-0 right-0 p-0 m-0 font-inter"
        style={{ width: "300px" }}
      >
        <div className="flex flex-col gap-4">
          {/* Tin nhắn trả lời từ hỗ trợ */}
          <div className="max-w-full p-3 text-xs bg-gray-200 rounded-lg">
            Hello there! How can I help you today? 😊
          </div>

          {/* Ô nhập tin nhắn */}
          <div className="flex flex-col items-start gap-2">
            <InputTextarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Type your message here..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={handleSendMessage}
              className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-mainYellow p-2 font-bold text-black"
            >
              <i className="pi pi-send"></i>
              Send
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
