"use strict";

const { Routes } = require("../session/Addresses");
const { BaseSubmitter } = require("./BaseSubmitter");

class ContestSubmitter extends BaseSubmitter {
  constructor(contest) {
    super(contest.client);

    this.contest = contest;
  }

  async post(problemId, languageIdOrName, sourceCode = "") {
    await this.contest.languages.fetchList();

    if(!isNaN(+languageIdOrName)) languageIdOrName = +languageIdOrName;

    const language = this.contest.languages.resolver.resolve(languageIdOrName);
    const data = new URLSearchParams();

    data.append("data.TaskScreenName", problemId);
    data.append("data.LanguageId", language.id);
    data.append("sourceCode", sourceCode);
    data.append("csrf_token", this.client.session.token);

    return this.client.adapter.post(Routes.Web.submit(this.contest.id), data);
  }
}

module.exports = { ContestSubmitter };
