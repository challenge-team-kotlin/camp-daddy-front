import Nav from "../../components/molecules/nav";
import styles from "./ProductAdd.module.scss";

export default function ProductAdd() {
  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>상품 추가</h2>
      <div style={{ padding: 20 }}>
        <input type="file" />
      </div>
      <div className={styles.add}>
        <input type="text" placeholder="제목을 입력해 주세요." />
        <textarea rows={10} cols={10} placeholder="내용을 입력해 주세요" />
        <button>작성하기</button>
      </div>
      <Nav />
    </div>
  );
}
