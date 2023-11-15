"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import styles from "@/app/styles/feed.module.css";
import { amarante } from "@/utils/fonts";
import Loading from "@/app/loading";
import { Post } from "@/types/userTypes";
import PostItem from "@/components/PostItem";

export default function Feed() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const updatePostInFeed = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
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
      <h3 id={styles.desktopHeader} className={amarante.className}>
        Accueil
      </h3>
      <div className={styles.feed}>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            user={user}
            updatePost={updatePostInFeed}
            setPosts={setPosts}
          />
        ))}
      </div>
    </div>
  );
}
