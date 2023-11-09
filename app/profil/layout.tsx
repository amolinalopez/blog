"use client";
import { jost } from "@/utils/fonts";
import { Suspense } from "react";
import Loading from "../loading";
import LeftSidebar from "@/components/leftSidebar";
import NavbarTop from "@/components/navbarTop";
import NavbarBottom from "@/components/navbarBottom";

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
      <NavbarBottom />
    </Suspense>
  );
}
