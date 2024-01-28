<template>
  <div class="useNo">
    标准环境<span class="em">{{ tipNowNo }}</span>标
    <div class="msg">-3月21日退标(E)</div>
  </div>
  <div class="hot">
    <div @click="copyTar('https://play.limitlesstcg.com/decks')">
      <image src="https://play.limitlesstcg.com/limitless.png" mode="heightFix" class="img"></image>
      卡组推荐网站 - Limitless
    </div>
  </div>
  <div class="deck">
    <div class="bn" @click="isShowDeck = true">可导入live或Limitless卡组代码预览</div>
  </div>
  <div class="search">
    <div class="inp">
      <input type="text" v-model="searchInp" placeholder="请输入卡名(支持简中、英文)" />
    </div>
    <div class="bn" @click="goSearch">检索</div>
  </div>
  <div class="ps">只展示标准环境数据，数据及图片来自官网</div>
  <div class="list">
    <div class="sbox" v-for="item in series" :key="item.sname">
      <div class="tlt">{{ item.sname }} {{ item.sename }}</div>
      <div class="slist">
        <template v-for="sitem in item.list" :key="sitem.no">
          <div class="item" :class="{cs: sitem.code == '暂未发行'}" v-if="!sitem.isBack" @click="goSeries(sitem)">
            <div class="imgwp">
              <image :src="sitem.logo" mode="heightFix" class="img"></image>
            </div>
            {{ sitem.name }}
            <div class="ps">{{ sitem.no }}({{ sitem.tipNo }}){{ sitem.code == '' ? '' : ` - ${sitem.code}` }}</div>
          </div>
          <div class="item dis" v-else>
            <div class="imgwp">
              <image :src="sitem.logo" mode="heightFix" class="img"></image>
            </div>
            {{ sitem.name }}
            <div class="ps">{{ sitem.no }} - 退环境({{ sitem.tipNo }}){{ sitem.code == '' ? '' : ` - ${sitem.code}` }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <copyRight></copyRight>
  <div class="popups" v-if="isShowDeck">
    <div class="p-deck">
      <textarea v-model="deckData" maxlength="-1" placeholder="请粘贴卡组代码"></textarea>
      <div class="bn" @click="importDeck">确认</div>
      <div class="bn can" @click="deckData = ''">清除</div>
      <div class="bn can" @click="isShowDeck = false">关闭</div>
    </div>
  </div>
</template>

<script setup>
  import series from './js/series'
  import copyRight from '../../components/copyright/index.vue'
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

  const tipNowNo = ref('E/F/G');
  let searchInp = ref('');
  let isShowDeck = ref(false);
  let deckData = ref('');

  onLoad(options => {
    
  })
    
  const goSeries = (item) => {
    if(item.code == '暂未发行'){
      uni.showToast({
        title: '暂未发行',
        icon: 'none',
        duration: 2000
      });
      return
    }
    uni.navigateTo({
			url: `/subpackages/pages/seriesDet/index?no=${item.no}&sname=${encodeURIComponent(item.name)}&code=${item.code}`,
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

  const importDeck = () => {
    const olist = deckData.value.split('\n');
    let decklist = [];
    for(let item of olist){
      if(/^Pokémon/.test(item)){
				continue
			}else if(/^Trainer/.test(item)){
				continue
			}else if(/^Energy/.test(item)){
				continue
			}else if(/^Total Cards/.test(item)){
				continue
			}else if(item == ''){
				continue
			}
      decklist.push(item.replace(' PH', '').replace(/ \(.+\)/, ''))
    }
    uni.setStorageSync('tempDeck', JSON.stringify(decklist));
    isShowDeck.value = false;
    deckData.value = '';
    uni.navigateTo({
			url: '/subpackages/pages/deck/index',
			success: res => {},
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
    padding: 40rpx 30rpx 10rpx;
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
    .msg{
      font-size: 12px;
      color: #666
    }
  }
  .deck{
    padding: 10rpx 30rpx;
    .bn{
      margin: 0 auto;
      background: #eee;
      width: 75%;
      height: 60rpx;
      line-height: 60rpx;
      border: 1px solid #ccc;
      border-radius: 10rpx;
      font-size: 16px;
      text-align: center;
    }
  }
  .search{
    margin: 10rpx 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .inp{
      width: 100%;
      border: 1px solid #eee;
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
  .ps{
    margin: 0 30rpx;
    font-size: 12px;
    text-align: center
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
          margin: 0 0 15rpx 0;
          padding: 30rpx 0 20rpx;
          background: rgba(0,0,0,.1);
          width: 49%;
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
          &.cs{
            opacity: .5;
          }
        }
      }
    }
  }
  .p-deck{
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    textarea{
      padding: 15rpx;
      background: #fff;
      width: 100%;
      height: 900rpx;
      border-radius: 10rpx;
      font-size: 12px;
      box-sizing: border-box;
    }
    .bn{
      margin: 20rpx auto 0;
      padding: 10rpx 0;
      background: #4caf50;
      width: 50%;
      border-radius: 10rpx;
      font-size: 28rpx;
      color: #fff;
      text-align: center;
    }
    .can{
      background: #fff;
      color: #000
    }
  }
</style>