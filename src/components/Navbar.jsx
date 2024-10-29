import { NavLink } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { BsBookmarksFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import styles from "../components/css/navbar.module.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-light py-3">
        <div className="container">
          <NavLink
            className={`navbar-brand fw-semibold fs-5 ${styles.logo} px-4 py-1 rounded-5`}
            to="/"
          >
            Pustak
            <span className={`${styles.logoHalf} fs-3 fw-normal`}>Store</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
              <li className="nav-item">
                <NavLink
                  className={`fw-medium fs-5 px-4 py-1 ${styles.bookBtn}`}
                  aria-current="page"
                  to="/books"
                >
                  Books
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link fw-medium fs-5"
                  aria-current="page"
                  to="/cart"
                >
                  <BsCart4 className={`${styles.cartIcon}`} />
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link fw-medium fs-5"
                  aria-current="page"
                  to="/wishlist"
                >
                  <BsBookmarksFill className={`${styles.wishlist}`} />
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link fw-medium fs-5"
                  aria-current="page"
                  to="/profile"
                >
                  <BsPersonCircle className={`${styles.profile}`} />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
