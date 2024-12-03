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

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="bookDetails/:bookId" element={<BookDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/ordersPlaced" element={<OrderPlaced />} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileDisplay />} />
              <Route path="profileAddress" element={<ProfileAddress />} />
              <Route path="profileForm" element={<NewAddressForm />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
