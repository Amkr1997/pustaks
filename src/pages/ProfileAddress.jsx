import { useDispatch, useSelector } from "react-redux";
import styles from "../components/css/profileAddress.module.css";
import { useEffect } from "react";
import { deleteAddress, fetchAddress } from "../features/addressSlice";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const ProfileAddress = () => {
  const { address, status, error } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (address) => {
    dispatch(deleteAddress(address));
  };

  const handleUpdate = (address) => {
    navigate(`/profile/profileForm`, { state: { address } }, { replace: true });
  };

  useEffect(() => {
    dispatch(fetchAddress());
  }, []);

  return (
    <>
      <section className="container">
        {/*<div className="d-flex justify-content-center">
          <button className={`${styles.addAddress} mt-3`}>
            Add New Address{" "}
            <FaPlus style={{ height: "50%", paddingBottom: "0.125rem" }} />
          </button>
        </div>*/}
        <>
          <div className="row mt-5">
            {error && <p>{error.message}</p>}
            {status === "loading" ? (
              <Loading />
            ) : (
              <>
                {address?.map((address) => {
                  return (
                    <div key={address._id} className="col-lg-4 mb-3">
                      <div className={`card ${styles.addressCard}`}>
                        <div className="card-body">
                          <p>
                            <span className="fw-semibold">Street:</span>{" "}
                            <span>{address.street}</span>
                          </p>
                          <p>
                            <span className="fw-semibold">City:</span>{" "}
                            <span>{address.city}</span>
                          </p>
                          <p>
                            <span className="fw-semibold">State:</span>{" "}
                            <span>{address.state}</span>
                          </p>
                          <p>
                            <span className="fw-semibold">Country:</span>{" "}
                            <span>{address.country}</span>
                          </p>

                          <div
                            className={`d-flex justify-content-end gap-2 btns`}
                          >
                            <button
                              className={`${styles.deleteBtn} px-3`}
                              onClick={() => handleDelete(address)}
                            >
                              Delete
                            </button>
                            <button
                              className={`${styles.editBtn} px-3`}
                              onClick={() => handleUpdate(address)}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </>
      </section>
    </>
  );
};

export default ProfileAddress;
