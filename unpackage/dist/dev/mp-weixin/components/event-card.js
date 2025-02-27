"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  name: "EventCard",
  props: {
    title: String,
    image: String,
    time: [String, Number],
    address: String,
    status: String,
    brief: String
  },
  computed: {
    statusText() {
      const map = {
        pending: "未开始",
        ongoing: "进行中",
        ended: "已结束"
      };
      return map[this.status] || "";
    }
  }
};
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.image
  }, $props.image ? {
    b: $props.image
  } : {
    c: common_assets._imports_0$2
  }, {
    d: common_vendor.t($props.title || "未命名活动"),
    e: common_vendor.p({
      type: "calendar",
      size: "16",
      color: "#666"
    }),
    f: common_vendor.t($props.time || "时间待定"),
    g: common_vendor.p({
      type: "location",
      size: "16",
      color: "#666"
    }),
    h: common_vendor.t($props.address || "地址待定"),
    i: $props.brief
  }, $props.brief ? {
    j: common_vendor.t($props.brief)
  } : {}, {
    k: common_vendor.t($options.statusText),
    l: common_vendor.n($props.status)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9d9859bc"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/event-card.js.map
