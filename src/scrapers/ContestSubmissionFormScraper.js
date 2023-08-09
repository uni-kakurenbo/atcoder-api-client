"use strict";

const { CachedDataScraper } = require("./CachedScraper");

const { JSDOM } = require("jsdom");
const { Routes } = require("../session/Addresses");
const { Cache } = require("../Cache");

class ContestSubmissionFormScraper extends CachedDataScraper {
  constructor(languages) {
    super(languages.client);

    this.languages = languages;
  }

  async load(options) {
    const url = Routes.Web.submit(this.languages.contest.id);
    const response = await this._fetch(url, options);
    const {
      window: { document },
    } = new JSDOM(response);

    const languages = [];
    document
      .querySelector("#select-lang select")
      .querySelectorAll("option")
      .forEach((data) => {
        if (!data?.value) return;

        languages.push({
          id: data.value,
          mime: data.dataset.mime,
          code: data.dataset.mime.toLowerCase().replaceAll(/^.+\/x?|src$/g, "") ?? "",
          name: data.label,
          label: data.label,
        });
      });
    return languages;
  }
}

module.exports = { ContestSubmissionFormScraper };
