import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const eyebrowVariants = cva(
  "mb-4 text-base leading-5 font-semibold tracking-widest uppercase sm:mb-6 sm:tracking-[0.35em]",
  {
    variants: {
      tone: {
        muted: "text-muted-foreground",
        primary: "text-primary",
        onPrimary: "text-primary-foreground/60",
      },
    },
    defaultVariants: {
      tone: "muted",
    },
  },
);

function Eyebrow({
  className,
  tone,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof eyebrowVariants>) {
  return (
    <p
      data-slot="eyebrow"
      className={cn(eyebrowVariants({ tone }), className)}
      {...props}
    />
  );
}

export { Eyebrow, eyebrowVariants };
