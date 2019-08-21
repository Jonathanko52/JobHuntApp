const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  retrieveHtml: (req, res, next) => {
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
  }
};
