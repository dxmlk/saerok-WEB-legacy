import SaerokDetailCard from "@/features/saerok/detail/SaerokDetailCard";
import SaerokDetailList from "@/features/saerok/detail/SaerokDetailList";
import { useCollectionDetail } from "@/hooks/useCollectionDetail";
import { useParams } from "react-router-dom";

const SaerokDetailPage = () => {
  const DESIGN_HEIGHT = 925;
  const scale = window.innerHeight / DESIGN_HEIGHT;

  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useCollectionDetail(Number(id));

  if (loading) return <></>;
  if (error) return <></>;
  if (!data) return <></>;

  return (
    <div className="bg-background-lightWhitegray">
      <div>{data.bird.koreanName}</div>
      <SaerokDetailCard scale={scale} />
      <SaerokDetailList scale={scale} />
    </div>
  );
};

export default SaerokDetailPage;
