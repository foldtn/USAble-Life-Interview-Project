CREATE TABLE [dbo].[MenuItemCategories]
(
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[Name] NVARCHAR(25) NOT NULL,
	[Active] BIT NOT NULL,
	[CreatedBy] INT NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	[ModifiedBy] INT,
	[ModifiedDate] DATETIME,
	FOREIGN KEY (CreatedBy) REFERENCES [dbo].[Users](Id),
	FOREIGN KEY (ModifiedBy) REFERENCES [dbo].[Users](Id)
)
