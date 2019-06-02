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
            <el-form-item style="margin-bottom: 40px;" label-width="130px" label="等级名称" prop="levelTitle">
              <el-input :rows="1" v-model="postForm.levelTitle" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
              <span v-show="levelTitleLength" class="word-counter">{{ levelTitleLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="130px" label="等级所需经验值" prop="levelXp">
              <el-input :rows="1" v-model="postForm.levelXp" type="number" class="article-textarea" autosize placeholder="请输入内容"/>
              <span v-show="levelXpLength" class="word-counter">{{ levelXpLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="130px" label="升级奖励金豆数" prop="levelUpReward">
              <el-input :rows="1" v-model="postForm.levelUpReward" type="number" class="article-textarea" autosize placeholder="请输入升级奖励金豆数"/>
              <span v-show="levelUpRewardLength" class="word-counter">{{ levelUpRewardLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="130px" label="充值奖励比例" prop="levelCreditCommision">
              <el-input :rows="1" v-model="postForm.levelCreditCommision" type="number" class="article-textarea" autosize placeholder="0-100"/>
              <span v-show="levelCreditCommisionLength" class="word-counter">{{ levelCreditCommisionLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="130px" label="签到奖励金豆基数" prop="levelSigninMultiples">
              <el-input :rows="1" v-model="postForm.levelSigninMultiples" type="number" class="article-textarea" autosize placeholder="请输入内容"/>
              <span v-show="levelSigninMultiplesLength" class="word-counter">{{ levelSigninMultiplesLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="130px" label="每日救济金豆数" prop="levelAlmsBean">
              <el-input :rows="1" v-model="postForm.levelAlmsBean" type="number" class="article-textarea" autosize placeholder="请输入每日救济金豆数"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="130px" label="排序位" prop="levelIndex">
              <el-input :rows="1" v-model="postForm.levelIndex" type="text" class="article-textarea" autosize placeholder="请输入每日救济金豆数"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="80px" label="状态">
              <el-radio-group v-model="postForm.levelStatus">
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
import { addPlayerLevel, getPlayerLevelDetail, updPlayerLevel } from '@/api/article'
import { getDateyyyyMMddHHmmss } from '@/utils/validate'

const defaultForm = {
  levelStatus: 1,
  levelTitle: '', // 等级名称
  levelXp: 0, // 等级所需经验值
  levelUpReward: 0, // 代理商升级奖励金豆数
  levelCreditCommision: 0, // 代理商充值奖励比例
  levelSigninMultiples: 0, // 签到奖励金豆基数
  levelAlmsBean: 0, // 每日救济金豆数
  levelIndex: 0 // 排序位
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
        levelTitle: [{ validator: validateRequire }],
        levelXp: [{ validator: validateRequire }],
        levelAlmsBean: [{ validator: validateRequire }],
        levelSigninMultiples: [{ validator: validateRequire }],
        levelIndex: [{ validator: validateRequire }],
        levelUpReward: [{ validator: validateRequire }],
        levelCreditCommision: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    levelTitleLength() {
      // 输入的长度监听
      return this.postForm.levelTitle.length
    },
    levelXpLength() {
      // 输入的长度监听
      return this.postForm.levelXp.length
    },
    levelSigninMultiplesLength() {
      return this.postForm.levelSigninMultiples.length
    },
    levelUpRewardLength() {
      return this.postForm.levelUpReward.length
    },
    levelCreditCommisionLength() {
      return this.postForm.levelCreditCommision.length
    }
  },
  created() {
    this.levelId = this.$route.query.levelId
    if (this.levelId > 0) {
      getPlayerLevelDetail(this.levelId).then(response => {
        this.postForm = response.data.module
      }).catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
    fetchData(id) {
      addPlayerLevel(this.postForm).then(response => {
        this.postForm = response.data
        // Just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.levelTitle += `   Article Id:${this.postForm.id}`
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.postForm.registerDate = getDateyyyyMMddHHmmss(new Date())
      if (this.levelId > 0) {
        updPlayerLevel(this.postForm).then(response => {
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
            this.$router.push({ path: '/userList/user-level-list', query: { data: '' }})
          } else {
            console.log(response.data.errorDetail)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        addPlayerLevel(this.postForm).then(response => {
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
            this.$router.push({ path: '/userList/user-level-list', query: { data: '' }})
          } else {
            console.log(response.data.errorDetail)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    draftForm() {
      if (this.postForm.levelTitle.length === 0 ||
        this.postForm.levelXp.length === 0 ||
        this.postForm.levelAlmsBean.length === 0 ||
        this.postForm.levelSigninMultiples.length === 0 ||
        this.postForm.levelIndex.length === 0 ||
        this.postForm.rechargePoint.length === 0 ||
        this.postForm.cashPoint.length === 0 ||
        this.postForm.levelUpReward.length === 0 ||
        this.postForm.levelCreditCommision.length === 0
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
