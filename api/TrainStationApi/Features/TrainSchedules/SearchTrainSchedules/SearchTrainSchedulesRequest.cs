namespace TrainStationApi.Features.TrainSchedules.SearchTrainSchedules;

public sealed record SearchTrainSchedulesRequest(
    string? TrainNo,
    string? FromStation,
    string? ToStation
);