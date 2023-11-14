"use client";
import { jost } from "@/utils/fonts";
import LeftSidebar from "@/components/LeftSidebar";
import NavbarTop from "@/components/NavbarTop";
import NavbarBottom from "@/components/NavbarBottom";

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
