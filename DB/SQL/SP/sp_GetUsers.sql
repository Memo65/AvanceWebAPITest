CREATE PROCEDURE sp_GetUsers
AS
BEGIN
    SELECT
        Id,
        Username,
        PasswordHash,
        Email,
        CreatedAt,
        UpdatedAt
    FROM Users
END;
