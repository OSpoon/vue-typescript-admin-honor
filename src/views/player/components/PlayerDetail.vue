<template>
  <div>
    <el-form ref="form" :model="playerForm" :rules="rules">
      <el-form-item prop="accountName" label="账户名">
        <el-input v-model="playerForm.accountName"></el-input>
      </el-form-item>
      <el-form-item prop="nickName" label="昵称">
        <el-input v-model="playerForm.nickName"></el-input>
      </el-form-item>
      <el-form-item prop="avatar" label="⽤户头像">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="default" @click="submitForm"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  ElUploadInternalFileDetail,
  ElUploadInternalRawFile
} from 'element-ui/types/upload'
import { Component, Prop, Vue, Ref } from 'vue-property-decorator'
import {
  defaultPlayerData,
  getPlayer,
  updatePlayer,
  createPlayer
} from '@/api/players'
import { Form } from 'element-ui'
@Component
export default class extends Vue {
  // 设置引⽤
  @Ref()
  form!: Form;

  // 必填项校验函数，弹出⼀个message提示
  validateRequire = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      this.$message({
        message: rule.field + '必须填写',
        type: 'error'
      })
      callback(new Error(rule.field + '必须填写'))
    } else {
      callback()
    }
  };

  // 校验规则
  rules = {
    accountName: [{ validator: this.validateRequire }],
    nickName: [{ validator: this.validateRequire }]
  };

  // 上传头像预览地址
  imageUrl = '';

  // 头像上传成功
  handleAvatarSuccess(res: any, file: ElUploadInternalFileDetail) {
    // 预览图⽚
    this.imageUrl = URL.createObjectURL(file.raw)
    // 将返回图⽚名称设置到playerForm上
    // 设置为响应中图⽚地址
    this.playerForm.avatar = file.name
  }

  beforeAvatarUpload(file: ElUploadInternalRawFile) {
    const isLt2M = file.size / 1024 / 1024 < 1
    if (!isLt2M) {
      this.$message.error('上传头像图⽚⼤⼩不能超过1MB!')
    }
    return isLt2M
  }

  // 编辑模式
  @Prop({ default: false })
  isEdit!: boolean;

  // 数据模型,默认全为空
  playerForm = Object.assign({}, defaultPlayerData);

  // 加载状态
  loading = false;

  // 根据isEdit状态决定是否需要获取玩家详情信息
  create() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }
  }

  async fetchData(id: number) {
    try {
      const { data } = await getPlayer(id)
      this.playerForm = data.player
    } catch (error) {
      console.error(error)
    }
  }

  async submitForm() {
    this.form.validate(async valid => {
      if (valid) {
        // 加载状态
        this.loading = true
        try {
          if (this.isEdit) {
            await updatePlayer(this.playerForm.id, this.playerForm)
          } else {
            await createPlayer(this.playerForm)
          }
          this.$notify({
            title: '操作成功',
            message: '新增玩家数据成功',
            type: 'success',
            duration: 2000
          })
          this.loading = false
        } catch (error) {
          console.error(error)
        }
      } else {
        console.error('校验失败，请修改后重试')
        return false
      }
    })
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
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
