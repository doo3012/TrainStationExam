using TrainStationApi.Features.TrainSchedules;

namespace TrainStationApi.Extensions;

public static class EndpointRouteBuilderExtensions
{
    public static IEndpointRouteBuilder MapApplicationEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapTrainScheduleEndpoints();

        return app;
    }
}