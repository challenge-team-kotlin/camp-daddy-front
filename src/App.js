import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/main";
import MyPage from "./pages/my-page";
import MyInfo from "./pages/my-page/my-info";
import ReservationListQuery from "./pages/my-page/reservation-list-query";
import SaleListQuery from "./pages/my-page/sale-list-query";
import ProductAdd from "./pages/product-add";
import ProductDetail from "./pages/product-detail";
import ProductList from "./pages/product-list";
import Search from "./pages/search";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import { getProducts } from "./api/camp-daddy";
import AuthRedirect from "./components/AuthRedirect"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/my-page/my-info" element={<MyInfo />} />
            <Route path="/my-page/sale-list-query" element={<SaleListQuery />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/product-add" element={<ProductAdd />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
                path="/my-page/reservation-list-query"
                element={<ReservationListQuery />}
            />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/oauth2/redirect" element={<AuthRedirect />} />
        </Routes>
    );
}

export default App;
