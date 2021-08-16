<template>
  <div>
    <el-form>
      <el-form-item label="角色名称">
        <el-input v-model="role.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="role.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input type="textarea" v-model="role.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { createOrUpdate, getRoleById } from '@/api/role'

@Component
export default class CreateOrEdit extends Vue {
  @Prop()
  private roleId: any

  @Prop({ default: false })
  private isEdit: any

  private role: any = {
    code: '',
    name: '',
    description: ''
  }

  private created () {
    if (this.isEdit) {
      this.loadRole()
    }
  }

  private async loadRole () {
    const { data } = await getRoleById(this.roleId)
    this.role = data.data
  }

  private async onSubmit () {
    await createOrUpdate(this.role)
    this.$message.success('操作成功')
    this.$emit('success')
  }
}
</script>

<style scoped></style>
