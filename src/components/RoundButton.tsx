import { ReactComponent as FowardICon } from "@/assets/icons/forward.svg";
import { useNavigate } from "react-router-dom";

interface RoundButtonProps {
  text: string;
  moveTo: string;
  scale?: number;
}

const RoundButton = ({ text, moveTo, scale = 1 }: RoundButtonProps) => {
  const navigate = useNavigate();
  const itemHeight = 49 * scale;
  const fontSize = 20 * scale;

  return (
    <button
      onClick={() => navigate(`/${moveTo}`)}
      className="flex flex-row justify-between items-center pl-20 pr-15 h-49 rounded-30 gap-8 border-1 border-mainBlue bg-background-white"
      style={{
        height: `${itemHeight}px`,
        fontSize: `${fontSize}px`,
        lineHeight: `${fontSize}px`,
        gap: `${8 * scale}px`,
        borderRadius: `${30 * scale}px`,
        paddingLeft: `${20 * scale}px`,
        paddingRight: `${15 * scale}px`,
      }}
    >
      <span
        className="text-subtitle-1-3 font-700 text-mainBlue"
        style={{
          fontSize: `${fontSize}px`,
        }}
      >
        {text}
      </span>
      <FowardICon />
    </button>
  );
};

export default RoundButton;
