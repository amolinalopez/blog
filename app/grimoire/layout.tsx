import NavbarBottom from "@/components/navbarBottom";
import NavbarTop from "@/components/navbarTop";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: ["300", "400"] });

export default function GrimoireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={jost.className}>
      <NavbarTop />
      {children}
      <NavbarBottom />
    </div>
  );
}
