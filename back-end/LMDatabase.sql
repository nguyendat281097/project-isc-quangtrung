USE [LIBRARYMANAGEMENT]
GO
/****** Object:  Table [dbo].[Authors]    Script Date: 8/23/2019 4:21:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Authors](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[BOT_ID] [int] NOT NULL,
	[authorName] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Books]    Script Date: 8/23/2019 4:21:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Books](
	[BO_ID] [int] IDENTITY(1,1) NOT NULL,
	[BOT_ID] [int] NOT NULL,
	[isBorrowHome] [bit] NOT NULL,
	[LIBA_ID] [int] NOT NULL,
	[dateImport] [date] NOT NULL,
 CONSTRAINT [PK__Books__3214EC277B415CC3] PRIMARY KEY CLUSTERED 
(
	[BO_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BookTitles]    Script Date: 8/23/2019 4:21:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BookTitles](
	[BOT_ID] [int] IDENTITY(1,1) NOT NULL,
	[bookTitleName] [nvarchar](max) NOT NULL,
	[edition] [int] NULL,
	[page] [int] NULL,
	[size] [int] NULL,
	[sublishingInfo] [nvarchar](max) NULL,
	[callNumber] [varchar](20) NOT NULL,
	[ISBN] [varchar](50) NOT NULL,
	[description] [ntext] NULL,
PRIMARY KEY CLUSTERED 
(
	[BOT_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Librarians]    Script Date: 8/23/2019 4:21:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Librarians](
	[LIBA_ID] [int] IDENTITY(1,1) NOT NULL,
	[fullName] [nvarchar](255) NOT NULL,
	[email] [varchar](255) NULL,
	[phone] [varchar](10) NULL,
	[userName] [varchar](50) NOT NULL,
	[password] [varchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[LIBA_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LoanSlipPayInfos]    Script Date: 8/23/2019 4:21:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoanSlipPayInfos](
	[LSPI_ID] [int] IDENTITY(1,1) NOT NULL,
	[LSP_ID] [int] NOT NULL,
	[BO_ID] [int] NOT NULL,
	[datePay] [date] NULL,
 CONSTRAINT [PK__LoanSlip__4600975F0B93011C] PRIMARY KEY CLUSTERED 
(
	[LSPI_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LoanSlipPays]    Script Date: 8/23/2019 4:21:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoanSlipPays](
	[LSP_ID] [int] IDENTITY(1,1) NOT NULL,
	[RD_ID] [int] NOT NULL,
	[LIBA_ID] [int] NOT NULL,
	[loanDate] [date] NOT NULL,
	[promisedDateToPay] [date] NULL,
 CONSTRAINT [PK__LoanSlip__29D6B8A4E41C4250] PRIMARY KEY CLUSTERED 
(
	[LSP_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Readers]    Script Date: 8/23/2019 4:21:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Readers](
	[RD_ID] [int] IDENTITY(1,1) NOT NULL,
	[fullName] [nvarchar](255) NOT NULL,
	[identityCardNumber] [varchar](10) NOT NULL,
	[gender] [bit] NULL,
	[address] [nvarchar](max) NULL,
	[dateOfBirth] [date] NULL,
	[email] [varchar](50) NULL,
	[phone] [varchar](10) NULL,
	[registrationDate] [date] NOT NULL,
	[image] [varchar](255) NULL,
	[userName] [varchar](50) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[RDT_ID] [varchar](8) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RD_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReaderTypes]    Script Date: 8/23/2019 4:21:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReaderTypes](
	[RDT_ID] [varchar](8) NOT NULL,
	[readerTypeName] [nvarchar](255) NOT NULL,
	[numberBookLoan] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RDT_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subjects]    Script Date: 8/23/2019 4:21:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subjects](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[BOT_ID] [int] NOT NULL,
	[subjectName] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Authors] ON 

INSERT [dbo].[Authors] ([ID], [BOT_ID], [authorName]) VALUES (1, 1, N'Daniel Lednicer')
INSERT [dbo].[Authors] ([ID], [BOT_ID], [authorName]) VALUES (2, 2, N'	Mary Jane Sterling')
INSERT [dbo].[Authors] ([ID], [BOT_ID], [authorName]) VALUES (3, 3, N'	Allene Tuck (edi)')
INSERT [dbo].[Authors] ([ID], [BOT_ID], [authorName]) VALUES (4, 3, N'Micheal Ashby')
INSERT [dbo].[Authors] ([ID], [BOT_ID], [authorName]) VALUES (5, 3, N'Sandra Pyne')
SET IDENTITY_INSERT [dbo].[Authors] OFF
SET IDENTITY_INSERT [dbo].[Books] ON 

INSERT [dbo].[Books] ([BO_ID], [BOT_ID], [isBorrowHome], [LIBA_ID], [dateImport]) VALUES (1, 1, 1, 1, CAST(N'2019-05-20' AS Date))
INSERT [dbo].[Books] ([BO_ID], [BOT_ID], [isBorrowHome], [LIBA_ID], [dateImport]) VALUES (2, 1, 1, 1, CAST(N'2019-05-20' AS Date))
INSERT [dbo].[Books] ([BO_ID], [BOT_ID], [isBorrowHome], [LIBA_ID], [dateImport]) VALUES (3, 2, 1, 1, CAST(N'2019-05-21' AS Date))
INSERT [dbo].[Books] ([BO_ID], [BOT_ID], [isBorrowHome], [LIBA_ID], [dateImport]) VALUES (4, 2, 1, 2, CAST(N'2019-05-22' AS Date))
INSERT [dbo].[Books] ([BO_ID], [BOT_ID], [isBorrowHome], [LIBA_ID], [dateImport]) VALUES (5, 3, 0, 2, CAST(N'2019-05-22' AS Date))
INSERT [dbo].[Books] ([BO_ID], [BOT_ID], [isBorrowHome], [LIBA_ID], [dateImport]) VALUES (6, 3, 1, 1, CAST(N'2019-05-22' AS Date))
SET IDENTITY_INSERT [dbo].[Books] OFF
SET IDENTITY_INSERT [dbo].[BookTitles] ON 

INSERT [dbo].[BookTitles] ([BOT_ID], [bookTitleName], [edition], [page], [size], [sublishingInfo], [callNumber], [ISBN], [description]) VALUES (1, N'New drug discovery and development', NULL, 190, 25, N'Wiley, 2007', N'615.19 L472/--07', N'0-470-00750-8/978-0-470-00750-1', N'A case history approach to drug synthesis and discovery

Discover the origins of some of today’s most popular drug therapies. Explore case histories and gain insight into major classes of antibiotics, antiviral drugs, analgesics, steroids, compounds designed to lower cholesterol, and more. Review the steps required for FDA approval.  This is a great reference for students in medicinal chemistry, researchers in pharmaceuticals, and medical practitioners.')
INSERT [dbo].[BookTitles] ([BOT_ID], [bookTitleName], [edition], [page], [size], [sublishingInfo], [callNumber], [ISBN], [description]) VALUES (2, N'Algebra for dummies, portable edition
', NULL, 172, 22, N'Wiley, 2006', N'	512 S838/--06', N'0-470-05377-1/9780470053775', N'The pain-free way to tackle algebra – and come out smiling.

 Does the word polynomial make your hair stand on end? This friendly guide explains algebra basics - and the tougher stuff – in clear, easy-to-understand language. Whenever you want to boost your own algebra skills or help your kids with their homework, this book gives you power – to the nth degree.

 
Discover how to:

 
Find out about fractions and explore exponents
Figure out factoring
Solve linear equations
Factor quadratic equations
Solve story problems')
INSERT [dbo].[BookTitles] ([BOT_ID], [bookTitleName], [edition], [page], [size], [sublishingInfo], [callNumber], [ISBN], [description]) VALUES (3, N'Oxford dictionary of computing: For learner of English', 1, 400, NULL, N'Oxford University Press, 1996', N'004.03 P997/1e96', N'0-19-431441-3', NULL)
SET IDENTITY_INSERT [dbo].[BookTitles] OFF
SET IDENTITY_INSERT [dbo].[Librarians] ON 

INSERT [dbo].[Librarians] ([LIBA_ID], [fullName], [email], [phone], [userName], [password]) VALUES (1, N'Phong Thanh Sương', N'ptsuong@gmail.com', N'0123454321', N'ptsuong', N'123456')
INSERT [dbo].[Librarians] ([LIBA_ID], [fullName], [email], [phone], [userName], [password]) VALUES (2, N'Lệnh Hồ Xung', N'lhxung@gmail.com', N'0987656789', N'lhxung', N'123456')
SET IDENTITY_INSERT [dbo].[Librarians] OFF
SET IDENTITY_INSERT [dbo].[LoanSlipPayInfos] ON 

INSERT [dbo].[LoanSlipPayInfos] ([LSPI_ID], [LSP_ID], [BO_ID], [datePay]) VALUES (1, 1, 1, NULL)
INSERT [dbo].[LoanSlipPayInfos] ([LSPI_ID], [LSP_ID], [BO_ID], [datePay]) VALUES (2, 1, 2, NULL)
INSERT [dbo].[LoanSlipPayInfos] ([LSPI_ID], [LSP_ID], [BO_ID], [datePay]) VALUES (3, 2, 3, CAST(N'2019-08-30' AS Date))
INSERT [dbo].[LoanSlipPayInfos] ([LSPI_ID], [LSP_ID], [BO_ID], [datePay]) VALUES (4, 2, 4, NULL)
INSERT [dbo].[LoanSlipPayInfos] ([LSPI_ID], [LSP_ID], [BO_ID], [datePay]) VALUES (5, 2, 5, CAST(N'2019-08-25' AS Date))
SET IDENTITY_INSERT [dbo].[LoanSlipPayInfos] OFF
SET IDENTITY_INSERT [dbo].[LoanSlipPays] ON 

INSERT [dbo].[LoanSlipPays] ([LSP_ID], [RD_ID], [LIBA_ID], [loanDate], [promisedDateToPay]) VALUES (1, 1, 1, CAST(N'2019-08-20' AS Date), CAST(N'2019-09-10' AS Date))
INSERT [dbo].[LoanSlipPays] ([LSP_ID], [RD_ID], [LIBA_ID], [loanDate], [promisedDateToPay]) VALUES (2, 2, 1, CAST(N'2019-08-20' AS Date), CAST(N'2019-10-10' AS Date))
SET IDENTITY_INSERT [dbo].[LoanSlipPays] OFF
SET IDENTITY_INSERT [dbo].[Readers] ON 

INSERT [dbo].[Readers] ([RD_ID], [fullName], [identityCardNumber], [gender], [address], [dateOfBirth], [email], [phone], [registrationDate], [image], [userName], [password], [RDT_ID]) VALUES (1, N'Nguyễn Văn Đạt', N'215423894', 1, N'Đông Hòa, Dĩ An, Bình Dương', CAST(N'1997-10-28' AS Date), N'nguyendat260298@gmail.com', N'0969946771', CAST(N'2019-08-20' AS Date), NULL, N'vandat', N'123456', N'GVIEN')
INSERT [dbo].[Readers] ([RD_ID], [fullName], [identityCardNumber], [gender], [address], [dateOfBirth], [email], [phone], [registrationDate], [image], [userName], [password], [RDT_ID]) VALUES (2, N'Huỳnh Thị Như Ý', N'215423895', 0, N'Đông Hòa, Dĩ An, Bình Dương', CAST(N'1998-10-23' AS Date), N'nhuy@gmail.com', N'0123456789', CAST(N'2019-08-19' AS Date), NULL, N'nhuy', N'123456', N'SVIEN')
INSERT [dbo].[Readers] ([RD_ID], [fullName], [identityCardNumber], [gender], [address], [dateOfBirth], [email], [phone], [registrationDate], [image], [userName], [password], [RDT_ID]) VALUES (3, N'Lê Thị Thắm', N'215423896', 0, N'Thủ Đức, TP Hồ Chí Minh', CAST(N'1998-08-05' AS Date), N'lethitham@gmail.com', N'0987654321', CAST(N'2019-08-18' AS Date), NULL, N'lethitham', N'123456', N'SVIEN')
SET IDENTITY_INSERT [dbo].[Readers] OFF
INSERT [dbo].[ReaderTypes] ([RDT_ID], [readerTypeName], [numberBookLoan]) VALUES (N'GVIEN', N'Giảng viên', 5)
INSERT [dbo].[ReaderTypes] ([RDT_ID], [readerTypeName], [numberBookLoan]) VALUES (N'SVIEN', N'Sinh Viên', 3)
SET IDENTITY_INSERT [dbo].[Subjects] ON 

INSERT [dbo].[Subjects] ([ID], [BOT_ID], [subjectName]) VALUES (1, 1, N'Pharmaceutical chemistry')
INSERT [dbo].[Subjects] ([ID], [BOT_ID], [subjectName]) VALUES (2, 1, N'Drug development')
INSERT [dbo].[Subjects] ([ID], [BOT_ID], [subjectName]) VALUES (3, 2, N'algebra')
INSERT [dbo].[Subjects] ([ID], [BOT_ID], [subjectName]) VALUES (4, 3, N'	Dictionary')
INSERT [dbo].[Subjects] ([ID], [BOT_ID], [subjectName]) VALUES (5, 3, N'computers-- terminology')
INSERT [dbo].[Subjects] ([ID], [BOT_ID], [subjectName]) VALUES (6, 3, N'English language --Textbooks for foreign speakers')
SET IDENTITY_INSERT [dbo].[Subjects] OFF
ALTER TABLE [dbo].[Authors]  WITH CHECK ADD  CONSTRAINT [FK_BOT_AUTHORS] FOREIGN KEY([BOT_ID])
REFERENCES [dbo].[BookTitles] ([BOT_ID])
GO
ALTER TABLE [dbo].[Authors] CHECK CONSTRAINT [FK_BOT_AUTHORS]
GO
ALTER TABLE [dbo].[Books]  WITH CHECK ADD  CONSTRAINT [FK_BOT_BOOK] FOREIGN KEY([BOT_ID])
REFERENCES [dbo].[BookTitles] ([BOT_ID])
GO
ALTER TABLE [dbo].[Books] CHECK CONSTRAINT [FK_BOT_BOOK]
GO
ALTER TABLE [dbo].[Books]  WITH CHECK ADD  CONSTRAINT [FK_LIBA_BOOK] FOREIGN KEY([LIBA_ID])
REFERENCES [dbo].[Librarians] ([LIBA_ID])
GO
ALTER TABLE [dbo].[Books] CHECK CONSTRAINT [FK_LIBA_BOOK]
GO
ALTER TABLE [dbo].[LoanSlipPayInfos]  WITH CHECK ADD  CONSTRAINT [FK_BOOKS_LSPI] FOREIGN KEY([BO_ID])
REFERENCES [dbo].[Books] ([BO_ID])
GO
ALTER TABLE [dbo].[LoanSlipPayInfos] CHECK CONSTRAINT [FK_BOOKS_LSPI]
GO
ALTER TABLE [dbo].[LoanSlipPayInfos]  WITH CHECK ADD  CONSTRAINT [FK_LSP_LSPI] FOREIGN KEY([LSP_ID])
REFERENCES [dbo].[LoanSlipPays] ([LSP_ID])
GO
ALTER TABLE [dbo].[LoanSlipPayInfos] CHECK CONSTRAINT [FK_LSP_LSPI]
GO
ALTER TABLE [dbo].[LoanSlipPays]  WITH CHECK ADD  CONSTRAINT [FK_Librarian_LoanSlip] FOREIGN KEY([LIBA_ID])
REFERENCES [dbo].[Librarians] ([LIBA_ID])
GO
ALTER TABLE [dbo].[LoanSlipPays] CHECK CONSTRAINT [FK_Librarian_LoanSlip]
GO
ALTER TABLE [dbo].[LoanSlipPays]  WITH CHECK ADD  CONSTRAINT [FK_Reader_LoanSlip] FOREIGN KEY([RD_ID])
REFERENCES [dbo].[Readers] ([RD_ID])
GO
ALTER TABLE [dbo].[LoanSlipPays] CHECK CONSTRAINT [FK_Reader_LoanSlip]
GO
ALTER TABLE [dbo].[Readers]  WITH CHECK ADD  CONSTRAINT [FK_RDT_RD] FOREIGN KEY([RDT_ID])
REFERENCES [dbo].[ReaderTypes] ([RDT_ID])
GO
ALTER TABLE [dbo].[Readers] CHECK CONSTRAINT [FK_RDT_RD]
GO
ALTER TABLE [dbo].[Subjects]  WITH CHECK ADD  CONSTRAINT [FK_BOT_Subject] FOREIGN KEY([BOT_ID])
REFERENCES [dbo].[BookTitles] ([BOT_ID])
GO
ALTER TABLE [dbo].[Subjects] CHECK CONSTRAINT [FK_BOT_Subject]
GO
