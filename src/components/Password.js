import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assetes/profile.png";
import styles from "../styles/Usename.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordVelidate } from "../helper/validate";

export default function Password() {
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordVelidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello again!</h4>
            <span className="py-4 text-xl w-2/3 text-center">
              Explore More by connecting with us
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} alt="avatar" className={styles.profile_img} />
            </div>
            <div className="textbox flex flex-col items-center gap-6 ">
              <input
                {...formik.getFieldProps("password")}
                type="text"
                placeholder="Password"
                className={styles.textbox}
              />
              <button type="submit" className={styles.btn}>
                Sign up
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password
                <Link className="text-red-500" to="/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
