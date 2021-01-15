# application
cloud: orrs-web.azurewebsites.net/
dev: https://devorrs.renalnetwork.on.ca/ORRS/
https://dev2orrs.renalnetwork.on.ca 
qa: https://qaorrs.renalnetwork.on.ca/ORRS
local: https://localhost/orrs.web

# DB connection
## Azure
server name: orntrn1ordbs2.public.91e2ef1f2182.database.windows.net,3342
authentication: sql server Authentication
user: orrsdbuser
password: qwerty123456!
DB: [ORRSDB_DEV1_AZURE]


## DB for  https://orrs-web2.azurewebsites.net/  
Server=tcp:orntrn1.database.windows.net,1433;Initial Catalog=ORRSDB_DEV2_AZ;Persist Security Info=False;User ID=orrsdbuser;Password=qwerty123456!;

## swagger
https://localhost:5001/swagger/index.html

## local
server name: ORNTRN1ORDBS2
authentication: Window Authentication
DB: [ORRSDB_DEV1_Automation_Nasser]

# Configuration
TLS/SSL settings
Development tool - App service editor (preview)

## Service
orrs-queue
orrs-services

## Test plan and results
from Helen
* https://collab.ccohealth.ca/sites/PD/QATeamSite/Shared%20Documents/Forms/AllItems.aspx?View=%7B0EC4EF90%2D78B3%2D4A69%2D972A%2D50E25951620F%7D
* https://testresults.cancercare.on.ca/
from Bianca
* https://ontariohealth.sharepoint.com/sites/QACOE/SitePages/Home.aspx

## Test users
ORRSTest1 - 0RRST3$T123! - KGH
ORRSTest2 - 0RRST3$T234! - LHS
ORRSTest3 - 0RRST3$T345! - JHH

true restful API
[11:13 AM] Watson, Neil
    
no problem we can have a discussion on Monday. Because we substituted WCF with Web Api, there are still many RPC design patterns in the Web Api. Going to a full rest api will require a complete redesign of the Api, the controller and methods, ORRS.Web, database, ORRS.Data and ORRS.DataAccess so its a huge change. Sid is also looking for a data driven design which I think is asking for a truely restful api design. Before we do full rest api, we must first convert the orrs.web to MVC or JS framework. Going to a full rest api is therefore far in the future.

pickerwheel.com

* Bundle summary validation
"BundleName", "BundleType", "PatientVolume", "DaysOfService", "ExcludedDaysOfService"


* Treatment Error
```sql
FROM
		[PatientTreatmentErrors] 
WHERE ... AND
(T.TreatmentChangeCD IN ('L','TR','TP') AND ISNULL(T.TreatmentChangeType, 'OUT') = 'OUT' AND T.TransferLocationCD IN (SELECT LocationCD FROM Locations))
						OR (NOT (T.TreatmentChangeCD IN ('L','TR','TP') AND ISNULL(T.TreatmentChangeType, 'OUT') = 'OUT') AND T.LocationCD IN (SELECT LocationCD FROM Locations))
```                        
