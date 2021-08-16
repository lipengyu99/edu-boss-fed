<template>
  <div class="menu-create">
    <create-or-edit :is-edit="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CreateOrEdit from './component/CreateOrEdit.vue'

@Component({
  components: {
    CreateOrEdit
  }
})
export default class Edit extends Vue {}
</script>

<style scoped></style>
