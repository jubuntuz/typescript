## install via NuGet
SpecFlow
SpecFlow.Tools.MsBuild.Generation
SpecFlow.xUnit

## config step assmebly in new project's specflow.config (always copy)
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
  
## Add assembly referrence of new project to the project having step definition