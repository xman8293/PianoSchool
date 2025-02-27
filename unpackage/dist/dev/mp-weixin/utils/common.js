"use strict";
const formatPrice = (price) => {
  return Number(price).toFixed(2);
};
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
};
exports.formatPrice = formatPrice;
exports.formatTime = formatTime;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/common.js.map
