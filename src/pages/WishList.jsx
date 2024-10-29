import { useDispatch, useSelector } from "react-redux";
import styles from "../components/css/wishlist.module.css";
import { BsCartCheck } from "react-icons/bs";
import { setbookToCart } from "../features/cartSlice";
import { removeBookFromWishlist } from "../features/wishlistSlice";
import NavbarTwo from "../components/NavbarTwo";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const WishList = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleSetWishlist = (book) => {
    dispatch(setbookToCart(book));
    dispatch(removeBookFromWishlist(book));
    toast.success("Added to Cart");
  };

  const handleRemoval = (book) => {
    dispatch(removeBookFromWishlist(book));
    toast.success("Removed from Wishlist");
  };

  return (
    <>
      <NavbarTwo />
      <div className={`container mt-4 p-4 my-5 ${styles.wishlistContainer}`}>
        <h3 className="fw-bold text-center pt-2 pb-4">
          {`My Wishlist`.toUpperCase()}({wishlist.length})
        </h3>

        <div className="row">
          {wishlist.map((book) => {
            return (
              <div
                key={book._id}
                className={`col-sm-6 col-md-4 col-lg-3 col-xxl-3 ${styles.bookItem}`}
              >
                <div className={`${styles.wishlistCard} card h-100`}>
                  <div className="card-header">
                    <img
                      src={book.imageUrl[0]}
                      alt="book-image"
                      className={`${styles.bookImage} img-fluid`}
                    />
                  </div>

                  <div className="card-body d-flex flex-column align-items-center justify-content-between">
                    <p className="card-text m-0 fs-5 text-center fw-normal">
                      {book.name}
                    </p>
                    <p className="card-title fs-4 fw-medium m-0">
                      ₹{book.price}
                    </p>
                  </div>

                  <button
                    className={`${styles.cartBtn} mb-2 mx-auto`}
                    type="button"
                    onClick={() => handleSetWishlist(book)}
                  >
                    <span className="fs-5 fw-medium d-flex align-items-center justify-content-center gap-2">
                      Move To Cart <BsCartCheck />
                    </span>
                  </button>
                  <button
                    className={`${styles.removeBtn} p-0 mb-2 mx-auto`}
                    type="button"
                    onClick={() => handleRemoval(book)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishList;
