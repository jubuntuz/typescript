
# Common SQL

* searching

```sql
SELECT DISTINCT so.name
FROM syscomments sc
INNER JOIN sysobjects so ON sc.id=so.id
WHERE sc.TEXT LIKE '%tablename%'

SELECT DISTINCT o.name, o.xtype
FROM syscomments c
INNER JOIN sysobjects o ON c.id=o.id
WHERE c.TEXT LIKE '%tablename%'

select t.name,c.name from sys.columns c 
inner join sys.tables t on t.object_id = c.object_id
 where c.name like '%pressure%'

SELECT Name
FROM sys.procedures
WHERE OBJECT_DEFINITION(OBJECT_ID) LIKE '%usp_PatientTreatmentEvent_Validate%' 

SELECT Name
FROM sys.objects
WHERE OBJECT_DEFINITION(OBJECT_ID) LIKE '%65%' or OBJECT_DEFINITION(OBJECT_ID) Like '%MKC%' 
```


```sql
sp_help tableName
sp_helptext usp_PatientPredlysSrvcDetails_Insert
```

* check when stored procedure was changed last time
```sql
SELECT name, create_date, modify_date 
FROM sys.objects
WHERE type = 'P'
ORDER BY modify_date DESC
```

 # ORRS
 ## run procedure
