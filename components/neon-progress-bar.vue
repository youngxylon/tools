<template>
  <view class="progress">
    <view class="progress-bar" :style="{ height: height + '%' }"></view>
  </view>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
.progress {
  height: 800rpx;
  width: 200rpx;
  position: relative;
  z-index: 5;
  background: #484848;
  border: 20rpx solid #282828;
  border-radius: 20rpx;
  display: inline-block;
  box-shadow: 0 5rpx 17rpx rgba(40, 40, 40, 0.5),
    0 0 3rpx 1rpx rgba(40, 40, 40, 0.5) inset;
}
.progress-bar {
  overflow: hidden;
  position: absolute;
  z-index: 10;
  border-radius: 12rpx;
  height: 0;
  width: 100%;
  bottom: 0;
  transition: height 3s ease 1s;
}

.progress-bar {
  background-color: #ffffff;
  box-shadow: 0 0 20rpx #01fe32 inset, 0 0 30rpx #08ff35, 0 0 40rpx #08ff35,
    0 0 30rpx #08ff35;
  animation: pulse 2s linear infinite;
}
@keyframes pulse {
  50% {
    box-shadow: 0 0 10rpx #01fe32 inset, 0 0 15rpx #08ff35, 0 0 20rpx #08ff35,
      0 0 15rpx #08ff35;
  }
}
</style>
