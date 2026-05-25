namespace TrainStationApi.Features.TrainSchedules.CreateTrainSchedule;

public sealed record CreateTrainScheduleRequest(
    string TrainNo,
    DateTime TrainDate,
    TimeSpan TrainTime,
    string Gate,
    string FromStation,
    string ToStation,
    string? Remark
);
