only these hospitals can do transplant - HSC, JHH,  KGH, TOH, LHS, SMH, UHN



select * from ModalityLocationType
select * from modality where ModalityCORRCD = '281'
select * from locationtyperel where LocationCD = 'NHS'

select mlt.modality from locationtyperel lp
join LocationType lt on lt.LocationTypeID = lp.LocationTypeID
join ModalityLocationType mlt on mlt.LocationTypeID = lp.LocationTypeID


server name: `ORNTRN1ORDBS2`

ORRSTest1 - 0RRST3$T123! - KGH
ORRSTest2 - 0RRST3$T234! - LHS
ORRSTest3 - 0RRST3$T345! - JHH

UserName
ORRSTest3
UserName
ORRSTest2
UserName
ORRSTest1
DefaultGroupId
296
DefaultGroupId
297
DefaultGroupId
298

 IHF/Selfcare locations are excluded from reporting

## Pregnancy visit details

```sql
-- visit/clinical/diagnosis details
select pte.TreatmentChangeCD, pte.cTreatmentDate_wSortOrder, pte.LocationCD, pte.TreatmentChangeType, m.ModalityCORRCD, pte.TransferLocationCD, pte.OwnerLocationCD,pte.statusCD, pte.StatusReason,
    ppd.visittypeid, ppd.KFR, ppd.eGFR, ppd.Creatinine, 
    pmd.Proteinuria, 
    cpd.PregnancyWeek, cpd.PregnancyOutcomeDate 

from patientTreatmentEvent pte

left join modality m on m.modalityid = pte.modalityid

left join PatientPredlysSrvcDetails ppd on ppd.PatientTreatmentEventID = pte.PatientTreatmentEventID
left join PatientPredlysModalityDetails pmd on pmd.PatientTreatmentEventID = pte.PatientTreatmentEventID

left join ClinicVisitTreatmentDetails cd on cd.PatientTreatmentEventID = pte.PatientTreatmentEventID
left join ClinicVisitImmunosuppressiveTreatmentDetails imd on imd.PatientTreatmentEventID = pte.PatientTreatmentEventID

left join ClinicVisitPregnancyDetails cpd on cpd.PatientTreatmentEventID = pte.PatientTreatmentEventID

left join ClinicVisitGCAssessmentDetails gcd on gcd.PatientTreatmentEventID = pte.PatientTreatmentEventID
left join ClinicVisitTDAssessmentDetails tdd on tdd.PatientTreatmentEventID = pte.PatientTreatmentEventID

left join ClinicVisitIDAssessmentDetails idd on idd.PatientTreatmentEventID = pte.PatientTreatmentEventID 
left join ClinicVisitVAAssessmentDetails vad on vad.PatientTreatmentEventID = pte.PatientTreatmentEventID

left join ClinicVisitVGDiagnosisDetails vgd on vgd.PatientTreatmentEventID = pte.PatientTreatmentEventID
left join ClinicVisitVPDiagnosisDetails vpd on vpd.PatientTreatmentEventID = vpd.PatientTreatmentEventID

left join followupvisitdetails fd on fd.PatientTreatmentEventID = pte.PatientTreatmentEventID

left join PatientPredlysisRegistration pr on pr.PatientID = pte.PatientID
left join PatientAcuteRegistration ar on ar.patientID = pte.PatientID
left join PatientBasicRegistration br on br.patientID = pte.PatientID
left join PatientRegistration r on r.patientID = pte.PatientID
```

treatment
```sql
select e.PatientID, e.PatientTreatmentEventID, 
e.TreatmentChangeCD, e.TreatmentChangeType, e.ModalityID, m.ModalityCORRCD, b.BundleGroup, 
e.LocationCD, e.TransferLocationCD, e.OwnerLocationCD, e.HospitalCD, e.cTreatmentDate_wSortOrder,
/*pay.HCN, pay.HCNProvinceCD, pay.ResponsibilityForPaymentCD, */
pd.PostPartum, pd.PregnancyWeek, pd.PregnancyOutcomeDate
,pds.VisitTypeID, pds.*,
pay.cIsValid, pay.HCN, pay.HCNProvinceCD, pay.ResponsibilityForPaymentCD
from PatientTreatmentEvent e 
left join Modality m on m.ModalityID = e.ModalityID
left join BundleGroupDescription b on m.BundleID = b.BundleID
left join ClinicVisitPregnancyDetails pd on pd.PatientTreatmentEventID = e.PatientTreatmentEventID
left join PatientPredlysSrvcDetails pds on pds.PatientTreatmentEventID = e.PatientTreatmentEventID
left join PaymentSourceDetails pay on pay.PatientTreatmentEventID = e.PatientTreatmentEventID
--left join ClinicVisitIDAssessmentDetails idd on idd.PatientTreatmentEventID=e.PatientTreatmentEventID
--left join ClinicVisitVAAssessmentDetails vad on vad.PatientTreatmentEventID=e.PatientTreatmentEventID
WHERE e.StatusCD='O'
order by e.PatientID, e.cTreatmentDate_wSortOrder 
```
TestCategory!=TFS_Ignore

