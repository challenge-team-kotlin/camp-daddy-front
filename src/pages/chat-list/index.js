import Nav from "../../components/molecules/nav";
import styles from "./ChatList.module.scss";
import { getChatRoom } from "../../api/camp-daddy";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { handleImgError } from "../../components/handleImage";

export default function ChatList() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchChatRoomData = async () => {
      try {
        const decode = jwtDecode(localStorage.getItem("access_token"));

        const res = await getChatRoom(decode.sub);
        res.data.forEach((e) => {
          e.productImageUrl = !e.productImageUrl ? "" : e.productImageUrl;
          e.lastChatDate = !e.lastChatDate
            ? ""
            : e.lastChatDate.replace("T", " ");
          e.lastChatMessage = !e.lastChatMessage
            ? "아직 메시지가 없어요"
            : e.lastChatMessage;
        });
        setDatas(res.data);
      } catch (e) {
        alert(e.response.data.payload);
      }
    };

    fetchChatRoomData();
  }, []);

  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>채팅 리스트</h2>
      <div className={styles.chat_wrap}>
        {datas.map((data, index) => (
          <div key={index}>
            <div
              onClick={() => {
                window.location.href = `/chat/${data.chatRoomId}`;
              }}
              className={styles.chatItem}
            >
              <div className={styles.productImage}>
              <img src={data.productImageUrl} alt="" onError={handleImgError} />
              </div>
              <div className={styles.chatDetails}>
              <div className={styles.userInfo}>{data.productTitle}</div>
                <div className={styles.infoAndDate}>
                  <div className={styles.userInfo}>{data.nickname}</div>
                  <div className={styles.lastChatDate}>{data.lastChatDate}</div>
                </div>
                <div className={styles.lastChatMessage}>
                  {data.lastChatMessage}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Nav />
    </div>
  );
}
