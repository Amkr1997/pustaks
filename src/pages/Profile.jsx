import { Outlet, NavLink } from "react-router-dom";
import styles from "../components/css/profile.module.css";
import NavbarTwo from "../components/NavbarTwo";
import Footer from "../components/Footer";

const Profile = () => {
  return (
    <>
      <NavbarTwo />
      <section className="container mt-4">
        <ul
          className={`${styles.profileNav} ps-0 d-flex align-items-center justify-content-center flex-wrap`}
        >
          <li>
            <NavLink
              className={`${styles.listItem} ${styles.fstBtn} px-3 fw-semibold text-uppercase`}
              type="button"
              to={`/profile`}
            >
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.listItem} ${styles.secndBtn} ${
                  isActive ? styles.selected : styles.notSelected
                } px-3 fw-semibold text-uppercase`
              }
              type="button"
              to={`/profile/profileAddress`}
            >
              Address
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.listItem} ${styles.thrdBtn} ${
                  isActive ? styles.selected : styles.notSelected
                } px-3 fw-semibold text-uppercase`
              }
              type="button"
              to={`/profile/profileForm`}
            >
              Add Address
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.listItem} ${styles.frthBtn} ${
                  isActive ? styles.selected : styles.notSelected
                } px-3 fw-semibold text-uppercase`
              }
              type="button"
              to={`/profile/profileOrders`}
            >
              Orders
            </NavLink>
          </li>
        </ul>
      </section>
      <Outlet />
      <Footer />
    </>
  );
};

export default Profile;
