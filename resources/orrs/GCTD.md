# [usp_Validate_GCTDWarning] 
validate GC TD event to give warning 
* No warning if patient in [PatientErrorExceptionList]

IF @ValidationType = 'GC'
gc.IsGCAssessmentUpdated as IsAssessmentUpdated, 
			isnull(gc.IsIncorporated, 0) as IsDocumented,  


ELSE IF  @ValidationType = 'TD'	begin
			td.IsTDAssessmentUpdated as IsAssessmentUpdated, 
			isnull(td.CurrentCodeStatusDocumented, 0) as IsDocumented,  


MostRecentActivatingEvent:
pte.TreatmentChangeCD in ('RR', 'TI', 'F', 'N', 'NP')            