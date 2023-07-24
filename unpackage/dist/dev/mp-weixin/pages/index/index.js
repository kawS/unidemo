"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_index_series = require("./series.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
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
        url: `/pages/seriesDet/index?no=${item.no}&sname=${encodeURIComponent(item.name)}`,
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(pages_index_series.sdata), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.sname),
            b: common_vendor.t(item.sename),
            c: common_vendor.f(item.list, (sitem, k1, i1) => {
              return {
                a: sitem.logo,
                b: common_vendor.t(sitem.name),
                c: common_vendor.t(sitem.no),
                d: sitem.no,
                e: common_vendor.o(($event) => goSeries(sitem), sitem.no)
              };
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
