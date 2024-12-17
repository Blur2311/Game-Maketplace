import { Button } from "primereact/button";
import { ReceivedMessage } from "../AdminPage/ChatManagePage/components/ReceivedMessage";
import { SentMessage } from "../AdminPage/ChatManagePage/components/SentMessage";
import { InputText } from "primereact/inputtext";
import { useState, useRef, ChangeEvent } from "react";
import { getUsernameFromToken } from '../../utils/AuthUtils';
import { format } from 'date-fns';

interface Message {
  id: number; // ID của tin nhắn
  channel: string | null; // Channel name (nếu cần tên channel dưới dạng chuỗi)
  senderName: string | null; // Tên người gửi
  senderRole: string | null; // Vai trò người gửi
  content: string; // Nội dung tin nhắn
}

export const ChatV2 = () => {
  const [visible, setVisible] = useState(false);
  const [textChat, setTextChat] = useState("");
  const [messages, setMessages] = useState<Message[]>([]); // Mảng các tin nhắn
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null); // WebSocket reference
  const [username, setUsername] = useState<string | null>(null); // Username người dùng
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Lấy file đầu tiên trong danh sách các file
    if (file) {
      console.log("File đã chọn:", file);
      // Xử lý file hoặc hình ảnh ở đây, ví dụ gửi lên server
    }
  };
  const handleFileClick = () => {
    fileInputRef.current?.click();

    sendMessage();
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextChat(e.target.value);

  };

  // Khi nhấn nút, mở chat và kết nối WebSocket
  const toggleVisi = () => {
    if (!visible) {
      openWebSocket();
    } else {
      socketRef.current?.close(); // Đóng kết nối WebSocket khi ẩn
      socketRef.current = null; // Reset socket
    }
    setVisible(!visible);
  };

  // Hàm gửi tin nhắn
  const sendMessage = () => {
    if (!textChat.trim()) {
      return;
    } else {
      const formattedMessage = `message:STAFF:${username}:${textChat}`;
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

  // Hàm mở WebSocket
  const openWebSocket = () => {

    const user = getUsernameFromToken();
    if (!user) return;
    setUsername(user);

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

  return (
    <>
      <div className="rounded bg-white">
        <h1 className="p-10 pb-[30px] text-3xl">Chat Support</h1>
        <div className="p-0 sm:px-10 sm:pb-10">
          <div
            className={`flex flex-col items-center gap-5 rounded bg-gray250 py-5 ${visible ? "hidden" : ""}`}
          >
            <p className="text-sm font-light">
              Got a question? We're here to assist you right away!
            </p>
            <Button
              label="GET STARTED"
              size="large"
              className="mt-5 h-[50px] w-[150px] bg-mainYellow text-xs font-bold text-slate-900 hover:brightness-105"
              onClick={toggleVisi}
            // disabled={isLockedOut}
            />
          </div>

          <div
            className={`flex max-h-screen min-h-[200px] sm:max-h-[550px] ${visible ? "" : "hidden"}`}
          >
            <div className="flex flex-1 flex-col overflow-hidden rounded bg-gray250 px-2 pb-2">
              <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-2">
                <div className="flex items-center gap-4">
                  <h6 className="truncate text-sm font-medium">
                    We will reply as soon as we can
                  </h6>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-white p-6">
                {/* <ReceivedMessage
                  avatar={"/cat.jpeg"}
                  name={"Huy Dep Trai"}
                  message={"Feel free to ask us anything – we're here to help!"}
                  date={"2024-12-15T15:50:00"}
                />
                <SentMessage
                  avatar={"/cat.jpeg"}
                  name={"Huy Dep Trai"}
                  message={"Rizzler!~"}
                  date={"2024-12-16T15:50:00"}
                /> */}
                {messages.length === 0 ? (
                  <p>No messages yet. Start the conversation!</p>
                ) : (
                  messages.map((msg, index) => {
                    return msg.senderName === username ? (
                      <SentMessage
                        key={index}
                        avatar={"/cat.jpeg"}
                        channel={null}
                        senderName={msg.senderName || "You"}
                        senderRole={null}
                        content={msg.content}
                      />
                    ) : (
                      <ReceivedMessage
                        key={index}
                        avatar={"/cat.jpeg"}
                        channel={null}
                        senderName={msg.senderName || "Admin"}
                        senderRole={null}
                        content={msg.content}
                      />
                    );
                  })
                )}


              </div>

              <div className="flex items-center gap-4 bg-white px-6 py-2">
                <div className="flex-1">
                  <InputText
                    placeholder="Leave a message"
                    className="h-9 w-full rounded-lg border bg-transparent px-3 text-sm text-black transition duration-100 ease-linear focus:border-2 focus:border-mainYellow focus:ring-0"
                    value={textChat}
                    onChange={handleTextChange}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    className={`rounded-lg p-2 ${textChat.trim().length != 0 && "bg-mainYellow text-white hover:brightness-95"}`}
                    icon={`pi pi-send`}
                    disabled={textChat.trim().length === 0}
                    onClick={handleFileClick}
                  />
                  <div>
                    {/* <Button
                      className="rounded-lg p-2 hover:bg-gray-100"
                      icon="pi pi-paperclip"
                      
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
      </div>
    </>
  );
};
