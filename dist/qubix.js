var React = require('react');
var Styled = require('styled-components');
var slugify$1 = require('@sindresorhus/slugify');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return n;
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var Styled__namespace = /*#__PURE__*/_interopNamespace(Styled);
var slugify__default = /*#__PURE__*/_interopDefaultLegacy(slugify$1);

window.qubix = {};
window.qubix["react"] = React__namespace;
window.qubix["styled-components"] = Styled__namespace;

var slugify = (function (pkgName) {
  var prefixPkgName = "MF " + pkgName + " base url";
  var slug = slugify__default['default'](prefixPkgName, {
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

module.exports = index;
//# sourceMappingURL=qubix.js.map
