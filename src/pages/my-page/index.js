import Nav from "../../components/molecules/nav";
import styles from "./Mypage.module.scss";

export default function MyPage() {
  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>마이페이지</h2>
      <div className={styles.button_wrap}>
        <button
          onClick={() => {
            window.location.href = "/my-page/my-info";
          }}
        >
          내 정보 수정
        </button>
        <button
          onClick={() => {
            window.location.href = "/my-page/sale-list-query";
          }}
        >
          판매 물품 조회
        </button>
        <button
          onClick={() => {
            window.location.href = "/my-page/reservation-list-query";
          }}
        >
          예약 목록 조회
        </button>
        <button
          onClick={() => {
            window.location.href = "/my-page/review-list-query";
          }}
        >
          리뷰 목록 조회
        </button>
        <button
          onClick={() => {
            localStorage.setItem('access_token', '')
            window.location.href = "/";
          }}
        >
          로그아웃
        </button>
      </div>
      <Nav />
    </div>
  );
}
