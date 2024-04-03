import Nav from "../../components/molecules/nav";
import styles from "./ChatList.module.scss";
import {getChatRoom} from "../../api/camp-daddy";

export default function ChatList() {
    const chatRoom = (id) => {
        getChatRoom(id).then((res) => {
            console.log(res)
        })
    }

    return (
        <div className={styles.my_main}>
            <h2 className={styles.title}>채팅 리스트</h2>
            <div className={styles.chat_wrap}>
                {/*{data.map((data, index) => (*/}
                    <div>
                        <div onClick={() => {window.location.href="/chat"}} className={styles.chatItem}>
                            <div className={styles.productImage}>
                            </div>
                            <div className={styles.chatDetails}>
                                <div className={styles.infoAndDate}>
                                    <div className={styles.userInfo}>
                                        상대방이름
                                    </div>
                                    <div className={styles.lastChatDate}>
                                        마지막 채팅 날짜
                                    </div>
                                </div>
                                <div className={styles.lastChatMessage}>
                                    마지막 채팅 메세지
                                </div>
                            </div>
                        </div>
                    </div>
                {/*))}*/}
            </div>
            <Nav />
        </div>
    )
}