import "./load-externals";
import slugify from "../slugify";
import loadJs from "./load-js";

export default {
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
  },
};
