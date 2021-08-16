<template>
  <div>
    <resourceList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import resourceList from './component/List.vue'
@Component({
  components: {
    resourceList
  }
})
export default class Resource extends Vue {}
</script>

<style scoped></style>
