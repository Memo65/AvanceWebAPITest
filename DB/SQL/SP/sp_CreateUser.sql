CREATE PROCEDURE sp_CreateUser (
    @username VARCHAR(50),
    @password VARCHAR(100),
    @email VARCHAR(50)
)
AS
BEGIN
    INSERT INTO Users(Username, PasswordHash, Email) 
VALUES (
    @username,
    @password,
    @email
);

END;
