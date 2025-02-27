"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_common = require("../../utils/common.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const statusBarHeight = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      statusBarHeight.value = systemInfo.statusBarHeight || 0;
      common_vendor.index.__f__("log", "at pages/index/index.vue:149", "页面加载完成");
      const pages = getCurrentPages();
      common_vendor.index.__f__("log", "at pages/index/index.vue:153", "当前页面:", pages[pages.length - 1].route);
      loadStudents();
      loadCertificates();
      loadEvents();
    });
    const swiperList = common_vendor.ref([
      {
        image: "https://scrmconnect-1251489075.cos.ap-beijing.myqcloud.com/wxapp/piano/banner/banner1.png",
        jumpLink: "/pages/introduction/index"
      },
      {
        image: "https://scrmconnect-1251489075.cos.ap-beijing.myqcloud.com/wxapp/piano/banner/banner2.png",
        jumpLink: "/pages/introduction/index"
      },
      {
        image: "https://scrmconnect-1251489075.cos.ap-beijing.myqcloud.com/wxapp/piano/banner/banner3.png",
        jumpLink: "/pages/introduction/index"
      }
    ]);
    const introContent = common_vendor.ref('大奔儿音乐学校成立于2013年，是一家结合艺术培训、考级、艺术教学研发为一体的连锁培训机构，历时十年的沉淀，学校创下了良好的社会口碑，始终坚持"学做人，在学艺"的教学理念。2012年办学至今已培养出44名九级毕业生，33名考级优秀生。2019年至2022年被中央音乐学院评为优秀培训机构全国前五名...');
    const showFullIntro = common_vendor.ref(false);
    const toggleIntroContent = () => {
      showFullIntro.value = !showFullIntro.value;
    };
    const truncatedIntroContent = common_vendor.computed(() => {
      return introContent.value.substring(0, 100) + "...";
    });
    const students = common_vendor.ref([]);
    const certificates = common_vendor.ref([]);
    const events = common_vendor.ref([]);
    const loadStudents = async () => {
      try {
        const res = await common_vendor.er.callFunction({
          name: "getStudents",
          data: {
            page: 1,
            pageSize: 2,
            orderBy: "sort"
          }
        });
        common_vendor.index.__f__("log", "at pages/index/index.vue:243", "学员数据响应:", res);
        if (res.result.code === 200) {
          students.value = res.result.data.list;
        } else {
          common_vendor.index.showToast({
            title: "数据加载失败",
            icon: "none"
          });
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:253", "请求异常:", e);
        common_vendor.index.showToast({
          title: "网络异常",
          icon: "none"
        });
      }
    };
    const loadCertificates = async () => {
      const res = await common_vendor.er.callFunction({
        name: "getCertificates",
        data: {
          page: 1,
          pageSize: 3,
          orderBy: "sort"
        }
      });
      certificates.value = res.result.data.list;
    };
    const loadEvents = async () => {
      try {
        const res = await common_vendor.er.callFunction({
          name: "getEvents",
          data: {
            page: 1,
            pageSize: 2,
            status: "ongoing"
            // 只获取进行中的活动
          }
        });
        common_vendor.index.__f__("log", "at pages/index/index.vue:283", "活动数据:", res);
        if (res.result.code === 200) {
          const validData = res.result.data.list.filter((item) => {
            return item.title && item.cover && item.start_time;
          });
          events.value = validData;
          common_vendor.index.__f__("log", "at pages/index/index.vue:292", "有效活动数据:", JSON.parse(JSON.stringify(validData)));
        } else {
          common_vendor.index.showToast({ title: "活动加载失败", icon: "none" });
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:297", "活动请求异常:", e);
        common_vendor.index.showToast({ title: "网络异常", icon: "none" });
      }
    };
    const navTo = (path) => {
      const tabBarPaths = ["contact/form", "teachers/index", "groupbuy/index"];
      if (tabBarPaths.includes(path)) {
        common_vendor.index.switchTab({
          url: `/pages/${path}`
        });
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/${path}`
        });
      }
    };
    const eventsLoading = common_vendor.ref(false);
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(swiperList.value, (item, index, i0) => {
          return {
            a: item.image,
            b: index
          };
        }),
        b: common_vendor.t(showFullIntro.value ? introContent.value : truncatedIntroContent.value),
        c: common_vendor.t(showFullIntro.value ? "收起" : "展开全文"),
        d: common_vendor.o(toggleIntroContent),
        e: common_vendor.o(($event) => navTo("students/index")),
        f: common_vendor.f(students.value, (item, index, i0) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.intro),
            d: index
          };
        }),
        g: common_vendor.o(($event) => navTo("certificates/index")),
        h: common_vendor.f(certificates.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: index
          };
        }),
        i: common_vendor.o(($event) => navTo("events/index")),
        j: common_vendor.f(events.value, (item, index, i0) => {
          return {
            a: common_vendor.t(getStatusText(item.status)),
            b: common_vendor.n(getStatusClass(item.status)),
            c: item.cover,
            d: common_vendor.t(item.title),
            e: common_vendor.t(common_vendor.unref(utils_common.formatTime)(item.start_time)),
            f: common_vendor.t(item.brief),
            g: index
          };
        }),
        k: eventsLoading.value
      }, eventsLoading.value ? {
        l: common_vendor.f(3, (i, k0, i0) => {
          return {
            a: i
          };
        })
      } : {}, {
        m: common_assets._imports_0,
        n: common_vendor.o(($event) => navTo("contact/form"))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
