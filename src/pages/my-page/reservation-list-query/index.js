import Nav from "../../../components/molecules/nav";
import styles from "../Mypage.module.scss";
import {
  getMyReservationList,
  patchReservationStatus,
  createReview
} from "../../../api/camp-daddy";
import React, { useState, useEffect } from "react";
import { handleImgError } from "../../../components/handleImage";
import Modal from "./Modal";
import { uploadPhotoToS3 } from "../../../commons/s3Uploader";

export default function ReservationListQuery() {
  const [datas, setDatas] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewScore, setReviewScore] = useState("");
  const [modalReservationId, setModalReservationId] = useState(0);
  const [images, setImages] = useState([]);
  const openModal = (reservationId) => {
    setReviewText("");
    setReviewScore(5);
    setModalReservationId(reservationId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleReviewScoreChange = (e) => {
    setReviewScore(e.target.value);
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleReviewSubmit = async () => {

    const imageUrls = [];
    for (const image of images) {
      const imageUrl = await uploadPhotoToS3(image, 'camp-daddy-bucket');
      imageUrls.push(imageUrl);
    }

    const data = {
      content : reviewText,
      productId : modalReservationId,
      score : reviewScore,
      imageUrls : imageUrls
    };
    console.log(data)
    return createReview(data).then((res) => {
      console.log(res)
      if(res.status === 201){
        alert("리뷰 작성이 완료 되었어요.")
      }
    
    })
    .catch((e) => {
      alert(e.response.data.payload)  
    });

  };

  const handleSelect = (e, reservationId) => {
    const value = e.target.value;
    setSelectedValues((prevState) => ({
      ...prevState,
      [reservationId]: value,
    }));
  };

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const res = await getMyReservationList();
        
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

    fetchReservationData();
  }, []);

  function patchReservation(reservationId) {
    const selectedValue = selectedValues[reservationId];
    if (!selectedValue) {
      alert("예약 상태를 선택해주세요");
      return;
    }
    patchReservationStatus(reservationId, selectedValue).then((res) => {
      if (res.status === 200) {
        window.location.reload();
      } else {
        alert("에러 발생");
      }
    });
  }

  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>예약 목록 조회</h2>
      <div className={styles.sale_product_wrap}>
        {datas.map((data, index) => (
          <div key={data.reservationId}>
            <hr />
            <div className={styles.sale_product}>
              <img onError={handleImgError} src={data.productImageUrl} alt="" />
              <div>
                <div>
                  <span>상품명 : {data.productTitle}</span>
                </div>
                <div>
                  <span>총 가격 : {data.totalPrice}</span>
                </div>
                <div>
                  <span>
                    날짜 : {data.startDate}~{data.endDate}
                  </span>
                </div>
                <div className={styles.sale_btn}>
                  <span>예약 상황 : {data.reservationStatus}</span>
                  <select
                    onChange={(e) => handleSelect(e, data.reservationId)}
                    value={selectedValues[data.reservationId]}
                  >
                    <option value="" disabled>
                      예약 상태
                    </option>
                    {data.reservationStatus === "요청 승인" && (
                      <option value="RENT">대여중</option>
                    )}
                    {data.reservationStatus === "대여 요청" && (
                      <option value="CANCELED">취소</option>
                    )}
                  </select>

                  {data.reservationStatus !== "대여 종료" && (
                    <button
                      onClick={() => {
                        patchReservation(data.reservationId);
                      }}
                    >
                      상태 수정
                    </button>
                  )}
                  {data.reservationStatus === "대여 종료" && (
                    <button
                      onClick={() => {
                        openModal(data.productId);
                      }}
                    >
                      리뷰 남기기
                    </button>
                  )}
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          reviewText={reviewText}
          reviewScore={reviewScore}
          handleReviewChange={handleReviewChange}
          handleReviewSubmit={handleReviewSubmit}
          handleReviewScoreChange={handleReviewScoreChange}
          handleImageChange={handleImageChange}
        />
        <Nav />
      </div>
    </div>
  );
}
