import React, { useEffect, useState } from "react";
import Nav from "../../components/molecules/nav";
import styles from "./ProductDetail.module.scss";
import { getProduct, getReview } from "../../api/camp-daddy";
import { useParams } from "react-router-dom";
import { handleImgError } from "../../components/handleImage";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReviewContent, setNewReviewContent] = useState("");

  const createReservation = async (productId) => {
    console.log(productId);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const productData = await getProduct(id);
        setProduct(productData);
        const reviewData = await getReview(id);
        setReviews(reviewData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div className={styles.my_main}>
      {product && (
        <>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.banner}>
            <img src={product.imageUrl} onError={handleImgError} />
            <span>{product.content}</span>
          </div>
          <div className={styles.btn_box}>
            <button
              onClick={() => {
                createReservation(product.productId);
              }}
            >
              예약하기
            </button>
            <button>문의하기</button>
          </div>
          <div className={styles.review_wrap}>
            <h6>리뷰</h6>
            {reviews.map((review, index) => (
              <div key={index} className={styles.review_box}>
                <div className={styles.review_user}>
                  <img
                    onError={handleImgError}
                    src={review.imageUrls}
                    alt={review.nickName}
                  />
                  <p>{review.nickName}</p>
                </div>
                <div className={styles.review_content}>
                  <span>{review.content}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <Nav />
    </div>
  );
}
