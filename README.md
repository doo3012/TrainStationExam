# new project .net 10
# new solution
dotnet new sln -n TrainStation
dotnet new webapi -n TrainStationApi -o TrainStationApi
dotnet sln TrainStation.slnx add TrainStationApi/TrainStationApi.csproj

# new project only
dotnet new webapi -n TrainStationApi

# add package
dotnet add package Microsoft.Data.SqlClient
dotnet add package Dapper
dotnet add package Microsoft.AspNetCore.OpenApi
dotnet add package FluentValidation
dotnet add package FluentValidation.DependencyInjectionExtensions

===

# new project nextjs
# new project
bun create next-app . --typescript --tailwind --eslint

# add library
bun add axios zod zustand @tanstack/react-query @tanstack/react-table react-hook-form sweetalert2 @hookform/resolvers
bun add -d prettier eslint-config-prettier