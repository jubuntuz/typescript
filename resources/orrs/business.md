# Treatments
## Insertion Event for all type of patients, mainly for MCKC patient
insertion type: 
```
711 - Peritoneal Dialysis Catheter - Surgical - Open Surgery - Buried
712 - Peritoneal Dialysis Catheter - Surgical - Open Surgery - Unburied
713 - Peritoneal Dialysis Catheter - Surgical - Laparoscopic - Buried
714 - Peritoneal Dialysis Catheter - Surgical - Laparoscopic - Unburied 
```
to replace 710 in UI and esubmission
impact:
### treatment extract report
### bundle report


## TREATMENT
VR: ID + VA + GC + TD
VA: ID + VA

ID/VA Assessment
The Record ID must be the same Record ID used in the reported Treatment Event Record with a Treatment Event Code in (VR, VA, VE, VG, VP) in the same reporting period and submitting location 

##  reason for M, TR-OUT and L-OUT events.
scope: M, TR-OUT and L-OUT events in UI and esubmission
```sql
select rg.TmtChangeCD, rg.ReasonGroupID, rg.Description as groupDes, r.reasonId, r.CORRCD as reasonCode, r.Description as reasonDes, pt.Description as patientType 
from TmtChgReasonGroupRel trg
join TmtChgReasonGroup rg on rg.ReasonGroupID = trg.ReasonGroupID and rg.StatusCD = 'O'
join TmtChgReason r on r.ReasonID = trg.ReasonID and r.StatusCD = 'O'
join patienttype pt on pt.patienttypeid = rg.PatientTypeID and pt.StatusCD = 'O'
where trg.StatusCD = 'O' -- and rg.PatientTypeID = 2 and rg.tmtchangecd in ('L', 'TR', 'M')
order by patientType, TmtChangeCD, ReasonGroupID
```
## treatment
```sql
select tcg.Description as treatmentGroup, tc.TmtChangeCD, tc.Description as treatment from TreatmentChangegrouprel tcgr
 join TreatmentChangeGroup tcg on tcg.TreatmentChangeGroupID = tcgr.TreatmentChangeGroupID and tcg.statusCD = 'O'
 join TreatmentChange tc on tc.TmtChangeCD = tcgr.TmtChangeCD and tc.statusCD = 'O'
 where tcgr.StatusCD = 'O'
```
## modality
select m.ModalityCORRCD, mg.ModalityGroupCode, mg.ModalityGroupName, bgd.BundleGroup, bgd.Description as bundleDescription 
from modality m
 join ModalityGroup mg on mg.ModalityGroupID = m.ModalityGroupID and mg.StatusCD = 'O'
left join modalitybundle mb on m.ModalityID = mb.ModalityID	
left join BundleGroupDescription bgd on bgd.BundleID = mb.BundleGroupDescriptionId
where m.StatusCD = 'O'

# Registration
noHCNReason is mandatory for Acute, mckc before R6 
## chronic
NotHomeHDModalityReason1 is mandatory unless (InitialDialysisTreatmentCode == BundleTypeModalities.C || BundleTypeModalities.B_APD || SupportedModalityCodes.M_413
## mckc
updateTreatmentDecisionAssessment and updateGoalsOfCareAssessment are mandatory after R7

## modality "CRC": 
### MCKC Registration is required. otherwise the MCKC registration warning.
### CRC modality also applies to VR/VE (selecting CRC modality enables Creatinine fields)
Coding guidance for patients that start of as CRC is to register patient as MCKC (1. Regular, 2. Education, 3. Body/Vascular Access as registration event type) then do M event to CRC

## GN Diagnosis and Diagnosis Method
Error while GN Diagnosis 1 or GN Diagnosis 2 = '97 - Inadequate for Diagnosis', and Diagnosis Method <>  '1–Biopsy Sample'
Error while GN Diagnosis 1 or GN Diagnosis 2 = '98 - Not Yet diagnosed' and Diagnosis Method = '1 – Biopsy Sample' or '2 – Serological Test'
Error while GN Diagnosis 1 or 2 <> 'Not Yet Diagnosed' and <> 'Inadequate for Diagnosis', and GN Diagnosis Method = 3, 4, or 5
Diagnosis Method Date is not required while GN Diagnosis method <> '1 - Biopsy sample' or '2 - Serological test'

## TreatmentChangeCD while registration
GN: NG
Preg: NB
Acute: NA
MKC: NP
Chronic: N


VE,Vf,VA,IE,TU,TX for chronic
VE,VR for mckc
I, IE for acute 
modality 211 for chronic
modality 111 for Acute HD

Bundle A: MCKC
Bundle B: Topup GN
Bundle C: modality 433,424
Bundle D: modality 413,414
Bundle E: modality 322, 224
Bundle F: chronic, modality = 211, 171

## Eligibility Criteria: 
Interdisciplinary clinic dedicated to the optimal care of patients with a Kidney Failure Risk Equation (KFRE) two-year risk of kidney failure of 10% or greater or an estimated Glomerular Filtration Rate (eGFR) of less than 15 ml/min. Note that service recipients include patients with transplants who meet the eligibility criteria. 