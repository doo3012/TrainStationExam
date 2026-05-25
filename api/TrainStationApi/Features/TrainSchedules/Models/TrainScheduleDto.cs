namespace TrainStationApi.Features.TrainSchedules.Models;

public sealed record TrainScheduleDto(
    string TrainNo,
    DateTime TrainDate,
    TimeSpan TrainTime,
    string Gate,
    string FromStation,
    string ToStation,
    string? Remark
);
