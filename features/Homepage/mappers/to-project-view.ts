import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { HomePageProject } from "@/lib/sanity/fetchers/get-home-page";
import { cmsImageUrl } from "../utils/cms-media";

export type ListedProjectView = {
  key: string;
  title: string;
  category: string;
  image: string;
  href: string;
  tint?: string;
  placement: string;
};

export function toProjectView(
  locale: Locale,
  project: HomePageProject,
): ListedProjectView | null {
  const image = cmsImageUrl(project.image, { width: 1240 });
  if (!image || !project.href) return null;

  return {
    key: project.key,
    title: project.title ?? "",
    category: project.category ?? "",
    image,
    href: localizeHref(locale, project.href),
    tint: project.tint ?? undefined,
    placement: project.placement ?? "",
  };
}
