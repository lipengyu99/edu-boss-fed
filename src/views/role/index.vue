<template>
  <div class="role">
    <role-list />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RoleList from './component/List.vue'
@Component({
  components: {
    RoleList
  }
})
export default class Role extends Vue {}
</script>

<style scoped></style>
