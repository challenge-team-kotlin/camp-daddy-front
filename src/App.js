import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/main";
import MyPage from "./pages/my-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/my-page" element={<MyPage />} />
    </Routes>
  );
}

export default App;
