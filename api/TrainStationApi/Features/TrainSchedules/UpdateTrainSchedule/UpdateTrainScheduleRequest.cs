namespace TrainStationApi.Features.TrainSchedules.UpdateTrainSchedule;

public sealed record UpdateTrainScheduleRequest(
    DateTime TrainDate,
    TimeSpan TrainTime,
    string Gate,
    string FromStation,
    string ToStation,
    string? Remark
);
