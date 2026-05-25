using System.Data;
using Dapper;
using TrainStationApi.Database;

namespace TrainStationApi.Features.TrainSchedules.DeleteTrainSchedule;

public sealed class DeleteTrainScheduleHandler(IDbConnectionFactory dbConnectionFactory)
{
    public async Task<bool> HandleAsync(string trainNo)
    {
        using IDbConnection connection = dbConnectionFactory.CreateConnection();

        var rowsAffected = await connection.QuerySingleAsync<int>(
            "dbo.sp_TrainSchedule_Delete",
            new { TrainNo = trainNo },
            commandType: CommandType.StoredProcedure
        );

        return rowsAffected > 0;
    }
}
