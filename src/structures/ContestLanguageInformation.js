"use strict";

const { AtCoderStructure } = require("./AtCoderStructure");

class ContestLanguageInformation extends AtCoderStructure {
  constructor(client, data, contest) {
    super(client);

    this.id = data.id;

    this.contest = contest;

    this._patch(data);
  }

  _patch(data) {
    const assign = this._makeAssigner(data);

    assign("name");
    assign("mime");
    assign("code");
    assign("label");

    return this;
  }
}

module.exports = { ContestLanguageInformation };
