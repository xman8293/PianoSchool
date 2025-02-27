"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  _component_uni_popup();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const founderList = common_vendor.ref([
      {
        id: 1,
        name: "李东霖",
        position: "校长",
        brief: "毕业院校：首都师范大学，20年教学经验",
        avatar: "https://scrmconnect-1251489075.cos.ap-beijing.myqcloud.com/wxapp/piano/teacher/donglin.jpg"
      },
      {
        id: 2,
        name: "李昭霖",
        position: "古筝教研组组长",
        brief: "毕业院校：中央音乐学院",
        avatar: "https://scrmconnect-1251489075.cos.ap-beijing.myqcloud.com/wxapp/piano/teacher/zhaolin.png"
      },
      {
        id: 3,
        name: "邓丽娟",
        position: "钢琴·声乐教研组组长",
        brief: "山西大同大学音乐系教授,35年教学经验",
        avatar: "https://scrmconnect-1251489075.cos.ap-beijing.myqcloud.com/wxapp/piano/teacher/deng.jpg"
      }
    ]);
    const teacherList = common_vendor.ref([]);
    const loading = common_vendor.ref(true);
    const { proxy } = common_vendor.getCurrentInstance();
    const imagePopup = common_vendor.ref(null);
    const previewImage = common_vendor.ref(null);
    common_vendor.onMounted(async () => {
      try {
        const res = await common_vendor.er.callFunction({
          name: "getTeachers",
          data: { page: 1, pageSize: 10 }
        });
        teacherList.value = res.result.data;
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/teachers/index.vue:131", "获取教师数据失败:", e);
        common_vendor.index.showToast({ title: "数据加载失败", icon: "none" });
      } finally {
        loading.value = false;
      }
    });
    const showImage = (url) => {
      previewImage.value = url;
      if (proxy.$refs.imagePopup) {
        proxy.$refs.imagePopup.open();
      }
    };
    const hideImage = () => {
      if (proxy.$refs.imagePopup) {
        proxy.$refs.imagePopup.close();
      }
      previewImage.value = null;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(founderList.value, (founder, k0, i0) => {
          return {
            a: founder.avatar,
            b: common_vendor.o(($event) => showImage(founder.avatar), founder.id),
            c: common_vendor.t(founder.name),
            d: common_vendor.t(founder.position),
            e: common_vendor.t(founder.brief),
            f: founder.id
          };
        }),
        b: common_vendor.f(teacherList.value, (teacher, k0, i0) => {
          return {
            a: teacher.avatar,
            b: common_vendor.o(($event) => showImage(teacher.avatar), teacher._id),
            c: common_vendor.t(teacher.name),
            d: common_vendor.t(teacher.subject),
            e: common_vendor.t(teacher.brief),
            f: common_vendor.f(teacher.tags, (tag, index, i1) => {
              return {
                a: common_vendor.t(tag),
                b: index
              };
            }),
            g: teacher._id
          };
        }),
        c: loading.value
      }, loading.value ? {} : {}, {
        d: previewImage.value
      }, previewImage.value ? {
        e: previewImage.value,
        f: common_vendor.o(() => {
        }),
        g: common_vendor.o(hideImage),
        h: common_vendor.sr(imagePopup, "23214e98-0", {
          "k": "imagePopup"
        }),
        i: common_vendor.p({
          type: "center",
          ["is-mask-click"]: true,
          ["mask-click"]: false
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-23214e98"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/teachers/index.js.map
