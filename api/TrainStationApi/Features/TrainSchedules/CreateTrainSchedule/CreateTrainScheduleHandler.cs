using System.Data;
using Dapper;
using TrainStationApi.Database;
using TrainStationApi.Features.TrainSchedules.Models;

namespace TrainStationApi.Features.TrainSchedules.CreateTrainSchedule;

public sealed class CreateTrainScheduleHandler(IDbConnectionFactory dbConnectionFactory)
{
    public async Task<TrainScheduleDto> HandleAsync(CreateTrainScheduleRequest request)
    {
        using IDbConnection connection = dbConnectionFactory.CreateConnection();

        var parameters = new DynamicParameters();
        parameters.Add("@TrainNo", request.TrainNo);
        parameters.Add("@TrainDate", request.TrainDate);
        parameters.Add("@TrainTime", request.TrainTime);
        parameters.Add("@Gate", request.Gate);
        parameters.Add("@FromStation", request.FromStation);
        parameters.Add("@ToStation", request.ToStation);
        parameters.Add("@Remark", request.Remark);

        await connection.ExecuteAsync(
            "dbo.sp_TrainSchedule_Insert",
            parameters,
            commandType: CommandType.StoredProcedure
        );

        return new TrainScheduleDto(
            request.TrainNo,
            request.TrainDate.Date,
            request.TrainTime,
            request.Gate,
            request.FromStation,
            request.ToStation,
            request.Remark
        );
    }
}
