import type { MetadataRoute } from "next";

import { LOGO_COLORS } from "@/components/layout/logo-paths";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bartosz Janiuk",
    short_name: "BJaniuk",
    description:
      "Digital workshop where idea meets product. Mobile and web applications for your business.",
    start_url: "/",
    display: "standalone",
    background_color: LOGO_COLORS.background,
    theme_color: LOGO_COLORS.code,
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
