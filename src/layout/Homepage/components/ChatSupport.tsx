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
        className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg hover:bg-yellow-300"
        onClick={toggleDialog}
      />

      {/* Cửa sổ chat */}
      <Dialog
        visible={isDialogVisible}
        onHide={toggleDialog}
        header="Hỗ Trợ Trực Tuyến"
        className="fixed bottom-0 right-0 m-0 p-0 font-inter"
        style={{ width: "300px" }}
      >
        <div className="flex flex-col gap-4">
          {/* Tin nhắn trả lời từ hỗ trợ */}
          <div className="max-w-full rounded-lg bg-gray-200 p-3 text-xs">
            Xin chào! Tôi có thể giúp gì cho bạn?
          </div>

          {/* Ô nhập tin nhắn */}
          <div className="flex flex-col items-start gap-2">
            <InputTextarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Nhập tin nhắn của bạn..."
              className="w-full rounded-lg border border-gray-300 p-2"
            />
            <button
              type="button"
              onClick={handleSendMessage}
              className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-mainYellow p-2 font-bold text-black"
            >
              <i className="pi pi-send"></i>
              Gửi
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
