import { useParams } from "react-router-dom";

const SaerokDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return <div className="bg-background-lightWhitegray"></div>;
};

export default SaerokDetailPage;
