import * as React from "react";

export const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <section className="relative px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
};
