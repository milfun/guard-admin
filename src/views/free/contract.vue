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
            <el-input
              v-model="contractFilter.mcNo"
              placeholder="请输入合同编号"
            />
          </div>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>

        <el-form-item label="状态">
          <el-select
            v-model="contractFilter.mcStatus"
            placeholder="请选择状态"
            @change="onSelect"
          >
            <el-option label="全部" value="" />
            <el-option label="未签约" :value="-1" />
            <el-option label="已签约" :value="1" />
            <el-option label="已拒签" :value="2" />
            <el-option label="已保全" :value="3" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mt20" shadow="hover">
      <!-- <div class="flex just-between item-center">
        <div class="flex-1">
          <el-button type="primary" @click="onAdd">
            <i class="el-icon-plus" />新增成员
          </el-button>
        </div>
      </div> -->

      <!-- 列表数据 -->
      <div class="form-list mt20">
        <el-table
          ref="multipleTable"
          :data="contractList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="mmId" label="姓名" width="120">
            <template slot-scope="scope">
              <span
                class="flex-1 pointer text-primary f14 text-center"
                @click="onDetail(scope.row.mmId)"
              >
                {{ scope.row.mcMember.mmName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="mcNo" label="联系方式" width="120">
            <template slot-scope="scope">
              <span>
                {{ scope.row.mcMember.mmMobile }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="mcNo" label="合同编号" width="120" />
          <el-table-column prop="mcDate" label="签约日期" width="120" />
          <el-table-column prop="mcStatus" label="状态">
            <template slot-scope="scope">
              <span>{{ contractStatusData[scope.row.mcStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="pointer f14" @click="onUpdate(scope.row.mcNo)">
                <i class="el-icon-tickets" /> 更新合同
              </span>

              <span class="pointer f14" @click="onDownload(scope.row.mcNo)">
                <i class="el-icon-tickets" /> 下载合同
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="text-right bg-600 p12">
        <el-pagination
          :current-page.sync="contractPage.page"
          :page-size="contractPage.size"
          layout="prev, pager, next, jumper"
          :total="contractPage.total"
          background
          @current-change="onPageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { contractStatusData } from "./staticData.js";
import { downloadContract, updateContract } from "@/api/contract.js";

export default {
  data() {
    return {
      form: {
        user: "",
        region: "",
        isDriver: "0",
        isuser: "0",
      },
      contractStatusData,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["contractList", "contractPage", "contractFilter"]),
  },
  mounted() {
    this.getContractList();
  },
  methods: {
    getContractList() {
      this.loading = true;

      this.$store
        .dispatch("contract/getContractList", {})
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    // 页数改变
    onPageChange(val) {
      this.$store.dispatch("contract/editcontractPage", val).then(() => {
        this.getContractList();
      });
    },
    // 状态筛选
    onSelect() {
      this.getContractList();
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getContractList();
    },
    // 跳转详情页
    onDetail(mmId) {
      this.$router.push({ name: "freeDetail", query: { id: mmId } });
      // console.log(mmId);
    },
    // 更新合同
    onUpdate(mcNo) {
      if (mcNo) {
        updateContract({
          mcNo: mcNo,
        })
          .then((res) => {
            if (res.code == 200) {
              this.$message.info("已更新");
              this.getContractList();
            }
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      } else {
        this.$message.error("mcNo不能为空");
      }
    },
    // 下载合同
    onDownload(mcNo) {
      if (mcNo) {
        downloadContract({
          mcNo: mcNo,
        })
          .then((res) => {
            if (res.code == 200) {
              window.open(res.data);
              this.getContractList();
            }
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      } else {
        this.$message.error("mcNo不能为空");
      }
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
