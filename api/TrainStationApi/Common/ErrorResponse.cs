namespace TrainStationApi.Common;

public sealed record ErrorResponse(
    bool Status,
    string Message
);