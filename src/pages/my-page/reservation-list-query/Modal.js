import React from "react";
import styles from "./modal.css";

const Modal = ({
  isOpen,
  onClose,
  reviewText,
  reviewScore,
  handleReviewChange,
  handleReviewSubmit,
  handleReviewScoreChange,
  handleImageChange
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>리뷰를 남겨주세요</p>
        <hr />
        <form action="#">
          <label for="lang">점수 : </label>
          <select
            onChange={(e) => handleReviewScoreChange(e)}
            value={reviewScore}
          >
            <option value="1">❤</option>
            <option value="2">❤❤</option>
            <option value="3">❤❤❤</option>
            <option value="4">❤❤❤❤</option>
            <option value="5">❤❤❤❤❤</option>
          </select>
        </form>
        <div className={styles.choice}>
          <input type="file" onInput={handleImageChange} multiple />
        </div>
        <input
          type="text"
          value={reviewText}
          onInput={handleReviewChange}
          size={50}
        />
        <div className={styles.sale_btn}>
          <button onClick={() => handleReviewSubmit()}>리뷰 남기기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
