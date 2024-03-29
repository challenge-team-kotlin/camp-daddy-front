import Nav from "../../../components/molecules/nav";
import styles from "../Mypage.module.scss";
import { getMyReservationList } from "../../../api/camp-daddy";
import React, { useState, useEffect } from "react";

export default function ReservationListQuery() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const res = await getMyReservationList();
        setDatas(res.data);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };

    fetchReservationData();
  }, []);

  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>예약 목록 조회</h2>
      <div className={styles.sale_product_wrap}>
        {datas.map((data, index) => (
          <div key={data.reservationId}>
            <hr />
            <div className={styles.sale_product}>
              <img src="../images/product_img.png" alt="" />
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
                <div>
                  <span>예약 상황 : {data.reservationStatus}</span>
                </div>
              </div>
              <div className={styles.sale_btn}>
                <button onClick={() => {}}>수정하기</button>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <Nav />
    </div>
  );
}
