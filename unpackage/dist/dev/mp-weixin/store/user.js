"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    uid: common_vendor.index.getStorageSync("uid") || null,
    hasLogin: common_vendor.index.getStorageSync("hasLogin") || false
  }),
  actions: {
    login(userInfo) {
      this.uid = userInfo.uid;
      this.hasLogin = true;
      common_vendor.index.setStorageSync("uid", userInfo.uid);
      common_vendor.index.setStorageSync("hasLogin", true);
    },
    logout() {
      this.uid = null;
      this.hasLogin = false;
      common_vendor.index.removeStorageSync("uid");
      common_vendor.index.removeStorageSync("hasLogin");
    }
  }
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/user.js.map
