import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RollingText from "../components/RollingText";
import RoundButton from "@/components/RoundButton";
import SaerokCarousel from "../components/SaerokCarousel";
import REGION from "@/constants/region";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SaerokPreivewProps {
  scale?: number;
}

const SaerokPreview = ({ scale = 1 }: SaerokPreivewProps) => {
  const [startRolling, setStartRolling] = useState(false);
  const [startIndex] = useState(Math.floor(Math.random() * REGION.length));

  useEffect(() => {
    setStartRolling(true);
  }, []);

  return (
    <main
      className="w-full bg-background-white slider-section overflow-x-hidden"
      style={{
        minHeight: `${window.innerHeight}px`,
      }}
    >
      <header
        className="px-120 text-mainBlue font-400 tracking-[-4px]"
        style={{
          fontSize: `${50 * scale}px`,
          lineHeight: `${50 * scale}px`,
          paddingTop: `${107 * scale}px`,
        }}
      >
        <div className="flex flex-row items-center">
          <span>요즘 [</span>
          <RollingText
            startAnimation={startRolling}
            values={REGION}
            startIndex={startIndex}
            scale={scale}
          />
          <span>]에는</span>
        </div>
        <span>이런 새가 많이 보이네요.</span>
      </header>

      <div
        className="px-120 mt-65 mb-25"
        style={{
          marginTop: `${65 * scale}px`,
          marginBottom: `${25 * scale}px`,
        }}
      >
        <RoundButton text="새록 더 보러가기" moveTo="explore" scale={scale} />
      </div>

      <div
        className="mb-87"
        style={{
          marginBottom: `${87 * scale}px`,
        }}
      >
        <SaerokCarousel scale={scale} />
      </div>
    </main>
  );
};

export default SaerokPreview;
