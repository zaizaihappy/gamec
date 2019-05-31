<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索框 -->
      <el-input :placeholder="$t('userMaTable.title')" v-model="listQuery.agentName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('userMaTable.search') }}</el-button>
      <!-- 添加按钮 -->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('userMaTable.add') }}</el-button>
      <!-- 导出按钮 -->
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('userMaTable.export') }}</el-button>

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
      <el-table-column label="序号" prop="id" sortable="custom" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理商名称" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.agentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理商编码" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agentCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理商登录账号" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agentAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理商登录密码" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agentPassword }}</span>
        </template>
      </el-table-column>
      <el-table-column label="QQ" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.qq }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理商手机号" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="充值返点" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rechargePoint }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现返点" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cashPoint }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.agentStatus === 1" style="color: #13ce66;">
            有效<el-button type="primary" size="mini" @click="handleModifyStatus(scope.row,0,scope.$index)">停用</el-button>
          </span>
          <span v-if="scope.row.agentStatus === 0" style="color: #a94442;">
            停用<el-button type="primary" size="mini" @click="handleModifyStatus(scope.row,1,scope.$index)">开启</el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userMaTable.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.agentId)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,-1,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getAgentList, updAgentStatus } from '@/api/article'
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
      listQuery: {
        pageNo: 1,
        pageSize: 20,
        importance: undefined,
        agentName: '',
        type: undefined,
        sort: '+id'
      },
      json: {
        agentId: 0,
        agentStatus: 0
      },
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
      this.listLoading = true
      // 获取列表数据  getAgentList：方法名      this.listQuery：查询条件    response：相应数据
      getAgentList(this.listQuery).then(response => {
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
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status, index) {
      this.json.agentId = row.agentId
      this.json.agentStatus = status
      updAgentStatus(this.json).then(response => {
        if (response.data.success) {
          if (status === -1) {
            this.list.splice(index, 1)
          }
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          row.agentStatus = status
        }
      }).catch(err => {
        console.log(err)
      })
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
    handleCreate() {
      this.$router.push('/agentUserList/agent-add')
    },
    handleUpdate(agentId) {
      this.$router.push({ path: '/agentUserList/agent-add', query: { agentId: agentId }})
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['代理商名称', '代理商编码', '代理商账户', '代理商QQ', '代理商手机', '充值返点', '提现返点', '代理商状态']
        const filterVal = ['agentName', 'agentCode', 'agentAccount', 'qq', 'mobile', 'rechargePoint', 'cashPoint', 'agentStatus']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '代理商表格数据'
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
