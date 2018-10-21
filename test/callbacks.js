"use strict";

/* global describe, it */

const assert = require("assert");
const iplocation = require("../lib/").default;

function randomInt () {
    return Math.round(Math.random() * 255);
}

function randomIp () {
    return randomInt() + "." +
        randomInt() + "." +
        randomInt() + "." +
        randomInt();
}

for (let i = 0; i < 10; i++) {
    describe("(callbacks) try random ips", function () {
        const ip = randomIp();

        it("ip address: " + ip, function (done) {
            iplocation(ip, function (err, res) {
                try {
                    assert(!err);
                    assert(typeof res === "object");
                    assert(res.ip);
                    setTimeout(done, 1000);
                } catch (err) {
                    assert(err);
                    done();
                }
            });
        });
    });
}
