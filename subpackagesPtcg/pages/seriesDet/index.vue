<template>
	<page-meta :page-style="`overflow: ${isShowCard == true ? 'hidden' : '' }`" />
	<div class="fctrl">
		<div class="info">
			<div>{{ serName }} - {{ sno }} - {{ scode }}</div>
			<div>共{{ detList.length }}张</div>
		</div>
		<div class="tabs">
			<div class="tn xs" @click="showFilter">过滤</div>
			<div class="tn" :class="{on: classType == 'All'}" @click="changeTabs('All')">全部</div>
			<div class="tn" :class="{on: classType == 'Pokemon'}" @click="changeTabs('Pokemon')">宝可梦卡</div>
			<div class="tn" :class="{on: classType == 'Trainers'}" @click="changeTabs('Trainers')">训练家卡</div>
			<div class="tn" :class="{on: classType == 'Energy'}" @click="changeTabs('Energy')">能量卡</div>
		</div>
	</div>
	<div class="list">
		<template v-for="item in detList" :key="item.id">
			<div class="item" @click="showDet(item)">
				<div class="picwp">
					<image src="../../../common/img/tcg-card-back.jpg" mode="widthFix" class="cback"></image>
					<div class="prshow">
						<div class="skill" v-if="!/^(基本).*?(能量)$/.test(item.cardName)">
							<template v-for="skill in item.skillList" :key="skill.name">
								<div class="sitem" v-if="!/太晶/g.test(skill.name) && !/规则/g.test(skill.name) && !/ACE /g.test(skill.name)">
									<div class="sname" :class="{
										tera: /太晶/g.test(skill.name), 
										ability: /特性/g.test(skill.name),
										grule: /规则/g.test(skill.name),
										vstar: /VSTAR力量/g.test(skill.name)}">{{ skill.name }}</div>
									<div class="sdet">{{ skill.effect == '' ? '-' : skill.effect}}</div>
								</div>
							</template>
						</div>
					</div>
					<image :src="item.imgUrl" lazy-load mode="heightFix" class="img"></image>
					<!-- <image :src="item.enImgUrl" lazy-load mode="heightFix" class="img"></image> -->
					<div class="series">{{ item.series }}{{ item?.artList?.length > 0 ? `|${item.artList.length}` : '' }}</div>
				</div>
				<!-- <div>No.{{ item.cardNo }}</div> -->
				<div>{{ item.cardName }}</div>
				<div>{{ item.ename }}</div>
			</div>
		</template>
	</div>
	<emptyList v-if="!isLoading && detList.length == 0"></emptyList>
	<copyRight></copyRight>
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
					<div class="item" :class="{on: filterStr == '支援者'}" @click="filterTrainers('支援者')">支援者</div>
					<div class="item" :class="{on: filterStr == '宝可梦道具'}" @click="filterTrainers('宝可梦道具')">宝可梦道具</div>
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
						<div class="item" v-if="!/太晶/g.test(skill.name) && !/规则/g.test(skill.name) && !/ACE /g.test(skill.name)">
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
							grule: /规则/g.test(skill.name),
							ap: /ACE /g.test(skill.name)}">{{ skill.name }}</div>
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
	import copyRight from '../../../components/copyright/index.vue'
	import { returnSerDetList } from '../../untils/seriesList.js'
	import { returnPMType } from '../../untils/returnCHN'
	import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

	const typeList = returnPMType('all');

	let isLoading = ref(true);
	let sno = ref(null);
	let serName = ref(null);
	let scode = ref(null);
	let detList = ref([]);
	let aList = ref([]);
	let pList = ref([]);
	let tList = ref([]);
	let eList = ref([]);
	let classType = ref('All');
	let isShowFilter = ref(false);
	let filterStr = ref(null);
	let isShowCard = ref(false);
	let showCardDet = ref(null);
	
	onLoad(options => {
		sno.value = options.no;
		serName.value = decodeURIComponent(options.sname);
		scode.value = options.code;
		returnSerDetList(sno.value, function(res){
			getData(res)
		}, function(){
			isLoading.value = false
		})
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
			uni.hideLoading()
		}, 1000);
	}

	const _showLoading = (duration = 1000) => {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		setTimeout(function () {
			uni.hideLoading()
		}, duration);
	}
  
	const changeTabs = (type) => {
		if(uni.pageScrollTo){
			uni.pageScrollTo({
				scrollTop: 0
			})
		}
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
		if(uni.pageScrollTo){
			uni.pageScrollTo({
				scrollTop: 0
			})
		}
		_showLoading();
		filterStr.value = type;
		detList.value = aList.value.filter(item => {
			return item.typeEnergy == type
		})
		classType.value = 'Pokemon';
		isShowFilter.value = false
	}

	const filterTrainers = (type) => {
		if(uni.pageScrollTo){
			uni.pageScrollTo({
				scrollTop: 0
			})
		}
		_showLoading();
		filterStr.value = type;
		detList.value = aList.value.filter(item => {
			const reg = new RegExp(`[${type}]`, 'g');
			return item.type == 'Trainers' && (reg.test(item.skillList[2]?.name) || reg.test(item.skillList[1]?.name) || reg.test(item.skillList[0]?.name))
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
		item.skillRule = item.skillList.filter(v => {
			return /太晶/g.test(v.name) || /规则/g.test(v.name) || /ACE /g.test(v.name)
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
					opacity: .3;
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
				.prshow{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					overflow-y: scroll;
					.skill{
						.sitem{
							margin: 10rpx 0;
							padding: 0 5%;
							text-align: left;
							&:last-of-type{
								margin-bottom: 0;
							}
							.sname{
								color: #333;
								font-weight: 700;
								text-decoration: underline;
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
							.ap{
								color: #dc017e
							}
						}
					}
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
					background: #16baaa;
					border-color: #16baaa;
					color: #fff
				}
				.img{
					margin: 10rpx auto;
					width: 35rpx;
					height: 35rpx;
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
						color: #333;
						font-weight: 700;
						text-decoration: underline;
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
					.ap{
						color: #dc017e
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