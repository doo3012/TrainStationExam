"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  normalizeTrainSchedulePayload,
  toFormValues,
} from "../api/train-schedules-api";
import type {
  TrainSchedule,
  TrainSchedulePayload,
} from "../types/train-schedule";

const trainScheduleSchema = z.object({
  trainNo: z.string().trim().min(1, "Train number is required").max(20),
  trainDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
  trainTime: z.string().regex(/^\d{2}:\d{2}$/, "Use HH:mm"),
  gate: z.string().trim().min(1, "Gate is required").max(10),
  fromStation: z.string().trim().min(1, "From station is required").max(100),
  toStation: z.string().trim().min(1, "To station is required").max(100),
  remark: z.string().max(500).optional(),
});

export type TrainScheduleFormValues = z.infer<typeof trainScheduleSchema>;

type TrainScheduleFormProps = {
  selected?: TrainSchedule;
  isSaving: boolean;
  errorMessage?: string;
  onSubmit: (values: TrainSchedulePayload) => void;
  onCancelEdit: () => void;
};

export function TrainScheduleForm({
  selected,
  isSaving,
  errorMessage,
  onSubmit,
  onCancelEdit,
}: TrainScheduleFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TrainScheduleFormValues>({
    resolver: zodResolver(trainScheduleSchema),
    defaultValues: toFormValues(selected),
  });

  useEffect(() => {
    reset(toFormValues(selected));
  }, [reset, selected]);

  const submitLabel = selected ? "Update schedule" : "Create schedule";

  return (
    <form
      className="border border-[#d9d1c3] bg-[#fffaf2] p-5"
      onSubmit={handleSubmit((values) => {
        onSubmit(normalizeTrainSchedulePayload(values));
      })}
    >
      <div className="flex flex-col gap-1 border-b border-[#e5ddcf] pb-4">
        <h2 className="text-xl font-semibold text-[#20201d]">
          {selected ? "Edit train schedule" : "Create train schedule"}
        </h2>
        <p className="text-sm text-[#665f54]">
          Maintain the route, service date, departure time, and gate assignment.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Train No" error={errors.trainNo?.message}>
          <input
            {...register("trainNo")}
            disabled={Boolean(selected)}
            className="field-input disabled:bg-[#eee6d8] disabled:text-[#777064]"
            placeholder="EXP001"
          />
        </Field>
        <Field label="Gate" error={errors.gate?.message}>
          <input {...register("gate")} className="field-input" placeholder="A1" />
        </Field>
        <Field label="Date" error={errors.trainDate?.message}>
          <input
            {...register("trainDate")}
            className="field-input"
            type="date"
          />
        </Field>
        <Field label="Time" error={errors.trainTime?.message}>
          <input
            {...register("trainTime")}
            className="field-input"
            type="time"
          />
        </Field>
        <Field label="From station" error={errors.fromStation?.message}>
          <input
            {...register("fromStation")}
            className="field-input"
            placeholder="Bangkok"
          />
        </Field>
        <Field label="To station" error={errors.toStation?.message}>
          <input
            {...register("toStation")}
            className="field-input"
            placeholder="Chiang Mai"
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="Remark" error={errors.remark?.message}>
            <textarea
              {...register("remark")}
              className="field-input min-h-24 resize-y"
              placeholder="Optional note"
            />
          </Field>
        </div>
      </div>

      {errorMessage ? (
        <p className="mt-4 border border-[#d99b8a] bg-[#fff1ed] px-3 py-2 text-sm text-[#8f2c19]">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button className="btn-primary" disabled={isSaving} type="submit">
          {isSaving ? "Saving..." : submitLabel}
        </button>
        {selected ? (
          <button className="btn-secondary" type="button" onClick={onCancelEdit}>
            Cancel edit
          </button>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[#3b3832]">
      {label}
      {children}
      {error ? <span className="text-xs text-[#8f2c19]">{error}</span> : null}
    </label>
  );
}
