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
        <el-form-item label="渠道名称">
          <div class="flex">
            <el-input
              v-model="channelFilter.cmName"
              placeholder="请输入渠道名称"
            />
          </div>
        </el-form-item>
        <el-form-item label="渠道Id">
          <div class="flex">
            <el-input v-model="channelFilter.cmId" placeholder="请输入渠道ID" />
          </div>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>

        <el-form-item label="状态">
          <el-select
            v-model="channelFilter.cmStatus"
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
      <!-- 表头按钮 -->
      <div class="">
        <el-button
          v-permission="'AddNextChannelData'"
          type="primary"
          @click="onAdd"
          >新增渠道</el-button
        >
      </div>
      <!-- 列表数据 -->
      <div class="form-list mt20" v-if="channelList.length > 0">
        <el-table
          ref="multipleTable"
          :data="channelList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="cmId" label="ID" width="80" />
          <el-table-column prop="cmPid" label="PID" width="80" />
          <el-table-column prop="cmName" label="名称">
            <template slot-scope="scope">
              <!-- @click="onDetail(scope.row.cmId)" -->
              <span class="flex-1 pointer f14 text-center">
                {{ scope.row.cmName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="cmKey" label="Key" width="120" />
          <el-table-column prop="cmMobile" label="手机号" />

          <el-table-column prop="cmStatus" label="状态">
            <template slot-scope="scope">
              <span>{{ statusData[scope.row.cmStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popover trigger="click">
                <span class="pointer" slot="reference">
                  <i class="el-icon-setting f20"></i>
                </span>
                <div class="flex flex-col">
                  <div
                    v-permission="'EditChannelData'"
                    class="pointer f14 py10 border-bottom text-primary"
                    @click="onEdit(scope.row)"
                  >
                    <i class="el-icon-document-checked mr8"></i>编辑
                  </div>
                  <div
                    v-permission="'DeleteChannelData'"
                    class="pointer f14 py10 border-bottom text-red"
                    @click="onDelete(scope.row)"
                  >
                    <i class="el-icon-document mr8"></i>删除
                  </div>
                  <div
                    v-permission="'ChangeChannelPwd'"
                    class="pointer f14 py10 border-bottom"
                    @click="onChangePwd(scope.row)"
                  >
                    <i class="el-icon-document mr8"></i>修改密码
                  </div>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 空数据 -->
      <el-empty :image-size="100" v-else>
        <el-button
          type="primary"
          v-permission="'AddNextChannelData'"
          @click="onAdd"
          >添加下级渠道
        </el-button>
      </el-empty>

      <!-- 分页数据 -->
      <div class="text-right bg-600 p12">
        <el-pagination
          :current-page.sync="channelPage.page"
          :page-size="channelPage.size"
          layout="prev, pager, next, jumper"
          :total="channelPage.total"
          background
          @current-change="onPageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddChannel from "./components/AddChannel.vue";
import { channelDelete } from "@/api/channel.js";
import EditPassword from "./components/EditPassword.vue";

const statusData = ["", "正常", "封禁", "删除"];

export default {
  data() {
    return {
      form: {
        user: "",
        region: "",
        isDriver: "0",
        isuser: "0",
      },
      statusData,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["channelList", "channelPage", "channelFilter"]),
  },
  mounted() {
    this.getChannelList();
  },
  methods: {
    // 获取列表数据
    getChannelList() {
      this.loading = true;

      this.$store
        .dispatch("channel/getChannelList", {})
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    // 页数改变
    onPageChange(val) {
      this.$store.dispatch("channel/editchannelPage", val).then(() => {
        this.getChannelList();
      });
    },
    // 状态筛选
    onSelect() {
      this.getChannelList();
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getChannelList();
    },
    /// 添加渠道
    onAdd() {
      this.$drawer.open({
        title: "新增渠道",
        width: "50%",
        component: AddChannel,
        value: { mode: "add", cmRole: 5 },
        callback: (res) => {
          this.getChannelList();
        },
      });
    },
    // 编辑渠道
    onEdit(item) {
      this.$drawer.open({
        title: "编辑渠道",
        width: "50%",
        component: AddChannel,
        value: { ...item, mode: "edit" },
        callback: (res) => {
          this.getChannelList();
        },
      });
    },
    // 删除渠道
    onDelete(item) {
      if (!item.cmId) {
        return this.$message.error("渠道号不存在");
      }
      this.$confirm("删除后，数据将无法恢复，是否确认删除？")
        .then((_) => {
          channelDelete({
            cmId: item.cmId,
          }).then((res) => {
            this.$message.info("删除成功");
            this.getChannelList();
          });
          done();
        })
        .catch((_) => {});
    },
    // 修改密码
    onChangePwd(item) {
      this.$modal.open({
        title: "修改密码",
        width: "50%",
        component: EditPassword,
        value: { ...item, mode: "edit" },
        callback: (res) => {
          this.getChannelList();
        },
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
