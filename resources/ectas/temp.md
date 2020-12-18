using CCO.ECTAS.Analytics.BusinessService;
using CCO.ECTAS.Analytics.EntitiesCore;
using ECTAS.API.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace CCO.ECTAS.Analytics.Test
{
    /// <summary>
    /// Requirements: User Story 839287: Get episodes API for PHO
    /// </summary>
    [TestClass]
    public class EpisodeControllerUnitTest
    {
        [TestMethod]
        public void GetEpisodesV10ReturnsExpectedJsonContract()
        {
            // Arrange
            string v1_0_GetEpisodesOriginalJson;
            using (StreamReader r = new StreamReader(@".\VersionedJsonResults\v1_0_GetEpisodes.json"))
            {
                v1_0_GetEpisodesOriginalJson = r.ReadToEnd();
            }

            EpisodeList episodeList = new EpisodeList();
            episodeList.Episodes = new List<Episode>() { new Episode() { } };

            var mock = new Mock<IEpisodeService>();
            mock.Setup(x => x.GetEpisodes(DateTime.MinValue, new long[] { 1 })).Returns(episodeList);

            // Act
            var result = new EpisodeController(mock.Object).GetEpisodes("v1.0", DateTime.MinValue, "1");
            string json = JsonConvert.SerializeObject(result);

            // Assert
            Assert.AreEqual(v1_0_GetEpisodesOriginalJson, json, "V1.0 GetEpisodes does not match original json. This may break compatibility!");
        }

        [TestMethod]
        public void GetEpisodesV10StartDateTimeIsRequired()
        {
            // Arrange, Act
            Type controllerType = Type.GetType("ECTAS.API.Controllers.EpisodeController, CCO.ECTAS.Analytics.API");
            MethodBase method = controllerType.GetMethod("GetEpisodes");
            ParameterInfo[] parameters = method.GetParameters();

            // Assert
            Assert.AreEqual(3, parameters.Length, "Number of parameters api/episodes GET has changed. This may break compatibility!");
            var startDateTimeParam = parameters[1];
            Assert.AreEqual(0, startDateTimeParam.CustomAttributes.Count(), $"This parameter ({startDateTimeParam.Name}) should not be Optional. Custom attribute found: {startDateTimeParam.CustomAttributes.First().AttributeType.Name}. This may break compatibility!");
        }

        [TestMethod]
        public void GetEpisodesV1_0_SiteCodesIsOptional()
        {
            // Arrange
            var mock = new Mock<IEpisodeService>();
            mock.Setup(x => x.GetEpisodes(DateTime.MinValue, new long[] { 1 })).Returns(new EpisodeList());

            // Act
            Type controllerType = Type.GetType("ECTAS.API.Controllers.EpisodeController, CCO.ECTAS.Analytics.API");
            MethodBase method = controllerType.GetMethod("GetEpisodes");
            ParameterInfo[] parameters = method.GetParameters();

            // Assert
            Assert.AreEqual(3, parameters.Length, "Number of parameters api/episodes GET has changed. This may break compatibility!");
            var siteCodesParam = parameters[2];
            Assert.IsTrue(siteCodesParam.CustomAttributes.Count() == 1 && siteCodesParam.CustomAttributes.First().AttributeType.Name == "OptionalAttribute", $"This parameter ({siteCodesParam.Name}) should be Optional. This may break compatibility!");
        }

        //[TestMethod]
        //public void GetEpisodesV10InvalidSiteCodes()
        //{
        //    // Arrange
        //    EpisodeList episodeList = new EpisodeList();
        //    episodeList.Episodes = new List<Episode>() { new Episode() { } };

        //    var mock = new Mock<IEpisodeService>(MockBehavior.Loose);
        //    mock.Setup(x => x.GetEpisodes(DateTime.MinValue, new long[] { })).Returns(episodeList);

        //    List<string> badSiteCodes = new List<string>()
        //    {
        //        "A",
        //        "A,",
        //        "1,A",
        //        "1.2",
        //        "1 2",
        //        "1,*",
        //        "*",
        //        ",",
        //        "1,,2",
        //        "",
        //        "1,"
        //    };

        //    // Act, Assert
        //    foreach (string badSiteCode in badSiteCodes)
        //    {
        //        var result = new EpisodeController(mock.Object).GetEpisodes("v1.0", DateTime.MinValue, badSiteCode);

        //        Assert.IsInstanceOfType(result, typeof(BadRequestResult), $"BadRequestResult expected for SiteCodes: {badSiteCode}");
        //    }
        //}

        //[TestMethod]
        //public void GetEpisodesV10ValidSiteCodes()
        //{
        //    // Arrange
        //    EpisodeList episodeList = new EpisodeList();
        //    episodeList.Episodes = new List<Episode>() { new Episode() { } };

        //    var mock = new Mock<IEpisodeService>();

        //    List<string> goodSiteCodes = new List<string>()
        //    {
        //        "0",
        //        "1,2",
        //        "1,2,399,4,5",
        //        "1, 2"
        //    };

        //    // Act, Assert
        //    foreach (string goodSiteCode in goodSiteCodes)
        //    {
        //        long[] sites = goodSiteCode.Split(",").Select(x => Convert.ToInt64(x)).ToArray();
        //        mock.Setup(x => x.GetEpisodes(DateTime.MinValue, sites)).Returns(episodeList);

        //        var result = new EpisodeController(mock.Object).GetEpisodes("v1.0", DateTime.MinValue, goodSiteCode);

        //        Assert.AreEqual(1, result.Episodes.Count(), $"No results return for valid siteCode: {goodSiteCode}.");
        //    }
        //}


        [TestMethod]
        [DataRow("100 -03-01 00:00:00am")]
        [DataRow("00:00:00")]
        [DataRow("2020-03-21 07:47:39.375")]
        [DataRow("2020-02-30 07:47:39.375")]
        [DataRow("03/03/22020T07:47:39.375Z")]
        public void GetEpisodesV10InvalidStartDateTime(string badDateTime)
        {
            // Arrange
            EpisodeList episodeList = new EpisodeList();
            episodeList.Episodes = new List<Episode>() { new Episode() { } };

            var mock = new Mock<IEpisodeService>(MockBehavior.Loose);

            // Act, Assert
            if (!DateTime.TryParse(badDateTime, out DateTime dateTime))
            {
                Assert.Fail($"Invlid test case for StartDateTime: {badDateTime}");
            }
            mock.Setup(x => x.GetEpisodes(dateTime, new long[] { 0 })).Returns(episodeList);
            var result = new EpisodeController(mock.Object).GetEpisodes("v1.0", dateTime, "0");

            Assert.IsInstanceOfType(result, typeof(BadRequestResult), $"BadRequestResult expected for Start Date Time: {badDateTime}.");

        }

        [TestMethod]
        [DataRow("2020-03-21T07:47:39.375Z")]
        [DataRow("2020-03-21 07:47:39")]
        [DataRow("0001-03-21T07:47:39.375Z")]
        [DataRow("9999-01-21T07:47:39.375Z")]
        public void GetEpisodesV10ValidStartDateTime(string goodDateTime)
        {
            // Arrange
            EpisodeList episodeList = new EpisodeList();
            episodeList.Episodes = new List<Episode>() { new Episode() { } };

            //
            if (!DateTime.TryParse(goodDateTime, out DateTime dateTime))
            {
                Assert.Fail($"Invlid test case for StartDateTime: {goodDateTime}");
            }

            var mock = new Mock<IEpisodeService>(MockBehavior.Loose);

            mock.Setup(x => x.GetEpisodes(dateTime, new long[] { 1 })).Returns(episodeList);

            // Act, Assert
            var result = new EpisodeController(mock.Object).GetEpisodes("v1.0", dateTime, "1");

            Assert.AreEqual(1, result?.Episodes?.Count(), $"Unexpected results return for valid start date time: {goodDateTime}.");
        }

        [TestMethod]
        [DataRow("")]
        [DataRow("v1 0")]
        [DataRow("v1")]
        [DataRow("v1.0.0")]
        [DataRow("1.0")]
        [DataRow("*")]
        public void GetEpisodesV10InvalidVersion(string version)
        {
            // Arrange
            EpisodeList episodeList = new EpisodeList();
            episodeList.Episodes = new List<Episode>() { new Episode() { } };

            var mock = new Mock<IEpisodeService>(MockBehavior.Loose);

            mock.Setup(x => x.GetEpisodes(DateTime.MinValue, new long[] { 0, 1 })).Returns(episodeList);

            // Act, Assert
            var result = new EpisodeController(mock.Object).GetEpisodes(version, DateTime.MinValue, "0, 1");

            Assert.IsInstanceOfType(result, typeof(BadRequestResult), $"BadRequestResult expected for version: {version}.");
        }

        [TestMethod]
        [DataRow("V1.0")]
        [DataRow("v1.0")]
        public void GetEpisodesV10ValidVersion(string version)
        {
            // Arrange
            EpisodeList episodeList = new EpisodeList();
            episodeList.Episodes = new List<Episode>() { new Episode() { } };

            var mock = new Mock<IEpisodeService>(MockBehavior.Loose);

            mock.Setup(x => x.GetEpisodes(DateTime.MinValue, new long[] { 0, 1 })).Returns(episodeList);

            // Act, Assert
            var result = new EpisodeController(mock.Object).GetEpisodes(version, DateTime.MinValue, "0, 1");

            Assert.AreEqual(1, result?.Episodes?.Count(), $"Unexpected results return for valid version: {version}.");
        }


    }
}
