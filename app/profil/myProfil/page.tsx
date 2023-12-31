"use client";
import styles from "@/app/styles/userComponents.module.css";
import {
  ContentGrid,
  ContentTabs,
  ProfileHeader,
} from "@/components/userPageComponents/profileHeader";

export default function MyProfile() {
  return (
    <div id={styles.MyProfile}>
      <ProfileHeader />
      <ContentTabs />
      <ContentGrid />
    </div>
  );
}
