"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const studentList = common_vendor.ref([]);
    const showPopup = common_vendor.ref(false);
    const currentIntro = common_vendor.ref("");
    const tooltipPosition = common_vendor.ref({ left: "0", top: "0" });
    const showTooltip = (e, intro) => {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".student-list-container").boundingClientRect();
      query.exec((res) => {
        const container = res[0];
        const { pageX, pageY } = e.touches[0];
        tooltipPosition.value = {
          left: `${pageX - container.left - 100}px`,
          top: `${pageY - container.top - 60}px`
        };
        currentIntro.value = intro;
        showPopup.value = true;
      });
    };
    const hideTooltip = () => {
      showPopup.value = false;
    };
    const loadData = async () => {
      try {
        const res = await common_vendor.er.callFunction({
          name: "getStudents",
          data: {
            pageSize: 20,
            orderBy: "sort"
          }
        });
        studentList.value = res.result.data.list.map((item) => ({
          ...item,
          achievement: item.achievement || "2025年度优秀学员"
        }));
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/students/index.vue:85", "加载失败:", e);
        common_vendor.index.showToast({ title: "数据加载失败", icon: "none" });
      }
    };
    loadData();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(studentList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.avatar || "/static/default-avatar.png",
            b: common_vendor.t(item.honor || "年度优秀学员"),
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.intro),
            e: common_vendor.o(($event) => showTooltip($event, item.intro), index),
            f: common_vendor.o(hideTooltip, index),
            g: item.achievement
          }, item.achievement ? {
            h: common_vendor.t(item.achievement)
          } : {}, {
            i: index
          });
        }),
        b: showPopup.value
      }, showPopup.value ? {
        c: common_vendor.t(currentIntro.value),
        d: common_vendor.s(tooltipPosition.value)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2b46f5fa"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/students/index.js.map
