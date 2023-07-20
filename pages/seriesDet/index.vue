<template>
	<div class="fctrl">
		<div class="info">
			<div>{{ serName }}</div>
			<div>共{{ detList.length }}张</div>
		</div>
		<div class="tabs" v-if="sno == 'SV1' || sno == 'SV2'">
			<div class="tn xs" @click="showFilter">过滤</div>
			<div class="tn" :class="{on: classType == 'All'}" @click="changeTabs('All')">全部</div>
			<div class="tn" :class="{on: classType == 'Pokemon'}" @click="changeTabs('Pokemon')">宝可梦卡</div>
			<div class="tn" :class="{on: classType == 'Trainers'}" @click="changeTabs('Trainers')">训练家卡</div>
			<div class="tn" :class="{on: classType == 'Energy'}" @click="changeTabs('Energy')">能量卡</div>
		</div>
	</div>
	<div class="list">
		<div class="item" v-for="item in detList" :key="item.id" @click="showDet(item)">
			<div class="picwp">
				<image src="@/static/img/tcg-card-back.jpg" mode="widthFix" class="cback"></image>
				<image :src="item.imgUrl" lazy-load mode="widthFix" class="img"></image>
			</div>
			<!-- {{ item.cardName }} -->
		</div>
	</div>
	<div v-if="!isLoading && detList.length == 0" class="empty">
		<image src="@/static/img/150.png" mode="widthFix" class="img"></image>
		暂无数据
	</div>
	<div class="popups" v-show="isShowFilter">
		<div class="p-filter">
			<div class="tclass" v-show="classType == 'All' || classType == 'Pokemon'">
				<div>宝可梦卡</div>
				<div class="plist">
					<div class="item" :class="{on: filterStr == item.ename}" @click="filterPokemon(item.ename)" v-for="item in typeList" :key="item.value">
						<image :src="item.imgUrl" mode="widthFix" class="img"></image>
					</div>
				</div>
			</div>
			<div class="tclass" v-show="classType == 'All' || classType == 'Trainers'">
				<div>训练家卡</div>
				<div class="plist">
					<div class="item" :class="{on: filterStr == '竞技场'}" @click="filterTrainers('竞技场')">竞技场</div>
					<div class="item" :class="{on: filterStr == '宝可梦道具'}" @click="filterTrainers('宝可梦道具')">宝可梦道具</div>
					<div class="item" :class="{on: filterStr == '支援者'}" @click="filterTrainers('支援者')">支援者</div>
					<div class="item" :class="{on: filterStr == '物品'}" @click="filterTrainers('物品')">物品</div>
				</div>
			</div>
			<div class="ctrl">
				<div class="bns" @click="resetList">重置</div>
				<div class="bns" @click="isShowFilter = false">关闭</div>
			</div>
		</div>
	</div>
	<div class="popups" v-if="isShowCard">
		<div class="p-showcard" :class="{'animate__zoomIn': isShowCard}">
			<image :src="showCardUrl" mode="widthFix" class="img"></image>
			<div class="close" @click="isShowCard = false">关闭</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
	import { returnPMType } from '../../common/js/returnCHN'

	const typeList = returnPMType('all');

	let isLoading = ref(true);
	let sno = ref(null);
	let serName = ref(null);
	let detList = ref([]);
	let aList = ref([]);
	let pList = ref([]);
	let tList = ref([]);
	let eList = ref([]);
	let classType = ref('All');
	let isShowFilter = ref(false);
	let filterStr = ref('');
	let isShowCard = ref(false);
	let showCardUrl = ref('');
	
	onLoad(options => {
		sno = options.no;
		serName.value = decodeURIComponent(options.sname);
		switch(sno) {
			case 'SV1': import('./SV1.json').then((res) => {getData(res)}); break;
			case 'SV2': import('./SV2.json').then((res) => {getData(res)}); break;
			case 'SS12.5': import('./SS12_5.json').then((res) => {getData(res)}); break;
			case 'SS12': import('./SS12.json').then((res) => {getData(res)}); break;
			case 'SS11': import('./SS11.json').then((res) => {getData(res)}); break;
			case 'SS10.5': import('./SS10_5.json').then((res) => {getData(res)}); break;
			case 'SS10': import('./SS10.json').then((res) => {getData(res)}); break;
			case 'SS9': import('./SS9.json').then((res) => {getData(res)}); break;
			case 'SS8': import('./SS8.json').then((res) => {getData(res)}); break;
			case 'SS7.5': import('./SS7_5.json').then((res) => {getData(res)}); break;
			default: isLoading.value = false; break
		}
	})

	const getData = (res) => {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		detList.value = res.default;
		aList.value = res.default;
		pList.value = res.default.filter(item => {
			return item.type == 'Pokemon'
		});
		tList.value = res.default.filter(item => {
			return item.type == 'Trainers'
		});
		eList.value = res.default.filter(item => {
			return item.type == 'Energy'
		})
		isLoading.value = false;
		setTimeout(function () {
			uni.hideLoading();
		}, 2000);
	}

	const _showLoading = (duration = 2000) => {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		setTimeout(function () {
			uni.hideLoading();
		}, duration);
	}
  
	const changeTabs = (type) => {
		_showLoading();
		classType.value = type;
		switch(type){
			case 'All': detList.value = aList.value; break;
			case 'Pokemon': detList.value = pList.value; break;
			case 'Trainers': detList.value = tList.value; break;
			case 'Energy': detList.value = eList.value; break;
		}
	}

	const showFilter = () => {
		if(classType.value == 'Energy'){
			uni.showToast({
        title: '暂无过滤选项',
        icon: 'none',
        duration: 2000
      });
			return
		}
		isShowFilter.value = true;
		// console.log(classType.value)
	}

	const filterPokemon = (type) => {
		_showLoading();
		filterStr.value = type;
		detList.value = aList.value.filter(item => {
			return item.typeEnergy == type
		})
		classType.value = 'Pokemon';
		isShowFilter.value = false
	}

	const filterTrainers = (type) => {
		_showLoading();
		filterStr.value = type;
		detList.value = aList.value.filter(item => {
			const reg = new RegExp(`[${type}]`, 'g');
			return item.type == 'Trainers' && reg.test(item.skillList[1].name)
		})
		classType.value = 'Trainers';
		isShowFilter.value = false
	}

	const resetList = () => {
		_showLoading();
		filterStr.value = '';
		detList.value = aList.value;
		classType.value = 'All';
		isShowFilter.value = false
	}

  const showDet = (item) => {
    // console.log(item.id)
		showCardUrl.value = item.imgUrl;
		isShowCard.value = true
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
		.tabs{
			display: flex;
			text-align: center;
			align-items: center;
			.tn{
				flex: 1;
				&.xs{
					font-size: 12px;
					flex: .5
				}
			}
			.on{
				color: #16baaa
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
			.picwp{
				position: relative;
				.cback{
					width: 100%;
					border-radius: 20rpx;
					display: block;
					box-shadow: 2px 2px 5px 0px #9E9E9E;
					opacity: .5;
				}
				.img{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					display: block;
				}
			}
		}
	}
	.empty{
		padding: 150rpx 0 0;
		text-align: center;
		color: #ccc;
		.img{
			margin: 0 auto 20rpx;
			width: 475rpx;
			display: block;
		}
	}
	.p-filter{
		position: absolute;
		top: 50%;
		left: 50%;
		padding: 30rpx;
		background: #fff;
		width: 80%;
		border-radius: 20rpx;
		transform: translate(-50%, -50%);
		.plist{
			margin: 10rpx 0 20rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			.item{
				margin: 15rpx 0;
				padding: 0 8rpx;
				width: 21%;
				border: 1px solid #ccc;
				border-radius: 10rpx;
				text-align: center;
				box-sizing: border-box;
				&.on{
					border-color: #16baaa;
				}
				.img{
					margin: 10rpx auto;
					width: 35rpx;
					display: block;
				}
			}
		}
		.ctrl{
			padding: 50rpx 0 0 0;
			display: flex;
			justify-content: center;
			.bns{
				margin: 0 20rpx
			}
		}
	}
	.p-showcard{
		position: absolute;
		top: 10%;
		left: 5%;
		width: 90%;
		animation-duration: .4s;
		.img{
			margin: 0 auto;
			width: 100%;
			display: block;
		}
		.close{
			margin: 30rpx auto 0;
			padding: 10rpx 0;
			background: #fff;
			width: 30%;
			border-radius: 10rpx;
			text-align: center;
		}
	}
	
</style>