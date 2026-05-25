using TrainStationApi.Common;

namespace TrainStationApi.Features.TrainSchedules.SearchTrainSchedules;

public static class SearchTrainSchedulesEndpoint
{
    public static async Task<IResult> Handle(
        [AsParameters] SearchTrainSchedulesRequest request,
        SearchTrainSchedulesHandler handler
    )
    {
        var items = await handler.HandleAsync(request);

        return Results.Ok(
            ApiResponse<SearchTrainSchedulesResponse>.Ok(
                new SearchTrainSchedulesResponse(items)
            )
        );
    }
}