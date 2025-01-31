import styles from "../components/css/newArivals.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddToCartMutation,
  useGetLoginUserDataQuery,
} from "../features/apiSlice";

const NewFiction = ({ books, error }) => {
  const { data: profileId } = useGetLoginUserDataQuery();
  const [addToCart] = useAddToCartMutation();

  const handleCart = async (book) => {
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
      <section className="container pt-3 px-0 pb-5">
        <h1 className="text-center pb-5 pt-3 my-0">New in Fiction</h1>

        <div className="row pt-3">
          <div className="col-md-5">
            <div className={`card mb-3 h-100 ${styles.newArival}`}>
              <img
                src={`${books[6]?.imageUrl[0]}`}
                className={`card-img-top img-thumbnail rounded-start ${styles.newArivalImg}`}
                alt="new-fiction"
              />
              <div className="card-body p-3 d-flex flex-column justify-content-around">
                <h5 className="card-title">{books[6]?.name}</h5>
                <p className="card-text">
                  Try {books[6]?.name} in our new fiction collection just
                  launched this week. Get an 10% more discount on buying the
                  book today.
                </p>
                <Link
                  className={`px-1 py-1 rounded rounded-4 fw-medium fs-5 text-center card-text  ${styles.newArivalLink}`}
                  onClick={() => handleCart(books[6])}
                >
                  Add To Cart 👉
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-2"></div>

          <div className="col-md-5">
            <div className={`card mb-3 h-100 ${styles.newArival}`}>
              <img
                src={`${books[7]?.imageUrl[0]}`}
                className={`card-img-top img-thumbnail rounded-start ${styles.newArivalImg}`}
                alt="new-fiction"
              />
              <div className="card-body p-3 d-flex flex-column justify-content-around">
                <h5 className="card-title">{books[7]?.name}</h5>
                <p className="card-text">
                  Try {books[7]?.name} in our new fiction collection just
                  launched this week. Get an 10% more discount on buying the
                  book today.
                </p>
                <Link
                  className={`px-1 py-1 rounded rounded-4 fw-medium fs-5 text-center card-text  ${styles.newArivalLink}`}
                  onClick={() => handleCart(books[7])}
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

export default NewFiction;
