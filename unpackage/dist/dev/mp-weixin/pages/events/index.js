"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
            data: { page, pageSize: 10 }
          }),
          new Promise(
            (_, reject) => setTimeout(() => reject(new Error("请求超时")), 1e4)
          )
        ]);
        if (res.result.code === 200) {
          eventList.value = page === 1 ? res.result.data.list : [...eventList.value, ...res.result.data.list];
          total.value = res.result.data.total;
          noMore.value = !res.result.data.hasMore;
        }
        const cacheData = common_vendor.index.getStorageSync("eventCache");
        if (cacheData) {
          eventList.value = cacheData;
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: error.message || "加载失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    const getStatusClass = (status) => {
      return {
        "已结束": "ended",
        "未开始": "upcoming"
      }[status] || "";
    };
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/events/index.vue:111", "Build Timestamp:", process.env.UNI_BUILD_TIME);
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: eventList.value.length === 0 && !loading.value
      }, eventList.value.length === 0 && !loading.value ? {
        b: common_assets._imports_0
      } : {}, {
        c: common_vendor.f(eventList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.image,
            b: common_vendor.t(item.title),
            c: item.status !== "进行中"
          }, item.status !== "进行中" ? {
            d: common_vendor.t(item.status),
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
        d: common_vendor.p({
          type: "calendar",
          size: "16",
          color: "#666"
        }),
        e: common_vendor.p({
          type: "location",
          size: "16",
          color: "#666"
        }),
        f: loading.value
      }, loading.value ? {} : {}, {
        g: noMore.value
      }, noMore.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e89e9da7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/events/index.js.map
