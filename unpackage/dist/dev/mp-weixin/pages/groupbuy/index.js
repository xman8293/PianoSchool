"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  _component_uni_load_more();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const groupList = common_vendor.ref([]);
    const loading = common_vendor.ref(true);
    const error = common_vendor.ref(false);
    const currentPage = common_vendor.ref(1);
    const total = common_vendor.ref(0);
    const loadStatus = common_vendor.ref("more");
    const loadGroupbuyList = async (page = 1, isRefresh = false) => {
      if (loadStatus.value === "noMore")
        return;
      loadStatus.value = "loading";
      common_vendor.index.showLoading({ title: "加载中", mask: true });
      try {
        const res = await Promise.race([
          common_vendor.er.callFunction({
            name: "getGroupbuyList",
            data: {
              page,
              pageSize: 10
            }
          }),
          new Promise(
            (_, reject) => setTimeout(() => reject(new Error("请求超时")), 1e4)
          )
        ]);
        if (res.result.code === 200) {
          total.value = res.result.data.total;
          groupList.value = isRefresh ? res.result.data.list : [...groupList.value, ...res.result.data.list];
          loadStatus.value = res.result.data.list.length < 10 ? "noMore" : "more";
          loading.value = false;
        } else {
          throw new Error(res.result.msg);
        }
      } catch (e) {
        loading.value = false;
        error.value = true;
        common_vendor.index.__f__("error", "at pages/groupbuy/index.vue:130", "加载团购数据失败:", e);
        common_vendor.index.showToast({
          title: e.message.includes("超时") ? "请求超时，请重试" : "加载失败",
          icon: "none"
        });
      } finally {
        common_vendor.index.hideLoading();
        loading.value = false;
      }
    };
    const onRefresh = async () => {
      currentPage.value = 1;
      await loadGroupbuyList(1, true);
      common_vendor.index.stopPullDownRefresh();
    };
    const loadMore = () => {
      if (loadStatus.value !== "more")
        return;
      currentPage.value++;
      loadGroupbuyList(currentPage.value);
    };
    const truncateNotice = (text, length) => {
      return text.length > length ? text.substring(0, length) + "..." : text;
    };
    common_vendor.onMounted(() => {
      loadGroupbuyList();
    });
    const handleJump = (item) => {
      common_vendor.index.navigateToMiniProgram({
        appId: "wxde8ac0a21135c07d",
        path: "gc/pages/deal/dealdetail/dealdetail?dealid=828645933&shopid=1502583614",
        success(res) {
          common_vendor.index.__f__("log", "at pages/groupbuy/index.vue:166", "跳转成功", res);
        },
        fail(err) {
          common_vendor.index.__f__("error", "at pages/groupbuy/index.vue:169", "跳转失败", err);
          common_vendor.index.showToast({ title: "跳转失败，请稍后重试", icon: "none" });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(groupList.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: common_vendor.t(common_vendor.unref(utils_common.formatPrice)(item.currentPrice)),
            d: common_vendor.t(item.originalPrice),
            e: common_vendor.t(truncateNotice(item.notice, 40)),
            f: index,
            g: common_vendor.o(($event) => handleJump(), index)
          };
        }),
        d: !loading.value && groupList.value.length === 0
      }, !loading.value && groupList.value.length === 0 ? {
        e: common_assets._imports_0$1
      } : {}, {
        f: common_vendor.p({
          status: loadStatus.value,
          ["content-text"]: {
            contentdown: "上拉加载更多",
            contentrefresh: "正在加载...",
            contentnomore: "没有更多了"
          }
        }),
        g: common_vendor.o(onRefresh),
        h: common_vendor.o(loadMore)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-44a534b9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/groupbuy/index.js.map
