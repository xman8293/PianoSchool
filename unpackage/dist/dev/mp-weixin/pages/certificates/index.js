"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const certList = common_vendor.ref([]);
    const loadCertificates = async () => {
      try {
        const res = await common_vendor.er.callFunction({
          name: "getCertificates",
          data: { pageSize: 6 }
        });
        common_vendor.index.__f__("log", "at pages/certificates/index.vue:39", "证书数据:", res);
        certList.value = res.result.data.list;
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/certificates/index.vue:42", "加载失败:", e);
        common_vendor.index.showToast({ title: "数据加载失败", icon: "none" });
      }
    };
    loadCertificates();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(certList.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5ea39c40"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/certificates/index.js.map
