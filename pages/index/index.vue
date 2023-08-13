<template>
  <div class="hot">
    <div @click="copyTar('https://play.limitlesstcg.com/decks')">
      <image src="https://play.limitlesstcg.com/limitless.png" mode="heightFix" class="img"></image>
      卡组推荐网站 - Limitless
    </div>
  </div>
  <div class="showCardImgType">
    <div class="tlt">显示卡图版本</div>
    <div class="bns" :class="{on: showImgType == 'en'}" @click="setLag('en')">美版</div>
    <div class="bns" :class="{on: showImgType == null}" @click="setLag('cn')">繁中</div>
  </div>
  <div class="useNo">标准环境<span class="em">{{ tipNowNo }}</span>标</div>
  <div class="list">
    <div class="sbox" v-for="item in seriesList" :key="item.sname">
      <div class="tlt">{{ item.sname }} {{ item.sename }}</div>
      <div class="slist">
        <template v-for="sitem in item.list" :key="sitem.no">
          <div class="item" v-if="!sitem.isBack" @click="goSeries(sitem)">
            <div class="imgwp">
              <image :src="sitem.logo" mode="heightFix" class="img"></image>
            </div>
            {{ sitem.name }}
            <div class="ps">{{ sitem.no }}({{ sitem.tipNo }})</div>
          </div>
          <div class="item dis" v-else>
            <div class="imgwp">
              <image :src="sitem.logo" mode="heightFix" class="img"></image>
            </div>
            {{ sitem.name }}
            <div class="ps">{{ sitem.no }} - 退环境({{ sitem.tipNo }})</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
  import seriesList from './series'
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

  const tipNowNo = ref('E/F/G');
  let showImgType = ref(null);

  onLoad(options => {
    let t = uni.getStorageSync('imgType');
		if(t == 'en'){
			showImgType.value = t
		}else{
			showImgType.value = null
		}
  })

  const setLag = (type) => {
    uni.setStorageSync('imgType', type)
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

  const copyTar = (url) => {
    uni.setClipboardData({
      data: url,
      success(res) {
        uni.showToast({
          title: 'Limitless网址已复制，请用浏览器打开',
          icon: 'none'
        })
      }
    })
  }
</script>

<style scoped lang="scss">
  .hot{
    padding: 20rpx;
    .img{
      margin: 0 auto;
      height: 100rpx;
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
  .useNo{
    padding: 10rpx 20rpx 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    .em{
      margin: 0 10rpx;
      padding: 0 10rpx;
      background: #ce2a2c;
      color: #fff
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
          &.dis{
            background: #ce2a2c;
            color: #fff;
            opacity: .5;
          }
        }
      }
    }
  }
</style>