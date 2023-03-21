<template>
  <div class="app-container">
    <!-- 筛选表单 -->
    <el-card shadow="hover">
      <el-form
        v-loading="loading"
        :inline="true"
        :model="form"
        class="demo-form-inline flex"
      >
        <el-form-item>
          <div class="flex">
            <el-input v-model="menuFilter.smName" placeholder="请输入角色名" />
          </div>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>

        <el-form-item label="证书状态">
          <el-select
            v-model="menuFilter.smStatus"
            placeholder="请选择状态"
            @change="onSelect"
          >
            <el-option label="全部" value="" />
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="2" />
            <el-option label="删除" :value="3" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mt20" shadow="hover">
      <div class="flex just-between item-center">
        <div class="flex-1">
          <el-button type="primary" @click="onAdd">
            <i class="el-icon-plus" />新增菜单
          </el-button>
        </div>
      </div>

      <!-- 列表数据 -->
      <div class="form-list mt20">
        <el-table
          ref="multipleTable"
          :data="menuList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="smId" label="ID" width="120" />
          <el-table-column prop="smPid" label="父ID" width="120" />
          <el-table-column prop="smName" label="名称" width="120" />
          <el-table-column prop="smPath" label="路径" width="120" />
          <el-table-column prop="smComponent" label="组件" width="120" />
          <el-table-column prop="smType" label="类型" width="120" />
          <el-table-column prop="smTitle" label="标题" width="120" />
          <el-table-column prop="smIcon" label="图标" width="120" />
          <el-table-column prop="smRedirect" label="重定向" width="120" />
          <el-table-column prop="smHidden" label="隐藏" />
          <!-- <el-table-column prop="smEnd" label="期限" /> -->
          <el-table-column prop="smStatus" label="状态">
            <template slot-scope="scope">
              <span>{{ statusData[scope.row.smStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="pointer f14" @click="onEdit(scope.row)">
                <i class="el-icon-tickets" /> 编辑
              </span>
              <span class="pointer f14" @click="onAdjust(scope.row)">
                <i class="el-icon-tickets" /> 审核
              </span>
              <span class="pointer f14" @click="onDelete(scope.row)">
                <i class="el-icon-tickets" /> 删除
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="text-right bg-600 p12">
        <el-pagination
          :current-page.sync="menuPage.page"
          :page-size="menuPage.size"
          layout="prev, pager, next, jumper"
          :total="menuPage.total"
          background
          @current-change="onPageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddMenu from "./component/AddMenu.vue";
import AdjustMenu from "./component/AdjustMenu.vue";
import { systemDelMenu } from "@/api/system";

const menuData = ["", "普通管理员", "超级管理员"];
const statusData = ["", "正常", "禁用", "删除"];

export default {
  data() {
    return {
      form: {
        user: "",
        region: "",
        isDriver: "0",
        ismenu: "0",
      },
      menuData,
      statusData,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["menuList", "menuPage", "menuFilter"]),
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      this.loading = true;

      this.$store
        .dispatch("system/getMenuList", {})
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    // 页数改变
    onPageChange(val) {
      // console.log(`当前页: ${val}`);
      this.$store.dispatch("system/editMenuPage", val).then(() => {
        this.getMenuList();
      });
    },
    // 状态筛选
    onSelect() {
      this.getMenuList();
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getMenuList();
    },
    // 新增管理
    onAdd() {
      this.$drawer.open({
        title: "新增菜单",
        width: "50%",
        component: AddMenu,
        value: { mode: "add" },
        callback: (res) => {
          if (res.smId) {
            this.getMenuList();
          }
        },
      });
    },
    // 新增管理
    onEdit(item) {
      this.$drawer.open({
        title: "编辑菜单",
        width: "50%",
        component: AddMenu,
        value: { ...item, mode: "edit" },
        callback: (res) => {
          if (res.smId) {
            this.getMenuList();
          }
        },
      });
    },
    onAdjust(item) {
      this.$modal.open({
        title: "审核菜单",
        width: "50%",
        component: AdjustMenu,
        value: { ...item },
        callback: (res) => {
          if (res.smId) {
            this.getMenuList();
          }
        },
      });
    },
    // 删除
    onDelete(item) {
      if (!item.smId) {
        return this.$message.info("smId不能为空");
      }

      this.$confirm("删除后，数据将无法回复，是否确认删除？")
        .then((_) => {
          systemDelMenu({
            smId: item.smId,
          })
            .then((res) => {
              this.$message.info("删除成功");
              this.getMenuList();
            })
            .catch((err) => {
              this.$message.info(err.message);
            });
        })
        .catch((_) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.tags {
  display: inline-block;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #555;
  line-height: 18px;
  padding: 6px 15px;
  border-radius: 2px;
  cursor: pointer;
  &.cur {
    background: #ffe300;
    color: #212121;
    font-weight: 700;
  }
}
.footer {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: right;
  color: #212121;
}
</style>
