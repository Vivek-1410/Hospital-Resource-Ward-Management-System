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
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.signup = async data => {
  if (stryMutAct_9fa48("49")) {
    {}
  } else {
    stryCov_9fa48("49");
    const {
      email,
      password
    } = data;
    const existing = await User.findOne(stryMutAct_9fa48("50") ? {} : (stryCov_9fa48("50"), {
      email
    }));
    if (stryMutAct_9fa48("52") ? false : stryMutAct_9fa48("51") ? true : (stryCov_9fa48("51", "52"), existing)) {
      if (stryMutAct_9fa48("53")) {
        {}
      } else {
        stryCov_9fa48("53");
        throw new Error(stryMutAct_9fa48("54") ? "" : (stryCov_9fa48("54"), "User already exists"));
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(stryMutAct_9fa48("55") ? {} : (stryCov_9fa48("55"), {
      email,
      password: hashedPassword
    }));
    await user.save();
    return stryMutAct_9fa48("56") ? {} : (stryCov_9fa48("56"), {
      message: stryMutAct_9fa48("57") ? "" : (stryCov_9fa48("57"), "Signup successful")
    });
  }
};
exports.login = async data => {
  if (stryMutAct_9fa48("58")) {
    {}
  } else {
    stryCov_9fa48("58");
    const {
      email,
      password
    } = data;
    const user = await User.findOne(stryMutAct_9fa48("59") ? {} : (stryCov_9fa48("59"), {
      email
    }));
    if (stryMutAct_9fa48("62") ? false : stryMutAct_9fa48("61") ? true : stryMutAct_9fa48("60") ? user : (stryCov_9fa48("60", "61", "62"), !user)) {
      if (stryMutAct_9fa48("63")) {
        {}
      } else {
        stryCov_9fa48("63");
        throw new Error(stryMutAct_9fa48("64") ? "" : (stryCov_9fa48("64"), "Invalid credentials"));
      }
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (stryMutAct_9fa48("67") ? false : stryMutAct_9fa48("66") ? true : stryMutAct_9fa48("65") ? isMatch : (stryCov_9fa48("65", "66", "67"), !isMatch)) {
      if (stryMutAct_9fa48("68")) {
        {}
      } else {
        stryCov_9fa48("68");
        throw new Error(stryMutAct_9fa48("69") ? "" : (stryCov_9fa48("69"), "Invalid credentials"));
      }
    }

    // Generate JWT
    const token = jwt.sign(stryMutAct_9fa48("70") ? {} : (stryCov_9fa48("70"), {
      id: user._id,
      role: user.role
    }), process.env.JWT_SECRET, stryMutAct_9fa48("71") ? {} : (stryCov_9fa48("71"), {
      expiresIn: stryMutAct_9fa48("72") ? "" : (stryCov_9fa48("72"), "1d")
    }));
    return stryMutAct_9fa48("73") ? {} : (stryCov_9fa48("73"), {
      message: stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), "Login successful"),
      token,
      role: user.role
    });
  }
};