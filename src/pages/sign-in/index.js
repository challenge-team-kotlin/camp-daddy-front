import Nav from "../../components/molecules/nav";
import styles from "./Signin.module.scss";
import {KAKAO_AUTH_URL,NAVER_AUTH_URL,GOOGLE_AUTH_URL} from "../share/socialAuthUrl"

function SignIn() {
    const loginRequest = (url) => {
        window.location.href = url;
    }

    return (
        <div className={styles.my_main}>
            <h2 className={styles.title}>로그인</h2>
            <div className={styles.button_wrap}>
                <button
                    onClick={() => {
                        loginRequest(KAKAO_AUTH_URL)
                    }}
                >
                    카카오 로그인
                </button>
                <button
                    onClick={() => {
                        loginRequest(GOOGLE_AUTH_URL)
                    }}
                >
                    GOOGLE
                </button>
                <button
                    onClick={() => {
                        loginRequest(NAVER_AUTH_URL)
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
