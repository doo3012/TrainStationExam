using TrainStationApi.Common;

namespace TrainStationApi.Features.TrainSchedules.GetTrainSchedules;

public static class GetTrainSchedulesEndpoint
{
    public static async Task<IResult> Handle(GetTrainSchedulesHandler handler)
    {
        var items = await handler.HandleAsync();

        return Results.Ok(
            ApiResponse<GetTrainSchedulesResponse>.Ok(
                new GetTrainSchedulesResponse(items)
            )
        );
    }
}
