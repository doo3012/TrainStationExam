using System.Data;
using Dapper;
using TrainStationApi.Database;
using TrainStationApi.Features.TrainSchedules.Models;

namespace TrainStationApi.Features.TrainSchedules.GetTrainScheduleById;

public sealed class GetTrainScheduleByIdHandler(IDbConnectionFactory dbConnectionFactory)
{
    public async Task<TrainScheduleDto?> HandleAsync(string trainNo)
    {
        using IDbConnection connection = dbConnectionFactory.CreateConnection();

        return await connection.QuerySingleOrDefaultAsync<TrainScheduleDto>(
            "dbo.sp_TrainSchedule_GetById",
            new { TrainNo = trainNo },
            commandType: CommandType.StoredProcedure
        );
    }
}
