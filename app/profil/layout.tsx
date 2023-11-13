"use client";
import { jost } from "@/utils/fonts";
import LeftSidebar from "@/components/leftSidebar";
import NavbarTop from "@/components/navbarTop";
import NavbarBottom from "@/components/navbarBottom";

export default function GrimoireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <LeftSidebar />
      <NavbarTop />
      <div className={jost.className}>{children}</div>
      <NavbarBottom />
    </div>
  );
}
