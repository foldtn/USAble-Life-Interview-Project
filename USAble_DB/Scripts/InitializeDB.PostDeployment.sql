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
*/

-- USER ROLES

IF (NOT EXISTS(SELECT * FROM [dbo].[UserRoles]))
BEGIN
    INSERT INTO [dbo].[UserRoles] ([Name], [Active], [CreatedDate])
    VALUES ('system', 1, GETDATE()) 

    INSERT INTO [dbo].[UserRoles] ([Name], [Active], [CreatedDate])
    VALUES ('Manager', 1, GETDATE()) 
    
    INSERT INTO [dbo].[UserRoles] ([Name], [Active], [CreatedDate])
    VALUES ('Server', 1, GETDATE())
END

DECLARE @systemID INT;

-- USERS

IF (NOT EXISTS(SELECT * FROM [dbo].[Users]))
BEGIN
    DECLARE @systemUserTypeID AS INT = (SELECT ut.[Id] FROM [dbo].[UserRoles] ut WHERE ut.[Name] = 'system')
    DECLARE @managerUserTypeID AS INT = (SELECT ut.[Id] FROM [dbo].[UserRoles] ut WHERE ut.[Name] = 'Manager')
    DECLARE @serverUserTypeID AS INT = (SELECT ut.[Id] FROM [dbo].[UserRoles] ut WHERE ut.[Name] = 'Server')

    /* Generate system user */
    INSERT INTO [dbo].[Users] ([Username], [FirstName], [LastName], [UserRoleId], [Active], [CreatedDate])
    VALUES ('systemUser', 'system', 'system', @systemUserTypeID, 1, GETDATE())

    SET @systemID = (SELECT u.[Id] FROM [dbo].[Users] u WHERE u.[Username] = 'systemUser')

    /* Generate a Manager */
    INSERT INTO [dbo].[Users] ([Username], [FirstName], [LastName], [UserRoleId], [Active], [CreatedBy], [CreatedDate])
    VALUES ('testManager', 'test', 'manager', @managerUserTypeID, 1, @systemID, GETDATE())

    /* Generate a Server */
    INSERT INTO [dbo].[Users] ([Username], [FirstName], [LastName], [UserRoleId], [Active], [CreatedBy], [CreatedDate])
    VALUES ('testServer', 'test', 'server', @serverUserTypeID, 1, @systemID, GETDATE())
END

DECLARE @managerID AS INT = (SELECT u.[Id] FROM [dbo].[Users] u WHERE u.[Username] = 'testManager')
DECLARE @serverID AS INT = (SELECT u.[Id] FROM [dbo].[Users] u WHERE u.[Username] = 'testServer')

-- USER PASSWORDS

IF (NOT EXISTS(SELECT * FROM [dbo].[UserPasswords]))
BEGIN
    /* test password is "password"... */

    IF (@serverID IS NOT NULL)
    BEGIN
        INSERT INTO [dbo].[UserPasswords] ([Password], [Active], [UserId], [CreatedDate])
        VALUES ('$2a$11$DC4eeBKj0imYslNZJPW/bujcMojAMEr3PPNJTZPWxRLOv/HLF9x1m', 1, @serverID, GETDATE())
    END

    IF (@managerID IS NOT NULL)
    BEGIN
        INSERT INTO [dbo].[UserPasswords] ([Password], [Active], [UserId], [CreatedDate])
        VALUES ('$2a$11$DC4eeBKj0imYslNZJPW/bujcMojAMEr3PPNJTZPWxRLOv/HLF9x1m', 1, @managerID, GETDATE())
    END
END

-- MENU ITEM CATEGORIES

