import AppWrapper from "@/components/AppWrapper";
import AboutPage from "@/pages/AboutPage";
import DictionaryPage from "@/pages/DictionaryPage";
import SaerokPage from "@/pages/SaerokPage";
import GuidePage from "@/pages/GuidePage";
import MainPage from "@/pages/MainPage";
import SaerokDetailPage from "@/pages/SaerokDetailPage";
import { createBrowserRouter } from "react-router-dom";

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AppWrapper />,
      children: [
        { path: "", element: <MainPage /> },
        { path: "saerok", element: <SaerokPage /> },
        { path: "guide", element: <GuidePage /> },
        { path: "dictionary", element: <DictionaryPage /> },
        { path: "about", element: <AboutPage /> },
        { path: "saerok/detail", element: <SaerokDetailPage /> },
      ],
    },
  ]);
};
