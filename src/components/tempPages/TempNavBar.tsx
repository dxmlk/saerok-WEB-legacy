import NavButton from "./TempNavButton";

const NAV_ITEMS = [
  { id: "home", label: "HOME" },
  { id: "saerok", label: "새록 둘러보기" },
  { id: "guide", label: "탐조 가이드" },
  { id: "dictionary", label: "탐조 단어사전" },
  { id: "about", label: "ABOUT 새록" },
];

interface NavBarProps {
  scale?: number;
  /** 임시 페이지에서는 그냥 기본 active만 주고 클릭해도 아무 일 안 하게 */
  disableNavigation?: boolean;
  /** 라우터 없을 때 강제로 활성 탭 지정하고 싶으면 이걸로 */
  activeId?: string;
}

const NavBar = ({
  scale = 1,
  disableNavigation = true,
  activeId = "home",
}: NavBarProps) => {
  const handleClick = (id: string) => {
    if (disableNavigation) return;
  };

  return (
    <nav
      className="w-full bg-transparent h-60"
      style={{ height: `${60 * scale}px` }}
    >
      {/* 한 줄에서 양 끝으로 배치 */}
      <div className="w-full h-full flex items-start justify-between">
        {/* 왼쪽: 겹치는 네비들 */}
        <ul className="flex h-full flex-row items-start -space-x-20 flex-none">
          {NAV_ITEMS.slice(0, NAV_ITEMS.length - 1).map((item, index) => (
            <NavButton
              key={item.id}
              label={item.label}
              active={activeId === item.id}
              onClick={() => handleClick(item.id)}
              zIndex={NAV_ITEMS.length - index}
              className="-space-x-20"
              scale={scale}
            />
          ))}
        </ul>

        {/* 오른쪽: ABOUT */}
        <ul className="flex-none">
          <NavButton
            label="ABOUT 새록"
            active={activeId === "about"}
            onClick={() => handleClick("about")}
            zIndex={NAV_ITEMS.length}
            className="space-x-20"
            isAbout={true}
            scale={scale}
          />
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
