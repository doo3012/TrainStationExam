using TrainStationApi.Common;

namespace TrainStationApi.Features.TrainSchedules.DeleteTrainSchedule;

public static class DeleteTrainScheduleEndpoint
{
    public static async Task<IResult> Handle(
        string trainNo,
        DeleteTrainScheduleHandler handler
    )
    {
        var deleted = await handler.HandleAsync(trainNo);

        if (!deleted)
        {
            return Results.NotFound(ApiResponse<object>.Fail("Train schedule not found."));
        }

        return Results.Ok(ApiResponse<object>.Ok(new { trainNo }, "Deleted"));
    }
}
