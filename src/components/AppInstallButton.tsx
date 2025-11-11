import logoWhite from "@/assets/icons/app-logo-white.svg?url";
import logo from "@/assets/icons/app-logo.svg?url";

interface AppInstallButtonProps {
  scale?: number;
  isFooter?: boolean;
}
const AppInstallButton = ({
  scale = 1,
  isFooter = false,
}: AppInstallButtonProps) => {
  return (
    <div
      className="flex flex-row items-center gap-7"
      style={{
        gap: `${7 * scale}px`,
      }}
    >
      <img
        src={isFooter ? logoWhite : logo}
        alt="saerok-app-logo"
        style={{ height: `${22 * scale}px`, width: `${22 * scale}px` }}
      />
      <a
        href="https://apps.apple.com/kr/app/%EC%83%88%EB%A1%9D-%EC%9D%BC%EC%83%81-%EC%86%8D%EC%9D%98-%ED%83%90%EC%A1%B0-%EC%9D%BC%EC%A7%80/id6744866662"
        className={`text-body-1 ${
          isFooter ? "font-400 text-background-white" : "font-700 text-mainBlue"
        } `}
        style={{
          fontSize: `${15 * scale}px`,
          lineHeight: `${18 * scale}px`,
        }}
      >
        새록 앱 설치
      </a>
    </div>
  );
};
export default AppInstallButton;
