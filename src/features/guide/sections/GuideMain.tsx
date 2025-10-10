import GuideCard from "@/features/guide/components/GuideCard";
import DuckBlueSrc from "@/assets/images/duck-rectangle/duck-blue.png";
import DuckPinkSrc from "@/assets/images/duck-rectangle/duck-pink.png";
import DuckPurpleSrc from "@/assets/images/duck-rectangle/duck-purple.png";

interface GuideMainProps {
  scale?: number;
}

const GuideMain = ({ scale = 1 }: GuideMainProps) => {
  return (
    <div
      className="flex flex-row w-full h-full"
      style={{
        paddingLeft: `${120 * scale}px`,
        paddingRight: `${120 * scale}px`,
        paddingTop: `${104 * scale}px`,
        paddingBottom: `${109 * scale}px`,
        gap: `${50 * scale}px`,
      }}
    >
      <GuideCard imgSrc={DuckBlueSrc}>
        <div
          className="text-background-white text-center"
          style={{
            fontSize: `${30 * scale}px`,
            lineHeight: `${28 * scale}px`,
            letterSpacing: `${-1.5 * scale}px`,
          }}
        >
          <span className="font-700">탐조 에티켓</span>
          <span className="font-400 ">
            을 <br />
            가르쳐드릴개요.
          </span>
        </div>
      </GuideCard>
      <GuideCard imgSrc={DuckPinkSrc}>
        <div
          className="text-background-white text-center"
          style={{
            fontSize: `${30 * scale}px`,
            lineHeight: `${28 * scale}px`,
            letterSpacing: `${-1.5 * scale}px`,
          }}
        >
          <span className="font-700">탐조 방법</span>
          <span className="font-400 ">
            이 <br />
            궁금하새요?
          </span>
        </div>
      </GuideCard>
      <GuideCard imgSrc={DuckPurpleSrc}>
        <div
          className="text-background-white text-center"
          style={{
            fontSize: `${30 * scale}px`,
            lineHeight: `${28 * scale}px`,
            letterSpacing: `${-1.5 * scale}px`,
          }}
        >
          <span className="font-700">탐조 팁</span>
          <span className="font-400 ">
            에는 <br />
            어떤 게 있을꽈여.
          </span>
        </div>
      </GuideCard>
    </div>
  );
};

export default GuideMain;
