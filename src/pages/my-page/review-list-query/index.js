import Nav from "../../../components/molecules/nav";
import styles from "../Mypage.module.scss";
import React, { useState, useEffect } from "react";
import { handleImgError } from "../../../components/handleImage";
import { getMyReviewList } from "../../../api/camp-daddy";

export default function ReviewListQuery() {
  const [datas, setDatas] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const res = await getMyReviewList();
        setDatas(res.data);
        const initialSelectedValues = {};
        res.data.forEach((data) => {
          initialSelectedValues[data.reservationId] = "";
        });
        setSelectedValues(initialSelectedValues);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };

    fetchReviewData();
  }, []);

  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>내가 작성한 리뷰</h2>
      <div className={styles.sale_product_wrap}>
        {datas.map((data, index) => (
          <div key={data.reviewId}>
            <hr />
            <div className={styles.sale_product}>
              <img onError={handleImgError} src={data.imageUrls[0]} alt="" />
              <div>
                <div className={styles.sale_btn}>
                  <span>물품 : {data.productName}</span>
                  <button
                    onClick={() => {
                      window.location.href = `/products/${data.productId}`;
                    }}
                  >
                    물품보기
                  </button>
                </div>
                <div>
                  <span>리뷰 내용 : {data.content}</span>
                </div>
                <div>
                  <span>점수 : {"❤".repeat(data.score)}</span>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
        <Nav />
      </div>
    </div>
  );
}
