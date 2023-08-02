"use strict";
const sdata = [
  {
    sname: "朱&紫",
    sename: "Scarlet & Violet",
    list: [
      {
        name: "151",
        no: "",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/sv_series/sv035/sv035-slider-logo-en.png",
        isBack: false,
        tipNo: "G"
      },
      {
        name: "Obsidian Flames",
        no: "",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/sv_series/sv03/sv03-slider-logo-en.png",
        isBack: false,
        tipNo: "G"
      },
      {
        name: "Paldea Evolved",
        no: "SV2",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/sv_series/sv02/sv02-slider-logo-en.png",
        isBack: false,
        tipNo: "G"
      },
      {
        name: "Scarlet & Violet",
        no: "SV1",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/sv_series/sv01/sv01-slider-logo-en.png",
        isBack: false,
        tipNo: "G"
      }
    ]
  },
  {
    sname: "剑&盾",
    sename: "Sword & Shield",
    list: [
      {
        name: "Crown Zenith",
        no: "SS12.5",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh125/swsh125-slider-logo-en.png",
        isBack: false,
        tipNo: "F"
      },
      {
        name: "Silver Tempest",
        no: "SS12",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh12/swsh12-slider-logo-en.png",
        isBack: false,
        tipNo: "F"
      },
      {
        name: "Lost Origin",
        no: "SS11",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh11/swsh11-slider-logo-en.png",
        isBack: false,
        tipNo: "F"
      },
      {
        name: "Pokemon Go",
        no: "SS10.5",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/pgo/pgo-slider-logo-en.png",
        isBack: false,
        tipNo: "F"
      },
      {
        name: "Astral Radiance",
        no: "SS10",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh10/swsh10-slider-logo-en.png",
        isBack: false,
        tipNo: "F"
      },
      {
        name: "Brilliant Stars",
        no: "SS9",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh09/swsh09-slider-logo-en.png",
        isBack: false,
        tipNo: "F"
      },
      {
        name: "Fusion Strike",
        no: "SS8",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh08/swsh08-slider-logo-en.png",
        isBack: false,
        tipNo: "E"
      },
      {
        name: "Celebrations",
        no: "SS7.5",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/25th/25th-slider-logo-en.png",
        isBack: false,
        tipNo: "E"
      },
      {
        name: "Evolving Skies",
        no: "SS7",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh07/swsh07-slider-logo-en.png",
        isBack: false,
        tipNo: "E"
      },
      {
        name: "Chilling Reign",
        no: "SS6",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh06/swsh06-slider-logo-en.png",
        isBack: false,
        tipNo: "E"
      },
      {
        name: "Battle Styles",
        no: "SS5",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh05/swsh05-slider-logo-en.png",
        isBack: false,
        tipNo: "E"
      },
      {
        name: "Shining Fates",
        no: "SS4.5",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh045/swsh045-slider-logo-en.png",
        isBack: true,
        tipNo: "D"
      },
      {
        name: "Vivid Voltage",
        no: "SS4",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh04/swsh04-slider-logo-en.png",
        isBack: true,
        tipNo: "D"
      },
      {
        name: "Champion’s Path",
        no: "SS3.5",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh035/swsh035-slider-logo-en.png",
        isBack: true,
        tipNo: "D"
      },
      {
        name: "Darkness Ablaze",
        no: "SS3",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh03/swsh03-slider-logo-en.png",
        isBack: true,
        tipNo: "D"
      },
      {
        name: "Rebel Clash",
        no: "SS2",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh02/swsh02-slider-logo-en.png",
        isBack: true,
        tipNo: "D"
      },
      {
        name: "Sword & Shield",
        no: "SS1",
        logo: "https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/swsh_series/swsh01/swsh01-slider-logo-en.png",
        isBack: true,
        tipNo: "D"
      }
    ]
  }
];
exports.sdata = sdata;
