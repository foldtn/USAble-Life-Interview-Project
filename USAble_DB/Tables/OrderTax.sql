CREATE TABLE [dbo].[OrderTax]
(
	[OrderId] INT NOT NULL,
	[TaxId] INT NOT NULL,
	PRIMARY KEY (OrderId, TaxId),
	FOREIGN KEY (OrderId) REFERENCES [dbo].[Order](Id),
	FOREIGN KEY (TaxId) REFERENCES [dbo].[Tax](Id)
)
