import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { CollectionItem } from "@/mock/CollectionType";
import NicknameBadge from "./NicknameBadge";
import { ReactComponent as LocationIcon } from "@/assets/icons/location.svg";
import { ReactComponent as DateIcon } from "@/assets/icons/date.svg";
import { useNavigate } from "react-router-dom";

interface SaerokListCardProps {
  scale?: number;
  item: CollectionItem;
}

const SaerokListCard = ({ scale = 1, item }: SaerokListCardProps) => {
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapRef.current || !innerRef.current) return;

    const wrap = wrapRef.current as HTMLDivElement;
    const inner = innerRef.current as HTMLDivElement;

    const ctx = gsap.context(() => {
      gsap.set(wrap, { perspective: 1000 });
      gsap.set(inner, {
        transformStyle: "preserve-3d",
        rotateY: 0,
        willChange: "transform",
      });

      wrap.querySelectorAll<HTMLElement>(".face").forEach((el) => {
        gsap.set(el, { backfaceVisibility: "hidden" });
      });

      const front = wrap.querySelector<HTMLElement>(".face.front");
      if (front) gsap.set(front, { z: 0.1 });

      const back = wrap.querySelector<HTMLElement>(".face.back");
      if (back) gsap.set(back, { rotateY: 180 });
    }, wrap);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    const el = innerRef.current;
    if (!el) return;
    gsap.to(el, { rotateY: 180, duration: 0.5, ease: "power2.out" });
  };

  const handleLeave = () => {
    const el = innerRef.current;
    if (!el) return;
    gsap.to(el, { rotateY: 0, duration: 0.5, ease: "power2.out" });
  };

  const handleClick = () => {
    navigate(`/saerok/detail`);
  };

  return (
    <div
      ref={wrapRef}
      className="group relative w-full h-auto overflow-visible break-inside-avoid z-20"
      style={{
        borderRadius: `${20 * scale}px`,
        marginBottom: `${20 * scale}px`,
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      {/* 투명 레이어, 높이 결정용 */}
      <img
        src={item.imageUrl}
        alt=""
        className="block w-full h-auto opacity-0 pointer-events-none select-none "
        draggable={false}
        aria-hidden
      />
      <div ref={innerRef} className="absolute inset-0">
        {/* 앞면 */}
        <div
          className="face front absolute inset-0 overflow-hidden"
          style={{
            borderRadius: `${20 * scale}px`,
          }}
        >
          <img
            src={item.imageUrl}
            alt={item.bird.koreanName}
            className=" w-full h-auto object-cover select-none"
            draggable={false}
          />
          <NicknameBadge user={item.user} />
        </div>
        {/* 뒷면 */}
        <div
          className="face back absolute inset-0 overflow-hidden"
          style={{
            borderRadius: `${20 * scale}px`,
          }}
        >
          <img
            src={item.imageUrl}
            alt={item.bird.koreanName}
            className=" w-full h-auto object-cover select-none"
            draggable={false}
          />
          <NicknameBadge user={item.user} />
          <div className="absolute inset-0 bg-blackLayer z-20" />
          <div
            className="absolute z-20 flex flex-col font-400 text-background-lightWhitegray"
            style={{
              paddingLeft: `${17 * scale}px`,
              paddingRight: `${17 * scale}px`,
              bottom: `${21.5 * scale}px`,
              gap: `${5 * scale}px`,
              fontSize: `${21 * scale}px`,
              lineHeight: `${24 * scale}px`,
            }}
          >
            <div
              className="flex flex-row items-start justify-start "
              style={{
                gap: `${15 * scale}px`,
              }}
            >
              <LocationIcon style={{ width: `${24 * scale}px` }} />
              <div
                className="flex flex-col justify-start"
                style={{
                  gap: `${2 * scale}px`,
                }}
              >
                {/* 이거 아직 제대로 못함 truncate 설정 */}
                <span className="truncate w-full block">
                  {item.locationAlias}
                </span>
                <span
                  className="truncate w-full block text-font-gray"
                  style={{
                    fontSize: `${17 * scale}px`,
                  }}
                >
                  {item.address}
                </span>
              </div>
            </div>
            <div
              className="flex flex-row items-start justify-start"
              style={{
                gap: `${15 * scale}px`,
              }}
            >
              <DateIcon style={{ width: `${24 * scale}px` }} />
              <div
                className="flex flex-col justify-start"
                style={{
                  gap: `${2 * scale}px`,
                }}
              >
                {/* date 표시 형식 정리 필요 */}
                <span className="truncate">{item.discoveredDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaerokListCard;
