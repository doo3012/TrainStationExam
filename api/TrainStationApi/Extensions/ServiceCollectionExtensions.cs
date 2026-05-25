using TrainStationApi.Database;
using TrainStationApi.Features.TrainSchedules.CreateTrainSchedule;
using TrainStationApi.Features.TrainSchedules.DeleteTrainSchedule;
using TrainStationApi.Features.TrainSchedules.GetTrainScheduleById;
using TrainStationApi.Features.TrainSchedules.GetTrainSchedules;
using TrainStationApi.Features.TrainSchedules.SearchTrainSchedules;
using TrainStationApi.Features.TrainSchedules.UpdateTrainSchedule;
using FluentValidation;

namespace TrainStationApi.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddSingleton<IDbConnectionFactory, DbConnectionFactory>();

        services.AddScoped<CreateTrainScheduleHandler>();
        services.AddScoped<DeleteTrainScheduleHandler>();
        services.AddScoped<GetTrainScheduleByIdHandler>();
        services.AddScoped<GetTrainSchedulesHandler>();
        services.AddScoped<SearchTrainSchedulesHandler>();
        services.AddScoped<UpdateTrainScheduleHandler>();

        services.AddValidatorsFromAssembly(typeof(ServiceCollectionExtensions).Assembly);

        services.AddCors(options =>
        {
            options.AddPolicy("Frontend", policy =>
            {
                policy
                    .WithOrigins(
                        "http://localhost:3000",
                        "http://localhost:3001",
                        "http://127.0.0.1:3000",
                        "http://127.0.0.1:3001"
                    )
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        return services;
    }
}
