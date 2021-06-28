CREATE TABLE [dbo].[Orders]
(	
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[DiscountId] INT,
	[CreatedBy] INT NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	FOREIGN KEY (DiscountId) REFERENCES [dbo].[Discounts](Id),
	FOREIGN KEY (CreatedBy) REFERENCES [dbo].[Users](Id)
)
