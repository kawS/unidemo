<template>
	<div class="tlt">{{ serName }} - {{ detList.length }}张</div>
	<div class="list">
		<div class="item" v-for="item in detList" :key="item.id" @click="showDet(item)">
			<image :src="item.imgUrl" mode="widthFix" class="img"></image>
			<div class="tname">{{ item.cardName }}</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

	let serName = ref(null);
	let detList = ref([])
	
	onLoad(options => {
		const no = options.no;
		serName.value = no;
		// if(no == 'SV1'){
		// 	import('./SV1.json').then(res => {
		// 		detList.value = res.default
		// 	})
		// }
		if(no == 'SV2'){
			import('./SV2.json').then(res => {
				detList.value = res.default
			})
		}
	})
  
  const showDet = (item) => {
    console.log(item.id)
  }
</script>

<style scoped lang="scss">
	.tlt{
		padding: 30rpx
	}
	.list{
		margin: 0 30rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.item{
			position: relative;
			margin: 0 0 20rpx 0;
			width: 48%;
			text-align: center;
			.img{
				width: 100%;
				display: block;
			}
			.tname{
				position: absolute;
				bottom: 0;
				left: 0;
				padding: 5rpx 0;
				background: rgba(0,0,0, .5);
				width: 100%;
				color: #fff
			}
		}
	}
</style>