import RoundButton from "@/components/RoundButton";
import GuideBlock from "../components/GuideBlock";
import duckBlue from "@/assets/images/duck-square/duck-blue.png";
import duckPink from "@/assets/images/duck-square/duck-pink.png";
import duckPurple from "@/assets/images/duck-square/duck-purple.png";

interface GuideCTAProps {
  scale?: number;
}

const GuideCTA = ({ scale = 1 }: GuideCTAProps) => {
  return (
    <main
      className="relative w-full h-662 pt-111 bg-background-lightWhitegray"
      style={{
        height: `${662 * scale}px`,
        paddingTop: `${111 * scale}px`,
      }}
    >
      {/* 왼쪽 섹션 */}
      <section className="absolute left-0 pl-120 flex flex-col">
        <span
          className="text-mainBlue font-700"
          style={{
            fontSize: `${50 * scale}px`,
            lineHeight: `${50 * scale}px`,
            letterSpacing: `${-4 * scale}px`,
          }}
        >
          탐조가 처음이세요?
        </span>
        <div
          className="flex flex-col text-font-black font-400 gap-0 mt-20 mb-50"
          style={{
            gap: `${0 * scale}px`,
            marginTop: `${20 * scale}px`,
            marginBottom: `${50 * scale}px`,
            fontSize: `${20 * scale}px`,
            lineHeight: `${25 * scale}px`,
            letterSpacing: `${-1 * scale}px`,
          }}
        >
          <span>탐조 방법부터 주의사항까지,</span>
          <span>새록이 자세하게 알려드릴게요!</span>
        </div>
        <div
          className="flex flex-row gap-15 items-center justify-start"
          style={{
            gap: `${15 * scale}px`,
          }}
        >
          <RoundButton text="탐조 가이드" moveTo="guide" scale={scale} />
          <RoundButton text="탐조 단어사전" moveTo="dictionary" scale={scale} />
        </div>
      </section>
      {/* 오른쪽 섹션 */}
      <section
        className="absolute -right-98 w-955 flex flex-col gap-20"
        style={{
          right: `${-98 * scale}px`,
          width: `${955 * scale}px`,
          gap: `${20 * scale}px`,
        }}
      >
        <GuideBlock
          imgSrc={duckBlue}
          title="탐조 에티켓"
          description="탐조할 때 지켜야 할 에티켓에 대해 알아보아요."
          scale={scale}
        />
        <GuideBlock
          imgSrc={duckPink}
          title="탐조 장비"
          description="탐조할 때 들고다닐 장비에는 무엇이 있나요?"
          scale={scale}
        />
        <GuideBlock
          imgSrc={duckPurple}
          title="팁"
          description="그 외 도움이 되는 팁들을 알려드릴게요."
          scale={scale}
        />
      </section>
    </main>
  );
};
export default GuideCTA;
