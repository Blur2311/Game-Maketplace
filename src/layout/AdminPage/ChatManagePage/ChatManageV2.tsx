import { InputText } from "primereact/inputtext";
import { ChangeEvent, useRef, useState } from "react";
import "./ChatManage.css";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { PiBell, PiTrash } from "react-icons/pi";
import { SentMessage } from "./components/SentMessage";
import { ReceivedMessage } from "./components/ReceivedMessage";
import { Sidebar } from "primereact/sidebar";
import { RightSideChat } from "./components/RightSideChat";

export const ChatManageV2 = () => {
  const [sideChat, setSideChat] = useState(false);
  const [visible, setVisible] = useState(false);
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const [textChat, setTextChat] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <>
      <div className="z-10 flex max-h-screen min-h-[400px] flex-1">
        <Sidebar
          visible={visible}
          onHide={toggleSidebar}
          position="left"
          className="custom-sidebar bg-white"
        >
          <div
            className={`w-[320px] border-r transition-all duration-[225ms] ease-[cubic-bezier(0,0,0.2,1)]`}
          >
            <RightSideChat />
          </div>
        </Sidebar>
        <div
          className={`w-[320px] border-r transition-all duration-[225ms] ease-[cubic-bezier(0,0,0.2,1)] ${sideChat ? "ml-[-320px]" : ""}`}
        >
          <RightSideChat />
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
                <h6 className="truncate text-sm font-medium">Huy Dep Trai</h6>
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
                    <li className="flex cursor-pointer items-center gap-4 whitespace-nowrap rounded-lg px-2 py-1 hover:bg-black hover:bg-opacity-5">
                      <PiTrash size={20} />
                      <p>Delete</p>
                    </li>
                    <li className="flex cursor-pointer items-center gap-4 whitespace-nowrap rounded-lg px-2 py-1 hover:bg-black hover:bg-opacity-5">
                      <PiBell size={20} />
                      <p>Mute</p>
                    </li>
                  </ul>
                </OverlayPanel>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
              <SentMessage
                avatar={"/cat.jpeg"}
                name={"Huy Dep Trai"}
                message={"Rizzler!~"}
              />
              <ReceivedMessage
                avatar={"/cat.jpeg"}
                name={"Huy Dep Trai"}
                img="/cat.jpeg"
                message={"Rizzler!~"}
              />
              <SentMessage
                avatar={"/cat.jpeg"}
                name={"Huy Dep Trai"}
                message={"Rizzler!~"}
              />
              <ReceivedMessage
                avatar={"/cat.jpeg"}
                name={"Huy Dep Trai"}
                img="/cat.jpeg"
                message={"Rizzler!~"}
              />
              <SentMessage
                avatar={"/cat.jpeg"}
                name={"Huy Dep Trai"}
                message={"Rizzler!~"}
              />
              <ReceivedMessage
                avatar={"/cat.jpeg"}
                name={"Huy Dep Trai"}
                img="/cat.jpeg"
                message={"Rizzler!~"}
              />
            </div>

            <div className="flex items-center gap-4 px-6 py-2">
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
