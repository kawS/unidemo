<template>
	<div class="search">
    <div class="inp">
      <input type="text" v-model="searchInp" placeholder="请输入卡名(只支持英文)" />
    </div>
    <div class="bn" @click="goSearch">检索</div>
  </div>
	<div class="list">
		<div class="sbox">
			<div class="tlt">BOOSTER PACK</div>
			<div class="slist">
				<template v-for="sitem in series.pack" :key="sitem.no">
					<div class="item" :class="{'dis': sitem.isHide }" @click="goSeries(sitem)">
						<div class="imgwp">
							<image :src="sitem.img" mode="heightFix" class="img"></image>
						</div>
						{{ sitem.name }}
						<div class="ps">[{{ sitem.series }}]{{ sitem.isHide ? '- 暂未发行' : '' }}</div>
					</div>
				</template>
			</div>
		</div>
    <div class="sbox">
      <div class="tlt">STARTER DECK</div>
      <div class="slist">
        <template v-for="sitem in series.deck" :key="sitem.no">
          <div class="item" @click="goSeries(sitem)">
            <div class="imgwp">
              <image :src="sitem.img" mode="heightFix" class="img"></image>
            </div>
            {{ sitem.name }}
            <div class="ps">[{{ sitem.series }}]</div>
          </div>
        </template>
      </div>
    </div>
		<div class="sbox">
			<div class="tlt">PROMOTION PACK</div>
			<div class="slist">
				<template v-for="sitem in series.promo" :key="sitem.no">
					<div class="item" @click="goSeries(sitem)">
						<div class="imgwp elogo">
							<image src="../../../common/img/logo_fw2.png" mode="heightFix" class="img"></image>
						</div>
						{{ sitem.name }}
						<div class="ps">[{{ sitem.series }}]</div>
					</div>
				</template>
			</div>
		</div>
	</div>
  <copyRight></copyRight>
</template>

<script setup>
  import copyRight from '../components/copyright/index.vue'
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
  
  const series = {
    pack: [
      { series: 'FB02', name: '-BLAZING AURA-', img: 'https://www.dbs-cardgame.com/fw/images/products/item/FB02_en.webp', type: 'BOOSTER PACK', isHide: true },
      { series: 'FB01', name: '-AWAKENED PULSE-', img: 'https://www.dbs-cardgame.com/fw/images/products/item/FB01.webp', type: 'BOOSTER PACK' }
    ],
    deck: [
      { series: 'FS04', name: '-FRIEZA-', img: 'https://www.dbs-cardgame.com/fw/images/products/item/FS04.webp', type: 'STARTER DECK' },
      { series: 'FS03', name: '-BROLY-', img: 'https://www.dbs-cardgame.com/fw/images/products/item/FS03.webp', type: 'STARTER DECK' },
      { series: 'FS02', name: '-VEGETA-', img: 'https://www.dbs-cardgame.com/fw/images/products/item/FS02.webp', type: 'STARTER DECK' },
      { series: 'FS01', name: '-SON GOKU-', img: 'https://www.dbs-cardgame.com/fw/images/products/item/FS01.webp', type: 'STARTER DECK' }
    ],
		promo: [
			{ series: 'FP', name: '-PROMOTION PACK-', img: '', type: 'PROMOTION PACK' }
		]
  }
	let searchInp = ref('');
  
  onLoad(options => {
    
  })

	const goSearch = () => {
    if(searchInp.value == ''){
      uni.showToast({
        title: '请输入英文卡名',
        icon: 'none',
        duration: 2000
      });
      return
    }
		// console.log(searchInp.value);
    uni.navigateTo({
			url: `/subpackagesDBSFW/pages/search/index?searchinp=${encodeURIComponent(searchInp.value)}`,
			success: res => {
        searchInp.value = ''
      }
		})
  }
  
  const goSeries = (item) => {
    if(item.isHide) return;
    const pack = encodeURIComponent(`${item.type} ${item.name} [${item.no}]`);
    uni.navigateTo({
			url: `/subpackagesDBSFW/pages/list/index?series=${item.series}&name=${encodeURIComponent(item.name)}`
    })
  }
</script>

<style scoped lang="scss">
  .search{
    margin: 10rpx 30rpx;
		font-family: 'Chakra Petch';
    display: flex;
    align-items: center;
    justify-content: space-between;
    .inp{
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
	.list{
		padding: 30rpx 0;
		font-family: 'Chakra Petch';
		.sbox{
			margin: 0 30rpx 10rpx;
			&:last-of-type{
				margin-bottom: 0;
			}
			.tlt{
				margin: 0 0 10rpx 0;
			}
			.slist{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.item{
					margin: 0 0 15rpx 0;
					padding: 30rpx 0 20rpx;
					background: rgba(0,0,0,.1);
					width: 49%;
					border-radius: 10rpx;
					text-align: center;
					display: flex;
					align-items: center;
					flex-direction: column;
          &.dis{
            opacity: .5;
          }
					.imgwp{
						margin-bottom: 20rpx;
						width: 100%;
						height: 200rpx;
						display: flex;
						align-items: center;
						overflow: hidden;
					}
					.elogo{
						height: 150rpx;
						.img{
							height: 150rpx
						}
					}
					.img{
						margin: 0 auto;
						height: 200rpx;
						display: block;
					}
					.ps{
						font-size: 12px;
					}
				}
			}
		}
	}
  
</style>
