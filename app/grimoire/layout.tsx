import { jost } from "@/utils/fonts";

export default function GrimoireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={jost.className}>
      {children}
    </div>
  );
}
