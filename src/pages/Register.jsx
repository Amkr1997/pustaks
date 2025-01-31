import { useState } from "react";
import NavbarTwo from "../components/NavbarTwo";
import styles from "../components/css/register.module.css";
import { Link } from "react-router-dom";
import { useRegisterUserMutation } from "../features/apiSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [register] = useRegisterUserMutation();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await register(formData).unwrap();
      toast.success(res?.message);
    } catch (error) {
      if (error.status === 409) {
        toast.warn(error.data.message);
      } else {
        toast.warning("Internal server error");
      }
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <NavbarTwo />
      <section className={`${styles.formContainer} container px-4 px-sm-0`}>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 bg-white px-4 pt-4 pb-2 rounded rounded-3">
            <form onSubmit={submitHandler}>
              <h1 className="text-center m-0 pb-3 fs-2 fw-bold">
                Sign<span className={`${styles.logoHalf}`}>Up</span>
              </h1>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={changeHandler}
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="form-control"
                  onChange={changeHandler}
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  className="form-control"
                  onChange={changeHandler}
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className={`${styles.signUpBtn} w-100 fw-bold`}
              >
                SIGN UP
              </button>
            </form>
            <span className={`${styles.loginRoute} py-3`}>
              Already have an account,{" "}
              <Link to={"/login"} className={`${styles.loginRouteHalf}`}>
                LOGIN
              </Link>
            </span>
          </div>
          <div className="col-md-3"></div>
        </div>
      </section>
    </>
  );
};

export default Register;
