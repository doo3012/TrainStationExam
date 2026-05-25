using TrainStationApi.Features.TrainSchedules.Models;

namespace TrainStationApi.Features.TrainSchedules.GetTrainScheduleById;

public sealed record GetTrainScheduleByIdResponse(
    TrainScheduleDto Item
);
