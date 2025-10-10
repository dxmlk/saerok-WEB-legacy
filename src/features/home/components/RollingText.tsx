import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface RollingTextProps {
  startAnimation?: boolean;
  values: string[]; // 8개 텍스트
  startIndex: number; // 랜덤 시작점
  scale: number;
}

const RollingText: React.FC<RollingTextProps> = ({
  startAnimation = false,
  values,
  startIndex,
  scale = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 50 * scale; // 각 아이템 높이
  const fontSize = 50 * scale; // 폰트 크기
  let currentY = 0;

  useEffect(() => {
    if (!startAnimation || !containerRef.current) return;

    const totalItems = values.length;
    let speed = 40; // 초기 빠른 속도

    const interval = setInterval(() => {
      currentY += itemHeight;
      if (currentY > itemHeight * (totalItems - 1)) currentY = 0;

      gsap.to(containerRef.current, {
        y: -currentY,
        duration: speed / 1000,
        ease: "none",
      });

      speed = Math.min(speed + 4, 80); // 점점 느려지도록 감속
    }, speed);

    // 0.6초 후 멈춤: 마지막 텍스트 고정
    const stopTimer = setTimeout(() => {
      clearInterval(interval);
      gsap.to(containerRef.current, {
        y: -itemHeight * (totalItems - 1), // 마지막 텍스트 위치
        duration: 0.3,
        ease: "power2.out",
      });
    }, 600);

    return () => {
      clearInterval(interval);
      clearTimeout(stopTimer);
    };
  }, [startAnimation, values, startIndex]);

  // startIndex 기준으로 8개만 순회
  const visibleValues = Array.from(
    { length: 8 },
    (_, i) => values[(startIndex + i) % values.length]
  );

  return (
    <div
      style={{
        width: "100px",
        height: `${itemHeight}px`,
        overflow: "hidden",
        display: "inline-block",
        verticalAlign: "middle",
      }}
    >
      <div ref={containerRef}>
        {visibleValues.map((value, idx) => (
          <div
            key={idx}
            className="text-center rolling-item"
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
              fontSize: `${fontSize}px`,
              fontWeight: 700,
              letterSpacing: "-0.08em",
              color: "black",
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollingText;
