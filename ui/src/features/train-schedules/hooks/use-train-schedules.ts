import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTrainSchedule,
  deleteTrainSchedule,
  getTrainSchedule,
  getTrainSchedules,
  searchTrainSchedules,
  updateTrainSchedule,
} from "../api/train-schedules-api";
import type {
  TrainSchedulePayload,
  TrainScheduleSearchParams,
  UpdateTrainSchedulePayload,
} from "../types/train-schedule";

export const trainScheduleKeys = {
  all: ["train-schedules"] as const,
  detail: (trainNo: string) => [...trainScheduleKeys.all, trainNo] as const,
  search: (params: TrainScheduleSearchParams) =>
    [...trainScheduleKeys.all, "search", params] as const,
};

export function useTrainSchedules(params?: TrainScheduleSearchParams) {
  const hasSearch = Boolean(
    params?.trainNo || params?.fromStation || params?.toStation,
  );

  return useQuery({
    queryKey: hasSearch
      ? trainScheduleKeys.search(params ?? {})
      : trainScheduleKeys.all,
    queryFn: () =>
      hasSearch ? searchTrainSchedules(params ?? {}) : getTrainSchedules(),
  });
}

export function useTrainSchedule(trainNo?: string) {
  return useQuery({
    queryKey: trainScheduleKeys.detail(trainNo ?? ""),
    queryFn: () => getTrainSchedule(trainNo ?? ""),
    enabled: Boolean(trainNo),
  });
}

export function useCreateTrainSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TrainSchedulePayload) => createTrainSchedule(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: trainScheduleKeys.all });
    },
  });
}

export function useUpdateTrainSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      trainNo,
      payload,
    }: {
      trainNo: string;
      payload: UpdateTrainSchedulePayload;
    }) => updateTrainSchedule(trainNo, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: trainScheduleKeys.all });
    },
  });
}

export function useDeleteTrainSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trainNo: string) => deleteTrainSchedule(trainNo),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: trainScheduleKeys.all });
    },
  });
}
