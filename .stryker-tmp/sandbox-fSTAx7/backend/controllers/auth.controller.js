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
const authService = require("../services/auth.service");
exports.signup = async (req, res) => {
  if (stryMutAct_9fa48("4")) {
    {}
  } else {
    stryCov_9fa48("4");
    try {
      if (stryMutAct_9fa48("5")) {
        {}
      } else {
        stryCov_9fa48("5");
        const result = await authService.signup(req.body);
        res.status(201).json(result);
      }
    } catch (error) {
      if (stryMutAct_9fa48("6")) {
        {}
      } else {
        stryCov_9fa48("6");
        res.status(400).json(stryMutAct_9fa48("7") ? {} : (stryCov_9fa48("7"), {
          message: error.message
        }));
      }
    }
  }
};
exports.login = async (req, res) => {
  if (stryMutAct_9fa48("8")) {
    {}
  } else {
    stryCov_9fa48("8");
    try {
      if (stryMutAct_9fa48("9")) {
        {}
      } else {
        stryCov_9fa48("9");
        const result = await authService.login(req.body);
        res.status(200).json(result);
      }
    } catch (error) {
      if (stryMutAct_9fa48("10")) {
        {}
      } else {
        stryCov_9fa48("10");
        res.status(401).json(stryMutAct_9fa48("11") ? {} : (stryCov_9fa48("11"), {
          message: error.message
        }));
      }
    }
  }
};