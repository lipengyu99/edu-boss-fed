<template>
  <div class="course-image">
    <el-progress
      v-if="isUploading"
      type="circle"
      :percentage="percentage"
      :width="178"
      :status="percentage === 100 ? 'success' : undefined"
    />
    <el-upload
      v-else
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUpload"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { uploadCourseImage } from '@/api/course'

@Component
export default class CourseImage extends Vue {
  @Prop()
  private value = ''

  @Prop({ default: 2 })
  private limit: any

  private isUploading = false
  private percentage = 0

  private beforeAvatarUpload (file: any) {
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < this.limit

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
      this.$message.error(`上传头像图片大小不能超过 ${this.limit}MB!`)
    }
    return isJPG && isLt2M
  }

  private async handleUpload (options: any) {
    try {
      this.isUploading = true
      const fd = new FormData()
      fd.append('file', options.file)
      const { data } = await uploadCourseImage(fd, e => {
        this.percentage = Math.floor((e.loaded / e.total) * 100)
      })
      if (data.code === '000000') {
        this.isUploading = false
        this.percentage = 0
        this.$emit('input', data.data.name)
      } else {
        this.$message.error('上传失败')
      }
    } catch (err) {
      console.log(err)
    }
    this.isUploading = false
    this.percentage = 0
  }
}
</script>

<style scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
