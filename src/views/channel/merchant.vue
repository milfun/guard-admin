<template>
  <div class="app-container">
    <!-- 筛选表单 -->
    <el-card shadow="hover">
      <el-form :inline="true" :model="form" class="flex">
        <el-form-item label="商户名称">
          <div class="flex">
            <el-input
              v-model="merchantFilter.mcName"
              placeholder="请输入申请编号"
              style="width: 120px"
            />
          </div>
        </el-form-item>
        <!-- <el-form-item label="商户编号">
          <div class="flex">
            <el-input
              v-model="merchantFilter.mcId"
              placeholder="请输入证书编号"
            />
          </div>
        </el-form-item> -->
        <el-form-item label="社会统一信用代码">
          <div class="flex">
            <el-input
              v-model="merchantFilter.mcCode"
              placeholder="请输入社会统一信用代码"
              style="width: 120px"
            />
          </div>
        </el-form-item>
        <el-form-item label="选择日期" prop="tsStart">
          <el-date-picker
            type="date"
            placeholder="开始日期"
            v-model="merchantFilter.mcStart"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
            style="width: 150px"
          ></el-date-picker>
          <span class="mx10">-</span>
          <el-date-picker
            type="date"
            placeholder="截止日期"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
            style="width: 150px"
            v-model="merchantFilter.mcEnd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选表单 -->
    <el-card class="mt20" shadow="hover">
      <div
        class="flex just-between item-center"
        v-permission="'adminAddMerchant'"
      >
        <div class="flex-1">
          <el-button type="primary" @click="onAddMerchant">
            <i class="el-icon-plus" />新增商户
          </el-button>
        </div>
      </div>

      <!-- 列表数据 -->
      <div class="form-list mt10">
        <el-table
          ref="multipleTable"
          :data="merchantList"
          tooltip-effect="dark"
          border
          style="width: 100%"
        >
          <el-table-column prop="mcName" label="商户">
            <template slot-scope="scope">
              <span
                class="flex-1 pointer text-primary f14 text-center"
                @click="onMerchant(scope.row.mcId)"
              >
                {{ scope.row.mcName }}
              </span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="mcCode" label="社会统一信用代码" /> -->
          <!-- <el-table-column label="服务商">
            <template slot-scope="scope">
              <span class="flex-1 pointer f14 text-center">
                {{ scope.row.mcCompany.cmName }}
              </span>
            </template>
          </el-table-column> -->
          <el-table-column prop="mcContractName" label="联系人" />
          <el-table-column prop="mcContractMobile" label="联系人手机号" />
          <!-- <el-table-column prop="mcStatus" label="状态">
            <template slot-scope="scope">
              <span
                v-if="scope.row.mcStatus == 9"
                class="flex-1 pointer f14 text-center text-red"
              >
                禁用
              </span>
              <span v-else class="flex-1 pointer f14 text-center">
                {{ statusData[scope.row.mcStatus] }}
              </span>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="flex item-center">
                <el-button
                  type="primary"
                  size="mini"
                  @click="onDetail(scope.row.mcId)"
                >
                  查看数据
                </el-button>
                <el-button size="mini" @click="onDelete(scope.row)">
                  <i class="el-icon-delete text-red" />
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="text-right bg-600 p12">
        <el-pagination
          :current-page.sync="merchantPage.page"
          :page-size="merchantPage.size"
          layout="prev, pager, next, jumper"
          :total="merchantPage.total"
          background
          @current-change="onPageChange"
        />
      </div>
    </el-card>
    <!-- 弹窗 -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddMerchant from "./components/AddMerchant.vue";
import MerchantDetail from "./components/MerchantDetail.vue";
import { merchantDelete } from "@/api/merchant";

export default {
  components: {
    // AddCertificateModal,
  },
  data() {
    return {
      form: {
        user: "",
        region: "",
        isDriver: "0",
        isAdmin: "0",
      },
      statusData: ["", "待审核", "正常", "驳回修改"],
    };
  },
  computed: {
    ...mapGetters(["merchantList", "merchantPage", "merchantFilter"]),
  },
  mounted() {
    this.getMerchantList();
  },
  methods: {
    // 获取列表
    getMerchantList() {
      this.$store.dispatch("merchant/getMerchantList", {});
    },
    // 页数改变
    onPageChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.dispatch("merchant/editMerchantPage", val).then(() => {
        this.getMerchantList();
      });
    },
    // 查询数据
    onSearch() {
      this.getMerchantList();
    },
    // 跳转详情页
    onMerchant(mcId) {
      this.$router.push({ name: "merchantDetail", query: { id: mcId } });
    },
    // 查看商户数据
    onDetail(mcId) {
      this.$router.push({ name: "channelPay", query: { id: mcId } });
      // this.$drawer.open({
      //   width: "600px",
      //   title: "商户数据",
      //   component: MerchantDetail,
      //   value: item,
      //   callback: (res) => {
      //     this.getMerchantList();
      //   },
      // });
    },
    // 删除商户
    onDelete(item) {
      // return console.log(item);
      if (!item.mcId) {
        return this.$message.info("mcId不能为空");
      }
      this.$confirm("删除后，数据将无法回复，是否确认删除？")
        .then((_) => {
          merchantDelete({
            mcId: item.mcId,
          })
            .then((res) => {
              this.$message.info("删除成功");
              this.getMerchantList();
            })
            .catch((err) => {
              this.$message.info(err.message);
            });
        })
        .catch((_) => {});
    },
    // 状态筛选
    onSelect() {
      this.getMerchantList();
    },
    // 新增商户账号
    onAddMerchant() {
      this.$drawer.open({
        width: "500px",
        title: "新增商户账号",
        component: AddMerchant,
        callback: (res) => {
          this.getMerchantList();
        },
      });
    },
  },
};
</script>

<style scoped>
.form-list {
  text-align: center;
}
.footer {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: right;
  color: #212121;
}
</style>
