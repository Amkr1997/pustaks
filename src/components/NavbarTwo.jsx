import { NavLink } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { BsBookmarksFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import styles from "../components/css/navbarTwo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInp } from "../features/bookSlice";
import {
  useGetLoginUserDataQuery,
  useGetSingleUserQuery,
} from "../features/apiSlice";

const NavbarTwo = () => {
  const { searchInput } = useSelector((state) => state.books);
  const { data: profileId } = useGetLoginUserDataQuery();
  const { data: profileData } = useGetSingleUserQuery(profileId?.userId, {
    skip: !profileId?.userId,
  });
  const dispatch = useDispatch();

  const handleSearchInp = (e) => {
    const { value } = e.target;

    dispatch(setSearchInp(value));
  };

  return (
    <header className={`bg-transparent ${styles.navbarTwoContainer}`}>
      <nav className={`container pt-4 pb-3 ${styles.nav}`}>
        <NavLink
          className={`navbar-brand fs-3 fw-semibold ${styles.logo} px-sm-4 py-sm-1 rounded-5`}
          to="/"
        >
          P<span className={`${styles.logoHalf} fs-3 fw-medium`}>ustaks</span>
        </NavLink>

        {location.pathname === "/books" && (
          <div className={`input-group ${styles.inpContain}`}>
            <input
              type="text"
              className={`form-control fw-medium text-lowercase ${styles.searchInp}`}
              value={searchInput}
              placeholder="SEARCH BY NAME"
              aria-label="Search"
              aria-describedby="button-addon2"
              onChange={handleSearchInp}
            />
          </div>
        )}

        <ul
          className={`d-flex align-items-center gap-4 mb-0 ps-0 ${styles.listContainer}`}
        >
          <li className="nav-item">
            <NavLink
              className={`fw-medium fs-5 px-sm-4 py-sm-1 ${styles.bookBtn}`}
              aria-current="page"
              to="/books"
            >
              Books
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link fw-medium fs-5 position-relative"
              aria-current="page"
              to="/cart"
            >
              <BsCart4 className={`${styles.cartIcon}`} />
              {profileData?.cartList?.length > 0 && (
                <span className="p-2 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {profileData?.cartList?.length}+
                  <span className="visually-hidden"></span>
                </span>
              )}
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link fw-medium fs-5 position-relative"
              aria-current="page"
              to="/wishlist"
            >
              <BsBookmarksFill className={`${styles.wishlist}`} />
              {profileData?.wishList?.length > 0 && (
                <span className="p-2 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {profileData?.wishList?.length}+
                  <span className="visually-hidden"></span>
                </span>
              )}
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
      </nav>
    </header>
  );
};

export default NavbarTwo;
