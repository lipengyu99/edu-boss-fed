<template>
  <div class="head">
    <i class="el-icon-s-fold" />
    <!-- <i class="el-icon-s-unfold"></i> -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-left:20px;flex:1"
    >
      <el-breadcrumb-item
        v-for="(item, index) in routerArr"
        :key="index"
        @click.native="PathTo(item.path)"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-dropdown @command="handleCommand">
      <el-avatar
        :size="30"
        :src="userInfo.portrait || require('@/assets/default-avatar.png')"
      />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided command="logout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getUserInfo } from '@/api/users'
@Component
export default class extends Vue {
  private routerArr: any[] = [];

  @Watch('$route', { deep: true, immediate: true })
  private routerChange () {
    const matched = this.$route.matched.filter(item => {
      return item.meta && item.meta.title
    })
    this.routerArr = matched.filter(item => {
      return item.meta
    })
  }

  private handleCommand (command: string) {
    if (command === 'logout') {
      this.$confirm('确定退出么？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('setUser', null)
          this.$router.push('/login')
          this.$message.success('退出成功')
        })
        .catch(() => {
          this.$message.info('取消退出')
        })
    }
  }

  private PathTo (path: any) {
    // console.log(path);
    this.$router.push({ path })
  }

  private userInfo: any = {};
  private created () {
    this.loadUserInfo()
  }

  private async loadUserInfo () {
    const { data } = await getUserInfo()
    this.userInfo = data.content
  }
}
</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
