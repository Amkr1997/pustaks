import styles from "../components/css/wishlist.module.css";
import { BsCartCheck } from "react-icons/bs";
import NavbarTwo from "../components/NavbarTwo";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import {
  useAddToCartMutation,
  useDeleteFromWishlistMutation,
  useGetLoginUserDataQuery,
  useGetSingleUserQuery,
} from "../features/apiSlice";

const WishList = () => {
  const { data: profileId } = useGetLoginUserDataQuery();
  const { data: profileData, isLoading } = useGetSingleUserQuery(
    profileId?.userId,
    {
      skip: !profileId?.userId,
    }
  );
  const [deleteWishlist] = useDeleteFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  const handleRemoval = async (book) => {
    try {
      const res = await deleteWishlist({
        bookId: book?._id,
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

  const handleSetWishlist = async (book) => {
    try {
      const res = await addToCart({
        bookId: book?._id,
        userId: profileId?.userId,
      });

      toast.success(res?.data?.message);
      handleRemoval(book); // after adding to cart removal from wishlist
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
      <div className={`container mt-4 p-4 my-5 ${styles.wishlistContainer}`}>
        <h3 className="fw-bold text-center pt-2 pb-4">
          {`My Wishlist`.toUpperCase()}({profileData?.wishList?.length})
        </h3>

        <div className="row">
          {!isLoading ? (
            profileData?.wishList?.map((book) => {
              return (
                <div
                  key={book?.bookId?._id}
                  className={`col-sm-6 col-md-4 col-lg-3 col-xxl-3 ${styles.bookItem}`}
                >
                  <div className={`${styles.wishlistCard} card h-100`}>
                    <div className="card-header">
                      <img
                        src={book?.bookId?.imageUrl[0]}
                        alt="book-image"
                        className={`${styles.bookImage} img-fluid`}
                      />
                    </div>

                    <div className="card-body d-flex flex-column align-items-center justify-content-between">
                      <p className="card-text m-0 fs-5 text-center fw-normal">
                        {book?.bookId?.name}
                      </p>
                      <p className="card-title fs-4 fw-medium m-0">
                        ₹{book?.bookId?.price}
                      </p>
                    </div>

                    <button
                      className={`${styles.cartBtn} mb-2 mx-auto`}
                      type="button"
                      onClick={() => handleSetWishlist(book?.bookId)}
                    >
                      <span className="fs-5 fw-medium d-flex align-items-center justify-content-center gap-2">
                        Move To Cart <BsCartCheck />
                      </span>
                    </button>
                    <button
                      className={`${styles.removeBtn} p-0 mb-2 mx-auto`}
                      type="button"
                      onClick={() => handleRemoval(book?.bookId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <Loading />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishList;
