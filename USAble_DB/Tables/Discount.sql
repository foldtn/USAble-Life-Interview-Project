CREATE TABLE [dbo].[Discount]
(	
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[Name] NVARCHAR(25) NOT NULL UNIQUE,
	[Amount] DECIMAL(5,2) NOT NULL,
	[DiscountType] BIT NOT NULL,
	[Active] BIT NOT NULL,
	[CreatedBy] INT NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	[ModifiedBy] INT,
	[ModifiedDate] DATETIME,
	FOREIGN KEY (CreatedBy) REFERENCES [dbo].[User](Id),
	FOREIGN KEY (ModifiedBy) REFERENCES [dbo].[User](Id)
)
