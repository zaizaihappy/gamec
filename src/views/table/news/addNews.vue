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
            <el-form-item style="margin-bottom: 40px;" label-width="90px" label="公告标题" prop="newsTitle">
              <el-input :rows="1" v-model="postForm.newsTitle" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
              <span v-show="newsTitleLength" class="word-counter">{{ newsTitleLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="90px" label="公告内容" prop="newsContent">
              <el-input :rows="1" v-model="postForm.newsContent" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
              <span v-show="newsContentLength" class="word-counter">{{ newsContentLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="80px" label="状态">
              <el-radio-group v-model="postForm.newsStatus">
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
import { addNews, getNewsDetail, updNews } from '@/api/article'
import { getDateyyyyMMddHHmmss } from '@/utils/validate'

const defaultForm = {
  newsStatus: 1,
  newsTitle: '', // 代理商名称
  newsContent: '' // 代理商编码
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
        newsTitle: [{ validator: validateRequire }],
        newsContent: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    newsTitleLength() {
      // 内容输入的长度监听
      return this.postForm.newsTitle.length
    },
    newsContentLength() {
      // 内容输入的长度监听
      return this.postForm.newsContent.length
    }
  },
  created() {
    this.newsId = this.$route.query.newsId
    if (this.newsId > 0) {
      getNewsDetail(this.newsId).then(response => {
        this.postForm = response.data.module
      }).catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
    fetchData(id) {
      addNews(this.postForm).then(response => {
        this.postForm = response.data
        // Just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.agentName += `   Article Id:${this.postForm.id}`
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.postForm.newsDate = getDateyyyyMMddHHmmss(new Date())
      if (this.newsId > 0) {
        updNews(this.postForm).then(response => {
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
            this.$router.push({ path: '/newsTable/news-list', query: { data: '' }})
          } else {
            console.log(response.data.errorDetail)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        addNews(this.postForm).then(response => {
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
            this.$router.push({ path: '/newsTable/news-list', query: { data: '' }})
          } else {
            console.log(response.data.errorDetail)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    draftForm() {
      if (this.postForm.newsTitle.length === 0 ||
        this.postForm.newsContent.length === 0
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
