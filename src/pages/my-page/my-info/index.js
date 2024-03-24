import Nav from "../../../components/molecules/nav";
import styles from "../Mypage.module.scss";

export default function MyInfo() {
  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>내 정보</h2>
      <div className={styles.info_wrap}>
        <div className={styles.input_box}>
          <p>이름</p>
          <input type="text" />
        </div>
        <div className={styles.input_box}>
          <p>닉네임</p>
          <input type="text" value={"백엔드값"} disabled />
        </div>
        <div className={styles.input_box} style={{ paddingBottom: 50 }}>
          <p>핸드폰 번호</p>
          <input type="number" maxLength={11} />
        </div>
        <button>수정하기</button>
      </div>
      <Nav />
    </div>
  );
}
