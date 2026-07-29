import type { HomePageTechItem } from "@/lib/sanity/fetchers/get-home-page";
import type { TechStackItemView } from "../components/TechStackItem";
import { resolveThemedLogo } from "../utils/cms-media";

export function toTechStackItemView(
  item: HomePageTechItem,
): TechStackItemView | null {
  const logo = resolveThemedLogo(item.logo);
  if (!logo) return null;

  const secondaryLogo = resolveThemedLogo(item.secondaryLogo) ?? undefined;

  return {
    key: item.key,
    name: item.name ?? "",
    logo,
    secondaryLogo,
    description: item.description ?? "",
    tags: item.tags ?? [],
  };
}
