# install Swagger Editor

* Install node.js and set path

* Install node.js dependency
–> npm install -g npm
–> npm -v

* Install swagger dependency
This is not mandatory but could be useful when creating project from command prompt using swagger commands.
-> npm install -g swagger

Running Swagger Editor locally.
* Install nodejs http-server
-> npm install -g http-server

unzipped and copy the swagger-editor directory in http-server folder at – C:\Users\urUserName\AppData\Roaming\npm\node_modules\http-server
it should be like – http-server\swagger-editor\….

* Run editor

-> http-server swagger-editor -o (-o will open the Editor into default browser)
-> http-server swagger-editor -p 9080 -o

http-server command without swagger works.
-> http-server-p 9080 -o

demo 
https://localhost:5001/swagger/index.html#/

## Resources:
### Basic structure for swagger
https://swagger.io/docs/specification/basic-structure/

### Swagger for WCF 
NuGet or https://libraries.io/
* SwaggerWcf
Swagger for WCF
Latest release 0.2.15 - Updated Jun 28, 2018 - 90 stars

* Swagger4WCF
Swagger4WCF generate automatically swagger YAML to describe WCF services on build time
Latest release 1.0.2 - Updated Sep 1, 2018 - 3 stars

bicep