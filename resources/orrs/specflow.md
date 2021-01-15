## install via NuGet
* .net framework
SpecFlow
SpecFlow.Tools.MsBuild.Generation
SpecFlow.xUnit

* .net 5.0
```xml
  <PackageReference Include="SpecFlow" Version="3.5.14" />
    <PackageReference Include="SpecFlow.Tools.MsBuild.Generation" Version="3.5.14" />
    <PackageReference Include="SpecFlow.xUnit" Version="3.5.14" />
    <PackageReference Include="xunit" Version="2.4.1" />
    <PackageReference Include="xunit.core" Version="2.4.1" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.4.3">
```

## config specflow.config 
* always copy/copy if newer
* Add assembly referrence of new project to the project having step definition
```json
{
  "bindingCulture": {
    "language": "en-us"
  },
  "language": {
    "feature": "en-us"
  },
  "stepAssemblies": [
    { "assembly": "ORRS.Tests.Framework" }
  ]  
}
 ```



## troubleshooting
* Steps are not recognised even though there are matching step definitions
The SpecFlow Visual Studio integration caches the binding status of step definitions. If the cache is corrupted, steps may be unrecognised and the highlighting of your steps may be wrong (e.g. bound steps showing as being unbound). To delete the cache:

Close all Visual Studio instances.
Navigate to your %TEMP% folder and delete any files that are prefixed with specflow-stepmap-, e.g. specflow-stepmap-SpecFlowProject-607539109-73a67da9-ef3b-45fd-9a24-6ee0135b5f5c.cache.
Reopen your solution.

%USERPROFILE%\AppData\Local\Temp
