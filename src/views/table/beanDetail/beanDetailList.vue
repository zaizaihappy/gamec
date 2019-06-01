<template>
  <div class="app-container">
    <div class="filter-container">
      <span style="font-weight: bold">用户类型：{{ typeName }}</span>
      <!-- 搜索框 -->
      <el-date-picker v-model="listQuery.beginDate" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间"/>
      <el-date-picker v-model="listQuery.endDate" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择结束时间"/>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('userMaTable.search') }}</el-button>
      <!-- 导出按钮 -->
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('userMaTable.export') }}</el-button>
      <!-- 返回按钮 -->
      <el-button v-waves class="filter-item" type="danger" @click="backParentPage">返回上级</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column label="序号" prop="id" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.agentName != ''" style="color: #13ce66;">{{ scope.row.agentName }}</span>
          <span v-if="scope.row.playerName != ''" style="color: #13ce66;">{{ scope.row.playerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编码" align="center" width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.agentCode != ''" style="color: #13ce66;">{{ scope.row.agentCode }}</span>
          <span v-if="scope.row.playerCode != ''" style="color: #13ce66;">{{ scope.row.playerCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金豆数量" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.beanCounts }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recordDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.infoType === 1" style="color: #13ce66;">代理商上分</span>
          <span v-if="scope.row.infoType === 2" style="color: #a94442;">代理商下分</span>
          <span v-if="scope.row.infoType === 3" style="color: #a94442;">代理商给玩家上分扣减</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getAgentBeanDetail, getPlayerBeanDetail } from '@/api/article'
import { getDateyyyyMMddHHmmss } from '@/utils/validate'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      type: '-1',
      listQuery: {
        pageNo: 1,
        pageSize: 20,
        importance: undefined,
        code: '',
        beginDate: '',
        endDate: '',
        beanCounts: -1,
        sort: '+id'
      },
      typeName: '无',
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.type = this.$route.query.type
      this.listLoading = true
      if (this.type !== -1) {
        if (this.listQuery.beginDate) {
          this.listQuery.beginDate = getDateyyyyMMddHHmmss(this.listQuery.beginDate)
        } else {
          this.listQuery.beginDate = '1990-01-01 01:01:01'
        }
        if (this.listQuery.endDate) {
          this.listQuery.endDate = getDateyyyyMMddHHmmss(this.listQuery.endDate)
        } else {
          this.listQuery.endDate = getDateyyyyMMddHHmmss(new Date())
        }
      }
      if (this.type === 0) {
        this.typeName = '代理商'
        this.listQuery.agentCode = this.$route.query.code
        getAgentBeanDetail(this.listQuery).then(response => {
          if (response.data.success) {
            this.list = response.data.module
            this.total = response.data.record
          } else {
            console.log(response.data.success)
          }
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else if (this.type === 1) {
        this.typeName = '玩家'
        this.listQuery.playerCode = this.$route.query.code
        getPlayerBeanDetail(this.listQuery).then(response => {
          if (response.data.success) {
            this.list = response.data.module
            this.total = response.data.record
          } else {
            console.log(response.data.success)
          }
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else {
        this.listLoading = false
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    backParentPage() { // 返回按钮
      window.history.go(-1)
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['代理商名称', '代理商手机号', '金豆数量']
        const filterVal = ['agentName', 'mobile', 'beanCounts']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '代理商金豆表格数据'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
