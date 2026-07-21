import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type {
  TechStackItemData,
  TechStackLogo,
} from "../utils/tech-stack-content";

type TechStackItemProps = {
  item: TechStackItemData;
  className?: string;
};

const TechStackLogoImage = ({
  logo,
  className,
}: {
  logo: TechStackLogo;
  className?: string;
}) => {
  const layout = logo.layout ?? "wordmark";
  const scale = logo.scale ?? 1;
  const containerClassName = cn(
    "relative flex shrink-0 items-center overflow-visible",
    layout === "mark" ? "h-8 w-8" : "h-8 w-[7.25rem]",
    className,
  );
  const imageClassName = "h-full w-auto max-w-full object-contain object-left";

  const renderImage = (src: string, hiddenClassName?: string) => (
    <div
      className={cn("flex h-full items-center", hiddenClassName)}
      style={
        scale !== 1
          ? { transform: `scale(${scale})`, transformOrigin: "left center" }
          : undefined
      }
    >
      <Image
        src={src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className={imageClassName}
      />
    </div>
  );

  if (logo.light === logo.dark) {
    return <div className={containerClassName}>{renderImage(logo.light)}</div>;
  }

  return (
    <div className={containerClassName}>
      {renderImage(logo.light, "dark:hidden")}
      {renderImage(logo.dark, "hidden dark:flex")}
    </div>
  );
};

export const TechStackItem = ({ item, className }: TechStackItemProps) => {
  return (
    <article className={cn("shrink-0", className)}>
      <Card
        className={cn(
          "border-border/80 w-full gap-6 rounded-3xl border py-0 md:w-[min(420px,85vw)]",
          "bg-secondary/60 backdrop-blur-sm",
          "shadow-[0_8px_32px_oklch(0_0_0/0.24)]",
          "md:min-h-[min(520px,55vh)]",
        )}
      >
        <CardContent className="flex h-full flex-col gap-6 p-6 sm:p-8">
          <header className="flex items-center gap-3">
            <TechStackLogoImage logo={item.logo} />
            {item.secondaryLogo ? (
              <TechStackLogoImage logo={item.secondaryLogo} />
            ) : null}
            <h3 className="font-sans text-2xl font-bold tracking-tight uppercase">
              {item.name}
            </h3>
          </header>

          <p className="text-muted-foreground text-sm leading-relaxed">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-border/70 bg-background/40 h-auto rounded-md px-2.5 py-1 text-[10px] tracking-wider uppercase"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </article>
  );
};
