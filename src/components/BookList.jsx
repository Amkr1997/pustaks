import { useSelector } from "react-redux";
import styles from "../components/css/bookList.module.css";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { BsCartCheck } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useGetLoginUserDataQuery,
  useGetSingleUserQuery,
} from "../features/apiSlice";

const BookList = ({ filteredBooks }) => {
  const { filterByRating, status, error } = useSelector((state) => state.books);
  const { data: profileId } = useGetLoginUserDataQuery();
  const { data: profileData } = useGetSingleUserQuery(profileId?.userId, {
    skip: !profileId?.userId,
  });
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [addToCart] = useAddToCartMutation();
  const [addToWishList] = useAddToWishlistMutation();

  const addToCartHandler = async (book) => {
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

  const handleWishlist = async (book) => {
    if (!isAuthenticated) {
      toast.warn("Login First");
      return;
    }

    try {
      const res = await addToWishList({
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
            {filteredBooks?.length > 0
              ? filteredBooks?.map((book) => {
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
                          <p className="card-title fs-4 fw-medium m-0 text-capitalize">
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
                              {profileData?.wishList?.some(
                                (b) => b.bookId._id === book._id
                              ) ? (
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
                          <p className="card-title fs-4 fw-medium m-0 text-capitalize">
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
                              {/*isWishlist ? <BsBookmarkFill /> : <BsBookmark />*/}
                              {profileData?.wishList?.some(
                                (b) => b.bookId._id === book._id
                              ) ? (
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
