const baseEList = ['Grass Energy', 'Fire Energy', 'Water Energy', 'Lightning Energy', 'Psychic Energy', 'Fighting Energy', 'Darkness Energy', 'Metal Energy']

const returnEnergyData = (ename, count) => {
  let obj = {
    "Grass Energy": {
      "name": "草",
      "img": "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_091_R_EN.png"
    },
    "Fire Energy": {
      "name": "火",
      "img": "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_092_R_EN.png"
    },
    "Water Energy": {
      "name": "水",
      "img": "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_093_R_EN.png"
    },
    "Lightning Energy": {
      "name": "雷",
      "img": "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_094_R_EN.png"
    },
    "Psychic Energy": {
      "name": "超",
      "img": "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_095_R_EN.png"
    },
    "Fighting Energy": {
      "name": "斗",
      "img": "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_096_R_EN.png"
    },
    "Darkness Energy": {
      "name": "恶",
      "img": "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_097_R_EN.png"
    },
    "Metal Energy": {
      "name": "钢",
      "img": "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVO/EVO_098_R_EN.png"
    }
  }
  let _data = obj[ename];
  return {
    "imgUrl": _data.img,
    "cardName": _data.name + "能量",
    "type": "Energy",
    "enImgUrl": _data.img,
    "ename": ename,
    "count": count
  }
}

export { baseEList, returnEnergyData }