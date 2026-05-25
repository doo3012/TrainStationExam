using TrainStationApi.Features.TrainSchedules.Models;

namespace TrainStationApi.Features.TrainSchedules.GetTrainSchedules;

public sealed record GetTrainSchedulesResponse(
    IEnumerable<TrainScheduleDto> Items
);
