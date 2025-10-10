// 지금 안 씀... 걍 SaerokCarousel에 몰아뒀음 근데 나중에 더 공부해보고 따로 훅으로 뺄지도

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface HorizontalSliderOptions {
  /** 활성 기준선 비율(컨테이너 너비의 %) — 기본 0.32 */
  anchorPercent?: number;
  /** 한 슬라이드당 스크롤 거리(%) — 느리게: 150~250 권장, 기본 150 */
  speedPerSlidePercent?: number;
  /** 스크럽(관성) — true/false 또는 0.2~1.0 숫자, 기본 0.6 */
  scrub?: boolean | number;
  /** 초기 활성 인덱스(기본 1 = 두 번째) */
  initialIndex?: number;
  /** 디버그 마커 — 기본 false */
  markers?: boolean;
}

export function useHorizontalSlider(options?: HorizontalSliderOptions) {
  const {
    anchorPercent = 0.32,
    speedPerSlidePercent = 150,
    scrub = 0.6,
    initialIndex: initialIndexProp = 1,
    markers = false,
  } = options || {};

  const sectionRef = useRef<HTMLDivElement>(null); // .slider-section
  const trackRef = useRef<HTMLDivElement>(null); // .slides-track
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const slides = Array.from(track.querySelectorAll<HTMLElement>(".slide"));
      if (slides.length === 0) return;

      const build = () => {
        // 0) 기존 인스턴스 완전 정리 (React StrictMode 안전)
        tweenRef.current?.scrollTrigger?.kill();
        tweenRef.current?.kill();
        tweenRef.current = null;

        // 1) 과거 인라인 transform/opacity 흔적 제거 (경고 방지)
        gsap.set(slides, { clearProps: "transform,opacity" });

        // 2) 측정
        const containerW = section.clientWidth;
        const anchorX = containerW * anchorPercent;

        const centers = slides.map((el) => el.offsetLeft + el.offsetWidth / 2);
        const totalW = track.scrollWidth;
        const maxTranslate = Math.max(0, totalW - containerW);

        const initialIndex = Math.min(
          Math.max(0, initialIndexProp),
          slides.length - 1
        );

        const clamp = (v: number, a: number, b: number) =>
          Math.max(a, Math.min(b, v));
        const alignX = (i: number) =>
          clamp(centers[i] - anchorX, 0, maxTranslate);

        // 시작 x: 초기 활성 슬라이드의 센터를 기준선(anchor)에 정렬
        const initialX = alignX(initialIndex);

        // 3) range(이동 가능한 거리) — 0 나눗셈 방지를 위해 최소 1
        const range = Math.max(1, maxTranslate - initialX);

        // 4) 스냅 포인트(progress 0..1)
        const snapPoints = centers.map((c) => {
          const wantX = clamp(c - anchorX, initialX, maxTranslate);
          return (wantX - initialX) / range; // 0..1
        });

        // 5) 초기 클래스 상태
        slides.forEach((el, i) => {
          el.classList.toggle("is-active", i === initialIndex);
        });

        let active = initialIndex;

        // 6) 트랙 이동 트윈
        const tween = gsap.fromTo(
          track,
          { x: -initialX },
          {
            x: -maxTranslate,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end:
                "+=" +
                speedPerSlidePercent * Math.max(1, slides.length - 1) +
                "%",
              pin: true,
              scrub,
              markers, // 필요 시 true
              snap: {
                snapTo: (v) => gsap.utils.snap(snapPoints, v),
                duration: 0.25,
                ease: "power1.out",
              },
              onUpdate: () => {
                // 실제 transform 기준으로 활성 후보 찾기
                const tx = Number(gsap.getProperty(track, "x")) || 0; // 음수
                const currentX = -tx; // 양수

                let best = active;
                let bestDist = Infinity;
                for (let i = 0; i < slides.length; i++) {
                  const dist = Math.abs(centers[i] - currentX - anchorX);
                  if (dist < bestDist) {
                    bestDist = dist;
                    best = i;
                  }
                }

                if (best !== active) {
                  slides[active]?.classList.remove("is-active");
                  slides[best]?.classList.add("is-active");
                  active = best;
                }
              },
            },
          }
        );

        tweenRef.current = tween;

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          if (tweenRef.current === tween) tweenRef.current = null;
        };
      };

      // 최초 세팅
      let cleanup = build();

      // 이미지 로딩/리사이즈 시 재빌드
      const onLoad = () => {
        cleanup?.();
        ScrollTrigger.refresh();
        cleanup = build();
      };
      const onResize = () => {
        cleanup?.();
        ScrollTrigger.refresh();
        cleanup = build();
      };

      window.addEventListener("load", onLoad);
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("load", onLoad);
        window.removeEventListener("resize", onResize);
        cleanup?.();
        tweenRef.current?.scrollTrigger?.kill();
        tweenRef.current?.kill();
        tweenRef.current = null;
      };
    },
    { scope: sectionRef }
  );

  return { sectionRef, trackRef };
}
