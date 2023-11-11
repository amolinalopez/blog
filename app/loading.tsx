import logo_bo_icon from "@/public/Logo_BO_Icon.svg";
import Image from "next/image";

export default function Loading() {
  return (
    <div id="loading_page">
      <div className="content-wrapper">
        <div className="loading-container">
          <Image
            src={logo_bo_icon}
            alt="Logo"
            width={300}
            height={300}
            className="logo-path"
            priority
          />
        </div>
        <h1 className="loading-text">Chargement...</h1>
      </div>
    </div>
  );
}
