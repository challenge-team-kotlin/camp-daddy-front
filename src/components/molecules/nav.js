import styles from "./Molecules.module.scss";
import icon from "./product_img.png";

export default function Nav() {
  // 로그인 여부
  const user = false;
  return (
    <div className={styles.nav}>
      <button
        onClick={() => {
          if (user) {
            window.location.href = "/sign-in";
          } else {
            window.location.href = "/product-add";
          }
        }}
      >
        <img src={icon} alt="" />
      </button>
      <button
        onClick={() => {
          window.location.href = "/search";
        }}
      >
        <img src={icon} alt="" />
      </button>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <img src={icon} alt="" />
      </button>
      <button
        onClick={() => {
          if (user) {
            window.location.href = "/sign-in";
          } else {
            window.location.href = "/chatting";
          }
        }}
      >
        <img src={icon} alt="" />
      </button>
      <button
        onClick={() => {
          if (user) {
            window.location.href = "/sign-in";
          } else {
            window.location.href = "/my-page";
          }
        }}
      >
        <img src={icon} alt="" />
      </button>
    </div>
  );
}
