import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Nav from "../../components/molecules/nav";
import styles from "./Main.module.scss";

export default function Main() {
  return (
    <div className="nav_wrap">
      <div className={styles.main} style={{ flex: 1 }}>
        {/* 타이틀 검색 영역 */}
        <div className={styles.main_title}>
          <div className={styles.left_box}>
            <input
              type="text"
              className={styles.text}
              placeholder="검색어를 입력해주세요"
            />
            <div className={styles.date}>
              <input type="date" />
              <input type="date" />
            </div>
          </div>
          <button>검색하기</button>
        </div>
        {/* 롤링 배너 */}
        <div className={styles.main_banner}>
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            style={{
              height: 300,
            }}
          >
            <SwiperSlide>
              <div className={styles.banner_list}>111</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.banner_list}>22</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.banner_list}>33</div>
            </SwiperSlide>
          </Swiper>
        </div>
        {/* 상품 리스트 */}
        <div className={styles.main_product}>
          <div className={styles.product_list}>
            <div className={styles.left_box}>
              <img src={"images/product_img.png"} alt="dddd" />
              <div>
                <p>타이틀 영역 입니다.</p>
                <span>가격 영역 입니다.</span>
              </div>
            </div>
            <div className={styles.right_box}>
              <button>좋아요</button>
              <p>0</p>
            </div>
          </div>
          <div className={styles.product_list}>
            <div className={styles.left_box}>
              <img src={"images/product_img.png"} alt="dddd" />
              <div>
                <p>타이틀 영역 입니다.</p>
                <span>가격 영역 입니다.</span>
              </div>
            </div>
            <div className={styles.right_box}>
              <button>좋아요</button>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}
