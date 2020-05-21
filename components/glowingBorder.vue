<template>
  <div class="body">
    <div style="z-index:9">
      <div class="box">
        <div class="content">
          <h1>活着</h1>
          <h3>（余华著长篇小说）</h3>
          <p>《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.body {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #060c21;
}
.box {
  position: relative;
  width: 300px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #060c21;
}
.box:before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: #fff;
  z-index: -1;
}
.box:after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: #fff;
  z-index: -2;
  filter: blur(40px);
}
.box:before,
.box:after {
  background: linear-gradient(235deg, #89ff00, #060c21, #00bcd4);
}
.content {
  padding: 20px;
  box-sizing: border-box;
  color: #ffffff;
}
h1 {
  margin: 0px;
  padding: 0px;
}
h3 {
  margin: 15px auto 0px;
  padding: 0px;
}
p {
  text-indent: 2em;
}
</style>
