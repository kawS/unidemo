"use strict";const e=require("../../../common/vendor.js"),P=require("../../../common/assets.js");Math||L();const L=()=>"../../../components/emptyList/index.js",x={__name:"index",setup($){const _=["SV3_5","SV3","SV2","SV1","SS12_5","SS12","SS11","SS10_5","SS10","SS9","SS8","SS7_5","SS7","SS6","SS5"];let m=[],d=0,S=e.ref(null),f=e.ref([]),c=e.ref(""),i=e.ref(!1),n=e.ref(null);e.onLoad(u=>{S.value=decodeURIComponent(u.searchinp),g()});const g=async()=>{d=0,m=[],f.value=[],c.value="",e.index.showLoading({title:"加载中",mask:!0}),await p(),setTimeout(function(){e.index.hideLoading()},1500)},p=async()=>{const u=await Promise.resolve(require("./json/SV-series.js")),s=await Promise.resolve(require("./json/SS-series.js"));let r=u.default,a=s.default,t=[];for(let l of r)`${l.name} ${l.ename.toLowerCase()}`.search(S.value.toLowerCase())!=-1&&t.push({name:l.name,series:l.series});for(let l of a)`${l.name} ${l.ename.toLowerCase()}`.search(S.value.toLowerCase())!=-1&&t.push({name:l.name,series:l.series});t.length==0?f.value=[]:b(t)},b=u=>{var r;let s={};for(let a of u)s[a.series]||(s[a.series]=[]),s[a.series].push(a.name);for(let a of _)if(((r=s[a])==null?void 0:r.length)>0)switch(a){case"SV3_5":Promise.resolve(require("../seriesDet/json/SV3_5.js")).then(t=>{o(t.default,s[a])});break;case"SV3":Promise.resolve(require("../seriesDet/json/SV3.js")).then(t=>{o(t.default,s[a])});break;case"SV2":Promise.resolve(require("../seriesDet/json/SV2.js")).then(t=>{o(t.default,s[a])});break;case"SV1":Promise.resolve(require("../seriesDet/json/SV1.js")).then(t=>{o(t.default,s[a])});break;case"SS12_5":Promise.resolve(require("../seriesDet/json/SS12_5.js")).then(t=>{o(t.default,s[a])});break;case"SS12":Promise.resolve(require("../seriesDet/json/SS12.js")).then(t=>{o(t.default,s[a])});break;case"SS11":Promise.resolve(require("../seriesDet/json/SS11.js")).then(t=>{o(t.default,s[a])});break;case"SS10_5":Promise.resolve(require("../seriesDet/json/SS10_5.js")).then(t=>{o(t.default,s[a])});break;case"SS10":Promise.resolve(require("../seriesDet/json/SS10.js")).then(t=>{o(t.default,s[a])});break;case"SS9":Promise.resolve(require("../seriesDet/json/SS9.js")).then(t=>{o(t.default,s[a])});break;case"SS8":Promise.resolve(require("../seriesDet/json/SS8.js")).then(t=>{o(t.default,s[a])});break;case"SS7_5":Promise.resolve(require("../seriesDet/json/SS7_5.js")).then(t=>{o(t.default,s[a])});break;case"SS7":Promise.resolve(require("../seriesDet/json/SS7.js")).then(t=>{o(t.default,s[a])});break;case"SS6":Promise.resolve(require("../seriesDet/json/SS6.js")).then(t=>{o(t.default,s[a])});break;case"SS5":Promise.resolve(require("../seriesDet/json/SS5.js")).then(t=>{o(t.default,s[a])});break}},o=(u,s,r)=>{let a=u.filter(t=>s.includes(t.cardName));d+=a.length,m=[...m,...a],d==m.length&&(f.value=m)},q=()=>{if(c.value==""){e.index.showToast({title:"请输入卡名",icon:"none",duration:2e3});return}e.index.pageScrollTo&&e.index.pageScrollTo({scrollTop:0}),S.value=c.value,g()},w=u=>{u.skillRule=u.skillList.filter(s=>/太晶/g.test(s.name)||/规则/g.test(s.name)),n.value=u,n.value.showImg=n.value.imgUrl,i.value=!0},h=u=>{n.value.showImg=u};return(u,s)=>e.e({a:`overflow: ${e.unref(i)==!0?"hidden":""}`,b:e.t(e.unref(f).length),c:e.unref(c),d:e.o(r=>e.isRef(c)?c.value=r.detail.value:c=r.detail.value),e:e.o(q),f:e.unref(f).length>0},e.unref(f).length>0?{g:e.f(e.unref(f),(r,a,t)=>{var l;return e.e({a:r.isHide!=!0},r.isHide!=!0?{b:P._imports_0,c:r.imgUrl,d:e.t(r.series),e:e.t(((l=r==null?void 0:r.artList)==null?void 0:l.length)>0?`|${r.artList.length}`:""),f:e.t(r.cardName),g:e.t(r.ename),h:e.o(v=>w(r),r.id)}:{},{i:r.id})})}:{},{h:e.unref(i)},e.unref(i)?e.e({i:e.unref(n).showImg,j:e.unref(n).enImgUrl},e.unref(n).enImgUrl?{k:e.unref(n).imgUrl,l:e.o(r=>h(e.unref(n).imgUrl)),m:e.unref(n).enImgUrl,n:e.o(r=>h(e.unref(n).enImgUrl)),o:e.f(e.unref(n).artList,(r,a,t)=>({a:r,b:e.o(l=>h(r),a),c:a}))}:{},{p:e.unref(n).artList?"":1,q:e.t(e.unref(n).cardName),r:e.t(e.unref(n).ename),s:!/^(基本).*?(能量)$/.test(e.unref(n).cardName)},/^(基本).*?(能量)$/.test(e.unref(n).cardName)?{}:{t:e.f(e.unref(n).skillList,(r,a,t)=>e.e({a:!/太晶/g.test(r.name)&&!/规则/g.test(r.name)},!/太晶/g.test(r.name)&&!/规则/g.test(r.name)?{b:e.t(r.name),c:/太晶/g.test(r.name)?1:"",d:/特性/g.test(r.name)?1:"",e:/规则/g.test(r.name)?1:"",f:/VSTAR力量/g.test(r.name)?1:"",g:e.t(r.effect==""?"-":r.effect)}:{},{h:r.name}))},{v:e.f(e.unref(n).skillRule,(r,a,t)=>({a:e.t(r.name),b:/太晶/g.test(r.name)?1:"",c:/规则/g.test(r.name)?1:"",d:e.t(r.effect==""?"-":r.effect),e:r.name})),w:e.o(r=>e.isRef(i)?i.value=!1:i=!1),x:e.unref(i)?1:""}):{})}},I=e._export_sfc(x,[["__scopeId","data-v-85f2d670"],["__file","/Users/kaws-mac/Desktop/unidemo/subpackages/pages/search/index.vue"]]);wx.createPage(I);
