CREATE TABLE [dbo].[OrderMenuItems]
(
	[OrderId] INT NOT NULL,
	[MenuItemId] INT NOT NULL,
	[Quantity] INT NOT NULL,
	PRIMARY KEY (OrderId, MenuItemId),
	FOREIGN KEY (OrderId) REFERENCES [dbo].[Orders](Id),
	FOREIGN KEY (MenuItemId) REFERENCES [dbo].[MenuItems](Id)
)
