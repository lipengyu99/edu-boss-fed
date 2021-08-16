<template>
  <div class="course-create">
    <create-or-update />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CreateOrUpdate from './component/CreateOrUpdate.vue'

@Component({
  components: { CreateOrUpdate }
})
export default class CreateCourseList extends Vue {}
</script>

<style scoped></style>
