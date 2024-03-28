import axios from 'axios'
import { useEffect } from 'react'

const KakaoAuthHandle = (props) => {
  const kakaoLogin = async () => {
    await axios
      .get(`http://localhost:8080/user/kakao/callback?code=${code}`)
      .then((res) => {
        localStorage.setItem('token', res.headers.authorization)
        window.location.href = "/";
      })
  }
  let code = new URL(window.location.href).searchParams.get('code')
  
  useEffect(() => {
    kakaoLogin()
  }, [props.history])

}

export default KakaoAuthHandle