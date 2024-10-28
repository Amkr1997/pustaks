import { Link } from "react-router-dom";
import styles from "./css/footer.module.css";

const Footer = () => {
  return (
    <footer className={`mt-5 ${styles.footerContainer}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <Link
              to={"/"}
              className={`navbar-brand fs-3 fw-semibold${styles.footerLogo} ${styles.logo} px-sm-4 py-sm-1 rounded-5`}
            >
              {" "}
              P
              <span className={`${styles.bhandar} fs-3 fw-medium`}>ustaks</span>
            </Link>
            <p className="fs-5 fw-medium pt-4 pb-2">
              Buy wide range of books with different set of genres available
              here.
            </p>
            <p className="fs-5 m-0 fw-bold">
              &copy; {new Date().getFullYear()} Pustak
              <span className={`${styles.bhandar} fs-4`}>Store</span>
            </p>
          </div>

          <div className="col-3"></div>

          <div className={`${styles.navContainer} rounded-4 col-md-4`}>
            <h2 className="pt-2 pb-2">Quick Navigation</h2>
            <ul className={`${styles.footerNav} py-2`}>
              <li className={`${styles.navItem}`}>
                <Link
                  to="/books"
                  className={`${styles.navLink} fs-5 fw-semibold`}
                >
                  Books
                </Link>
              </li>
              <li className={`${styles.navItem}`}>
                <Link
                  to="/cart"
                  className={`${styles.navLink} fs-5 fw-semibold`}
                >
                  Cart
                </Link>
              </li>
              <li className={`${styles.navItem}`}>
                <Link
                  to="/wishlist"
                  className={`${styles.navLink} fs-5 fw-semibold`}
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
