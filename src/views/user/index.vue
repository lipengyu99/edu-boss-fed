<template>
  <div class="user">
    <user-list />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserList from './component/UserList.vue'
@Component({
  components: {
    UserList
  }
})
export default class User extends Vue {}
</script>

<style scoped></style>
