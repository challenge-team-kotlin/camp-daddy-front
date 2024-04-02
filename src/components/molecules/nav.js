import styles from "./Molecules.module.scss";
import { AiOutlineUser } from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";

export default function Nav() {
    // 로그인 여부
    const user = !localStorage.getItem("access_token");
    return (
        <div className={styles.nav}>
            <button
                onClick={() => {
                    if (user) {
                        window.location.href = "/sign-in";
                    } else {
                        window.location.href = "/product-add";
                    }
                }
                }
            >
                <IoMdAddCircleOutline size={45}/>
            </button>
            <button
                onClick={() => {
                    window.location.href = "/search";
                }}
            >
                <FiSearch size={45}/>
            </button>
            <button
                onClick={() => {
                    window.location.href = "/";
                }}
            >
                <AiFillHome size={45}/>
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
                <IoChatboxOutline size={45}/>
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
                <AiOutlineUser size={45}/>
            </button>
        </div>
    );
}
