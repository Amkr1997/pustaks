import { useState } from "react";
import styles from "../components/css/login.module.css";
import NavbarTwo from "../components/NavbarTwo";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../features/apiSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logInUser } from "../features/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [login] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const res = await login(formData).unwrap();
      dispatch(logInUser(res?.jwtToken));
      toast.success(res?.message);
      navigate("/");
    } catch (error) {
      if (error.status === 404) {
        toast.warn(error.data.message);
      } else if (error.status === 401) {
        toast.warn(error.data.message);
      } else {
        toast.warning("Internal server error");
      }
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  const testSubmit = async () => {
    setFormData({
      email: "aman@a.com",
      password: "aman",
    });

    toast.warn("Click on Login");
  };

  return (
    <>
      <NavbarTwo />
      <section
        className={`${styles.formContainer} container px-5 px-sm-0 mt-5`}
      >
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 bg-white px-4 pt-4 pb-2 rounded rounded-3">
            <form onSubmit={submitHandler}>
              <h1 className="text-center m-0 pb-3 fs-2 fw-bold">
                Log<span className={`${styles.logoHalf}`}>In</span>
              </h1>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  className="form-control"
                  placeholder="Enter email address"
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
                  className="form-control"
                  value={formData.password}
                  onChange={changeHandler}
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className={`${styles.loginBtn} mt-4 mb-2 w-100 fw-bold`}
              >
                LOGIN
              </button>
            </form>
            <button
              type="submit"
              className={`${styles.loginBtn} mt-4 mb-2 w-100 fw-medium`}
              onClick={testSubmit}
            >
              Auto Write Test Credentials
            </button>
            <span className={`${styles.signUpRoute} py-3`}>
              New User,{" "}
              <Link to={"/register"} className={`${styles.signUpRouteHalf}`}>
                SignUp
              </Link>
            </span>
          </div>
          <div className="col-md-3"></div>
        </div>
      </section>
    </>
  );
};

export default Login;
