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
                    style={{
                        backgroundImage: `url('/images/kakao_login_large_wide.png')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }}
                >
                </button>
                <button
                    onClick={() => {
                        loginRequest(GOOGLE_AUTH_URL)
                    }}
                    style={{
                        backgroundImage: `url('/images/web_neutral_rd_na@2x.png')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain'
                    }}
                >Google
                </button>
                <button
                    onClick={() => {
                        loginRequest(NAVER_AUTH_URL)
                    }}
                    style={{
                        backgroundImage: `url('/images/btnG_아이콘원형.png')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                    }}
                >NAVER
                </button>
            </div>
            <Nav />
        </div>
    );
}

export default SignIn;
