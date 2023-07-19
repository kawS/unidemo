<template>
  <div class="list">
    <div class="sbox" v-for="item in seriesList">
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