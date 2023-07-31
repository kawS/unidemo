<template>
  <div class="hot">
    <navigator :url="'../webview/index?url=https://play.limitlesstcg.com/decks'">
      <image src="https://play.limitlesstcg.com/limitless.png" mode="widthFix" class="img"></image>
      limitlesstcg卡组推荐
    </navigator>
  </div>
  <div class="showCardImgType">
    <div class="tlt">显示卡图版本</div>
    <div class="bns" :class="{on: showImgType == 'en'}" @click="setLag('en')">美版</div>
    <div class="bns" :class="{on: showImgType == null}" @click="setLag('cn')">繁中</div>
  </div>
  <div class="list">
    <div class="sbox" v-for="item in seriesList" :key="item.sname">
      <div class="tlt">{{ item.sname }} {{ item.sename }}</div>
      <div class="slist">
        <div class="item" v-for="sitem in item.list" :key="sitem.no" @click="goSeries(sitem)">
          <div class="imgwp">
            <image :src="sitem.logo" mode="heightFix" class="img"></image>
          </div>
          {{ sitem.name }}
          <div class="ps">{{ sitem.no }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import seriesList from './series'
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

  let showImgType = ref(null);

  onLoad(options => {
    let t = wx.getStorageSync('imgType');
		if(t == 'en'){
			showImgType.value = t
		}else{
			showImgType.value = null
		}
  })

  const setLag = (type) => {
    wx.setStorageSync('imgType', type)
    showImgType.value = (type == 'en' ? 'en' : null)
  }
  

  const goSeries = (item) => {
    if(item.no == ''){
      uni.showToast({
        title: '暂未发行',
        icon: 'none',
        duration: 2000
      });
      return
    }
    uni.navigateTo({
			url: `/pages/seriesDet/index?no=${item.no}&sname=${encodeURIComponent(item.name)}`,
			success: res => {},
			fail: () => {},
			complete: () => {}
		})
  }
</script>

<style scoped lang="scss">
  .hot{
    padding: 20rpx;
    .img{
      margin: 0 auto;
      width: 200rpx;
      display: block
    }
    text-align: center;
  }
  .showCardImgType{
    padding: 0 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .bns{
      margin: 0 10rpx;
      padding: 0 20rpx;
      background: #eee;
      border-radius: 5px;
    }
    .on{
      background: #16baaa;
      color: #fff;
    }
  }
  .list{
    padding: 30rpx 0;
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
          margin: 0 0 20rpx 0;
          padding: 30rpx 0 20rpx;
          background: rgba(0,0,0,.1);
          width: 48%;
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: column;
          .imgwp{
            width: 100%;
            height: 120rpx;
            display: flex;
            align-items: center;
            overflow: hidden;
          }
          .img{
            margin: 0 auto 10rpx;
            height: 120rpx;
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