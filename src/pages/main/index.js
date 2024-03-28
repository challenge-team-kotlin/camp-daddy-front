import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Nav from "../../components/molecules/nav";
import styles from "./Main.module.scss";
import { getAllProducts } from "../../api/camp-daddy";



export default function Main() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getAllProducts().then((data) => {
      console.log(data)
      setProducts(data)
    })
  }, [search])
  return (
    <div>
      <div className={styles.main} style={{ flex: 1 }}>
        {/* 타이틀 검색 영역 */}
        <div className={styles.main_title}>
          <div className={styles.left_box}>
            <input
              type="text"
              className={styles.text}
              placeholder="검색어를 입력해주세요"
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />
            <div className={styles.date}>
              <input type="date" />
              <input type="date" />
            </div>
          </div>
          {
            search.length > 0 &&
            <button >검색하기</button>
          }
          <button >검색하기</button>
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
          <div>캠핑 용품.</div>
          {
            products.map((product, index) => (
              <div key={index} className={styles.product_list}>
                <button className={styles.left_box}>
                  <img src={product.image} alt={product.title} />
                  <div>
                    <p>{product.title}</p>
                    <span>{product.price}</span>
                  </div>
                </button>
                <div className={styles.right_box}>
                  <button>좋아요</button>
                  <p>{product.likes}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Nav />
    </div >
  );
}
