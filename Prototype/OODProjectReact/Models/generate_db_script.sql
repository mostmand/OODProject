CREATE TABLE [dbo].[User]
(
    [Id] INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [Username] VARCHAR(32) COLLATE SQL_Latin1_General_CP1_CS_AS NOT NULL UNIQUE,
    [Password] VARCHAR(32) COLLATE SQL_Latin1_General_CP1_CS_AS NOT NULL,
    ModifiedDate DATETIME DEFAULT (getdate())
)

CREATE TABLE [dbo].[LoginToken]
(
    [AuthenticationToken] UNIQUEIDENTIFIER NOT NULL,
    [UserId] INT NOT NULL UNIQUE,
    [LastAccess] DATETIME NOT NULL default(getDate()),
    PRIMARY KEY CLUSTERED ([AuthenticationToken] ASC),
    CONSTRAINT [FK_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
);