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

IF (
    NOT EXISTS(SELECT * FROM [dbo].[UserRoles]) AND
    NOT EXISTS(SELECT * FROM [dbo].[Users]) AND
    NOT EXISTS(SELECT * FROM [dbo].[UserPasswords]) AND
    NOT EXISTS(SELECT * FROM [dbo].[MenuItemCategories]) AND
    NOT EXISTS(SELECT * FROM [dbo].[MenuItems]) AND
    NOT EXISTS(SELECT * FROM [dbo].[Discounts]) AND
    NOT EXISTS(SELECT * FROM [dbo].[Taxes]) AND
    NOT EXISTS(SELECT * FROM [dbo].[Orders]) AND 
    NOT EXISTS(SELECT * FROM [dbo].[OrderMenuItems]) AND
    NOT EXISTS(SELECT * FROM [dbo].[OrderTaxes])
)
BEGIN
    DECLARE @systemID INT;

    -- User Roles

    INSERT INTO [dbo].[UserRoles] ([Name], [Active], [CreatedDate])
    VALUES ('system', 1, GETDATE()) 

    INSERT INTO [dbo].[UserRoles] ([Name], [Active], [CreatedDate])
    VALUES ('Manager', 1, GETDATE()) 
    
    INSERT INTO [dbo].[UserRoles] ([Name], [Active], [CreatedDate])
    VALUES ('Server', 1, GETDATE())

    -- Users

    DECLARE @systemUserTypeID AS INT = (SELECT ut.[Id] FROM [dbo].[UserRoles] ut WHERE ut.[Name] = 'system')
    DECLARE @managerUserTypeID AS INT = (SELECT ut.[Id] FROM [dbo].[UserRoles] ut WHERE ut.[Name] = 'Manager')
    DECLARE @serverUserTypeID AS INT = (SELECT ut.[Id] FROM [dbo].[UserRoles] ut WHERE ut.[Name] = 'Server')

    /* Generate system user */
    INSERT INTO [dbo].[Users] ([Username], [FirstName], [LastName], [UserRoleId], [Active], [CreatedDate])
    VALUES ('1', 'system', 'system', @systemUserTypeID, 1, GETDATE())

    SET @systemID = (SELECT u.[Id] FROM [dbo].[Users] u WHERE u.[Username] = '1')

    /* Generate a Manager */
    INSERT INTO [dbo].[Users] ([Username], [FirstName], [LastName], [UserRoleId], [Active], [CreatedBy], [CreatedDate])
    VALUES ('1000', 'test', 'manager', @managerUserTypeID, 1, @systemID, GETDATE())

    /* Generate a Server */
    INSERT INTO [dbo].[Users] ([Username], [FirstName], [LastName], [UserRoleId], [Active], [CreatedBy], [CreatedDate])
    VALUES ('2000', 'test', 'server', @serverUserTypeID, 1, @systemID, GETDATE())

    DECLARE @managerID AS INT = (SELECT u.[Id] FROM [dbo].[Users] u WHERE u.[Username] = '1000')
    DECLARE @serverID AS INT = (SELECT u.[Id] FROM [dbo].[Users] u WHERE u.[Username] = '2000')

    -- User Passwords
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

    -- Menu Item Categories

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

    -- Menu Items

    DECLARE @burgersId INT = (SELECT Id FROM [dbo].[MenuItemCategories] WHERE [Name] = 'Burgers')
    DECLARE @pizzaId INT = (SELECT Id FROM [dbo].[MenuItemCategories] WHERE [Name] = 'Pizza')
    DECLARE @saladsId INT = (SELECT Id FROM [dbo].[MenuItemCategories] WHERE [Name] = 'Salads')
    DECLARE @sidesId INT = (SELECT Id FROM [dbo].[MenuItemCategories] WHERE [Name] = 'Sides')
    DECLARE @drinksId INT = (SELECT Id FROM [dbo].[MenuItemCategories] WHERE [Name] = 'Drinks')

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Hamburger', 6.50, @burgersId, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Cheeseburger', 7.00, @burgersId, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Bacon Cheeseburger', 8.50, @burgersId, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Cheese Pizza', 8.50, @pizzaId, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Pepperoni Pizza', 9.50, @pizzaId, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Meat Lovers Pizza', 12.00, @pizzaId, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Supreme Pizza', 12.00, @pizzaId, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('House Salad', 5.00, @saladsId, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Ceaser Salad', 2.50, @saladsId, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Greek Salad', 2.50, @saladsId, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Fries', 2.00, @sidesId, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Onion Rings', 4.00, @sidesId, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Coleslaw', 2.00, @sidesId, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[MenuItems] ([Name], [Cost], [MenuItemCategoryId], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Chili', 5.00, @sidesId, 1, GETDATE(), @managerID)

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

    -- Discounts - DiscountType: 0 = fixed, 1 = percentage

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

    -- Taxes

    INSERT INTO [dbo].[Taxes] ([Name], [Amount], [Active], [CreatedDate], [CreatedBy])
    VALUES ('Federal Tax', 4, 1, GETDATE(), @managerID)

    INSERT INTO [dbo].[Taxes] ([Name], [Amount], [Active], [CreatedDate], [CreatedBy])
    VALUES ('State Tax', 2.5, 1, GETDATE(), @managerID)
    
    INSERT INTO [dbo].[Taxes] ([Name], [Amount], [Active], [CreatedDate], [CreatedBy])
    VALUES ('City Tax', 3.5, 1, GETDATE(), @managerID)

    -- Orders

    INSERT INTO [dbo].[Orders] (DiscountId, SubTotal, PreTaxTotal, TotalTaxAmount, Total, CreatedBy, CreatedDate)
    VALUES (2, 23.00, 20.70, 10.00, 22.77, @managerID, GETDATE())

    INSERT INTO [dbo].[Orders] (DiscountId, SubTotal, PreTaxTotal, TotalTaxAmount, Total, CreatedBy, CreatedDate)
    VALUES(NULL, 14.50, 14.50, 10.00, 15.95, @serverID, GETDATE())
    
    INSERT INTO [dbo].[Orders] (DiscountId, SubTotal, PreTaxTotal, TotalTaxAmount, Total, CreatedBy, CreatedDate)
    VALUES(1, 52.50, 47.50, 10, 52.25, @serverID, GETDATE())

    -- OrderMenuItems

    DECLARE @Order1Id INT = (SELECT Id FROM [dbo].[Orders] WHERE Total = 22.77);
    DECLARE @Order2Id INT = (SELECT Id FROM [dbo].[Orders] WHERE Total = 15.95);
    DECLARE @Order3Id INT = (SELECT Id FROM [dbo].[Orders] WHERE Total = 52.25);
    DECLARE @BaconCheeseBurgerId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Bacon Cheeseburger')
    DECLARE @CeaserSaladId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Ceaser Salad')
    DECLARE @ColeslawId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Coleslaw')
    DECLARE @BudweiserId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Budweiser')
    DECLARE @PepperoniPizzaId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Pepperoni Pizza')
    DECLARE @GreekSaladId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Greek Salad')
    DECLARE @FriesId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Fries')
    DECLARE @CheesePizzaId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Cheese Pizza')
    DECLARE @MeatLoversPizzaId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Meat Lovers Pizza')
    DECLARE @SupremePizzaId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Supreme Pizza')
    DECLARE @CokeId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Coke')
    DECLARE @SweetTeaId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Sweet Tea')
    DECLARE @UnsweetTeaId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Unsweet Tea')
    DECLARE @GuinnessId INT = (SELECT Id FROM [dbo].MenuItems WHERE [Name] = 'Guinness')

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order1Id, @BaconCheeseBurgerId, 1)

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order1Id, @CeaserSaladId, 1)

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order1Id, @ColeslawId, 1)

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order1Id, @BudweiserId, 2)

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order2Id, @PepperoniPizzaId, 1)

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order2Id, @GreekSaladId, 1)

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order2Id, @FriesId, 1)

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order3Id, @CheesePizzaId, 1)

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order3Id, @MeatLoversPizzaId, 1)

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order3Id, @SupremePizzaId, 1)

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order3Id, @CokeId, 1)

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order3Id, @SweetTeaId, 2)

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order3Id, @UnsweetTeaId, 1)

    INSERT INTO [dbo].[OrderMenuItems] (OrderId, MenuItemId, Quantity) 
    VALUES (@Order3Id, @GuinnessId, 2)

    -- OrderTaxes

    DECLARE @FederalTaxId INT = (SELECT Id FROM [dbo].[Taxes] WHERE [Name] = 'Federal Tax')
    DECLARE @StateTaxId INT = (SELECT Id FROM [dbo].[Taxes] WHERE [Name] = 'State Tax')
    DECLARE @CityTaxId INT = (SELECT Id FROM [dbo].[Taxes] WHERE [Name] = 'City Tax')

    INSERT INTO [dbo].[OrderTaxes] (OrderId, TaxId)
    VALUES (@Order1Id, @FederalTaxId)

    INSERT INTO [dbo].[OrderTaxes] (OrderId, TaxId)
    VALUES (@Order1Id, @StateTaxId)

    INSERT INTO [dbo].[OrderTaxes] (OrderId, TaxId)
    VALUES (@Order1Id, @CityTaxId)

    INSERT INTO [dbo].[OrderTaxes] (OrderId, TaxId)
    VALUES (@Order2Id, @FederalTaxId)

    INSERT INTO [dbo].[OrderTaxes] (OrderId, TaxId)
    VALUES (@Order2Id, @StateTaxId)

    INSERT INTO [dbo].[OrderTaxes] (OrderId, TaxId)
    VALUES (@Order2Id, @CityTaxId)

    INSERT INTO [dbo].[OrderTaxes] (OrderId, TaxId)
    VALUES (@Order3Id, @FederalTaxId)

    INSERT INTO [dbo].[OrderTaxes] (OrderId, TaxId)
    VALUES (@Order3Id, @StateTaxId)

    INSERT INTO [dbo].[OrderTaxes] (OrderId, TaxId)
    VALUES (@Order3Id, @CityTaxId)
END

