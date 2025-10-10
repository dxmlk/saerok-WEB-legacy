interface GuideBlockProps {
  imgSrc?: string;
  title?: string;
  description?: string;
  scale?: number;
}

const GuideBlock = ({
  imgSrc,
  title,
  description,
  scale = 1,
}: GuideBlockProps) => {
  return (
    <div
      className="w-full h-155 border-none rounded-20 bg-background-white py-25 pl-28 flex flex-row gap-25"
      style={{
        height: `${155 * scale}px`,
        borderRadius: `${20 * scale}px`,
        paddingTop: `${25 * scale}px`,
        paddingBottom: `${25 * scale}px`,
        paddingLeft: `${28 * scale}px`,
        gap: `${25 * scale}px`,
      }}
    >
      <img
        src={imgSrc}
        alt="etiquette"
        className="w-105 h-105 border-none rounded-20"
        style={{
          width: `${105 * scale}px`,
          height: `${105 * scale}px`,
          borderRadius: `${20 * scale}px`,
        }}
      />
      <div
        className="flex flex-col items-start gap-4"
        style={{ gap: `${4 * scale}px` }}
      >
        <span
          className="font-700 text-black text-30"
          style={{ fontSize: `${30 * scale}px` }}
        >
          {title}
        </span>
        <span
          className="font-400 text-font-darkGray text-20 "
          style={{
            fontSize: `${20 * scale}px`,
            lineHeight: `${25 * scale}px`,
            letterSpacing: `${-1 * scale}px`,
          }}
        >
          {description}
        </span>
      </div>
    </div>
  );
};

export default GuideBlock;
