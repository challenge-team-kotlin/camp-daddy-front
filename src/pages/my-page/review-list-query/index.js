import Nav from "../../../components/molecules/nav";
import styles from "../Mypage.module.scss";
import React, { useState, useEffect } from "react";
import { handleImgError } from "../../../components/handleImage";
import { getMyReviewList } from "../../../api/camp-daddy";

export default function ReviewListQuery() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const res = await getMyReviewList();
        setDatas(res.data);
        res.data.forEach((data) => {
          if(data.imageUrls.length === 0){
            data.imageUrl = ""
          }else{
              data.imageUrl = data.imageUrls[0]
          }
        });
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };

    fetchReviewData();
  }, []);

  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>내가 작성한 리뷰</h2>
      <div className={styles.sale_review_wrap}>
        {datas.map((data, index) => (
          <div key={data.reviewId}>
            <hr />
            <div className={styles.sale_review}>
              <img onError={handleImgError} src={data.imageUrl} alt="" />
              <div>
                <div className={styles.sale_review_btn}>
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
