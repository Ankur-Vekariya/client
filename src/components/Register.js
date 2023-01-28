import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assetes/profile.png";
import styles from "../styles/Usename.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerVelidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";

export default function Register() {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerVelidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

  const onUpload = async (e) => {
    console.log("e", e);

    const base64 = await convertToBase64(e.target.files[0]);

    console.log("base64", base64);
    setFile(base64);
  };
  console.log("file", file);
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: "50%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center">
              Happy to join you
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  alt="avatar"
                  className={styles.profile_img}
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              ></input>
            </div>
            <div className="textbox flex flex-col items-center gap-6 ">
              <input
                {...formik.getFieldProps("email")}
                type="text"
                placeholder="Email"
                className={styles.textbox}
              />
              <input
                {...formik.getFieldProps("username")}
                type="text"
                placeholder="Username"
                className={styles.textbox}
              />
              <input
                {...formik.getFieldProps("password")}
                type="text"
                placeholder="Password"
                className={styles.textbox}
              />
              <button type="submit" className={styles.btn}>
                Register
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register
                <Link className="text-red-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
