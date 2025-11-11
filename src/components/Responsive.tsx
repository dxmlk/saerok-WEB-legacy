import React from "react";
import { useMediaQuery } from "react-responsive";

type ResponsiveProps = {
  children: React.ReactNode;
};

export const Mobile: React.FC<ResponsiveProps> = ({ children }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return <>{isMobile && children}</>;
};

export const PC: React.FC<ResponsiveProps> = ({ children }) => {
  const isPC = useMediaQuery({ query: "(min-width: 769px)" });
  return <>{isPC && children}</>;
};
