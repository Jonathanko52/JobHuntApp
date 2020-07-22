const express = require("express");
const router = express.Router();
const fs = require("fs");
const { google } = require("googleapis");
const async = require("async");
const fetch = require("node-fetch");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

module.exports = {
  googleAuth: async (req, res) => {
    let credentials = JSON.parse(process.env.GOOGLECREDENTIALS);

    const { client_secret, client_id, redirect_uris } = credentials;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[1]
    );
    console.log("AFTERCLIENT");
    // if (err)
    //   return res.status(500).send({
    //     message: "Error loading client secret file:" + err.message,
    //   });
    const tokenObject = {
      access_token: process.env.GOOGLE_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      scope: "https://www.googleapis.com/auth/drive",
      token_type: "Bearer",
      expiry_date: process.env.GOOGLE_EXPIRY_DATE,
    };
    oAuth2Client.setCredentials(tokenObject);
    console.log("AFTR OAUTH");
    // sends google drive grant permission from VRMS to email
    // try {
    //   const result = await grantPermission(
    //     oAuth2Client,
    //     req.body.email,
    //     req.body.file
    //   );
    //   if (result.success) {
    //     const successObject = { message: "Success!" };
    //     return res.status(200).send(successObject);
    //   } else {
    //     return res.status(500).send({ message: result.message });
    //   }
    // } catch (err) {
    //   return res.status(500).send({ message: err.message });
    // }
  },
};
