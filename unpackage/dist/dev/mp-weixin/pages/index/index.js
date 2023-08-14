"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_index_series = require("./series.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const tipNowNo = common_vendor.ref("E/F/G");
    let showImgType = common_vendor.ref(null);
    common_vendor.onLoad((options) => {
      let t = common_vendor.index.getStorageSync("imgType");
      if (t == "en") {
        showImgType.value = t;
      } else {
        showImgType.value = null;
      }
    });
    const setLag = (type) => {
      common_vendor.index.setStorageSync("imgType", type);
      showImgType.value = type == "en" ? "en" : null;
    };
    const goSeries = (item) => {
      if (item.no == "") {
        common_vendor.index.showToast({
          title: "暂未发行",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: `/subpackages/pages/seriesDet/index?no=${item.no}&sname=${encodeURIComponent(item.name)}`,
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    };
    const copyTar = (url) => {
      common_vendor.index.setClipboardData({
        data: url,
        success(res) {
          common_vendor.index.showToast({
            title: "Limitless网址已复制，请用浏览器打开",
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => copyTar("https://play.limitlesstcg.com/decks")),
        b: common_vendor.unref(showImgType) == "en" ? 1 : "",
        c: common_vendor.o(($event) => setLag("en")),
        d: common_vendor.unref(showImgType) == null ? 1 : "",
        e: common_vendor.o(($event) => setLag("cn")),
        f: common_vendor.t(tipNowNo.value),
        g: common_vendor.f(common_vendor.unref(pages_index_series.sdata), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.sname),
            b: common_vendor.t(item.sename),
            c: common_vendor.f(item.list, (sitem, k1, i1) => {
              return common_vendor.e({
                a: !sitem.isBack
              }, !sitem.isBack ? {
                b: sitem.logo,
                c: common_vendor.t(sitem.name),
                d: common_vendor.t(sitem.no),
                e: common_vendor.t(sitem.tipNo),
                f: common_vendor.o(($event) => goSeries(sitem), sitem.no)
              } : {
                g: sitem.logo,
                h: common_vendor.t(sitem.name),
                i: common_vendor.t(sitem.no),
                j: common_vendor.t(sitem.tipNo)
              }, {
                k: sitem.no
              });
            }),
            d: item.sname
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/kaws-mac/Desktop/unidemo/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
