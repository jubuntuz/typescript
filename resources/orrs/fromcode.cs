using System;
using System.Collections.Generic;

namespace ORRS.Business.Objects
{
    [Serializable]
    public class Bundle
    {
        public List<BundleProvider> IncludedProviders { get; set; }
        public List<BundleRestrictedProvider> ExcludedProviders { get; set; }
        public List<BundleSummary> BundleSummary { get; set; }
        public List<BundleServiceVolumeSummary> BundleServiceVolumeSummary { get; set; }
        public List<BundleTime> BundleTime { get; set; }
        public List<BundleServiceVolumeDetails> BundleServiceVolumeDetails { get; set; }
        public List<BundleExcludedPatient> BundleExcludedPatients { get; set; }
    }

    [Serializable]
    public class BundleProvider
    {
        public string ProviderNumber { get; set; }
        public string Location { get; set; }
        public string LocationDescription { get; set; }
    }

    [Serializable]
    public class BundleRestrictedProvider
    {
        public string ProviderNumber { get; set; }
        public string Location { get; set; }
        public string LocationDescription { get; set; }
    }

    [Serializable]
    public class BundleSummary
    {
        public string Provider { get; set; }
        public string BundleName { get; set; }
        public string BundleType { get; set; }
        public int PatientVolume { get; set; }
        public int DaysOfService { get; set; }
        public int ExcludedPatientVolume { get; set; }
        public int ExcludedDaysOfService { get; set; }
        public int NetPatientVolume { get; set; }
        public int NetDaysOfService { get; set; }
        public double AnnualizedPatients { get; set; }
        public int ForecastAnnualizedPatients { get; set; }
        public double ForecastPerDayOfService { get; set; }
    }


 [Serializable]
    public class BundleServiceVolumeSummary
    {
        public string Provider { get; set; }
        public string CKDServiceVolume { get; set; }
        public string FundingUnitofMeasure { get; set; }
        public string PatientVolume { get; set; }
        public double VolumeofService { get; set; }
        public string ExcludedPatientVolume { get; set; }
        public double ExcludedVolumeofService { get; set; }
        public int NetPatientVolume { get; set; }
        public double NetVolumeofService { get; set; }

    }
    [Serializable]
    public class BundleTime
    {
        public string PatientID { get; set; }
        public string HealthCardNumber { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Location { get; set; }
        public string Bundle { get; set; }
        public int Duration { get; set; }
        public string Provider { get; set; }
        public DateTime? StartDate { get; set; }
        public string Type { get; set; }
        public string IsExcludedDaysOfService { get; set; }
    }

   

    [Serializable]
    public class BundleServiceVolumeDetails
    {
        public string PatientID { get; set; }
        public string HealthCardNumber { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Location { get; set; }
        public int VNVisitsSubmitted { get; set; } //General Nephrology Visits
        public int VNVisitsEligible { get; set; }
        public int GNVisitAsNephrologyVisit { get; set; }
        public int GN1VisitSubmitted { get; set; }
        public int GN1VisitEligible { get; set; }
        public int GN1VisitAdditional { get; set; }
        public int GN2VisitSubmitted { get; set; }
        public int GN2VisitEligible { get; set; }
        public int GN2VisitAdditional { get; set; }
        public int GN3VisitSubmitted { get; set; }
        public int GN3VisitEligible { get; set; }
        public int GN4VisitSubmitted { get; set; }
        public int GN4VisitEligible { get; set; }
        public int PPOVisitAsNephrologyVisit { get; set; } //Pre-Pregnancy optimization visits
        public int PPOVisitSubmitted { get; set; }
        public int PPOVisitEligible { get; set; }
        public int PregnancyVisitsSubmitted { get; set; } //Pregnancy followup and Pregnancy PostPartum visits
        public int PregnancyVisitsEligible { get; set; }
        public int FollowupVisitIHF { get; set; }
        public int FollowupVisitHome { get; set; }
        public int AcuteHDLvl3Tmt { get; set; }
        public int CRRTTmtDays { get; set; }
        public int SLEDDTmtDays { get; set; }
        public int InHospCAPDExch { get; set; }
        public int InHospCCPDtmtDays { get; set; }
        public int CAPDTrainingInitialDays { get; set; }
        public int CAPDTrainingRetrainingDays { get; set; }
        public int CCPDTrainingInitialDays { get; set; }
        public int CCPDTrainingRetrainingDays { get; set; }
        public int HHDTrainingInitialNoctDays { get; set; }
        public int HHDTrainingInitialConvDays { get; set; }
        public int HHDTrainingRetrainingNoctConvDays { get; set; }
        public int SelfCareHDInitialTrainingDays { get; set; }
        public int SelfCareHDRetrainingDays { get; set; }
        public string IsExcluded { get; set; }
        public int Insertion1 { get; set; }
        public int Insertion4 { get; set; }
        public int AccessVisit { get; set; }
        public int Insertion6 { get; set; }
        public int Insertion5 { get; set; }
        public int Insertion7 { get; set; }
        public int EducationVisitInd { get; set; }
        public int EducationVisitGrp { get; set; }
        public int FeedWaterTestMunicipal { get; set; }
        public int FeedWaterTestPrivate { get; set; }
        public double TechnicianHomeVisitHours { get; set; }
        public double NurseHomeVisitHours { get; set; }
        public int CarbonTankExchanges { get; set; }
        public int ProductWaterTestPrivate { get; set; }
        public int ProductWaterTestMunicipal { get; set; }
    }

    [Serializable]
    public class BundleExcludedPatient
    {
        public string PatientID { get; set; }
        public string HealthCardNumber { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Location { get; set; }
        public DateTime? StartDate { get; set; }
        public string Program { get; set; }
    }
}
