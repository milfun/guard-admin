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
            <el-input v-model="userFilter.mmName" placeholder="请输入用户名" />
          </div>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>

        <el-form-item label="状态">
          <el-select
            v-model="userFilter.mmStatus"
            placeholder="请选择状态"
            @change="onSelect"
          >
            <el-option label="全部" value="" />
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="9" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mt20" shadow="hover">
      <div class="flex just-between item-center">
        <div class="flex-1">
          <el-button
            v-permission="'exportFreeUser'"
            type="primary"
            @click="onExport"
          >
            <i class="el-icon-plus" />导出数据
          </el-button>
        </div>
      </div>

      <!-- 列表数据 -->
      <div class="form-list mt20">
        <el-table
          ref="multipleTable"
          :data="userList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="mmName" label="姓名" width="120">
            <template slot-scope="scope">
              <span
                class="flex-1 pointer text-primary f14 text-center"
                @click="onDetail(scope.row.mmId)"
              >
                {{ scope.row.mmName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="mmMobile" label="手机号码" width="120" />
          <el-table-column prop="mmCard" label="证件Id" width="120" />
          <el-table-column prop="mmBank" label="银行Id" width="120" />
          <el-table-column prop="mmContract" label="合同Id" />
          <!-- <el-table-column prop="smRole" label="角色">
            <template slot-scope="scope">
              <span class="bg-100 radius text-600 f12 p4-10">{{
                roleData[scope.row.smRole]
              }}</span>
            </template>
          </el-table-column> -->
          <!-- <el-table-column prop="smEnd" label="期限" /> -->
          <el-table-column prop="mmStep" label="步骤">
            <template slot-scope="scope">
              <span class="text-green" v-if="scope.row.mmStep == 99"
                >已完成</span
              >
              <span v-else>{{ stepData[scope.row.mmStep] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mmStatus" label="状态">
            <template slot-scope="scope">
              <span class="text-red" v-if="scope.row.mmStatus == 9"
                >已封禁</span
              >

              <span v-else>{{ ["待审核", "正常"][scope.row.mmStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="pointer f14" @click="onAdjust(scope.row)">
                <i class="el-icon-tickets" /> 修改状态
              </span>

              <span
                v-permission="'DelFreeUser'"
                class="pointer f14"
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
          :current-page.sync="userPage.page"
          :page-size="userPage.size"
          layout="prev, pager, next, jumper"
          :total="userPage.total"
          background
          @current-change="onPageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ExportUser from "./components/ExportUser.vue";
import AdjustUser from "./components/AdjustUser.vue";
import AddUser from "./components/AddUser.vue";
import { stepData, statusData } from "./staticData.js";
import { userDelete } from "@/api/user.js";

export default {
  data() {
    return {
      form: {
        user: "",
        region: "",
        isDriver: "0",
        isuser: "0",
      },
      stepData,
      statusData,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["userList", "userPage", "userFilter"]),
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.loading = true;

      this.$store
        .dispatch("user/getUserList", {})
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    // 页数改变
    onPageChange(val) {
      // console.log(`当前页: ${val}`);
      this.$store.dispatch("user/editUserPage", val).then(() => {
        this.getUserList();
      });
    },
    // 状态筛选
    onSelect() {
      this.getUserList();
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getUserList();
    },
    // 跳转详情页
    onDetail(mmId) {
      this.$router.push({ name: "freeDetail", query: { id: mmId } });
      console.log(mmId);
      // this.$drawer.open({
      //   width: "50%",
      //   component: UserDetailModal,

      //   value: { mmId },
      //   callback: (res) => {
      //     if (res.mmId) {
      //       this.getUserList();
      //     }
      //   },
      // });
    },
    // 新增管理
    onEdit(item) {
      this.$drawer.open({
        title: "编辑成员",
        width: "50%",
        component: AddUser,
        value: { ...item, mode: "edit" },
        callback: (res) => {
          this.getUserList();
        },
      });
    },
    onAdjust(item) {
      this.$modal.open({
        title: "审核成员",
        width: "50%",
        component: AdjustUser,
        value: item,
        callback: (res) => {
          this.getUserList();
        },
      });
    },
    // 删除
    onDelete(item) {
      // return console.log(item);
      if (!item.mmId) {
        return this.$message.info("mmId不能为空");
      }
      this.$confirm("删除后，数据将无法回复，是否确认删除？")
        .then((_) => {
          userDelete({
            mmId: item.mmId,
          })
            .then((res) => {
              this.$message.info("删除成功");
              this.getUserList();
            })
            .catch((err) => {
              this.$message.info(err.message);
            });
        })
        .catch((_) => {});
    },
    // 导出数据
    onExport() {
      this.$modal.open({
        title: "导出成员",
        width: "50%",
        component: ExportUser,
      });
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
.el-dialog__body {
  padding: 0 !important;
}
</style>
