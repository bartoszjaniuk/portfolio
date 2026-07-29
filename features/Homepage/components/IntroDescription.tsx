export type IntroDescriptionProps = {
  descriptionBefore: string | null;
};

export const IntroDescription = ({
  descriptionBefore,
}: IntroDescriptionProps) => {
  if (!descriptionBefore) return null;

  return (
    <p className="text-muted-foreground animate-fade-in-up stagger-2 max-w-md text-base leading-relaxed sm:text-lg">
      {descriptionBefore}
    </p>
  );
};
