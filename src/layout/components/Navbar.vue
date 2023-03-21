<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="mr20" v-permission="'merchantInviteQrcode'">
        <span class="pointer f14 text-200" @click="onQrcode">
          <i class="el-icon-medal-1"></i> 生成邀请码</span
        >
      </div>

      <el-dropdown class="right-btn" trigger="click">
        <el-tooltip
          class="item"
          effect="dark"
          content="商户钱包"
          placement="bottom"
        >
          <div class="" v-permission="'merchantBalancePage'">
            <i class="el-icon-bank-card"></i>
          </div>
        </el-tooltip>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item
            divided
            v-permission="'merchantBalancePage'"
            @click.native="onWallet"
          >
            <span style="display: block">钱包</span>
          </el-dropdown-item>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown class="avatar-container" trigger="click">
        <el-tooltip
          class="item"
          effect="dark"
          :content="user.name"
          placement="bottom"
        >
          <div class="avatar-wrapper">
            <img
              :src="avatar + '?imageView2/1/w/80/h/80'"
              class="user-avatar"
            />
            <i class="el-icon-caret-bottom" />
          </div>
        </el-tooltip>

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="changePwd">
            <span style="display: block">修改密码</span>
          </el-dropdown-item>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import QrcodeModal from "./QrcodeModal.vue";
import avatar from "@/assets/avatar.gif";
import { merchantInviteQrcode } from "@/api/merchant.js";
import ChangePassword from "./ChangePassword.vue";
import storage from "store";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      avatar,
      activeIndex: "1",
    };
  },
  computed: {
    //  "avatar"
    ...mapGetters(["sidebar", "user"]),
  },
  mounted() {
    // this.toggleSideBar();
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      const { user } = this;
      await this.$store.dispatch("user/logout");
      // location.reload();
      // let user = storage.get("user");
      if (user.hasOwnProperty("mcId")) {
        this.$router.push(`/mclogin?redirect=${this.$route.fullPath}`);
      } else if (user.hasOwnProperty("cmKey")) {
        this.$router.push(`/cnlogin?redirect=${this.$route.fullPath}`);
      } else {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      }
    },
    // 生成小程序二维码
    onQrcode() {
      merchantInviteQrcode()
        .then((res) => {
          if (res.code == 200) {
            this.$modal.open({
              title: "小程序邀请码",
              width: "50%",
              component: QrcodeModal,
              maskClosable: false,
              value: { url: res.data },
            });
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 修改密码
    changePwd() {
      this.$modal.open({
        title: "修改密码",
        width: "60%",
        component: ChangePassword,
        callback: () => {
          this.logout();
        },
      });
    },
    // 钱包
    onWallet() {
      // query: { id: mcId }
      this.$router.push({ name: "merchantWallet" });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    // justify-content: center;
    float: right;
    height: 100%;
    // line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.right-btn {
  padding: 0 16px;
  margin-right: 20px;
  font-size: 20px;
}
.right-txt {
  line-height: 50px;
}
</style>
