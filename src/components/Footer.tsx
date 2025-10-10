import AppInstallButton from "./AppInstallButton";

interface FooterProps {
  scale?: number;
}

const Footer = ({ scale = 1 }: FooterProps) => {
  return (
    <footer
      className="w-full bg-font-gray px-120 py-46 flex flex-col justify-start text-background-white text-body-1 font-400 "
      style={{
        height: `${263 * scale}px`,
        paddingTop: `${46 * scale}px`,
        paddingBottom: `${46 * scale}px`,
        paddingLeft: `${120 * scale}px`,
        paddingRight: `${120 * scale}px`,
        fontSize: `${15 * scale}px`,
        lineHeight: `${18 * scale}px`,
      }}
    >
      <AppInstallButton scale={scale} isFooter={true} />
      <span
        className="mt-36 mb-13 text-body-1 font-700 "
        style={{
          fontSize: `${15 * scale}px`,
          lineHeight: `${18 * scale}px`,
          marginTop: `${36 * scale}px`,
          marginBottom: `${13 * scale}px`,
        }}
      >
        (TEAM) 어푸
      </span>
      <div
        className="flex flex-row justify-between items-center mb-49"
        style={{
          marginBottom: `${49 * scale}px`,
        }}
      >
        <div
          className="flex flex-row justify-start gap-27"
          style={{
            gap: `${27 * scale}px`,
          }}
        >
          <span>의견 보내기</span>
          <span>개인정보처리방침</span>
        </div>
        <div
          className="flex flex-row justify-end gap-27"
          style={{
            gap: `${27 * scale}px`,
          }}
        >
          <span>의견 보내기</span>
          <span>개인정보처리방침</span>
        </div>
      </div>
      <span>Copyright</span>
    </footer>
  );
};
export default Footer;
