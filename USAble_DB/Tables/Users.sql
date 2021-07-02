CREATE TABLE [dbo].[Users]
(
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[Username] INT NOT NULL UNIQUE,
	[FirstName] NVARCHAR(25) NOT NULL,
	[LastName] NVARCHAR(25) NOT NULL,
	[UserRoleId] INT NOT NULL,
	[Active] BIT NOT NULL,
	[CreatedBy] INT,
	[CreatedDate] DATETIME NOT NULL,
	[ModifiedDate] DATETIME,
	[ModifiedBy] INT,
	FOREIGN KEY (CreatedBy) REFERENCES [dbo].[Users](Id),
	FOREIGN KEY (ModifiedBy) REFERENCES [dbo].[Users](Id),
	FOREIGN KEY (UserRoleId) REFERENCES [dbo].[UserRoles](Id)
)
