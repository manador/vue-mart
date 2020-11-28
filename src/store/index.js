import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    cart: JSON.parse(localStorage.getItem("cart")) || []
  },
  mutations: {
    cartMinus(state, index) {
      if (state.cart[index].count > 1) {
        state.cart[index].count -= 1;
      }
    },
    cartAdd(state, index) {
      state.cart[index].count += 1;
    },
    addCart(state, item) {
      let good = state.cart.find(v => v.title == item.title);
      if (good) {
        good.count += 1;
      } else {
        state.cart.push({ ...item, count: 1 });
      }
    }
  },
  getters: {
    cartTotal: state => {
      let sum = 0;
      state.cart.forEach(v => {
        sum += v.count;
      });
      return sum;
    }
  },
  actions: {},
  modules: {}
});

store.subscribe((mutations, state) => {
  localStorage.setItem("cart", JSON.stringify(state.cart));
});

export default store;
