import { useDispatch, useSelector } from "react-redux";
import styles from "../components/css/cart.module.css";
import { increaseTotalPrice } from "../features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import NavbarTwo from "../components/NavbarTwo";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useDeleteFromCartMutation,
  useGetLoginUserDataQuery,
  useGetSingleUserQuery,
  useReduceBookInCartMutation,
} from "../features/apiSlice";
import { useEffect } from "react";
import Loading from "../components/Loading";

const Cart = () => {
  const { data: profileId } = useGetLoginUserDataQuery();
  const { data: profileData, isLoading } = useGetSingleUserQuery(
    profileId?.userId,
    {
      skip: !profileId?.userId,
    }
  );
  const [deleteFromCart] = useDeleteFromCartMutation();
  const [addToWishList] = useAddToWishlistMutation();
  const [increaseBookQuant] = useAddToCartMutation();
  const [reduceBookQuant] = useReduceBookInCartMutation();
  const { totalPrice } = useSelector((state) => state.cart);
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
        cart: profileData?.cartList,
      },
    });
  };

  const removeBookFromCart = async (bookId, profileId) => {
    try {
      const res = await deleteFromCart({
        bookId,
        userId: profileId,
      });

      toast.success(res?.data?.message);
    } catch (error) {
      if (error.status === 404) {
        toast.warn(error.data.message);
      } else if (error.status === 401) {
        toast.warn(error.data.message);
      } else {
        toast.warning("Internal server error");
      }
    }
  };

  const addBookIntoWishlist = async (bookId, profileId) => {
    try {
      const res = await addToWishList({
        bookId: bookId,
        userId: profileId,
      });

      toast.success(res?.data?.message);
    } catch (error) {
      if (error.status === 404) {
        toast.warn(error.data.message);
      } else if (error.status === 401) {
        toast.warn(error.data.message);
      } else {
        toast.warning("Internal server error");
      }
    }
  };

  const handleWishlistBtn = (book) => {
    addBookIntoWishlist(book?._id, profileId?.userId);
    removeBookFromCart(book?._id, profileId?.userId);
  };

  const handleCart = (book) => {
    removeBookFromCart(book?._id, profileId?.userId);
  };

  const handleIncrease = async (book) => {
    try {
      const res = await increaseBookQuant({
        bookId: book?._id,
        userId: profileId?.userId,
      });
      toast.success(res?.data?.message);
    } catch (error) {
      if (error.status === 404) {
        toast.warn(error.data.message);
      } else if (error.status === 401) {
        toast.warn(error.data.message);
      } else {
        toast.warning("Internal server error");
      }
    }
  };

  const handleDecrease = async (book) => {
    try {
      const res = await reduceBookQuant({
        bookId: book?._id,
        userId: profileId?.userId,
      });

      toast.success(res?.data?.message);
    } catch (error) {
      if (error.status === 404) {
        toast.warn(error.data.message);
      } else if (error.status === 401) {
        toast.warn(error.data.message);
      } else {
        toast.warning("Internal server error");
      }
    }
  };

  useEffect(() => {
    if (profileData?.cartList?.length > 0) {
      const priceArr = new Array(profileData?.cartList?.length);

      profileData?.cartList?.forEach((book) =>
        priceArr.push(book.bookId.price * book.quantity)
      );
      dispatch(increaseTotalPrice(priceArr));
    }
  }, [profileData?.cartList]);

  return (
    <>
      <NavbarTwo />
      <section className="py-5">
        <div className={`container mt-4 p-4 ${styles.cartContainer}`}>
          <h3 className="fw-bold text-center pt-2 pb-4">
            {`My Cart`.toUpperCase()}({profileData?.cartList?.length})
          </h3>

          {!isLoading ? (
            profileData?.cartList?.length > 0 ? (
              <div className="row">
                <div className="col-lg-7 mb-lg-0 mb-4">
                  {profileData?.cartList?.map((book) => {
                    return (
                      <div key={book.bookId._id} className="card border-0 mb-3">
                        <div className="row g-2">
                          <div className="col-md-4 d-flex align-items-center justify-content-center">
                            <img
                              src={book.bookId.imageUrl[0]}
                              className={`${styles.bookImg} img-fluid rounded-start`}
                              alt="cart-card"
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h5 className={`${styles.cardTitle} card-title`}>
                                {book.bookId.name}
                              </h5>
                              <p className="card-text fs-3 fw-bold py-1 m-0">
                                {`₹${book.bookId.price}`}{" "}
                                <del className="fs-5 fw-semibold text-secondary ps-2">
                                  {`₹${book.bookId.price * 2}`}
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
                                  onClick={() => handleDecrease(book?.bookId)}
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
                                  onClick={() => handleIncrease(book?.bookId)}
                                >
                                  +
                                </button>
                              </div>

                              <div className="py-4 d-flex flex-column gap-3">
                                <button
                                  className={`w-50 ${styles.removeBtn} fw-semibold`}
                                  onClick={() => handleCart(book?.bookId)}
                                >
                                  Remove From Cart
                                </button>
                                <button
                                  className={`w-50 ${styles.moveToWishlist} fw-semibold`}
                                  onClick={() =>
                                    handleWishlistBtn(book?.bookId)
                                  }
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
                        <p className="m-0 fs-5">
                          Price({profileData?.cartList?.length} item)
                        </p>
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
            )
          ) : (
            <Loading />
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
