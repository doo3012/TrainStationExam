using TrainStationApi.Features.TrainSchedules.Models;

namespace TrainStationApi.Features.TrainSchedules.SearchTrainSchedules;

public sealed record SearchTrainSchedulesResponse(
    IEnumerable<TrainScheduleDto> Items
);