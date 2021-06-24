CREATE TABLE [dbo].[OrderMenuItem]
(
	[OrderId] INT NOT NULL,
	[MenuItemId] INT NOT NULL,
	[Quantity] SMALLINT NOT NULL,
	PRIMARY KEY (OrderId, MenuItemId),
	FOREIGN KEY (OrderId) REFERENCES [dbo].[Order](Id),
	FOREIGN KEY (MenuItemId) REFERENCES [dbo].[MenuItem](Id)
)
