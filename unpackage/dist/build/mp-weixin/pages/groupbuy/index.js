"use strict";const e=require("../../common/vendor.js"),a=require("../../common/assets.js"),t=require("../../utils/common.js");if(!Array){e.resolveComponent("uni-load-more")()}const o={__name:"index",setup(o){const n=e.ref([]),r=e.ref(!0),l=e.ref(!1),s=e.ref(1),i=e.ref(0),u=e.ref("more"),c=async(a=1,t=!1)=>{if("noMore"!==u.value){u.value="loading",e.index.showLoading({title:"加载中",mask:!0});try{const o=await Promise.race([e.er.callFunction({name:"getGroupbuyList",data:{page:a,pageSize:10}}),new Promise(((e,a)=>setTimeout((()=>a(new Error("请求超时"))),1e4)))]);if(200!==o.result.code)throw new Error(o.result.msg);i.value=o.result.data.total,n.value=t?o.result.data.list:[...n.value,...o.result.data.list],u.value=o.result.data.list.length<10?"noMore":"more",r.value=!1}catch(o){r.value=!1,l.value=!0,console.error("加载团购数据失败:",o),e.index.showToast({title:o.message.includes("超时")?"请求超时，请重试":"加载失败",icon:"none"})}finally{e.index.hideLoading(),r.value=!1}}},d=async()=>{s.value=1,await c(1,!0),e.index.stopPullDownRefresh()},v=()=>{"more"===u.value&&(s.value++,c(s.value))};e.onMounted((()=>{c()}));return(o,l)=>e.e({a:r.value},r.value?{b:e.p({status:"loading"})}:{},{c:e.f(n.value,((a,o,n)=>{return{a:a.image,b:e.t(a.name),c:e.t(e.unref(t.formatPrice)(a.currentPrice)),d:e.t(a.originalPrice),e:e.t((r=a.notice,l=40,r.length>l?r.substring(0,l)+"...":r)),f:o,g:e.o((a=>{e.index.navigateToMiniProgram({appId:"wxde8ac0a21135c07d",path:"gc/pages/deal/dealdetail/dealdetail?dealid=828645933&shopid=1502583614",success(e){console.log("跳转成功",e)},fail(a){console.error("跳转失败",a),e.index.showToast({title:"跳转失败，请稍后重试",icon:"none"})}})}),o)};var r,l})),d:!r.value&&0===n.value.length},r.value||0!==n.value.length?{}:{e:a._imports_0$1},{f:e.p({status:u.value,"content-text":{contentdown:"上拉加载更多",contentrefresh:"正在加载...",contentnomore:"没有更多了"}}),g:e.o(d),h:e.o(v)})}},n=e._export_sfc(o,[["__scopeId","data-v-de11a709"]]);wx.createPage(n);
