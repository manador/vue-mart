<!--  -->
<template>
  <div class="cart">
    <CartInfo :data="cart" @add="onAdd" @reduce="onMinus" />
  </div>
</template>

<script>
import CartInfo from "@/components/Cart";
export default {
  components: {
    CartInfo
  },
  data() {
    return {
      cart: []
    };
  },

  methods: {
    onMinus(arg) {
      let { index } = arg;
      if (this.cart[index].count > 1) {
        this.cart[index].count -= 1;
      }
    },
    onAdd(arg) {
      let { index } = arg;
      this.cart[index].count += 1;
    }
  }
};
</script>
<style scoped>
.cart {
  color: #898989;
}
</style>
