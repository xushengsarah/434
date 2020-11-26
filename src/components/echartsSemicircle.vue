<template>
    <div :id="dataVal.id" :ref="dataVal.id" class="echartsR">
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['dataVal'],
  watch: {
    dataVal: function () {
      this.myEcharts()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.myEcharts()
      window.addEventListener('resize', () => {
        const myChart = this.$echarts.init(document.getElementById(this.dataVal.id))
        myChart.resize()
      })
    })
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var id = this.$refs[this.dataVal.id];
      var myChart = this.$echarts.init(id);

      const data = this.dataVal.data
      let total = 0
      let dataArr = []
      let seriesArr = []
      let colorArr = []
      data.forEach((v, index) => {
        total += v.value
      })
      data.forEach((v, index) => {
        total += v.value
        let percent = ''
        if (this.dataVal.percentageShow == true) {
          percent = v.name + '     ' + v.value + '/' + Math.floor(v.value/total*10000)/100 + "%"
        } else {
          percent = v.name + '     ' + v.value
        }
        dataArr.push(percent)
        colorArr.push(v.color)
        seriesArr.push({
          name: percent,
          type: "pie",
          hoverAnimation: false,
          radius: [80-index*20+'%', 70-index*20+'%'], //环的位置
          center: ['25%', '52%'],
          label: {
            normal: {
              position: "inner"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: v.value, //需要显示的数据
              itemStyle: {
                normal: {
                  color: v.color
                }
              }
            },
            {
              value: total - v.value, //不需要显示的数据，颜色设置成和背景一样
              itemStyle: {
                normal: {
                  color: index===0?"#27386c":'transparent'
                }
              }
            }
          ]
       })
      })
      const option = {
        tooltip: {
          show: false, //防止鼠标移到不需要的数据上弹出label
          trigger: "item",
          formatter: "{a} : {c} ({d}%)"
        },
        color: colorArr,
        legend: {
          icon: 'circle',
          orient: 'vertical',
          x: "50%",
          y: 'center',
          padding: 5,
          itemGap: 10,
          textStyle: { color: '#82AEFF', fontSize: '12' },
          data: dataArr //图例的名字需要和饼图的name一致，才会显示图例
        },
        series: seriesArr
      }
      myChart.setOption(option, true)
    }
  }
}
</script>

<style lang='less' scope>
.echartsR {
  width: 100%;
  height: 100%;
}
</style>
