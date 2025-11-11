import type { CollectionItem } from "@/features/saerok/CollectionType";
import axiosPublic from "./axiosPublic";

// // 최근 새록 조회
// export const getRecentSaeroksApi = async (
//   signal?: AbortSignal
// ): Promise<CollectionItem[]> => {
//   const res = await axiosPublic.get<CollectionItemList>("/community/recent", {
//     signal,
//   });
//   return res.data.items;
// };

// 새록 상세 조회
export const getCollectionsDetailApi = async (
  collectionId: number,
  signal?: AbortSignal
): Promise<CollectionItem> => {
  const res = await axiosPublic.get<CollectionItem>(
    `/collections/${collectionId}`,
    { signal }
  );
  return res.data;
};

export const fetchCollectionsByIds = async (
  ids: number[],
  signal?: AbortSignal
): Promise<CollectionItem[]> => {
  const settled = await Promise.allSettled(
    ids.map((id) => getCollectionsDetailApi(id, signal))
  );

  const ok = settled
    .map((r, i) =>
      r.status === "fulfilled" ? { idx: i, item: r.value } : null
    )
    .filter((v): v is { idx: number; item: CollectionItem } => !!v);

  ok.sort((a, b) => a.idx - b.idx);

  return ok.map((x) => x.item);
};
