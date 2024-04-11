const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  retrieveHtmlSimplify: (req, res) => {
    console.log("SMPLIGY HIT", req.params);
    let jobTitle;
    let company;
    let companyLink;
    let location;
    req.body = axios
      .get("https://simplify.jobs/p/" + req.params.link)
      .then(function (response) {
        const $ = cheerio.load(response.data);
        $("h3").each((i, elem) => {
          if (i === 0) {
            jobTitle = $(elem).text();
          }
        });

        $("span").each((i, elem) => {
          if (i === 5) {
            location = $(elem).text();
          }
        });

        $("a").each((i, elem) => {
          if (i === 5) {
            company = $(elem).text();
            companyLink = $(elem).attr("href");
          }
        });


        return [jobTitle, company, companyLink, location];
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) =>
        console.log("ERROR other Call", error.response.status)
      );
  },
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
          if (i === 5) {
            location = $(elem).text();
          }
        });

        $("a").each((i, elem) => {

          if(i >= 2 && i <= 10){
            let firstWord = $(elem).text().trim()
            firstWord = firstWord.replace(/ .*/,'')

            if(firstWord !== "User" 
              && firstWord !== "Privacy"
              && firstWord !== "Cookie"
              && firstWord !== "company"
              && firstWord !== "See"
              && firstWord !== "Already"
              && firstWord !== "Report"
              && firstWord !== "Forgot"
          ){
                company = $(elem).text();
                companyLink = $(elem).attr("href");
            } 
          }
        });

        return [jobTitle, company, companyLink, location];
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) =>{
        if(error.response){
          console.log("ERROR Linkedin Call", error.response.status,error.response.statusText)
        }
      });
  },
  retrieveHtmlIndeed: (req, res) => {
    req.body = axios
      .get("https://www.indeed.com/viewjob?" + req.params.link)
      .then(function (response) {
        console.log("RESPONSE", response.data);
        const $ = cheerio.load(response.data);
        let jobTitle = $("h1").text();
        let jobInfoArray = $(".jobsearch-DesktopStickyContainer-companyrating")
          .text()
          .split(/-|,/);

        let company = jobInfoArray[0];
        company = company.replace(/[0-9]/g, "");
        let location = jobInfoArray[1];
        let companyLink = "";

        return [jobTitle, company, "", location];
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => console.log("ERROR indeed call", error.response.status));
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
