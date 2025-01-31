import styles from "../components/css/profileDisplay.module.css";
import stylesTwo from "../components/css/newForm.module.css";
import { logOutUser } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";

const ProfileDisplay = () => {
  const profileData = useOutletContext();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <>
      <section className="container">
        <div className={`${styles.profileContain} card mx-auto mt-5`}>
          <div className="card-body d-flex flex-column align-items-center">
            <img
              src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
              alt="profile-pic"
              className={`${styles.profilePic}`}
            />
            <div className="mb-2">
              <button
                type="button"
                className={`${stylesTwo.submitBtn} px-4 py-1 fw-medium`}
                onClick={handleLogout}
              >
                Log-Out
              </button>
            </div>
            <div className="d-flex align-items-center gap-3">
              <h3 className={`${styles.emailLabel}`}>Name:</h3>
              <h4 className={`${styles.emailVal}`}>{profileData?.name}</h4>
            </div>

            <div className="d-flex align-items-center gap-3">
              <h3 className={`${styles.emailLabel}`}>Email:</h3>
              <h4 className={`${styles.emailVal}`}>{profileData?.email}</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileDisplay;
