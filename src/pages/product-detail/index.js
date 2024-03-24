import Nav from "../../components/molecules/nav";
import styles from "./ProductDetail.module.scss";

export default function ProductDetail() {
  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>상품 상세페이지</h2>
      <div className={styles.banner}>
        <img src="images/product_img.png" alt="" />
        <p>제목 입니다</p>
        <span>본문내용 입니다</span>
      </div>
      <div className={styles.btn_box}>
        <button>예약하기</button>
        <button>문의하기</button>
      </div>
      <div className={styles.review_wrap}>
        <h6>리뷰</h6>
        <div className={styles.review_box}>
          <img src="images/product_img.png" alt="" />
          <div>
            <p>작성자이름</p>
            <span>리뷰 내용</span>
          </div>
        </div>
        <div className={styles.review_box}>
          <img src="images/product_img.png" alt="" />
          <div>
            <p>작성자이름</p>
            <span>리뷰 내용</span>
          </div>
        </div>
        <div className={styles.review_box}>
          <img src="images/product_img.png" alt="" />
          <div>
            <p>작성자이름</p>
            <span>리뷰 내용</span>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}
