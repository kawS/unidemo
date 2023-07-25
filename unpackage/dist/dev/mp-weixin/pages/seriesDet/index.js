"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const common_js_returnCHN = require("../../common/js/returnCHN.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const typeList = common_js_returnCHN.returnPMType("all");
    let isLoading = common_vendor.ref(true);
    let sno = common_vendor.ref(null);
    let serName = common_vendor.ref(null);
    let detList = common_vendor.ref([]);
    let aList = common_vendor.ref([]);
    let pList = common_vendor.ref([]);
    let tList = common_vendor.ref([]);
    let eList = common_vendor.ref([]);
    let classType = common_vendor.ref("All");
    let isShowFilter = common_vendor.ref(false);
    let filterStr = common_vendor.ref(null);
    let isShowCard = common_vendor.ref(false);
    let showCardDet = common_vendor.ref(null);
    common_vendor.onLoad((options) => {
      sno = options.no;
      serName.value = decodeURIComponent(options.sname);
      switch (sno) {
        case "SV1":
          Promise.resolve(require("./SV1.js")).then((res) => {
            getData(res);
          });
          break;
        case "SV2":
          Promise.resolve(require("./SV2.js")).then((res) => {
            getData(res);
          });
          break;
        case "SS12.5":
          Promise.resolve(require("./SS12_5.js")).then((res) => {
            getData(res);
          });
          break;
        case "SS12":
          Promise.resolve(require("./SS12.js")).then((res) => {
            getData(res);
          });
          break;
        case "SS11":
          Promise.resolve(require("./SS11.js")).then((res) => {
            getData(res);
          });
          break;
        case "SS10.5":
          Promise.resolve(require("./SS10_5.js")).then((res) => {
            getData(res);
          });
          break;
        case "SS10":
          Promise.resolve(require("./SS10.js")).then((res) => {
            getData(res);
          });
          break;
        case "SS9":
          Promise.resolve(require("./SS9.js")).then((res) => {
            getData(res);
          });
          break;
        case "SS8":
          Promise.resolve(require("./SS8.js")).then((res) => {
            getData(res);
          });
          break;
        case "SS7.5":
          Promise.resolve(require("./SS7_5.js")).then((res) => {
            getData(res);
          });
          break;
        default:
          isLoading.value = false;
          break;
      }
    });
    const getData = (res) => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      detList.value = res.default;
      aList.value = res.default;
      pList.value = res.default.filter((item) => {
        return item.type == "Pokemon";
      });
      tList.value = res.default.filter((item) => {
        return item.type == "Trainers";
      });
      eList.value = res.default.filter((item) => {
        return item.type == "Energy";
      });
      isLoading.value = false;
      setTimeout(function() {
        common_vendor.index.hideLoading();
      }, 2e3);
    };
    const _showLoading = (duration = 2e3) => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      setTimeout(function() {
        common_vendor.index.hideLoading();
      }, duration);
    };
    const changeTabs = (type) => {
      _showLoading();
      classType.value = type;
      switch (type) {
        case "All":
          detList.value = aList.value;
          break;
        case "Pokemon":
          detList.value = pList.value;
          break;
        case "Trainers":
          detList.value = tList.value;
          break;
        case "Energy":
          detList.value = eList.value;
          break;
      }
    };
    const showFilter = () => {
      if (classType.value == "Energy") {
        common_vendor.index.showToast({
          title: "暂无过滤选项",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      isShowFilter.value = true;
    };
    const filterPokemon = (type) => {
      _showLoading();
      filterStr.value = type;
      detList.value = aList.value.filter((item) => {
        return item.typeEnergy == type;
      });
      classType.value = "Pokemon";
      isShowFilter.value = false;
    };
    const filterTrainers = (type) => {
      _showLoading();
      filterStr.value = type;
      detList.value = aList.value.filter((item) => {
        var _a;
        const reg = new RegExp(`[${type}]`, "g");
        return item.type == "Trainers" && (reg.test(item.skillList[1].name) || reg.test((_a = item.skillList[0]) == null ? void 0 : _a.name));
      });
      classType.value = "Trainers";
      isShowFilter.value = false;
    };
    const resetList = () => {
      _showLoading();
      filterStr.value = "";
      detList.value = aList.value;
      classType.value = "All";
      isShowFilter.value = false;
    };
    const showDet = (item) => {
      showCardDet.value = item;
      isShowCard.value = true;
    };
    const returnShowFilterDom = (sno2) => {
      return sno2 == "SV1" || sno2 == "SV2" || sno2 == "SS12" || sno2 == "SS12.5" || sno2 == "SS11" || sno2 == "SS10.5" || sno2 == "SS10" || sno2 == "SS9" || sno2 == "SS8" || sno2 == "SS7.5";
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: `overflow: ${common_vendor.unref(isShowCard) == true ? "hidden" : ""}`,
        b: common_vendor.t(common_vendor.unref(serName)),
        c: common_vendor.t(common_vendor.unref(sno)),
        d: common_vendor.t(common_vendor.unref(detList).length),
        e: returnShowFilterDom(common_vendor.unref(sno))
      }, returnShowFilterDom(common_vendor.unref(sno)) ? {
        f: common_vendor.o(showFilter),
        g: common_vendor.unref(classType) == "All" ? 1 : "",
        h: common_vendor.o(($event) => changeTabs("All")),
        i: common_vendor.unref(classType) == "Pokemon" ? 1 : "",
        j: common_vendor.o(($event) => changeTabs("Pokemon")),
        k: common_vendor.unref(classType) == "Trainers" ? 1 : "",
        l: common_vendor.o(($event) => changeTabs("Trainers")),
        m: common_vendor.unref(classType) == "Energy" ? 1 : "",
        n: common_vendor.o(($event) => changeTabs("Energy"))
      } : {}, {
        o: common_vendor.f(common_vendor.unref(detList), (item, k0, i0) => {
          return {
            a: item.imgUrl,
            b: item.id,
            c: common_vendor.o(($event) => showDet(item), item.id)
          };
        }),
        p: common_assets._imports_0,
        q: !common_vendor.unref(isLoading) && common_vendor.unref(detList).length == 0
      }, !common_vendor.unref(isLoading) && common_vendor.unref(detList).length == 0 ? {
        r: common_assets._imports_1
      } : {}, {
        s: common_vendor.f(common_vendor.unref(typeList), (item, k0, i0) => {
          return {
            a: item.imgUrl,
            b: common_vendor.unref(filterStr) == item.ename ? 1 : "",
            c: common_vendor.o(($event) => filterPokemon(item.ename), item.value),
            d: item.value
          };
        }),
        t: common_vendor.unref(classType) == "All" || common_vendor.unref(classType) == "Pokemon",
        v: common_vendor.unref(filterStr) == "竞技场" ? 1 : "",
        w: common_vendor.o(($event) => filterTrainers("竞技场")),
        x: common_vendor.unref(filterStr) == "宝可梦道具" ? 1 : "",
        y: common_vendor.o(($event) => filterTrainers("宝可梦道具")),
        z: common_vendor.unref(filterStr) == "支援者" ? 1 : "",
        A: common_vendor.o(($event) => filterTrainers("支援者")),
        B: common_vendor.unref(filterStr) == "物品" ? 1 : "",
        C: common_vendor.o(($event) => filterTrainers("物品")),
        D: common_vendor.unref(classType) == "All" || common_vendor.unref(classType) == "Trainers",
        E: common_vendor.o(resetList),
        F: common_vendor.o(($event) => common_vendor.isRef(isShowFilter) ? isShowFilter.value = false : isShowFilter = false),
        G: common_vendor.unref(isShowFilter),
        H: common_vendor.unref(isShowCard)
      }, common_vendor.unref(isShowCard) ? common_vendor.e({
        I: common_vendor.unref(showCardDet).imgUrl,
        J: common_vendor.t(common_vendor.unref(showCardDet).cardName),
        K: !/^(基本).*?(能量)$/.test(common_vendor.unref(showCardDet).cardName)
      }, !/^(基本).*?(能量)$/.test(common_vendor.unref(showCardDet).cardName) ? {
        L: common_vendor.f(common_vendor.unref(showCardDet).skillList, (skill, k0, i0) => {
          return {
            a: common_vendor.t(skill.name),
            b: /太晶/g.test(skill.name) ? 1 : "",
            c: /特性/g.test(skill.name) ? 1 : "",
            d: /规则/g.test(skill.name) ? 1 : "",
            e: /VSTAR力量/g.test(skill.name) ? 1 : "",
            f: common_vendor.t(skill.effect == "" ? "-" : skill.effect),
            g: skill.name
          };
        })
      } : {}, {
        M: common_vendor.o(($event) => common_vendor.isRef(isShowCard) ? isShowCard.value = false : isShowCard = false),
        N: common_vendor.unref(isShowCard) ? 1 : ""
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-30998fa7"], ["__file", "/Users/kaws-mac/Desktop/unidemo/pages/seriesDet/index.vue"]]);
wx.createPage(MiniProgramPage);
