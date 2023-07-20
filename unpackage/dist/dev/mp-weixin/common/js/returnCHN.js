"use strict";
const returnPMType = (type) => {
  const typeJson = {
    "Grass": {
      "name": "草",
      "ename": "Grass",
      "value": "1",
      "imgUrl": "https://asia.pokemon-card.com/various_images/energy/Grass.png"
    },
    "Fire": {
      "name": "火",
      "ename": "Fire",
      "value": "2",
      "imgUrl": "https://asia.pokemon-card.com/various_images/energy/Fire.png"
    },
    "Water": {
      "name": "水",
      "ename": "Water",
      "value": "3",
      "imgUrl": "https://asia.pokemon-card.com/various_images/energy/Water.png"
    },
    "Lightning": {
      "name": "雷",
      "ename": "Lightning",
      "value": "4",
      "imgUrl": "https://asia.pokemon-card.com/various_images/energy/Lightning.png"
    },
    "Psychic": {
      "name": "超",
      "ename": "Psychic",
      "value": "5",
      "imgUrl": "https://asia.pokemon-card.com/various_images/energy/Psychic.png"
    },
    "Fighting": {
      "name": "斗",
      "ename": "Fighting",
      "value": "6",
      "imgUrl": "https://asia.pokemon-card.com/various_images/energy/Fighting.png"
    },
    "Darkness": {
      "name": "恶",
      "ename": "Darkness",
      "value": "7",
      "imgUrl": "https://asia.pokemon-card.com/various_images/energy/Darkness.png"
    },
    "Metal": {
      "name": "钢",
      "ename": "Metal",
      "value": "8",
      "imgUrl": "https://asia.pokemon-card.com/various_images/energy/Metal.png"
    },
    "Fairy": {
      "name": "妖精",
      "ename": "Fairy",
      "value": "9",
      "imgUrl": "https://asia.pokemon-card.com/various_images/energy/Fairy.png"
    },
    "Dragon": {
      "name": "龙",
      "ename": "Dragon",
      "value": "10",
      "imgUrl": "https://asia.pokemon-card.com/various_images/energy/Dragon.png"
    },
    "Colorless": {
      "name": "无",
      "ename": "Colorless",
      "value": "11",
      "imgUrl": "https://asia.pokemon-card.com/various_images/energy/Colorless.png"
    }
  };
  if (typeof type != "string")
    return "";
  if (type == "all") {
    return typeJson;
  } else {
    return typeJson[type];
  }
};
exports.returnPMType = returnPMType;
