namespace TrainStationApi.Common;

public sealed record ApiResponse<T>(
    bool Status,
    string Message,
    T? Data
)
{
    public static ApiResponse<T> Ok(T data, string message = "Success") => new ApiResponse<T>(true, message, data);
    public static ApiResponse<T> Fail(string message) => new(false, message, default);
}