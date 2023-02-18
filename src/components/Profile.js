import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assetes/profile.png";
import styles from "../styles/Usename.module.css";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import extend from "../styles/profile.module.css";
import useFetch from "../hooks/fetchHook";
import { useAuthStore } from "../store/store";
import { updateuser } from "../helper/helper";

export default function Profile() {
  const { username } = useAuthStore((state) => state.auth);

  const [file, setFile] = useState();

  const [{ isLoading, apiData, serverError }] = useFetch(`user/${username}`);

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      let updatePromise = updateuser(values);
      toast.promise(updatePromise, {
        loading: "Upadating...",
        success: <b>Update successfully</b>,
        error: <b>Could not updated!</b>,
      });
    },
  });

  const onUpload = async (e) => {
    console.log("e", e);

    const base64 = await convertToBase64(e.target.files[0]);

    console.log("base64", base64);
    setFile(base64);
  };
  console.log("file", file);
  if (isLoading)
    return (
      <div
        className="spinner-grow inline-block w-12 h-12 bg-current rounded-full opacity-0"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  if (serverError) {
    <div
      className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700"
      role="alert"
    >
      <h4 className="text-2xl font-medium leading-tight mb-2">Well done!</h4>
      <p className="mb-4">{serverError.message}</p>
      <hr className="border-green-600 opacity-30" />
      <p className="mt-4 mb-0">
        Whenever you need to, be sure to use margin utilities to keep things
        nice and tidy.
      </p>
    </div>;
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "50%" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center">
              you can updat details
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || file || avatar}
                  alt="avatar"
                  className={`${styles.profile_img} ${extend.profile_img}`}
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
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  placeholder="First Name"
                  className={`${styles.textbox} ${extend.textbox}`}
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  type="text"
                  placeholder="Last Name"
                  className={`${styles.textbox} ${extend.textbox}`}
                />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  type="text"
                  placeholder="Mobile"
                  className={`${styles.textbox} ${extend.textbox}`}
                />
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  placeholder="Email"
                  className={`${styles.textbox} ${extend.textbox}`}
                />
              </div>
              <input
                {...formik.getFieldProps("address")}
                type="text"
                placeholder="Address"
                className={styles.textbox}
              />
              <button type="submit" className={styles.btn}>
                Register
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back later
                <Link className="text-red-500" to="/">
                  Log Out
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
