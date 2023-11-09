import styles from "../app/styles/navbarBottom.module.css";
import React, { useEffect } from "react";
import icon_home from "../public/icon_home.svg";
import icon_search from "../public/icon_search.svg";
import icon_add from "../public/icon_add.svg";
import icon_chat from "../public/icon_chat.svg";
import Image from "next/image";
import Logo_BO_Icon from "./../public/Logo_BO_Icon.svg";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

export default function NavbarBottom() {
  const { user } = useUser();
  // console.log(user);

  // useEffect(() => {
  //   console.log("User state has changed:", user);
  // }, [user]);

  return (
    <div className={styles.navbarBottom}>
      <div className={styles.navItem}>
        <Image src={icon_home} alt="Home" />
      </div>
      <div className={styles.navItem}>
        <Image src={icon_search} alt="Search" />
      </div>
      <div className={styles.navItem}>
        <Link href={"/create_post"}>
          <Image src={icon_add} alt="Add" />
        </Link>
      </div>
      <div className={styles.navItem}>
        <Image src={icon_chat} alt="Chat" />
      </div>
      <div className={styles.navItem}>
        <Link href="/profil/myProfil" className={styles.profile}>
          <Image
            src={user?.profilePicture || Logo_BO_Icon}
            alt="My user's profile picture"
            width={40}
            height={40}
            className="profilePicture"
            priority
          />
        </Link>
      </div>
    </div>
  );
}
