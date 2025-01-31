import NavbarTwo from "../components/NavbarTwo";
import { useSelector } from "react-redux";
import {
  useDeleteOrderMutation,
  useGetLoginUserDataQuery,
  useGetSingleUserQuery,
} from "../features/apiSlice";
import styles from "../components/css/orders.module.css";
import Loading from "../components/Loading";
import moment from "moment";
import { toast } from "react-toastify";

const OrderPlaced = () => {
  const { totalPrice } = useSelector((state) => state.cart);
  const { data: profileId } = useGetLoginUserDataQuery();
  const { data: profileData, isLoading } = useGetSingleUserQuery(
    profileId?.userId,
    {
      skip: !profileId?.userId,
    }
  );
  const [deleteOrder] = useDeleteOrderMutation();

  const handleOrderDeletion = async (orderId) => {
    try {
      const res = await deleteOrder({
        bookId: orderId,
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

  return (
    <>
      <NavbarTwo />
      <section className="container">
        <h1 className="display-5 fw-medium text-center mt-5">Order History</h1>

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
            {!isLoading ? (
              profileData?.orderHistory?.length > 0 &&
              profileData?.orderHistory
                ?.slice()
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                ?.map((order, index) => {
                  return (
                    <tbody key={order._id}>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <img
                            src={order?.bookId?.imageUrl[0]}
                            className="img-fluid"
                            alt="order image"
                            style={{ height: "6.25rem", width: "5rem" }}
                          />
                        </td>
                        <td>
                          <p className="fw-medium fs-4 m-0">
                            {order?.bookId?.name}
                          </p>
                        </td>
                        <td>
                          <p className="fw-medium fs-4 m-0">
                            Quantity: {order.quantity}
                          </p>
                        </td>
                        <td>
                          <p className="fw-medium fs-4 m-0">
                            Date:{" "}
                            {moment(order?.createdAt).format("YYYY-MM-DD")}
                          </p>
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
            ) : (
              <Loading />
            )}
          </table>
        </div>
      </section>
    </>
  );
};

export default OrderPlaced;
