"use strict";

const { BaseSubmitter } = require("./BaseSubmitter");

class ContestProblemSubmitter extends BaseSubmitter {
  constructor(problem) {
    super(problem.client);

    this.problem = problem;
  }

  async post(...options) {
    return this.problem.contest.submitter.post(this.problem.id, ...options);
  }
}

module.exports = { ContestProblemSubmitter };
