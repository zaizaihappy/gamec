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
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="会员昵称" prop="memberNickname">
              <el-input :rows="1" v-model="postForm.memberNickname" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
              <span v-show="memberNicknameLength" class="word-counter">{{ memberNicknameLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="会员编码" prop="memberName">
              <el-input :rows="1" v-model="postForm.memberName" type="number" class="article-textarea" autosize placeholder="请输入内容"/>
              <span v-show="memberNameLength" class="word-counter">{{ memberNameLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="登录密码" prop="loginPass">
              <el-input :rows="1" v-model="postForm.loginPass" type="textarea" class="article-textarea" autosize placeholder="请输入登录密码"/>
              <span v-show="loginPassLength" class="word-counter">{{ loginPassLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="银行账户密码" prop="bankPass">
              <el-input :rows="1" v-model="postForm.bankPass" type="textarea" class="article-textarea" autosize placeholder="请输入登录密码"/>
              <span v-show="bankPassLength" class="word-counter">{{ bankPassLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="真实姓名" prop="userName">
              <el-input :rows="1" v-model="postForm.userName" type="textarea" class="article-textarea" autosize placeholder="请输入真实姓名"/>
              <span v-show="userNameLength" class="word-counter">{{ userNameLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="头像地址" prop="memberIconUrl">
              <el-input :rows="1" v-model="postForm.memberIconUrl" type="textarea" class="article-textarea" autosize placeholder="请输入"/>
              <span v-show="memberIconUrlLength" class="word-counter">{{ memberIconUrlLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="手机号码" prop="memberMobile">
              <el-input :rows="1" v-model="postForm.memberMobile" type="textarea" class="article-textarea" autosize placeholder="请输入手机号码"/>
              <span v-show="memberMobileLength" class="word-counter">{{ memberMobileLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="QQ号码" prop="memberQq">
              <el-input :rows="1" v-model="postForm.memberQq" type="number" class="article-textarea" autosize placeholder="请输入QQ号码"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="常用邮箱" prop="memberEmail">
              <el-input :rows="1" v-model="postForm.memberEmail" type="text" class="article-textarea" autosize placeholder="请输入常用邮箱"/>
            </el-form-item>

            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="微信" prop="memberWx">
              <el-input :rows="1" v-model="postForm.memberWx" type="textarea" class="article-textarea" autosize placeholder="请输入微信号"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="登录是否微信验证">
              <el-radio-group v-model="postForm.isWxcheck">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="会员等级" prop="memberLevel">
              <el-input :rows="1" v-model="postForm.memberLevel" type="number" class="article-textarea" autosize placeholder="0-100"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="会员经验值" prop="memberXp">
              <el-input :rows="1" v-model="postForm.memberXp" type="number" class="article-textarea" autosize placeholder="0-100"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="抽成比例" prop="gameRate">
              <el-input :rows="1" v-model="postForm.gameRate" type="number" class="article-textarea" autosize placeholder="0-100"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="推广地址" prop="extendLinks">
              <el-input :rows="1" v-model="postForm.extendLinks" type="textarea" class="article-textarea" autosize placeholder="请输入推广链接地址"/>
              <span v-show="extendLinksLength" class="word-counter">{{ extendLinksLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="135px" label="状态">
              <el-radio-group v-model="postForm.memberStatus">
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
import { addPlayer, queryOnePlayer, updPlayer } from '@/api/article'
import { getDateyyyyMMddHHmmss } from '@/utils/validate'

const defaultForm = {
  memberStatus: 1, // 会员状态
  memberNickname: '', // 会员昵称
  memberName: '', // 会员编码
  loginPass: '', // 登录密码
  bankPass: '', // 银行账户密码
  userName: '', // 真实姓名
  memberIconUrl: '', // 头像地址
  memberMobile: '', // 手机号码
  agentDesc: '', // 代理商描述
  memberQq: '', // memberQq号码
  memberEmail: '', // 常用邮箱
  memberWx: '', // 微信
  isWxcheck: 1, // 登录是否微信验证
  memberLevel: '', // 会员等级
  memberXp: 0, // 会员经验值
  extendLinks: '', // 推广链接地址
  gameRate: '0', // 抽成比例
  agentID: -1, // 代理商ID(-1为系统添加玩家 其他大于0的值为代理商ID)
  memberType: 2, // 玩家类型(1玩家-自行注册 2代理玩家-代理商创建)
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
        memberNickname: [{ validator: validateRequire }],
        memberName: [{ validator: validateRequire }],
        memberQq: [{ validator: validateRequire }],
        loginPass: [{ validator: validateRequire }],
        agentDesc: [{ validator: validateRequire }],
        memberEmail: [{ validator: validateRequire }],
        memberWx: [{ validator: validateRequire }],
        memberLevel: [{ validator: validateRequire }],
        userName: [{ validator: validateRequire }],
        memberIconUrl: [{ validator: validateRequire }],
        memberMobile: [{ validator: validateRequire }],
        extendLinks: [{ validator: validateRequire }],
        gameRate: [{ validator: validateRequire }],
        bankPass: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    memberNicknameLength() {
      // 昵称内容输入的长度监听
      return this.postForm.memberNickname.length
    },
    memberNameLength() {
      // 金豆内容输入的长度监听
      return this.postForm.memberName.length
    },
    lang() {
      return this.$store.getters.language
    },
    agentDescLength() {
      return this.postForm.agentDesc.length
    },
    userNameLength() {
      return this.postForm.userName.length
    },
    memberMobileLength() {
      return this.postForm.memberMobile.length
    },
    extendLinksLength() {
      return this.postForm.extendLinks.length
    },
    memberIconUrlLength() {
      return this.postForm.memberIconUrl.length
    },
    loginPassLength() {
      return this.postForm.loginPass.length
    },
    bankPassLength() {
      return this.postForm.bankPass.length
    }
  },
  created() {
    this.memberId = this.$route.query.memberId
    if (this.memberId > 0) {
      queryOnePlayer(this.memberId).then(response => {
        this.postForm = response.data.module
      }).catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
    submitForm() {
      this.postForm.registerDate = getDateyyyyMMddHHmmss(new Date())
      if (this.memberId > 0) {
        updPlayer(this.postForm).then(response => {
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
            this.$router.push({ path: '/userList/list-user-table', query: { data: '' }})
          } else {
            console.log(response.data.errorDetail)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        addPlayer(this.postForm).then(response => {
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
            this.$router.push({ path: '/userList/list-user-table', query: { data: '' }})
          } else {
            console.log(response.data.errorDetail)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    draftForm() {
      if (this.postForm.memberNickname.length === 0 ||
        this.postForm.memberName.length === 0 ||
        this.postForm.memberQq.length === 0 ||
        this.postForm.agentDesc.length === 0 ||
        this.postForm.memberEmail.length === 0 ||
        this.postForm.memberWx.length === 0 ||
        this.postForm.memberLevel.length === 0 ||
        this.postForm.registerDate.length === 0 ||
        this.postForm.userName.length === 0 ||
        this.postForm.memberMobile.length === 0 ||
        this.postForm.memberIconUrl.length === 0 ||
        this.postForm.loginPass.length === 0 ||
        this.postForm.bankPass.length === 0
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
