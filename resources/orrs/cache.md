1. find what services likely use cache(library cache, reddis, meroy)
1)cache.*
2) ORRS.Common.Azure.DistributedCache.cs  - get all references from method GetData

2. Web.BasePage.Helpers.cs cachelookupserviceCallsAsync()

redis connection: NuGet - stackExchange.Redis see: lazyconnection
