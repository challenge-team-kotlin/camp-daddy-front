import {Route, Routes} from "react-router-dom";
import "./App.css";
import Main from "./pages/main";
import MyPage from "./pages/my-page";
import MyInfo from "./pages/my-page/my-info";
import ReservationListQuery from "./pages/my-page/reservation-list-query";
import ProductReservationList from "./pages/my-page/product-reservation-list";
import SaleListQuery from "./pages/my-page/sale-list-query";
import ProductAdd from "./pages/product-add";
import ProductDetail from "./pages/product-detail";
import ProductList from "./pages/product-list";
import Search from "./pages/search";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import {getProducts} from "./api/camp-daddy";
import AuthRedirect from "./components/AuthRedirect"
import ChatList from "./pages/chat-list";
import Chat from "./pages/chat-list/chat";
import ReviewListQuery from "./pages/my-page/review-list-query";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/my-page" element={<MyPage/>}/>
            <Route path="/my-page/my-info" element={<MyInfo/>}/>
            <Route path="/my-page/sale-list-query" element={<SaleListQuery/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/products/:id" element={<ProductDetail/>}/>
            <Route path="/product-list" element={<ProductList/>}/>
            <Route path="/product-add" element={<ProductAdd/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route
                path="/my-page/reservation-list-query"
                element={<ReservationListQuery/>}
            />
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route path="/oauth2/redirect" element={<AuthRedirect/>}/>
            <Route
                path="/my-page/product-reservation-list/:productId"
                element={<ProductReservationList/>}
            />
            <Route path="/chat-list" element={<ChatList/>}/>
            <Route path="/chat/:id" element={<Chat/>}/>
            <Route path="/my-page/review-list-query" element={<ReviewListQuery/>}/>
        </Routes>
    );
}

export default App;
