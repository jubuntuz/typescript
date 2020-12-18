use ORRSDB_FEATURE2_DEV
INSERT INTO [dbo].[Users]
           ([UserID]
           ,[UserName]
           ,[FirstName]
           ,[LastName]
           ,[StatusCD]
           ,[CreateDateTime]
           ,[CreateUserId]
           ,[UpdateDateTime]
           ,[UpdateUserId]
           ,[EULAId]
           ,[DefaultGroupId]
           ,[Domain])
     VALUES(
           '723f916f-8fc1-4412-b690-45653752e071'
           ,'asmeliov'
           ,'Alexandr'
           ,'Smeliov'
           ,'O'
           ,'2017-11-09 10:00:00.000'
           ,'723f916f-8fc1-4412-b690-45653752e071'
           ,'2017-11-09 10:00:00.000'
           ,'723f916f-8fc1-4412-b690-45653752e071'
           ,4
           ,1
           ,'CCODSQA')
GO
INSERT INTO [dbo].[UserGroups]
           ([UserId]
           ,[GroupId]
           ,[CreateUserId]
           ,[CreateDateTime]
           ,[UpdateUserId]
           ,[UpdateDateTime])
     VALUES
           ('723f916f-8fc1-4412-b690-45653752e071'
           ,1
           ,'723f916f-8fc1-4412-b690-45653752e071'
           ,'2017-11-09 10:00:00.000'
           ,'723f916f-8fc1-4412-b690-45653752e071'
           ,'2017-11-09 10:00:00.000')
GO 
