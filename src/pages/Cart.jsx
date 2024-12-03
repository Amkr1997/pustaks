import { useDispatch, useSelector } from "react-redux";
import styles from "../components/css/cart.module.css";
import {
  setIncreaseBooks,
  setReduceBooks,
  setRemoveBooks,
} from "../features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { setBookToWishList } from "../features/wishlistSlice";
import NavbarTwo from "../components/NavbarTwo";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const Cart = () => {
  const { cart, totalPrice, totalOrders } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const discount = ((30 / 100) * totalPrice).toFixed(1);
  const deliveryCharges = ((5 / 100) * totalPrice).toFixed(2);
  const totalAmount = (
    totalPrice -
    (30 / 100) * totalPrice +
    (5 / 100) * totalPrice
  ).toFixed(2);
  const savings = (
    ((30 / 100) * totalPrice).toFixed(1) - ((5 / 100) * totalPrice).toFixed(2)
  ).toFixed(1);

  const handleCheckout = () => {
    navigate(`/checkout`, {
      state: {
        discount,
        deliveryCharges,
        totalAmount,
        savings,
        totalPrice,
        cart,
      },
    });
  };

  const handleWishlistBtn = (book) => {
    dispatch(setRemoveBooks(book));
    dispatch(setBookToWishList(book));
    toast.success("Added to Wishlist");
  };

  const handleCart = (book) => {
    dispatch(setRemoveBooks(book));
    toast.success("Removed from Cart");
  };

  const handleIncrease = (book) => {
    dispatch(setIncreaseBooks(book));
    toast.success("Quantity Increased");
  };

  const handleDecrease = (book) => {
    dispatch(setReduceBooks(book));
    toast.success("Quantity Decreased");
  };

  return (
    <>
      <NavbarTwo />
      <section className="py-5">
        <div className={`container mt-4 p-4 ${styles.cartContainer}`}>
          <h3 className="fw-bold text-center pt-2 pb-4">
            {`My Cart`.toUpperCase()}({cart.length})
          </h3>

          {cart?.length > 0 ? (
            <div className="row">
              <div className="col-lg-7 mb-lg-0 mb-4">
                {cart?.map((book) => {
                  return (
                    <div key={book._id} className="card border-0 mb-3">
                      <div className="row g-2">
                        <div className="col-md-4 d-flex align-items-center justify-content-center">
                          <img
                            src={book.imageUrl[0]}
                            className={`${styles.bookImg} img-fluid rounded-start`}
                            alt="cart-card"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className={`${styles.cardTitle} card-title`}>
                              {book.name}
                            </h5>
                            <p className="card-text fs-3 fw-bold py-1 m-0">
                              {`₹${book.price}`}{" "}
                              <del className="fs-5 fw-semibold text-secondary ps-2">
                                {`₹${book.price * 2}`}
                              </del>
                            </p>
                            <p className="card-text fs-5 text-secondary fw-bold py-1 m-0">
                              50% off
                            </p>
                            <div
                              className={`${styles.quantity} d-flex align-items-center gap-2`}
                            >
                              <p className="card-text text-body-secondary fw-bold m-0 py-2">
                                Quantity:
                              </p>
                              <button
                                className="btn btn-sm btn-primary  border-0 rounded-pill d-flex align-items-center justify-content-center fw-bolder"
                                onClick={() => handleDecrease(book)}
                              >
                                -
                              </button>
                              <span
                                className={`${styles.quantityInp} text-center px-3`}
                              >
                                {book.quantity}
                              </span>
                              <button
                                className="btn btn-sm btn-primary border-0 rounded-pill d-flex align-items-center justify-content-center fw-bolder"
                                onClick={() => handleIncrease(book)}
                              >
                                +
                              </button>
                            </div>

                            <div className="py-4 d-flex flex-column gap-3">
                              <button
                                className={`w-50 ${styles.removeBtn} fw-semibold`}
                                onClick={() => handleCart(book)}
                              >
                                Remove From Cart
                              </button>
                              <button
                                className={`w-50 ${styles.moveToWishlist} fw-semibold`}
                                onClick={() => handleWishlistBtn(book)}
                              >
                                Move to Wishlist
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="col-lg-1"></div>
              <div className="col-lg-4">
                <div className={`card border-0`}>
                  <div className="card-body">
                    <h3 className="fw-bold text-uppercase fs-5 m-0">
                      Price Details
                    </h3>
                    <hr />
                    <div className="py-1 d-flex align-items-center justify-content-between">
                      <p className="m-0 fs-5">Price({cart.length} item)</p>
                      <p className="m-0 fs-5">₹{totalPrice}</p>
                    </div>
                    <div className="py-1 d-flex align-items-center justify-content-between">
                      <p className="m-0 fs-5">Discount</p>
                      <p className="m-0 fs-5">-₹{discount}</p>
                    </div>
                    <div className="py-1 d-flex align-items-center justify-content-between">
                      <p className="m-0 fs-5">Delivery Charges</p>
                      <p className="m-0 fs-5">₹{deliveryCharges}</p>
                    </div>
                    <hr />
                    <div className="py-1 d-flex align-items-center justify-content-between">
                      <h4 className="fw-bold m-0 text-capitalise fs-5 m-0">
                        Total Amount
                      </h4>
                      <h4 className="fw-bold m-0 text-capitalise fs-5 m-0">
                        ₹{totalAmount}
                      </h4>
                    </div>
                    <hr />
                    <h5 className="py-2">
                      You are gonna save ₹{savings} in this order.
                    </h5>
                    <button
                      className={`w-100 rounded-0 ${styles.placeOrder}`}
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-2 pb-4 d-flex flex-column align-items-center justify-content-between">
              <h2 className="pt-2 pb-3 text-center">
                Nothing Here Add Some Books!
              </h2>
              <Link
                to={"/books"}
                type="button"
                className={`btn ${styles.bookBtn}`}
              >
                Go to Books 👉
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
