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
const AuditLog = require("../models/audit.model");

// CREATE EVENT
exports.createEvent = async data => {
  if (stryMutAct_9fa48("44")) {
    {}
  } else {
    stryCov_9fa48("44");
    const event = new AuditLog(data);
    await event.save();
    return event;
  }
};

// GET PATIENT TIMELINE
exports.getPatientTimeline = async patientId => {
  if (stryMutAct_9fa48("45")) {
    {}
  } else {
    stryCov_9fa48("45");
    return await (stryMutAct_9fa48("46") ? AuditLog.find({
      patient: patientId
    }) : (stryCov_9fa48("46"), AuditLog.find(stryMutAct_9fa48("47") ? {} : (stryCov_9fa48("47"), {
      patient: patientId
    })).sort(stryMutAct_9fa48("48") ? {} : (stryCov_9fa48("48"), {
      createdAt: 1
    })))); // chronological
  }
};