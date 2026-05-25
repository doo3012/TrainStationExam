import axios from "axios";
import { apiClient } from "@/services/axios-instance";
import type {
  ApiResponse,
  TrainSchedule,
  TrainScheduleItemResponse,
  TrainScheduleListResponse,
  TrainSchedulePayload,
  TrainScheduleSearchParams,
  UpdateTrainSchedulePayload,
} from "../types/train-schedule";

function readData<T>(response: ApiResponse<T>): T {
  if (!response.status || response.data === null) {
    throw new Error(response.message || "Request failed");
  }

  return response.data;
}

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as Partial<ApiResponse<unknown>>;
    return response?.message ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error";
}

export async function getTrainSchedules() {
  const { data } =
    await apiClient.get<ApiResponse<TrainScheduleListResponse>>(
      "/api/train-schedules",
    );

  return readData(data).items;
}

export async function searchTrainSchedules(params: TrainScheduleSearchParams) {
  const { data } =
    await apiClient.get<ApiResponse<TrainScheduleListResponse>>(
      "/api/train-schedules/search",
      { params },
    );

  return readData(data).items;
}

export async function getTrainSchedule(trainNo: string) {
  const { data } = await apiClient.get<ApiResponse<TrainScheduleItemResponse>>(
    `/api/train-schedules/${encodeURIComponent(trainNo)}`,
  );

  return readData(data).item;
}

export async function createTrainSchedule(payload: TrainSchedulePayload) {
  const { data } = await apiClient.post<ApiResponse<TrainScheduleItemResponse>>(
    "/api/train-schedules",
    payload,
  );

  return readData(data).item;
}

export async function updateTrainSchedule(
  trainNo: string,
  payload: UpdateTrainSchedulePayload,
) {
  const { data } = await apiClient.put<ApiResponse<TrainScheduleItemResponse>>(
    `/api/train-schedules/${encodeURIComponent(trainNo)}`,
    payload,
  );

  return readData(data).item;
}

export async function deleteTrainSchedule(trainNo: string) {
  await apiClient.delete<ApiResponse<{ trainNo: string }>>(
    `/api/train-schedules/${encodeURIComponent(trainNo)}`,
  );
}

export function normalizeTrainSchedulePayload(
  values: TrainSchedulePayload,
): TrainSchedulePayload {
  return {
    ...values,
    trainNo: values.trainNo.trim(),
    trainDate: values.trainDate.includes("T")
      ? values.trainDate
      : `${values.trainDate}T00:00:00`,
    trainTime:
      values.trainTime.length === 5
        ? `${values.trainTime}:00`
        : values.trainTime,
    gate: values.gate.trim(),
    fromStation: values.fromStation.trim(),
    toStation: values.toStation.trim(),
    remark: values.remark?.trim() || null,
  };
}

export function toFormValues(schedule?: TrainSchedule) {
  return {
    trainNo: schedule?.trainNo ?? "",
    trainDate: schedule?.trainDate.slice(0, 10) ?? "",
    trainTime: schedule?.trainTime.slice(0, 5) ?? "",
    gate: schedule?.gate ?? "",
    fromStation: schedule?.fromStation ?? "",
    toStation: schedule?.toStation ?? "",
    remark: schedule?.remark ?? "",
  };
}
