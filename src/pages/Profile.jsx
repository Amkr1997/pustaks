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
          className={`${styles.profileNav} ps-0 d-flex align-items-center justify-content-center`}
        >
          <li>
            <NavLink
              className={`${styles.listItem} ${styles.leftBtn} px-3 fw-semibold text-uppercase`}
              type="button"
              to={`/profile`}
            >
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              className={`${styles.listItem} ${styles.middleBtn} px-3 fw-semibold text-uppercase`}
              type="button"
              to={`/profile/profileAddress`}
            >
              Address
            </NavLink>
          </li>

          <li>
            <NavLink
              className={`${styles.listItem} ${styles.rightBtn} px-3 fw-semibold text-uppercase`}
              type="button"
              to={`/profile/profileForm`}
            >
              Form
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
