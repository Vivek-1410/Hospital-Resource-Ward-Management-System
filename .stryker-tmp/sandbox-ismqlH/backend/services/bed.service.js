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
const Bed = require("../models/Bed");
const Patient = require("../models/Patient");
const auditService = require("./audit.service"); // ✅ ADD

exports.createBed = async data => {
  if (stryMutAct_9fa48("75")) {
    {}
  } else {
    stryCov_9fa48("75");
    const bed = new Bed(data);
    await bed.save();
    return bed;
  }
};
exports.getAllBeds = async () => {
  if (stryMutAct_9fa48("76")) {
    {}
  } else {
    stryCov_9fa48("76");
    return await Bed.find().populate(stryMutAct_9fa48("77") ? "" : (stryCov_9fa48("77"), "ward")).populate(stryMutAct_9fa48("78") ? "" : (stryCov_9fa48("78"), "assignedPatient"));
  }
};
exports.assignPatientToBed = async (bedId, patientId) => {
  if (stryMutAct_9fa48("79")) {
    {}
  } else {
    stryCov_9fa48("79");
    const bed = await Bed.findById(bedId);
    if (stryMutAct_9fa48("82") ? false : stryMutAct_9fa48("81") ? true : stryMutAct_9fa48("80") ? bed : (stryCov_9fa48("80", "81", "82"), !bed)) throw new Error(stryMutAct_9fa48("83") ? "" : (stryCov_9fa48("83"), "Bed not found"));
    if (stryMutAct_9fa48("85") ? false : stryMutAct_9fa48("84") ? true : (stryCov_9fa48("84", "85"), bed.isOccupied)) {
      if (stryMutAct_9fa48("86")) {
        {}
      } else {
        stryCov_9fa48("86");
        throw new Error(stryMutAct_9fa48("87") ? "" : (stryCov_9fa48("87"), "Bed is already occupied"));
      }
    }
    const patient = await Patient.findById(patientId);
    if (stryMutAct_9fa48("90") ? false : stryMutAct_9fa48("89") ? true : stryMutAct_9fa48("88") ? patient : (stryCov_9fa48("88", "89", "90"), !patient)) throw new Error(stryMutAct_9fa48("91") ? "" : (stryCov_9fa48("91"), "Patient not found"));

    // assign
    bed.isOccupied = stryMutAct_9fa48("92") ? false : (stryCov_9fa48("92"), true);
    bed.assignedPatient = patient._id;
    await bed.save();
    patient.bed = bed._id;
    patient.ward = bed.ward;
    patient.status = stryMutAct_9fa48("93") ? "" : (stryCov_9fa48("93"), "Admitted");
    await patient.save();

    // 🔥 AUDIT LOG
    await auditService.createEvent(stryMutAct_9fa48("94") ? {} : (stryCov_9fa48("94"), {
      patient: patient._id,
      type: stryMutAct_9fa48("95") ? "" : (stryCov_9fa48("95"), "BED_ASSIGNED"),
      description: stryMutAct_9fa48("96") ? `` : (stryCov_9fa48("96"), `Assigned to bed ${bed.bedNumber}`),
      location: stryMutAct_9fa48("97") ? `` : (stryCov_9fa48("97"), `Ward ${bed.ward}`),
      staff: stryMutAct_9fa48("98") ? "" : (stryCov_9fa48("98"), "Admin")
    }));
    return stryMutAct_9fa48("99") ? {} : (stryCov_9fa48("99"), {
      message: stryMutAct_9fa48("100") ? "" : (stryCov_9fa48("100"), "Patient assigned to bed successfully")
    });
  }
};