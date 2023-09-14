<template>
  <div class="hot">
    <div @click="copyTar('https://play.limitlesstcg.com/decks')">
      <image src="https://play.limitlesstcg.com/limitless.png" mode="heightFix" class="img"></image>
      卡组推荐网站 - Limitless
    </div>
  </div>
  <div class="useNo">标准环境<span class="em">{{ tipNowNo }}</span>标</div>
  <div class="search">
    <input type="text" v-model="searchInp" placeholder="请输入卡名(支持简中、英文)" />
    <div class="bn" @click="goSearch">检索</div>
  </div>
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
  let searchInp = ref('');

  onLoad(options => {
    
  })
    
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
			url: `/subpackages/pages/seriesDet/index?no=${item.no}&sname=${encodeURIComponent(item.name)}`,
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

  const goSearch = () => {
    if(searchInp.value == ''){
      uni.showToast({
        title: '请输入卡名',
        icon: 'none',
        duration: 2000
      });
      return
    }
    uni.navigateTo({
			url: `/subpackages/pages/search/index?searchinp=${encodeURIComponent(searchInp.value)}`,
			success: res => {
        searchInp.value = ''
      },
			fail: () => {},
			complete: () => {}
		})
  }
</script>

<style scoped lang="scss">
  .hot{
    padding: 20rpx 30rpx;
    .img{
      margin: 0 auto;
      height: 100rpx;
      display: block
    }
    text-align: center;
  }
  .useNo{
    padding: 10rpx 30rpx;
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
  .search{
    margin: 10rpx 30rpx;
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
          border-radius: 10rpx;
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