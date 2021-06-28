
-- 0 = commit, 1 = rollback
DECLARE @debug INT = 0;

BEGIN TRANSACTION

    DROP TABLE [dbo].[UserPasswords]
    DROP TABLE [dbo].[OrderMenuItems]
    DROP TABLE [dbo].[OrderTaxes]
    DROP TABLE [dbo].[Taxes]
    DROP TABLE [dbo].[Orders]
    DROP TABLE [dbo].[Discounts]
    DROP TABLE [dbo].[MenuItems]
    DROP TABLE [dbo].[MenuItemCategories]
    DROP TABLE [dbo].[Users]
    DROP TABLE [dbo].[UserRoles]

IF (@debug = 0)
BEGIN
	COMMIT TRANSACTION
END
ELSE
BEGIN
	ROLLBACK
END