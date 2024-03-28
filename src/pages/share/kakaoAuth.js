const KAKAO_CLIENT_ID = '695d5c94ee69fdf44eb92e57f228e595'
const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth2/callback/kakao'

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`