"use client";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/router";

export default function SignUp() {
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       router.push("/home");
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Sign Up Data is as:", data);

    const email = data.email;
    const password = data.password;
    const username = data.username;
    const fullname = data.fullname;
    createUserWithEmailAndPassword(auth, email, password, username)
      .then((userCredential) => {
        console.log("=======SUCESS");
        router.push("/");
      })
      .catch((error) => {
        console.error(
          "Firebase Authentication Error:",
          error.code,
          error.message
        );
      });
  };
  return (
    <div>
      <div className="sign_up_container">
        <div className="container">
          <div className="second">
            <div className="sign_up_box">
              <div className="form-col">
                <Image
                  className="logo"
                  src="/logo.png"
                  alt="logo"
                  width={200}
                  height={100}
                />
                <div className="text-below-logo">
                  Sign up to see photos and videos from your friends.
                </div>
                <div
                  style={{
                    backgroundColor: "#0095f6",
                    width: "260px",
                    height: "35px",
                    borderRadius: "3px",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "-16px",
                    }}
                  >
                    <Image
                      className="fb_logo"
                      src="/fb-white.png"
                      alt="logo"
                      width={15}
                      height={15}
                    />
                    <Link
                      className="fb_link"
                      href="https://www.facebook.com"
                      target={"_blank"}
                      style={{ color: "white" }}
                    >
                      Login with Facebook
                    </Link>
                  </div>
                </div>
                <div
                  style={{ marginBottom: "20px" }}
                  className="container-or space-x-5"
                >
                  <div className="line-or" />
                  <div>OR</div>
                  <div className="line-or" />
                </div>
                <form className="form" onSubmit={handleSubmit}>
                  <div>
                    <input
                      className="data_styled"
                      type="email"
                      name="email"
                      id="email"
                      value={data.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <input
                      className="data_styled"
                      type="text"
                      name="fullname"
                      id="fullname"
                      value={data.fullname}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <input
                      className="data_styled"
                      type="text"
                      name="username"
                      id="username"
                      value={data.username}
                      onChange={handleInputChange}
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <input
                      className="data_styled"
                      type="password"
                      name="password"
                      id="password"
                      value={data.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                    />
                  </div>
                  <div className="short-text">
                    People who use our service may have uploaded your contact
                    information to Instagram.
                    <Link
                      style={{ color: "#285682" }}
                      href="https://www.facebook.com/help/instagram/261704639352628"
                    >
                      Learn More
                    </Link>
                  </div>
                  <div className="short-text">
                    By signing up, you agree to our
                    <Link
                      style={{ marginLeft: "3px", color: "#285682" }}
                      href="https://help.instagram.com/581066165581870/?locale=en_US"
                    >
                      Terms
                    </Link>{" "}
                    ,{" "}
                    <Link
                      style={{ color: "#285682" }}
                      href="https://www.facebook.com/privacy/policy"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      style={{ color: "#285682" }}
                      href="https://help.instagram.com/1896641480634370/"
                    >
                      Cookies Policy .
                    </Link>
                  </div>

                  <button
                    style={{ marginBottom: "50px" }}
                    className="submit_button"
                    type="submit"
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </div>
            <div className="Lower_box">
              <div className="Lower-content">
                Have an Account?
                <Link className="signUp_link" href="/">
                  Log in
                </Link>
              </div>
            </div>
            <div className="end-login">
              <div>Get the app</div>
              <div className="apple_playstore_button">
                <div style={{ marginRight: "10px" }}>
                  <a
                    href="https://apps.apple.com/app/instagram/id389801252?vt=lo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/apple_button.png"
                      alt=""
                      height={41}
                      width={135}
                    />
                  </a>
                </div>

                <div>
                  <a
                    href="https://play.google.com/store/search?q=instagram&c=apps"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/playstore_button.jpeg"
                      alt=""
                      height={35}
                      width={135}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
