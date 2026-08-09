"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { Accordion } from "radix-ui";

import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqAccordionProps = {
  items: FaqItem[];
};

export const FaqAccordion = ({ items }: FaqAccordionProps) => {
  return (
    <Accordion.Root type="single" collapsible className="w-full">
      {items.map((item, index) => {
        const value = `item-${index}`;

        return (
          <Accordion.Item
            key={value}
            value={value}
            className="border-border border-b"
          >
            <Accordion.Header>
              <Accordion.Trigger
                className={cn(
                  "group text-primary flex w-full items-center justify-between gap-4 py-5 text-left uppercase",
                  "focus-visible:ring-ring font-bold outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2",
                )}
              >
                <span>{item.question}</span>
                <PlusIcon
                  className="size-5 shrink-0 transition-transform duration-300 ease-out group-data-[state=open]:rotate-45"
                  weight="bold"
                  aria-hidden
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
              <div className="text-primary pt-0 pb-5 text-sm leading-relaxed sm:text-base">
                {item.answer}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
};
