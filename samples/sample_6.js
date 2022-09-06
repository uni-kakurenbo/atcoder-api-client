"use strict";

const { Client, Util } = require("../src");
const client = new Client();

client.on("ready", async () => {
  console.log(client.user);

  const IROHA_CONTEST = await client.contests.fetch("iroha2019-day3");

  const languageHints = await IROHA_CONTEST.languages.detectLanguageHints("/* #language C++ GCC */");
  console.log(languageHints);
});

client.login();
