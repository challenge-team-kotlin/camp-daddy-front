import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Nav from "../../components/molecules/nav";
import styles from "./Main.module.scss";
import { getAllProducts } from "../../api/camp-daddy";
import { Link } from "react-router-dom";

export default function Main() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        console.log(data)
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div>
      <div className={styles.main} style={{ flex: 1 }}>
        <div className={styles.main_title}>
          <div className={styles.left_box}>
            <input
              type="text"
              className={styles.text}
              placeholder="검색어를 입력해주세요"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <div className={styles.date}>
              <input type="date" />
              <input type="date" />
            </div>
          </div>
          {search.length > 0 && <button>검색하기</button>}
          <button>검색하기</button>
        </div>
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
        <div className={styles.main_product}>
          <div></div>
          {products.map((product, index) => (
            <div key={index} className={styles.product_list}>
              <Link to={`/products/${product.productId}`} className={styles.left_box}>
                <img src={product.imageUrl} alt={product.title} className={styles.product_image} />
                <div>
                  <p>{product.title}</p>
                  <span>{product.pricePerDay}</span>
                </div>
              </Link>
              <div className={styles.right_box}>
                <button>좋아요</button>
                <p>{product.likes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Nav />
    </div>
  );
}
