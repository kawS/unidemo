<template>
	<page-meta :page-style="`overflow: ${isShowCard == true ? 'hidden' : '' }`" />
	<div class="fctrl">
		<div class="info">
			<div>卡组列表</div>
			<div>共{{ resultList.length }}类</div>
		</div>
		<div class="tips">导入退环境卡或卡组编号查不到会缺失</div>
		<div v-if="noCardList != ''">未导入: {{ noCardList }}</div>
	</div>
	<div class="list" v-if="resultList.length > 0">
		<div class="item" v-for="item in resultList" :key="item.name" @click="showDet(item)">
			<div class="picwp">
				<image src="../../../common/img/tcg-card-back.jpg" mode="widthFix" class="cback"></image>
				<image :src="item.enImgUrl" lazy-load mode="heightFix" class="img" v-if="item.artIndex == -1 || !item.artList"></image>
				<image :src="item?.artList[item.artIndex]" lazy-load mode="heightFix" class="img" v-else></image>
				<div class="count"><div class="num">{{ item.count }}</div></div>
				<div class="series">{{ item.series }}</div>
			</div>
			<!-- <div>{{ item.cardName }}</div> -->
			<!-- <div>{{ item.ename }}</div> -->
		</div>
	</div>
	<emptyList v-else></emptyList>
	<div class="deckCode">
		<div class="len">{{ copyDeckLength }}</div>
		<div class="txt">
			<div v-for="(item, index) in copyDeck" :key="index" class="line">{{ item }}</div>
		</div>
		<div class="bn" @click="copy">复制代码</div>
	</div>
	<div class="popups" v-if="isShowCard">
		<div class="p-showcard" :class="{'animate__zoomIn': isShowCard}">
			<div class="cardShow" :class="{tc: !showCardDet.artList}">
				<image :src="showCardDet.showImg" mode="scaleToFill" class="img"></image>
				<div class="artList" v-if="showCardDet.enImgUrl">
					<image :src="showCardDet.imgUrl" lazy-load mode="widthFix" class="img" @click="changeArt(showCardDet.imgUrl)"></image>
					<image :src="showCardDet.enImgUrl" lazy-load mode="widthFix" class="img" @click="changeArt(showCardDet.enImgUrl)"></image>
					<template v-for="(img, index) in showCardDet.artList" :key="index">
						<image :src="img" mode="widthFix" class="img" @click="changeArt(img)"></image>
					</template>
				</div>
			</div>
			<div class="detInfo">
				<div class="name">{{ showCardDet.cardName }}</div>
				<div class="name">{{ showCardDet.ename }}</div>
				<div class="skill" v-if="!/^(基本).*?(能量)$/.test(showCardDet.cardName)">
					<template v-for="skill in showCardDet.skillList" :key="skill.name">
						<div class="item" v-if="!/太晶/g.test(skill.name) && !/规则/g.test(skill.name)">
							<div class="sname" :class="{
								tera: /太晶/g.test(skill.name), 
								ability: /特性/g.test(skill.name),
								grule: /规则/g.test(skill.name),
								vstar: /VSTAR力量/g.test(skill.name)}">{{ skill.name }}</div>
							<div class="sdet">{{ skill.effect == '' ? '-' : skill.effect}}</div>
						</div>
					</template>
				</div>
				<div class="skill rule">
					<div class="item" v-for="skill in showCardDet.skillRule" :key="skill.name">
						<div class="sname" :class="{
							tera: /太晶/g.test(skill.name), 
							grule: /规则/g.test(skill.name)}">{{ skill.name }}</div>
						<div class="sdet">{{ skill.effect == '' ? '-' : skill.effect}}</div>
					</div>
				</div>
			</div>
			<div class="close" @click="isShowCard = false">关闭</div>
		</div>
	</div>
</template>

