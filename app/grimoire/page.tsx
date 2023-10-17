"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import Logo_BO_Icon from "@/public/Logo_BO_Icon.svg";
import styles from "@/app/styles/feed.module.css";
import { formatDateAndTime } from "@/utils/formatTime";
import { Tulpen_One } from "next/font/google";
import NavbarTop from "@/components/navbarTop";
import NavbarBottom from "@/components/navbarBottom";

const tulpenOne = Tulpen_One({ subsets: ["latin"], weight: "400" });

type User = {
  id: number;
  username: string;
  profilePicture: string;
};

type Post = {
  id: number;
  content: string;
  createdAt: string;
  user: User;
};

export default function Feed() {
  const contextValue = useUser();
  const user = contextValue ? contextValue.user : null;
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

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

  // console.log("the token is", token);
  // useEffect(() => {
  //   if (!token) {
  //     router.push("/auth/login");
  //     return;
  //   }
  //   // Assuming the token is already parsed
  //   const payload = JSON.parse(atob(token.value));
  //   setUsername(payload.username);
  // }, [router]);

  if (!posts.length) {
    return <div>Loading...😭</div>;
  }

  return (
    <div className={styles.container}>
      <NavbarTop />
      <div className={styles.feed}>
        {posts.map((post) => (
          <div key={post.id}>
            <hr />
            <p>{post.content}</p>
            <div className={styles.userWrapper}>
              <Image
                src={post.user.profilePicture || Logo_BO_Icon}
                alt="My user's profile picture"
                width={44}
                height={44}
                className={styles.profilePicture}
              />
              <p id={styles.username} className={tulpenOne.className}>
                @{post.user.username}{" "}
              </p>
               <p> on {formatDateAndTime(post.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
      <NavbarBottom />
    </div>
  );
}
