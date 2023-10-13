"use client";
import { useState, useEffect } from "react";
import LogoutBtn from "../../components/LogoutBtn";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  username: string;
};

type Post = {
  id: number;
  content: string;
  createdAt: string;
  user: User;
};

const Feed: React.FC = () => {
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    setUsername(payload.username);
  }, [router]);

  if (!posts.length) {
    return <div>Loading...😭</div>;
  }

  return (
    <div>
      <h1>Feed</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
          <p>{post.createdAt}</p>
          <p>@{post.user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
