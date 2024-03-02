"use strict";

const { ErrorMessages } = require("./ErrorMessages");

function makeError(Base) {
    return class ModuleError extends Base {
        constructor(key, ...args) {
            console.log(resolveErrorMessage(key, args));
            super(resolveErrorMessage(key, args));
            this.name = `${super.name} [${key}]`;
            if (Error.captureStackTrace) Error.captureStackTrace(this, ModuleError);
        }
    };
}

const messages = new Map();

for (const [name, message] of Object.entries(ErrorMessages)) messages.set(name, message);

function resolveErrorMessage(key, args) {
    const message = messages.get(key);
    if (!message) throw new Error();
    if (typeof message === "function") return message(...args);
    if (!args?.length) return message;
    return message;
}

module.exports = {
    Error: makeError(Error),
    TypeError: makeError(TypeError),
    RangeError: makeError(RangeError),
};
