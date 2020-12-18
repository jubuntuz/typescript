## API testing
* request sent from hospital should follow the format
valid: GET /api/episodes/{version}/{startDateTime}?siteCode={siteCodes}
version - string - The version code; expected value is "v1.0"
startDateTime - timestamp - The date / time in UTC to begin searching for new episodes to return. Example: 2020-03-21T07:47:39.375Z (date format TBC)
siteCodes - array - Optional: Filter the episode by the provided site code(s). If not specified, return episodes for all sites (may exclude for MVP)

Positive test scenario:
* GET /api/episodes/v1.0/{startDateTime}?siteCode={siteCodes}
* GET /api/episodes/v1.0/{startDateTime}
* GET /api/episodes/v1.0/{startDateTime}?siteCode={siteCodes}

Negative test scenario: 

* GET /api/episodes/{incorrect version}/{startDateTime}?siteCode={siteCodes}
* GET /api/episodes/{version}/{invalid DateTime}?siteCode={siteCodes}
* GET /api/episodes/{version}/{dateTime in future}?siteCode={siteCodes}
* GET /api/episodes/{version}/{startDateTime}?siteCode={invalid siteCodes}
* GET /api/episodes/{version}/{startDateTime}?siteCode=
* GET /api/episodes/{version}/{startDateTime}?
* GET /api/episodes/{version}/{startDateTime}
* GET /api/episodes/{version}
* GET /api/episodes/

* GET /api/episodes/{incorretVersion}/{invalid DateTime format}?siteCode={invalid siteCodes}

* special charactor
* GET /api/episodes/{version}/{startDateTime}?siteCode={?siteCodes}
* GET /api/episodes/"{version}/{startDateTime}?siteCode={siteCodes}
* GET /api/episodes/"{version}//{startDateTime}?siteCode={siteCodes}
* GET /api/episodes/{version}/{startDateTime}?siteCode=\{siteCodes}
* with double quote

* different date time format
* invalid date time: 2019-02-2?, 02-30-2019, 03/33/2019, 31/3/2021
* invalid data: 0,  
