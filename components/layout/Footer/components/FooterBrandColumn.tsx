type FooterBrandColumnProps = {
  brandName: string;
  description: string | null;
  className?: string;
};

export function FooterBrandColumn({
  brandName,
  description,
  className,
}: FooterBrandColumnProps) {
  return (
    <div className={className}>
      <p className="text-base font-medium tracking-tight">{brandName}</p>
      {description ? (
        <p className="text-primary-foreground/70 mt-3 text-sm leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
