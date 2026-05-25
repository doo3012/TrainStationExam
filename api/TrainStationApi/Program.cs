using TrainStationApi.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddApplicationServices();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("Frontend");

app.UseHttpsRedirection();

// add endpoint
app.MapApplicationEndpoints();

app.Run();