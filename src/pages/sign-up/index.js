import styles from "./Signup.module.scss";

export default function SignUp() {
    return (
        <div className={styles.my_main}>
            <h2 className={styles.title}>회원가입</h2>
            <div className={styles.signup_wrap}>
                <div className={styles.input_box}>
                    <p>이메일</p>
                    <input type="text" value={"이메일 가져와야함"} disabled/>
                </div>
                <div className={styles.input_box}>
                    <p>이름</p>
                    <input type="text"/>
                </div>
                <div className={styles.input_box} style={{paddingBottom: 50}}>
                    <p>닉네임</p>
                    <input type="text" maxLength={11}/>
                </div>
                <button>가입하기</button>
            </div>
        </div>
    );
}