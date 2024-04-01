import Nav from "../../../components/molecules/nav";
import styles from "../Mypage.module.scss";
import {memberInfo, memberInfoUpdate} from "../../../api/camp-daddy";
import {useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";

export default function MyInfo() {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
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
        // 닉네임 유효성 검사
        if (nickname.length < 2 || nickname.length > 10 || /\s/.test(nickname) || hangulRegex.test(nickname)) {
            alert("닉네임은 자음, 모음만 입력 금지, 최소 2글자 최대 10글자이며, 띄어쓰기가 불가능합니다. 다시 입력해주세요.");
        } else {
            try {
                await memberInfoUpdate(decode.sub, data)
                alert("수정 완료")
                window.location.href = "/my-page"
            } catch (e) {
                console.log("수정 실패")
            }
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
                    <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                </div>
                <button
                    onClick={infoUpdate}
                >수정하기
                </button>
            </div>
            <Nav/>
        </div>
    );
}
