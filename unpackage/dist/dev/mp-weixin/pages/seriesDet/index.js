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
    let filterStr = common_vendor.ref("");
    let isShowCard = common_vendor.ref(false);
    let showCardUrl = common_vendor.ref("");
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
        const reg = new RegExp(`[${type}]`, "g");
        return item.type == "Trainers" && reg.test(item.skillList[1].name);
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
      showCardUrl.value = item.imgUrl;
      isShowCard.value = true;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(serName)),
        b: common_vendor.t(common_vendor.unref(detList).length),
        c: common_vendor.unref(sno) == "SV1" || common_vendor.unref(sno) == "SV2"
      }, common_vendor.unref(sno) == "SV1" || common_vendor.unref(sno) == "SV2" ? {
        d: common_vendor.o(showFilter),
        e: common_vendor.unref(classType) == "All" ? 1 : "",
        f: common_vendor.o(($event) => changeTabs("All")),
        g: common_vendor.unref(classType) == "Pokemon" ? 1 : "",
        h: common_vendor.o(($event) => changeTabs("Pokemon")),
        i: common_vendor.unref(classType) == "Trainers" ? 1 : "",
        j: common_vendor.o(($event) => changeTabs("Trainers")),
        k: common_vendor.unref(classType) == "Energy" ? 1 : "",
        l: common_vendor.o(($event) => changeTabs("Energy"))
      } : {}, {
        m: common_vendor.f(common_vendor.unref(detList), (item, k0, i0) => {
          return {
            a: item.imgUrl,
            b: item.id,
            c: common_vendor.o(($event) => showDet(item), item.id)
          };
        }),
        n: common_assets._imports_0,
        o: !common_vendor.unref(isLoading) && common_vendor.unref(detList).length == 0
      }, !common_vendor.unref(isLoading) && common_vendor.unref(detList).length == 0 ? {
        p: common_assets._imports_1
      } : {}, {
        q: common_vendor.f(common_vendor.unref(typeList), (item, k0, i0) => {
          return {
            a: item.imgUrl,
            b: common_vendor.unref(filterStr) == item.ename ? 1 : "",
            c: common_vendor.o(($event) => filterPokemon(item.ename), item.value),
            d: item.value
          };
        }),
        r: common_vendor.unref(classType) == "All" || common_vendor.unref(classType) == "Pokemon",
        s: common_vendor.unref(filterStr) == "竞技场" ? 1 : "",
        t: common_vendor.o(($event) => filterTrainers("竞技场")),
        v: common_vendor.unref(filterStr) == "宝可梦道具" ? 1 : "",
        w: common_vendor.o(($event) => filterTrainers("宝可梦道具")),
        x: common_vendor.unref(filterStr) == "支援者" ? 1 : "",
        y: common_vendor.o(($event) => filterTrainers("支援者")),
        z: common_vendor.unref(filterStr) == "物品" ? 1 : "",
        A: common_vendor.o(($event) => filterTrainers("物品")),
        B: common_vendor.unref(classType) == "All" || common_vendor.unref(classType) == "Trainers",
        C: common_vendor.o(resetList),
        D: common_vendor.o(($event) => common_vendor.isRef(isShowFilter) ? isShowFilter.value = false : isShowFilter = false),
        E: common_vendor.unref(isShowFilter),
        F: common_vendor.unref(isShowCard)
      }, common_vendor.unref(isShowCard) ? {
        G: common_vendor.unref(showCardUrl),
        H: common_vendor.o(($event) => common_vendor.isRef(isShowCard) ? isShowCard.value = false : isShowCard = false),
        I: common_vendor.unref(isShowCard) ? 1 : ""
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-30998fa7"], ["__file", "/Users/kaws-mac/Desktop/unidemo/pages/seriesDet/index.vue"]]);
wx.createPage(MiniProgramPage);
