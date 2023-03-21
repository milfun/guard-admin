<template>
  <div class="dashboard-container">WelCome {{ user.name }}!</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    //  "avatar"
    ...mapGetters(["user"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.grid-item {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px 0;
  &.grid-item {
    border-left: 1px solid #f6f6f8;
  }
}
</style>
