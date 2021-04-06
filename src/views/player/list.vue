<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.accountName"
        :placeholder="$t('player.accountName')"
        style="width: 200px"
        @keyup.enter.native="handleFilter"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">{{
        $t("player.btnFilter")
      }}</el-button>
      <el-button type="success" icon="el-icon-edit" @click="handleCreate">
        {{ $t("player.btnCreate") }}</el-button
      >
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="ID" align="center">
        <template v-slot="{row}">
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template v-slot="{row}">
          {{ row.accountName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <router-link :to="'/players/edit/' + scope.row.id">
            <el-button type="primary" icon="el-icon-edit">
              更新
            </el-button>
          </router-link>
          <el-button type="danger" @click="handleDelete(scope)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="listQuery.page"
      :page-sizes="[20, 40, 80, 100]"
      :page-size="listQuery.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    >
      :pager-count="7">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getPlayers, deletePlayer } from '@/api/players'
import { Palyer } from '../../api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'PlayerList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  // 玩家列表数据
  list: Palyer[] = [];
  // 加载状态
  listLoading = true;
  // 总条数
  total = 0;
  // 查询参数
  listQuery = {
    page: 1, // 默认第一页
    limit: 10, // 每页数量
    accountName: undefined
  };

  created() {
    // 获取列表数据
    this.getList()
  }

  async getList() {
    this.listLoading = true
    const { data } = await getPlayers(this.listQuery)
    console.log(data)
    this.list = data.players
    this.total = data.total
    this.listLoading = false
  }

  handleSizeChange(val: any) {
    console.log(`每页 ${val} 条`)
    this.listQuery.limit = val
    this.getList()
  }

  handleCurrentChange(val: any) {
    console.log(`当前页: ${val}`)
    this.listQuery.page = val
    this.getList()
  }

  handleFilter = () => {
    // 重置页码
    this.listQuery.page = 1
    this.getList()
  };

  handleCreate = () => {
    this.$router.push('/players/create')
  };

  handleDelete(scope: any) {
    const { $index, row } = scope
    this.$confirm('确定删除玩家信息?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async() => {
        await deletePlayer(row.id)
        this.list.splice($index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>

<style scoped></style>
