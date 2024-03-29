import styles from "./Signup.module.scss";
import { useState } from "react";
import {signUp} from "../../api/camp-daddy";


export default function SignUp() {
    let url = new URL(window.location.href)
    let email = url.searchParams.get('email')
    let provider = url.searchParams.get('provider')
    let providerId = url.searchParams.get('providerId')
    const [user_name, setUserName] = useState('');
    const [user_nickname, setUserNickname] = useState('');
    const saveUserName = event => {
        setUserName(event.target.value);
    };

    const saveUserNickname = event => {
        setUserNickname(event.target.value);
    };

    const data = {
        email: email,
        provider: provider,
        providerId: providerId,
        name: user_name,
        nickname: user_nickname
    }

    const signUpRequest =  () => {
        signUp(data)
        .then((res) => {
            localStorage.setItem('access_token', res.headers['authorization'])
            window.location.href = "/";
        })
    }

    return (
        <div className={styles.my_main}>
            <h2 className={styles.title}>회원가입</h2>
            <div className={styles.signup_wrap}>
                <div className={styles.input_box}>
                    <p>이메일</p>
                    <input type="text" value={email} disabled/>
                </div>
                <div className={styles.input_box}>
                    <p>이름</p>
                    <input type="text" onChange={saveUserName} value={user_name}/>
                </div>
                <div className={styles.input_box} style={{paddingBottom: 50}}>
                    <p>닉네임</p>
                    <input type="text" onChange={saveUserNickname} value={user_nickname} maxLength={12}/>
                </div>
                <button
                    onClick={() => {
                        signUpRequest()
                    }}
                >
                    가입하기
                </button>
            </div>
        </div>
    );
}