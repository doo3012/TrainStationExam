using System.Data;
using System.Globalization;
using Dapper;
using TrainStationApi.Database;
using TrainStationApi.Features.TrainSchedules.Models;

namespace TrainStationApi.Features.TrainSchedules.GetTrainSchedules;

public sealed class GetTrainSchedulesHandler(IDbConnectionFactory dbConnectionFactory)
{
    public async Task<IEnumerable<TrainScheduleDto>> HandleAsync()
    {
        using IDbConnection connection = dbConnectionFactory.CreateConnection();

        var result = await connection.QueryAsync<TrainScheduleRow>(
            "dbo.sp_TrainSchedule_GetAll",
            commandType: CommandType.StoredProcedure
        );

        return result.Select(row => new TrainScheduleDto(
            row.TrainNo,
            DateTime.ParseExact(row.TrainDate, "yyyy-MM-dd", CultureInfo.InvariantCulture),
            TimeSpan.Parse(row.TrainTime, CultureInfo.InvariantCulture),
            row.Gate,
            row.FromStation,
            row.ToStation,
            row.Remark
        ));
    }

    private sealed record TrainScheduleRow(
        string TrainNo,
        string TrainDate,
        string TrainTime,
        string Gate,
        string FromStation,
        string ToStation,
        string? Remark
    );
}
