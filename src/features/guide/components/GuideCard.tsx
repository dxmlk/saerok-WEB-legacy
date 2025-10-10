import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

interface GuideCardProps {
  imgSrc?: string;
  children: React.ReactNode;
  moveTo?: string;
  scale?: number;
}

const GuideCard = ({ imgSrc, children, moveTo, scale = 1 }: GuideCardProps) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.set(cardRef.current, {
      scale: 1,
      transformOrigin: "center center",
      willChange: "transform",
    });
  }, []);

  const handleEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { scale: 1.04, duration: 0.28, ease: "power2.out" });
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { scale: 1, duration: 0.28, ease: "power2.out" });
  };

  const handleClick = () => {
    navigate(`/${moveTo}`);
  };

  return (
    <div
      ref={cardRef}
      className="relative border-none flex-shrink-0 cursor-pointer"
      style={{
        borderRadius: `${30 * scale}pxx`,
        width: `${367 * scale}px`,
        height: `${592 * scale}px`,
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <img src={imgSrc} className="inset-0 object-cover" />
      <div
        className="absolute left-1/2 -translate-x-[50%]"
        style={{
          top: `${32 * scale}px`,
        }}
      >
        {children}
      </div>
      <button
        onClick={handleClick}
        className="absolute"
        style={{
          bottom: `${15 * scale}px`,
          right: `${16 * scale}px`,
          height: `${59 * scale}px`,
          width: `${59 * scale}px`,
        }}
      >
        <img
          src="/src/assets/icons/guide-button.svg"
          alt="Button"
          className="w-full h-full"
        />
      </button>
    </div>
  );
};

export default GuideCard;
