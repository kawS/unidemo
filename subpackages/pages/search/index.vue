<template>
	<page-meta :page-style="`overflow: ${isShowCard == true ? 'hidden' : '' }`" />
	<div class="fctrl">
		<div class="info">
			<div>检索结果</div>
			<div>共{{ resultList.length }}张</div>
		</div>
		<div class="search">
			<input type="text" v-model="searchInp" placeholder="请输入卡名(支持简中、英文)" />
			<div class="bn" @click="reSearch">检索</div>
		</div>
	</div>
	<div class="list" v-if="resultList.length > 0">
		<div class="item" v-for="item in resultList" :key="item.id" @click="showDet(item)">
			<div class="picwp">
				<image src="../img/tcg-card-back.jpg" mode="widthFix" class="cback"></image>
				<image :src="item.imgUrl" lazy-load mode="heightFix" class="img" v-if="showImgType == null"></image>
				<image :src="item.enImgUrl" lazy-load mode="heightFix" class="img" v-else></image>
			</div>
			<div>{{ item.cardName }}</div>
			<div>{{ item.ename }}</div>
		</div>
	</div>
	<div class="empty" v-else>
		<image src="../img/pikachu.png" mode="widthFix" class="img"></image>
		暂无数据
	</div>
	<div class="popups" v-if="isShowCard">
		<div class="p-showcard" :class="{'animate__zoomIn': isShowCard}">
			<div class="cardShow" :class="{tc: !showCardDet.artList}">
				<image :src="showCardDet.showImg" mode="widthFix" class="img"></image>
				<div class="artList" v-if="showCardDet.artList?.length > 0">
					<image :src="showCardDet.imgUrl" lazy-load mode="widthFix" class="img" @click="changeArt(showCardDet.imgUrl)" v-if="showImgType == null"></image>
					<image :src="showCardDet.imgUrl" mode="widthFix" class="img" @click="changeArt(showCardDet.imgUrl)" v-else-if="!showCardDet.enImgUrl"></image>
					<image :src="showCardDet.enImgUrl" lazy-load mode="widthFix" @click="changeArt(showCardDet.enImgUrl)" class="img" v-else></image>
					<template v-for="(img, index) in showCardDet.artList" :key="index">
						<image :src="img" mode="widthFix" class="img" @click="changeArt(img)"></image>
					</template>
				</div>
			</div>
			<div class="detInfo">
				<div class="name">{{ showCardDet.cardName }}</div>
				<div class="skill" v-if="!/^(基本).*?(能量)$/.test(showCardDet.cardName)">
					<div class="item" v-for="skill in showCardDet.skillList" :key="skill.name">
						<div class="sname" :class="{
							tera: /太晶/g.test(skill.name), 
							ability: /特性/g.test(skill.name),
							grule: /规则/g.test(skill.name),
							vstar: /VSTAR力量/g.test(skill.name)}">{{ skill.name }}</div>
						<div class="sdet">{{ skill.effect == '' ? '-' : skill.effect}}</div>
					</div>
				</div>
			</div>
			<div class="close" @click="isShowCard = false">关闭</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

	const seriesList = ['SV3.5', 'SV3', 'SV2', 'SV1', 'SS12_5', 'SS12', 'SS11', 'SS10_5', 'SS10', 'SS9', 'SS8', 'SS7_5', 'SS7', 'SS6', 'SS5'];
	let resetData = [];
	let allIndex = 0;
	let allLength = 0;
	let cardName = ref(null);
	let resultList = ref([]);
	let searchInp = ref('');
	let isShowCard = ref(false);
	let showCardDet = ref(null);
	let showImgType = ref(null);
	
	onLoad(options => {
		cardName.value = decodeURIComponent(options.searchinp);
		getDataMap();
		let t = uni.getStorageSync('imgType');
		if(t == 'en'){
			showImgType.value = t
		}else{
			showImgType.value = null
		}
	})

	const getDataMap = async () => {
		resetData = [];
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		await returnNameMap();
		setTimeout(function () {
			uni.hideLoading();
		}, 1500);
	}

	const returnNameMap = async () => {
		const resSV = await import('./json/SV-series.json');
		const resSS = await import('./json/SS-series.json');
		let listSV = resSV.default;
		let listSS = resSS.default;
		let result = [];
		for(let item of listSV){
			let reg = new RegExp(`[${item.name.replace(/VSTAR|VMAX|V|ex/ig, '')}]|${item.ename.replace(/ /g, '|')}`, 'i');
			if(reg.test(cardName.value)){
				result.push({
					name: item.name,
					series: item.series
				})
				allLength += 1
			}
		}
		for(let item of listSS){
			let reg = new RegExp(`[${item.name.replace(/VSTAR|VMAX|V|ex/ig, '')}]|${item.ename.replace(/ /g, '|')}`, 'i');
			if(reg.test(cardName.value)){
				result.push({
					name: item.name,
					series: item.series
				})
				allLength += 1
			}
		}
		if(result.length == 0){
			resultList.value = []
		}else{
			returnDet(result)
		}
	}

	const returnDet = (data) => {
		let obj = {};
		for(let item of data){
			if(!obj[item.series]){
				obj[item.series] = []
			}
			obj[item.series].push(item.name)
		}
		for(let serItem of seriesList){
			if(obj[serItem]?.length > 0){
				switch(serItem) {
					case 'SV3.5': import('../seriesDet/json/SV3_5.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
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

	const loadData = (oData, data, series) => {
		let result = oData.filter((ser) => {
			return data.includes(ser.cardName);
		});
		allIndex += result.length;
		resetData = [...resetData, ...result];
		if(allIndex == allLength){
			resultList.value = resetData;
		}
	}

	const reSearch = () => {
		if(searchInp.value == ''){
      uni.showToast({
        title: '请输入卡名',
        icon: 'none',
        duration: 2000
      });
      return
    }
		if(uni.pageScrollTo){
			uni.pageScrollTo({
				scrollTop: 0
			})
		}
		cardName.value = searchInp.value;
		getDataMap()
	}

	const showDet = (item) => {
		showCardDet.value = item;
		if(showImgType.value == null){
			showCardDet.value.showImg = showCardDet.value.imgUrl
		}else{
			showCardDet.value.showImg = showCardDet.value.enImgUrl
		}
		isShowCard.value = true
  }

	const _showLoading = (duration = 1000) => {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		setTimeout(function () {
			uni.hideLoading();
		}, duration);
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
			width: 48%;
			min-height: 80rpx;
			text-align: center;
			font-size: 30rpx;
			.picwp{
				position: relative;
				margin: 0 0 10rpx 0;
				overflow: hidden;
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
					box-shadow: 2px 2px 5px 0px #9E9E9E;
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