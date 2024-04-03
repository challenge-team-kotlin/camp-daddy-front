import React, { useEffect, useState } from "react";
import { postProduct, getCategory } from "../../api/camp-daddy";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 가져오기
import Nav from "../../components/molecules/nav";
import styles from "./ProductAdd.module.scss";
import { uploadPhotoToS3 } from "../../commons/s3Uploader";

export default function ProductAdd() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await getCategory();
        setCategory(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleInputChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title || !content || !selectedCategory || !price) {
      setErrorMessage('제목, 내용, 카테고리, 가격을 모두 입력해주세요.');
      return;
    }

    try {
      // 모든 이미지를 순회하며 S3에 업로드하고 이미지 URL을 배열에 저장
      const imageUrls = [];
      for (const image of images) {
        const imageUrl = await uploadPhotoToS3(image); // S3 버킷 이름을 넣어주세요
        imageUrls.push(imageUrl);
      }

      // 상품 정보와 이미지 URL을 함께 전송하여 상품 업로드
      const data = {
        title: title,
        content: content,
        category: selectedCategory,
        price: Number(price),
        images: imageUrls
      }

      const response = await postProduct(data);
      navigate(`/products/${response.data.productId}`); // 리디렉션 수행

    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('상품 추가에 실패했습니다.');
    }
  };

  return (
    <div className={styles.my_main}>
      <h2 className={styles.title}>상품 추가</h2>
      <div className={styles.add_wrap}>
        <div className={styles.choice}>
          <input type="file" onInput={handleImageChange} multiple />
        </div>
        <div className={styles.category_box}>
          <select name="category" onInput={handleInputChange}>
            <option value="">카테고리 선택</option>
            {category.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className={styles.add}>
          <input type="text" placeholder="제목을 입력해 주세요." value={title} onInput={handleTitleChange} />
          <textarea rows={10} cols={10} placeholder="내용을 입력해 주세요" value={content}
            onInput={handleContentChange} />
          <input type="text" placeholder="가격을 입력해 주세요." value={price} onInput={handlePriceChange} />
          <button onClick={handleSubmit}>작성하기</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      </div>
      <Nav />
    </div>
  );
}
