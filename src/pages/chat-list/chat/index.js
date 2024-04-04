import Nav from "../../../components/molecules/nav";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getChatRoomDetail } from "../../../api/camp-daddy";
import styles from "./Chat.module.scss";
import { Stomp } from "@stomp/stompjs";
import { jwtDecode } from "jwt-decode";
import SockJS from "sockjs-client";

export default function Chat() {
  const [datas, setDatas] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const stompClient = useRef(null);
  const user = jwtDecode(localStorage.getItem("access_token"));

  const connect = () => {
    const socket = new WebSocket(
      `${process.env.REACT_APP_SOCKET_API_URL}/ws/chat`
    );
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect(
      {
        Authorization: `${localStorage.getItem("access_token")}`,
      },
      () => {
        stompClient.current.subscribe(
          `/sub/chat/${id}`,
          (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          },
          {
            Authorization: `${localStorage.getItem("access_token")}`,
          }
        );
      }
    );
  };

  const saveMessage = (event) => {
    setMessage(event.target.value);
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  const sendMessage = () => {
    if (stompClient.current && message) {
      const messageObj = {
        userId: user.sub,
        nickname: user.nickname,
        message: message,
        status: "MESSAGE",
      };
      stompClient.current.send(
        `/pub/chat/${id}`,
        {
          Authorization: `${localStorage.getItem("access_token")}`,
        },
        JSON.stringify(messageObj)
      );
      setMessage(""); // 입력 필드 초기화
    }
  };

  useEffect(() => {
    connect();
    const fetchChatRoomData = async () => {
      try {
        const res = await getChatRoomDetail(id);
        setDatas(res.data);
        setMessages(res.data.chatHistory);
      } catch (e) {
        alert(e.response.data.payload);
        window.location.href = "/";
      }
    };
    fetchChatRoomData();
    return () => disconnect();
  }, [id]);

  return (
    <div className={styles.my_main}>
      {datas && <h2 className={styles.title}>{datas.productDetail.title}</h2>}
      <div className={styles.chat_box}>
      {messages.map((data, index) => (
        <div key={index}>
          {data.status === "MESSAGE" && (
              <>
                <div className={styles.nick_message}>
                  <p className={styles.nick}>{data.nickname}</p>
                  <p className={styles.message}>{data.message}</p>
                </div>
                <span className={styles.createdAt}>{data.createdAt.replace('T', ' ').split('.')[0].replaceAll('-', '.')}</span>
              </>
          )}
          {data.status === "NOTICE" && (
            <>
              <hr />
              <p>공지입니다.</p>
              <p>{data.message}</p>
              <span>{data.createdAt}</span>
            </>
          )}
        </div>
      ))}
      </div>
      <div className={styles.text_input_div}>
        <div className={styles.text_input}>
          <input type="text" size={60} value={message} onChange={saveMessage} />
          <button
            onClick={() => {
              sendMessage();
            }}
          >
            전송
          </button>
        </div>
      </div>

      <Nav />
    </div>
  );
}
