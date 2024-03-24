import Nav from "../../components/molecules/nav";
import styles from "./ProductList.module.scss";

export default function ProductList() {
  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>상품리스트</h2>
      <div className={styles.checkbox}>
        <input type="checkbox" id="checkbox01" />
        <label htmlFor="checkbox01">거래 가능만 보기</label>
      </div>
      <div className={styles.product_wrap}>
        <button
          onClick={() => {
            window.location.href = "/product-detail";
          }}
        >
          <img src="images/product_img.png" alt="" />
          <div>
            <p>제목은 길게 들어갑니다</p>
            <span>가격</span>
          </div>
        </button>
        <button
          onClick={() => {
            window.location.href = "/product-detail";
          }}
        >
          <img src="images/product_img.png" alt="" />
          <div>
            <p>제목은 길게 들어갑니다</p>
            <span>가격</span>
          </div>
        </button>
        <button
          onClick={() => {
            window.location.href = "/product-detail";
          }}
        >
          <img src="images/product_img.png" alt="" />
          <div>
            <p>제목은 길게 들어갑니다</p>
            <span>가격</span>
          </div>
        </button>
        <button
          onClick={() => {
            window.location.href = "/product-detail";
          }}
        >
          <img src="images/product_img.png" alt="" />
          <div>
            <p>제목은 길게 들어갑니다</p>
            <span>가격</span>
          </div>
        </button>
      </div>
      <Nav />
    </div>
  );
}
