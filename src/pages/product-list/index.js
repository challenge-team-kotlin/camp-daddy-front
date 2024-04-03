import React, { useState, useEffect } from "react";
import Nav from "../../components/molecules/nav";
import styles from "./ProductList.module.scss";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../api/camp-daddy";
import { handleImgError } from "../../components/handleImage";

export default function ProductList() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    const searchParam = new URLSearchParams(location.search)
    const searchData = {
      title: searchParam.get("title"),
      startDate: searchParam.get("startDate"),
      endDate: searchParam.get("endDate"),
      category: searchParam.get("category"),
      page: searchParam.get("page") - 1,
      filterReservation: searchParam.get("filterReservation") === "true" // Convert to boolean
    }
    setShowAvailableOnly(searchData.filterReservation);

    const fetchData = async () => {
      try {
        const data = await getProducts(searchData);
        data.content.forEach(e => {
          e.image = !e.image ? "" : e.image
        })
        setProducts(data.content);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [location.search])

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
            onClick={() => {
              window.location.href = `/products/${product.productId}`;
            }}
          >
            <img onError={handleImgError} src={product.image} alt={product.title} />
            <div>
              <p>{product.title}</p>
              <span>{product.price}</span>
            </div>
          </button>
        ))}
      </div>
      <Nav />
    </div >
  );
}
