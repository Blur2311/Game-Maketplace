import { InputText } from "primereact/inputtext";
import { TabView, TabPanel } from "primereact/tabview";
import { ChatPerson } from "./ChatPerson"; // Assuming this component is already defined
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";

import apiClient from "../../../../config/apiClient";
import React from "react";

type Room = {
  id: number;
  userName: string
};

type RightSideChatProps = {
  onUserNameSelect: (userName: string) => void;
  onFirstChatLoad: () => void;
};


export const RightSideChat = (({ onUserNameSelect, onFirstChatLoad }: RightSideChatProps) => {

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [chats, setChats] = useState<Room[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const handleSelectChat = (id: number) => {
    setSelectedChatId(id);
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id ? { ...chat, unread: false } : chat,
      ),
    );
    const selectedChat = chats.find((chat) => chat.id === id);
    if (selectedChat) {
      // Gọi callback với userName khi chọn một cuộc trò chuyện
      onUserNameSelect(selectedChat.userName);
    }
  };

  const fetchData = async () => {
    const response = await apiClient.get(`/api/chat/room-chat`);
    setChats(response.data.data);
  }

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Chọn cuộc trò chuyện đầu tiên khi dữ liệu đã tải
    if (chats.length > 0 && !selectedChatId) {
      handleSelectChat(chats[0].id); // Tự động chọn chat đầu tiên
      onFirstChatLoad(); // Gọi callback để thông báo cho parent (ChatManageV2)
    }
  }, [chats, selectedChatId, onFirstChatLoad]);

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <h5 className="text-2xl font-medium">Chats</h5>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="relative w-full rounded-lg border bg-transparent shadow-adminInputShadow hover:border-black">
          <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray100"></i>
          <InputText
            placeholder="Search contacts"
            className="w-full bg-transparent py-[17px] pl-10 pr-3 text-sm text-black focus:ring-0"
          />
        </div>

        <div className="">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel
              header={
                <span
                  className={`${activeIndex === 0
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : ""
                    } text-sm font-medium`}
                >
                  All
                </span>
              }
              className="custom-chat-tab"
            >
              <ul className="flex flex-col gap-2 font-inter">
                {chats.map((chat) => (
                  <ChatPerson
                    name={`${chat.userName}`} avatar={"/cat.jpeg"} mess={""} date={""} unread={false} key={chat.id}
                    {...chat}
                    isSelected={selectedChatId === chat.id}
                    onSelect={handleSelectChat} />
                ))}
              </ul>
            </TabPanel>

            {/* Tab Chưa đọc */}
            {/* <TabPanel
              header={
                <span
                  className={`${
                    activeIndex === 1
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : ""
                  } text-sm font-medium`}
                >
                  Unread
                </span>
              }
              className="custom-chat-tab"
            >
              <ul className="flex flex-col gap-2 font-inter">
                {unreadChats.map((chat) => (
                  <ChatPerson
                    key={chat.id}
                    {...chat}
                    isSelected={selectedChatId === chat.id}
                    onSelect={handleSelectChat}                  />
                ))}
              </ul>
            </TabPanel> */}
          </TabView>
        </div>
      </div>
    </div>
  );
});

