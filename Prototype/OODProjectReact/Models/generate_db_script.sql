CREATE TABLE [dbo].[Person]
(
    [Id] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [Name] VARCHAR(100) NULL,
    [LastName] VARCHAR(100) NULL,
    [MobileNumber] VARCHAR(10) NOT NULL UNIQUE,
    [CreationDate] DATETIME2 NOT NULL DEFAULT(getdate()),
    [IsLegalPerson] BIT NOT NULL DEFAULT(0),
    [Balance] INT NOT NULL DEFAULT(0)
);

CREATE TABLE [dbo].[User]
(
    [Id] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [Username] VARCHAR(32) COLLATE SQL_Latin1_General_CP1_CS_AS NOT NULL UNIQUE,
    [Password] VARCHAR(32) COLLATE SQL_Latin1_General_CP1_CS_AS NOT NULL,
    [Email] VARCHAR(100) NULL UNIQUE,
    [NationalIDCode] VARCHAR(10),
    [IsAdmin] BIT NOT NULL DEFAULT(0),
    [PersonId] INT NULL UNIQUE,
    CONSTRAINT [FK_User_PersonId] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[Person] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE [dbo].[LoginToken]
(
    [AuthenticationToken] UNIQUEIDENTIFIER NOT NULL,
    [UserId] INT NOT NULL UNIQUE,
    [LastAccess] DATETIME NOT NULL default(getDate()),
    PRIMARY KEY CLUSTERED ([AuthenticationToken] ASC),
    CONSTRAINT [FK_LoginToken_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE [dbo].[Invoice]
(
    [Id] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [Date] DATETIME2 NOT NULL DEFAULT(getdate()),
    [Fee] INT NOT NULL DEFAULT(0),
    [UserId] INT NOT NULL,
    CONSTRAINT [FK_Invoice_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE [dbo].[Good]
(
    [Id] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [SKU] VARCHAR(13) NOT NULL UNIQUE,
    [Name] VARCHAR(255) NOT NULL,
    [Price] INT NOT NULL DEFAULT(0),
    [Quantity] INT NOT NULL DEFAULT(0),
    [Discount] INT NOT NULL DEFAULT(0),
    [Explanation] VARCHAR(MAX) NULL 
);

CREATE TABLE [dbo].[InvoiceItem]
(
    [Id] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [InvoiceId] INT NOT NULL,
    [GoodId] INT NOT NULL,
    [GoodName] VARCHAR(255) NOT NULL,
    [GoodPrice] INT NOT NULL,
    [Quantity] INT NOT NULL,
    [Discount] INT NULL,
    [TotalPrice] INT NOT NULL,
    CONSTRAINT [FK_InvoiceItem_InvoiceId] FOREIGN KEY ([InvoiceId]) REFERENCES [dbo].[Invoice] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT [FK_InvoiceItem_GoodId] FOREIGN KEY ([GoodId]) REFERENCES [dbo].[Good] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE [dbo].[Category]
(
    [Id] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [ParentCategoryId] INT NULL,
    CONSTRAINT [FK_Category_ParentCategoryId] FOREIGN KEY ([ParentCategoryId]) REFERENCES [dbo].[Category] ([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE [dbo].[Good_Category]
(
    [GoodId] INT NOT NULL,
    [CategoryId] INT NOT NULL,
    CONSTRAINT [FK_Good_Category_GoodId] FOREIGN KEY ([GoodId]) REFERENCES [dbo].[Good] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT [FK_Good_Category_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Category] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE [dbo].[Customer]
(
    [Id] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [CustomerRate] INT NOT NULL DEFAULT(0),
    [Balance] INT NOT NULL DEFAULT(0),
    [TotalPurchaseFee] INT NOT NULL DEFAULT(0),
    [PersonId] INT NOT NULL,
    CONSTRAINT [FK_Customer_PersonId] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[Person] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE [dbo].[Supplier]
(
    [Id] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [Address] VARCHAR(255) NULL,
    [Balance] INT NOT NULL DEFAULT(0),
    [TotalSellFee] INT NOT NULL DEFAULT(0),
    [PersonId] INT NOT NULL,
    CONSTRAINT [FK_Supplier_PersonId] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[Person] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE [dbo].[PurchaseInvoice]
(
    [Id] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [InvoiceId] INT NOT NULL,
    [SupplierId] INT NOT NULL,
    CONSTRAINT [FK_PurchaseInvoice_InvoiceId] FOREIGN KEY ([InvoiceId]) REFERENCES [dbo].[Invoice] ([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT [FK_PurchaseInvoice_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [dbo].[Supplier] ([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE [dbo].[SellInvoice]
(
    [Id] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [InvoiceId] INT NOT NULL,
    [CustomerId] INT NOT NULL,
    CONSTRAINT [FK_SellInvoice_InvoiceId] FOREIGN KEY ([InvoiceId]) REFERENCES [dbo].[Invoice] ([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT [FK_SellInvoice_CustomerId] FOREIGN KEY ([CustomerId]) REFERENCES [dbo].[Customer] ([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE [dbo].[Payment]
(
    [Id] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [Date] DATETIME2 NOT NULL DEFAULT(getdate()),
    [Amount] INT NOT NULL,
);

CREATE TABLE [dbo].[CustomerPayment]
(
    [PaymentId] INT NOT NULL,
    [SellInvoiceId] INT NOT NULL,
    CONSTRAINT [FK_CustomerPayment_PaymentId] FOREIGN KEY ([PaymentId]) REFERENCES [dbo].[Payment] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT [FK_CustomerPayment_SellInvoiceId] FOREIGN KEY ([SellInvoiceId]) REFERENCES [dbo].[SellInvoice] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE [dbo].[SupplierPayment]
(
    [PaymentId] INT NOT NULL,
    [PurchaseInvoiceId] INT NOT NULL,
    CONSTRAINT [FK_SupplierPayment_PaymentId] FOREIGN KEY ([PaymentId]) REFERENCES [dbo].[Payment] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT [FK_SupplierPayment_PurchaseInvoiceId] FOREIGN KEY ([PurchaseInvoiceId]) REFERENCES [dbo].[PurchaseInvoice] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE [dbo].[PeriodDiscount]
(
    [Id] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [StartDate] DATETIME2 NOT NULL,
    [EndDate] DATETIME2 NOT NULL,
    [Discount] INT NOT NULL DEFAULT(0),
    [MinAmount] INT NULL,
    [MaxAmount] INT NULL,
    [UserId] INT NOT NULL,
    CONSTRAINT [FK_PeriodDiscount_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
);