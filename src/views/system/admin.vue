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
            <el-input v-model="adminFilter.smName" placeholder="请输入用户名" />
          </div>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>

        <el-form-item label="证书状态">
          <el-select
            v-model="adminFilter.smStatus"
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
            <i class="el-icon-plus" />新增管理
          </el-button>
        </div>
      </div>

      <!-- 列表数据 -->
      <div class="form-list mt20">
        <el-table
          ref="multipleTable"
          :data="adminList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="smId" label="ID" width="120" />
          <el-table-column prop="smName" label="姓名" width="120" />
          <el-table-column prop="smMobile" label="手机" />
          <el-table-column prop="smRole" label="角色">
            <template slot-scope="scope">
              <span class="">{{ scope.row.smRoles.srName }}</span>
            </template>
          </el-table-column>
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
              <span
                v-permission="'editAdminPassword'"
                class="pointer f14"
                @click="onPassword(scope.row)"
              >
                <i class="el-icon-tickets" /> 改密
              </span>
              <span
                v-permission="'deleteAdmin'"
                class="pointer f14 text-red"
                @click="onDelete(scope.row)"
              >
                <i class="el-icon-tickets" /> 删除
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="text-right bg-600 p12">
        <el-pagination
          :current-page.sync="adminPage.page"
          :page-size="adminPage.size"
          layout="prev, pager, next, jumper"
          :total="adminPage.total"
          background
          @current-change="onPageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddAdmin from "./component/AddAdmin.vue";
import AdjustAdmin from "./component/AdjustAdmin.vue";
import EditAdminPwd from "./component/EditAdminPwd.vue";

import { systemDelAdmin } from "@/api/system";

const roleData = ["", "普通管理员", "超级管理员"];
const statusData = ["", "正常", "禁用", "删除"];

export default {
  data() {
    return {
      form: {
        user: "",
        region: "",
        isDriver: "0",
        isAdmin: "0",
      },
      roleData,
      statusData,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["adminList", "adminPage", "adminFilter"]),
  },
  mounted() {
    this.getAdminList();
  },
  methods: {
    getAdminList() {
      this.loading = true;

      this.$store
        .dispatch("admin/getAdminList", {})
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    // 页数改变
    onPageChange(val) {
      // console.log(`当前页: ${val}`);
      this.$store.dispatch("admin/editAdminPage", val).then(() => {
        this.getAdminList();
      });
    },
    // 状态筛选
    onSelect() {
      this.getAdminList();
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getAdminList();
    },
    // 新增管理
    onAdd() {
      this.$drawer.open({
        title: "新增管理员",
        width: "50%",
        component: AddAdmin,
        value: { mode: "add" },
        callback: (res) => {
          if (res.smId) {
            this.getAdminList();
          }
        },
      });
    },
    // 新增管理
    onEdit(item) {
      this.$drawer.open({
        title: "编辑管理员",
        width: "50%",
        component: AddAdmin,
        value: { ...item, mode: "edit" },
        callback: (res) => {
          if (res.smId) {
            this.getAdminList();
          }
        },
      });
    },
    onAdjust(item) {
      this.$modal.open({
        title: "审核管理员",
        width: "50%",
        component: AdjustAdmin,
        value: { ...item },
        callback: (res) => {
          if (res.smId) {
            this.getAdminList();
          }
        },
      });
    },
    // 修改管理员密码
    onPassword(item) {
      this.$modal.open({
        title: "修改密码",
        width: "50%",
        component: EditAdminPwd,
        value: { ...item },
        callback: (res) => {
          this.getAdminList();
        },
      });
    },

    // 删除
    onDelete(item) {
      // return console.log(item);
      if (!item.smId) {
        return this.$message.info("smId不能为空");
      }
      this.$confirm("删除后，数据将无法回复，是否确认删除？")
        .then((_) => {
          systemDelAdmin({
            smId: item.smId,
          })
            .then((res) => {
              this.$message.info("删除成功");
              this.getAdminList();
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
