import styles from "@/app/styles/postOptionsPopup.module.css";
import cross_icon from "@/public/icon_cross.svg";
import icon_chat from "@/public/icon_chat.svg";
import icon_delete from "@/public/icon_delete.svg";
import icon_edit from "@/public/icon_edit.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PostOptionsPopupProps {
  isOwner: boolean;
  onClose: () => void;
  postId: number;
}

export const PostOptionsPopup: React.FC<PostOptionsPopupProps> = ({
  isOwner,
  onClose,
  postId,
}) => {
  const router = useRouter();

  const handleDeletePost = async (postId: number) => {
    console.log("Deleting post with ID:", postId);
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      //   const deletedPost = await response.json();
      console.log("Post deleted successfully");

      router.push("/profil/myProfil");
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
            <li className={styles.optionItem}>
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
