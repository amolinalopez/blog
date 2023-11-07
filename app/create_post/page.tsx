"use client";
import Image from "next/image";
import styles from "@/app/styles/create_post.module.css";
import Logo_Bo_Icon from "@/public/Logo_BO_Icon.svg";
import { amarante, tulpenOne } from "@/utils/fonts";
import { useUser } from "@/contexts/UserContext";
import Button from "@/components/btn";
import NavbarBottom from "@/components/navbarBottom";
// import NavbarTop from "@/components/navbarTop";
export default function CreatePost() {
  const { user } = useUser();

  return (
    <>
      {/* <NavbarTop /> */}
      <NavbarBottom />

      <div className={styles.createPostContainer}>
        <div className={styles.pageHeader}>
          <button className={styles.goBackButton}>
            <Image src="/arrow_left.svg" alt="Go Back" width={24} height={24} />
          </button>
          <h1 id={styles.pageTitle} className={amarante.className}>
            Créer un post
          </h1>
          <button className={styles.closeButton}>
            <Image src="/icon_cross.svg" alt="Close" width={24} height={24} />
          </button>
        </div>

        <div className={styles.userWrapper}>
          <Image
            src={user?.profilePicture || Logo_Bo_Icon}
            alt="My user's profile picture"
            width={44}
            height={44}
            className={styles.profilePicture}
          />
          <p id={styles.username} className={tulpenOne.className}>
            @{user?.username}
          </p>
        </div>

        <div className={styles.textAreaWrapper}>
          <textarea
            placeholder="Comment allez-vous ?"
            maxLength={250}
            className={styles.textArea}
          ></textarea>
          <div className={styles.textAreaFooter}>
            <span>0/120</span>
            <Image src="/icon_info.svg" alt="Info" width={16} height={16} />
          </div>
        </div>
        <br />
        <footer className={styles.footer}>
          <div className={styles.mediaButtons}>
            <button className={styles.mediaButton}>📄</button>{" "}
            {/* Document button */}
            <button className={styles.mediaButton}>📸</button>{" "}
            {/* Image button */}
            <button className={styles.mediaButton}>📹</button>{" "}
            {/* Video button */}
          </div>
          <Button text="Publish" />
        </footer>
      </div>
    </>
  );
}
