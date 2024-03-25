import Nav from "../../components/molecules/nav";
import styles from "./Signin.module.scss";

export default function SignIn() {
    return (
        <div className={styles.my_main}>
            <h2 className={styles.title}>로그인</h2>
            <div className={styles.button_wrap}>
                <button
                    onClick={() => {
                        // 카카오 로그인
                    }}
                >
                    KAKAO
                </button>
                <button
                    onClick={() => {
                        // 구글 로그인
                    }}
                >
                    GOOGLE
                </button>
                <button
                    onClick={() => {
                        // 네이버 로그인
                    }}
                >
                    NAVER
                </button>
            </div>
            <Nav />
        </div>
    );
}
