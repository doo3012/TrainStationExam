using TrainStationApi.Common;

namespace TrainStationApi.Features.TrainSchedules.UpdateTrainSchedule;

public static class UpdateTrainScheduleEndpoint
{
    public static async Task<IResult> Handle(
        string trainNo,
        UpdateTrainScheduleRequest request,
        UpdateTrainScheduleHandler handler
    )
    {
        var item = await handler.HandleAsync(trainNo, request);

        if (item is null)
        {
            return Results.NotFound(ApiResponse<UpdateTrainScheduleResponse>.Fail("Train schedule not found."));
        }

        return Results.Ok(
            ApiResponse<UpdateTrainScheduleResponse>.Ok(
                new UpdateTrainScheduleResponse(item),
                "Updated"
            )
        );
    }
}
