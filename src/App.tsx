// App.tsx
import { useEffect } from "react";
import "./App.css";
import { Mobile, PC } from "./components/Responsive";
import MobilePage from "./components/tempPages/MobilePage";
import PCPage from "./components/tempPages/PCPage";

const APP_STORE_URL =
  "https://apps.apple.com/kr/app/%EC%83%88%EB%A1%9D-%EC%9D%BC%EC%83%81-%EC%86%8D%EC%9D%98-%ED%83%90%EC%A1%B0-%EC%9D%BC%EC%A7%80/id6744866662"; // ← 여기에 실제 앱스토어 주소 넣으세요

function App() {
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

    // iPhone / iPad / iPod 체크
    const isIOS =
      /iPhone|iPad|iPod/i.test(ua) ||
      // iPadOS 13+가 desktop Safari처럼 나오는 경우 처리
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isIOS) {
      window.location.href = APP_STORE_URL;
    }
  }, []);

  // const router = createRouter();
  // return <RouterProvider router={router} />;

  return (
    <>
      <Mobile>
        <MobilePage />
      </Mobile>
      <PC>
        <PCPage />
      </PC>
    </>
  );
}

export default App;
