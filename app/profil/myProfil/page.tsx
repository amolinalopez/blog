"use client";
import styles from "@/app/styles/userComponents.module.css";
import {
  ContentGrid,
  ContentTabs,
  ProfileActions,
  ProfileHeader,
} from "@/components/userComponents/profileHeader";
import { useUser } from "@/contexts/UserContext";

export default function MyProfile() {
  const { user } = useUser();
  return (
    <div id={styles.MyProfile}>
      <ProfileHeader />
      <ProfileActions />
      <ContentTabs />
      <ContentGrid />
    </div>
  );
}
