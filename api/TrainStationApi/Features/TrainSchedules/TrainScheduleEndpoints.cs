using TrainStationApi.Features.TrainSchedules.SearchTrainSchedules;

namespace TrainStationApi.Features.TrainSchedules;

public static class TrainScheduleEndpoints
{
    public static IEndpointRouteBuilder MapTrainScheduleEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/train-schedules")
            .WithTags("Train Schedules");

        group.MapGet("/search", SearchTrainSchedulesEndpoint.Handle);

        return app;
    }
}