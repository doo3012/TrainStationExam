using System.Data;
using Dapper;
using TrainStationApi.Database;
using TrainStationApi.Features.TrainSchedules.Models;

namespace TrainStationApi.Features.TrainSchedules.SearchTrainSchedules;

public class SearchTrainSchedulesHandler(IDbConnectionFactory dbConnectionFactory)
{
    public async Task<IEnumerable<TrainScheduleDto>> HandleAsync(SearchTrainSchedulesRequest request)
    {
        using IDbConnection connection = dbConnectionFactory.CreateConnection();

        var parameters = new DynamicParameters();
        parameters.Add("@TrainNo", request.TrainNo);
        parameters.Add("@FromStation", request.FromStation);
        parameters.Add("@ToStation", request.ToStation);

        var result = await connection.QueryAsync<TrainScheduleDto>(
            "dbo.sp_TrainSchedule_Search",
            parameters,
            commandType: CommandType.StoredProcedure
        );

        return result;
    }
}
