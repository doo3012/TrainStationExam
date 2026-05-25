"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { alertManager } from "@/lib/sweetalert-manager";
import {
  getApiErrorMessage,
  normalizeTrainSchedulePayload,
  toFormValues,
} from "../api/train-schedules-api";
import {
  useCreateTrainSchedule,
  useDeleteTrainSchedule,
  useTrainSchedule,
  useUpdateTrainSchedule,
} from "../hooks/use-train-schedules";
import type { TrainSchedulePayload } from "../types/train-schedule";

const trainScheduleSchema = z.object({
  trainNo: z.string().trim().min(1, "Train No is required").max(20),
  trainDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date is required"),
  trainTime: z.string().regex(/^\d{2}:\d{2}$/, "Time is required"),
  gate: z.string().trim().min(1, "Gate is required").max(10),
  fromStation: z.string().trim().min(1, "From is required").max(100),
  toStation: z.string().trim().min(1, "To is required").max(100),
  remark: z.string().max(500).optional(),
});

type TrainScheduleFormValues = z.infer<typeof trainScheduleSchema>;

export function TrainScheduleManagePage() {
  const searchParams = useSearchParams();
  const trainNo = searchParams.get("trainNo") ?? undefined;
  const isEditMode = Boolean(trainNo);
  const scheduleQuery = useTrainSchedule(trainNo);
  const createMutation = useCreateTrainSchedule();
  const updateMutation = useUpdateTrainSchedule();
  const deleteMutation = useDeleteTrainSchedule();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TrainScheduleFormValues>({
    resolver: zodResolver(trainScheduleSchema),
    defaultValues: toFormValues(),
  });

  useEffect(() => {
    if (scheduleQuery.data) {
      reset(toFormValues(scheduleQuery.data));
    }
  }, [reset, scheduleQuery.data]);

  useEffect(() => {
    if (scheduleQuery.isError) {
      void alertManager.showAlert(
        getApiErrorMessage(scheduleQuery.error),
        "error",
      );
    }
  }, [scheduleQuery.error, scheduleQuery.isError]);

  const isSaving = createMutation.isPending || updateMutation.isPending;

  function redirectToList() {
    window.location.href = "/";
  }

  function onSubmit(values: TrainScheduleFormValues) {
    const payload = normalizeTrainSchedulePayload(
      values as TrainSchedulePayload,
    );

    if (isEditMode && trainNo) {
      updateMutation.mutate(
        {
          trainNo,
          payload: {
            trainDate: payload.trainDate,
            trainTime: payload.trainTime,
            gate: payload.gate,
            fromStation: payload.fromStation,
            toStation: payload.toStation,
            remark: payload.remark,
          },
        },
        {
          onSuccess: () => {
            void alertManager.showAlert(
              "บันทึกข้อมูลเรียบร้อยแล้ว",
              "success",
              redirectToList,
            );
          },
          onError: (error) => {
            void alertManager.showAlert(getApiErrorMessage(error), "error");
          },
        },
      );
      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        void alertManager.showAlert(
          "เพิ่มข้อมูลเรียบร้อยแล้ว",
          "success",
          redirectToList,
        );
      },
      onError: (error) => {
        void alertManager.showAlert(getApiErrorMessage(error), "error");
      },
    });
  }

  async function handleDelete() {
    if (!trainNo) {
      return;
    }

    const confirmed = await alertManager.showConfirm(
      `ต้องการลบข้อมูลรถไฟ ${trainNo} หรือไม่?`,
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(trainNo, {
      onSuccess: () => {
        void alertManager.showAlert(
          "ลบข้อมูลเรียบร้อยแล้ว",
          "success",
          redirectToList,
        );
      },
      onError: (error) => {
        void alertManager.showAlert(getApiErrorMessage(error), "error");
      },
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans leading-normal tracking-normal">
      <div className="container mx-auto my-8 max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold text-slate-800">
            <i className="fa-solid fa-gear mr-2 text-amber-600" />
            หน้าจอจัดการเวลา เข้า - ออก รถไฟ
          </h1>
          <Link
            href="/"
            className="flex items-center rounded-md border px-4 py-2 font-medium text-gray-500 transition duration-200 hover:bg-gray-50 hover:text-gray-700"
          >
            <i className="fa-solid fa-arrow-left mr-2" /> Back
          </Link>
        </div>

        {scheduleQuery.isLoading && isEditMode ? (
          <div className="py-10 text-center text-gray-500">กำลังโหลดข้อมูล...</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField label="Train No:" error={errors.trainNo?.message}>
                <input
                  type="text"
                  required
                  disabled={isEditMode}
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                  placeholder="ระบุเลขขบวนรถไฟ"
                  {...register("trainNo")}
                />
              </FormField>

              <FormField label="Gate:" error={errors.gate?.message}>
                <input
                  type="text"
                  required
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="เช่น A1, A2"
                  {...register("gate")}
                />
              </FormField>

              <FormField label="Date:" error={errors.trainDate?.message}>
                <input
                  type="date"
                  required
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("trainDate")}
                />
              </FormField>

              <FormField label="Time:" error={errors.trainTime?.message}>
                <input
                  type="time"
                  required
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("trainTime")}
                />
              </FormField>

              <FormField label="From:" error={errors.fromStation?.message}>
                <input
                  type="text"
                  required
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="สถานีต้นทาง"
                  {...register("fromStation")}
                />
              </FormField>

              <FormField label="To:" error={errors.toStation?.message}>
                <input
                  type="text"
                  required
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="สถานีปลายทาง"
                  {...register("toStation")}
                />
              </FormField>
            </div>

            <div className="mb-8">
              <FormField label="Remark:" error={errors.remark?.message}>
                <textarea
                  rows={3}
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
                  {...register("remark")}
                />
              </FormField>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <button
                type="button"
                disabled={!isEditMode || deleteMutation.isPending}
                className="flex items-center rounded-md bg-red-600 px-6 py-2 font-medium text-white shadow-sm transition duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleDelete}
              >
                <i className="fa-solid fa-trash-can mr-2" /> Delete
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center rounded-md bg-blue-600 px-8 py-2 font-medium text-white shadow-sm transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <i className="fa-solid fa-floppy-disk mr-2" /> Save
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
