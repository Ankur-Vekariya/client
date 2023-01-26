import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assetes/profile.png";
import styles from "../styles/Usename.module.css";

export default function Username() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello again!</h4>
            <span className="py-4 text-xl w-2/3 text-center">
              Explore More by connecting with us
            </span>
          </div>
          <form className="py-1">
            <div className="profile flex justify-center py-4">
              <img src={avatar} alt="avatar" className={styles.profile_img} />
            </div>
            <div className="textbox flex flex-col items-center py-4 ">
              <input
                type="text"
                placeholder="Username"
                className={styles.textbox}
              />
              <button type="submit" className={styles.btn}>
                Let's go
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a member{" "}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
