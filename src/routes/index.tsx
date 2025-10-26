import AppWrapper from "@/components/AppWrapper";
import AboutPage from "@/pages/AboutPage";
import DictionaryPage from "@/pages/DictionaryPage";
import SaerokPage from "@/pages/SaerokPage";
import GuidePage from "@/pages/GuidePage";
import MainPage from "@/pages/MainPage";
import SaerokDetailPage from "@/pages/SaerokDetailPage";
import { createBrowserRouter } from "react-router-dom";
import EtiquettePage from "@/pages/EtiquettePage";
import EquipmentPage from "@/pages/EquipmentPage";
import TipsPage from "@/pages/TipsPage";

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AppWrapper />,
      children: [
        { path: "", element: <MainPage /> },
        { path: "saerok", element: <SaerokPage /> },
        { path: "saerok/detail", element: <SaerokDetailPage /> },
        { path: "guide", element: <GuidePage /> },
        { path: "guide/etiquette", element: <EtiquettePage /> },
        { path: "guide/equipment", element: <EquipmentPage /> },
        { path: "guide/tips", element: <TipsPage /> },
        { path: "dictionary", element: <DictionaryPage /> },
        { path: "about", element: <AboutPage /> },
      ],
    },
  ]);
};
