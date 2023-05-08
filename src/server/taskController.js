const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  retrieveHtmlSimplify: () => {},

  retrieveHtmlLinkedIn: (req, res) => {
    let jobTitle;
    let company;
    let companyLink;
    let location;
    req.body = axios
      .get("https://www.linkedin.com/jobs/view/" + req.params.link)
      .then(function (response) {
        const $ = cheerio.load(response.data);
        $("h3").each((i, elem) => {
          if (i === 0) {
            jobTitle = $(elem).text();
          }
        });

        $("span").each((i, elem) => {
          // console.log(i, "SPAN", $(elem).text());

          if (i === 5) {
            location = $(elem).text();
            console.log("Location", location);
          }
        });

        $("a").each((i, elem) => {
          if (i === 5) {
            company = $(elem).text();
            console.log("COMPANY LINK", company);
            // companyLink = $(elem).find("a").attr("href");
            companyLink = $(elem).attr('href')
          }
        });

        console.log("Location", location);
        console.log("Company",  company);
        console.log("Link", companyLink);
        console.log("Title", jobTitle);

        return [jobTitle, company, companyLink, location];
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => console.log("ERROR Linkedin Call", error));
  },
  retrieveHtmlIndeed: (req, res) => {
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
  retrieveHtmlBuildInLA: () => {},
  retrieveHtmlAngelist: (req, res) => {
    //Not working. Angelist seems to be protected against scraping
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
