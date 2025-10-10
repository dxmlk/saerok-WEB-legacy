import SaerokListCard from "./SaerokListCard";
import { mockCollections } from "@/mock/Collections";

interface SaerokListProps {
  scale?: number;
}

const SaerokList = ({ scale = 1 }: SaerokListProps) => {
  const items = mockCollections;

  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  return (
    <div
      className=" flex"
      style={{
        paddingLeft: `${120 * scale}px`,
        paddingRight: `${120 * scale}px`,
        gap: `${20 * scale}px`,
      }}
    >
      {/* 왼쪽 컬럼 */}
      <div
        className=" columns-2 flex-1"
        style={{
          marginTop: `${22 * scale}px`,
          columnGap: `${20 * scale}px`,
        }}
      >
        {left.map((it: any) => (
          <SaerokListCard key={it.collectionId} scale={scale} item={it} />
        ))}
      </div>
      {/* 오른쪽 컬럼 */}
      <div
        className="flex-1"
        style={{
          marginTop: `${-260 * scale}px`,
        }}
      >
        {right[0] && <SaerokListCard scale={scale} item={right[0]} />}

        <div
          className="columns-2"
          style={{
            columnGap: `${20 * scale}px`,
          }}
        >
          {right.slice(1).map((it) => (
            <SaerokListCard key={it.collectionId} item={it} scale={scale} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaerokList;
