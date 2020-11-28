<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu mode="horizontal">
          <el-menu-item index="1">
            <h1 class="logo">管理后台</h1>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/" style="text-decoration: none;">
              首页
            </router-link>
          </el-menu-item>
          <el-menu-item index="3" style="float:right;">
            <router-link to="/cart">
              <el-badge :value="cartTotal">
                <i class="el-icon-shopping-cart-1"></i>
              </el-badge>
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <!-- 切换内容的渲染 -->
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { mapGetters } from "vuex";
Vue.use(ElementUI);
export default {
  computed: {
    ...mapGetters({
      cartTotal: "cartTotal"
    })
  }
};
</script>

<style>
.logo {
  color: #666;
  height: 26px;
  line-height: 26px;
}
.image {
  width: 100%;
}
.el-badge__content.is-fixed {
  top: 12px;
}
</style>
