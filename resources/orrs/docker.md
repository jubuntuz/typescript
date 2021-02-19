## run swagger editor locally
* docker pull swaggerapi/swagger-editor
* docker run -p 80:8080 swaggerapi/swagger-editor (for me: 8080:8080)

## azure functions Dotnet
* docker pull mcr.microsoft.com/azure-functions/dotnet
or
* docker pull mcr.microsoft.com/azure-functions/dotnet:3.0

## sql server

docker pull mcr.microsoft.com/mssql/server
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=mySA!' -p 1433:1433 --name sqlserver -it mcr.microsoft.com/mssql/server:2019-latest

```
MSSQL_PID is the Product ID (PID) or Edition that the container will run with. Acceptable values:

Developer : This will run the container using the Developer Edition (this is the default if no MSSQL_PID environment variable is supplied)
Express : This will run the container using the Express Edition
Standard : This will run the container using the Standard Edition
Enterprise : This will run the container using the Enterprise Edition
EnterpriseCore : This will run the container using the Enterprise Edition Core : This will run the container with the edition that is associated with the PID
```

```docker
docker exec -it <container_id|container_name> /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P <your_password>
docker exec -it 381e /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P mySA!
```

wiki: https://hub.docker.com/_/microsoft-mssql-server
example: https://github.com/twright-msft/mssql-node-docker-demo-app

## .net sdk
docker pull mcr.microsoft.com/dotnet/sdk
wiki: https://hub.docker.com/_/microsoft-dotnet-sdk:5.0

my docker compose version: 
C:\apache-jmeter-5.3\bin>docker-compose -v
docker-compose version 1.27.4, build 40524192

## Portainer CE - Docker Swarm on Windows WSL 
* Portainer Server Deployment 
docker swarm init
curl -L https://downloads.portainer.io/portainer-agent-stack.yml -o portainer-agent-stack.yml
docker stack deploy -c portainer-agent-stack.yml portainer

## docker command
 * check image real version
 docker inspect 39a95ac32011

 * 
docker build -t <image name> .
docker run -p 1433:1433 --name <container name> -d <image name> 
docker run -it -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=sa" -p 1433:1433 --name <container name> mcr.microsoft.com/mssql/server:2019-latest

wiki for docker run: https://docs.docker.com/engine/reference/run/

docker exec -it <container name> /bin/bash 
 
## tutorial
* docker
https://dockerlabs.collabnix.com/workshop/docker/

* .net microservice
https://dotnet.microsoft.com/learn/aspnet/microservice-tutorial/intro

* Approaches to initialize DB 
https://www.softwaredeveloper.blog/initialize-mssql-in-docker-container
- Docker commit
- Docker volume
https://dbafromthecold.com/2019/03/21/using-docker-named-volumes-to-persist-databases-in-sql-server/

- Script database schema and data (MS demo project)
https://github.com/twright-msft/mssql-node-docker-demo-app

- sql backup and restore
https://medium.com/smartbox-engineering/dockerizing-a-large-mssql-server-database-c24f05d84145

