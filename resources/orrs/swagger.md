# Swagger 
Swagger writes OpenAPI definitions in YAML or JSON

## Why open API: Fulfill functionalities withyout access Webpage
* External usage: Clients are able to integrate web service with their own application, so that users can fulfill the functionality without manual interfare via accessing ORRS website and ORRS can get realtime clinical data once per patient has a visit. 
* Internal usage: Robust and effecient way for automation testing (Pyramid structure)

## Why documenting: API definictions help the usage for API.
1. Parameters of request/response (input/return) for service call: currently not all the fields of objects are serialized, need to read application code to tell which fields are serialized.
2. what service calls should be made for certain functionality 
For example: for esubmission should call following services:
* Blob (however service is not provided) UploadStreamToBlob (currently call the method)
* CreateFileRequest in Queue Service
* ProcessFile, GetFileRequestFromGuidMinimal, CommitUploadChanges in File Service

Possiblly if ORSS would open API to clients in future
3. Specs is an testing standard for API 

## Why Swagger: 
Share definitions among swagger file and code

## Resources:

### Basic structure for swagger
https://swagger.io/docs/specification/basic-structure/

### Tools: Swagger for WCF 
https://libraries.io/ or NuGet

* SwaggerWcf
Swagger for WCF
Latest release 0.2.15 - Updated Jun 28, 2018 - 90 stars

* Swagger4WCF
Swagger4WCF generate automatically swagger YAML to describe WCF services on build time
Latest release 1.0.2 - Updated Sep 1, 2018 - 3 stars

### Suggestion for swagger for WCF
https://stackoverflow.com/questions/17056464/using-swagger-with-wcf-rest

