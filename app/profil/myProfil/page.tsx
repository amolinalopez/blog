"use client";
import styles from "@/app/styles/userComponents.module.css";
import {
  ContentGrid,
  ContentTabs,
  ProfileActions,
  ProfileHeader,
} from "@/components/userComponents/profileHeader";

export default function MyProfile() {
  return (
    <div id={styles.MyProfile}>
      <ProfileHeader />
      {/* <ProfileActions /> */}
      <ContentTabs />
      <ContentGrid />
    </div>
  );
}
