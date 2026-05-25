using Microsoft.Data.SqlClient;
using TrainStationApi.Common;

namespace TrainStationApi.Features.TrainSchedules.CreateTrainSchedule;

public static class CreateTrainScheduleEndpoint
{
    public static async Task<IResult> Handle(
        CreateTrainScheduleRequest request,
        CreateTrainScheduleHandler handler
    )
    {
        try
        {
            var item = await handler.HandleAsync(request);

            return Results.Ok(
                ApiResponse<CreateTrainScheduleResponse>.Ok(
                    new CreateTrainScheduleResponse(item),
                    "Created"
                )
            );
        }
        catch (SqlException ex) when (ex.Number is 50000 or 2627 or 2601)
        {
            return Results.Conflict(ApiResponse<CreateTrainScheduleResponse>.Fail(ex.Message));
        }
    }
}
