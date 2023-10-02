import * as assert from "node:assert";
import moment from "moment";
import { timestamp } from "./index.ts";

describe("timestamp", () => {
    describe("in seconds", () => {
        it("should get the current timestamp", () => {
            assert.ok(timestamp() === Math.floor(Date.now() / 1000));
        });

        it("should get the timestamp according to the input date string", () => {
            let dateStr = "2020-01-27 14:00:00.000+0800";
            assert.ok(timestamp(dateStr) === moment(dateStr).unix());
        });

        it("should get the timestamp according to the input Date object", () => {
            let date = new Date();
            assert.ok(timestamp(date) === moment(date).unix());
        });

        it("should get the timestamp according to the Date arguments format", () => {
            assert.ok(timestamp("2020,0,1,12,0,0") === timestamp(new Date(2020, 0, 1, 12, 0, 0)));
        });

        it("should get the timestamp according to the input milliseconds", () => {
            let now = Date.now();
            assert.ok(timestamp(now) === moment(now).unix());
        });

        it("should support time string only", () => {
            assert.strictEqual(timestamp("5:00"), moment().hours(5).minutes(0).seconds(0).unix());
            assert.strictEqual(timestamp("05:10"), moment().hours(5).minutes(10).seconds(0).unix());
            assert.strictEqual(
                timestamp("05:10:30"),
                moment().hours(5).minutes(10).seconds(30).unix());
        });
    });

    describe("in milliseconds", () => {
        it("should get the current timestamp", () => {
            assert.ok(timestamp(true) === Date.now());
        });

        it("should get the timestamp according to the input date string", () => {
            let dateStr = "2020-01-27 14:00:00.000+0800";
            assert.ok(timestamp(dateStr, true) === moment(dateStr).valueOf());
        });

        it("should get the timestamp according to the input Date object", () => {
            let date = new Date();
            assert.ok(timestamp(date, true) === date.valueOf());
        });

        it("should get the timestamp according to the input milliseconds", () => {
            let now = Date.now();
            assert.ok(timestamp(now, true) === now);
        });
    });
});
