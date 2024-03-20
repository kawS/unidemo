<template>
	<page-meta :page-style="`overflow: ${isShowCard == true ? 'hidden' : '' }`" />
	<div class="fctrl">
		<div class="info">
			<div>检索结果</div>
			<div>共{{ resultList.length }}张</div>
		</div>
		<div class="search">
			<div class="inp">
				<input type="text" v-model="searchInp" placeholder="请输入卡名(只支持英文)" />
			</div>
			<div class="bn" @click="reSearch">检索</div>
		</div>
	</div>
	<div class="list" v-if="resultList.length > 0">
		<template v-for="(item, index) in resultList" :key="`${item.no}-${index}`">
			<div class="item" v-if="item.isShow == '1'">
				<div class="picwp" @click="showDet(item)">
					<div class="prshow">
						<div class="skill" v-if="item.isSwitch != '-1'">
							<template v-if="item.isSwitch == '1'">
								<div class="sitem" v-for="(skill, index) in item.effect[0]" :key="index">
									<div class="sdet" v-html="skill"></div>
								</div>
							</template>
							<template v-else>
								<div class="sitem" v-for="(skill, index) in item.effect[1]" :key="index">
									<div class="sdet" v-html="skill"></div>
								</div>
							</template>
						</div>
						<div class="skill" v-else>
							<div class="sitem" v-for="(skill, index) in item.effect[0]" :key="index">
								<div class="sdet" v-html="skill"></div>
							</div>
						</div>
					</div>
					<div class="cardBox" :class="{showback: item.isSwitch == '2'}">
						<template v-if="item.isSwitch != '-1'">
							<image :src="item.img[0]" lazy-load mode="widthFix" class="img fcard"></image>
							<image :src="item.img[1]" lazy-load mode="widthFix" class="img bcard"></image>
						</template>
						<template v-else>
							<image :src="item.img[0]" lazy-load mode="widthFix" class="img"></image>
						</template>
					</div>
					<div class="type" :class="{red: item.color == 'Red', blue: item.color == 'Blue', green: item.color == 'Green', yellow: item.color == 'Yellow'}">{{ item.type }}</div>
					<div class="ser">{{ item.series }}</div>
				</div>
				<div class="name">
					<template v-if="item.isSwitch != '-1'">
						<template v-if="item.isSwitch == '1'">{{ item.name[0] }}</template>
						<template v-else>{{ item.name[1] }}</template>
					</template>
					<template v-else>{{ item.name[0] }}</template>
				</div>
				<div class="bn" @click="changeLeader(item)" v-if="item.isSwitch != '-1'">{{ item.isSwitch == '1' ? '反' : '正' }}</div>
			</div>       
		</template>
	</div>
	<emptyList v-else></emptyList>
	<copyRight></copyRight>
	<div class="popups" v-if="isShowCard">
		<div class="p-showcard" :class="{'animate__zoomIn': isShowCard}">
			<div class="cardShow" :class="{showback: showCardDet.isSwitch == '2'}">
				<template v-if="showCardDet.isSwitch != '-1'">
					<image :src="showCardDet.img[0]" mode="heightFix" class="img fcard"></image>
					<image :src="showCardDet.img[1]" mode="heightFix" class="img bcard"></image>
				</template>
				<template v-else>
					<image :src="showCardDet.img[0]" mode="heightFix" class="img"></image>
				</template>
			</div>
			<div class="close" @click="changeLeader(showCardDet)" v-if="showCardDet.isSwitch != '-1'">查看{{ showCardDet.isSwitch == '1' ? '反' : '正' }}面</div>
			<div class="detInfo">
				<template v-if="showCardDet.isSwitch != '-1'">
					<div class="name" v-if="showCardDet.isSwitch == '1'">{{ showCardDet.name[0] }}</div>
					<div class="name" v-else>{{ showCardDet.name[0] }}</div>
				</template>
				<template v-else>
					<div class="name">{{ showCardDet.name[0] }}</div>
				</template>
				<div class="skill" v-if="showCardDet.isSwitch != '-1'">
					<template v-if="showCardDet.isSwitch == '1'">
						<div class="item" v-for="(skill, index) in showCardDet.effect[0]" :key="index">
							<div class="sdet" v-html="skill"></div>
						</div>
					</template>
					<template v-else>
						<div class="item" v-for="(skill, index) in showCardDet.effect[1]" :key="index">
							<div class="sdet" v-html="skill"></div>
						</div>
					</template>
				</div>
				<div class="skill" v-else>
					<div class="item" v-for="(skill, index) in showCardDet.effect[0]" :key="index">
						<div class="sdet" v-html="skill"></div>
					</div>
				</div>
				<div class="cInfo">
					<div class="cell">
						<div class="tlt">Card type</div>
						<div>{{ showCardDet.type }}</div>
					</div>
					<div class="cell">
						<div class="tlt">Color</div>
						<div :class="{red: showCardDet.color == 'Red', blue: showCardDet.color == 'Blue', green: showCardDet.color == 'Green', yellow: showCardDet.color == 'Yellow'}">{{ showCardDet.color }}</div>
					</div>
				</div>
				<div class="cInfo">
					<div class="cell">
						<div class="tlt">Cost</div>
						<div>{{ showCardDet.cost }}</div>
					</div>
					<div class="cell">
						<div class="tlt">Specified cost</div>
						<div v-if="showCardDet.type == 'LEADER'">-</div>
						<div :class="{red: showCardDet.color == 'Red', blue: showCardDet.color == 'Blue', green: showCardDet.color == 'Green', yellow: showCardDet.color == 'Yellow'}" v-else>{{ showCardDet.specifiedCost }}</div>
					</div>
				</div>
				<div class="cInfo">
					<div class="cell">
						<div class="tlt">Power</div>
						<div v-if="showCardDet.isSwitch != '-1'">
							<template v-if="showCardDet.isSwitch == '1'">{{ showCardDet.power[0] }}</template>
							<template v-else>{{ showCardDet.power[1] }}</template>
						</div>
						<div v-else>{{ showCardDet.power[0]}}</div>
					</div>
					<div class="cell">
						<div class="tlt">Combo power</div>
						<div>{{ showCardDet.comboPower }}</div>
					</div>
				</div>
				<div class="othInfo">
					<div class="tlt">Features</div>
					<div>{{ showCardDet.features }}</div>
				</div>
			</div>
			<div class="close" @click="isShowCard = false; showCardDet.showF = '1'">关闭</div>
		</div>
  </div>
