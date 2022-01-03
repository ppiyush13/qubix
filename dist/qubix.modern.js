import * as React from 'react';
import * as Styled from 'styled-components';
import slugify$1 from '@sindresorhus/slugify';

window.qubix = {};
window.qubix["react"] = React;
window.qubix["styled-components"] = Styled;

var slugify = (pkgName => {
  const prefixPkgName = "MF " + pkgName + " base url";
  const slug = slugify$1(prefixPkgName, {
    separator: "_",
    customReplacements: [["@font-face", ""]]
  });
  return slug.toUpperCase();
});

var loadJs = (async mfBaseUrl => {
  const response = await fetch(mfBaseUrl + "main.js");
  const content = await response.text();
  const js = parseJs(content);
  return js.default();
});

const parseJs = content => new Function("return " + content).call();

var index = {
  register: function (mfMap) {
    this.mfMap = mfMap;
    Object.entries(mfMap).forEach(([key, value]) => {
      window.qubix[slugify(key)] = value;
    });
  },
  resolve: function (mf) {
    return this.mfMap[mf];
  },
  load: function (mf) {
    return loadJs(this.mfMap[mf]);
  }
};

export default index;
//# sourceMappingURL=qubix.modern.js.map
