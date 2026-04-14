// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
const Patient = require("../models/Patient");
const Bed = require("../models/Bed");
const auditService = require("./audit.service"); // ✅ ADD

// ✅ CREATE PATIENT
exports.createPatient = async data => {
  if (stryMutAct_9fa48("101")) {
    {}
  } else {
    stryCov_9fa48("101");
    const patient = new Patient(stryMutAct_9fa48("102") ? {} : (stryCov_9fa48("102"), {
      name: data.name,
      age: data.age,
      gender: data.gender,
      contact: data.contact,
      address: data.address,
      diagnosis: data.diagnosis,
      doctor: data.doctor,
      status: stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), "Admitted")
    }));
    await patient.save();

    // 🔥 AUDIT LOG
    await auditService.createEvent(stryMutAct_9fa48("104") ? {} : (stryCov_9fa48("104"), {
      patient: patient._id,
      type: stryMutAct_9fa48("105") ? "" : (stryCov_9fa48("105"), "ADMISSION"),
      description: stryMutAct_9fa48("106") ? "" : (stryCov_9fa48("106"), "Patient admitted"),
      location: stryMutAct_9fa48("107") ? "" : (stryCov_9fa48("107"), "Hospital"),
      staff: stryMutAct_9fa48("108") ? "" : (stryCov_9fa48("108"), "Admin")
    }));
    return patient;
  }
};

// ✅ GET ALL
exports.getAllPatients = async () => {
  if (stryMutAct_9fa48("109")) {
    {}
  } else {
    stryCov_9fa48("109");
    return await Patient.find().populate(stryMutAct_9fa48("110") ? "" : (stryCov_9fa48("110"), "bed")).populate(stryMutAct_9fa48("111") ? "" : (stryCov_9fa48("111"), "ward"));
  }
};

// ✅ DISCHARGE
exports.dischargePatient = async patientId => {
  if (stryMutAct_9fa48("112")) {
    {}
  } else {
    stryCov_9fa48("112");
    const patient = await Patient.findById(patientId);
    if (stryMutAct_9fa48("115") ? false : stryMutAct_9fa48("114") ? true : stryMutAct_9fa48("113") ? patient : (stryCov_9fa48("113", "114", "115"), !patient)) throw new Error(stryMutAct_9fa48("116") ? "" : (stryCov_9fa48("116"), "Patient not found"));
    const bed = await Bed.findById(patient.bed);
    if (stryMutAct_9fa48("118") ? false : stryMutAct_9fa48("117") ? true : (stryCov_9fa48("117", "118"), bed)) {
      if (stryMutAct_9fa48("119")) {
        {}
      } else {
        stryCov_9fa48("119");
        bed.isOccupied = stryMutAct_9fa48("120") ? true : (stryCov_9fa48("120"), false);
        bed.assignedPatient = null;
        await bed.save();
      }
    }
    patient.bed = null;
    patient.ward = null;
    patient.status = stryMutAct_9fa48("121") ? "" : (stryCov_9fa48("121"), "Discharged");
    await patient.save();

    // 🔥 AUDIT LOG
    await auditService.createEvent(stryMutAct_9fa48("122") ? {} : (stryCov_9fa48("122"), {
      patient: patient._id,
      type: stryMutAct_9fa48("123") ? "" : (stryCov_9fa48("123"), "DISCHARGE"),
      description: stryMutAct_9fa48("124") ? "" : (stryCov_9fa48("124"), "Patient discharged"),
      location: stryMutAct_9fa48("125") ? "" : (stryCov_9fa48("125"), "Hospital"),
      staff: stryMutAct_9fa48("126") ? "" : (stryCov_9fa48("126"), "Admin")
    }));
    return patient;
  }
};