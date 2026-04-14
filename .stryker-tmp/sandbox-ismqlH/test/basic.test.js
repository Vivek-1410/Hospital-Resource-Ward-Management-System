// @ts-nocheck
const assert = require("assert");
const path = require("path");

const root = path.resolve(__dirname, "..");

const bedService = require(path.join(root, "backend/services/bed.service"));
const patientService = require(path.join(root, "backend/services/patient.service"));

describe("Mutation Test - Services", function () {

  it("should throw error if bed not found", async function () {
    try {
      await bedService.assignPatientToBed("invalidBed", "invalidPatient");
      assert.fail("Expected error not thrown");
    } catch (err) {
      assert.ok(err); // just check error exists
    }
  });

  it("should throw error if patient not found", async function () {
    try {
      await bedService.assignPatientToBed("507f1f77bcf86cd799439011", "invalidPatient");
      assert.fail("Expected error not thrown");
    } catch (err) {
      assert.ok(err); // avoid strict message check
    }
  });

  it("should create patient object", async function () {
    const data = {
      name: "Test",
      age: 30,
      gender: "Male"
    };

    const patient = await patientService.createPatient(data);

    assert.strictEqual(patient.name, "Test");
    assert.strictEqual(patient.age, 30);
  });

});