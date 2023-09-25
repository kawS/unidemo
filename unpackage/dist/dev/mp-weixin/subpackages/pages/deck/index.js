"use strict";const t=require("../../../common/vendor.js"),I=require("../../../common/assets.js");Math||L();const L=()=>"../../../components/emptyList/index.js",q={__name:"index",setup(R){const v={MEW:"SV3_5",OBF:"SV3",PAL:"SV2",SVI:"SV1",CRZ:"SS12_5",SIT:"SS12",LOR:"SS11",PGO:"SS10_5",ASR:"SS10",BRS:"SS9",FST:"SS8",CEL:"SS7_5",EVS:"SS7",CRE:"SS6",BST:"SS5"},V=["SV3_5","SV3","SV2","SV1","SS12_5","SS12","SS11","SS10_5","SS10","SS9","SS8","SS7_5","SS7","SS6","SS5"];let f=[],_=0,d=t.ref([]),m=t.ref(!1),i=t.ref(null),E=t.ref(0),y=t.ref(null);t.onLoad(l=>{const a=t.index.getStorageSync("tempDeck"),e=JSON.parse(a);N(e),y.value=e});const N=l=>{t.index.showLoading({title:"加载中",mask:!0});let a={};for(let e of l){if(/^Pokémon/.test(e))continue;if(/^Trainer/.test(e))continue;if(/^Energy/.test(e))continue;if(/^Total Cards/.test(e))continue;if(e=="")continue;let r=null,n=null,c=null,s=null,u=null,S=null,g=e.match(/(\d{1,2}) (.+) ([A-Z]{3}\-[A-Z]{2}|[A-Z]{3}) (\d{1,3})/);if(g==null){if(!/ Energy/.test(e)){E.value+=1;continue}g=e.match(/(\d{1,2}) (.+) (\d{1,3})/),n=g[1],c=g[2];let p=b(c,n);f.push(p),_+=1}else n=g[1],c=g[2],s=g[3],u=null,S=g[4];if(/-/.test(s)){let p=s.split("-");S=`${p[1]} ${S}`,s=p[0]}u=v[s],a[u]||(a[u]=[]),r={count:n,ename:c,series:s,sNo:u,cardNo:S},a[u].push(r)}O(a)},O=l=>{var e;let a=l;for(let r of V)if(((e=a[r])==null?void 0:e.length)>0)switch(r){case"SV3_5":Promise.resolve(require("../seriesDet/json/SV3_5.js")).then(n=>{o(n.default,a[r])});break;case"SV3":Promise.resolve(require("../seriesDet/json/SV3.js")).then(n=>{o(n.default,a[r])});break;case"SV2":Promise.resolve(require("../seriesDet/json/SV2.js")).then(n=>{o(n.default,a[r])});break;case"SV1":Promise.resolve(require("../seriesDet/json/SV1.js")).then(n=>{o(n.default,a[r])});break;case"SS12_5":Promise.resolve(require("../seriesDet/json/SS12_5.js")).then(n=>{o(n.default,a[r])});break;case"SS12":Promise.resolve(require("../seriesDet/json/SS12.js")).then(n=>{o(n.default,a[r])});break;case"SS11":Promise.resolve(require("../seriesDet/json/SS11.js")).then(n=>{o(n.default,a[r])});break;case"SS10_5":Promise.resolve(require("../seriesDet/json/SS10_5.js")).then(n=>{o(n.default,a[r])});break;case"SS10":Promise.resolve(require("../seriesDet/json/SS10.js")).then(n=>{o(n.default,a[r])});break;case"SS9":Promise.resolve(require("../seriesDet/json/SS9.js")).then(n=>{o(n.default,a[r])});break;case"SS8":Promise.resolve(require("../seriesDet/json/SS8.js")).then(n=>{o(n.default,a[r])});break;case"SS7_5":Promise.resolve(require("../seriesDet/json/SS7_5.js")).then(n=>{o(n.default,a[r])});break;case"SS7":Promise.resolve(require("../seriesDet/json/SS7.js")).then(n=>{o(n.default,a[r])});break;case"SS6":Promise.resolve(require("../seriesDet/json/SS6.js")).then(n=>{o(n.default,a[r])});break;case"SS5":Promise.resolve(require("../seriesDet/json/SS5.js")).then(n=>{o(n.default,a[r])});break}},o=(l,a)=>{let e=[];for(let r of l){let n=[],c=r.ename.replace(/ \(.+\)/,"");`${r.cardNo}`.indexOf("|")>0&&(n=r.cardNo.split("|"));for(let s of a)if(n.length>0){if(n.includes(s.cardNo)&&s.ename==c){let u=n.findIndex(g=>g==s.cardNo),S=JSON.parse(JSON.stringify(r));S.count=s.count,S.artIndex=u==0?-1:u-1,e.push(S)}}else if(s.cardNo==r.cardNo&&s.ename==c){let u=JSON.parse(JSON.stringify(r));u.count=s.count,u.artIndex=-1,e.push(u)}}if(_+=e.length,f=[...f,...e],_==f.length){let r=f.filter(s=>s.type=="Pokemon"),n=f.filter(s=>s.type=="Trainers"),c=f.filter(s=>s.type=="Energy");f=[...r,...n,...c],d.value=f,t.index.hideLoading()}},b=(l,a)=>{let r={"Grass Energy":{name:"草",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_091_R_EN.png"},"Fire Energy":{name:"火",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_092_R_EN.png"},"Water Energy":{name:"水",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_093_R_EN.png"},"Lightning Energy":{name:"雷",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_094_R_EN.png"},"Psychic Energy":{name:"超",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_095_R_EN.png"},"Fighting Energy":{name:"斗",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_096_R_EN.png"},"Darkness Energy":{name:"恶",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_097_R_EN.png"},"Metal Energy":{name:"钢",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_098_R_EN.png"},"Fairy Energy":{name:"妖精",img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_099_R_EN.png"}}[l];return{imgUrl:r.img,cardName:r.name+"能量",type:"Energy",enImgUrl:r.img,ename:l,count:a}},P=l=>{l.skillRule=l.skillList.filter(a=>/太晶/g.test(a.name)||/规则/g.test(a.name)),i.value=l,i.value.showImg=i.value.imgUrl,m.value=!0},h=l=>{i.value.showImg=l};return(l,a)=>t.e({a:`overflow: ${t.unref(m)==!0?"hidden":""}`,b:t.t(t.unref(d).length),c:t.t(t.unref(E)),d:t.unref(d).length>0},t.unref(d).length>0?{e:t.f(t.unref(d),(e,r,n)=>{var c;return t.e({a:e.artIndex==-1},e.artIndex==-1?{b:e.enImgUrl}:{c:e==null?void 0:e.artList[e.artIndex]},{d:t.t(e.count),e:t.t(e.series),f:t.t(((c=e==null?void 0:e.artList)==null?void 0:c.length)>0?`|${e.artList.length}`:""),g:t.t(e.cardName),h:t.t(e.ename),i:e.name,j:t.o(s=>P(e),e.name)})}),f:I._imports_0}:{},{g:t.f(t.unref(y),(e,r,n)=>({a:t.t(e),b:r})),h:t.unref(m)},t.unref(m)?t.e({i:t.unref(i).showImg,j:t.unref(i).enImgUrl},t.unref(i).enImgUrl?{k:t.unref(i).imgUrl,l:t.o(e=>h(t.unref(i).imgUrl)),m:t.unref(i).enImgUrl,n:t.o(e=>h(t.unref(i).enImgUrl)),o:t.f(t.unref(i).artList,(e,r,n)=>({a:e,b:t.o(c=>h(e),r),c:r}))}:{},{p:t.unref(i).artList?"":1,q:t.t(t.unref(i).cardName),r:t.t(t.unref(i).ename),s:!/^(基本).*?(能量)$/.test(t.unref(i).cardName)},/^(基本).*?(能量)$/.test(t.unref(i).cardName)?{}:{t:t.f(t.unref(i).skillList,(e,r,n)=>t.e({a:!/太晶/g.test(e.name)&&!/规则/g.test(e.name)},!/太晶/g.test(e.name)&&!/规则/g.test(e.name)?{b:t.t(e.name),c:/太晶/g.test(e.name)?1:"",d:/特性/g.test(e.name)?1:"",e:/规则/g.test(e.name)?1:"",f:/VSTAR力量/g.test(e.name)?1:"",g:t.t(e.effect==""?"-":e.effect)}:{},{h:e.name}))},{v:t.f(t.unref(i).skillRule,(e,r,n)=>({a:t.t(e.name),b:/太晶/g.test(e.name)?1:"",c:/规则/g.test(e.name)?1:"",d:t.t(e.effect==""?"-":e.effect),e:e.name})),w:t.o(e=>t.isRef(m)?m.value=!1:m=!1),x:t.unref(m)?1:""}):{})}},x=t._export_sfc(q,[["__scopeId","data-v-51075066"],["__file","/Users/kaws-mac/Desktop/unidemo/subpackages/pages/deck/index.vue"]]);wx.createPage(x);
