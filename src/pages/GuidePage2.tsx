import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import bgImage from "../assets/images/binoculars-sight.png";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const GuidePage = () => {
  // 기존 슬라이더용 ref들
  const t = useRef<gsap.core.Tween | null>(null);
  const factor = useRef(0);
  const progressIndex = useRef(0);

  // ▶ Hero 전용 refs
  const heroRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  // 공통 split 애니메이션 (첫 섹션의 h1/p는 제외했으므로 영향 X)
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".split").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
            markers: false,
          },
        }
      );
    });
  }, []);

  // ▶ Hero 인트로 스크롤 타임라인
  useGSAP(() => {
    // 초기 상태 세팅: 제목 보임, 부제 숨김, 배경 원상태
    gsap.set(titleRef.current, { opacity: 1, y: 0 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(bgRef.current, {
      scale: 1,
      opacity: 1,
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: true,
        markers: false, // 필요시 true로
      },
    });

    // 0 ~ 60%: 배경 확대 + 페이드아웃 / 제목 페이드아웃
    tl.to(bgRef.current, { scale: 2, opacity: 0, ease: "none" }, 0).to(
      titleRef.current,
      { opacity: 0, y: -20, ease: "none" },
      0.2
    );

    // 60% ~ 100%: 부제 페이드인
    tl.to(subtitleRef.current, { opacity: 1, y: 0, ease: "none" }, 0.6);
  });

  // 기존 슬라이더 섹션 타임라인
  useGSAP(() => {
    const slides = gsap.utils.toArray(".slide");
    if (slides.length < 2) return;

    factor.current = 1 / (slides.length - 1);

    t.current = gsap.to(slides, {
      xPercent: -100 * (slides.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".slider-section",
        start: "top top",
        end: "+=" + 100 * slides.length + "%",
        pin: true,
        scrub: true,
        markers: false,
        onUpdate: (s) => {
          const newVal = gsap.utils.snap(factor.current, s.progress);
          if (newVal !== progressIndex.current) {
            progressIndex.current = newVal;
          }
        },
      },
    });
  });

  return (
    <div>
      <main>
        {/* ===== HERO SECTION ===== */}
        <section
          ref={heroRef}
          className="section-fullscreen relative flex flex-col items-center justify-center overflow-hidden"
        >
          {/* 배경 레이어: 확대/페이드 애니메이션 대상 */}
          <div
            ref={bgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />

          {/* 블러 경계 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full backdrop-blur-[4px] mask-[radial-gradient(circle,rgba(0,0,0,1)_70%,rgba(0,0,0,0)_100%)]"></div>
          </div>
          {/* 제목: 처음에만 보임 → 스크롤하며 사라짐 */}
          <h1 ref={titleRef} className="text-3xl font-bold relative z-10">
            탐조, 어떻게 시작해야 할지 모르겠어요
          </h1>

          {/* 부제: 스크롤 중후반에 나타남 */}
          <p ref={subtitleRef} className="text-3xl  relative z-10">
            입문자들을 위한 탐조 가이드
          </p>
        </section>

        {/* ===== SLIDER SECTION ===== */}
        <section className="section-fullscreen flex items-center justify-between gap-12 slider-section">
          <div className="w-1/2">
            <p className="text-xl ">
              <span className="split opacity-0 block">
                산책을 하며 눈으로 새를 보는 것도
              </span>
              <span className="split opacity-0 block">
                탐조라고 할 수 있지만,
              </span>
              <span className="split opacity-0 block">
                조금 더 본격적으로 탐조를 즐기고 싶다면
              </span>
              <span className="split opacity-0 block">
                가볍게 챙겨야 할 것들이 있어요.
              </span>
              <span className="split opacity-0 block">하나씩 살펴볼게요!</span>
            </p>
          </div>
          <div className="w-1/2 h-full slider overflow-hidden flex flex-row flex-nowrap">
            <div className="slide h-full bg-slate-500 min-w-full flex items-center justify-center text-white text-lg">
              쌍안경
            </div>
            <div className="slide h-full bg-slate-700 min-w-full flex items-center justify-center text-white text-lg">
              도감
            </div>
            <div className="slide h-full bg-slate-900 min-w-full flex items-center justify-center text-white text-lg">
              옷차림
            </div>
          </div>
        </section>

        {/* ===== FOLLOWING SECTION ===== */}
        <section className="section-fullscreen flex items-center justify-between gap-12">
          <div className="w-1/2"></div>
          <div className="w-1/2">
            <h2 className="split opacity-0 text-xl font-bold">
              어디로 가야 할까요?
            </h2>
            <p className="split opacity-0 text-lg">
              처음에는 동네에서 시작하는 걸 추천 드려요. 생각보다 우리 주변에
              다양한 새들이 있거든요!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GuidePage;
