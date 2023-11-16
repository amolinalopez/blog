"use client";

import Image from "next/image";
import styles from "@/app/styles/userComponents.module.css";
import Logo_Bo_Icon from "@/public/Logo_BO_Icon.svg";
import { useUser } from "@/contexts/UserContext";
import { amarante, tulpenOne } from "@/utils/fonts";

export const ProfileHeader = () => {
  const { user, stats } = useUser();

  return (
    <div className={styles.profileHeaderContainer}>
      <div className={styles.profileImageAndName}>
        <Image
          src={user?.profilePicture || Logo_Bo_Icon}
          alt="My user's profile picture"
          width={100}
          height={100}
          className={styles.profilePicture}
          priority
        />
        <p id={styles.username} className={tulpenOne.className}>
          @{user?.username}
        </p>
      </div>
      <div className={styles.profileInfoAndActions}>
        <div className={styles.profileInfo}>
          <div id={styles.statsBar} className={amarante.className}>
            <div className={styles.statItem}>
              <span>{stats?.posts || 0}</span>
              <span className={styles.statLabel}>posts</span>
            </div>
            <div className={styles.statItem}>
              <span>{stats?.followers || 0}</span>
              <span className={styles.statLabel}>followers</span>
            </div>
            <div className={styles.statItem}>
              <span>{stats?.following || 0}</span>
              <span className={styles.statLabel}>following</span>
            </div>
          </div>
        </div>
        <ProfileActions />
      </div>
    </div>
  );
};

// ProfileActions
export const ProfileActions = () => {
  return (
    <div className={styles.profileActions}>
      <button className={styles.btn}>Update Profile</button>
    </div>
  );
};

// ContentTabs
export const ContentTabs = () => {
  return (
    <div className={styles.contentTabs}>
      <div className={styles.tab}>Posts</div>
    </div>
  );
};

// ContentGrid
export const ContentGrid = () => {
  const { user } = useUser();
  const posts = user?.posts || [];
  return (
    <div className={styles.contentGridWrapper}>
      <div className={styles.contentGrid}>
        {posts.map((post, index) => (
          <div key={post.id || index} className={styles.gridItem}>
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
                  src={post.mediaUrl || Logo_Bo_Icon}
                  alt={post.content || "Uploaded content"}
                  width={265}
                  height={265}
                  priority
                />
              </section>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
