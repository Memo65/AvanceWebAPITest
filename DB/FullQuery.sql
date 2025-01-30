------------------------------------ CREATE DATABASE ------------------------------------

CREATE DATABASE UserManagement;

GO; 

USE UserManagement;

GO;

------------------------------------ CREATE Users TABLE ------------------------------------

CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY,
    Username VARCHAR(50) NOT NULL,
    PasswordHash VARCHAR(100) NOT NULL,
    Email VARCHAR(50) NULL,
    CreatedAt DATE DEFAULT GETDATE(),
    UpdatedAt DATE DEFAULT GETDATE()
);

GO;

------------------------------------ CREATE SP's ------------------------------------

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

GO;


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

GO;


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

GO;


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

GO;


CREATE PROCEDURE sp_DeleteUser(
    @userId INT
)
AS
BEGIN
    DELETE FROM Users
    WHERE Id = @userId;
END;

GO;

