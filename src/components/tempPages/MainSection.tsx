interface MainSectionProps {
  isMobile?: boolean;
  scale?: number;
}

const MainSection = ({ isMobile, scale = 1 }: MainSectionProps) => {
  return (
    <main
      className="w-full bg-mainBlue flex justify-center items-center "
      style={{
        height: `${1138 * scale}px`,
      }}
    >
      <img src="/src/assets/images/main.svg" />
      <></>
    </main>
  );
};

export default MainSection;
