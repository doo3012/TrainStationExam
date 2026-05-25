using TrainStationApi.Features.TrainSchedules.CreateTrainSchedule;
using TrainStationApi.Features.TrainSchedules.DeleteTrainSchedule;
using TrainStationApi.Features.TrainSchedules.GetTrainScheduleById;
using TrainStationApi.Features.TrainSchedules.GetTrainSchedules;
using TrainStationApi.Features.TrainSchedules.SearchTrainSchedules;
using TrainStationApi.Features.TrainSchedules.UpdateTrainSchedule;

namespace TrainStationApi.Features.TrainSchedules;

public static class TrainScheduleEndpoints
{
    public static IEndpointRouteBuilder MapTrainScheduleEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/train-schedules")
            .WithTags("Train Schedules");

        group.MapGet("/", GetTrainSchedulesEndpoint.Handle);
        group.MapPost("/", CreateTrainScheduleEndpoint.Handle);
        group.MapGet("/search", SearchTrainSchedulesEndpoint.Handle);
        group.MapGet("/{trainNo}", GetTrainScheduleByIdEndpoint.Handle);
        group.MapPut("/{trainNo}", UpdateTrainScheduleEndpoint.Handle);
        group.MapDelete("/{trainNo}", DeleteTrainScheduleEndpoint.Handle);

        return app;
    }
}
