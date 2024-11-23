import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";

export const ChatSupport: React.FC = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [message, setMessage] = useState("");

  // Hàm để mở/đóng dialog
  const toggleDialog = () => {
    setIsDialogVisible((prevState) => !prevState);
  };

  // Hàm để gửi tin nhắn
  const handleSendMessage = () => {
    if (message.trim()) {
      // Gửi tin nhắn (bạn có thể thêm API hoặc chức năng khác tại đây)
      console.log("Sent message:", message);
      setMessage(""); // Reset message sau khi gửi
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
