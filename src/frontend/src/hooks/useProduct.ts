import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Product } from "../types";

export function useProduct(id: number) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return null;
      const raw = await actor.getProduct(BigInt(id));
      if (!raw) return null;
      return {
        id: Number(raw.id),
        name: raw.name,
        description: raw.description,
        price: raw.price,
        category: raw.category,
        imageUrl: raw.imageUrl,
        stock: Number(raw.stock),
      };
    },
    enabled: !!actor && !isFetching && id > 0,
  });
}
