## Azure resource
* DB
server name: orntrn1ordbs2.public.91e2ef1f2182.database.windows.net,3342
authentication: sql server Authentication
user: orrsdbuser
password: qwerty123456!
DB: [ORRSDB_DEV1_AZURE]

* resource group
CCOORRS-NonProd-Dev-rg

* subscription
CCOORRS-NonPrd-Sub

* Azure service wsdl: ${endpoint} ? wsdl
```xml
  <endpoint address="https://orrs-services.azurewebsites.net/SecurityService.svc" behaviorConfiguration="ServiceViewEventBehavior" binding="wsHttpBinding" bindingConfiguration="WSHttpBinding_ISecurityService" contract="SecurityServiceReference.ISecurityService" name="WSHttpBinding_ISecurityService">
        <identity>
          <servicePrincipalName value="Network Service" />
        </identity>
      </endpoint>
      <endpoint address="https://orrs-services.azurewebsites.net/SurveyService.svc" />
      <endpoint address="https://orrs-services.azurewebsites.net/PatientService.svc" />
      <endpoint address="https://orrs-queue.azurewebsites.net/QueueService.svc" />
      <endpoint address="https://orrs-services.azurewebsites.net/FileService.svc" />
      <endpoint address="https://orrs-services.azurewebsites.net/CensusService.svc" />
      <endpoint address="https://orrs-services.azurewebsites.net/ValidationService.svc" />
    <endpoint address="https://orrs-services.azurewebsites.net/LookupService.svc" />
      <endpoint address="https://orrs-services.azurewebsites.net/ReportService.svc"  />
```

local: https://localhost/ORRS.Services/${service.svc}.svc?wsdl

* appsetting
    <add key="site" value="https://orrs-web.azurewebsites.net/signalr/hubs" />
    <add key="user" value="svc_ORRSSystemTest" />
    <add key="pwd" value="@jd93UN83$wzk@1!z" />
    <add key="CacheConnection" value="orrs-distributed-cache.redis.cache.windows.net:6380,password=15MPs1qMrXvfa1Kqzr3qgjb8VPpriSHH40ISiOPS+HA=,ssl=True,abortConnect=False" />
    <add key="StorageConnectionString" value="DefaultEndpointsProtocol=https;AccountName=ccoorrsblob;AccountKey=OFRrlrigHoUIYk42SqdOxJEA8CWlzP9T6jlHR3sBsy72fISp8k4dCATNQaknZArA6s1uP+s+22HTjCvKonQsFg==;EndpointSuffix=core.windows.net" />

    
