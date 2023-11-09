"use client";
import { jost } from "@/utils/fonts";
import { Suspense } from "react";
import Loading from "../loading";
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
    <Suspense fallback={<Loading />}>
      <NavbarTop />
      <LeftSidebar />
      <div className={jost.className}>{children}</div>
      <RightSidebar />
      <NavbarBottom />
    </Suspense>
  );
}
