import { jost } from "@/utils/fonts";
import { Suspense } from "react";
import Loading from "../loading";
import LeftSidebar from "@/components/leftSidebar";
import RightSidebar from "@/components/rightSidebar";

export default function GrimoireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <div className={jost.className}>{children}</div>
    </Suspense>
  );
}
