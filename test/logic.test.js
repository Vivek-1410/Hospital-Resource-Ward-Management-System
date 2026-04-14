const assert = require("assert");
const { canAssignBed } = require("../backend/utils/bedLogic");

describe("Mutation Test - Bed Logic", function () {

  it("should allow assignment when valid", function () {
    const bed = { isOccupied: false };
    const patient = { id: "123" };

    const result = canAssignBed(bed, patient);

    assert.strictEqual(result.allowed, true);
  });

  it("should reject if bed not found", function () {
    const result = canAssignBed(null, { id: "123" });

    assert.strictEqual(result.allowed, false);
  });

  it("should reject if patient not found", function () {
    const result = canAssignBed({ isOccupied: false }, null);

    assert.strictEqual(result.allowed, false);
  });

  it("should reject if bed occupied", function () {
    const result = canAssignBed({ isOccupied: true }, { id: "123" });

    assert.strictEqual(result.allowed, false);
  });

});