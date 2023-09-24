<template>
	<page-meta :page-style="`overflow: ${isShowCard == true ? 'hidden' : '' }`" />
	<div class="fctrl">
		<div class="info">
			<div>卡组列表</div>
			<div>共{{ resultList.length }}类</div>
		</div>
	</div>
	<div class="list" v-if="resultList.length > 0">
		<div class="item" v-for="item in resultList" :key="item.id" @click="showDet(item)">
			<div class="picwp">
				<image src="../../../common/img/tcg-card-back.jpg" mode="widthFix" class="cback"></image>
				<image :src="item.imgUrl" lazy-load mode="heightFix" class="img"></image>
				<div class="series">{{ item.series }}{{ item?.artList?.length > 0 ? `|${item.artList.length}` : '' }}</div>
			</div>
			<div>{{ item.cardName }}</div>
			<div>{{ item.ename }}</div>
		</div>
	</div>
	<emptyList v-else></emptyList>
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
	import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

	// const seriesCodeList = [{code: 'MEW', name: 'SV3_5'}, {code: 'OBF', name: 'SV3'}, {code: 'PAL', name: 'SV2'}, {code: 'SVI', name: 'SV1'}, {code: 'CRZ', name: 'SS12_5'}, {code: 'SIT', name: 'SS12'}, {code: 'LOR', name: 'SS11'}, {code: 'PGO', name: 'SS10_5'}, {code: 'ASR', name: 'SS10'}, {code: 'BRS', name: 'SS9'}, {code: 'FST', name: 'SS8'}, {code: 'CEL', name: 'SS7_5'}, {code: 'EVS', name: 'SS7'}, {code: 'CRE', name: 'SS6'}, {code: 'BST', name: 'SS5'}];
	const seriesCodeList = {'MEW': 'SV3_5', 'OBF': 'SV3', 'PAL': 'SV2', 'SVI': 'SV1', 'CRZ': 'SS12_5', 'SIT': 'SS12', 'LOR': 'SS11', 'PGO': 'SS10_5', 'ASR': 'SS10', 'BRS': 'SS9', 'FST': 'SS8', 'CEL': 'SS7_5', 'EVS': 'SS7', 'CRE': 'SS6', 'BST': 'SS5'};
	const seriesList = ['SV3_5', 'SV3', 'SV2', 'SV1', 'SS12_5', 'SS12', 'SS11', 'SS10_5', 'SS10', 'SS9', 'SS8', 'SS7_5', 'SS7', 'SS6', 'SS5'];
	const baseEList = ['Grass Energy', 'Fire Energy', 'Water Energy', 'Lightning Energy', 'Psychic Energy', 'Fighting Energy', 'Darkness Energy', 'Metal Energy', 'Fairy Energy', 'Dragon Energy', 'Colorless Energy']
	let resetData = [];
	let allIndex = 0;
	let copyDeck = null;
	let resultList = ref([]);
	let isShowCard = ref(false);
	let showCardDet = ref(null);
	
	onLoad(options => {
		const _data = uni.getStorageSync('tempDeck');
		const list = JSON.parse(_data);
		setData(list);
		copyDeck = list.join('\n')
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
			let count = null;
			let ename = null;
			let series = null;
			let sNo = null;
			let cardNo = null;
			let m = item.match(/(\d{1,2}) (.+) ([A-Z]{3}\-[A-Z]{2}|[A-Z]{3}) (\d{1,3})/);
			if(m == null){
				m = item.match(/(\d{1,2}) (.+) (\d{1,3})/);
				count = m[1];
				ename = m[2];
				let returnEData = returnEnergyData(ename);
				resetData.push(returnEData);
				allIndex += 1
			}else{
				count = m[1];
				ename = m[2];
				series = m[3];
				sNo = null;
				cardNo = m[4];
			}
			if(/-/.test(series)){
				let _d = series.split('-');
				cardNo = `${_d[1]} ${cardNo}`;
				series = _d[0]
			}
			sNo = seriesCodeList[series];
			if(!sortBySeries[sNo]){
				sortBySeries[sNo] = []
			}
			sortBySeries[sNo].push({count, ename, series, sNo, cardNo})
			list.push({count, ename, series, sNo, cardNo});
		}
		// console.log(list, sortBySeries);
		returnDet(sortBySeries)
	}
	
	const returnDet = (data) => {
		let obj = data;
		for(let serItem of seriesList){
			if(obj[serItem]?.length > 0){
				// console.log(obj[serItem])
				switch(serItem) {
					case 'SV3_5': import('../seriesDet/json/SV3_5.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SV3': import('../seriesDet/json/SV3.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SV2': import('../seriesDet/json/SV2.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SV1': import('../seriesDet/json/SV1.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SS12_5': import('../seriesDet/json/SS12_5.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SS12': import('../seriesDet/json/SS12.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SS11': import('../seriesDet/json/SS11.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SS10_5': import('../seriesDet/json/SS10_5.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SS10': import('../seriesDet/json/SS10.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SS9': import('../seriesDet/json/SS9.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SS8': import('../seriesDet/json/SS8.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SS7_5': import('../seriesDet/json/SS7_5.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SS7': import('../seriesDet/json/SS7.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SS6': import('../seriesDet/json/SS6.json').then((res) => {loadData(res.default, obj[serItem])}); break;
					case 'SS5': import('../seriesDet/json/SS5.json').then((res) => {loadData(res.default, obj[serItem])}); break;
				}
			}
		}
	}

	const loadData = (oData, data) => {
		let result = [];
		for(let o of oData){
			let noList = [];
			let ename = o.ename.replace(/ \(.+\)/,'');
			if(`${o.cardNo}`.indexOf('|') > 0){
				noList = o.cardNo.split('|')
			}
			for(let _d of data){
				if(noList.length > 0){
					if(noList.includes(_d.cardNo) && _d.ename == ename){
						result.push(o)
					}
				}else{
					if(_d.cardNo == o.cardNo && _d.ename == ename){
						result.push(o)
					}
				}
			}
		}
		allIndex += result.length;
		resetData = [...resetData, ...result];
		if(allIndex == resetData.length){
			// 排序
			resultList.value = resetData;
			uni.hideLoading();
		}
	}

	const returnEnergyData = (ename) => {
		let obj = {
			"Grass Energy": {
				"name": "草",
				"img": "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_278_R_EN.png"
			},
			"k": {},
			"Water Energy": {
				"name": "水",
				"img": "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PAL/PAL_279_R_EN.png"
			}
		}
		let _data = obj[ename];
		return {
			"imgUrl": _data.img,
			"cardName": _data.name + "能量",
			"type": "Energy",
			"enImgUrl": _data.img,
			"ename": ename
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
</script>

<style scoped lang="scss">
	.fctrl{
		position: sticky;
		top: 0;
		padding: 20rpx 30rpx 10rpx;
		background: #f3f3f3;
		box-shadow: 0 -1px #f3f3f3;
		z-index: 5;
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
	}
	.list{
		margin: 10rpx 30rpx 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.item{
			position: relative;
			margin: 0 0 20rpx 0;
			width: 24%;
			min-height: 80rpx;
			text-align: center;
			font-size: 30rpx;
			.picwp{
				position: relative;
				margin: 0 0 10rpx 0;
				overflow: hidden;
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