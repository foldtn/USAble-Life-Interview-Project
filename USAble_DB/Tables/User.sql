CREATE TABLE [dbo].[User]
(
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[Username] NVARCHAR(255) NOT NULL UNIQUE,
	[FirstName] NVARCHAR(25) NOT NULL,
	[LastName] NVARCHAR(25) NOT NULL,
	[UserType] SMALLINT NOT NULL,
	[Active] BIT NOT NULL,
	[CreatedBy] INT NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	[ModifiedDate] DATETIME,
	[ModifiedBy] INT,
	FOREIGN KEY (CreatedBy) REFERENCES [dbo].[User](Id),
	FOREIGN KEY (ModifiedBy) REFERENCES [dbo].[User](Id)
)
