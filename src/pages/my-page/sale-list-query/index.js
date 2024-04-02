import React, { useEffect, useState } from "react";
import Nav from "../../../components/molecules/nav";
import styles from "../Mypage.module.scss";
import { useParams } from "react-router-dom";
import { getMemberProduct, deleteProduct } from "../../../api/camp-daddy";
import { jwtDecode } from "jwt-decode";
import { handleImgError } from "../../../components/handleImage";

export default function SaleListQuery() {
  const { id } = useParams();
  const [sales, setSales] = useState([]);
  const decode = jwtDecode(localStorage.getItem('access_token'))
  useEffect(() => {
    const fetchSales = async () => {
      try {
        console.log(decode.sub)
        // 백엔드에서 사용자의 판매 상품 목록을 가져오는 API 호출
        const userSales = await getMemberProduct(decode.sub);
        setSales(userSales);
      } catch (error) {
        console.error("Error fetching user sales:", error);
      }
    };

    fetchSales();
  }, [id]);

  // 상품 삭제 함수
  const handleDeleteProduct = async (productId) => {
    try {
      const confirmed = window.confirm("삭제하시겠습니까?");
      if (confirmed) {
        // 삭제 요청 보내기
        await deleteProduct(productId);
        // 삭제 후 상품 목록 다시 불러오기
        const updatedSales = await getMemberProduct(id);
        setSales(updatedSales);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>회원별 판매 상품 조회</h2>
      <div className={styles.sale_product_wrap}>
        {sales.map((sale, index) => (
          <div key={index}>
            <button
              className={styles.sale_product}
              onClick={() => {
                window.location.href = `/products/${sale.productId}`;
              }}
            >
              <img onError={handleImgError} src={sale.presentationImage[0]} alt="" />
              <div>
                <p>{sale.title}</p>
                <div>
                  <span>{sale.status}</span>
                  <b>{sale.price}</b>
                </div>
              </div>
            </button>
            <div className={styles.sale_btn}>
              <button
                onClick={() => {
                  window.location.href = `/my-page/product-reservation-list/${sale.productId}`;
                }}
              >
                예약 확인
              </button>
              <button
                onClick={() => {
                  window.location.href = `/my-page/product-reservation-list/${sale.productId}`;
                }}
              >
                예약 확인
              </button>
              <button
                className={styles.red}
                onClick={() => handleDeleteProduct(sale.productId)}
              >
                삭제하기
              </button>
            </div>
          </div>
        ))}
      </div>
      <Nav />
    </div>
  );
}
