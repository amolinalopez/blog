import styles from "@/app/styles/postOptionsPopup.module.css";
import cross_icon from "@/public/icon_cross.svg";
import icon_chat from "@/public/icon_chat.svg";
import icon_delete from "@/public/icon_delete.svg";
import icon_edit from "@/public/icon_edit.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Post, User } from "@/types/userTypes";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import { handleErrors } from "@/app/api/utils/errorHandler";

interface PostOptionsPopupProps {
  isOwner: boolean;
  onClose: () => void;
  postId: number;
  updatePost: (updatedPost: Post) => void;
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  currentContent: string;
  postUser: User;
}

export const PostOptionsPopup: React.FC<PostOptionsPopupProps> = ({
  isOwner,
  onClose,
  postId,
    setPosts,
  updatePost,
  currentContent,
  postUser,
}) => {
  const { fetchUserData } = useUser();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdatePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const updatedContentElement = form.elements[0] as HTMLInputElement;
    const updatedContent = updatedContentElement.value;
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: updatedContent }),
      credentials: "include",
    });

    if (response.ok) {
      let updatedPost = await response.json();
      updatedPost = { ...updatedPost, user: postUser };
      updatePost(updatedPost);
      setIsEditing(false);
      onClose();
      fetchUserData();
      router.push("/grimoire");
    } else {
      handleErrors(response);
    }
  };

  const handleDeletePost = async (postId: number) => {
    // console.log("Deleting post with ID:", postId);
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      console.log("Post deleted successfully");
      //   setPosts((prevPosts) =>
      //     prevPosts.map((post) =>
      //       post.id === updatedPost.id ? updatedPost : post
      //     )
      //   );
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      fetchUserData();
      router.push("/grimoire");
      // TO DO : create better UI for this
    } else {
      console.error("Failed to delete the post:", response.statusText);
      const errorData = await response.json();
      console.error(errorData.message);
      // TO DO : create better UI for this error like why it failed
    }
  };
  return (
    <div className={styles.popupContainer}>
      <ul className={styles.optionsList}>
        {isOwner ? (
          <>
            <li className={styles.optionItem} onClick={handleEditClick}>
              <Image
                src={icon_edit}
                alt="Update my post"
                width={20}
                height={20}
                className={styles.icon}
                priority
              />
              Update
            </li>
            {isEditing && (
              <form onSubmit={handleUpdatePost}>
                <input type="text" defaultValue={currentContent} />
                <button type="submit">Save Changes</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </form>
            )}
            <li
              className={styles.optionItem}
              onClick={() => handleDeletePost(postId)}
            >
              <Image
                src={icon_delete}
                alt="Delete my post"
                width={20}
                height={20}
                className={styles.icon}
                priority
              />
              Delete
            </li>
          </>
        ) : (
          <li className={styles.optionItem}>
            <Image
              src={icon_chat}
              alt="Message the owner of this post"
              width={20}
              height={20}
              className={styles.icon}
              priority
            />
            Message
          </li>
        )}
      </ul>
      <div onClick={onClose}>
        <Image
          src={cross_icon}
          alt="Close popup"
          width={20}
          height={20}
          className={styles.closeIcon}
          priority
        />
      </div>
    </div>
  );
};

export default PostOptionsPopup;
