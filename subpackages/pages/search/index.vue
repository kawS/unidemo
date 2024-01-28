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
		<template v-for="item in resultList" :key="item.id">
			<!-- <div class="item" @click="showDet(item)" v-if="item.isHide != true"> -->
			<div class="item" @click="showDet(item)">
				<div class="picwp">
					<image src="../../../common/img/tcg-card-back.jpg" mode="widthFix" class="cback"></image>
					<image :src="item.imgUrl" lazy-load mode="heightFix" class="img"></image>
					<div class="series">{{ item.series }}{{ item?.artList?.length > 0 ? `|${item.artList.length}` : '' }}</div>
				</div>
				<div>{{ item.cardName }}</div>
				<div>{{ item.ename }}</div>
			</div>
		</template>
	</div>
	<emptyList v-else></emptyList>
	<copyRight></copyRight>
	<div class="popups" v-if="isShowCard">
		<div class="p-showcard" :class="{'animate__zoomIn': isShowCard}">
			<div class="cardShow" :class="{tc: !showCardDet.artList}">
				<image :src="showCardDet.showImg" mode="scaleToFill" class="img"></image>
				<div class="artList" v-if="showCardDet.enImgUrl && !showCardDet.isHide">
					<image :src="showCardDet.imgUrl" lazy-load mode="widthFix" class="img" @click="changeArt(showCardDet.imgUrl)"></image>
					<image :src="showCardDet.enImgUrl" lazy-load mode="widthFix" class="img" @click="changeArt(showCardDet.enImgUrl)" v-if="showCardDet.isHide != true"></image>
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
	import seriesList from '../../../pages/index/js/seriesList.js'
	import emptyList from '../../../components/emptyList/index.vue'
	import copyRight from '../../../components/copyright/index.vue'
	import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

	let resetData = [];
	let allIndex = 0;
	let cardName = ref(null);
	let resultList = ref([]);
	let searchInp = ref('');
	let isShowCard = ref(false);
	let showCardDet = ref(null);
	
	onLoad(options => {
		cardName.value = decodeURIComponent(options.searchinp);
		getDataMap()
	})

	const getDataMap = async () => {
		allIndex = 0;
		resetData = [];
		resultList.value = [];
		searchInp.value = '';
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
			let reg = `${item.name} ${item.ename.toLowerCase()}`;
			if(reg.search(cardName.value.toLowerCase()) != -1){
				result.push({
					name: item.name,
					series: item.series
				})
			}
		}
		for(let item of listSS){
			let reg = `${item.name} ${item.ename.toLowerCase()}`;
			if(reg.search(cardName.value.toLowerCase()) != -1){
				result.push({
					name: item.name,
					series: item.series
				})
			}
		}
		if(result.length == 0){
			resultList.value = []
		}else{
			// console.log(result)
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
					case 'SV4_5': import('../seriesDet/json/SV4_5.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
					case 'SV4': import('../seriesDet/json/SV4.json').then((res) => {loadData(res.default, obj[serItem], serItem)}); break;
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
	
	const loadData = (oData, data, series) => {
		let result = oData.filter(ser => {
			return data.includes(ser.cardName);
		});
		allIndex += result.length;
		resetData = [...resetData, ...result];
		// console.log(allIndex, resetData.length)
		if(allIndex == resetData.length){
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
			width: 48%;
			min-height: 80rpx;
			text-align: center;
			font-size: 12px;
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
	.p-showcard{
		position: absolute;
		top: 0;
		left: 0;
		padding: 5%;
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