import React, { useState, useEffect } from "react";
import Nav from "../../components/molecules/nav";
import styles from "./ProductList.module.scss";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../api/camp-daddy";
import { handleImgError } from "../../components/handleImage";

export default function ProductList() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    fetchData(); // 페이지 로딩 시 데이터를 가져오는 함수 호출
    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 감지

    return () => {
      window.removeEventListener('scroll', handleScroll); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    };
  }, []);

  useEffect(() => {
    fetchData(); // 페이지가 변경될 때마다 데이터를 다시 가져오는 함수 호출
  }, [page]); // page 상태가 변경될 때마다 호출

  const fetchData = async () => {
    const searchParam = new URLSearchParams(location.search)
    const searchData = {
      title: searchParam.get("title"),
      startDate: searchParam.get("startDate"),
      endDate: searchParam.get("endDate"),
      category: searchParam.get("category"),
      page: page,
      filterReservation: searchParam.get("filterReservation") === "true" // Convert to boolean
    }
    setShowAvailableOnly(searchData.filterReservation);

    try {
      const data = await getProducts(searchData);
      const updatedProducts = [...products, ...data.content]; // 이전 데이터와 새로운 데이터를 합침
      updatedProducts.forEach(e => {
        e.image = !e.image ? "" : e.image
      });
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    ) {
      nextPage(); // 스크롤이 페이지 하단에 도달하면 다음 페이지 호출
    }
  };

  const nextPage = () => {
    setPage(prevPage => prevPage + 1); // 현재 페이지를 1 증가시킴
  };

  const handleCheckboxChange = () => {
    setShowAvailableOnly(!showAvailableOnly);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("filterReservation", !showAvailableOnly ? "true" : "false");
    window.location.href = `${location.pathname}?${searchParams.toString()}`;
  };

  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>상품리스트</h2>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          id="checkbox01"
          checked={showAvailableOnly}
          onChange={handleCheckboxChange} // Handle checkbox change event
        />
        <label htmlFor="checkbox01">거래 가능만 보기</label>
      </div>
      <div className={styles.product_wrap}>
        {products.map(product => (
          <button
            key={product.productId}
            onClick={() => {
              window.location.href = `/products/${product.productId}`;
            }}
          >
            <img onError={handleImgError} src={product.image} alt={product.title} />
            <div>
              <p>{product.title}</p>
              <span>{product.pricePerDay}</span>
            </div>
          </button>
        ))}
      </div>
      <Nav />
    </div >
  );
}
