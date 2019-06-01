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
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="商品名称" prop="goodsName">
              <el-input :rows="1" v-model="postForm.goodsName" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
              <span v-show="goodsNameLength" class="word-counter">{{ goodsNameLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="奖品描述" prop="goodsDesc">
              <el-input :rows="1" v-model="postForm.goodsDesc" type="textarea" class="article-textarea" autosize placeholder="请输入奖品描述"/>
              <span v-show="goodsDescLength" class="word-counter">{{ goodsDescLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="奖品图片地址" prop="goodsImgUrl">
              <el-input :rows="1" v-model="postForm.goodsImgUrl" type="textarea" class="article-textarea" autosize placeholder="请输入奖品图片地址"/>
              <span v-show="goodsImgUrlLength" class="word-counter">{{ goodsImgUrlLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="价格" prop="goodsPrice">
              <el-input :rows="1" v-model="postForm.goodsPrice" type="number" class="article-textarea" autosize placeholder="请输入内容"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="奖品所需金豆数" prop="goodsBeans">
              <el-input :rows="1" v-model="postForm.goodsBeans" type="number" class="article-textarea" autosize placeholder="请输入奖品所需金豆数"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="奖品数量" prop="goodsAmount">
              <el-input :rows="1" v-model="postForm.goodsAmount" type="number" class="article-textarea" autosize placeholder="请输入奖品数量"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="P0级用户所需金豆数" prop="p0Beans">
              <el-input :rows="1" v-model="postForm.p0Beans" type="number" class="article-textarea" autosize placeholder="请输入"/>
              <span v-show="p0BeansLength" class="word-counter">{{ p0BeansLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="P1级用户所需金豆数" prop="p1Beans">
              <el-input :rows="1" v-model="postForm.p1Beans" type="number" class="article-textarea" autosize placeholder="请输入"/>
              <span v-show="p1BeansLength" class="word-counter">{{ p1BeansLength }}字</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="P2级用户所需金豆数" prop="p2Beans">
              <el-input :rows="1" v-model="postForm.p2Beans" type="number" class="article-textarea" autosize placeholder="请输入"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="P3级用户所需金豆数" prop="p3Beans">
              <el-input :rows="1" v-model="postForm.p3Beans" type="number" class="article-textarea" autosize placeholder="请输入"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="P4级用户所需金豆数" prop="p4Beans">
              <el-input :rows="1" v-model="postForm.p4Beans" type="number" class="article-textarea" autosize placeholder="请输入"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="P5级用户所需金豆数" prop="p5Beans">
              <el-input :rows="1" v-model="postForm.p5Beans" type="number" class="article-textarea" autosize placeholder="请输入"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="P6级用户所需金豆数" prop="p6Beans">
              <el-input :rows="1" v-model="postForm.p6Beans" type="number" class="article-textarea" autosize placeholder="请输入"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="P7级用户所需金豆数" prop="p7Beans">
              <el-input :rows="1" v-model="postForm.p7Beans" type="number" class="article-textarea" autosize placeholder="请输入"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="奖品类型">
              <el-radio-group v-model="postForm.goodsType">
                <el-radio :label="1">电子卡</el-radio>
                <el-radio :label="2">其他</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="是否为推荐奖品">
              <el-radio-group v-model="postForm.recommend">
                <el-radio :label="1">推荐</el-radio>
                <el-radio :label="0">不推荐</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label-width="150px" label="状态">
              <el-radio-group v-model="postForm.goodsStatus">
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
import { addGoods, getGoodsDetail, updGoods } from '@/api/article'
import { getDateyyyyMMddHHmmss } from '@/utils/validate'

const defaultForm = {
  goodsName: '', // 商品名称
  goodsPrice: 0.00, // 商品价格
  goodsImgUrl: '', // 奖品图片地址
  goodsBeans: 0, // 奖品所需金豆数
  goodsAmount: 0, // 奖品数量
  goodsDesc: '', // 奖品描述
  p0Beans: 0, // P0级用户所需金豆数
  p1Beans: 0, // P1级用户所需金豆数
  p2Beans: 0, // P2级用户所需金豆数
  p3Beans: 0, // P3级用户所需金豆数
  p4Beans: 0, // P4级用户所需金豆数
  p5Beans: 0, // P5级用户所需金豆数
  p6Beans: 0, // P6级用户所需金豆数
  p7Beans: 0, // P0级用户所需金豆数
  goodsType: 1, // 奖品类型
  recommend: 1, // 是否为推荐奖品
  goodsStatus: 1 // 状态
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
        goodsName: [{ validator: validateRequire }],
        goodsPrice: [{ validator: validateRequire }],
        goodsBeans: [{ validator: validateRequire }],
        goodsAmount: [{ validator: validateRequire }],
        goodsDesc: [{ validator: validateRequire }],
        goodsImgUrl: [{ validator: validateRequire }],
        p0Beans: [{ validator: validateRequire }],
        p1Beans: [{ validator: validateRequire }],
        p2Beans: [{ validator: validateRequire }],
        p3Beans: [{ validator: validateRequire }],
        p4Beans: [{ validator: validateRequire }],
        p5Beans: [{ validator: validateRequire }],
        p6Beans: [{ validator: validateRequire }],
        p7Beans: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    goodsNameLength() {
      // 输入的长度监听
      return this.postForm.goodsName.length
    },
    goodsDescLength() {
      return this.postForm.goodsDesc.length
    },
    goodsImgUrlLength() {
      return this.postForm.goodsImgUrl.length
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId
    if (this.goodsId > 0) {
      getGoodsDetail(this.goodsId).then(response => {
        this.postForm = response.data.module
      }).catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
    submitForm() {
      this.postForm.registerDate = getDateyyyyMMddHHmmss(new Date())
      if (this.goodsId > 0) {
        updGoods(this.postForm).then(response => {
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
            this.$router.push({ path: '/goodsTable/goods-list', query: { data: '' }})
          } else {
            console.log(response.data.errorDetail)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        addGoods(this.postForm).then(response => {
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
            this.$router.push({ path: '/goodsTable/goods-list', query: { data: '' }})
          } else {
            console.log(response.data.errorDetail)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    draftForm() {
      if (this.postForm.goodsName.length === 0 ||
        this.postForm.goodsPrice.length === 0 ||
        this.postForm.p2Beans.length === 0 ||
        this.postForm.p3Beans.length === 0 ||
        this.postForm.p4Beans.length === 0 ||
        this.postForm.p5Beans.length === 0 ||
        this.postForm.registerDate.length === 0 ||
        this.postForm.goodsDesc.length === 0 ||
        this.postForm.p1Beans.length === 0 ||
        this.postForm.p0Beans.length === 0 ||
        this.postForm.goodsBeans.length === 0 ||
        this.postForm.goodsAmount.length === 0
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
