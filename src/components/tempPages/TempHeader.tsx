import saerokLogo from "@/assets/icons/logo.svg?url";
import saerokTypo from "@/assets/icons/typo.svg?url";
import AppInstallButton from "../AppInstallButton";
import NavBar from "./TempNavBar";

interface HeaderProps {
  scale?: number;
  // 임시로 쓸 때는 이 플래그로 클릭 막을 수도 있음
  disableNavigation?: boolean;
}

const Header = ({ scale = 1, disableNavigation = true }: HeaderProps) => {
  // 임시 페이지니까 클릭해도 아무 일 안 하게
  const handleClickLogo = () => {
    if (disableNavigation) return;
    // 여기 원래 navigate("/") 있었음
  };

  return (
    <header
      className="w-full h-113 px-120 bg-background-white relative z-10"
      style={{
        height: `${113 * scale}px`,
        paddingLeft: `${120 * scale}px`,
        paddingRight: `${120 * scale}px`,
      }}
    >
      {/* 헤더 상단 */}
      <div className="flex flex-row justify-between">
        <div
          className="flex flex-row items-center gap-5 h-67"
          style={{
            height: `${67 * scale}px`,
            gap: `${5 * scale}px`,
          }}
          onClick={handleClickLogo}
        >
          <img src={saerokLogo} alt="saerok-logo" />
          <img src={saerokTypo} alt="saerok-typo" />
        </div>
        <AppInstallButton scale={scale} />
      </div>
      {/* 헤더 하단 */}
      <NavBar scale={scale} />
    </header>
  );
};

export default Header;
