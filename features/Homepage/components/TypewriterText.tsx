import { cn } from "@/lib/utils";

type TypewriterTextProps = {
  text: string;
  placeholder: string;
  className?: string;
};

export const TypewriterText = ({
  text,
  placeholder,
  className,
}: TypewriterTextProps) => (
  <span className="relative inline-grid align-top whitespace-normal sm:whitespace-nowrap">
    <span
      aria-hidden
      className={cn("invisible col-start-1 row-start-1 select-none", className)}
    >
      {placeholder}
    </span>
    <span className={cn("typing-cursor col-start-1 row-start-1", className)}>
      {text}
    </span>
  </span>
);
