import styles from "./Signup.module.scss";
import {useState} from "react";
import {signUp, checkNickname} from "../../api/camp-daddy";


export default function SignUp() {
    let url = new URL(window.location.href)
    let email = url.searchParams.get('email')
    let provider = url.searchParams.get('provider')
    let providerId = url.searchParams.get('providerId')
    const [user_name, setUserName] = useState('');
    const [user_nickname, setUserNickname] = useState('');
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
    const saveUserName = event => {
        setUserName(event.target.value);
    };

    const saveUserNickname = event => {
        setUserNickname(event.target.value);
        setIsNicknameAvailable(false);
    };

    const data = {
        email: email,
        provider: provider,
        providerId: providerId,
        name: user_name,
        nickname: user_nickname
    }
    const hangulRegex = /([^가-힣\x20])/i
    const signUpRequest = () => {
        if (user_name.length < 2 || user_name.length > 10 || /\s/.test(user_name) || hangulRegex.test(user_name)) {
            alert("이름은 자음, 모음만 입력 금지, 최소 2글자 최대 10글자이며, 띄어쓰기가 불가능합니다. 다시 입력해주세요.")
        } else {
            signUp(data)
                .then((res) => {
                    localStorage.setItem('access_token', res.headers['authorization'])
                    window.location.href = "/";
                })
        }
    }

    const findNickname = (nickname) => {
        if (nickname.length < 2 || nickname.length > 10 || /\s/.test(nickname) || hangulRegex.test(nickname)) {
            alert("닉네임은 자음, 모음만 입력 금지, 최소 2글자 최대 10글자이며, 띄어쓰기가 불가능합니다. 다시 입력해주세요.");
        } else {
            checkNickname(nickname).then((res) => {
                    setIsNicknameAvailable(!res.data);
                    if (res.data) {
                        alert("중복된 닉네임입니다.");
                    } else {
                        alert("사용 가능한 닉네임입니다.");
                    }
                }
            );
        }
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
                        findNickname(user_nickname)
                    }}
                >
                    닉네임 확인
                </button>
                <button
                    onClick={() => {
                        signUpRequest()
                    }}
                    disabled={!isNicknameAvailable}
                >
                    가입하기
                </button>
            </div>
        </div>
    );
}