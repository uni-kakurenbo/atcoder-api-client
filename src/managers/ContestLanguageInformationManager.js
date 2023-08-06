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
      this._add(language, cache, { id: language.id, extras: [this.contest] });
    });
  }

  async filterBySelectors(languageSelectors = [], { fetch = true, options: fetchOptions } = {}) {
    if (fetch) await this.fetchList(fetchOptions);

    languageSelectors = languageSelectors.map((selector) => selector.toLowerCase());

    const selectedOptions = this.cache.filter((item) => {
      return (
        languageSelectors.includes(item.id) ||
        languageSelectors.every((selector) => item.code.toLowerCase().includes(selector)) ||
        languageSelectors.every((selector) => item.label.toLowerCase().includes(selector))
      );
    });

    return selectedOptions;
  }
}

module.exports = { ContestLanguageInformationManager };
