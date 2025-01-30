CREATE PROCEDURE sp_GetUserById (
    @userId INT
)
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
    WHERE Id = @userId
END;


