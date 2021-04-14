const axios = require("axios");
const cheerio = require("cheerio");

// Load client secrets from a local file.

module.exports = {
  retrieveHtmlLinkedIn: (req, res, next) => {
    req.body = axios
      .get("https://www.linkedin.com/jobs/view/" + req.params.link)
      .then(function (response) {
        const $ = cheerio.load(response.data);
        let jobTitle;
        $("h3").each((i, elem) => {
          if (i === 0) {
            jobTitle = $(elem).text();
            console.log(jobTitle);
          }
        });
        let company;
        let companyLink;
        let location;
        $("h3")
          .find("span")
          .each((i, elem) => {
            if (i === 0) {
              companyLink = $(elem).find("a").attr("href");
              company = $(elem).text();
            }
            if (i === 1) {
              location = $(elem).text();
            }
          })
          .text();
        return [jobTitle, company, companyLink, location];
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => console.log("ERROR Linkedin Call", error));
  },
  retrieveHtmlIndeed: (req, res, next) => {
    req.body = axios
      .get("https://www.indeed.com/viewjob?" + req.params.link)
      .then(function (response) {
        const $ = cheerio.load(response.data);
        let jobTitle = $("h1").text();
        let jobInfoArray = $(".jobsearch-DesktopStickyContainer-companyrating")
          .text()
          .split(/-|,/);

        let company = jobInfoArray[0];
        company = company.replace(/[0-9]/g, "");
        let location = jobInfoArray[1];
        return [jobTitle, company, "", location];
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => console.log("ERROR", error));
  },
  retrieveHtmlBuildInLA: (req, res, next) => {
    // req.body = axios
    //   .get("https://angel.co/company/blockfolio/jobs/" + req.params.link)
    //   .then(function(response) {
    //     const $ = cheerio.load(response.data);
    //     let jobTitleCompany = $(".u-colorGray3").text();
    //     let location = $(
    //       ".high-concept.s-vgBottom2.u-colorGray6.u-fontSize16"
    //     ).text();
    //   })
    //   .then(data => {
    //     res.status(200).send(data);
    //   })
    //   .catch(error => console.log("ERROR", error.error));
  },
  retrieveHtmlAngelist: (req, res, next) => {
    req.body = axios
      .get("https://angel.co/" + req.params.link.split("+").join("/"))
      .then(function (response) {
        const $ = cheerio.load(response.data);
        let thingy = $("h2").text();

        return thingy;
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => console.log(error, "ERROR"));
  },
};
