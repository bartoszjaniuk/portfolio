import type { HomePageExperience } from "@/lib/sanity/fetchers/get-home-page";

const columns = [
  { key: "company", label: "Company / Organization" },
  { key: "role", label: "Role / Position" },
  { key: "year", label: "Year" },
  { key: "description", label: "Description" },
] as const;

const rowGridClass =
  "grid grid-cols-1 gap-3 border-b border-border py-6 last:border-b-0 md:grid-cols-[1fr_1fr_0.55fr_2fr] md:items-start md:gap-x-6 md:py-5";

const cellLabelClass =
  "mb-1 block text-[0.65rem] font-medium tracking-widest text-muted-foreground uppercase md:hidden";

const cellValueClass =
  "text-lg font-medium tracking-wide text-foreground uppercase";

export type ExperienceTableProps = {
  items: HomePageExperience[];
};

const CompanyCell = ({ job }: { job: HomePageExperience }) => {
  const label = job.companyFull ?? job.company ?? "";
  const href = job.companyUrl;

  return (
    <>
      <span className={cellLabelClass}>{columns[0].label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cellValueClass} text-primary focus-visible:ring-ring/50 transition-colors hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none`}
        >
          {label}
        </a>
      ) : (
        <span className={`${cellValueClass} text-primary`}>{label}</span>
      )}
    </>
  );
};

export const ExperienceTable = ({ items }: ExperienceTableProps) => (
  <div
    role="table"
    aria-label="Professional experience"
    className="text-foreground w-full"
  >
    <div
      role="row"
      className="border-border mb-1 hidden border-b pb-3 md:grid md:grid-cols-[1fr_1fr_0.55fr_2fr] md:gap-x-6"
    >
      {columns.map((column) => (
        <div
          key={column.key}
          role="columnheader"
          className="text-muted-foreground text-left text-sm font-medium tracking-widest uppercase"
        >
          {column.label}
        </div>
      ))}
    </div>

    <div role="rowgroup">
      {items.map((job) => {
        const bullets = job.bullets ?? [];

        return (
          <div key={job.key} role="row" className={rowGridClass}>
            <div role="cell">
              <CompanyCell job={job} />
            </div>
            <div role="cell">
              <span className={cellLabelClass}>{columns[1].label}</span>
              <span className={cellValueClass}>{job.role}</span>
            </div>
            <div role="cell">
              <span className={cellLabelClass}>{columns[2].label}</span>
              <span className={`${cellValueClass} md:whitespace-nowrap`}>
                {job.range}
              </span>
            </div>
            <div role="cell">
              <span className={cellLabelClass}>{columns[3].label}</span>
              <ul className="space-y-2">
                {bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-muted-foreground flex gap-2 text-lg leading-relaxed normal-case"
                  >
                    <span aria-hidden className="text-primary mt-1 shrink-0">
                      ▹
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
