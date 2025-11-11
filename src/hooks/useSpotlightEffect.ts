// "use client";
import { useEffect, useRef } from "react";

type Config = {
  spotlightSize?: number; // px
  spotlightIntensity?: number; // 0~1
  fadeSpeed?: number; // 0~1
  glowColor?: string; // "#fff" | "#ffffff" | "255,255,255"
  pulseSpeed?: number; // ms (0이면 비활성)
  overlayColor?: string;
  overlayOpacity?: number;
};

function hexToRgbTuple(hex: string): string | null {
  // 허용: #fff, #ffffff
  const h = hex.replace("#", "").trim();
  if (![3, 6].includes(h.length)) return null;
  const n =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  if ([r, g, b].some((v) => Number.isNaN(v))) return null;
  return `${r}, ${g}, ${b}`;
}

function normalizeGlow(glow: string): string {
  // "#ffffff" → "255, 255, 255"
  // "255,255,255" → "255, 255, 255"
  const trimmed = glow.trim();
  if (trimmed.startsWith("#")) {
    const tuple = hexToRgbTuple(trimmed);
    return tuple ?? "255, 255, 255";
  }
  // 숫자만/콤마만 들어오면 공백 포맷
  return trimmed.replace(/\s+/g, "").replace(/,/g, ", ");
}

const useSpotlightEffect = (config: Config = {}) => {
  const {
    spotlightSize = 200,
    spotlightIntensity = 0.85,
    fadeSpeed = 0.1,
    glowColor = "#ffffff",
    pulseSpeed = 0,
    overlayColor = "#4190FF",
    overlayOpacity = 1,
  } = config;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 부모 크기에 맞춰 캔버스 픽셀 크기 설정(HiDPI 대응)
    const resize = () => {
      const parent = canvas.parentElement;
      const rect = (parent ?? canvas).getBoundingClientRect();
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // 스케일을 한 번에 설정
    };

    // 리스너/애니메이션 상태
    let raf = 0;
    let targetX = -9999,
      targetY = -9999;
    let x = targetX,
      y = targetY;

    const lerp = (a: number, b: number, t: number) =>
      a + (b - a) * Math.min(1, Math.max(0, t));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      targetX = -9999;
      targetY = -9999;
    };

    const rgbGlow = normalizeGlow(glowColor);
    const rgbOverlay = normalizeGlow(overlayColor);

    const render = () => {
      x = lerp(x, targetX, fadeSpeed);
      y = lerp(y, targetY, fadeSpeed);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 어두운 오버레이
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1; // 고정 오버레이 불투명도(필요하면 별도 파라미터로 뺄 수 있음)
      ctx.fillStyle = `rgba(${rgbOverlay}, ${overlayOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 맥동(옵션)
      const scale =
        pulseSpeed && pulseSpeed > 0
          ? 1 +
            0.1 *
              Math.sin(((Date.now() % pulseSpeed) / pulseSpeed) * Math.PI * 2)
          : 1;
      const R = spotlightSize * scale;

      // 구멍(punch-out)
      // (기존) 단일 원 구멍 -----------------------
      // const gradient = ctx.createRadialGradient(x, y, 0, x, y, R);
      // gradient.addColorStop(0, `rgba(${rgb}, ${spotlightIntensity})`);
      // gradient.addColorStop(0.5, `rgba(${rgb}, ${spotlightIntensity * 0.5})`);
      // gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      // ctx.globalCompositeOperation = "destination-out";
      // ctx.fillStyle = gradient;
      // ctx.beginPath();
      // ctx.arc(x, y, R, 0, Math.PI * 2);
      // ctx.fill();

      // (변경) 쌍안경
      // 좌우 중심 계산
      const gap = R * 0.6;
      const r = R * 0.4;
      const lx = Math.round(x - gap / 2);
      const rx = Math.round(x + gap / 2);
      const cy = Math.round(y);

      // 하드엣지로 유니온(겹침 자국 없음)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,1)";

      ctx.beginPath();
      ctx.arc(lx, cy, Math.round(r), 0, Math.PI * 2); // 왼쪽 원
      ctx.arc(rx, cy, Math.round(r), 0, Math.PI * 2); // 오른쪽 원 (같은 방향으로)
      ctx.fill(); // 한 번만 채우기!

      //   // 공통 그라디언트 그리기 함수
      //   const punch = (cx: number, cy: number, radius: number) => {
      //     const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      //     g.addColorStop(0, `rgba(${rgb}, ${spotlightIntensity})`);
      //     g.addColorStop(0.5, `rgba(${rgb}, ${spotlightIntensity * 0.5})`);
      //     g.addColorStop(1, "rgba(0, 0, 0, 0)");
      //     ctx.fillStyle = g;

      //     ctx.beginPath();
      //     ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      //     ctx.fill();
      //   };

      // (옵션) 외곽 글로우
      // ctx.globalCompositeOperation = "source-over";
      // const glow = ctx.createRadialGradient(x, y, 0, x, y, R * 1.2);
      // glow.addColorStop(0, `rgba(${rgbGlow}, 0.2)`);
      // glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      // ctx.fillStyle = glow;
      // ctx.beginPath();
      // ctx.arc(x, y, R * 1.2, 0, Math.PI * 2);
      // ctx.fill();

      raf = requestAnimationFrame(render);
    };

    // 초기화
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);

    // 이벤트 (canvas 기준)
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      ro.disconnect();
    };
  }, [spotlightSize, spotlightIntensity, fadeSpeed, glowColor, pulseSpeed]);

  return canvasRef;
};

export default useSpotlightEffect;
