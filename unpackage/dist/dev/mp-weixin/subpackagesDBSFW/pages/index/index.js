"use strict";const s=require("../../../common/vendor.js"),d=require("../../../common/assets.js");Math||m();const m=()=>"../components/copyright/index.js",g={__name:"index",setup(w){const o={pack:[{series:"FB02",name:"-BLAZING AURA-",img:"https://www.dbs-cardgame.com/fw/images/products/item/FB02_en.webp",type:"BOOSTER PACK",isHide:!0},{series:"FB01",name:"-AWAKENED PULSE-",img:"https://www.dbs-cardgame.com/fw/images/products/item/FB01.webp",type:"BOOSTER PACK"}],deck:[{series:"FS04",name:"-FRIEZA-",img:"https://www.dbs-cardgame.com/fw/images/products/item/FS04.webp",type:"STARTER DECK"},{series:"FS03",name:"-BROLY-",img:"https://www.dbs-cardgame.com/fw/images/products/item/FS03.webp",type:"STARTER DECK"},{series:"FS02",name:"-VEGETA-",img:"https://www.dbs-cardgame.com/fw/images/products/item/FS02.webp",type:"STARTER DECK"},{series:"FS01",name:"-SON GOKU-",img:"https://www.dbs-cardgame.com/fw/images/products/item/FS01.webp",type:"STARTER DECK"}],promo:[{series:"FP",name:"-PROMOTION PACK-",img:"",type:"PROMOTION PACK"}]};let n=s.ref("");s.onLoad(a=>{});const p=()=>{if(n.value==""){s.index.showToast({title:"请输入英文卡名",icon:"none",duration:2e3});return}s.index.navigateTo({url:`/subpackagesDBSFW/pages/search/index?searchinp=${encodeURIComponent(n.value)}`,success:a=>{n.value=""}})},r=a=>{a.isHide||(encodeURIComponent(`${a.type} ${a.name} [${a.no}]`),s.index.navigateTo({url:`/subpackagesDBSFW/pages/list/index?series=${a.series}&name=${encodeURIComponent(a.name)}`}))};return(a,f)=>({a:s.unref(n),b:s.o(e=>s.isRef(n)?n.value=e.detail.value:n=e.detail.value),c:s.o(p),d:s.f(o.pack,(e,t,c)=>({a:e.img,b:s.t(e.name),c:s.t(e.series),d:s.t(e.isHide?"- 暂未发行":""),e:e.isHide?1:"",f:s.o(i=>r(e),e.no),g:e.no})),e:s.f(o.deck,(e,t,c)=>({a:e.img,b:s.t(e.name),c:s.t(e.series),d:s.o(i=>r(e),e.no),e:e.no})),f:s.f(o.promo,(e,t,c)=>({a:s.t(e.name),b:s.t(e.series),c:s.o(i=>r(e),e.no),d:e.no})),g:d._imports_0})}},u=s._export_sfc(g,[["__scopeId","data-v-1d872d9f"],["__file","/Users/kaws-mac/Desktop/unidemo/subpackagesDBSFW/pages/index/index.vue"]]);wx.createPage(u);