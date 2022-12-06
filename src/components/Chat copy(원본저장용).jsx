import { useEffect } from "react";
import { useState } from "react";
import { messageData } from "./api/Firebase";
import * as React from "react";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

// 내가 만든 firebase의 프로젝트의 URL 이다.
// const databaseURL = "https://test-project-c773d-default-rtdb.firebaseio.com/";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const ITEM_HEIGHT = 48;

const Chat = ({ socket, room, username }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("messageReturn", (data) => {
      // console.log(data);
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    let chat = document.querySelector("#chat");
    chat.scrollTop = chat.scrollHeight;
  }, [messageList]);

  // 소켓에 message를 담아 서버에 전달 !
  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    // messageContent 값이 먼저 정의 된 후 메세지 전달.
    await socket.emit("message", messageContent);
    // 메세지 리스트에 방금 보낸 메세지도 함께 추가.
    setMessageList((prev) => [...prev, messageContent]);
    setMessage("");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  console.log("messageList", messageList);

  // mui 적용

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[600px] bg-white relative">
        <div className="w-full h-16 bg-gray-700 flex items-center p-3">
          {/* <div className="w-12 h-12 bg-white rounded-full"></div> */}
          {/* 프로필 지정 */}
          <Avatar alt="Remy Sharp" src="logo192.png" className="w-12 h-12" />
        </div>

        <div id="chat" className="w-full h-[400px] overflow-y-auto">
          {messageList &&
            messageList.map((msg, i) => (
              <PopupState key={i} variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment key={i}>
                    <div
                      key={i}
                      className={`${
                        username === msg.username ? "flex justify-end" : ""
                      }`}
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      <div
                        className={`${
                          username === msg.username
                            ? "bg-green-600"
                            : "bg-blue-600"
                        } w-2/3 h-auto p-2 text-white m-2 rounded-xl rounded-br-none`}
                      >
                        <div>{msg.message}</div>
                        <div className="w-full flex justify-end text-xs">
                          {msg.username}
                        </div>
                      </div>
                    </div>
                    <Menu {...bindMenu(popupState)}>
                      <box
                        component="MenuItem"
                        sx={{ display: "inline" }}
                        onClick={popupState.close}
                      >
                        🤐
                      </box>
                      <box
                        component="MenuItem"
                        sx={{ display: "inline" }}
                        onClick={popupState.close}
                      >
                        🚨
                      </box>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-3/4 h-12 border p-3 outline-none"
            type="text"
            placeholder="message send"
            onKeyDown={onKeyPress}
          />
          <button
            onClick={sendMessage}
            className="w-1/4 bg-indigo-600 text-white h-12 hover-opacity-70"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
