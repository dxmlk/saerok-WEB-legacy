import RoundButton from "@/components/RoundButton";

interface IntroSectionProps {
  mainText?: string;
  subText?: string;
  isWhite?: boolean;
  scale?: number;
}

const IntroSection = ({
  mainText,
  subText,
  isWhite,
  scale = 1,
}: IntroSectionProps) => {
  return (
    <div
      className={`w-full ${
        isWhite ? "bg-background-white" : "bg-mainBlueGrad"
      } text-mainBlue flex flex-col gap-0`}
      style={{
        height: `${385 * scale}px`,
        paddingLeft: `${120 * scale}px`,
        paddingRight: `${120 * scale}px`,
        paddingTop: `${88 * scale}px`,
      }}
    >
      <span
        className="font-700"
        style={{
          fontSize: `${50 * scale}px`,
          lineHeight: `${50 * scale}px`,
          letterSpacing: `${-4 * scale}px`,
          marginBottom: `${16 * scale}px`,
        }}
      >
        {mainText}
      </span>
      <span
        className=" font-400 "
        style={{
          fontSize: `${20 * scale}px`,
          lineHeight: `${25 * scale}px`,
          letterSpacing: `${-1 * scale}px`,
          marginBottom: `${42 * scale}px`,
        }}
      >
        {subText}
      </span>
      <div
        className="flex flex-row items-end justify-start"
        style={{
          height: `${91 * scale}px`,
          gap: `${16 * scale}px`,
        }}
      >
        <img
          src="/src/assets/images/qr-code.png"
          alt="QR Code"
          className="h-full"
        />
        {/* 이거 moveTo 수정해야 됨 */}
        <RoundButton text="앱 다운 받기" moveTo="home" scale={scale} />
      </div>
    </div>
  );
};
export default IntroSection;
