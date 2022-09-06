"use strict";

const { CachedManager } = require("./CachedManager");

const { ContestLanguageInformation } = require("../structures/ContestLanguageInformation");
const { ContestSubmissionFormScraper } = require("../scrapers/ContestSubmissionFormScraper");

class ContestLanguageInformationManager extends CachedManager {
  constructor(contest, iterable) {
    super(contest.client, ContestLanguageInformation, iterable);

    this.contest = contest;

    this.scraper = new ContestSubmissionFormScraper(this);
  }

  async fetchList({ cache = true, force = false } = {}) {
    const languages = await this.scraper.load({ cache, force });
    languages.forEach((language) => {
      this._add(language, cache, { id: language.name.toLowerCase(), extras: [this.contest] });
    });
  }

  async detectLanguageHints(sourceCode, { fetch = true, options: fetchOptions } = {}) {
    if (fetch) await this.fetchList(fetchOptions);

    const DETECTION_REG_EXP = /#.*lang(?:uage)?:?(?<args>\s+[^\n\r*/#]+)/;

    const languageInformation = sourceCode.match(DETECTION_REG_EXP);
    if (!languageInformation || !languageInformation?.groups?.args) return;

    let languageSelectors = languageInformation.groups.args?.trim().replace(/\s+/g, " ").split(" ");
    languageSelectors = languageSelectors.map((selector) => selector.toLowerCase());

    const selectedOptions = this.cache.filter((item) => {
      return (
        languageSelectors.includes(item.id) ||
        languageSelectors.every((selector) => item.name.toLowerCase().includes(selector)) ||
        languageSelectors.every((selector) => item.description.toLowerCase().includes(selector))
      );
    });

    if (!selectedOptions) return;

    return selectedOptions;
  }
}

module.exports = { ContestLanguageInformationManager };