</template>

<script setup>
	import emptyList from '../components/emptyList/index.vue'
	import copyRight from '../components/copyright/index.vue'
	import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
	import { seriesList, returnDetList, _showLoading } from '../../js/untils'

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
			uni.hideLoading()
		}, 1500);
	}

	const returnNameMap = async () => {
		const res = await import('./json/series.json');
		let list = res.default;
		let result = [];
		for(let item of list){
			let reg = `${item.name.toLowerCase()}`;
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
		// console.log(obj)
		for(let serItem of seriesList){
			if(obj[serItem]?.length > 0){
				returnDetList(serItem, function(res){
					loadData(res, obj[serItem], serItem)
				})
			}
		}
	}
	
	const loadData = (oData, data, series) => {
		let result = oData.filter(ser => {
			return data.includes(ser.name[0])
		});
		// console.log(result)
		allIndex += result.length;
		resetData = [...resetData, ...result];
		// console.log(allIndex, resetData.length)
		if(allIndex == resetData.length){
			resultList.value = resetData
		}
	}

	const reSearch = () => {
		if(searchInp.value == ''){
      uni.showToast({
        title: '请输入英文卡名',
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
	// 详情
  const showDet = (item) => {
    let copy = JSON.parse(JSON.stringify(item));
    // if(copy.isSwitch != '-1'){
    //   copy.isSwitch = '1';
    // }
		showCardDet.value = copy;
		isShowCard.value = true
  }
	// 列表切换正反
	const changeLeader = (FoB) => {
    if(FoB.isSwitch == '1'){
      FoB.isSwitch = '2'
    }else{
      FoB.isSwitch = '1'
    }
  }
</script>

<style scoped lang="scss">
	.fctrl{
		position: sticky;
		top: 0;
		padding: 20rpx 30rpx 10rpx;
		background: #f3f3f3;
		box-shadow: 0 -1px #f3f3f3;
		font-family: 'Chakra Petch';
		z-index: 5;
		.info{
			margin: 0 0 10rpx 0;
			display: flex;
			justify-content: space-between;
		}
		.search{
			margin: 10rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.inp{
				background: #fff;
				width: 100%;
				border: 1px solid #4caf50;
				border-right: 0;
				border-radius: 10rpx 0 0 10rpx;
				overflow: hidden;
				input{
					padding: 0 0 0 10rpx;
					width: 80%;
					height: 60rpx;
				}
			}
			.bn{
				background: #4caf50;
				width: 20%;
				height: 60rpx;
				line-height: 60rpx;
				border: 1px solid #4caf50;
				border-radius: 0 10rpx 10rpx 0;
				color: #fff;
				text-align: center;
			}
		}
	}
	.list{
		margin: 10rpx 30rpx 0;
		font-family: 'Chakra Petch';
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
				background: rgba(193, 193, 193, .1);
				min-height: 300rpx;
				border-radius: 12rpx;
				overflow: hidden;
				.cardBox{
					position: relative;
					transition: transform 1s;
					transform-style: preserve-3d;
					.img{
						width: 100%;
						height: 100%;
						display: block;
						&.fcard{
							position: relative;
							z-index: 2;
							backface-visibility: hidden;
						}
						&.bcard{
							position: absolute;
							top: 0;
							left: 0;
							transform: rotateY(180deg);
						}
					}
					&.showback{
						transform: rotateY(-180deg);
					}
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
						}
					}
				}
        .type{
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 0 10rpx;
					border-radius: 3px;
          color: #fff;
          transform: scale(.6);
          transform-origin: 0 100%;
					z-index: 3;
					&.red{
						background: #da0d36
					}
					&.blue{
						background: #0087cc
					}
					&.green{
						background: #00ae65
					}
					&.yellow{
						background: #e1bf1e
					}
        }
				.ser{
					position: absolute;
          bottom: 0;
          right: 0;
          padding: 0 10rpx;
					border-radius: 3px;
					background: #fff;
          color: #333;
          transform: scale(.6);
          transform-origin: 100% 100%;
					z-index: 3;
				}
			}
			.name{
        position: relative;
				text-align: center;
			}
			.bn{
          position: absolute;
          bottom: 0;
          right: 0;
					padding: 0 10rpx;
          background: #333;
					border-radius: 3px;
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
		font-family: 'Chakra Petch';
		animation-duration: .4s;
		overflow-y: scroll;
		box-sizing: border-box;
		.cardShow{
      position: relative;
			margin: 0 auto;
			width: 480rpx;
			height: 671rpx;
			overflow: hide;
			transition: transform 1s;
			transform-style: preserve-3d;
			.img{
				width: 100%;
				height: 100%;
				display: block;
				&.fcard{
					position: relative;
					z-index: 2;
					backface-visibility: hidden;
				}
				&.bcard{
					position: absolute;
					top: 0;
					left: 0;
					transform: rotateY(180deg);
				}
			}
			&.showback{
				transform: rotateY(-180deg)
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
				}
			}
		}
		.cInfo{
			margin: 10rpx 0 0 0;
			padding: 10rpx 0 0 0;
			border-top: 1px dashed #ccc;
			display: flex;
			justify-content: space-between;
			.cell{
				width: 49%;
				.tlt{
					font-size: 26rpx
				}
				.red{
					color: #da0d36
				}
				.blue{
					color: #0087cc
				}
				.green{
					color: #00ae65
				}
				.yellow{
					color: #e1bf1e
				}
			}
		}
		.othInfo{
			margin: 10rpx 0 0 0;
			padding: 10rpx 0 0 0;
			border-top: 1px dashed #ccc;
			.tlt{
				font-size: 26rpx;
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