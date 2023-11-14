import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/styles/feed.module.css";
import { Post, User } from "@/types/userTypes";
import Logo_BO_Icon from "@/public/Logo_BO_Icon.svg";
import icon_like from "@/public/icon_like.svg";
import icon_like_full from "@/public/icon_like_full.svg";
import icon_share from "@/public/icon_share.svg";
import icon_favorite from "@/public/icon_favorite.svg";
import icon_comment from "@/public/icon_comment.svg";
import { tulpenOne, jost } from "@/utils/fonts";
import PostOptionsPopup from "./PostPopUp";

export interface PostItemProps {
  post: Post;
  user: User | null;
  updatePost: (updatedPost: Post) => void;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostItem: React.FC<PostItemProps> = ({
  post,
  user,
  updatePost,
  setPosts,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isOwner = user && post.user ? post.user.id === user.id : false;
  const userLink = post.user ? `/profil/${post.user.username}` : "#";

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleAddLike = async (postId: number) => {
    if (!user?.id) return;

    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, postId }),
      });

      if (response.ok) {
        const newLike = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, likes: [...(post.likes ?? []), newLike] }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const handleRemoveLike = async (likeId: number, postId: number) => {
    try {
      const response = await fetch(`/api/likes/${likeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: post.likes?.filter((like) => like.id !== likeId) ?? [],
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error removing like:", error);
    }
  };

  const handleLikeClick = () => {
    const alreadyLiked = post.likes?.some((like) => like.userId === user?.id);
    const likeId = post.likes?.find((like) => like.userId === user?.id)?.id;

    if (alreadyLiked && likeId) {
      handleRemoveLike(likeId, post.id);
    } else {
      handleAddLike(post.id);
    }
  };

  return (
    <div
      key={post.id}
      className={post.type === "TEXT" ? styles.textPost : styles.imagePost}
    >
      {post.type === "TEXT" ? (
        <section
          className={`${styles.postGradient} ${
            post.gradient ? styles[post.gradient] : ""
          }`}
        >
          <p className={styles.postWhite}>{post.content}</p>
        </section>
      ) : (
        <section className={styles.mediaPost}>
          <Image
            src={post.mediaUrl || Logo_BO_Icon}
            alt="Uploaded content"
            width={150}
            height={100}
            className={styles.mediaPost}
            priority
          />
          <div>{/* <p id={styles.mediaText}>{post.content}</p> */}</div>
        </section>
      )}
      {isPopupOpen && (
        <PostOptionsPopup
          isOwner={isOwner}
          onClose={togglePopup}
          postId={post.id}
          setPosts={setPosts}
          postUser={post.user}
          updatePost={updatePost}
          currentContent={post.content}
        />
      )}
      <div className={styles.postHeader}>
        <div className={styles.userWrapper}>
          <Link href={userLink} className={styles.userLink}>
            <Image
              src={post.user?.profilePicture || Logo_BO_Icon}
              alt="user profile picture"
              width={44}
              height={44}
              className={styles.profilePicture}
            />
          </Link>
          <p id={styles.username} className={tulpenOne.className}>
            @{post.user?.username}
          </p>
          {/*  <p> on {formatDateAndTime(post.createdAt)}</p> */}
        </div>
        <p onClick={togglePopup} className={styles.popUpButton}>
          ...
        </p>
      </div>
      <section id={styles.sectionUnderPost}>
        <div onClick={handleLikeClick}>
          <Image
            src={
              post.likes?.some((like) => like.userId === user?.id)
                ? icon_like_full
                : icon_like
            }
            alt="Like icon"
            width={20}
            height={17}
            priority
            className={styles.likeIconHeart}
          />
          <span className="textOrange">
            {post.likes && post.likes.length > 0
              ? ` ${post.likes.length} ${
                  post.likes.length === 1 ? "like" : "likes"
                }`
              : "like"}
          </span>
        </div>
        <div>
          <Image src={icon_share} alt="Share icon" width={23} height={21} />
          <Image
            src={icon_favorite}
            alt="Favorite icon"
            width={23}
            height={21}
          />
        </div>
      </section>
      <section id={styles.sectionUnderPost}>
        <label id={styles.labelHidden} htmlFor={"comment" + post.id}>
          Comment
        </label>
        <input
          type="text"
          name="comment"
          id={"comment" + post.id}
          className={styles.input + " " + jost.className}
          placeholder="Ajouter un commentaire"
        />
        <Image
          src={icon_comment}
          alt="Comment icon"
          width={40}
          height={40}
          id={styles.IconInput}
        />
      </section>
    </div>
  );
};

export default PostItem;
