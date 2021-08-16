<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang="ts">
import { uploadCourseImage } from '@/api/course'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import E from 'wangeditor'
@Component
export default class TextEdit extends Vue {
  @Prop()
  private value = ''

  private editor = null

  @Watch('value')
  private changeValue () {
    (this.editor as any).txt.html(this.value)
  }

  private mounted () {
    this.initEditor()
  }

  private initEditor () {
    const editor = new E(this.$refs.editor as any)
    this.editor = editor as any
    editor.config.onchange = (value: any) => {
      this.$emit('input', value)
    }

    editor.config.customUploadImg = function (
      resultFiles: any,
      insertImgFn: any
    ) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      const fd = new FormData()
      fd.append('file', resultFiles[0])
      // uploadCourseImage()
      uploadCourseImage(fd).then(res => {
        // console.log(res.data.name)
        insertImgFn(res.data.name)
      })
      // console.log(resultFiles[0], insertImgFn)

      // 上传图片，返回结果，将图片插入到编辑器中
    }
    editor.create()
  }
}
</script>

<style scoped></style>
