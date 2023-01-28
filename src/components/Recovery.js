import React from "react";
import styles from "../styles/Usename.module.css";
import { Toaster } from "react-hot-toast";

export default function Recovery() {
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center">
              enter otp to reset password
            </span>
          </div>
          <form className="pt-20">
            <div className="textbox flex flex-col items-center gap-6 ">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit otp sent to your email
                </span>
                <input
                  type="text"
                  placeholder="Otp"
                  className={styles.textbox}
                />
              </div>

              <button type="submit" className={styles.btn}>
                recover
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Cant get otp
                <button className="text-red-500">Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
