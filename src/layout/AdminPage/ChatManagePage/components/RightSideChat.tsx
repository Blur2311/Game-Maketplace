import { InputText } from "primereact/inputtext";
import { TabView, TabPanel } from "primereact/tabview";
import { ChatPerson } from "./ChatPerson"; // Assuming this component is already defined
import { useState } from "react";

export const RightSideChat = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Huy Dep Trai",
      avatar: "/cat.jpeg",
      mess: "Netflix and chill?",
      date: "1 hours ago",
      status: true,
      unread: false,
    },
    {
      id: 2,
      name: "Huy Dep Trai",
      avatar: "/cat.jpeg",
      mess: "Netflix and chill?",
      date: "1 hours ago",
      status: false,
      unread: true,
    },
    {
      id: 3,
      name: "Huy Dep Trai",
      avatar: "/cat.jpeg",
      mess: "Netflix and chill?",
      date: "1 hours ago",
      status: false,
      unread: true,
    },
    {
      id: 4,
      name: "Huy Dep Trai",
      avatar: "/cat.jpeg",
      mess: "Netflix and chill?",
      date: "1 hours ago",
      status: false,
      unread: true,
    },
    {
      id: 5,
      name: "Huy Dep Trai",
      avatar: "/cat.jpeg",
      mess: "Netflix and chill?",
      date: "1 hours ago",
      status: false,
      unread: true,
    },
  ]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const handleSelectChat = (id: number) => {
    setSelectedChatId(id);
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id ? { ...chat, unread: false } : chat,
      ),
    );
  };

  // Filter unread chats for the "Unread" tab
  const unreadChats = chats.filter((chat) => chat.unread);

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
            {/* Tab Tất cả */}
            <TabPanel
              header={
                <span
                  className={`${
                    activeIndex === 0
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
                    key={chat.id}
                    {...chat}
                    isSelected={selectedChatId === chat.id}
                    onSelect={handleSelectChat}
                  />
                ))}
              </ul>
            </TabPanel>

            {/* Tab Chưa đọc */}
            <TabPanel
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
                    onSelect={handleSelectChat}
                  />
                ))}
              </ul>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};
