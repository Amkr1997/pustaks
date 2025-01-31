import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import ProfileAddress from "./pages/ProfileAddress";
import ProfileDisplay from "./pages/ProfileDisplay";
import NewAddressForm from "./pages/NewAddressForm";
import Checkout from "./pages/Checkout";
import OrderPlaced from "./pages/OrderPlaced";
import ProfileOrders from "./pages/ProfileOrders";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RefresherHandler from "./components/RefresherHandler";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <RefresherHandler />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="bookDetails/:bookId" element={<BookDetails />} />
            <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
            <Route
              path="/checkout"
              element={<PrivateRoute element={<Checkout />} />}
            />
            <Route
              path="/wishlist"
              element={<PrivateRoute element={<WishList />} />}
            />
            <Route
              path="/ordersPlaced"
              element={<PrivateRoute element={<OrderPlaced />} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={<PrivateRoute element={<Profile />} />}
            >
              <Route index element={<ProfileDisplay />} />
              <Route path="profileAddress" element={<ProfileAddress />} />
              <Route path="profileForm" element={<NewAddressForm />} />
              <Route path="profileOrders" element={<ProfileOrders />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
