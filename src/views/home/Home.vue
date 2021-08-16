<template>
  <div>
    <h1>{{ message }}</h1>
    <el-button class="btn" type="primary" size="default" @click="test"
      >测试</el-button
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import request from '@/utils/request.ts'
@Component
export default class Home extends Vue {
  private message = 'Home'
  private test () {
    request.get('/boss').then(res => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped></style>
