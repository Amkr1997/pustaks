import { useLocation, useNavigate } from "react-router-dom";
import styles from "../components/css/checkout.module.css";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAddress } from "../features/addressSlice";
import {
  addOrders,
  setRemoveBooks,
  setTotalPriceZero,
} from "../features/cartSlice";
import NavbarTwo from "../components/NavbarTwo";
import { toast } from "react-toastify";

const Checkout = () => {
  const { address, status, error } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { deliveryCharges, discount, savings, totalAmount, totalPrice, cart } =
    location.state;

  const makeDaySuffix = (day) => {
    if (day % 10 === 1 && day !== 11) return "st";
    if (day % 10 === 2 && day !== 12) return "nd";
    if (day % 10 === 3 && day !== 13) return "rd";
    return "th";
  };

  const calcMonth = (month) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months[month];
  };

  const handleOrderPlace = (cart) => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();

    const orderedDate = `${day}${makeDaySuffix(day)} ${calcMonth(
      month
    )} ${year}`;

    cart.forEach((book) => {
      const { imageUrl, name, quantity } = book;

      dispatch(
        addOrders({ image: imageUrl.at(0), name, quantity, date: orderedDate })
      );
    });

    toast.success("Order Placed");

    cart.forEach((book) => {
      dispatch(setRemoveBooks(book));
    });

    dispatch(setTotalPriceZero());
    navigate("/ordersPlaced");
  };

  useEffect(() => {
    dispatch(fetchAddress());
  }, []);

  return (
    <>
      <NavbarTwo />
      <section className={`container mt-4 p-4 ${styles.checkoutContainer}`}>
        <div className="row">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <h2 className="display-6 py-4">Select Address</h2>
            {error && <p>{error.message}</p>}
            {status === "loading" ? (
              <Loading />
            ) : (
              address?.map((address) => {
                return (
                  <div key={address._id} className="card border-2 mb-3">
                    <div className="card-body d-flex align-items-center gap-3">
                      <input type="radio" className="" name="address" />
                      <div className="row">
                        <span className="col-6 fs-4 fw-medium">
                          Name:{" "}
                          <span className="fs-5 fw-normal">
                            {address.street}
                          </span>
                        </span>
                        <span className="col-6 fs-4 fw-medium">
                          City:{" "}
                          <span className="fs-5 fw-normal">{address.city}</span>
                        </span>
                        <span className="col-6 fs-4 fw-medium">
                          State:{" "}
                          <span className="fs-5 fw-normal">
                            {address.state}
                          </span>
                        </span>
                        <span className="col-6 fs-4 fw-medium">
                          Country:{" "}
                          <span className="fs-5 fw-normal">
                            {address.country}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-4">
            <div className={`card border-0`}>
              <div className="card-body">
                <h3 className="fw-bold text-uppercase fs-5 m-0">
                  Price Details
                </h3>
                <hr />
                <div className="py-1 d-flex align-items-center justify-content-between">
                  <p className="m-0 fs-5">Price({`${cart.length} item`})</p>
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
                  onClick={() => handleOrderPlace(cart)}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
