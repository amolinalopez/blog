import { Amarante, Jost, Tulpen_One, Caveat } from "next/font/google";
import localFont from "next/font/local";

export const lucioleRegular = localFont({
  src: "../fonts/Luciole-Regular.ttf",
});
export const lucioleBold = localFont({ src: "../fonts/Luciole-Bold.ttf" });
export const amarante = Amarante({ subsets: ["latin"], weight: "400" });
export const jost = Jost({ subsets: ["latin"], weight: "300" });
export const spellweaver = localFont({ src: "../fonts/Spellweaver_Nodes.otf" });
export const tulpenOne = Tulpen_One({ subsets: ["latin"], weight: "400" });
export const caveat = Caveat({ subsets: ["latin"], weight: "400" });
