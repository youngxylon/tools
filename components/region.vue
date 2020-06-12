<template>
  <view>
    <picker
      mode="multiSelector"
      :range="regionList"
      range-key="__toString"
      @columnchange="RegionsChange"
      :value="[province, city, area]"
    >
      <view>{{ regionList[0][province] | toString }} {{ regionList[1][city] | toString }} {{ regionList[2][area] | toString }}</view>
    </picker>
  </view>
  <!-- sample!!! <Region :region-id.sync="regionId" :disabled="disabled"></Region> -->
</template>

<script>
import { getRegions } from '../api/api.js'
export default {
  props: { regionId: Number, default: 500 },
  data() {
    return {
      regionList: [[], [], []],
      province: 0,
      city: 0,
      area: 0
    }
  },
  filters: {
    toString(data) {
      if (data) {
        return data.__toString
      }
    }
  },
  watch: {
    regionId() {
      this.getRegionsList()
    }
  },
  mounted() {
    this.getRegionsList()
  },
  methods: {
    RegionsChange(e) {
      let getId = () => {
        this.$emit('regionId', this.regionList[2][this.area].id)
      }
      if (e.detail.column === 0) {
        getRegions({ id: this.regionList[0][e.detail.value].id }).then(res => {
          getRegions({ id: res.data[0].children[0].id }).then(res1 => {
            this.province = e.detail.value
            this.city = 0
            this.area = 0
            this.regionList[1] = res.data[0].children
            this.regionList[2] = res1.data[0].children
            getId()
            this.$forceUpdate()
          })
        })
      } else if (e.detail.column === 1) {
        getRegions({ id: this.regionList[1][e.detail.value].id }).then(res => {
          this.city = e.detail.value
          this.area = 0
          this.regionList[2] = res.data[0].children
          getId()
          this.$forceUpdate()
        })
      } else {
        this.area = e.detail.value
        getId()
        this.$forceUpdate()
      }
    },
    getRegionsList() {
      let id = this.regionId
      getRegions({ id: 1 }).then(res0 => {
        this.regionList[0] = res0.data[0].children
        getRegions({ id: id }).then(res3 => {
          getRegions({ id: res3.data[0].parent.id }).then(res2 => {
            getRegions({ id: res2.data[0].parent.id }).then(res1 => {
              this.province = res0.data[0].children.findIndex(
                e => e.id === res2.data[0].parent.id
              )
              this.city = res1.data[0].children.findIndex(
                e => e.id === res3.data[0].parent.id
              )
              this.area = res2.data[0].children.findIndex(e => e.id === id)
              this.regionList[1] = res1.data[0].children
              this.regionList[2] = res2.data[0].children
              this.$forceUpdate()
              console.log(this.regionList)
            })
          })
        })
      })
    }
  }
}
</script>

<style lang="scss"></style>
