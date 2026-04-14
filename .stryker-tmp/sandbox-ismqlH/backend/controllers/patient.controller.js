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
const patientService = require("../services/patient.service");
exports.createPatient = async (req, res) => {
  if (stryMutAct_9fa48("24")) {
    {}
  } else {
    stryCov_9fa48("24");
    try {
      if (stryMutAct_9fa48("25")) {
        {}
      } else {
        stryCov_9fa48("25");
        const patient = await patientService.createPatient(req.body);
        res.status(201).json(patient);
      }
    } catch (error) {
      if (stryMutAct_9fa48("26")) {
        {}
      } else {
        stryCov_9fa48("26");
        res.status(400).json(stryMutAct_9fa48("27") ? {} : (stryCov_9fa48("27"), {
          message: error.message
        }));
      }
    }
  }
};
exports.getAllPatients = async (req, res) => {
  if (stryMutAct_9fa48("28")) {
    {}
  } else {
    stryCov_9fa48("28");
    try {
      if (stryMutAct_9fa48("29")) {
        {}
      } else {
        stryCov_9fa48("29");
        const patients = await patientService.getAllPatients();
        res.status(200).json(patients);
      }
    } catch (error) {
      if (stryMutAct_9fa48("30")) {
        {}
      } else {
        stryCov_9fa48("30");
        res.status(500).json(stryMutAct_9fa48("31") ? {} : (stryCov_9fa48("31"), {
          message: error.message
        }));
      }
    }
  }
};
exports.dischargePatient = async (req, res) => {
  if (stryMutAct_9fa48("32")) {
    {}
  } else {
    stryCov_9fa48("32");
    try {
      if (stryMutAct_9fa48("33")) {
        {}
      } else {
        stryCov_9fa48("33");
        const patient = await patientService.dischargePatient(req.params.id);
        res.status(200).json(patient);
      }
    } catch (error) {
      if (stryMutAct_9fa48("34")) {
        {}
      } else {
        stryCov_9fa48("34");
        res.status(404).json(stryMutAct_9fa48("35") ? {} : (stryCov_9fa48("35"), {
          message: error.message
        }));
      }
    }
  }
};