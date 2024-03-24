import Nav from "../../components/molecules/nav";
import styles from "./Search.module.scss";

export default function Search() {
  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>검색</h2>
      <div className={styles.search_wrap}>
        <div className={styles.search_box}>
          <p>카테고리</p>
          <select>
            <option>1번선택</option>
            <option>2번선택</option>
            <option>3번선택</option>
            <option>4번선택</option>
          </select>
        </div>
        <div className={styles.search_box}>
          <p>제목</p>
          <input type="text" />
        </div>
        <div className={styles.search_box}>
          <input type="date" className={styles.date} />
          <input type="date" className={styles.date} />
        </div>
        <button>검색</button>
      </div>
      <Nav />
    </div>
  );
}
