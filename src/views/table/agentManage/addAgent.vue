<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :class-name="'sub-navbar '+postForm.statusOn">
        <el-input type="reset" autosize value="重置" style="width: auto" />
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布</el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" label-width="90px" label="代理商名称" prop="agentName">
              <el-input :rows="1" v-model="postForm.agentName" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
              <span v-show="agentNameLength" class="word-counter">{{ agentNameLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="90px" label="代理商编码" prop="agentCode">
              <el-input :rows="1" v-model="postForm.agentCode" type="number" class="article-textarea" autosize placeholder="请输入内容"/>
              <span v-show="agentCodeLength" class="word-counter">{{ agentCodeLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="90px" label="登录账号" prop="agentAccount">
              <el-input :rows="1" v-model="postForm.agentAccount" type="textarea" class="article-textarea" autosize placeholder="请输入代理商登录账号"/>
              <span v-show="agentAccountLength" class="word-counter">{{ agentAccountLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="90px" label="登录密码" prop="agentPassword">
              <el-input :rows="1" v-model="postForm.agentPassword" type="textarea" class="article-textarea" autosize placeholder="请输入代理商登录密码"/>
              <span v-show="agentPasswordLength" class="word-counter">{{ agentPasswordLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="90px" label="代理商描述" prop="agentDesc">
              <el-input :rows="1" v-model="postForm.agentDesc" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
              <span v-show="agentDescLength" class="word-counter">{{ agentDescLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="90px" label="QQ号码" prop="qq">
              <el-input :rows="1" v-model="postForm.qq" type="number" class="article-textarea" autosize placeholder="请输入QQ号码"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="90px" label="联系电话" prop="mobile">
              <el-input :rows="1" v-model="postForm.mobile" type="text" class="article-textarea" autosize placeholder="请输入QQ号码"/>
            </el-form-item>

            <el-form-item style="margin-bottom: 40px;" label-width="90px" label="充值返点" prop="rechargePoint">
              <el-input :rows="1" v-model="postForm.rechargePoint" type="number" class="article-textarea" autosize placeholder="0-100"/>
            </el-form-item>

            <el-form-item style="margin-bottom: 40px;" label-width="90px" label="提现返点" prop="cashPoint">
              <el-input :rows="1" v-model="postForm.cashPoint" type="number" class="article-textarea" autosize placeholder="0-100"/>
            </el-form-item>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="10">
                  <el-form-item label-width="80px" label="注册时间" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.registerDate" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-form-item style="margin-bottom: 40px;" label-width="80px" label="状态">
              <el-radio-group v-model="postForm.agentStatus">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="-1">删除</el-radio>
                <el-radio :label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { addAgent, queryOneAgent, updAgent } from '@/api/article'

const defaultForm = {
  agentStatus: 1,
  agentName: '', // 代理商名称
  agentCode: '', // 代理商编码
  agentAccount: '', // 代理商登录账号
  agentPassword: '', // 代理商登录密码
  agentDesc: '', // 代理商描述
  qq: '', // QQ号码
  mobile: '', // 联系电话
  rechargePoint: '', // 充值返点
  cashPoint: '', // 提现返点
  registerDate: new Date()
}

export default {
  name: 'ArticleDetail',
  components: { MDinput, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: '该项不能为空！',
          type: 'error'
        })
        callback(new Error('该项不能为空！'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        agentName: [{ validator: validateRequire }],
        agentCode: [{ validator: validateRequire }],
        qq: [{ validator: validateRequire }],
        agentDesc: [{ validator: validateRequire }],
        mobile: [{ validator: validateRequire }],
        rechargePoint: [{ validator: validateRequire }],
        cashPoint: [{ validator: validateRequire }],
        agentAccount: [{ validator: validateRequire }],
        agentPassword: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    agentNameLength() {
      // 昵称内容输入的长度监听
      return this.postForm.agentName.length
    },
    agentCodeLength() {
      // 金豆内容输入的长度监听
      return this.postForm.agentCode.length
    },
    lang() {
      return this.$store.getters.language
    },
    agentDescLength() {
      return this.postForm.agentDesc.length
    },
    agentAccountLength() {
      return this.postForm.agentAccount.length
    },
    agentPasswordLength() {
      return this.postForm.agentPassword.length
    }
  },
  created() {
    this.agentId = this.$route.query.agentId
    if (this.agentId > 0) {
      queryOneAgent(this.agentId).then(response => {
        this.postForm = response.data.module
      }).catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
    fetchData(id) {
      addAgent(this.postForm).then(response => {
        this.postForm = response.data
        // Just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.agentName += `   Article Id:${this.postForm.id}`
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.postForm.registerDate = '2019-02-02 20:00:00'
      if (this.agentId > 0) {
        updAgent(this.postForm).then(response => {
          if (response.data.success) {
            this.loading = true
            this.$notify({
              title: '成功',
              message: '已修改',
              type: 'success',
              duration: 2000
            })
            this.postForm.status = 'published'
            this.loading = false
            this.$router.push({ path: '/agentUserList/agent-list-table', query: { data: '' }})
          } else {
            console.log(response.data.errorDetail)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        addAgent(this.postForm).then(response => {
          if (response.data.success) {
            this.loading = true
            this.$notify({
              title: '成功',
              message: '已添加',
              type: 'success',
              duration: 2000
            })
            this.postForm.status = 'published'
            this.loading = false
            this.$router.push({ path: '/agentUserList/agent-list-table', query: { data: '' }})
          } else {
            console.log(response.data.errorDetail)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    draftForm() {
      if (this.postForm.agentName.length === 0 ||
        this.postForm.agentCode.length === 0 ||
        this.postForm.qq.length === 0 ||
        this.postForm.agentDesc.length === 0 ||
        this.postForm.mobile.length === 0 ||
        this.postForm.rechargePoint.length === 0 ||
        this.postForm.cashPoint.length === 0 ||
        this.postForm.registerDate.length === 0 ||
        this.postForm.agentAccount.length === 0 ||
        this.postForm.agentPassword.length === 0
      ) {
        this.$message({
          message: '请填写必要的标题和内容 ',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
          text-align: right;
          margin-right: 10px;
          .editor-upload-btn {
            display: inline-block;
          }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
</style>
