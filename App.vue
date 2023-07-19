<script setup>
	import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
	
	onLaunch(() => {
		console.log('App Launch')
	})
	
	onShow(() => {
		console.log('App Show')
	})
	
	onHide(() => {
		console.log('App Hide')
	})
</script>

<style>
	@import url(./common/css/animate.min.css);
	/*每个页面公共css */
	body{
		background: #f7f7f7;
	}
	.popups{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,.5);
		z-index: 100;
	}
</style>
