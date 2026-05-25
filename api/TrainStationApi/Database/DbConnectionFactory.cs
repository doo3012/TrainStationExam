using System.Data;
using Microsoft.Data.SqlClient;

namespace TrainStationApi.Database;

public interface IDbConnectionFactory
{
    IDbConnection CreateConnection();
}

public sealed class DbConnectionFactory(IConfiguration configuration) : IDbConnectionFactory
{
    private readonly string _connectionString = configuration.GetConnectionString("DbConnection")
            ?? throw new InvalidOperationException("Connection string 'DbConnection' not found.");

    public IDbConnection CreateConnection()
    {
        return new SqlConnection(_connectionString);
    }
}