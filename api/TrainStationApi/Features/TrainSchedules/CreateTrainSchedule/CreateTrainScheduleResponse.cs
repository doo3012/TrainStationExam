using TrainStationApi.Features.TrainSchedules.Models;

namespace TrainStationApi.Features.TrainSchedules.CreateTrainSchedule;

public sealed record CreateTrainScheduleResponse(
    TrainScheduleDto Item
);
