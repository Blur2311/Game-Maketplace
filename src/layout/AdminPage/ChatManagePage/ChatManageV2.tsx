import { InputText } from "primereact/inputtext";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./ChatManage.css";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { PiTrash } from "react-icons/pi";
import { SentMessage } from "./components/SentMessage";
import { ReceivedMessage } from "./components/ReceivedMessage";
import { Sidebar } from "primereact/sidebar";
import { RightSideChat } from "./components/RightSideChat";
import apiClient from "../../../config/apiClient";
import Swal from "sweetalert2";

interface JWTPayload {
  userId?: number;
  name?: string;
  exp?: number; // Thời gian hết hạn (epoch time)
  [key: string]: any; // Cho phép các thuộc tính khác
}

export const ChatManageV2 = () => {
  const [sideChat, setSideChat] = useState(false);
  const [visible, setVisible] = useState(false);
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const [textChat, setTextChat] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [messages, setMessages] = useState<any[]>([]); // Lưu trữ danh sách tin nhắn

  const [displayName, setDisplayName] = useState(""); // State lưu trữ userName
  const [firstChatLoaded, setFirstChatLoaded] = useState(false); // Flag để kiểm tra khi load xong chat đầu tiên

  // Callback hàm để nhận userName từ RightSideChat
  const updateDisplayName = (userName: string) => {
    setDisplayName(userName);
    callData(userName);
  };

  const handleFirstChatLoad = () => {
    setFirstChatLoaded(true); // Cập nhật khi cuộc trò chuyện đầu tiên được tải
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Lấy file đầu tiên trong danh sách các file
    if (file) {
      console.log("File đã chọn:", file);
      // Xử lý file hoặc hình ảnh ở đây, ví dụ gửi lên server
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextChat(e.target.value);
  };

  const handleSideChat = () => {
    setSideChat(!sideChat);
  };
  const toggleSidebar = () => {
    setVisible(!visible);
  };

  const callData = async (userName: any) => {
    try {
      // Dùng await để đợi Promise hoàn thành
      const response = await apiClient.get(`/api/chat/room/${userName}`);

      // Sau khi Promise hoàn thành, bạn có thể truy cập vào response.data
      setMessages(response.data);
    } catch (error) {
      // // Xử lý lỗi nếu có
      // console.error("Error fetching data:", error);
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

  const sendMessage = async () => {
    if (textChat.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: textChat, from: "user" },
      ]);
      setTextChat("");

      try {
        const response = await apiClient.post(
          `/api/chat/send/true?userName=${displayName}`,
          textChat,
          {
            headers: {
              "Content-Type": "text/plain",
            },
          },
        );
        callData(displayName);
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

  useEffect(() => {
    let interval: number | null = null; // Khai báo interval với kiểu là number

    if (displayName) {
      interval = window.setInterval(() => {
        callData(displayName); // Gọi API sau mỗi 2 giây
      }, 1500);
    }

    // Cleanup interval khi component unmount
    return () => {
      if (interval !== null) {
        window.clearInterval(interval); // Dọn dẹp interval
      }
    };
  }, [displayName]); // Đưa displayName vào mảng phụ thuộc

  const deleteRoom = async (userName: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this room?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const response = apiClient.delete(`/api/chat/room/${userName}`);
          callData(userName); // Gọi API sau khi xóa phòng chat
          handleFirstChatLoad();
        } catch (error) {
          console.error("Error deleting room:", error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <div className="z-10 flex max-h-screen min-h-[700px] flex-1">
        <Sidebar
          visible={visible}
          onHide={toggleSidebar}
          position="left"
          className="custom-sidebar bg-white"
        >
          <div
            className={`w-[320px] border-r transition-all duration-[225ms] ease-[cubic-bezier(0,0,0.2,1)]`}
          >
            <RightSideChat
              onFirstChatLoad={handleFirstChatLoad}
              onUserNameSelect={updateDisplayName}
            />
          </div>
        </Sidebar>
        <div
          className={`hidden w-[320px] border-r transition-all duration-[225ms] ease-[cubic-bezier(0,0,0.2,1)] lg:block ${sideChat ? "ml-[-320px]" : ""}`}
        >
          <RightSideChat
            onFirstChatLoad={handleFirstChatLoad}
            onUserNameSelect={updateDisplayName}
          />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex border-b p-4">
            <Button
              className={"hidden rounded-lg p-2 hover:bg-gray-100 lg:block"}
              icon={`pi pi-bars`}
              onClick={handleSideChat}
            />
            <Button
              className={"block rounded-lg p-2 hover:bg-gray-100 lg:hidden"}
              icon={`pi pi-bars`}
              onClick={toggleSidebar}
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex min-h-16 items-center justify-between gap-4 border-b px-4 py-2">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white">
                  <img src={"/cat.jpeg"} alt="" className="object-cover" />
                </div>
                <h6 className="truncate text-sm font-medium">{displayName}</h6>
              </div>

              <div className="">
                <Button
                  className="rounded-lg p-2 hover:bg-gray-100"
                  icon="pi pi-ellipsis-h"
                  onClick={(e) => overlayPanelRef.current?.toggle(e)}
                />
                <OverlayPanel
                  ref={overlayPanelRef}
                  dismissable
                  className="custom-admin-navbar min-w-36 rounded-lg"
                >
                  <ul className="flex flex-col gap-1 p-2">
                    <li
                      onClick={async () => await deleteRoom(displayName)}
                      className="flex cursor-pointer items-center gap-4 whitespace-nowrap rounded-lg px-2 py-1 hover:bg-black hover:bg-opacity-5"
                    >
                      <PiTrash size={20} />
                      <p>Delete</p>
                    </li>
                  </ul>
                </OverlayPanel>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
              {messages.map((message, index) =>
                message.staff ? (
                  <SentMessage
                    key={index}
                    avatar={message.avatar || "/cat.jpeg"}
                    name={message.sender}
                    message={message.content}
                    date={""}
                  />
                ) : (
                  <ReceivedMessage
                    key={index}
                    avatar={message.avatar || "/cat.jpeg"}
                    name={message.sender}
                    message={message.content}
                    date={""}
                  />
                ),
              )}
            </div>

            <div className="flex items-center gap-4 px-6 py-2">
              <div className="max-h-full flex-1">
                <InputText
                  placeholder="Leave a message"
                  className="h-9 w-full rounded-lg border bg-transparent px-3 text-sm text-black transition duration-100 ease-linear focus:border-2 focus:border-mainYellow focus:ring-0"
                  value={textChat}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  className={`rounded-lg p-2 ${textChat.trim().length != 0 && "bg-mainYellow text-white hover:brightness-95"}`}
                  icon={`pi pi-send`}
                  disabled={textChat.trim().length === 0}
                  onClick={sendMessage}
                />

                <div>
                  <Button
                    className="rounded-lg p-2 hover:bg-gray-100"
                    icon="pi pi-paperclip"
                    onClick={handleFileClick}
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*" // Chỉ chấp nhận hình ảnh
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
