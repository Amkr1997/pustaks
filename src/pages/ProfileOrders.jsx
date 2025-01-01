import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../features/cartSlice";
import styles from "../components/css/profileOrders.module.css";
import Loading from "../components/Loading";

const ProfileOrders = () => {
  const { totalOrders, status, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (totalOrders?.length <= 0) {
      dispatch(getAllOrders());
    }
  }, [totalOrders]);

  return (
    <section className="container">
      <div className={`p-2 mt-4 mb-2 ${styles.tableContainer}`}>
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">Number</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Date</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          {error && <h1>{error}</h1>}
          {status === "loading" ? (
            <Loading />
          ) : (
            totalOrders?.length > 0 &&
            totalOrders
              ?.slice()
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              ?.map((order, index) => {
                return (
                  <tbody key={order._id}>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img
                          src={order.image}
                          className="img-fluid"
                          alt="order image"
                          style={{ height: "6.25rem", width: "5rem" }}
                        />
                      </td>
                      <td>
                        <p className="fw-medium fs-4 m-0">{order.name}</p>
                      </td>
                      <td>
                        <p className="fw-medium fs-4 m-0">
                          Quantity: {order.quantity}
                        </p>
                      </td>
                      <td>
                        <p className="fw-medium fs-4 m-0">Date: {order.date}</p>
                      </td>
                      <td>
                        <button
                          className={`${styles.deleteBtn} px-3 py-1`}
                          onClick={() => handleOrderDeletion(order._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
          )}
        </table>
      </div>
    </section>
  );
};

export default ProfileOrders;
