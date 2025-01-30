
CREATE PROCEDURE sp_UpdateUser(
    @userId INT,
    @username VARCHAR(50),
    @password VARCHAR(100),
    @email VARCHAR(50)
)
AS
BEGIN
        
    UPDATE Users
    SET 
    Username = @username, 
    PasswordHash = @password, 
    Email = @email, 
    UpdatedAt = GETDATE()
    WHERE Id = @userId;
END;

