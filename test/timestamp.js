/* global describe, it */
const assert = require("assert");
const timestamp = require("../timestamp").default;
const moment = require("moment");

describe("timestamp", () => {
    describe("in seconds", () => {
        it("should get the current timestamp", () => {
            assert(timestamp() === Math.floor(Date.now() / 1000));
        });

        it("should get the timestamp according to the input date string", () => {
            let dateStr = "2020-01-27 14:00:00.000+0800";
            assert(timestamp(dateStr) === moment(dateStr).unix());
        });

        it("should get the timestamp according to the input Date object", () => {
            let date = new Date();
            assert(timestamp(date) === moment(date).unix());
        });

        it("should get the timestamp according to the input milliseconds", () => {
            let now = Date.now();
            assert(timestamp(now) === moment(now).unix());
        });
    });

    describe("in milliseconds", () => {
        it("should get the current timestamp", () => {
            assert(timestamp(true) === Date.now());
        });

        it("should get the timestamp according to the input date string", () => {
            let dateStr = "2020-01-27 14:00:00.000+0800";
            assert(timestamp(dateStr, true) === moment(dateStr).valueOf());
        });

        it("should get the timestamp according to the input Date object", () => {
            let date = new Date();
            assert(timestamp(date, true) === date.valueOf());
        });

        it("should get the timestamp according to the input milliseconds", () => {
            let now = Date.now();
            assert(timestamp(now, true) === now);
        });
    });
});