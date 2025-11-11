// src/hooks/useCuratedCollections.ts
import { useEffect, useMemo, useState } from "react";
import { fetchCollectionsByIds } from "@/services/api/collections";
import type { CollectionItem } from "@/features/saerok/CollectionType";

export const useCuratedCollections = (ids: number[]) => {
  const [data, setData] = useState<CollectionItem[] | null>(null);
  const [loading, setLoading] = useState(ids.length > 0);
  const [error, setError] = useState<unknown>(null);

  const idsKey = useMemo(() => ids.join(","), [ids]);

  useEffect(() => {
    if (!ids.length) {
      setData([]);
      setLoading(false);
      setError(null);
      return;
    }
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    const numbericIds = idsKey
      .split(",")
      .map((s) => Number(s))
      .filter(Number.isFinite);

    fetchCollectionsByIds(numbericIds, ac.signal)
      .then(setData)
      .catch((e) => {
        const name = (e as any)?.name;
        if (name !== "AbortError" && name !== "CanceledError") setError(e);
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [idsKey]);

  return { data, loading, error };
};
