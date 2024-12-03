import { useDispatch, useSelector } from "react-redux";
import styles from "../components/css/bookList.module.css";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { BsCartCheck } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { setbookToCart } from "../features/cartSlice";
import {
  removeBookFromWishlist,
  setBookToWishList,
} from "../features/wishlistSlice";
import { toast } from "react-toastify";

const BookList = () => {
  const { filterByRating, status, error, filterBySearch } = useSelector(
    (state) => state.books
  );
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const addToCartHandler = (book) => {
    dispatch(setbookToCart(book));
    toast.success("Added To Cart");
  };

  const handleWishlist = (book) => {
    // Returns a truthy or falsy value.
    wishlist.some((b) => b._id === book._id)
      ? toast.success("Removed from Wishlist") &&
        dispatch(removeBookFromWishlist(book))
      : toast.success("Added to Wishlist") && dispatch(setBookToWishList(book));
  };

  return (
    <>
      {error && <p>{error}</p>}
      {status === "loading" ? (
        <Loading />
      ) : (
        <section className="container-fluid py-5">
          <h3 className="">
            Showing All Books{" "}
            <span className="fs-5">
              (Showing{" "}
              {filterByRating?.length > 1
                ? `${filterByRating?.length} books`
                : `${filterByRating?.length} book`}
              )
            </span>
          </h3>
          <div className="row py-5">
            {filterBySearch?.length > 0
              ? filterBySearch?.map((book) => {
                  return (
                    <div
                      key={book._id}
                      className={`col-sm-6 col-lg-4 col-xl-4 col-xxl-3 mb-4 ${styles.bookItem}`}
                    >
                      <div className="card h-100">
                        <Link
                          to={`/bookDetails/${book._id}`}
                          className="card-header"
                        >
                          <img
                            src={book.imageUrl[0]}
                            alt="book-image"
                            className={`${styles.bookImage} img-fluid`}
                          />
                        </Link>

                        <div className="card-body d-flex flex-column align-items-center justify-content-between">
                          <p className="card-text m-0 fs-5 text-center fw-normal">
                            {book.name}
                          </p>
                          <p className="card-title fs-4 fw-medium m-0">
                            ₹{book.price}
                          </p>
                          <p className="card-title fs-4 fw-medium m-0">
                            rated {book.rating}🌟
                          </p>
                        </div>

                        <div className={`${styles.cartBtns}`}>
                          <button
                            className={`${styles.cartBtn} mb-2 mx-auto`}
                            type="button"
                            onClick={() => addToCartHandler(book)}
                          >
                            <span className="fs-5 fw-medium d-flex align-items-center justify-content-center gap-2">
                              Add To Cart <BsCartCheck />
                            </span>
                          </button>

                          <button
                            className={`${styles.wishlistBtn} mb-2 mx-auto`}
                            type="button"
                            onClick={() => handleWishlist(book)}
                          >
                            <span className="fs-5 fw-medium d-flex align-items-center justify-content-center gap-2">
                              <BsBookmarkFill />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : filterByRating?.map((book) => {
                  return (
                    <div
                      key={book._id}
                      className={`col-sm-6 col-lg-4 col-xl-4 col-xxl-3 mb-4 ${styles.bookItem}`}
                    >
                      <div className="card h-100">
                        <Link
                          to={`/bookDetails/${book._id}`}
                          className="card-header"
                        >
                          <img
                            src={book.imageUrl[0]}
                            alt="book-image"
                            className={`${styles.bookImage} img-fluid`}
                          />
                        </Link>

                        <div className="card-body d-flex flex-column align-items-center justify-content-between">
                          <p className="card-text m-0 fs-5 text-center fw-normal">
                            {book.name}
                          </p>
                          <p className="card-title fs-4 fw-medium m-0">
                            ₹{book.price}
                          </p>
                          <p className="card-title fs-4 fw-medium m-0">
                            <span className="fs-6">Rated {book.rating}🌟</span>
                          </p>
                        </div>

                        <div className={`${styles.cartBtns}`}>
                          <button
                            className={`${styles.cartBtn} mb-2 mx-auto`}
                            type="button"
                            onClick={() => addToCartHandler(book)}
                          >
                            <span className="fs-5 fw-medium d-flex align-items-center justify-content-center gap-2">
                              Add To Cart <BsCartCheck />
                            </span>
                          </button>

                          <button
                            className={`${styles.wishlistBtn} mb-2 mx-auto`}
                            type="button"
                            onClick={() => handleWishlist(book)}
                          >
                            <span className="fs-5 fw-medium d-flex align-items-center justify-content-center gap-2">
                              {/*isWishlist ? <BsBookmarkFill /> : <BsBookmark />*/}
                              {wishlist.some((b) => b._id === book._id) ? (
                                <BsBookmarkFill />
                              ) : (
                                <BsBookmark />
                              )}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </section>
      )}
    </>
  );
};

export default BookList;
