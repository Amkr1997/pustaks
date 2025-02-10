import { Link, useNavigate } from "react-router-dom";
import styles from "../components/css/newArivals.module.css";
import { toast } from "react-toastify";
import {
  useGetLoginUserDataQuery,
  useAddToCartMutation,
} from "../features/apiSlice";
import { useSelector } from "react-redux";

const NewHistorical = ({ books, error }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: profileId } = useGetLoginUserDataQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [addToCart] = useAddToCartMutation();

  const cartHandler = async (book) => {
    if (!isAuthenticated) {
      toast.warn("Login First");
      return;
    }

    try {
      const res = await addToCart({
        userId: profileId?.userId,
        bookId: book._id,
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
      {error && <p>{error.message}</p>}
      <section className="container" style={{ padding: "4rem 0 5rem" }}>
        <h1 className="text-center pb-5 pt-3 my-0">New in Historical</h1>

        <div className="row pt-3">
          <div className="col-md-4">
            <div className={`card mb-3 h-100 ${styles.newArival}`}>
              <img
                src={`${books?.[0]?.imageUrl?.[0]}`}
                className={`card-img-top img-thumbnail rounded-start ${styles.newArivalImg}`}
                alt="new-fiction"
              />
              <div className="card-body p-3 d-flex flex-column justify-content-around">
                <h5 className="card-title">{books?.[0]?.name}</h5>
                <p className="card-text">
                  Try {books?.[0]?.name} in our new fiction collection just
                  launched this week. Get an 10% more discount on buying the
                  book today.
                </p>
                <Link
                  className={`px-1 py-1 rounded rounded-4 fw-medium fs-5 text-center card-text  ${styles.newArivalLink}`}
                  onClick={() => cartHandler(books?.[0])}
                >
                  Add To Cart 👉
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className={`card mb-3 h-100 ${styles.newArival}`}>
              <img
                src={`${books?.[1]?.imageUrl[0]}`}
                className={`card-img-top img-thumbnail rounded-start ${styles.newArivalImg}`}
                alt="new-fiction"
              />
              <div className="card-body p-3 d-flex flex-column justify-content-around">
                <h5 className="card-title">{books?.[1]?.name}</h5>
                <p className="card-text">
                  Try {books?.[1]?.name} in our new historical collection just
                  launched this week. Get an 10% more discount on buying the
                  book today.
                </p>
                <Link
                  className={`px-1 py-1 rounded rounded-4 fw-medium fs-5 text-center card-text   ${styles.newArivalLink}`}
                  onClick={() => cartHandler(books?.[1])}
                >
                  Add To Cart 👉
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className={`card mb-3 h-100 ${styles.newArival}`}>
              <img
                src={`${books?.[12]?.imageUrl[0]}`}
                className={`card-img-top img-thumbnail rounded-start ${styles.newArivalImg}`}
                alt="new-fiction"
              />
              <div className="card-body p-3 d-flex flex-column justify-content-around">
                <h5 className="card-title">{books?.[12]?.name}</h5>
                <p className="card-text">
                  Try {books?.[12]?.name} in our new fiction collection just
                  launched this week. Get an 10% more discount on buying the
                  book today.
                </p>
                <Link
                  href="#"
                  className={`px-1 py-1 rounded rounded-4 fw-medium fs-5 text-center card-text   ${styles.newArivalLink}`}
                  onClick={() => cartHandler(books?.[12])}
                >
                  Add To Cart 👉
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewHistorical;
