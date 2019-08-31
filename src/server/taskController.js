const axios = require("axios");
const cheerio = require("cheerio");
const Promise = require("promise");

//googapi test
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.

class SheetsSnippets {
  /**
   * Creates Sheets Snippets with a Google API Services
   * @param {GoogleAuth[]} service Authenticated Google Drive and Sheets Services
   */
  constructor([driveService, sheetsService]) {
    this.driveService = driveService;
    this.sheetsService = sheetsService;
  }

  async create(title) {
    return new Promise((resolve, reject) => {
      // [START sheets_create]
      const resource = {
        properties: {
          title
        }
      };
      this.sheetsService.spreadsheets.create(
        {
          resource,
          fields: "spreadsheetId"
        },
        (err, spreadsheet) => {
          if (err) {
            // Handle error.
            console.log(err);
            // [START_EXCLUDE silent]
            reject(err);
            // [END_EXCLUDE]
          } else {
            console.log(`Spreadsheet ID: ${spreadsheet.spreadsheetId}`);
            // [START_EXCLUDE silent]
            resolve(spreadsheet.spreadsheetId);
            // [END_EXCLUDE]
          }
        }
      );
      // [END sheets_create]
    });
  }
}

module.exports = {
  retrieveHtmlLinkedIn: (req, res, next) => {
    req.body = axios
      .get("https://www.linkedin.com/jobs/view/" + req.params.link)
      .then(function(response) {
        const $ = cheerio.load(response.data);
        let jobTitle = $("h1").text();
        let company;
        let companyLink;
        let location;
        $("h3")
          .find("span")
          .each((i, elem) => {
            if (i === 0) {
              companyLink = $(elem)
                .find("a")
                .attr("href");
              company = $(elem).text();
            }
            if (i === 1) {
              location = $(elem).text();
            }
          })
          .text();
        return [jobTitle, company, companyLink, location];
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(error => console.error(error));
  },
  retrieveHtmlIndeed: (req, res, next) => {
    req.body = axios
      .get("https://www.indeed.com/viewjob?" + req.params.link)
      .then(function(response) {
        const $ = cheerio.load(response.data);
        let jobTitle = $("h3").text();
        let company = $(
          ".icl-u-xs-mr--sm.jobsearch-JobInfoHeader-companyName"
        ).text();
        let companyLink = $(
          ".icl-u-xs-mr--sm.jobsearch-JobInfoHeader-companyName"
        )
          .find("a")
          .attr("href");

        let location = $(
          ".icl-u-xs-mt--xs.jobsearch-JobInfoHeader-companyLocation.jobsearch-DesktopStickyContainer--companylocation"
        ).text();
        return [jobTitle, company, companyLink, location];
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(error => console.error(error));
  },
  retrieveHtmlAngelist: (req, res, next) => {
    req.body = axios
      .get("https://angel.co/company/blockfolio/jobs/" + req.params.link)
      .then(function(response) {
        const $ = cheerio.load(response.data);
        let jobTitleCompany = $(".u-colorGray3").text();

        // let company = $(
        //   ".icl-u-xs-mr--sm.jobsearch-JobInfoHeader-companyName"
        // ).text();
        // let companyLink = $(
        //   ".icl-u-xs-mr--sm.jobsearch-JobInfoHeader-companyName"
        // )
        //   .find("a")
        //   .attr("href");

        let location = $(
          ".high-concept.s-vgBottom2.u-colorGray6.u-fontSize16"
        ).text();
        // return [jobTitle, company, companyLink, location];
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(error => console.log("ERROR"));
  }
};
