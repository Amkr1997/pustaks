import { useLocation, useNavigate } from "react-router-dom";
import styles from "../components/css/checkout.module.css";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setTotalPriceZero } from "../features/cartSlice";
import {
  useAddOrderMutation,
  useDeleteFromCartMutation,
  useGetLoginUserDataQuery,
  useGetSingleUserQuery,
} from "../features/apiSlice";
import NavbarTwo from "../components/NavbarTwo";
import { toast } from "react-toastify";

const Checkout = () => {
  const [addressVal, setAddressVal] = useState("");
  const { data: profileId } = useGetLoginUserDataQuery();
  const { data: profileData, isLoading } = useGetSingleUserQuery(
    profileId?.userId,
    {
      skip: !profileId?.userId,
    }
  );
  const [addOrder] = useAddOrderMutation();
  const [deleteFromCart] = useDeleteFromCartMutation();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { deliveryCharges, discount, savings, totalAmount, totalPrice, cart } =
    location.state;

  const handleOrderPlace = (cart) => {
    if (addressVal === "") {
      toast.warn("Add address");
      return;
    }

    cart.forEach(async (book) => {
      try {
        const res = await addOrder({
          bookId: book?.bookId?._id,
          userId: profileId?.userId,
          data: { quantity: book?.quantity },
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
    });

    cart.forEach(async (book) => {
      try {
        const res = await deleteFromCart({
          bookId: book?.bookId?._id,
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
    });

    dispatch(setTotalPriceZero());
    navigate("/ordersPlaced", { replace: true });
  };

  return (
    <>
      <NavbarTwo />
      <section className={`container mt-4 p-4 ${styles.checkoutContainer}`}>
        <div className="row">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <h2 className="display-6 py-4">Select Address</h2>

            {!isLoading ? (
              profileData?.address?.map((address) => {
                return (
                  <div key={address._id} className="card border-2 mb-3">
                    <div className="card-body d-flex align-items-center gap-3">
                      <input
                        type="radio"
                        className=""
                        name="address"
                        value={address.street}
                        checked={addressVal === address.street}
                        onChange={(e) => setAddressVal(e.target.value)}
                      />
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
            ) : (
              <Loading />
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
                <button
                  className={`w-100 mt-2 rounded-0 ${styles.placeOrder}`}
                  onClick={() => navigate("/books")}
                >
                  Continue Shopping
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
