import{r as e,o as s,_ as a,p as l,q as i,a as n,c as t,e as r,u as o,b as c,t as m,m as g,F as u,f as v,v as p,g as d,w as _,x as k,i as h,y as S,h as y,z as b,k as E,A as D}from"./index-5aef285e.js";import{_ as j,e as f,a as T}from"./index.2722961b.js";import{_ as L,c as V}from"./index.59043243.js";const I=L({__name:"index",setup(L){const I=(e=>{const s={Grass:{name:"草",ename:"Grass",value:"1",imgUrl:"https://asia.pokemon-card.com/various_images/energy/Grass.png"},Fire:{name:"火",ename:"Fire",value:"2",imgUrl:"https://asia.pokemon-card.com/various_images/energy/Fire.png"},Water:{name:"水",ename:"Water",value:"3",imgUrl:"https://asia.pokemon-card.com/various_images/energy/Water.png"},Lightning:{name:"雷",ename:"Lightning",value:"4",imgUrl:"https://asia.pokemon-card.com/various_images/energy/Lightning.png"},Psychic:{name:"超",ename:"Psychic",value:"5",imgUrl:"https://asia.pokemon-card.com/various_images/energy/Psychic.png"},Fighting:{name:"斗",ename:"Fighting",value:"6",imgUrl:"https://asia.pokemon-card.com/various_images/energy/Fighting.png"},Darkness:{name:"恶",ename:"Darkness",value:"7",imgUrl:"https://asia.pokemon-card.com/various_images/energy/Darkness.png"},Metal:{name:"钢",ename:"Metal",value:"8",imgUrl:"https://asia.pokemon-card.com/various_images/energy/Metal.png"},Fairy:{name:"妖精",ename:"Fairy",value:"9",imgUrl:"https://asia.pokemon-card.com/various_images/energy/Fairy.png"},Dragon:{name:"龙",ename:"Dragon",value:"10",imgUrl:"https://asia.pokemon-card.com/various_images/energy/Dragon.png"},Colorless:{name:"无",ename:"Colorless",value:"11",imgUrl:"https://asia.pokemon-card.com/various_images/energy/Colorless.png"}};return"string"!=typeof e?"":"all"==e?s:s[e]})("all");let A=e(!0),P=e(null),C=e(null),R=e(null),U=e([]),F=e([]),w=e([]),O=e([]),x=e([]),z=e("All"),G=e(!1),M=e(null),N=e(!1),W=e(null);s((e=>{switch(P.value=e.no,C.value=decodeURIComponent(e.sname),R.value=e.code,P.value){case"SV4":a((()=>import("./subpackages-pages-seriesDet-json-SV4.bfa5dbaf.js")),[]).then((e=>{$(e)}));break;case"SV3.5":a((()=>import("./subpackages-pages-seriesDet-json-SV3_5.cf409905.js")),[]).then((e=>{$(e)}));break;case"SV3":a((()=>import("./subpackages-pages-seriesDet-json-SV3.678bfcba.js")),[]).then((e=>{$(e)}));break;case"SV2":a((()=>import("./subpackages-pages-seriesDet-json-SV2.f2886d38.js")),[]).then((e=>{$(e)}));break;case"SV1":a((()=>import("./subpackages-pages-seriesDet-json-SV1.8901e7ab.js")),[]).then((e=>{$(e)}));break;case"SS12.5":a((()=>import("./subpackages-pages-seriesDet-json-SS12_5.2372cb44.js")),[]).then((e=>{$(e)}));break;case"SS12":a((()=>import("./subpackages-pages-seriesDet-json-SS12.8194e765.js")),[]).then((e=>{$(e)}));break;case"SS11":a((()=>import("./subpackages-pages-seriesDet-json-SS11.fcac839f.js")),[]).then((e=>{$(e)}));break;case"SS10.5":a((()=>import("./subpackages-pages-seriesDet-json-SS10_5.106dbbd3.js")),[]).then((e=>{$(e)}));break;case"SS10":a((()=>import("./subpackages-pages-seriesDet-json-SS10.9df3841a.js")),[]).then((e=>{$(e)}));break;case"SS9":a((()=>import("./subpackages-pages-seriesDet-json-SS9.35ed76c9.js")),[]).then((e=>{$(e)}));break;case"SS8":a((()=>import("./subpackages-pages-seriesDet-json-SS8.0311d26d.js")),[]).then((e=>{$(e)}));break;case"SS7.5":a((()=>import("./subpackages-pages-seriesDet-json-SS7_5.ce669119.js")),[]).then((e=>{$(e)}));break;case"SS7":a((()=>import("./subpackages-pages-seriesDet-json-SS7.e8226bc9.js")),[]).then((e=>{$(e)}));break;case"SS6":a((()=>import("./subpackages-pages-seriesDet-json-SS6.a56d82b9.js")),[]).then((e=>{$(e)}));break;case"SS5":a((()=>import("./subpackages-pages-seriesDet-json-SS5.0c6713c6.js")),[]).then((e=>{$(e)}));break;default:A.value=!1}}));const $=e=>{l({title:"加载中",mask:!0}),U.value=e.default,F.value=e.default,w.value=e.default.filter((e=>"Pokemon"==e.type)),O.value=e.default.filter((e=>"Trainers"==e.type)),x.value=e.default.filter((e=>"Energy"==e.type)),A.value=!1,setTimeout((function(){i()}),1e3)},H=(e=1e3)=>{l({title:"加载中",mask:!0}),setTimeout((function(){i()}),e)},q=e=>{switch(S&&S({scrollTop:0}),H(),z.value=e,e){case"All":U.value=F.value;break;case"Pokemon":U.value=w.value;break;case"Trainers":U.value=O.value;break;case"Energy":U.value=x.value}},B=()=>{"Energy"!=z.value?G.value=!0:y({title:"暂无过滤选项",icon:"none",duration:2e3})},J=e=>{S&&S({scrollTop:0}),H(),M.value=e,U.value=F.value.filter((s=>{var a,l,i;const n=new RegExp(`[${e}]`,"g");return"Trainers"==s.type&&(n.test(null==(a=s.skillList[2])?void 0:a.name)||n.test(null==(l=s.skillList[1])?void 0:l.name)||n.test(null==(i=s.skillList[0])?void 0:i.name))})),z.value="Trainers",G.value=!1},K=()=>{H(),M.value="",U.value=F.value,z.value="All",G.value=!1},Q=e=>{W.value.showImg=e};return(e,s)=>{const a=b(D("page-meta"),T),l=E;return n(),t(u,null,[r(a,{"page-style":"overflow: "+(1==o(N)?"hidden":"")},null,8,["page-style"]),c("div",{class:"fctrl"},[c("div",{class:"info"},[c("div",null,m(o(C))+" - "+m(o(P))+" - "+m(o(R)),1),c("div",null,"共"+m(o(U).length)+"张",1)]),c("div",{class:"tabs"},[c("div",{class:"tn xs",onClick:B},"过滤"),c("div",{class:g(["tn",{on:"All"==o(z)}]),onClick:s[0]||(s[0]=e=>q("All"))},"全部",2),c("div",{class:g(["tn",{on:"Pokemon"==o(z)}]),onClick:s[1]||(s[1]=e=>q("Pokemon"))},"宝可梦卡",2),c("div",{class:g(["tn",{on:"Trainers"==o(z)}]),onClick:s[2]||(s[2]=e=>q("Trainers"))},"训练家卡",2),c("div",{class:g(["tn",{on:"Energy"==o(z)}]),onClick:s[3]||(s[3]=e=>q("Energy"))},"能量卡",2)])]),c("div",{class:"list"},[(n(!0),t(u,null,v(o(U),(e=>{var s;return n(),t("div",{key:e.id,class:"item",onClick:s=>(e=>{e.skillRule=e.skillList.filter((e=>/太晶/g.test(e.name)||/规则/g.test(e.name))),W.value=e,W.value.showImg=W.value.imgUrl,N.value=!0})(e)},[c("div",{class:"picwp"},[r(l,{src:j,mode:"widthFix",class:"cback"}),r(l,{src:e.imgUrl,"lazy-load":"",mode:"heightFix",class:"img"},null,8,["src"]),c("div",{class:"series"},m(e.series)+m((null==(s=null==e?void 0:e.artList)?void 0:s.length)>0?`|${e.artList.length}`:""),1)]),c("div",null,m(e.cardName),1),c("div",null,m(e.ename),1)],8,["onClick"])})),128))]),o(A)||0!=o(U).length?d("",!0):(n(),p(f,{key:0})),r(V),_(c("div",{class:"popups"},[c("div",{class:"p-filter"},[_(c("div",{class:"tclass"},[c("div",null,"宝可梦卡"),c("div",{class:"plist"},[(n(!0),t(u,null,v(o(I),(e=>(n(),t("div",{class:g(["item",{on:o(M)==e.ename}]),onClick:s=>{return a=e.ename,S&&S({scrollTop:0}),H(),M.value=a,U.value=F.value.filter((e=>e.typeEnergy==a)),z.value="Pokemon",void(G.value=!1);var a},key:e.value},[r(l,{src:e.imgUrl,mode:"widthFix",class:"img"},null,8,["src"])],10,["onClick"])))),128))])],512),[[k,"All"==o(z)||"Pokemon"==o(z)]]),_(c("div",{class:"tclass"},[c("div",null,"训练家卡"),c("div",{class:"plist"},[c("div",{class:g(["item",{on:"竞技场"==o(M)}]),onClick:s[4]||(s[4]=e=>J("竞技场"))},"竞技场",2),c("div",{class:g(["item",{on:"支援者"==o(M)}]),onClick:s[5]||(s[5]=e=>J("支援者"))},"支援者",2),c("div",{class:g(["item",{on:"宝可梦道具"==o(M)}]),onClick:s[6]||(s[6]=e=>J("宝可梦道具"))},"宝可梦道具",2),c("div",{class:g(["item",{on:"物品"==o(M)}]),onClick:s[7]||(s[7]=e=>J("物品"))},"物品",2)])],512),[[k,"All"==o(z)||"Trainers"==o(z)]]),c("div",{class:"ctrl"},[c("div",{class:"bns",onClick:K},"重置"),c("div",{class:"bns",onClick:s[8]||(s[8]=e=>h(G)?G.value=!1:G=!1)},"关闭")])])],512),[[k,o(G)]]),o(N)?(n(),t("div",{key:1,class:"popups"},[c("div",{class:g(["p-showcard",{animate__zoomIn:o(N)}])},[c("div",{class:g(["cardShow",{tc:!o(W).artList}])},[r(l,{src:o(W).showImg,mode:"scaleToFill",class:"img"},null,8,["src"]),o(W).enImgUrl&&!o(W).isHide?(n(),t("div",{key:0,class:"artList"},[r(l,{src:o(W).imgUrl,"lazy-load":"",mode:"widthFix",class:"img",onClick:s[9]||(s[9]=e=>Q(o(W).imgUrl))},null,8,["src"]),1!=o(W).isHide?(n(),p(l,{key:0,src:o(W).enImgUrl,"lazy-load":"",mode:"widthFix",class:"img",onClick:s[10]||(s[10]=e=>Q(o(W).enImgUrl))},null,8,["src"])):d("",!0),(n(!0),t(u,null,v(o(W).artList,((e,s)=>(n(),p(l,{key:s,src:e,mode:"widthFix",class:"img",onClick:s=>Q(e)},null,8,["src","onClick"])))),128))])):d("",!0)],2),c("div",{class:"detInfo"},[c("div",{class:"name"},m(o(W).cardName),1),c("div",{class:"name"},m(o(W).ename),1),/^(基本).*?(能量)$/.test(o(W).cardName)?d("",!0):(n(),t("div",{key:0,class:"skill"},[(n(!0),t(u,null,v(o(W).skillList,(e=>(n(),t(u,{key:e.name},[/太晶/g.test(e.name)||/规则/g.test(e.name)?d("",!0):(n(),t("div",{key:0,class:"item"},[c("div",{class:g(["sname",{tera:/太晶/g.test(e.name),ability:/特性/g.test(e.name),grule:/规则/g.test(e.name),vstar:/VSTAR力量/g.test(e.name)}])},m(e.name),3),c("div",{class:"sdet"},m(""==e.effect?"-":e.effect),1)]))],64)))),128))])),c("div",{class:"skill rule"},[(n(!0),t(u,null,v(o(W).skillRule,(e=>(n(),t("div",{class:"item",key:e.name},[c("div",{class:g(["sname",{tera:/太晶/g.test(e.name),grule:/规则/g.test(e.name)}])},m(e.name),3),c("div",{class:"sdet"},m(""==e.effect?"-":e.effect),1)])))),128))])]),c("div",{class:"close",onClick:s[11]||(s[11]=e=>h(N)?N.value=!1:N=!1)},"关闭")],2)])):d("",!0)],64)}}},[["__scopeId","data-v-15c3fc13"]]);export{I as default};
