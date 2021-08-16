<template>
  <div>
    <el-container style="height:100vh">
      <el-aside width="200px">
        <menuSide />
      </el-aside>
      <el-container>
        <el-header>
          <headerContent/>
        </el-header>
        <el-main><router-view></router-view> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import menuSide from './components/app.aside.vue'
import headerContent from './components/app.header.vue'

@Component({
  components: { menuSide, headerContent }
})
export default class Layout extends Vue {}
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100%;
  min-height: 400px;
}
.el-icon-s-fold {
  /* margin-top: 15px; */
  font-size: 25px;
  font-weight: normal;
}
</style>
