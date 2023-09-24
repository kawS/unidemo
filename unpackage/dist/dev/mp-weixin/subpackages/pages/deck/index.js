"use strict";const e=require("../../../common/vendor.js"),L=require("../../../common/assets.js");Math||q();const q=()=>"../../../components/emptyList/index.js",R={__name:"index",setup(I){const v={MEW:"SV3_5",OBF:"SV3",PAL:"SV2",SVI:"SV1",CRZ:"SS12_5",SIT:"SS12",LOR:"SS11",PGO:"SS10_5",ASR:"SS10",BRS:"SS9",FST:"SS8",CEL:"SS7_5",EVS:"SS7",CRE:"SS6",BST:"SS5"},V=["SV3_5","SV3","SV2","SV1","SS12_5","SS12","SS11","SS10_5","SS10","SS9","SS8","SS7_5","SS7","SS6","SS5"];let u=[],_=0,S=e.ref([]),m=e.ref(!1),i=e.ref(null),E=e.ref(0),y=e.ref(null);e.onLoad(c=>{const a=e.index.getStorageSync("tempDeck"),t=JSON.parse(a);b(t),y.value=t});const b=c=>{e.index.showLoading({title:"加载中",mask:!0});let a={};for(let t of c){if(/^Pokémon/.test(t))continue;if(/^Trainer/.test(t))continue;if(/^Energy/.test(t))continue;if(/^Total Cards/.test(t))continue;if(t=="")continue;let r=null,n=null,o=null,s=null,f=null,d=null,g=t.match(/(\d{1,2}) (.+) ([A-Z]{3}\-[A-Z]{2}|[A-Z]{3}) (\d{1,3})/);if(g==null){if(!/ Energy/.test(t)){E.value+=1;continue}g=t.match(/(\d{1,2}) (.+) (\d{1,3})/),n=g[1],o=g[2];let p=P(o,n);u.push(p),_+=1}else n=g[1],o=g[2],s=g[3],f=null,d=g[4];if(/-/.test(s)){let p=s.split("-");d=`${p[1]} ${d}`,s=p[0]}f=v[s],a[f]||(a[f]=[]),r={count:n,ename:o,series:s,sNo:f,cardNo:d},a[f].push(r)}O(a)},O=c=>{var t;let a=c;for(let r of V)if(((t=a[r])==null?void 0:t.length)>0)switch(r){case"SV3_5":Promise.resolve(require("../seriesDet/json/SV3_5.js")).then(n=>{l(n.default,a[r])});break;case"SV3":Promise.resolve(require("../seriesDet/json/SV3.js")).then(n=>{l(n.default,a[r])});break;case"SV2":Promise.resolve(require("../seriesDet/json/SV2.js")).then(n=>{l(n.default,a[r])});break;case"SV1":Promise.resolve(require("../seriesDet/json/SV1.js")).then(n=>{l(n.default,a[r])});break;case"SS12_5":Promise.resolve(require("../seriesDet/json/SS12_5.js")).then(n=>{l(n.default,a[r])});break;case"SS12":Promise.resolve(require("../seriesDet/json/SS12.js")).then(n=>{l(n.default,a[r])});break;case"SS11":Promise.resolve(require("../seriesDet/json/SS11.js")).then(n=>{l(n.default,a[r])});break;case"SS10_5":Promise.resolve(require("../seriesDet/json/SS10_5.js")).then(n=>{l(n.default,a[r])});break;case"SS10":Promise.resolve(require("../seriesDet/json/SS10.js")).then(n=>{l(n.default,a[r])});break;case"SS9":Promise.resolve(require("../seriesDet/json/SS9.js")).then(n=>{l(n.default,a[r])});break;case"SS8":Promise.resolve(require("../seriesDet/json/SS8.js")).then(n=>{l(n.default,a[r])});break;case"SS7_5":Promise.resolve(require("../seriesDet/json/SS7_5.js")).then(n=>{l(n.default,a[r])});break;case"SS7":Promise.resolve(require("../seriesDet/json/SS7.js")).then(n=>{l(n.default,a[r])});break;case"SS6":Promise.resolve(require("../seriesDet/json/SS6.js")).then(n=>{l(n.default,a[r])});break;case"SS5":Promise.resolve(require("../seriesDet/json/SS5.js")).then(n=>{l(n.default,a[r])});break}},l=(c,a)=>{let t=[];for(let r of c){let n=[],o=r.ename.replace(/ \(.+\)/,"");`${r.cardNo}`.indexOf("|")>0&&(n=r.cardNo.split("|"));for(let s of a)n.length>0?n.includes(s.cardNo)&&s.ename==o&&(r.count=s.count,t.push(r)):s.cardNo==r.cardNo&&s.ename==o&&(r.count=s.count,t.push(r))}if(_+=t.length,u=[...u,...t],_==u.length){let r=u.filter(s=>s.type=="Pokemon"),n=u.filter(s=>s.type=="Trainers"),o=u.filter(s=>s.type=="Energy");u=[...r,...n,...o],S.value=u,e.index.hideLoading()}},P=(c,a)=>{let r={"Grass Energy":{name:"草",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_091_R_EN.png"},"Fire Energy":{name:"火",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_092_R_EN.png"},"Water Energy":{name:"水",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_093_R_EN.png"},"Lightning Energy":{name:"雷",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_094_R_EN.png"},"Psychic Energy":{name:"超",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_095_R_EN.png"},"Fighting Energy":{name:"斗",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_096_R_EN.png"},"Darkness Energy":{name:"恶",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_097_R_EN.png"},"Metal Energy":{name:"钢",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_098_R_EN.png"},"Fairy Energy":{name:"妖精",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_099_R_EN.png"}}[c];return{imgUrl:r.img,cardName:r.name+"能量",type:"Energy",enImgUrl:r.img,ename:c,count:a}},N=c=>{c.skillRule=c.skillList.filter(a=>/太晶/g.test(a.name)||/规则/g.test(a.name)),i.value=c,i.value.showImg=i.value.imgUrl,m.value=!0},h=c=>{i.value.showImg=c};return(c,a)=>e.e({a:`overflow: ${e.unref(m)==!0?"hidden":""}`,b:e.t(e.unref(S).length),c:e.t(e.unref(E)),d:e.unref(S).length>0},e.unref(S).length>0?{e:e.f(e.unref(S),(t,r,n)=>{var o;return{a:t.imgUrl,b:e.t(t.count),c:e.t(t.series),d:e.t(((o=t==null?void 0:t.artList)==null?void 0:o.length)>0?`|${t.artList.length}`:""),e:e.t(t.cardName),f:e.t(t.ename),g:t.name,h:e.o(s=>N(t),t.name)}}),f:L._imports_0}:{},{g:e.f(e.unref(y),(t,r,n)=>({a:e.t(t),b:r})),h:e.unref(m)},e.unref(m)?e.e({i:e.unref(i).showImg,j:e.unref(i).enImgUrl},e.unref(i).enImgUrl?{k:e.unref(i).imgUrl,l:e.o(t=>h(e.unref(i).imgUrl)),m:e.unref(i).enImgUrl,n:e.o(t=>h(e.unref(i).enImgUrl)),o:e.f(e.unref(i).artList,(t,r,n)=>({a:t,b:e.o(o=>h(t),r),c:r}))}:{},{p:e.unref(i).artList?"":1,q:e.t(e.unref(i).cardName),r:e.t(e.unref(i).ename),s:!/^(基本).*?(能量)$/.test(e.unref(i).cardName)},/^(基本).*?(能量)$/.test(e.unref(i).cardName)?{}:{t:e.f(e.unref(i).skillList,(t,r,n)=>e.e({a:!/太晶/g.test(t.name)&&!/规则/g.test(t.name)},!/太晶/g.test(t.name)&&!/规则/g.test(t.name)?{b:e.t(t.name),c:/太晶/g.test(t.name)?1:"",d:/特性/g.test(t.name)?1:"",e:/规则/g.test(t.name)?1:"",f:/VSTAR力量/g.test(t.name)?1:"",g:e.t(t.effect==""?"-":t.effect)}:{},{h:t.name}))},{v:e.f(e.unref(i).skillRule,(t,r,n)=>({a:e.t(t.name),b:/太晶/g.test(t.name)?1:"",c:/规则/g.test(t.name)?1:"",d:e.t(t.effect==""?"-":t.effect),e:t.name})),w:e.o(t=>e.isRef(m)?m.value=!1:m=!1),x:e.unref(m)?1:""}):{})}},k=e._export_sfc(R,[["__scopeId","data-v-51075066"],["__file","/Users/kaws-mac/Desktop/unidemo/subpackages/pages/deck/index.vue"]]);wx.createPage(k);
