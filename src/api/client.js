import axios from "axios";
import { Navigate } from "react-router";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  }
})

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});


apiClient.interceptors.response.use((config) => {
  return config
}, (e) => {
  if (e.response.data.errorId == 9001) {
    localStorage.setItem('access_token', '')
  }

  alert("로그인을 재시도해주세요.")
  window.location.href = "/sign-in"
})