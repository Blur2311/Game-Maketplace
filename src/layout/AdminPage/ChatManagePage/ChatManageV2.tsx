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
import { useAuthCheck } from "../../../utils/AuthUtils";
import { getUsernameFromToken } from '../../../utils/AuthUtils';

interface Message {
  id: number; // ID của tin nhắn
  channel: string | null; // Channel name (nếu cần tên channel dưới dạng chuỗi)
  senderName: string | null; // Tên người gửi
  senderRole: string | null; // Vai trò người gửi
  content: string; // Nội dung tin nhắn
}

export const ChatManageV2 = () => {
  useAuthCheck(["ADMIN", "STAFF"]);
  const [sideChat, setSideChat] = useState(false);
  const [visible, setVisible] = useState(false);
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const [textChat, setTextChat] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]); // Mảng các tin nhắn
  const [username, setUsername] = useState<string | null>(null); // Username người dùng


  const [displayName, setDisplayName] = useState(""); // State lưu trữ userName
  const [firstChatLoaded, setFirstChatLoaded] = useState(false); // Flag để kiểm tra khi load xong chat đầu tiên

  const socketRef = useRef<WebSocket | null>(null); // WebSocket reference


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

    const response = await apiClient.get(`/api/chat/channel_name_mess?username=${userName}`);
    console.log(response.data.data);
    setMessages(response.data.data);
    
  };

  const openWebSocket = () => {

    const user = getUsernameFromToken();
    if (!user) return;

    const socket = new WebSocket("ws://localhost:9999/chatUsertoAdmin");

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected to server");
      socket.send(`join:${user}`); // Gửi sự kiện "join" cùng username
      socket.send(`loadMessages:${user}`); // Load tin nhắn cũ
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        // Nếu data là mảng, thêm vào danh sách cũ
        setMessages((prevMessages) => [...prevMessages, ...data]);
      } else if (typeof data === 'object') {
        // Nếu data là object, chuyển thành mảng và thêm vào danh sách
        setMessages((prevMessages) => [...prevMessages, data]);
      } else {
        console.error("Invalid data format received:", data);
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from server");
    };
  };


  const sendMessage = async () => {
    if (!textChat.trim()) {
      return;
    } else {
      const user = getUsernameFromToken();
      const formattedMessage = `message:${username}:${user}:${textChat}`;
      if (socketRef.current) {
        // Tạo tin nhắn mới
        const newMessage: Message = {
          id: Date.now(), // Dùng thời gian hiện tại làm ID
          channel: null, // Hoặc cần channel cụ thể
          senderName: username,
          senderRole: null, // Nếu vai trò không cần thiết
          content: textChat
        };

        socketRef.current.send(formattedMessage);

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        socketRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (Array.isArray(data)) {
            // Nếu data là mảng, thêm vào danh sách cũ
            setMessages((prevMessages) => [...prevMessages, ...data]);
          } else if (typeof data === 'object') {
            // Nếu data là object, chuyển thành mảng và thêm vào danh sách
            setMessages((prevMessages) => [...prevMessages, data]);
          } else {
            console.error("Invalid data format received:", data);
          }
        };
      }
      setTextChat("");
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
        setUsername(displayName);
      }, 1500);
    }

    openWebSocket();

    // Cleanup interval khi component unmount
    return () => {
      if (interval !== null) {
        window.clearInterval(interval); // Dọn dẹp interval
      }
    };

    
  }, [displayName]); // Đưa displayName vào mảng phụ thuộc

  

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

          {/* KHI KHÔNG CHƯA ẤN VÀO TIN NHẮN NÀO 
              THÌ HIỆN CÁI NÀY LÊN ẤN CÁI KIA OKE? */}

          {/* <div className="flex flex-1 flex-col items-center justify-center p-6">
            <div className="flex flex-col items-center gap-4">
              <img src="/chat.png" alt="" className="h-full w-32" />
              <p>Start meaningful conversations!</p>
            </div>
          </div> */}

          {/* DÙNG 'hidden' ĐỂ ẨN CÁI Ở DƯỚI ĐI HIỂU CHƯA BẤY BÌ? */}
          {/* ẨN CÁI DIV NÀY NÈ */}
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
            {messages.length === 0 ? (
                  <p>No messages yet. Start the conversation!</p>
                ) : (
                  messages.map((msg, index) => {
                    return msg.senderName === username ? (
                      
                      <ReceivedMessage
                        key={index}
                        avatar={"/cat.jpeg"}
                        channel={null}
                        senderName={msg.senderName || "Admin"}
                        senderRole={null}
                        content={msg.content}
                      />
                    ) : (
                      <SentMessage
                        key={index}
                        avatar={"/cat.jpeg"}
                        channel={null}
                        senderName={msg.senderName || "You"}
                        senderRole={null}
                        content={msg.content}
                      />
                    );
                  })
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
                  {/* <Button
                    className="rounded-lg p-2 hover:bg-gray-100"
                    icon="pi pi-paperclip"
                    onClick={handleFileClick}
                  /> */}
                  {/* <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*" // Chỉ chấp nhận hình ảnh
                    onChange={handleFileChange}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
