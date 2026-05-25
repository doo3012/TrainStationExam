CREATE TABLE dbo.TrainSchedules (
    Id INT IDENTITY(1,1) NOT NULL,
    TrainNo NVARCHAR(20) NOT NULL,
    TrainDate DATE NOT NULL,
    TrainTime TIME(0) NOT NULL,
    Gate NVARCHAR(10) NOT NULL,
    FromStation NVARCHAR(100) NOT NULL,
    ToStation NVARCHAR(100) NOT NULL,
    Remark NVARCHAR(500) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL,
    CONSTRAINT PK_TrainSchedules PRIMARY KEY CLUSTERED (TrainNo ASC)
);
GO

CREATE INDEX IX_TrainSchedules_Search
ON dbo.TrainSchedules (TrainNo, FromStation, ToStation);
GO

-- ============================================================
-- Insert
-- ============================================================

CREATE OR ALTER PROCEDURE dbo.sp_TrainSchedule_Insert
    @TrainNo NVARCHAR(20),
    @TrainDate DATE,
    @TrainTime TIME(0),
    @Gate NVARCHAR(10),
    @FromStation NVARCHAR(100),
    @ToStation NVARCHAR(100),
    @Remark NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM dbo.TrainSchedules WHERE TrainNo = @TrainNo)
    BEGIN
        RAISERROR (N'Train Number %s already exists.', 16, 1, @TrainNo);
        RETURN;
    END

    INSERT INTO dbo.TrainSchedules
    (
        TrainNo, TrainDate, TrainTime, Gate,
        FromStation, ToStation, Remark
    )
    VALUES
    (
        @TrainNo, @TrainDate, @TrainTime, @Gate,
        @FromStation, @ToStation, @Remark
    );

END;
GO

-- ============================================================
-- Update
-- ============================================================

CREATE OR ALTER PROCEDURE dbo.sp_TrainSchedule_Update
    @TrainNo NVARCHAR(20),
    @TrainDate DATE,
    @TrainTime TIME(0),
    @Gate NVARCHAR(10),
    @FromStation NVARCHAR(100),
    @ToStation NVARCHAR(100),
    @Remark NVARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.TrainSchedules
    SET
        TrainDate = @TrainDate,
        TrainTime = @TrainTime,
        Gate = @Gate,
        FromStation = @FromStation,
        ToStation = @ToStation,
        Remark = @Remark,
        UpdatedAt = SYSUTCDATETIME()
    WHERE TrainNo = @TrainNo;

    SELECT @@ROWCOUNT AS RowsAffected;
END;
GO

-- ============================================================
-- Delete
-- ============================================================

CREATE OR ALTER PROCEDURE dbo.sp_TrainSchedule_Delete
    @TrainNo NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.TrainSchedules
    WHERE TrainNo = @TrainNo;

    SELECT @@ROWCOUNT AS RowsAffected;
END;
GO

-- ============================================================
-- Select
-- ============================================================

CREATE OR ALTER PROCEDURE dbo.sp_TrainSchedule_GetById
    @TrainNo NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        TrainNo,
        TrainDate,
        TrainTime,
        Gate,
        FromStation,
        ToStation,
        Remark
    FROM dbo.TrainSchedules
    WHERE TrainNo = @TrainNo;
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_TrainSchedule_Search
    @TrainNo NVARCHAR(20) = NULL,
    @FromStation NVARCHAR(100) = NULL,
    @ToStation NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        TrainNo,
        TrainDate,
        TrainTime,
        Gate,
        FromStation,
        ToStation,
        Remark
    FROM dbo.TrainSchedules
    WHERE
        (@TrainNo IS NULL OR TrainNo LIKE '%' + @TrainNo + '%')
        AND (@FromStation IS NULL OR FromStation LIKE '%' + @FromStation + '%')
        AND (@ToStation IS NULL OR ToStation LIKE '%' + @ToStation + '%')
    ORDER BY TrainNo ASC, TrainDate ASC, TrainTime ASC;
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_TrainSchedule_GetAll
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        TrainNo,
        CONVERT(VARCHAR(10), TrainDate, 120) AS TrainDate,
        CONVERT(VARCHAR(5), TrainTime, 108) AS TrainTime,
        Gate,
        FromStation,
        ToStation,
        ISNULL(Remark, '') AS Remark
    FROM dbo.TrainSchedules
    ORDER BY TrainNo ASC, TrainDate ASC, TrainTime ASC;
END;
GO