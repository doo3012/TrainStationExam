import { Suspense } from "react";
import { TrainScheduleManagePage } from "@/features/train-schedules/components/train-schedule-manage-page";

export default function ManagePage() {
  return (
    <Suspense fallback={null}>
      <TrainScheduleManagePage />
    </Suspense>
  );
}
