"use client";
import Image from "next/image";
import bo_logo_icon from "../public/Logo_BO_Icon.svg";
import icon_notif from "../public/icon_notification.svg";
import icon_hamburger_menu from "../public/icon_hamburger_menu.svg";
import styles from "../app/styles/navbarTop.module.css";
import LogoutBtn from "./LogoutBtn";
import { useRef, useEffect, useState } from "react";
import closeIcon from "../public/icon_cross.svg";
import iconSettings from "../public/icon_settings.svg";
import iconSaved from "../public/icon_saved.svg";
import iconCommunity from "../public/icon_community.svg";
import iconDelete from "../public/icon_delete_account.svg";
import Link from "next/link";
import ConfirmDeleteModal from "./userComponents/deleteModal";

export default function NavbarTop() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const sideMenuRef = useRef<HTMLDivElement | null>(null);
  const menuItems = [
    { icon: iconSettings, label: "Settings", link: "/comingSoon" },
    { icon: iconSaved, label: "Saved", link: "/comingSoon" },
    { icon: iconCommunity, label: "Community rules", link: "/comingSoon" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.navbarTopWrapper}>
      <nav className={styles.container}>
        <a href="/grimoire" className={styles.logoContainer}>
          <Image
            src={bo_logo_icon}
            width={30}
            height={40}
            alt="icon logo of burned ones"
            priority
          />
        </a>
        <div className={styles.iconsContainer}>
          <a href="/grimoire" className={styles.bellIcon}>
            <Image
              src={icon_notif}
              width={22}
              height={27}
              alt="icon notifications"
            />
          </a>
          <div
            className={styles.menuIcon}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <Image
              src={icon_hamburger_menu}
              width={22}
              height={27}
              alt="icon menu hamburger"
            />
          </div>
          <div
            className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ""}`}
            ref={sideMenuRef}
          >
            <div
              className={styles.closeIcon}
              onClick={() => setMenuOpen(false)}
            >
              <Image src={closeIcon} alt="Close menu" width={30} height={30} />
            </div>
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className={styles.menuItem}>
                  <Link href={item.link}>
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={30}
                      height={30}
                      className={styles.menuIcon}
                    />
                    <span className={styles.iconText}>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li key="deleteMyAccount" className={styles.menuItem}>
                <Image
                  src={iconDelete}
                  alt="Delete my account"
                  width={30}
                  height={30}
                  className={styles.menuIcon}
                />
                <span className={styles.iconText} onClick={handleOpenModal}>
                  Delete my account
                </span>
              </li>

              <li>
                <LogoutBtn />
              </li>
            </ul>{" "}
            <ConfirmDeleteModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
