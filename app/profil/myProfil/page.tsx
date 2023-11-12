"use client";
import styles from "@/app/styles/userComponents.module.css";
import { User } from "@/types/userTypes";
import {
  ContentGrid,
  ContentTabs,
  ProfileActions,
  ProfileHeader,
} from "@/components/userComponents/profileHeader";
import { useUser } from "@/contexts/UserContext";

export default function MyProfile() {
  const { user, stats } = useUser();
  return (
    <div id={styles.MyProfile}>
      <ProfileHeader />
      {/* <ProfileActions /> */}
      <ContentTabs />
      <ContentGrid />
    </div>
  );
}
