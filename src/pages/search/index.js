import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../../components/molecules/nav";
import styles from "./Search.module.scss";
import { getCategory } from "../../api/camp-daddy";

export default function Search() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [searchData, setSearchData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    category: "",
    page: 1,
    filterReservation: false
  });

  useEffect(() => {
    getCategory().then((data) => {
      setCategory(data);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSubmit = () => {
    const queryString = new URLSearchParams(searchData).toString();
    navigate(`/product-list?${queryString}`);
  };

  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>검색</h2>
      <div className={styles.search_wrap}>
        <div className={styles.search_box}>
          <p>카테고리</p>
          <select name="category" onChange={handleInputChange}>
            <option value="">카테고리 선택</option>
            {category.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className={styles.search_box}>
          <p>제목</p>
          <input type="text" name="title" onChange={handleInputChange} />
        </div>
        <div className={styles.search_box}>
          <p>시작일</p>
          <input type="date" name="startDate" onChange={handleInputChange} />
          <p>종료일</p>
          <input type="date" name="endDate" onChange={handleInputChange} />
        </div>
        <button onClick={handleSubmit}>검색</button>
      </div>
      <Nav />
    </div>
  );
}