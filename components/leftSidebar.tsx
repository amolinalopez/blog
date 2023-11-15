"use client";
import styles from "@/app/styles/leftSidebar.module.css";
import logo_with_name from "@/public/logo_with_name.svg";
import Logo_BO_Icon from "@/public/Logo_BO_Icon.svg";
import icon_home from "@/public/icon_home.svg";
import icon_search from "@/public/icon_search.svg";
import icon_add from "@/public/icon_add.svg";
import icon_saved from "@/public/icon_saved.svg";
import icon_chat from "@/public/icon_chat.svg";
import icon_settings from "@/public/icon_settings.svg";
import iconDelete from "@/public/icon_delete_account.svg";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import LogoutBtn from "./LogoutBtn";
import ConfirmDeleteModal from "./userPageComponents/deleteModal";
import { useState } from "react";

export default function LeftSidebar() {
  const { user } = useUser();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <aside className={styles.sidebar}>
      <a href="/grimoire" className={styles.logoContainer}>
        <Image
          src={logo_with_name}
          alt="Logo"
          width={150}
          height={100}
          className={styles.logo}
          priority
        />
      </a>
      <section id={styles.sidebarInside}>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link href="/grimoire">
                <Image
                  src={icon_home}
                  alt="Accueil"
                  id={styles.iconSVG}
                  width={30}
                  height={30}
                />
                Home
              </Link>
            </li>
            <li>
              <Link href="/comingSoon">
                <Image
                  src={icon_search}
                  alt="Recherche"
                  id={styles.iconSVG}
                  width={30}
                  height={30}
                />
                Search
              </Link>
            </li>
            <li>
              <Link href="/create_post">
                <Image
                  src={icon_add}
                  alt="Créer"
                  id={styles.iconSVG}
                  width={30}
                  height={30}
                />
                Create post
              </Link>
            </li>
            <li>
              <Link href="/comingSoon">
                <Image
                  src={icon_chat}
                  alt="Messages"
                  id={styles.iconSVG}
                  width={30}
                  height={30}
                />
                Message
              </Link>
            </li>
            <li>
              <Link href="/comingSoon">
                <Image
                  src={icon_saved}
                  alt="Recherche"
                  id={styles.iconSVG}
                  width={30}
                  height={30}
                />
                Saved
              </Link>
            </li>
            <li>
              <Link href="/comingSoon">
                <Image
                  src={icon_settings}
                  alt="Recherche"
                  id={styles.iconSVG}
                  width={30}
                  height={30}
                />
                Parameters
              </Link>
            </li>
            <li key="deleteMyAccount">
              <Image
                src={iconDelete}
                alt="Delete my account"
                width={30}
                height={30}
                className={styles.menuIcon}
              />
              <span onClick={handleOpenModal}> Delete my account</span>
            </li>
            <ConfirmDeleteModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />

            <li>
              <Link href="/profil/myProfil" className={styles.profile}>
                <Image
                  src={user?.profilePicture || Logo_BO_Icon}
                  alt="Mon profil"
                  width={40}
                  height={40}
                  className="profilePicture"
                  id={styles.iconSVG}
                  priority
                />
                <p> Mon profil</p>
              </Link>
            </li>
          </ul>
        </nav>
        <LogoutBtn />
      </section>
    </aside>
  );
}
