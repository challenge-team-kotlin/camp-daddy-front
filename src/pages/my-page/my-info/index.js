import Nav from "../../../components/molecules/nav";
import styles from "../Mypage.module.scss";
import {checkNickname, memberInfo, memberInfoUpdate} from "../../../api/camp-daddy";
import {useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";

export default function MyInfo() {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
    const decode = jwtDecode(localStorage.getItem('access_token'))
    const data = {
        name: name,
        nickname: nickname
    }
    useEffect(() => {
        getMemberInfo();
    }, []);
    const getMemberInfo = () => {
        memberInfo(decode.sub)
            .then((res) => {
                const {name, nickname} = res.data
                setName(name);
                setNickname(nickname);
            })
    }
    const hangulRegex = /([^가-힣\x20])/i
    const infoUpdate = async () => {
        try {
            await memberInfoUpdate(decode.sub, data)
            alert("수정 완료")
            window.location.href = "/my-page"
        } catch (e) {
            console.log("수정 실패")
        }
    }

    const saveUserNickname = event => {
        setNickname(event.target.value);
        setIsNicknameAvailable(false); // 닉네임 변경 시 상태 초기화
    };

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
            <h2 className={styles.title}>내 정보</h2>
            <div className={styles.info_wrap}>
                <div className={styles.input_box}>
                    <p>이름</p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled/>
                </div>
                <div className={styles.input_box}>
                    <p>닉네임</p>
                    <input type="text" value={nickname} onChange={saveUserNickname}/>
                </div>
                <button
                    onClick={() => findNickname(nickname)}
                >닉네임 확인
                </button>
                <button
                    onClick={infoUpdate}
                    disabled={!isNicknameAvailable}
                >수정하기
                </button>
            </div>
            <Nav/>
        </div>
    );
}
