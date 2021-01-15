## eGfr

USE [ORRSDB_DEV1_Automation_Nasser]
GO

/****** Object:  UserDefinedFunction [dbo].[fcn_get_eGFR_EPI_HighPrecision]    Script Date: 02/11/2020 11:34:19 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[fcn_get_eGFR_EPI_HighPrecision]
(	
	@creatinine numeric(18, 5),
	@dob DATETIME,
	@treatmentDate DATETIME,
	@raceCD varchar(1),
	@genderCD varchar(1)
)
RETURNS numeric(24, 10)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	-- SET NOCOUNT ON;
	-- SELECT [dbo].fcn_get_eGFR(555, '2000-01-01', '2016-05-01', '3', 'F')

	-- Check if @creatinine is zero then return -1. Otherwise POWER(0, -1.154) for example throws diveded by zero error
	--if (ABS(@creatinine)<0.00000001) return null;
	IF ((ABS(@creatinine)<0.00000001) OR (FLOOR(ABS(@creatinine))= 9999)) return -1;

	DECLARE @eGFR numeric(24, 10)
	DECLARE @eGFRType varchar(4)
	DECLARE @Age Float
	-- For MDRD
	
	-- set R5 Date
	SELECT @Age = CAST(DATEDIFF(day, @dob, @treatmentDate) as Float) / CAST(365.25 as Float)
	IF @Age <= 0
	BEGIN
		SET @Age = CAST(0.000001 as Float)
	END
	
	-- For non-binary gender, make sure to use Female for a more generous eGFR result for MCKC criteria
	IF @genderCD = 'O' OR  @genderCD = 'U' OR @genderCD IS NULL BEGIN SET @genderCD = 'F' END


	IF @genderCD = 'F'
		BEGIN
			DECLARE @FemaleCreatinineResult float = CAST(@creatinine as Float)/ CAST(0.7 as Float) / CAST(88.4 as Float)
			DECLARE @MinFemaleCreatinineResult float = CASE 
										WHEN @FemaleCreatinineResult < 1 THEN  
											@FemaleCreatinineResult
										ELSE 
											1 
										END
			DECLARE @MaxFemaleCreatinineResult float = CASE 
										WHEN @FemaleCreatinineResult > 1 THEN  
											@FemaleCreatinineResult 
										ELSE 
											1 
										END
			SET @eGFR = CAST(141 as Float)
					* POWER (@MinFemaleCreatinineResult, CAST(-0.329 as Float))
					* POWER (@MaxFemaleCreatinineResult, CAST(-1.209 as Float))
					* POWER(CAST(0.993 as Float), @Age) 
					* CAST(1.018 as Float)
					* CAST(CASE @raceCD WHEN 3 THEN 1.159 ELSE 1 END as Float)
		END
	ELSE
		BEGIN
			DECLARE @MaleCreatinineResult float = CAST(@creatinine as Float)/ CAST(0.9 as Float) / CAST(88.4 as Float)
			DECLARE @MinMaleCreatinineResult float = CASE 
										WHEN @MaleCreatinineResult < 1 THEN  
											@MaleCreatinineResult 
										ELSE 
											1 
										END
			DECLARE @MaxMaleCreatinineResult float = CASE 
										WHEN @MaleCreatinineResult > 1 THEN  
											@MaleCreatinineResult 
										ELSE 
											1 
										END
			SET @eGFR = CAST(141 as Float)
					* POWER (@MinMaleCreatinineResult, CAST(-0.411 as Float))
					* POWER (@MaxMaleCreatinineResult, CAST(-1.209 as Float))
					* POWER(CAST(0.993 as Float), @Age) 
					* CAST(CASE @raceCD WHEN 3 THEN 1.159 ELSE 1 END as Float)
		END
	
	--INSERT INTO @result 
	--SELECT @eGFR AS eGFR, @eGFRType AS eGFRType
	--RETURN;
	RETURN @eGFR
END

GO



# KFR


USE [ORRSDB_DEV1_Automation_Nasser]
GO

/****** Object:  UserDefinedFunction [dbo].[fcn_get_KFR]    Script Date: 02/11/2020 11:32:51 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[fcn_get_KFR] 
(
	@creatinine numeric(18, 5),
	@dob DATETIME,
	@treatmentDate DATETIME,
	@proteinuria numeric(6, 2),
	@raceCD varchar(1),
	@genderCD varchar(1)
)
RETURNS numeric(5, 2)
AS
BEGIN

	DECLARE @kfr_adj_genderCD varchar(1) = @genderCD
	-- For non-binary gender, make sure to use Female for a more generous eGFR result for MCKC criteria
	IF @kfr_adj_genderCD = 'O' OR  @kfr_adj_genderCD = 'U' OR @kfr_adj_genderCD IS NULL BEGIN SET @kfr_adj_genderCD = 'M' END

x = (dbo.fcn_get_eGFR_EPI_HighPrecision(@creatinine, @dob, @treatmentDate, @raceCD, @genderCD)/5 - 7.222)
y = (( CASE WHEN @kfr_adj_genderCD = 'M' THEN 1 ELSE 0 END ) - 0.5642)
z = (cast(DATEDIFF(day, @dob, @treatmentDate) as float)/365.25/10 - 7.036)
	-- Declare the return variable here
	DECLARE @kfr numeric(5, 2) = ROUND( (1 - POWER(	0.975
													, EXP(-0.2201 * z 
															+ 0.2467 * y 
															- 0.5567 * x 
															+ 0.4510 * (log(@proteinuria * 8.84) - 5.137)) 
													)
											) * 100
										, 1
										, 1)
	-- Return the result of the function
	RETURN @kfr
END

GO


