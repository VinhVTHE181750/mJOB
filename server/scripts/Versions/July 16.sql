USE [master]
GO
/****** Object:  Database [mJob]    Script Date: 7/16/2024 9:14:59 AM ******/
CREATE DATABASE [mJob]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'mJob', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\mJob.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'mJob_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\mJob_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [mJob] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [mJob].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [mJob] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [mJob] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [mJob] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [mJob] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [mJob] SET ARITHABORT OFF 
GO
ALTER DATABASE [mJob] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [mJob] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [mJob] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [mJob] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [mJob] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [mJob] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [mJob] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [mJob] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [mJob] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [mJob] SET  ENABLE_BROKER 
GO
ALTER DATABASE [mJob] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [mJob] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [mJob] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [mJob] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [mJob] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [mJob] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [mJob] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [mJob] SET RECOVERY FULL 
GO
ALTER DATABASE [mJob] SET  MULTI_USER 
GO
ALTER DATABASE [mJob] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [mJob] SET DB_CHAINING OFF 
GO
ALTER DATABASE [mJob] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [mJob] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [mJob] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [mJob] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'mJob', N'ON'
GO
ALTER DATABASE [mJob] SET QUERY_STORE = ON
GO
ALTER DATABASE [mJob] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [mJob]
GO
/****** Object:  Table [dbo].[Applications]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Applications](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[status] [varchar](255) NULL,
	[date] [datetimeoffset](7) NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
	[JobId] [int] NULL,
	[UserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Auths]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Auths](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[hash] [nvarchar](128) NULL,
	[salt] [nvarchar](64) NOT NULL,
	[role] [varchar](255) NULL,
	[code] [nvarchar](6) NULL,
	[isActivated] [bit] NULL,
	[isLocked] [bit] NULL,
	[lockExpires] [datetimeoffset](7) NULL,
	[isOnline] [bit] NULL,
	[lastOnline] [datetimeoffset](7) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
	[UserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Balances]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Balances](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[balance] [decimal](10, 2) NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
	[UserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CategoryMetrics]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CategoryMetrics](
	[PostCategoryId] [int] NOT NULL,
	[day] [date] NOT NULL,
	[searches] [int] NULL,
	[views] [int] NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PostCategoryId] ASC,
	[day] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CommentLikes]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CommentLikes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[isDislike] [bit] NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[CommentId] [int] NULL,
	[UserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CommentMetrics]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CommentMetrics](
	[CommentId] [int] NOT NULL,
	[day] [date] NOT NULL,
	[likes] [int] NULL,
	[dislikes] [int] NULL,
	[updates] [int] NULL,
	[reports] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[CommentId] ASC,
	[day] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comments]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comments](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[content] [nvarchar](255) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
	[deletedAt] [datetimeoffset](7) NULL,
	[PostId] [int] NULL,
	[UserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Compensations]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Compensations](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[from] [int] NOT NULL,
	[to] [int] NOT NULL,
	[amount] [int] NOT NULL,
	[nextPayment] [datetimeoffset](7) NOT NULL,
	[status] [varchar](255) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
	[JobId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ForumMetrics]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ForumMetrics](
	[UserId] [int] NOT NULL,
	[postCreated] [int] NOT NULL,
	[commentCreated] [int] NOT NULL,
	[postDeleted] [int] NOT NULL,
	[commentDeleted] [int] NOT NULL,
	[postUpdated] [int] NOT NULL,
	[commentUpdated] [int] NOT NULL,
	[postLiked] [int] NOT NULL,
	[commentLiked] [int] NOT NULL,
	[postDisliked] [int] NOT NULL,
	[commentDisliked] [int] NOT NULL,
	[postReported] [int] NOT NULL,
	[commentReported] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[JobHistories]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobHistories](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[action] [varchar](255) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
	[JobId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Jobs]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Jobs](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[description] [nvarchar](255) NOT NULL,
	[location] [nvarchar](255) NOT NULL,
	[tags] [nvarchar](255) NULL,
	[maxApplicants] [int] NOT NULL,
	[recruitments] [int] NOT NULL,
	[approvalMethod] [bit] NOT NULL,
	[contact] [nvarchar](255) NULL,
	[startDate] [datetimeoffset](7) NOT NULL,
	[endDate] [datetimeoffset](7) NOT NULL,
	[paid] [bit] NOT NULL,
	[salary] [int] NULL,
	[salaryType] [varchar](255) NULL,
	[salaryCurrency] [nvarchar](255) NULL,
	[status] [varchar](255) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
	[deletedAt] [datetimeoffset](7) NULL,
	[UserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PaymentHistories]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentHistories](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[from] [nvarchar](255) NULL,
	[to] [nvarchar](255) NULL,
	[amount] [float] NULL,
	[onPlatform] [bit] NULL,
	[action] [varchar](255) NULL,
	[status] [varchar](255) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[UserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostCategories]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostCategories](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[fgColor] [nvarchar](6) NOT NULL,
	[bgColor] [nvarchar](6) NOT NULL,
	[enabled] [bit] NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostHistories]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostHistories](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[content] [nvarchar](max) NOT NULL,
	[tags] [nvarchar](255) NULL,
	[action] [varchar](255) NULL,
	[status] [varchar](255) NULL,
	[PostCategoryId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[PostId] [int] NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostLikes]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostLikes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[isDislike] [bit] NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[PostId] [int] NULL,
	[UserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostMetrics]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostMetrics](
	[PostId] [int] NOT NULL,
	[day] [date] NOT NULL,
	[likes] [int] NULL,
	[dislikes] [int] NULL,
	[comments] [int] NULL,
	[views] [int] NULL,
	[updates] [int] NULL,
	[reports] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[PostId] ASC,
	[day] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Posts]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Posts](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[content] [nvarchar](255) NOT NULL,
	[tags] [nvarchar](255) NULL,
	[status] [varchar](255) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
	[deletedAt] [datetimeoffset](7) NULL,
	[PostCategoryId] [int] NULL,
	[UserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostTags]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostTags](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PublicChatMessages]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PublicChatMessages](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[content] [nvarchar](max) NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[deletedAt] [datetimeoffset](7) NULL,
	[PublicRoomUserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PublicChatMetrics]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PublicChatMetrics](
	[RoomId] [int] NOT NULL,
	[day] [date] NOT NULL,
	[messages] [int] NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
	[PublicChatRoomId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[RoomId] ASC,
	[day] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PublicChatRooms]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PublicChatRooms](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[isLocked] [bit] NULL,
	[requiredRole] [varchar](255) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PublicRoomUsers]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PublicRoomUsers](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[PublicChatRoomId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [PublicRoomUsers_PublicChatRoomId_UserId_unique] UNIQUE NONCLUSTERED 
(
	[UserId] ASC,
	[PublicChatRoomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Requirements]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Requirements](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[type] [varchar](255) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
	[JobId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RequirementStorages]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RequirementStorages](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[data] [nvarchar](max) NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
	[RequirementId] [int] NULL,
	[UserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TagMetrics]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TagMetrics](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[day] [date] NOT NULL,
	[searches] [int] NULL,
	[views] [int] NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[PostTagId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](255) NOT NULL,
	[email] [nvarchar](255) NULL,
	[phone] [nvarchar](255) NULL,
	[citizenId] [nvarchar](255) NULL,
	[firstName] [nvarchar](255) NULL,
	[lastName] [nvarchar](255) NULL,
	[dob] [datetimeoffset](7) NULL,
	[address] [nvarchar](255) NULL,
	[avatar] [nvarchar](255) NULL,
	[bio] [nvarchar](255) NULL,
	[isStudent] [bit] NULL,
	[isMuted] [bit] NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkExperiences]    Script Date: 7/16/2024 9:14:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkExperiences](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[company] [nvarchar](255) NOT NULL,
	[location] [nvarchar](255) NOT NULL,
	[startDate] [datetimeoffset](7) NOT NULL,
	[endDate] [datetimeoffset](7) NULL,
	[description] [nvarchar](255) NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
	[UserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Auths] ADD  DEFAULT ((0)) FOR [isActivated]
GO
ALTER TABLE [dbo].[Auths] ADD  DEFAULT ((0)) FOR [isLocked]
GO
ALTER TABLE [dbo].[Auths] ADD  DEFAULT ((0)) FOR [isOnline]
GO
ALTER TABLE [dbo].[Balances] ADD  DEFAULT ((0)) FOR [balance]
GO
ALTER TABLE [dbo].[CategoryMetrics] ADD  DEFAULT ((0)) FOR [searches]
GO
ALTER TABLE [dbo].[CategoryMetrics] ADD  DEFAULT ((0)) FOR [views]
GO
ALTER TABLE [dbo].[ForumMetrics] ADD  DEFAULT ((0)) FOR [postCreated]
GO
ALTER TABLE [dbo].[ForumMetrics] ADD  DEFAULT ((0)) FOR [commentCreated]
GO
ALTER TABLE [dbo].[ForumMetrics] ADD  DEFAULT ((0)) FOR [postDeleted]
GO
ALTER TABLE [dbo].[ForumMetrics] ADD  DEFAULT ((0)) FOR [commentDeleted]
GO
ALTER TABLE [dbo].[ForumMetrics] ADD  DEFAULT ((0)) FOR [postUpdated]
GO
ALTER TABLE [dbo].[ForumMetrics] ADD  DEFAULT ((0)) FOR [commentUpdated]
GO
ALTER TABLE [dbo].[ForumMetrics] ADD  DEFAULT ((0)) FOR [postLiked]
GO
ALTER TABLE [dbo].[ForumMetrics] ADD  DEFAULT ((0)) FOR [commentLiked]
GO
ALTER TABLE [dbo].[ForumMetrics] ADD  DEFAULT ((0)) FOR [postDisliked]
GO
ALTER TABLE [dbo].[ForumMetrics] ADD  DEFAULT ((0)) FOR [commentDisliked]
GO
ALTER TABLE [dbo].[ForumMetrics] ADD  DEFAULT ((0)) FOR [postReported]
GO
ALTER TABLE [dbo].[ForumMetrics] ADD  DEFAULT ((0)) FOR [commentReported]
GO
ALTER TABLE [dbo].[Jobs] ADD  DEFAULT ((1)) FOR [maxApplicants]
GO
ALTER TABLE [dbo].[Jobs] ADD  DEFAULT ((1)) FOR [recruitments]
GO
ALTER TABLE [dbo].[Jobs] ADD  DEFAULT ((0)) FOR [paid]
GO
ALTER TABLE [dbo].[PaymentHistories] ADD  DEFAULT ((1)) FOR [onPlatform]
GO
ALTER TABLE [dbo].[PostCategories] ADD  DEFAULT ((0)) FOR [enabled]
GO
ALTER TABLE [dbo].[PublicChatMetrics] ADD  DEFAULT ((0)) FOR [messages]
GO
ALTER TABLE [dbo].[PublicChatRooms] ADD  DEFAULT ((0)) FOR [isLocked]
GO
ALTER TABLE [dbo].[TagMetrics] ADD  DEFAULT ((0)) FOR [searches]
GO
ALTER TABLE [dbo].[TagMetrics] ADD  DEFAULT ((0)) FOR [views]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [isStudent]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [isMuted]
GO
ALTER TABLE [dbo].[Applications]  WITH CHECK ADD FOREIGN KEY([JobId])
REFERENCES [dbo].[Jobs] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Applications]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Auths]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Balances]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[CategoryMetrics]  WITH CHECK ADD FOREIGN KEY([PostCategoryId])
REFERENCES [dbo].[PostCategories] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CommentLikes]  WITH CHECK ADD FOREIGN KEY([CommentId])
REFERENCES [dbo].[Comments] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[CommentLikes]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[CommentMetrics]  WITH CHECK ADD FOREIGN KEY([CommentId])
REFERENCES [dbo].[Comments] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD FOREIGN KEY([PostId])
REFERENCES [dbo].[Posts] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Compensations]  WITH CHECK ADD FOREIGN KEY([JobId])
REFERENCES [dbo].[Jobs] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Compensations]  WITH CHECK ADD FOREIGN KEY([from])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Compensations]  WITH CHECK ADD FOREIGN KEY([to])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[ForumMetrics]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[JobHistories]  WITH CHECK ADD FOREIGN KEY([JobId])
REFERENCES [dbo].[Jobs] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Jobs]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[PaymentHistories]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[PostHistories]  WITH CHECK ADD FOREIGN KEY([PostCategoryId])
REFERENCES [dbo].[PostCategories] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PostHistories]  WITH CHECK ADD FOREIGN KEY([PostId])
REFERENCES [dbo].[Posts] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PostHistories]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[PostLikes]  WITH CHECK ADD FOREIGN KEY([PostId])
REFERENCES [dbo].[Posts] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[PostLikes]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[PostMetrics]  WITH CHECK ADD FOREIGN KEY([PostId])
REFERENCES [dbo].[Posts] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Posts]  WITH CHECK ADD FOREIGN KEY([PostCategoryId])
REFERENCES [dbo].[PostCategories] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Posts]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[PublicChatMessages]  WITH CHECK ADD FOREIGN KEY([PublicRoomUserId])
REFERENCES [dbo].[PublicRoomUsers] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[PublicChatMetrics]  WITH CHECK ADD FOREIGN KEY([PublicChatRoomId])
REFERENCES [dbo].[PublicChatRooms] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[PublicChatMetrics]  WITH CHECK ADD FOREIGN KEY([RoomId])
REFERENCES [dbo].[PublicChatRooms] ([id])
GO
ALTER TABLE [dbo].[PublicRoomUsers]  WITH CHECK ADD FOREIGN KEY([PublicChatRoomId])
REFERENCES [dbo].[PublicChatRooms] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PublicRoomUsers]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Requirements]  WITH CHECK ADD FOREIGN KEY([JobId])
REFERENCES [dbo].[Jobs] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[RequirementStorages]  WITH CHECK ADD FOREIGN KEY([RequirementId])
REFERENCES [dbo].[Requirements] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[RequirementStorages]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[TagMetrics]  WITH CHECK ADD FOREIGN KEY([PostTagId])
REFERENCES [dbo].[PostTags] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[WorkExperiences]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Applications]  WITH CHECK ADD CHECK  (([status]=N'COMPLETED' OR [status]=N'ONGOING' OR [status]=N'REJECTED' OR [status]=N'ACCEPTED' OR [status]=N'PENDING'))
GO
ALTER TABLE [dbo].[Auths]  WITH CHECK ADD CHECK  (([role]=N'ADMIN' OR [role]=N'MOD' OR [role]=N'SUPPORT' OR [role]=N'USER'))
GO
ALTER TABLE [dbo].[Compensations]  WITH CHECK ADD CHECK  (([status]=N'OVERDUE' OR [status]=N'PAID' OR [status]=N'PENDING'))
GO
ALTER TABLE [dbo].[JobHistories]  WITH CHECK ADD CHECK  (([action]=N'PUBLISH' OR [action]=N'DELIST' OR [action]=N'DELETE' OR [action]=N'UPDATE' OR [action]=N'CREATE' OR [action]=N'COMPLETE' OR [action]=N'START' OR [action]=N'CANCEL' OR [action]=N'REJECT' OR [action]=N'ACCEPT' OR [action]=N'APPLY'))
GO
ALTER TABLE [dbo].[Jobs]  WITH CHECK ADD CHECK  (([salaryType]=N'PERCENTAGE' OR [salaryType]=N'ONCE' OR [salaryType]=N'MONTHLY' OR [salaryType]=N'WEEKLY' OR [salaryType]=N'DAILY' OR [salaryType]=N'HOURLY'))
GO
ALTER TABLE [dbo].[Jobs]  WITH CHECK ADD CHECK  (([status]=N'COMPLETED' OR [status]=N'ONGOING' OR [status]=N'DELISTED' OR [status]=N'INACTIVE' OR [status]=N'ACTIVE'))
GO
ALTER TABLE [dbo].[PaymentHistories]  WITH CHECK ADD CHECK  (([action]=N'CLOSE' OR [action]=N'OPEN' OR [action]=N'TRANSFER' OR [action]=N'WITHDRAW' OR [action]=N'DEPOSIT'))
GO
ALTER TABLE [dbo].[PaymentHistories]  WITH CHECK ADD CHECK  (([status]=N'PAUSED' OR [status]=N'FAILED' OR [status]=N'SUCCESS'))
GO
ALTER TABLE [dbo].[PostHistories]  WITH CHECK ADD CHECK  (([action]=N'PUBLISH' OR [action]=N'DELIST' OR [action]=N'DRAFT' OR [action]=N'DELETE' OR [action]=N'UPDATE'))
GO
ALTER TABLE [dbo].[PostHistories]  WITH CHECK ADD CHECK  (([status]=N'DELISTED' OR [status]=N'PUBLISHED' OR [status]=N'DRAFT'))
GO
ALTER TABLE [dbo].[Posts]  WITH CHECK ADD CHECK  (([status]=N'DELISTED' OR [status]=N'DRAFT' OR [status]=N'PUBLISHED'))
GO
ALTER TABLE [dbo].[PublicChatRooms]  WITH CHECK ADD CHECK  (([requiredRole]=N'ADMIN' OR [requiredRole]=N'SUPPORT' OR [requiredRole]=N'STAFF' OR [requiredRole]=N'USER'))
GO
ALTER TABLE [dbo].[Requirements]  WITH CHECK ADD CHECK  (([type]=N'FILE' OR [type]=N'TEXT'))
GO
USE [master]
GO
ALTER DATABASE [mJob] SET  READ_WRITE 
GO
