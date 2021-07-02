CREATE TABLE [dbo].[Orders]
(	
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[DiscountId] INT,
	[SubTotal] DECIMAL(7,2) NOT NULL,
	[PreTaxTotal] DECIMAL(7,2) NOT NULL,
	[TotalTaxAmount] DECIMAL(7,2) NOT NULL,
	[Total] DECIMAL(7,2) NOT NULL,
	[CreatedBy] INT NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	FOREIGN KEY (DiscountId) REFERENCES [dbo].[Discounts](Id),
	FOREIGN KEY (CreatedBy) REFERENCES [dbo].[Users](Id)
)
