CREATE TABLE [dbo].[UserPasswords]
(
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[Password] NVARCHAR(72) NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	[Active] BIT NOT NULL,
	[UserId] INT NOT NULL,
	FOREIGN KEY (UserId) REFERENCES [dbo].[Users](Id)
)
