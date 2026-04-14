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
const wardService = require("../services/ward.service");
exports.createWard = async (req, res) => {
  if (stryMutAct_9fa48("36")) {
    {}
  } else {
    stryCov_9fa48("36");
    try {
      if (stryMutAct_9fa48("37")) {
        {}
      } else {
        stryCov_9fa48("37");
        const ward = await wardService.createWard(req.body);
        res.status(201).json(ward);
      }
    } catch (error) {
      if (stryMutAct_9fa48("38")) {
        {}
      } else {
        stryCov_9fa48("38");
        res.status(400).json(stryMutAct_9fa48("39") ? {} : (stryCov_9fa48("39"), {
          message: error.message
        }));
      }
    }
  }
};
exports.getAllWards = async (req, res) => {
  if (stryMutAct_9fa48("40")) {
    {}
  } else {
    stryCov_9fa48("40");
    try {
      if (stryMutAct_9fa48("41")) {
        {}
      } else {
        stryCov_9fa48("41");
        const wards = await wardService.getAllWards();
        res.status(200).json(wards);
      }
    } catch (error) {
      if (stryMutAct_9fa48("42")) {
        {}
      } else {
        stryCov_9fa48("42");
        res.status(500).json(stryMutAct_9fa48("43") ? {} : (stryCov_9fa48("43"), {
          message: error.message
        }));
      }
    }
  }
};