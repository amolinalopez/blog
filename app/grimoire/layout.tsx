"use client";
import { jost } from "@/utils/fonts";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import NavbarBottom from "@/components/NavbarBottom";
import NavbarTop from "@/components/NavbarTop";

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
