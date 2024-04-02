import React, { useState, useEffect } from "react";
import Nav from "../../components/molecules/nav";
import styles from "./ProductList.module.scss";
import { useLocation } from "react-router-dom";
import { apiClient } from "../../api/client";
import { getProducts } from "../../api/camp-daddy";

export default function ProductList() {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const searchParam = new URLSearchParams(location.search)
    const searchData = {
      title: searchParam.get("title"),
      startDate: searchParam.get("startDate"),
      endDate: searchParam.get("endDate"),
      category: searchParam.get("category"),
      page: searchParam.get("page") - 1,
      filterReservation: searchParam.get("filterReservation")
    }

    console.log(searchData)
    const fetchData = async () => {
      try {
        const data = await getProducts(searchData);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };


    fetchData();
  }, [])



  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>상품리스트</h2>
      <div className={styles.checkbox}>
        <input type="checkbox" id="checkbox01" />
        <label htmlFor="checkbox01">거래 가능만 보기</label>
      </div>
      <div className={styles.product_wrap}>
        {products.map(product => (
          <button
            key={product.id}
            onClick={() => {
              window.location.href = `/product-detail/${product.id}`;
            }}
          >
            <img src={product.image} alt={product.title} />
            <div>
              <p>{product.title}</p>
              <span>{product.price}</span>
            </div>
          </button>
        ))}
      </div>
      <Nav />
    </div>
  );
}