<script setup>
	import emptyList from '../../../components/emptyList/index.vue'
	import fixData from './js/fixData'
	import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
	import _ from 'lodash'

	// const seriesCodeList = [{code: 'MEW', name: 'SV3_5'}, {code: 'OBF', name: 'SV3'}, {code: 'PAL', name: 'SV2'}, {code: 'SVI', name: 'SV1'}, {code: 'CRZ', name: 'SS12_5'}, {code: 'SIT', name: 'SS12'}, {code: 'LOR', name: 'SS11'}, {code: 'PGO', name: 'SS10_5'}, {code: 'ASR', name: 'SS10'}, {code: 'BRS', name: 'SS9'}, {code: 'FST', name: 'SS8'}, {code: 'CEL', name: 'SS7_5'}, {code: 'EVS', name: 'SS7'}, {code: 'CRE', name: 'SS6'}, {code: 'BST', name: 'SS5'}];
	const seriesCodeList = {'MEW': 'SV3_5', 'OBF': 'SV3', 'PAL': 'SV2', 'SVI': 'SV1', 'CRZ': 'SS12_5', 'SIT': 'SS12', 'LOR': 'SS11', 'PGO': 'SS10_5', 'ASR': 'SS10', 'BRS': 'SS9', 'FST': 'SS8', 'CEL': 'SS7_5', 'EVS': 'SS7', 'CRE': 'SS6', 'BST': 'SS5'};
	const seriesList = ['SV3_5', 'SV3', 'SV2', 'SV1', 'SS12_5', 'SS12', 'SS11', 'SS10_5', 'SS10', 'SS9', 'SS8', 'SS7_5', 'SS7', 'SS6', 'SS5'];
	const baseEList = ['Grass Energy', 'Fire Energy', 'Water Energy', 'Lightning Energy', 'Psychic Energy', 'Fighting Energy', 'Darkness Energy', 'Metal Energy']
	let resetData = [];
	// let cardLength = 0;
	let forLength = 0;
	let baseCardData = [];
	let fullCardData = [];
	let resultList = ref([]);
	let isShowCard = ref(false);
	let showCardDet = ref(null);
	let noCardList = ref(null);
	let copyDeck = ref(null);
	let copyDeckLength = ref(null)
	
	onLoad(options => {
		const _data = uni.getStorageSync('tempDeck');
		let list = JSON.parse(_data);
		let newList = [];
		for(let item of list){
			if(/^Pokémon/.test(item)){
				continue
			}else if(/^Trainer/.test(item)){
				continue
			}else if(/^Energy/.test(item)){
				continue
			}else if(/^Total Cards/.test(item)){
				continue
			}else if(item == ''){
				continue
			}
			if(/ Basic \{/.test(item)){

			}else{
				fullCardData.push(item);
			}
			item = item.replace(' PH', '');
			if(/\{G\}/.test(item)){
				item = item.substring(0, item.indexOf(' ') + 1) + baseEList[0] + ' 1'
			}
			if(/\{R\}/.test(item)){
				item = item.substring(0, item.indexOf(' ') + 1) + baseEList[1] + ' 2'
			}
			if(/\{W\}/.test(item)){
				item = item.substring(0, item.indexOf(' ') + 1) + baseEList[2] + ' 3'
			}
			if(/\{L\}/.test(item)){
				item = item.substring(0, item.indexOf(' ') + 1) + baseEList[3] + ' 4'
			}
			if(/\{P\}/.test(item)){
				item = item.substring(0, item.indexOf(' ') + 1) + baseEList[4] + ' 5'
			}
			if(/\{F\}/.test(item)){
				item = item.substring(0, item.indexOf(' ') + 1) + baseEList[5] + ' 6'
			}
			if(/\{D\}/.test(item)){
				item = item.substring(0, item.indexOf(' ') + 1) + baseEList[6] + ' 7'
			}
			if(/\{M\}/.test(item)){
				item = item.substring(0, item.indexOf(' ') + 1) + baseEList[7] + ' 8'
			}
			newList.push(item)
		}
		// console.log(newList)
		setData(newList);
		copyDeck.value = newList;
		copyDeckLength.value = newList.length
	})

	const setData = (data) => {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		let list = [];
		let sortBySeries = {}
		// console.log(data);
		for(let item of data){
			let n = item.replace(/(^\d{1,2} )|( \d{1,3}$)/g, '');
			if(!baseEList.includes(n)){
				let indexof = n.lastIndexOf(' ');
				baseCardData.push(n.substring(0, indexof).replace('’', '\''));
			}
			// console.log(baseCardData)
			// cardLength += 1;
			// console.log(item)
			let rItem = null;
			let count = null;
			let ename = null;
			let series = null;
			let sNo = null;
			let cardNo = null;
			let m = item.replace(' PH', '').match(/(\d{1,2}) (.+) ([A-Z]{3}\-[A-Z]{2}|[A-Z]{3}|[A-Z]{2}\-[A-Z]{2}) (\d{1,3})/);
			if(item == "1 Boss's Orders SWSHALT 102"){
				console.log(m)
			}
			if(m == null){
				if(!/ Energy/.test(item)){
					continue
				};
				m = item.match(/(\d{1,2}) (.+) (\d{1,3})/);
				count = m[1];
				ename = m[2];
				let returnEData = returnEnergyData(ename, count);
				resetData.push(returnEData);
				continue
			}else{
				count = m[1];
				ename = m[2];
				// 主流卡编号修复
				// if(fixData[ename]){
				// 	series = fixData[ename].series;
				// 	cardNo = fixData[ename].cardNo;
				// }else{
					series = m[3];
					cardNo = m[4];
				// }
				sNo = null;
				// console.log(series, sNo)
			}
			if(/-/.test(series)){
				let _d = series.split('-');
				cardNo = `${_d[1]} ${cardNo}`;
				series = _d[0]
			}
			sNo = seriesCodeList[series];
			if(sNo){
				if(!sortBySeries[sNo]){
					sortBySeries[sNo] = [];
					forLength += 1
				}
				rItem = {count, ename, series, sNo, cardNo};
				sortBySeries[sNo].push(rItem)
				list.push(rItem);
			}
		}
		// console.log(_.isEmpty(sortBySeries), sortBySeries)
		if(_.isEmpty(sortBySeries)){
			loadData([], [], '')
		}else{
			returnDet(sortBySeries);
		}
		setTimeout(() => {
			uni.hideLoading();
		}, 1500)
	}
	
	const returnDet = (data) => {
		let obj = data;
		for(let serItem of seriesList){
			if(obj[serItem]?.length > 0){
				// console.log(obj[serItem])
				switch(serItem) {
					case 'SV3_5': import('../seriesDet/json/SV3_5.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SV3': import('../seriesDet/json/SV3.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SV2': import('../seriesDet/json/SV2.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SV1': import('../seriesDet/json/SV1.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SS12_5': import('../seriesDet/json/SS12_5.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SS12': import('../seriesDet/json/SS12.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SS11': import('../seriesDet/json/SS11.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SS10_5': import('../seriesDet/json/SS10_5.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SS10': import('../seriesDet/json/SS10.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SS9': import('../seriesDet/json/SS9.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SS8': import('../seriesDet/json/SS8.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SS7_5': import('../seriesDet/json/SS7_5.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SS7': import('../seriesDet/json/SS7.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SS6': import('../seriesDet/json/SS6.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SS5': import('../seriesDet/json/SS5.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
				}
			}
		}
	}

	const loadData = (oData, data, sname) => {
		let result = [];
		for(let o of oData){
			let noList = [];
			let ename = o.ename.replace(/ \(.+\)/,'');
			if(`${o.cardNo}`.indexOf('|') > 0){
				noList = o.cardNo.split('|')
			}
			for(let _d of data){
				if(noList.length > 0){
					if(noList.includes(_d.cardNo) && _d.ename.replace('’', '\'') == ename){
						let index = noList.findIndex(x => {
							return x == _d.cardNo
						})
						let od = JSON.parse(JSON.stringify(o));
						od.count = _d.count;
						od.artIndex = index == 0 ? -1 : index - 1;
						result.push(od)
					}
				}else{
					if(_d.cardNo == o.cardNo && _d.ename.replace('’', '\'') == ename){
						let od = JSON.parse(JSON.stringify(o));
						od.count = _d.count;
						od.artIndex = -1;
						result.push(od)
					}
				}
			}
		}
		// console.log(forLength, result, sname, resetData)
		resetData = [...resetData, ...result];
		forLength -= 1;
		if(forLength <= 0){
			// console.log(resetData)
			let nowData = resetData.map(item => {
				return item.ename.replace(/ \(.+\)/, '');
			})
			let diff = _.difference(baseCardData, nowData);
			// console.log(fullCardData, baseCardData, nowData, diff);
			noCardList.value = diff.length > 0 ? diff.join(', ') : '';
			// 排序
			let arr = {p: [], t: [], e: []};
			for(let item of resetData){
				if(item.type == 'Pokemon'){
					arr.p.push(item)
				}
				if(item.type == 'Trainers'){
					arr.t.push(item)
				}
				if(item.type == 'Energy'){
					arr.e.push(item)
				}
			}
			arr.p = _.sortBy(arr.p, item => {
				return item.typeEnergy
			})
			arr.t = _.sortBy(arr.t, item => {
				return item.skillList[item.skillList.length - 1].name
			})
			resetData = [...arr.p, ...arr.t, ...arr.e];
			resultList.value = resetData;
		}else{
			let nowData = resetData.map(item => {
				return item.ename.replace(/ \(.+\)/, '');
			})
			let diff = _.difference(baseCardData, nowData);
			// console.log(baseCardData, nowData, diff);
			noCardList.value = diff.length > 0 ? diff.join(', ') : '';
		}
	}

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

	const showDet = (item) => {
		item.skillRule = item.skillList.filter(v => {
			return /太晶/g.test(v.name) || /规则/g.test(v.name)
		})
		showCardDet.value = item;
		showCardDet.value.showImg = showCardDet.value.imgUrl;
		isShowCard.value = true
  }
	
	const changeArt = (url) => {
		showCardDet.value.showImg = url
	}

	const copy = () => {
		uni.setClipboardData({
			data: copyDeck.value.join('\r'),
			success: function () {
				console.log('success');
			}
		});
	}
</script>

<style scoped lang="scss">
	.fctrl{
		padding: 20rpx 30rpx 10rpx;
		background: #f3f3f3;
		.info{
			margin: 0 0 10rpx 0;
			display: flex;
			justify-content: space-between;
		}
		.search{
			margin: 10rpx 0;
			background: #fff;
			border: 1px solid #eee;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			overflow: hidden;
			input{
				padding: 0 0 0 10rpx;
				width: 80%;
				height: 60rpx
			}
			.bn{
				background: #4caf50;
				width: 20%;
				height: 60rpx;
				line-height: 60rpx;
				color: #fff;
				text-align: center;
			}
		}
		.tips{
			padding: 5rpx 0;
			background: #de9b25;
			border-radius: 5rpx;
			font-size: 12px;
			color: #fff;
			text-align: center;
		}
	}
	.list{
		margin: 10rpx 30rpx 20rpx;
		display: flex;
		flex-wrap: wrap;
		// justify-content: space-between;
		.item{
			position: relative;
			margin: 0 0 5rpx 0;
			width: 24%;
			min-height: 80rpx;
			text-align: center;
			font-size: 12px;
			&:not(:nth-of-type(4n)){
				margin-right: calc(4% / 3);
			}
			.picwp{
				position: relative;
				// margin: 0 0 10rpx 0;
				overflow: hidden;
				.count{
					position: absolute;
					bottom: 0;
					left: 0;
					color: #fff;
					display: flex;
					flex-direction: column;
					.num{
						background: #ce2a2c;
						width: 40rpx;
						height: 20rpx;
						line-height: 20rpx;
						font-size: 20rpx;
					}
					&::before{
						content: '';
						width: 0;
						height: 0;
						border-bottom: 12rpx solid #ce2a2c;
						border-left: 20rpx solid transparent;
						border-right: 20rpx solid transparent;
					}
					&::after{
						content: '';
						width: 0;
						height: 0;
						border-top: 12rpx solid #ce2a2c;
						border-left: 20rpx solid transparent;
						border-right: 20rpx solid transparent;
					}
				}
				.series{
					position: absolute;
					bottom: 0;
					right: 0;
					background: #f9f9f9;
					border-radius: 2px;
					font-size: 12px;
					color: #333;
				}
				.cback{
					width: 100%;
					border-radius: 20rpx;
					display: block;
					opacity: .5;
				}
				.img{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border-radius: 15rpx;
					display: block;
				}
			}
			.name{
				position: absolute;
				bottom: 0;
				left: 0;
				background: rgba(0,0,0,.4);
				width: 100%;
				text-align: center;
				color: #fff;
			}
		}
	}
	.empty{
		padding: 150rpx 0 0;
		text-align: center;
		color: #ccc;
		.img{
			margin: 0 auto 20rpx;
			width: 266rpx;
			display: block;
		}
	}
	.deckCode{
		position: relative;
		margin: 0 auto;
		padding: 0 0 20rpx;
		width: 70%;
		font-size: 12px;
		.len{
			position: absolute;
			top: 0;
			right: 0;
			background: #fff;
		}
		.txt{
			padding: 15rpx 0 15rpx 10%;
			background: #333;
			border-radius: 5rpx;
		}
		.line{
			padding: 5rpx 0;
			color: #fff;
		}
		.bn{
			margin: 20rpx auto 0;
      background: #eee;
      width: 65%;
      height: 60rpx;
      line-height: 60rpx;
      border: 1px solid #ccc;
      border-radius: 10rpx;
      font-size: 16px;
      text-align: center;
		}
	}
	.p-showcard{
		position: absolute;
		top: 0;
		left: 0;
		padding: 5% 5% 20rpx;
		width: 100%;
		height: 100%;
		animation-duration: .4s;
		overflow-y: scroll;
		box-sizing: border-box;
		.cardShow{
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			&.tc .img{
				margin: 0 auto
			}
			.img{
				margin: 0;
				width: 70%;
				height: 650rpx;
				border-radius: 25rpx;
				display: block;
			}
			.artList{
				width: 160rpx;
				height: 650rpx;
				overflow-x: hidden;
				overflow-y: auto;
				.img{
					margin: 0 0 10rpx;
					width: 100%;
					height: auto;
					border-radius: 8rpx;
					display: block;
				}
			}
		}
		.detInfo{
			margin: 30rpx auto 0;
			padding: 10rpx 20rpx;
			width: 100%;
			background: rgba(255,255,255,.9);
			border-radius: 20rpx;
			font-size: 30rpx;
			box-sizing: border-box;
			.name{
				text-align: center;
			}
			.skill{
				.item{
					margin: 10rpx 0;
					&:last-of-type{
						margin-bottom: 0;
					}
					.sname{
						color: #999
					}
					.tera{
						color: #00a6da;
					}
					.ability{
						color: #ce2a2c
					}
					.grule{
						color: #16baaa
					}
					.vstar{
						color: #635811;
					}
				}
			}
		}
		.close{
			margin: 30rpx auto 0;
			padding: 10rpx 0;
			background: #fff;
			width: 30%;
			border-radius: 10rpx;
			font-size: 28rpx;
			text-align: center;
		}
	}
</style>