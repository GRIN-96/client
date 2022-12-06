import { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Room from "./components/Room";
import io from "socket.io-client";

// express 9999 서버에 데이터를 전달해주는 socket 객체 생성.
const socket = io.connect("http://192.168.0.25:9999");
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chatScreen, setChatScreen] = useState(false);

  return (
    <div className="App">
      {/* 삼항연산자를 통해 chatScreen이 
      true면 채팅화면, false면 값 입력화면으로 */}

      {!chatScreen ? (
        <Room
          username={username}
          room={room}
          setUsername={setUsername}
          setRoom={setRoom}
          setChatScreen={setChatScreen}
          socket={socket}
        />
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
