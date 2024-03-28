import Nav from "../../components/molecules/nav";
import styles from "./Signin.module.scss";
import {KAKAO_AUTH_URL} from "../share/kakaoAuth"

function SignIn() {
    const kakaoLogin = () => {
        console.log(KAKAO_AUTH_URL)
        window.location.href = KAKAO_AUTH_URL;
    }

    return (
        <div className={styles.my_main}>
            <h2 className={styles.title}>로그인</h2>
            <div className={styles.button_wrap}>
                <button onClick={kakaoLogin}>카카오 로그인</button>

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

export default SignIn;
