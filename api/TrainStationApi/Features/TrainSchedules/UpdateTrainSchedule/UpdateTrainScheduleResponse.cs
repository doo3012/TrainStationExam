using TrainStationApi.Features.TrainSchedules.Models;

namespace TrainStationApi.Features.TrainSchedules.UpdateTrainSchedule;

public sealed record UpdateTrainScheduleResponse(
    TrainScheduleDto Item
);
