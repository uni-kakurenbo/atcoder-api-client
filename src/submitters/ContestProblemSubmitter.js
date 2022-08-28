"use strict";

const { ContestSubmitter } = require("./ContestSubmitter");

class ContestProblemSubmitter extends ContestSubmitter {
  constructor(problem) {
    super(problem.contest);

    this.problem = problem;
  }
  async post(...options) {
    return super.submit(this.problem.id, ...options);
  }
}

module.exports = { ContestProblemSubmitter };
