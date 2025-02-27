"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const eventList = common_vendor.ref([]);
    const currentPage = common_vendor.ref(1);
    const total = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    const noMore = common_vendor.ref(false);
    common_vendor.ref([]);
    const fetchEvents = async (page = 1) => {
      try {
        loading.value = true;
        const res = await Promise.race([
          common_vendor.er.callFunction({
            name: "getEvents",
            data: { page, pageSize: 10 },
            timeout: 1e4
          }),
          new Promise(
            (_, reject) => setTimeout(() => reject(new Error("请求超时")), 1e4)
          )
        ]);
        if (res.result.code === 200) {
          eventList.value = page === 1 ? res.result.data.list : [...eventList.value, ...res.result.data.list];
          total.value = res.result.data.total;
          noMore.value = !res.result.data.hasMore;
        } else {
          throw new Error(res.result.message);
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: error.errMsg || error.message,
          icon: "none",
          duration: 3e3
        });
        common_vendor.index.__f__("error", "at pages/events/index.vue:94", "完整错误信息:", {
          code: error.errCode,
          message: error.errMsg,
          detail: error
        });
      } finally {
        loading.value = false;
      }
    };
    const getStatusText = (status) => {
      switch (status) {
        case "ongoing":
          return "进行中";
        case "upcoming":
          return "即将开始";
        case "ended":
          return "已结束";
        default:
          return "";
      }
    };
    const getStatusClass = (status) => {
      switch (status) {
        case "ongoing":
          return "ongoing";
        case "upcoming":
          return "upcoming";
        case "ended":
          return "ended";
        default:
          return "";
      }
    };
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/events/index.vue:132", common_vendor.index.getSystemInfoSync().SDKVersion);
      common_vendor.index.__f__("log", "at pages/events/index.vue:133", __wxConfig.envVersion);
      fetchEvents();
    });
    common_vendor.onReachBottom(() => {
      if (!noMore.value) {
        currentPage.value += 1;
        fetchEvents(currentPage.value);
      }
    });
    common_vendor.onPullDownRefresh(() => {
      currentPage.value = 1;
      common_vendor.index.removeStorageSync("eventCache");
      fetchEvents().finally(() => {
        common_vendor.index.stopPullDownRefresh();
        common_vendor.index.showToast({ title: "刷新成功", icon: "success" });
      });
    });
    if (typeof console.trace === "function") {
      console.trace("当前堆栈信息");
    } else {
      common_vendor.index.__f__("log", "at pages/events/index.vue:176", "当前环境不支持console.trace");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: eventList.value.length === 0 && !loading.value
      }, eventList.value.length === 0 && !loading.value ? {} : {}, {
        b: common_vendor.f(eventList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.cover,
            b: common_vendor.t(item.title),
            c: item.status !== "进行中"
          }, item.status !== "进行中" ? {
            d: common_vendor.t(getStatusText(item.status)),
            e: common_vendor.n(getStatusClass(item.status))
          } : {}, {
            f: "e89e9da7-0-" + i0,
            g: common_vendor.t(item.time),
            h: "e89e9da7-1-" + i0,
            i: common_vendor.t(item.location),
            j: common_vendor.t(item.brief),
            k: item.id,
            l: common_vendor.o(($event) => _ctx.navigateToDetail(item.id), item.id)
          });
        }),
        c: common_vendor.p({
          type: "calendar",
          size: "16",
          color: "#666"
        }),
        d: common_vendor.p({
          type: "location",
          size: "16",
          color: "#666"
        }),
        e: loading.value
      }, loading.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e89e9da7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/events/index.js.map
