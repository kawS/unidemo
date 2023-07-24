<template>
  <web-view :src="url"></web-view>
</template>

<script setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

  let url = ref('')

  onLoad(options => {
    url.value = options.url
  })
</script>

<style scoped lang="scss">
</style>