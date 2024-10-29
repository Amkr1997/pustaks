import { Link } from "react-router-dom";
import styles from "../components/css/newArivals.module.css";
import { useDispatch } from "react-redux";
import { setbookToCart } from "../features/cartSlice";
import { toast } from "react-toastify";

const NewHistorical = ({ books, error }) => {
  const dispatch = useDispatch();

  const cartHandler = (book) => {
    dispatch(setbookToCart(book));
    toast.success("Added to Cart!");
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
                src={`${books[0]?.imageUrl[0]}`}
                className={`card-img-top img-thumbnail rounded-start ${styles.newArivalImg}`}
                alt="new-fiction"
              />
              <div className="card-body p-3 d-flex flex-column justify-content-around">
                <h5 className="card-title">{books[0]?.name}</h5>
                <p className="card-text">
                  Try {books[0]?.name} in our new fiction collection just
                  launched this week. Get an 10% more discount on buying the
                  book today.
                </p>
                <Link
                  className={`px-1 py-1 rounded rounded-4 fw-medium fs-5 text-center card-text  ${styles.newArivalLink}`}
                  onClick={() => cartHandler(books[0])}
                >
                  Add To Cart 👉
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className={`card mb-3 h-100 ${styles.newArival}`}>
              <img
                src={`${books[1]?.imageUrl[0]}`}
                className={`card-img-top img-thumbnail rounded-start ${styles.newArivalImg}`}
                alt="new-fiction"
              />
              <div className="card-body p-3 d-flex flex-column justify-content-around">
                <h5 className="card-title">{books[1]?.name}</h5>
                <p className="card-text">
                  Try {books[1]?.name} in our new historical collection just
                  launched this week. Get an 10% more discount on buying the
                  book today.
                </p>
                <Link
                  className={`px-1 py-1 rounded rounded-4 fw-medium fs-5 text-center card-text   ${styles.newArivalLink}`}
                  onClick={() => cartHandler(books[1])}
                >
                  Add To Cart 👉
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className={`card mb-3 h-100 ${styles.newArival}`}>
              <img
                src={`${books[12]?.imageUrl[0]}`}
                className={`card-img-top img-thumbnail rounded-start ${styles.newArivalImg}`}
                alt="new-fiction"
              />
              <div className="card-body p-3 d-flex flex-column justify-content-around">
                <h5 className="card-title">{books[12]?.name}</h5>
                <p className="card-text">
                  Try {books[12]?.name} in our new fiction collection just
                  launched this week. Get an 10% more discount on buying the
                  book today.
                </p>
                <Link
                  href="#"
                  className={`px-1 py-1 rounded rounded-4 fw-medium fs-5 text-center card-text   ${styles.newArivalLink}`}
                  onClick={() => cartHandler(books[12])}
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
