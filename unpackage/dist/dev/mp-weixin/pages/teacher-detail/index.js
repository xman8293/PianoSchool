"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  _component_uni_popup();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const popup = common_vendor.ref(null);
    const teacherInfo = common_vendor.ref({
      id: 1,
      name: "王老师",
      subject: "钢琴",
      avatar: "/static/images/teachers/teacher1.jpg",
      experience: "毕业于中央音乐学院钢琴系，从教15年。曾获得多项国际钢琴比赛奖项...",
      features: "因材施教，注重基本功培养，针对不同年龄段学员制定个性化教学计划..."
    });
    const bookingForm = common_vendor.ref({
      name: "",
      phone: "",
      date: ""
    });
    const showBookingForm = () => {
      popup.value.open();
    };
    const closeBookingForm = () => {
      popup.value.close();
    };
    const onDateChange = (e) => {
      bookingForm.value.date = e.detail.value;
    };
    const submitBooking = () => {
      common_vendor.index.showToast({
        title: "预约成功",
        icon: "success"
      });
      closeBookingForm();
    };
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      currentPage.options.id;
    });
    return (_ctx, _cache) => {
      return {
        a: teacherInfo.value.avatar,
        b: common_vendor.t(teacherInfo.value.name),
        c: common_vendor.t(teacherInfo.value.subject),
        d: common_vendor.t(teacherInfo.value.experience),
        e: common_vendor.t(teacherInfo.value.features),
        f: common_vendor.o(showBookingForm),
        g: bookingForm.value.name,
        h: common_vendor.o(($event) => bookingForm.value.name = $event.detail.value),
        i: bookingForm.value.phone,
        j: common_vendor.o(($event) => bookingForm.value.phone = $event.detail.value),
        k: common_vendor.t(bookingForm.value.date || "请选择预约日期"),
        l: bookingForm.value.date,
        m: common_vendor.o(onDateChange),
        n: common_vendor.o(closeBookingForm),
        o: common_vendor.o(submitBooking),
        p: common_vendor.sr(popup, "cadfe1ad-0", {
          "k": "popup"
        }),
        q: common_vendor.p({
          type: "center"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cadfe1ad"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/teacher-detail/index.js.map
