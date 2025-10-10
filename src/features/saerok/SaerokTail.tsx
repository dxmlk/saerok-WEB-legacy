interface ExploreTailProps {
  scale?: number;
}

const ExploreTail = ({ scale = 1 }: ExploreTailProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        marginTop: `${183 * scale}px`,
        marginBottom: `${191 * scale}px`,
      }}
    >
      <span
        className="text-mainBlue font-400"
        style={{
          fontSize: `${50 * scale}px`,
          lineHeight: `${50 * scale}px`,
          letterSpacing: `${-4 * scale}px`,
          marginBottom: `${37 * scale}px`,
        }}
      >
        새록과 함께하세요
      </span>
      <img
        src="/src/assets/images/qr-code.png"
        alt="QR Code"
        style={{
          marginBottom: `${9 * scale}px`,
        }}
      />
      <img
        src="src/assets/images/appstore.png"
        alt="Available on the App Store"
      />
    </div>
  );
};

export default ExploreTail;
