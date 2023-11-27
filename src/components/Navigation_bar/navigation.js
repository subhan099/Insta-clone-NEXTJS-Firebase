import React, { useState } from "react";
import Image from "next/image";
import { FaHome, FaRegComment, FaRegBookmark } from "react-icons/fa"; // Import the FaHome icon
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { GoPaperAirplane } from "react-icons/go";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GrMenu } from "react-icons/gr";
import { PiSignOutBold } from "react-icons/pi";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "@/pages/store";
import {
  MdOutlineExplore,
  MdOutlineVideoLibrary,
  MdOutlineCreateNewFolder,
} from "react-icons/Md";
import ModalContentCreate from "@/pages/modalContentCreate";
import ModalContentProfile from "@/pages/modalContentProfile";
import Modal from "src/components/Modal/Modal.js";
import Link from "next/link";
// res.setHeader("Cache-Control", "no-store");

export default function Navigation() {
  const [showModal, setShowModal] = useState(false);
  const [showModalProfile, setShowModalProfile] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // const auth = getAuth();
  // console.log("=======>auth", auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSignOut = async () => {
    dispatch(logout());
    try {
      await signOut(auth);
      // window.location.reload();
      // firebaseAuth.signOut();
      // finish();
      // startActivity(new Intent(SecondActivity.this, MainActivity.class));
      // finish();

      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div>
      <div>
        <Image
          className="logo"
          src="/logo.png"
          alt="logo"
          width={200}
          height={100}
        />
      </div>
      <div className="navigation-links">
        <div>
          <Link href="/home">
            <div
              style={{ display: "flex", fontSize: "20px", cursor: "pointer" }}
            >
              <FaHome
                style={{
                  height: "30px",
                  width: "30px",
                  marginRight: "15px",
                }}
              />{" "}
              <div style={{ marginTop: "5px" }}>Home</div>{" "}
            </div>
          </Link>
          <Link href="/">
            <div
              style={{ display: "flex", marginTop: "20px", fontSize: "20px" }}
            >
              <AiOutlineSearch
                style={{
                  height: "30px",
                  width: "30px",

                  marginRight: "15px",
                }}
              />{" "}
              <div style={{ marginTop: "5px" }}>Search</div>{" "}
            </div>
          </Link>

          <Link href="/">
            <div
              style={{ display: "flex", marginTop: "20px", fontSize: "20px" }}
            >
              <MdOutlineVideoLibrary
                style={{
                  height: "30px",
                  width: "30px",

                  marginRight: "15px",
                }}
              />{" "}
              <div style={{ marginTop: "5px" }}>Reels</div>{" "}
            </div>
          </Link>
          <Link href="/">
            <div
              style={{ display: "flex", marginTop: "20px", fontSize: "20px" }}
            >
              <BiMessageRoundedDetail
                style={{
                  height: "30px",
                  width: "30px",

                  marginRight: "15px",
                }}
              />{" "}
              <div style={{ marginTop: "5px" }}>Messages</div>{" "}
            </div>
          </Link>
          <Link href="/">
            <div
              style={{ display: "flex", marginTop: "20px", fontSize: "20px" }}
            >
              <AiOutlineHeart
                style={{
                  height: "30px",
                  width: "30px",

                  marginRight: "15px",
                }}
              />{" "}
              <div style={{ marginTop: "5px" }}>Notifications</div>{" "}
            </div>
          </Link>
          <Link href="/myAccount">
            <div
              style={{ display: "flex", marginTop: "20px", fontSize: "20px" }}
            >
              <MdOutlineExplore
                style={{
                  height: "30px",
                  width: "30px",

                  marginRight: "15px",
                }}
              />{" "}
              <div style={{ marginTop: "5px" }}>My Account</div>{" "}
            </div>
          </Link>

          <div>
            <button
              style={{
                cursor: "pointer",
                display: "flex",
                marginTop: "20px",
                fontSize: "20px",
                backgroundColor: "white",
                border: "none",
                color: "black",
              }}
              onClick={() => setShowModal(true)}
            >
              <MdOutlineCreateNewFolder
                style={{
                  height: "30px",
                  width: "30px",

                  marginRight: "15px",
                }}
              />
              <div style={{ marginTop: "5px" }}>Create</div>
            </button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <ModalContentCreate />
              </Modal>
            )}
          </div>

          {/* <Link href="/">
            <div
              style={{ display: "flex", marginTop: "20px", fontSize: "20px" }}
            >
              <CgProfile
                style={{
                  height: "30px",
                  width: "30px",

                  marginRight: "15px",
                }}
              />{" "}
              <div style={{ marginTop: "5px" }}>Profile</div>{" "}
            </div>
          </Link> */}

          <div>
            <button
              style={{
                cursor: "pointer",
                display: "flex",
                marginTop: "20px",
                fontSize: "20px",
                backgroundColor: "white",
                border: "none",
                color: "black",
              }}
              onClick={() => setShowModalProfile(true)}
            >
              <CgProfile
                style={{
                  height: "30px",
                  width: "30px",

                  marginRight: "15px",
                }}
              />
              <div style={{ marginTop: "5px" }}>Profile</div>
            </button>
            {showModalProfile && (
              <Modal onClose={() => setShowModalProfile(false)}>
                <ModalContentProfile />
              </Modal>
            )}
          </div>
        </div>
        <div>
          <button
            style={{
              display: "flex",
              marginTop: "340px",
              fontSize: "20px",
              cursor: "pointer",
              backgroundColor: "white",
              border: "none",
              color: "black",
            }}
            onClick={handleSignOut}
          >
            {" "}
            <PiSignOutBold
              style={{
                height: "30px",
                width: "30px",
                marginRight: "15px",
              }}
              // onClick={handle}
            />{" "}
            <div style={{ marginTop: "5px" }}>SignOut</div>{" "}
          </button>

          <div
            style={{
              display: "flex",
              marginTop: "20px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            <GrMenu
              style={{
                height: "30px",
                width: "30px",
                marginRight: "15px",
              }}
              onClick={toggleMenu}
            />{" "}
            <div style={{ marginTop: "5px" }}>More</div>{" "}
          </div>
          {isMenuOpen && (
            <select onBlur={toggleMenu}>
              <option value="Settings">Settings</option>
              <option value="Your Activity">Your Activity</option>
              <option value="Saved">Saved</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
