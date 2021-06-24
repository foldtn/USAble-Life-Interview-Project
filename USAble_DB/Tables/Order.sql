CREATE TABLE [dbo].[Order]
(	
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[DiscountId] INT,
	[CreatedBy] INT NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	FOREIGN KEY (DiscountId) REFERENCES [dbo].[Discount](Id),
	FOREIGN KEY (CreatedBy) REFERENCES [dbo].[User](Id)
)
