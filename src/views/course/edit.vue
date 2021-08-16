<template>
  <div class="course-create">
    <create-or-update :is-edit="true" :course-id="courseId" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CreateOrUpdate from './component/CreateOrUpdate.vue'

@Component({
  components: {
    CreateOrUpdate
  }
})
export default class extends Vue {
  @Prop({ required: true })
  courseId: any
}
</script>

<style scoped></style>
