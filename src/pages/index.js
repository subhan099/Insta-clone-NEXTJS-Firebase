"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Lottie from "react-lottie-player";
import Link from "next/link";
import AuthAnimation from "../../public/assets/animations/sign-in-animation.json";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import LoadingIcons from "react-loading-icons";
import { Bars } from "react-loading-icons";
import { ThreeDots } from "react-loading-icons";
// const inter = Inter({ subsets: ["latin"] });
import { getDatabase, ref, set } from "firebase/database";
const database = getDatabase();

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/home");
        setAuthenticated(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        alert("Invalid Credentials");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {loading ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : authenticated ? (
          <div>
            <h1>Loading...</h1>
            {/* <ThreeDots style={{ color: "black" }} /> */}
            {/* <Bars style={{ color: "black" }} />  */}
          </div>
        ) : (
          <div>
            <div className="container">
              <div className="first">
                <Lottie play loop animationData={AuthAnimation} />
              </div>
              <div className="second">
                <div className="box">
                  <div className="form-col">
                    <Image
                      className="logo"
                      src="/logo.png"
                      alt="logo"
                      width={200}
                      height={100}
                    />
                    <form className="form" onSubmit={handleSubmit}>
                      <div>
                        <input
                          className="data_styled"
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Phone Number, Username, or Email"
                        />
                      </div>
                      <div>
                        <input
                          className="data_styled"
                          type="password"
                          name="password"
                          id="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Password"
                        />
                      </div>
                      <button className="submit_button" type="submit">
                        Log In
                      </button>
                    </form>
                    <div className="container-or space-x-5">
                      <div className="line-or" />
                      <div>OR</div>
                      <div className="line-or" />
                    </div>
                    <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                      <Image
                        className="fb_logo"
                        src="/fb.png"
                        alt="logo"
                        width={15}
                        height={15}
                      />
                      <Link
                        className="fb_link"
                        href="https://www.facebook.com"
                        target={"_blank"}
                      >
                        Login with Facebook
                      </Link>
                    </div>
                    <div className="forgot_link">
                      <Link href="/forgotPage">Forgot Password?</Link>
                    </div>
                  </div>
                </div>
                <div className="Lower_box">
                  <div className="Lower-content">
                    Don't Have an Account?
                    <Link className="signUp_link" href="/SignUp">
                      Sign up
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

            <Footer />
          </div>
        )}
      </main>
    </>
  );
}
