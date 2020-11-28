<template>
  <div class="home">
    <!-- <h1>Home</h1> -->
    <el-row>
      <el-col :span="6" v-for="item in goods" :key="item.id">
        <el-card>
          <img :src="item.img" class="image" alt="无法加载图片" />
          <div style="padding:14px;">
            <span>{{ item.title }}</span>
            <el-button type="text" class="button">
              <i class="el-icon-circle-plus" @click="addCart($event, item)"></i>
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="ball-wrap">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div class="ball" v-show="ball.show">
          <div class="inner">
            <i class="el-icon-circle-plus"></i>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      goods: [],
      ball: {
        show: false,
        el: null
      }
    };
  },
  async created() {
    let ret = await axios.get("/api/goods");
    this.goods = ret.data.data;
    console.log(ret);
  },
  methods: {
    addCart(e, item) {
      this.ball.el = e.target;
      this.ball.show = true;
      this.$store.commit("addCart", item);
    },
    beforeEnter(el) {
      //小球移过来
      let dom = this.ball.el;
      let rect = dom.getBoundingClientRect();
      let x = window.innerWidth - rect.left - 80;
      let y = rect.top - 30;

      el.style.display = "block";
      el.style.transform = `translate3d(0, ${y}px, 0)`;

      let inner = el.querySelector(".inner");
      // console.log(inner);
      console.log("x" + x);
      console.log("y" + y);
      inner.style.transform = `translate3d(-${x}px, ${y}px, 0)`;
    },
    enter(el, done) {
      // 触发重绘
      document.body.offsetHeight;
      // this._offset = document.body.offsetHeight;

      el.style.transform = `translate3d(0, 0, 0)`;

      let inner = el.querySelector(".inner");
      inner.style.transform = `translate3d(0, 0, 0)`;

      //过渡完成后执行的事件
      el.addEventListener("transitionend", done);
    },
    afterEnter(el) {
      this.ball.show = false;
      el.style.display = "none";
    }
  }
};
</script>
<style>
.ball-wrap .ball {
  position: fixed;
  right: 50px;
  top: 25px;
  z-index: 200;
  color: red;
  transition: all 0.5s cubic-berzier(0.49, -0.29, 0.75, 0.41);
  /* transition: all 1s linear; */
}
.ball-wrap .ball .inner {
  width: 16px;
  height: 16px;
  transition: all 0.5s linear;
}
</style>
