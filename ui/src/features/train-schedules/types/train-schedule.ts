export type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T | null;
};

export type TrainSchedule = {
  trainNo: string;
  trainDate: string;
  trainTime: string;
  gate: string;
  fromStation: string;
  toStation: string;
  remark: string | null;
};

export type TrainScheduleSearchParams = {
  trainNo?: string;
  fromStation?: string;
  toStation?: string;
};

export type TrainSchedulePayload = {
  trainNo: string;
  trainDate: string;
  trainTime: string;
  gate: string;
  fromStation: string;
  toStation: string;
  remark?: string | null;
};

export type UpdateTrainSchedulePayload = Omit<TrainSchedulePayload, "trainNo">;

export type TrainScheduleListResponse = {
  items: TrainSchedule[];
};

export type TrainScheduleItemResponse = {
  item: TrainSchedule;
};
