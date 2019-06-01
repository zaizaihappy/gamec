<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索框 -->
      <el-input v-model="listQuery.playerCode" placeholder="请输入玩家编码" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.mobile" placeholder="请输入玩家手机号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.nickName" placeholder="请输入玩家昵称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('userMaTable.search') }}</el-button>
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
      <el-table-column label="序号" prop="id" sortable="custom" align="center" width="110">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="玩家昵称" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.memberNickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="玩家编码" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.memberCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.memberMobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金豆数量" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.beanCounts }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="beansDetail(scope.row,1)">查看明细</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getPlayerBeanList } from '@/api/article'
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
        playerCode: '',
        mobile: '',
        nickName: '',
        sort: '+id'
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
      // 获取列表数据  getPlayerBeanList：方法名      this.listQuery：查询条件    response：相应数据
      getPlayerBeanList(this.listQuery).then(response => {
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
    beansDetail(row, type) {
      this.$router.push({ path: '/beanDetailTable/beanDetail', query: { type: type, name: row.memberNickname, code: row.memberCode }})
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['玩家昵称', '玩家编码', '真是名字', '手机号', '金豆数量']
        const filterVal = ['memberNickname', 'memberCode', 'userName', 'memberMobile', 'beanCounts']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '玩家金豆表格数据'
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
