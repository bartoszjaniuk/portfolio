import type { Metadata } from "next";

import { WorkbenchStage } from "@/features/Workbench/WorkbenchStage";

export const metadata: Metadata = {
  title: "Workbench | Bartosz Janiuk",
  description: "Animation workbench for landing page experiments.",
};

export default function WorkbenchPage() {
  return <WorkbenchStage />;
}
