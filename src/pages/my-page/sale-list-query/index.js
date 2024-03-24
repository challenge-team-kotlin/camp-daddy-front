import Nav from "../../../components/molecules/nav";
import styles from "../Mypage.module.scss";

export default function SaleListQuery() {
  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>회원별 판매 상품 조회</h2>
      <div className={styles.sale_product_wrap}>
        <div>
          <button
            className={styles.sale_product}
            onClick={() => {
              window.location.href = "/product-detail";
            }}
          >
            <img src="../images/product_img.png" alt="" />
            <div>
              <p>제목입니다</p>
              <div>
                <span>판매중</span>
                <b>가격</b>
              </div>
            </div>
          </button>
          <div className={styles.sale_btn}>
            <button>수정하기</button>
            <button className={styles.red}>삭제하기</button>
          </div>
        </div>
        <div>
          <button
            className={styles.sale_product}
            onClick={() => {
              window.location.href = "/product-detail";
            }}
          >
            <img src="../images/product_img.png" alt="" />
            <div>
              <p>제목입니다</p>
              <div>
                <span>판매중</span>
                <b>가격</b>
              </div>
            </div>
          </button>
          <div className={styles.sale_btn}>
            <button>수정하기</button>
            <button className={styles.red}>삭제하기</button>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}
