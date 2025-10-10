import React from "react";
import { ReactComponent as ActiveBg } from "@/assets/nav/active.svg"; // 활성화된 상태 배경 SVG
import { ReactComponent as InactiveBg } from "@/assets/nav/inactive.svg"; // 비활성화된 상태 배경 SVG

type NavButtonProps = {
  label: string; // 버튼에 표시될 텍스트
  active?: boolean; // 버튼의 활성 상태 (기본값: false)
  onClick?: () => void; // 클릭 시 실행될 함수
  zIndex?: number;
  className?: string;
  isAbout?: boolean;
  scale?: number;
};

const NavButton: React.FC<NavButtonProps> = ({
  label,
  active = false,
  onClick,
  zIndex = 1,
  className = "",
  isAbout = false,
  scale = 1,
}) => {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`relative w-218 h-60 flex items-center justify-center select-none outline-none ${className} `}
      style={{ zIndex, width: `${218 * scale}px`, height: `${60 * scale}px` }}
    >
      {active ? (
        <ActiveBg
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full ${
            isAbout ? "transform scale-x-[-1]" : ""
          }`}
        />
      ) : (
        <InactiveBg
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full ${
            isAbout ? "transform scale-x-[-1]" : ""
          }`}
        />
      )}

      <span
        className={`z-10  text-body-1  ${
          active
            ? "text-background-white font-700 "
            : "text-font-darkGrayfont-400 "
        }`}
        style={{
          fontSize: `${15 * scale}px`,
          lineHeight: `${18 * scale}px`,
        }}
      >
        {label}
      </span>
    </button>
  );
};

export default NavButton;
