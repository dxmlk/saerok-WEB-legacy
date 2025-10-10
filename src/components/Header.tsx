import NavBar from "@/components/NavBar";
import AppInstallButton from "./AppInstallButton";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  scale?: number;
}

const Header = ({ scale = 1 }: HeaderProps) => {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate(`/`);
  };
  return (
    <header
      className="w-full h-113 px-120 bg-background-white relative z-10 "
      style={{
        height: `${113 * scale}px`,
        paddingLeft: `${120 * scale}px`,
        paddingRight: `${120 * scale}px`,
      }}
    >
      {/* 헤더 상단 */}
      <div className="flex flex-row justify-between">
        <div
          className="flex flex-row items-center gap-5 h-67 cursor-pointer"
          style={{
            height: `${67 * scale}px`,
            gap: `${5 * scale}px`,
          }}
          onClick={handleClickLogo}
        >
          <img src="src/assets/icons/logo.svg" alt="saerok-logo" />
          <img src="src/assets/icons/typo.svg" alt="saerok-typo" />
        </div>
        <AppInstallButton scale={scale} />
      </div>
      {/* 헤더 하단 */}
      <NavBar scale={scale} />
    </header>
  );
};

export default Header;
