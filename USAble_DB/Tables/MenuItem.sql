CREATE TABLE [dbo].[MenuItem]
(
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[Name] NVARCHAR(25) NOT NULL UNIQUE,
	[Cost] SMALLMONEY NOT NULL,
	[MenuItemCategoryId] INT,
	[Active] BIT NOT NULL,
	[CreatedBy] INT NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	[ModifiedBy] INT,
	[ModifiedDate] DATETIME,
	FOREIGN KEY (MenuItemCategoryId) REFERENCES [dbo].[MenuItemCategory](Id),
	FOREIGN KEY (CreatedBy) REFERENCES [dbo].[User](Id),
	FOREIGN KEY (ModifiedBy) REFERENCES [dbo].[User](Id)
)
