CREATE PROCEDURE sp_DeleteUser(
    @userId INT
)
AS
BEGIN
    DELETE FROM Users
    WHERE Id = @userId;
END;
