"use client";

import Image from "next/image";
import styles from "@/app/styles/userComponents.module.css";
import Logo_Bo_Icon from "@/public/Logo_BO_Icon.svg";
import { useUser } from "@/contexts/UserContext";
import { tulpenOne } from "@/utils/fonts";

export const ProfileHeader = () => {
  const { user } = useUser();
  const userStats = user?.stats || { posts: 0, followers: 0, following: 0 };

  return (
    <div className={styles.profileHeaderContainer}>
      <Image
        src={user?.profilePicture || Logo_Bo_Icon}
        alt="My user's profile picture"
        width={148}
        height={148}
        className={styles.profilePicture}
        priority
      />
      <div className={styles.profileInfo}>
        <p id={styles.username} className={tulpenOne.className}>
          @{user?.username}
        </p>
        <div className={styles.statsBar}>
          <span>{userStats.posts || 0} posts</span>
          <span>{userStats.followers || 0} followers</span>
          <span>{userStats.following || 0} following</span>
        </div>
      </div>
    </div>
  );
};

// ProfileActions
export const ProfileActions = () => {
  return (
    <div className={styles.profileActions}>
      <button>Edit Profile</button>
    </div>
  );
};

// ContentTabs
export const ContentTabs = () => {
  return (
    <div className={styles.contentTabs}>
      <button>Publications</button>
    </div>
  );
};

// ContentGrid
export const ContentGrid = () => {
  return (
    <div className={styles.contentGrid}>
      {/* Grid items will be mapped here */}
      <div className={styles.gridItem}>Content 1</div>
      <div className={styles.gridItem}>Content 2</div>
      <div className={styles.gridItem}>Content 3</div>
      <div className={styles.gridItem}>Content 4</div>
      <div className={styles.gridItem}>Content 5</div>
      <div className={styles.gridItem}>Content 6</div>
      <div className={styles.gridItem}>Content 7</div>
      <div className={styles.gridItem}>Content 8</div>
      <div className={styles.gridItem}>Content 9</div>
      <div className={styles.gridItem}>Content 10</div>
      <div className={styles.gridItem}>Content 11</div>
      <div className={styles.gridItem}>Content 12</div>

      {/* More content... */}
    </div>
  );
};
