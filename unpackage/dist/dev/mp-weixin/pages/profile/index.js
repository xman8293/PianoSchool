"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.ref({
      avatar: "/static/images/avatar.jpg",
      name: "张三",
      phone: "138****8888"
    });
    const menuList = common_vendor.ref([
      { id: 1, text: "个人资料", icon: "icon-profile" },
      { id: 2, text: "我的收藏", icon: "icon-favorite" },
      { id: 3, text: "联系客服", icon: "icon-service" },
      { id: 4, text: "设置", icon: "icon-setting" }
    ]);
    const bookingList = common_vendor.ref([
      {
        id: 1,
        teacherName: "王老师",
        time: "2024-07-15 14:00",
        status: "pending",
        statusText: "待确认"
      },
      {
        id: 2,
        teacherName: "李老师",
        time: "2024-07-20 15:00",
        status: "confirmed",
        statusText: "已确认"
      }
    ]);
    const eventList = common_vendor.ref([
      {
        id: 1,
        title: "夏季音乐会",
        time: "2024-07-15 19:00",
        image: "/static/images/events/event1.jpg"
      }
    ]);
    const handleMenuClick = (menu) => {
      common_vendor.index.navigateTo({
        url: `/pages/${menu.id === 1 ? "profile-edit" : menu.id === 2 ? "favorites" : menu.id === 3 ? "service" : "settings"}/index`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: userInfo.value.avatar,
        b: common_vendor.t(userInfo.value.name),
        c: common_vendor.t(userInfo.value.phone),
        d: common_vendor.f(menuList.value, (menu, k0, i0) => {
          return {
            a: common_vendor.n(menu.icon),
            b: common_vendor.t(menu.text),
            c: menu.id,
            d: common_vendor.o(($event) => handleMenuClick(menu), menu.id)
          };
        }),
        e: common_vendor.f(bookingList.value, (booking, k0, i0) => {
          return {
            a: common_vendor.t(booking.teacherName),
            b: common_vendor.t(booking.time),
            c: common_vendor.t(booking.statusText),
            d: common_vendor.n(booking.status),
            e: booking.id
          };
        }),
        f: common_vendor.f(eventList.value, (event, k0, i0) => {
          return {
            a: event.image,
            b: common_vendor.t(event.title),
            c: common_vendor.t(event.time),
            d: event.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-201c0da5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/index.js.map
