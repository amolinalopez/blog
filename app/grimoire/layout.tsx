"use client";
import { jost } from "@/utils/fonts";
import LeftSidebar from "@/components/leftSidebar";
import RightSidebar from "@/components/rightSidebar";
import NavbarBottom from "@/components/navbarBottom";
import NavbarTop from "@/components/navbarTop";

export default function GrimoireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarTop />
      <LeftSidebar />
      <div className={jost.className}>{children}</div>
      <RightSidebar />
      <NavbarBottom />
    </div>
  );
}
