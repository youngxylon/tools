<template>
  <div style="text-align:center">
    <Flipper v-for="index in counter.length" :ref="`flipper${index}`" :key="index" />
  </div>
</template>
<script>
import Flipper from './Flipper'
export default {
  name: 'FlipNumber',
  components: { Flipper },
  data() {
    return {
      counter: [],
      timer: null,
      flipObjs: []
    }
  },
  mounted() {
    this.init()
    this.run()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    init() {
      this.counter = new Date()
        .valueOf()
        .toString()
        .split('')
      this.$nextTick(() => {
        for (const i in this.$refs) {
          this.flipObjs.push(this.$refs[i])
        }
        for (let i = 0; i < this.flipObjs.length; i++) {
          this.flipObjs[i][0].setFront(this.counter[i])
        }
      })
    },
    run() {
      this.timer = setInterval(() => {
        const counter = new Date()
          .valueOf()
          .toString()
          .split('')
        for (let i = 0; i < this.flipObjs.length; i++) {
          if (counter[i] === this.counter[i]) {
            continue
          }
          this.flipObjs[i][0].flipDown(this.counter[i], counter[i])
        }
        this.counter = counter
      }, 1000)
    }
  }
}
</script>
