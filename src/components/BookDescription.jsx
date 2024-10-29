import styles from "../components/css/bookDescription.module.css";
import { FaStar } from "react-icons/fa6";
import { BsBox } from "react-icons/bs";
import { BsTruck } from "react-icons/bs";
import { BsLockFill } from "react-icons/bs";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setbookToCart } from "../features/cartSlice";
import { setBookToWishList } from "../features/wishlistSlice";
import { toast } from "react-toastify";

const BookDescription = ({ foundBookObj }) => {
  const dispatch = useDispatch();
  //const { cart } = useSelector((state) => state.cart);
  //const savedBook = cart.find((book) => book?._id === foundBookObj._id);

  const handleAddToCart = () => {
    /* if (savedBook) {
      dispatch(
        updateCartDataAsync({ ...savedBook, quantity: savedBook.quantity + 1 })
      );
    } else {
      dispatch(
        setbookToCart({
          ...foundBookObj,
          imageUrl: foundBookObj.imageUrl[0],
          quantity: 1,
        })
      );
      dispatch(
        addCartData({
          ...foundBookObj,
          imageUrl: foundBookObj.imageUrl[0],
          quantity: 1,
        })
      );
    }*/
    dispatch(setbookToCart(foundBookObj));
    toast.success("Added to Cart");
  };

  const handleAddToWishlist = () => {
    dispatch(setBookToWishList(foundBookObj));
    toast.success("Added to Wishlist");
  };

  /*useEffect(() => {
    dispatch(fetchCartDataAsync());
  }, []);*/

  return (
    <>
      <h1 className="display-5 fw-medium pt-2">{foundBookObj?.name}</h1>
      <p className={`${styles.category} fw-bold lh-1 fs-5 py-1`}>
        {foundBookObj?.category}
      </p>
      <p className={`${styles.rating} fw-bold lh-1 fs-5 hstack gap-4`}>
        <span className="d-flex align-items-center">
          {" "}
          <span className="text-dark fw-medium">Rated:</span>{" "}
          <span className="ps-2">{foundBookObj?.rating}</span>
          <FaStar className={`${styles.starIcon}`} />
        </span>
        <span>
          <span className="text-dark fw-medium">Author:</span>{" "}
          {foundBookObj?.author}
        </span>
      </p>
      <p className="py-2 fw-bold fs-4">
        Price: ₹{foundBookObj?.price}{" "}
        <span className="fs-5 ps-2 text-secondary">
          <del>₹{foundBookObj?.price + (foundBookObj?.price / 10) * 3}</del>
        </span>
      </p>
      <hr />
      <div className="py-2 d-flex align-items-center justify-content-start gap-4">
        <span className="d-flex flex-column align-items-center justify-content-between">
          <BsBox className={`${styles.detailsIcon}`} />
          <span className="fs-5 fw-semibold">1 week Returnable</span>
        </span>

        <span className="d-flex flex-column align-items-center justify-content-between">
          <BsTruck className={`${styles.detailsIcon}`} />
          <span className="fs-5 fw-semibold">Free Delivery</span>
        </span>

        <span className="d-flex flex-column align-items-center justify-content-between">
          <BsFillCreditCard2BackFill className={`${styles.detailsIcon}`} />
          <span className="fs-5 fw-semibold">Pay Online</span>
        </span>

        <span className="d-flex flex-column align-items-center justify-content-between">
          <BsLockFill className={`${styles.detailsIcon}`} />
          <span className="fs-5 fw-semibold">Secure Payment</span>
        </span>
      </div>
      <hr />
      <h4 className="m-0">Description</h4>
      <p className="py-2 w-100 lh-base">{foundBookObj?.description}</p>
      <div className={`${styles.btnContainer}`}>
        <button
          className={`${styles.cartBtn} flex-grow-1 fw-medium px-4`}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button
          className={`${styles.wishlistBtn} flex-grow-1 fw-semibold px-4`}
          onClick={handleAddToWishlist}
        >
          Add to Wishlist
        </button>
      </div>
    </>
  );
};

export default BookDescription;
