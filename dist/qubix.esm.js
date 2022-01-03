import * as React from 'react';
import * as Styled from 'styled-components';
import slugify$1 from '@sindresorhus/slugify';

window.qubix = {};
window.qubix["react"] = React;
window.qubix["styled-components"] = Styled;

var slugify = (function (pkgName) {
  var prefixPkgName = "MF " + pkgName + " base url";
  var slug = slugify$1(prefixPkgName, {
    separator: "_",
    customReplacements: [["@font-face", ""]]
  });
  return slug.toUpperCase();
});

var loadJs = (function (mfBaseUrl) {
  try {
    return Promise.resolve(fetch(mfBaseUrl + "main.js")).then(function (response) {
      return Promise.resolve(response.text()).then(function (content) {
        var js = parseJs(content);
        return js["default"]();
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
});

var parseJs = function parseJs(content) {
  return new Function("return " + content).call();
};

var index = {
  register: function register(mfMap) {
    this.mfMap = mfMap;
    Object.entries(mfMap).forEach(function (_ref) {
      var key = _ref[0],
          value = _ref[1];
      console.log(slugify(key));
      window.qubix[slugify(key)] = value;
    });
  },
  resolve: function resolve(mf) {
    return this.mfMap[mf];
  },
  load: function load(mf) {
    return loadJs(this.mfMap[mf]);
  }
};

export default index;
//# sourceMappingURL=qubix.esm.js.map
