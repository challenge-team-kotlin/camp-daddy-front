import { useEffect } from 'react'

const AuthRedirect = () => {
  let url = new URL(window.location.href)
  let token = url.searchParams.get('token')
  let email = url.searchParams.get('email')
  let provider = url.searchParams.get('provider')
  let providerId = url.searchParams.get('providerId')

  const redirect = async () => {
    if(token){
      alert(token)
      // token local storage 저장
      // 메인페이지 이동
    }else {
      // sign up form
      window.location.href = "/sign-up"+"?email="+email+"&provider="+provider+"&providerId="+providerId;
      
    }
    //use search param
    // use param 인지 둘중 하나
  
  }
  
  useEffect(() => {
    redirect()
  }, [])

}

export default AuthRedirect