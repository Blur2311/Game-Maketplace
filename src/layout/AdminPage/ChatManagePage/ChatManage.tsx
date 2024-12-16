import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { FaBell } from "react-icons/fa";
import apiClient from "../../../config/apiClient"; // Ensure you have the correct path to your apiClient
import "./ChatManage.css"; // Import file CSS
import { useAuthCheck } from "../../../utils/AuthUtils";

interface ChatRoom {
  id: number;
  userName: string;
}

interface JWTPayload {
  userId?: number;
  name?: string;
  exp?: number; // Thời gian hết hạn (epoch time)
  [key: string]: any; // Cho phép các thuộc tính khác
}

export const ChatManage = () => {
  useAuthCheck(['ADMIN', 'STAFF']);
  const [uploading, setUploading] = useState(false);
  const [visibleModal, setVisibleModal] = useState<number | null>(null);
  const [messages, setMessages] = useState<
    { content: string; staff: boolean }[]
  >([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [user, setUser] = useState<JWTPayload | null>(null);

  const fetchChatRooms = async () => {
    try {
      const response = await apiClient.get("/api/chat/room-chat");
      const rooms = response.data.data.map((room: any) => ({
        id: room.id,
        userName: room.userName,
      }));

      setChatRooms(rooms);

      const token = localStorage.getItem("token");
      if (token) {
        decodeJWT(token);
      }
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  };

  useEffect(() => {
    // Fetch messages initially
    fetchChatRooms();

    // Set up interval to fetch messages every 5 seconds
    const interval = setInterval(fetchChatRooms, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const toggleModal = async (index: number, username: string) => {
    setVisibleModal((prevState) => (prevState === index ? null : index));
    const response = await apiClient.get(`/api/chat/room/${username}`);
    setMessages(response.data);
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
      // console.log(decodedPayload);
      return JSON.parse(decodedPayload) as JWTPayload;
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  }

  const handleSendMessage = async (userName: String) => {
    if (newMessage.trim()) {
      setMessages([...messages, { content: newMessage, staff: true }]);
      setNewMessage("");

      try {
        const response = await apiClient.post(
          `/api/chat/send/false?userName=Phat`,
          newMessage,
          {
            headers: {
              "Content-Type": "text/plain",
            },
          },
        );
        console.log("Message sent:", response.data);
        loadDatta;
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const loadDatta = async () => {
    const response = await apiClient.get(`/api/chat/room/Phat`);
    setMessages(response.data);
  };

  return (
    <>
      <div className="">
        <h1 className="text-[32px] font-medium">
          Notification - Room - Support
        </h1>
        <div className="mt-6">
          <div className="col-span-12 md:col-span-8">
            <div className="rounded-[20px] shadow-adminBoxshadow">
              <div className="px-6 py-8">
                <div className="flex flex-wrap gap-4">
                  {chatRooms.map((room, index) => (
                    <div key={room.id}>
                      <Button
                        type="button"
                        className="flex items-center px-3 py-2 text-white rounded-md bg-zinc-700"
                        onClick={() => toggleModal(index, room.userName)}
                      >
                        <FaBell className="mr-2 shake" />
                        {room.userName}
                      </Button>

                      <Dialog
                        header={`Chat Room ${room.userName}`}
                        visible={visibleModal === index}
                        style={{ width: "50vw" }}
                        onHide={() => toggleModal(index, room.userName)}
                      >
                        <div className="">
                          <div className="messages">
                            {messages.map((msg, i) => (
                              <div
                                key={i}
                                className={`message ${msg.staff ? "sent" : "received"}`}
                              >
                                {msg.content}
                              </div>
                            ))}
                          </div>
                          <div className="input-container">
                            <input
                              type="text"
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              placeholder="Type your message..."
                              className="message-input"
                            />
                            <button
                              // onClick={handleSendMessage}
                              className="p-2 ml-2 text-white bg-yellow-400 rounded-full hover:bg-blue-600 focus:outline-none"
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
                      </Dialog>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
