CREATE TABLE [dbo].[OrderTaxes]
(
	[OrderId] INT NOT NULL,
	[TaxId] INT NOT NULL,
	PRIMARY KEY (OrderId, TaxId),
	FOREIGN KEY (OrderId) REFERENCES [dbo].[Orders](Id),
	FOREIGN KEY (TaxId) REFERENCES [dbo].[Taxes](Id)
)