IF (NOT EXISTS(SELECT * FROM [dbo].[MenuItemCategories]) AND @managerID IS NOT NULL)
BEGIN
    INSERT INTO [dbo].[MenuItemCategories] ([Name], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Burgers', 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItemCategories] ([Name], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Pizza', 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItemCategories] ([Name], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Salads', 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItemCategories] ([Name], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Sides', 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItemCategories] ([Name], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Drinks', 1, GETDATE(), @managerID)
END

-- MENU ITEMS

IF (NOT EXISTS(SELECT * FROM [dbo].[MenuItems]) AND @managerID IS NOT NULL)
BEGIN
    DECLARE @burgersId INT = (SELECT Id FROM [dbo].[MenuItemCategories] WHERE [Name] = 'Burgers')
    DECLARE @pizzaId INT = (SELECT Id FROM [dbo].[MenuItemCategories] WHERE [Name] = 'Pizza')
    DECLARE @saladsId INT = (SELECT Id FROM [dbo].[MenuItemCategories] WHERE [Name] = 'Salads')
    DECLARE @sidesId INT = (SELECT Id FROM [dbo].[MenuItemCategories] WHERE [Name] = 'Sides')
    DECLARE @drinksId INT = (SELECT Id FROM [dbo].[MenuItemCategories] WHERE [Name] = 'Drinks')

    IF (@burgersId IS NOT NULL)
    BEGIN
        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Hamburger', 6.50, @burgersId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Cheeseburger', 7.00, @burgersId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Bacon Cheeseburger', 8.50, @burgersId, 1, GETDATE(), @managerID)
    END

    IF (@pizzaId IS NOT NULL)
    BEGIN
        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Cheese Pizza', 8.50, @pizzaId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Pepperoni Pizza', 9.50, @pizzaId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Meat Lovers Pizza', 12.00, @pizzaId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Supreme Pizza', 12.00, @pizzaId, 1, GETDATE(), @managerID)
    END

    IF (@saladsId IS NOT NULL)
    BEGIN
        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('House Salad', 5.00, @saladsId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Ceaser Salad', 2.50, @saladsId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Greek Salad', 2.50, @saladsId, 1, GETDATE(), @managerID)
    END

    IF (@sidesId IS NOT NULL)
    BEGIN
        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Fries', 2.00, @sidesId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Onion Rings', 4.00, @sidesId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Coleslaw', 2.00, @sidesId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Chili', 5.00, @sidesId, 1, GETDATE(), @managerID)
    END

    IF (@drinksId IS NOT NULL)
    BEGIN
        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Coke', 2.50, @drinksId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Diet Coke', 2.50, @drinksId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Coke Zero', 2.50, @drinksId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Dr. Pepper', 2.50, @drinksId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Sweet Tea', 2.50, @drinksId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Unsweet Tea', 2.50, @drinksId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Miller', 5.00, @drinksId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Guinness', 5.00, @drinksId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Corona', 5.00, @drinksId, 1, GETDATE(), @managerID)

        INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
        VALUES ('Budweiser', 5.00, @drinksId, 1, GETDATE(), @managerID)
    END
END

-- DISCOUNTS - DiscountType: 0 = fixed, 1 = percentage

IF (NOT EXISTS(SELECT * FROM [dbo].[Discounts]) AND @managerID IS NOT NULL)
BEGIN
    INSERT INTO [dbo].[Discounts] ([Name], [Amount], [DiscountType], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Special Holidy Discount', 5.00, 0, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[Discounts] ([Name], [Amount], [DiscountType], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Veterans Discount', 10, 1, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[Discounts] ([Name], [Amount], [DiscountType], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Seniors Discount', 5, 1, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[Discounts] ([Name], [Amount], [DiscountType], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Birthday Discount', 7.5, 0, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[Discounts] ([Name], [Amount], [DiscountType], [Active], [CreatedDate], [CreatedBy])
    VALUES ('1337 Discount', 13.37, 0, 1, GETDATE(), @managerID)
END

-- Taxes

IF (NOT EXISTS(SELECT * FROM [dbo].[Taxes]) AND @managerID IS NOT NULL)
BEGIN
    INSERT INTO [dbo].[Taxes] ([Name], [Amount], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Federal Tax', 4, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[Taxes] ([Name], [Amount], [Active], [CreatedDate], [CreatedBy])
    VALUES ('State Tax', 2.5, 1, GETDATE(), @managerID)
    
    INSERT INTO [dbo].[Taxes] ([Name], [Amount], [Active], [CreatedDate], [CreatedBy])
    VALUES ('City Tax', 3.5, 1, GETDATE(), @managerID)
END

-- Order, OrderMenuItem, and OrderTax will not be pre-populated since they are filled in when you place an order
