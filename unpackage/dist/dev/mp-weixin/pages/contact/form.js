"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "form",
  setup(__props) {
    const formData = common_vendor.ref({
      name: "",
      phone: "",
      age: "",
      subject: ""
    });
    const errors = common_vendor.ref({
      name: "",
      phone: "",
      age: ""
    });
    const isSubmitting = common_vendor.ref(false);
    const subjectOptions = common_vendor.ref(["钢琴", "古筝", "小提琴", "吉他", "声乐", "其他"]);
    const onSubjectChange = (e) => {
      const index = e.detail.value;
      formData.value.subject = subjectOptions.value[index];
    };
    const validateForm = () => {
      let isValid = true;
      const newErrors = { name: "", phone: "", age: "" };
      if (!formData.value.name.trim()) {
        newErrors.name = "姓名不能为空";
        isValid = false;
      }
      if (!/^1[3-9]\d{9}$/.test(formData.value.phone)) {
        newErrors.phone = "请输入有效的手机号";
        isValid = false;
      }
      if (!formData.value.age || formData.value.age < 3 || formData.value.age > 18) {
        newErrors.age = "请输入3-18岁的有效年龄";
        isValid = false;
      }
      errors.value = newErrors;
      return isValid;
    };
    const handleSubmit = async () => {
      if (!validateForm())
        return;
      isSubmitting.value = true;
      try {
        const res = await common_vendor.er.callFunction({
          name: "submitFeedback",
          data: {
            ...formData.value,
            createTime: Date.now()
          }
        });
        if (res.result.code === 200) {
          common_vendor.index.showConfirm({
            title: "提交成功",
            content: "感谢您的咨询,我们会尽快与您联系",
            success: function(res2) {
              if (res2.confirm) {
                common_vendor.index.navigateBack();
              }
            }
          });
          formData.value = { name: "", phone: "", age: "", subject: "" };
        } else {
          throw new Error(res.result.msg);
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/contact/form.vue:170", "提交失败:", e);
        common_vendor.index.showToast({ title: "提交失败，请重试", icon: "none" });
      } finally {
        isSubmitting.value = false;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: errors.value.name ? 1 : "",
        c: formData.value.name,
        d: common_vendor.o(($event) => formData.value.name = $event.detail.value),
        e: errors.value.name
      }, errors.value.name ? {
        f: common_vendor.t(errors.value.name)
      } : {}, {
        g: errors.value.phone ? 1 : "",
        h: formData.value.phone,
        i: common_vendor.o(($event) => formData.value.phone = $event.detail.value),
        j: errors.value.phone
      }, errors.value.phone ? {
        k: common_vendor.t(errors.value.phone)
      } : {}, {
        l: errors.value.age ? 1 : "",
        m: formData.value.age,
        n: common_vendor.o(($event) => formData.value.age = $event.detail.value),
        o: errors.value.age
      }, errors.value.age ? {
        p: common_vendor.t(errors.value.age)
      } : {}, {
        q: common_vendor.t(formData.value.subject || "请选择兴趣科目"),
        r: !formData.value.subject ? 1 : "",
        s: subjectOptions.value,
        t: common_vendor.o(onSubjectChange),
        v: common_vendor.t(isSubmitting.value ? "提交中..." : "立即预约"),
        w: isSubmitting.value,
        x: common_vendor.o(handleSubmit)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-443bcdf8"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/contact/form.js.map
