import { Outlet, NavLink } from "react-router-dom";
import styles from "../components/css/profile.module.css";
import NavbarTwo from "../components/NavbarTwo";
import Footer from "../components/Footer";
import {
  useGetLoginUserDataQuery,
  useGetSingleUserQuery,
} from "../features/apiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseCount } from "../features/authSlice";

const Profile = () => {
  const { data: profileId, refetch: refetchUserId } =
    useGetLoginUserDataQuery();
  const { data: profileData } = useGetSingleUserQuery(profileId?.userId, {
    skip: !profileId?.userId,
  });
  const { isAuthenticated, profileFetchCount } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && profileFetchCount < 1) {
      refetchUserId();
      dispatch(increaseCount());
    }
  }, [isAuthenticated]);

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
              state={{ data: profileData }}
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
              state={profileData}
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
      <Outlet context={profileData} />
      <Footer />
    </>
  );
};

export default Profile;
