import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Nav from "../../components/molecules/nav";
import styles from "./Main.module.scss";
import { getAllProducts } from "../../api/camp-daddy";
import { Link } from "react-router-dom";
import { handleImgError } from "../../components/handleImage";

export default function Main() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
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
        <div className={styles.main_banner}>
          {/* Swiper 사용 */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            loop={true}
          >
            <SwiperSlide>
              <div className={styles.banner_list}>
                <a href="http://dooingle.net">
                  <img src="images/dooingle.png" ></img>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.banner_list}>
                <a href="http://moauniverse.com/">
                  <img src="images/moamoa.png"></img>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.banner_list}>
                <a href="http://ticketradar.net">
                  <img src="images/ticketradar.png"></img>
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.banner_list}>
                <a href="https://zziririt.kr">
                  <img src="images/zziririt.png"></img>
                </a>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>

        <div className={styles.main_product}>
          {/* 상품목록 출력 */}
          {products.map((product, index) => (
            <div key={index} className={styles.product_list}>
              <Link
                to={`/products/${product.productId}`}
                className={styles.left_box}
              >
                <img
                  src={product.imageUrl}
                  alt=""
                  onError={handleImgError}
                  className={styles.product_image}
                />
                <div>
                  <p>{product.title}</p>
                  
                </div>
              </Link>
              <span className={styles.price}>{product.pricePerDay} 원</span>
            </div>
          ))}
        </div>
      </div>
      <Nav />
    </div>
  );
}
