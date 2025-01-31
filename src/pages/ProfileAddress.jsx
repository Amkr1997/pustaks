import styles from "../components/css/profileAddress.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDeleteAddressMutation } from "../features/apiSlice";
import { toast } from "react-toastify";

const ProfileAddress = () => {
  const profileData = useOutletContext();
  const [deleteAddress] = useDeleteAddressMutation();
  const navigate = useNavigate();

  const handleDelete = async (address) => {
    try {
      const res = await deleteAddress({
        userId: profileData?._id,
        addressId: address?._id,
      });

      toast.success(res?.data?.message);
    } catch (error) {
      if (error.status === 404) {
        toast.warn(error.data.message);
      } else if (error.status === 401) {
        toast.warn(error.data.message);
      } else {
        toast.warning("Internal server error");
      }
    }
  };

  const handleUpdate = (address) => {
    navigate(`/profile/profileForm`, { state: { address } }, { replace: true });
  };

  return (
    <>
      <section className="container">
        <>
          <div className="row mt-5">
            {profileData?.address?.map((address) => {
              return (
                <div key={address._id} className="col-lg-4 mb-3">
                  <div className={`card ${styles.addressCard}`}>
                    <div className="card-body">
                      <p>
                        <span className="fw-semibold">Name:</span>{" "}
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

                      <div className={`d-flex justify-content-end gap-2 btns`}>
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
          </div>
        </>
      </section>
    </>
  );
};

export default ProfileAddress;
