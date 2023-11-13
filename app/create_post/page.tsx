"use client";
import Image from "next/image";
import styles from "@/app/styles/create_post.module.css";
import Logo_Bo_Icon from "@/public/Logo_BO_Icon.svg";
import { amarante, tulpenOne } from "@/utils/fonts";
import { useUser } from "@/contexts/UserContext";
import Button from "@/components/btn";
import NavbarBottom from "@/components/navbarBottom";
import Link from "next/link";
import arrowLeftIcon from "@/public/arrow_left.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const { user } = useUser();
  const [postContent, setPostContent] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const payload = {
        content: postContent,
        userId: user?.id,
        type: "TEXT",
        // mediaUrl: "url_to_media_if_any", // Include this if your post has media
      };

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newPost = await response.json();
        console.log("Post created successfully:", newPost);
        router.push("/grimoire");
      } else {
        const errorData = await response.json();
        console.error("Failed to create post:", errorData);
        // Handle error in UI
      }
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error in UI
    }
  };

  return (
    <>
      <NavbarBottom />

      <div className={styles.createPostContainer}>
        <div className={styles.pageHeader}>
          <button className={styles.goBackButton}>
            <Link href="/grimoire">
              <Image src={arrowLeftIcon} alt="Go Back" width={24} height={24} />
            </Link>
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
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
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
          <div className={styles.publishBtnWrapper}>
            <Button text="Publish" onClick={handleSubmit} />
          </div>
        </footer>
      </div>
    </>
  );
}
