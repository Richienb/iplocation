"use strict";

/* global describe, it */

const assert = require("assert");
const iplocation = require("../lib/").default;

describe("callback error", function () {
    it("should error", function () {
        iplocation("", [], (err, res) => {
            assert(res === null);
            assert(err);
            assert(err.message === "Invalid IP address.");
        });
    });
});
