## Azure resource
* DB
server name: orntrn1ordbs2.public.91e2ef1f2182.database.windows.net,3342
authentication: sql server Authentication
user: orrsdbuser
password: qwerty123456!
DB: [ORRSDB_DEV1_AZURE]

## DB 'orntrn1/ORRSDB_DEV2_AZ' for  https://orrs-web2.azurewebsites.net/  
Server=tcp:orntrn1.database.windows.net,1433;Initial Catalog=ORRSDB_DEV2_AZ;Persist Security Info=False;User ID=orrsdbuser;Password=qwerty123456!;
overview -> set server firewall -> add ext IP


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

# Develoment

* planning: Orrs.Tests.Framework working on local service, Orrs.Tests.Azure working on remote Azure services

* add service reference above for local and azure wsdl

* add key vaults
```xml
<appSettings>
....
    <add key="site" value="https://orrs-web.azurewebsites.net/signalr/hubs" />
    <add key="user" value="svc_ORRSSystemTest" />
    <add key="pwd" value="@jd93UN83$wzk@1!z" />
    <add key="CacheConnection" value="orrs-distributed-cache.redis.cache.windows.net:6380,password=15MPs1qMrXvfa1Kqzr3qgjb8VPpriSHH40ISiOPS+HA=,ssl=True,abortConnect=False" />
    <add key="StorageConnectionString" value="DefaultEndpointsProtocol=https;AccountName=ccoorrsblob;AccountKey=OFRrlrigHoUIYk42SqdOxJEA8CWlzP9T6jlHR3sBsy72fISp8k4dCATNQaknZArA6s1uP+s+22HTjCvKonQsFg==;EndpointSuffix=core.windows.net" />
</appSettings>
```

* Configure TLS/SSL
TLS/SSL settings: TLS version 1.2
if more: 
```csharp
ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12 | SecurityProtocolType.Ssl3;
```
more settings see: Development tool - App service editor (preview)

# Service coverage in POC

* Security Service
 GetAllGroups, RemoveGroup, GetUser, UpdateUser
 Defect: GetGroup not working (Investigation: Group is not serialzied in User)

 ```csharp
 //working version
            //get group from azure having max(groupId)
            var groups = (IEnumerable<GroupLite>)service.GetAllGroups(Requestor);
            var group = groups.FirstOrDefault(g => g.GroupId == groups.Max(s => s.GroupId));
            //add group to user
            var user = service.GetUser(Requestor.UserId);
            Assert.NotNull(user);
            user.Groups.Add(group);
            Assert.True(service.UpdateUser(Requestor, user));
```

```csharp
 //not working version, difference: 2nd row
            //get group from azure having max(groupId)
            var groups = (IEnumerable<GroupLite>)service.GetAllGroups(Requestor);
            var group = service.GetGroup(Requestor, groups.Max(s => s.GroupId));
            //add group to user
            var user = service.GetUser(Requestor.UserId);
            Assert.NotNull(user);
            user.Groups.Add(group);
            Assert.True(service.UpdateUser(Requestor, user));
```

* queue service
CreateFileRequest

* File Service
ProcessFile, GetFileRequestFromGuidMinimal, CommitUploadChanges

* Blob (however service is not provided)
UploadStreamToBlob  (method)



