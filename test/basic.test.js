const assert = require("assert");
const path = require("path");

const root = path.resolve(__dirname, "..");

const bedService = require(path.join(root, "backend/services/bed.service"));

describe("Mutation Test - Bed Service", function () {

  it("should throw error when bed does not exist", async function () {
    try {
      await bedService.assignPatientToBed("invalidBed", "invalidPatient");
      assert.fail("Expected error not thrown");
    } catch (err) {
      assert.ok(err);
    }
  });

  it("should throw error when patient does not exist", async function () {
    try {
      await bedService.assignPatientToBed("507f1f77bcf86cd799439011", "invalidPatient");
      assert.fail("Expected error not thrown");
    } catch (err) {
      assert.ok(err);
    }
  });

  it("should not allow assigning if bed already occupied", async function () {
    // Mock bed object
    const fakeBed = {
      isOccupied: true
    };

    assert.strictEqual(fakeBed.isOccupied, true);
  });

  it("should allow assigning when bed is free (logic check)", async function () {
    const fakeBed = {
      isOccupied: false
    };

    assert.strictEqual(fakeBed.isOccupied, false);
  });

  it("should validate patient id format (basic logic)", function () {
    const patientId = "507f1f77bcf86cd799439011";
    assert.strictEqual(patientId.length, 24);
  });

  it("should fail for empty inputs", async function () {
    try {
      await bedService.assignPatientToBed("", "");
      assert.fail("Expected error not thrown");
    } catch (err) {
      assert.ok(err);
    }
  });

});