remove 07, 13, 35 from GN Diagnosis in USER STORY 846320 (no change to VP)
```sql
select * from KidneyDiseaseDiagnosisTmtChangeRel where DiseaseDiagnosisCode in (07, 13, 35)
```

check if a patient locked
```sql
select e.PatientID, e.OwnerLocationCD LocationCD, e.TreatmentChangeCD, s.[Year], s.[Month],
case when s.StatusCD = 'O' then 'true' else 'false' end Locked
from PatientTreatmentEvent e join PatientTreatmentStatus s on
e.PatientID = s.PatientID and e.OwnerLocationCD = s.LocationCD
and MONTH(e.TreatmentDate) = s.[Month] and YEAR(e.TreatmentDate) = s.[Year]
where e.TreatmentChangeCD like 'N%'
```

Census search
```sql

Select '--- usp_Census_Search  w/Lock flag ---' as ' '	--<< enter below the ManageCensus filters 0 = FALSE (default) | 1 = TRUE (filter applied):
														DECLARE	@Loca	nvarchar(4) = 'JHH'											--<< Roster selection - Location
														DECLARE @Month	int = 10 		--<< Roster selection - Reporting Period: Month
														DECLARE @Year	int = 2019		--<< Roster selection - Reporting Period: Year
														DECLARE @unrep  int = 0														--<< Subset Filter: Unreported	
														DECLARE @nc		int = 0														--<< Subset Filter: With no changes	(NC event | Lock is locked)
														DECLARE @woID3	int = 0, @woVA3 int = 0, @woID6 int = 0, @woVA9 int = 0		--<< Subset Filter: Missing ID3 | VA3 | ID6 | VA9 Status
														DECLARE @mrpO	int = 0														--<< Subset Filter: MRP not in ORRS	
														DECLARE @mrpN	int = 0														--<< Subset Filter: MRP not provided
														DECLARE @GCUpt	int = 0, @TDUpt	int = 0 									--<< Subset Filter: GOC | TD Assess. Update Due
														DECLARE @GCini	int = 0, @TDini	int = 0										--<< Subset Filter: GOC | TD Initial Assess. Due
														DECLARE @GCan	int = 0, @TDan	int = 0										--<< Subset Filter: GOC | TD Annual Assess. Due
														DECLARE @Inf	int = 0														--<< Subset Filter: With Infection
														DECLARE @p3		int = 1														-- (TotalRecords output parameter.)

														Declare @RepPeriod Date
														Set		@RepPeriod		= CAST('' + CAST(@Year as varchar(4)) + '-' + CAST(@Month as varchar(2)) + '-01' + '' as Date)
														-- Select	@RepPeriod
	EXEC	-- sp_helptext 
		usp_Census_Search	@UserID='04b8ce1c-e2ec-4df3-b4e5-160d031c97b4', @LocationCD=@Loca, 
							@incompleteclinicvisitonly	= 0, @GCmissinginclinicvisit	= 0, @TDmissinginclinicvisit	= 0, 
							@treatmentMonth = @Month, @treatmentYear = @Year,@unreportedonly = @unrep, @reportedwithoutchanges = @nc,@missingID3only = @woID3, @missingVA3only = @woVA3, @missingID6only = @woID6, @missingVA9only = @woVA9, 
							@mrpnotavailable = @mrpO, @mrpnotprovided = @mrpN, 
							@GCassessupdatedue = @GCUpt, @TDassessupdatedue = @TDUpt, @GCinitassessdue = @GCini, @TDinitassessdue = @TDini, @GCannualassessdue = @GCan, @TDannualassessdue = @TDan, 
							@WithInfection = @Inf,
							@GroupID=1, @TotalRecords=@p3 output, @PatientID=0, @HCN=N'', @LastName=N'', @FirstName=N'', @lastNameContains=N'""', @firstNameContains=N'""', @GenderCD=N'', @CensusGroupID=32, @PatientTypeID=0, @dobDay=0, @dobMonth=0, @dobYear=0, @includeinactive=0, @reportedonly=0, @withservicevolumes=0, @withoutservicevolumes=0, @othererrors=0, @otherwarnings=0, @Page=0, @PageSize=10, @SortColumn=N'Name', @SortDirection=N'ASC', @errorsonly=0, @warningsonly=0
	 
 

```

```sql
exec
    -- sp_helptext
            usp_Patient_SearchByDemographic
 @LastName = 'AUTOMATION'
,@FirstName = 'FDDCAEA'
,@DOB = '1950-01-13'
,@GenderCD = 'M'
,@HCN = '8518065654'
,@LocationCD = 'JHH'
,@IssuingLocation = 'jhh'
,@SystemSourceID = NULL
,@ORRSPatientID =  0
,@PatientId = @PatientId output  
,@MatchCount = @MatchCount output
```

```sql
exec [dbo].[usp_Report_Assessment]
    @GroupId = 1,
    @LocationCD = 'JHH',
   @ReportedPeriod = '2019-11-01'
```

## bundle report

