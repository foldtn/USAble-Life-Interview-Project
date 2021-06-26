/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

/* 
    ONLY POPULATE IF TABLES ARE EMPTY 
    -1 is "System" user
*/


IF (NOT EXISTS(SELECT * FROM [dbo].[UserType]))
BEGIN
    INSERT INTO [dbo].[UserType] ([Name], [Active], [CreatedDate])
    VALUES ('system', 1, GETDATE()) 

    INSERT INTO [dbo].[UserType] ([Name], [Active], [CreatedDate])
    VALUES ('Manager', 1, GETDATE()) 
    
    INSERT INTO [dbo].[UserType] ([Name], [Active], [CreatedDate])
    VALUES ('Server', 1, GETDATE())
END

DECLARE @systemID AS INT

IF (NOT EXISTS(SELECT * FROM [dbo].[User]))
BEGIN
    DECLARE @systemUserTypeID AS INT = (SELECT ut.[Id] FROM [dbo].UserType ut WHERE ut.[Name] = 'system')
    DECLARE @managerUserTypeID AS INT = (SELECT ut.[Id] FROM [dbo].UserType ut WHERE ut.[Name] = 'Manager')
    DECLARE @serverUserTypeID AS INT = (SELECT ut.[Id] FROM [dbo].UserType ut WHERE ut.[Name] = 'Server')

    /* Generate system user */
    INSERT INTO [dbo].[User] ([Username], [UserType], [Active], [CreatedDate])
    VALUES ('systemUser', @systemUserTypeID, 1, GETDATE())

    SET @systemID = (SELECT u.[Id] FROM [dbo].[User] u WHERE u.[Username] = 'systemUser')

    /* Generate a Manager */
    INSERT INTO [dbo].[User] ([Username], [FirstName], [LastName], [UserType], [Active], [CreatedBy], [CreatedDate])
    VALUES ('testManager', 'test', 'manager', 0, 1, @systemID, GETDATE())

    /* Generate a Server */
    INSERT INTO [dbo].[User] ([Username], [FirstName], [LastName], [UserType], [Active], [CreatedBy], [CreatedDate])
    VALUES ('testServer', 'test', 'server', 1, 1, @systemID, GETDATE())
END

DECLARE @managerID AS INT = (SELECT u.[Id] FROM [dbo].[User] u WHERE u.[Username] = 'testManager')
DECLARE @serverID AS INT = (SELECT u.[Id] FROM [dbo].[User] u WHERE u.[Username] = 'testServer')

IF (NOT EXISTS(SELECT * FROM [dbo].[UserPassword]))
BEGIN
    /* test password is "password"... */

    IF (@serverID IS NOT NULL)
    BEGIN
        INSERT INTO [dbo].[UserPassword] ([Password], [Salt], [Active], [UserId], [CreatedDate])
        VALUES ('$2a$11$DC4eeBKj0imYslNZJPW/bujcMojAMEr3PPNJTZPWxRLOv/HLF9x1m', '$2a$11$DC4eeBKj0imYslNZJPW/bu', 1, @serverID, GETDATE())
    END

    IF (@managerID IS NOT NULL)
    BEGIN
        INSERT INTO [dbo].[UserPassword] ([Password], [Salt], [Active], [UserId], [CreatedDate])
        VALUES ('$2a$11$DC4eeBKj0imYslNZJPW/bujcMojAMEr3PPNJTZPWxRLOv/HLF9x1m', '$2a$11$DC4eeBKj0imYslNZJPW/bu', 1, @managerID, GETDATE())
    END
END

/*
IF (NOT EXISTS(SELECT * FROM [dbo].[MenuItemCategory]) AND @managerID IS NOT NULL)
BEGIN
    INSERT INTO [dbo].[MenuItemCategory] ([Name], [Active], [CreatedDate], [CreatedBy]
END
*/
