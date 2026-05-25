using System.Data;
using Dapper;
using TrainStationApi.Database;
using TrainStationApi.Features.TrainSchedules.Models;

namespace TrainStationApi.Features.TrainSchedules.UpdateTrainSchedule;

public sealed class UpdateTrainScheduleHandler(IDbConnectionFactory dbConnectionFactory)
{
    public async Task<TrainScheduleDto?> HandleAsync(string trainNo, UpdateTrainScheduleRequest request)
    {
        using IDbConnection connection = dbConnectionFactory.CreateConnection();

        var rowsAffected = await connection.QuerySingleAsync<int>(
            "dbo.sp_TrainSchedule_Update",
            new
            {
                TrainNo = trainNo,
                request.TrainDate,
                request.TrainTime,
                request.Gate,
                request.FromStation,
                request.ToStation,
                request.Remark
            },
            commandType: CommandType.StoredProcedure
        );

        if (rowsAffected == 0)
        {
            return null;
        }

        return new TrainScheduleDto(
            trainNo,
            request.TrainDate.Date,
            request.TrainTime,
            request.Gate,
            request.FromStation,
            request.ToStation,
            request.Remark
        );
    }
}
