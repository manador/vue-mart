<!-- 购物车 -->
<template>
  <div class="cart">
    <h2>购物车</h2>
    <table class="data-list">
      <tr>
        <th>商品</th>
        <th>单价</th>
        <th>价格</th>
        <th>总量</th>
        <th>操作</th>
      </tr>
      <tr v-for="(c, index) in cart" :key="index">
        <td>{{ c.title }}</td>
        <td>{{ c.price }}</td>
        <td>{{ c.price * c.count }}</td>
        <td>{{ c.count }}</td>
        <td>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="reduce(index)"
          >
            删除
          </el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="add(index)"
          >
            添加
          </el-button>
        </td>
      </tr>
      <p>总价 {{ total }} 元</p>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  //props: ["data"],
  computed: {
    ...mapState({
      cart: state => state.cart
    }),
    total() {
      return this.cart.reduce((sum, v) => {
        return sum + v.price * v.count;
      }, 0);
    }
  },
  methods: {
    reduce(i) {
      this.$store.commit("cartMinus", i);
      // this.$emit("reduce", { index: i });
    },
    add(i) {
      this.$store.commit("cartAdd", i);
      // this.$emit("add", { index: i });
    }
  }
};
</script>
<style scoped>
.cart {
  text-align: center;
}
.data-list {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}
.data-list th,
.data-list td {
  border: 1px solid #cad9ea;
  color: #666;
  height: 30px;
}
.data-list tr:nth-child(odd) {
  background: #fff;
}
.data-list tr:nth-child(even) {
  background: #f5fafa;
}
</style>