```sql
exec [dbo].[usp_Report_Bundle]
 @UserID = '04b8ce1c-e2ec-4df3-b4e5-160d031c97b4',
    @GroupId = 1,
    @HospitalCD = 'JHH',
    @ReportPeriod = 12,
    @DateStart = '2019-04-01',
    @RealTimeReconciliation = "1"     
```

```sql
exec [dbo].[usp_Report_DataExtract_GoCandTD]
 @UserID = '04b8ce1c-e2ec-4df3-b4e5-160d031c97b4',
    @GroupId = 1,
    @HospitalCD = 'JHH'
```

    
```sql
exec [dbo].[usp_Report_DataExtract_ErrorsAndWarnings]
 @UserID = '04b8ce1c-e2ec-4df3-b4e5-160d031c97b4',
    @GroupId = 1,
    @HospitalCD = 'JHH',
    @Period = '2020-01-01'
```    
SpringSummer!

```sql
exec [dbo].[usp_Report_ReconciliationList]
    @PatientTypeID = null,
    @GroupId = 1,  
	@ReportedPeriod = 'All'
```

```sql
exec [dbo].[usp_Report_DataExtract_GN]
 @UserID = '04b8ce1c-e2ec-4df3-b4e5-160d031c97b4',
    @GroupId = 1,
    @HospitalCD = 'JHH',
    @FiscalYear = 2019
```

```sql
exec [dbo].[usp_Report_DataExtract_SummaryTreatmentEvents]
 @UserID = '04b8ce1c-e2ec-4df3-b4e5-160d031c97b4',
    @GroupId = 1,
	@ReportPeriod = 1,
    @HospitalCD = 'OSM',
    @DateStart = '2020-04-01'
```


```sql
--- See Patient's eligibility for McKC funding:
DECLARE @IncludedPatients PatientListTableType;
INSERT INTO @IncludedPatients (PatientID) values (44514)		--<< Insert here Patient ID

	DECLARE @DateStart DATE = '2020-01-01';
	DECLARE @DateEnd   DATE = '2020-01-31';
	DECLARE @HospitalCD VARCHAR(15) = 'TDH';
Select * From dbo.udf_KFR_ClinicEligibility (@DateStart, @DateEnd, @IncludedPatients, DEFAULT, DEFAULT) 
```

```sql
-- mckc eligibility report
exec [dbo].[usp_Report_DataExtract_PreDialysisPatientManagement]
 @UserID = '04b8ce1c-e2ec-4df3-b4e5-160d031c97b4',
    @GroupId = 1,
    @HospitalCD = 'JHH',
    @fiscalYear = '2020'
```
```sql
--from automation to Nasser
insert into ORRSDB_DEV1_Automation_Nasser.[dbo].Location
select * from ORRSDB_DEV1_Automation.[DBO].Location where locationCD = 'RNHS'
```

```sql
exec [usp_Report_DataExtract_VN]
 @UserID = '04b8ce1c-e2ec-4df3-b4e5-160d031c97b4',
    @GroupId = 1,
    @HospitalCD = 'JHH',
    @fiscalYear = '2020'
```
## egfr calculation
```sql
    Declare @dob DATETIME, @raceCD varchar(1), @genderCD varchar(1), @treatmentDate DATETIME, @creatinine numeric(18, 5), @proteinuria numeric(6, 2)
Set @dob = '01-01-1954'
Set @raceCD = '1' -- 1 - Caucasian, 2 - Asian/Oriental, 3 - Black
Set @genderCD = 'F'
Set @treatmentDate = '2019-10-01'
Set @creatinine = 525 -- 55 (not eligible for MCKC funding) -- 525 (eligible for MCKC funding)
Set @proteinuria = 301 -- 70 (not eligible for MCKC funding) -- 301 (eligible for MCKC funding)
SELECT [dbo].fcn_get_KFR(@creatinine, @dob, @treatmentDate, @proteinuria, @raceCD, @genderCD) as 'KFR (%)' -- eligible patients: with a (KFRE) two-year risk of kidney failure of 10% or greater
SELECT [dbo].fcn_get_eGFR(@creatinine, @dob, @treatmentDate, @raceCD, @genderCD) as 'eGFR (mL/min)' -- eligible patients: with an (eGFR) of less than 15 ml/min
```

```sql
select pte.patientid, pte.treatmentdate, pte.LocationCD, pte.TreatmentChangeCD, pte.TreatmentChangeType, 
	m.ModalityCORRCD, vt.Name as visitType from PatientTreatmentEvent pte
	left join PatientPredlysSrvcDetails srv on srv.PatientTreatmentEventID = pte.PatientTreatmentEventID
	left join VisitType vt on vt.VisitTypeID = srv.visitTypeId
	join modality m on m.ModalityID = pte.ModalityID	
	where patientid in(36075,36076) order by patientid
```

## create new submission period
```sql
EXEC 
		usp_Job_CensusSubmission_CreateNewPeriodRecords
update CensusSubmission set Month =9		
Select *
From CensusSubmission with (nolock)
```

## create L-out
```sql
EXEC usp_Job_LocationOut_CreateAutoLouts
```
