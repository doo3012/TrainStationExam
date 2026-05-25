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

---

## Running the Project with Docker Compose

This repository can run the full stack with Docker Compose:

- `sqlserver`: Microsoft SQL Server 2022, exposed on `localhost:1433`.
- `api`: ASP.NET Core / .NET 10 API, exposed on `http://localhost:5074`.
- `ui`: Next.js UI, exposed on `http://localhost:3000`.

The UI calls the API through `NEXT_PUBLIC_TRAIN_STATION_API_URL`. In Docker Compose, this value is configured as:

```text
http://localhost:5074
```

### Prerequisites

Install and start Docker Desktop.

Make sure these ports are available:

```text
1433  SQL Server
5074  TrainStation API
3000  Next.js UI
```

If any port is already in use, stop the process using it or change the port mapping in `docker-compose.yml`.

### Start the Full Stack

Run this from the repository root:

```bash
docker compose up -d --build
```

This command builds the API and UI images, then starts all services.

Check service status:

```bash
docker compose ps
```

Expected containers:

```text
train-sqlserver
train-api
train-ui
```

`train-sqlserver`, `train-api`, and `train-ui` should be `Up`. If a one-time database initialization container is enabled in `docker-compose.yml`, it is normal for that container to show `Exited (0)` after it finishes.

### Initialize the Database

The SQL script is stored at:

```text
sql-command.sql
```

Create the `ExamDB` database if it does not exist:

```bash
docker exec train-sqlserver /opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P 'P@ssw0rd' \
  -C \
  -Q "IF DB_ID('ExamDB') IS NULL CREATE DATABASE ExamDB"
```

Apply the table and stored procedure script:

```bash
docker exec -i train-sqlserver /opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P 'P@ssw0rd' \
  -C \
  -d ExamDB < sql-command.sql
```

If the schema already exists, this script may fail at `CREATE TABLE dbo.TrainSchedules`. That usually means the database has already been initialized.

### Open the Application

Open the UI:

```text
http://localhost:3000
```

API base URL:

```text
http://localhost:5074
```

API smoke test:

```bash
curl http://localhost:5074/api/train-schedules
```

Expected response shape:

```json
{
  "status": true,
  "message": "Success",
  "data": {
    "items": []
  }
}
```

### Test the UI Flow

1. Open `http://localhost:3000`.
2. Click `Add`.
3. Fill in the train schedule form.
4. Click `Save`.
5. After a successful save, the UI redirects to the list page.
6. Search by train number, origin, or destination.
7. Click `แก้ไข` to edit an existing schedule.
8. Save changes or delete the schedule.

### View Logs

API logs:

```bash
docker logs -f train-api
```

UI logs:

```bash
docker logs -f train-ui
```

SQL Server logs:

```bash
docker logs -f train-sqlserver
```

### Stop the Stack

Stop containers while keeping the database volume:

```bash
docker compose down
```

Stop containers and delete the database volume:

```bash
docker compose down -v
```

Use `docker compose down -v` only when you want to reset SQL Server data completely.

### Rebuild After Code Changes

Rebuild and restart everything:

```bash
docker compose up -d --build
```

Rebuild only the API:

```bash
docker compose build api
docker compose up -d api
```

Rebuild only the UI:

```bash
docker compose build ui
docker compose up -d ui
```

### Troubleshooting

If `train-api` exits, inspect the logs:

```bash
docker logs train-api
```

Common causes:

- SQL Server is not healthy yet.
- `ExamDB` has not been created.
- `sql-command.sql` has not been applied.
- Port `5074` is already in use.

If the UI shows a CORS error, verify that the API is running at `http://localhost:5074` and the UI is opened from `http://localhost:3000`.

If the UI cannot reach the API after changing `NEXT_PUBLIC_TRAIN_STATION_API_URL`, rebuild the UI image. Next.js embeds this value at build time.
