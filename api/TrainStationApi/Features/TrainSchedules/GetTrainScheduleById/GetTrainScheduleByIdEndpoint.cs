using TrainStationApi.Common;

namespace TrainStationApi.Features.TrainSchedules.GetTrainScheduleById;

public static class GetTrainScheduleByIdEndpoint
{
    public static async Task<IResult> Handle(
        string trainNo,
        GetTrainScheduleByIdHandler handler
    )
    {
        var item = await handler.HandleAsync(trainNo);

        if (item is null)
        {
            return Results.NotFound(ApiResponse<GetTrainScheduleByIdResponse>.Fail("Train schedule not found."));
        }

        return Results.Ok(
            ApiResponse<GetTrainScheduleByIdResponse>.Ok(
                new GetTrainScheduleByIdResponse(item)
            )
        );
    }
}
