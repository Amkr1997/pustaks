import styles from "../components/css/profileDisplay.module.css";

const ProfileDisplay = () => {
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
            <div className="d-flex align-items-center gap-3">
              <h3 className={`${styles.emailLabel}`}>Name:</h3>
              <h4 className={`${styles.emailVal}`}>User Ji</h4>
            </div>

            <div className="d-flex align-items-center gap-3">
              <h3 className={`${styles.emailLabel}`}>Email:</h3>
              <h4 className={`${styles.emailVal}`}>xyz@abc.com</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileDisplay;
