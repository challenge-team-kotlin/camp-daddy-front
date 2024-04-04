import Nav from "../../../components/molecules/nav";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getChatRoomDetail, memberInfo } from "../../../api/camp-daddy";
import styles from "./Chat.module.scss";
import { Stomp } from "@stomp/stompjs";
import { jwtDecode } from "jwt-decode";

export default function Chat() {
  const [datas, setDatas] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [myProfile, setMyProfile] = useState();

  const messageEndRef = useRef();

  const stompClient = useRef(null);
  const user = jwtDecode(localStorage.getItem("access_token"));

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
      setMessage("");
    }
  };

  useEffect(() => {
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
    const fetchUserInfo = async () => {
      try {
        const res = await memberInfo(user.sub);
        setMyProfile(res.data);
      } catch (e) {
        alert(e.response.data.payload);
        window.location.href = "/";
      }
    };
    fetchUserInfo();
    connect();
    fetchChatRoomData();
    return () => disconnect();
  }, [id]);

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.my_main}>
      {datas && <h2 className={styles.title}>{datas.productDetail.title}</h2>}
      <div className={styles.chat_box}>
        {messages.map((data, index) => (
          <div key={index}>
            {data.status === "MESSAGE" &&
              myProfile.nickname === data.nickname && (
                <div className={styles.my_message}>
                  <div className={styles.nick_message_created}>
                    <div
                      className={styles.nick_message}
                      style={{ textAlign: "right", paddingRight: 10 }}
                    >
                      <p className={styles.nick}>{data.nickname}</p>
                      <p className={styles.message}>{data.message}</p>
                    </div>
                    <span
                      className={styles.createdAt}
                      style={{
                        textAlign: "right",
                        display: "block",
                        paddingRight: 10,
                      }}
                    >
                      {data.createdAt
                        .replace("T", " ")
                        .split(".")[0]
                        .replaceAll("-", ".")}
                    </span>
                  </div>
                </div>
              )}
            {data.status === "MESSAGE" &&
              myProfile.nickname !== data.nickname && (
                <div className={styles.u_message}>
                  <div className={styles.nick_message_created}>
                    <div className={styles.nick_message}>
                      <p className={styles.nick}>{data.nickname}</p>
                      <p className={styles.message}>{data.message}</p>
                    </div>
                    <span className={styles.createdAt}>
                      {data.createdAt
                        .replace("T", " ")
                        .split(".")[0]
                        .replaceAll("-", ".")}
                    </span>
                  </div>
                </div>
              )}
            {data.status === "NOTICE" && (
              <div className={styles.announcement}>
                <div className={styles.announcement_box}>
                  <p>공지입니다.</p>
                  <p>{data.message}</p>
                  <span>
                    {data.createdAt
                      .replace("T", " ")
                      .split(".")[0]
                      .replaceAll("-", ".")}
                  </span>
                </div>
              </div>
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
      <div ref={messageEndRef}></div>
      <Nav />
    </div>
  );
}
