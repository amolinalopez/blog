"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import Logo_BO_Icon from "@/public/Logo_BO_Icon.svg";
import styles from "@/app/styles/feed.module.css";
import NavbarTop from "@/components/navbarTop";
import NavbarBottom from "@/components/navbarBottom";
import { Like } from "@prisma/client";
import icon_like from "@/public/icon_like.svg";
import icon_like_full from "@/public/icon_like_full.svg";
import icon_share from "@/public/icon_share.svg";
import icon_favorite from "@/public/icon_favorite.svg";
import icon_comment from "@/public/icon_comment.svg";
import { tulpenOne, jost, amarante } from "@/utils/fonts";
import Loading from "../loading";
import LeftSidebar from "@/components/leftSidebar";
import RightSidebar from "@/components/rightSidebar";

type User = {
  id: number;
  username: string;
  profilePicture: string;
};

enum PostType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

type Post = {
  id: number;
  content: string;
  type: PostType;
  mediaUrl?: string;
  gradient?: string;
  createdAt: string;
  user: User;
  likes?: Like[];
};

export default function Feed() {
  const contextValue = useUser();
  const user = contextValue ? contextValue.user : null;
  const [posts, setPosts] = useState<Post[]>([]);

  const handleLike = async (postId: number) => {
    // check if le post already liked by current user
    const post = posts.find((post) => post.id === postId);
    if (!post) {
      console.error("Post not found");
      return;
    }
    const userLike = post.likes?.find((like) => like.userId === user?.id);

    if (userLike) {
      try {
        const response = await fetch(`/api/likes/${userLike.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete like");
        }
        // Update the state to reflect the deleted like
        setPosts((prevPosts) => {
          return prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: post.likes?.filter((like) => like.id !== userLike.id),
                }
              : post
          );
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch("/api/likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.id,
            postId: postId,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to create like");
        }
        const newLike = await response.json();
        // Update the state to reflect the new like
        setPosts((prevPosts) => {
          return prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: [...(post.likes || []), newLike],
                }
              : post
          );
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts", { cache: "no-store" });
        const posts = await res.json();

        if (!Array.isArray(posts)) {
          throw new Error("Invalid response from server");
        }

        const postUsers = await Promise.all(
          posts.map(async (post) => {
            const userRes = await fetch(`/api/users/${post.userId}`, {
              cache: "no-store",
            });
            const user = await userRes.json();
            return { ...post, user };
          })
        );

        setPosts(postUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  if (!posts.length) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <NavbarTop />
      <LeftSidebar />
      <div className={styles.feed}>
        <h3 id={styles.desktopHeader} className={amarante.className}> Home</h3>
        {posts.map((post) => {
          return (
            <div
              key={post.id}
              className={
                post.type === "TEXT" ? styles.textPost : styles.imagePost
              }
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
                  {/* <div>
                  <p id={styles.mediaText}>{post.content}</p>
                </div> */}
                </section>
              )}

              <div className={styles.userWrapper}>
                <Image
                  src={post.user.profilePicture || Logo_BO_Icon}
                  alt="My user's profile picture"
                  width={44}
                  height={44}
                  className={styles.profilePicture}
                />
                <p id={styles.username} className={tulpenOne.className}>
                  @{post.user.username}
                </p>
                {/*  <p> on {formatDateAndTime(post.createdAt)}</p> */}
              </div>

              <section id={styles.sectionUnderPost}>
                <div onClick={() => handleLike(post.id)}>
                  <Image
                    src={
                      post.likes?.some((like) => like.userId === user?.id)
                        ? icon_like_full
                        : icon_like
                    }
                    alt="Like icon"
                    width={23}
                    height={21}
                  />
                  <span className="textOrange">
                    {post.likes && post.likes.length > 0
                      ? ` ${post.likes.length}`
                      : null}{" "}
                    likes
                  </span>
                </div>
                <div>
                  <Image
                    src={icon_share}
                    alt="Share icon"
                    width={23}
                    height={21}
                  />
                  <Image
                    src={icon_favorite}
                    alt="Favorite icon"
                    width={23}
                    height={21}
                  />
                </div>
              </section>
              <section id={styles.sectionUnderPost}>
                <label id={styles.labelHidden} htmlFor="comment">
                  Comment
                </label>
                <input
                  type="text"
                  name="comment"
                  id="comment"
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
        })}
      </div>
      <RightSidebar />
      <NavbarBottom />
    </div>
  );
}
