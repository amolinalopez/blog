import { SetStateAction, Dispatch } from "react";
import { Post } from "@/types/userTypes";

export async function handleLike(
  postId: number,
  posts: Post[],
  setPosts: Dispatch<SetStateAction<Post[]>>,
  user: { id: number } | null
) {
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
}
