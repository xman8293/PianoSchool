"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const statusBarHeight = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      statusBarHeight.value = systemInfo.statusBarHeight || 0;
      common_vendor.index.__f__("log", "at pages/index/index.vue:60", "页面加载完成");
      const pages = getCurrentPages();
      common_vendor.index.__f__("log", "at pages/index/index.vue:63", "当前页面:", pages[pages.length - 1].route);
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
    const advantagesList = common_vendor.ref([
      {
        icon: "/static/img/zhuanye.png",
        text: "专业师资团队"
      },
      {
        icon: "/static/img/tese.png",
        text: "特色课程体系"
      },
      {
        icon: "/static/img/huanjing.png",
        text: "优质教学环境"
      },
      {
        icon: "/static/img/tese.png",
        text: "十年办学经验"
      },
      {
        icon: "/static/img/huanjing.png",
        text: "考级优秀率说明"
      }
    ]);
    const showFullIntro = common_vendor.ref(false);
    const toggleIntroContent = () => {
      showFullIntro.value = !showFullIntro.value;
    };
    const truncatedIntroContent = common_vendor.computed(() => {
      return introContent.value.substring(0, 100) + "...";
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(swiperList.value, (item, index, i0) => {
          return {
            a: item.image,
            b: index
          };
        }),
        b: !showFullIntro.value
      }, !showFullIntro.value ? {
        c: common_vendor.t(truncatedIntroContent.value)
      } : {
        d: common_vendor.t(introContent.value)
      }, {
        e: common_vendor.t(showFullIntro.value ? "收起" : "查看更多"),
        f: common_vendor.o(toggleIntroContent),
        g: common_vendor.f(advantagesList.value, (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.text),
            c: index
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
