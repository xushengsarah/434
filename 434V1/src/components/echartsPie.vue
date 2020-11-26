<template>
    <div :id="dataVal.id" :ref="dataVal.id" class="echartsR">
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      echartsColor: "echartsColor",
    }),
  },
  data () {
    return {
      data: 80
    }
  },
  props: ['dataVal'],
  watch: {
    "dataVal.time": function (val) {
      this.$nextTick(() => {
        this.myEcharts()
      })
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
    myEcharts () {
      // 基于准备好的dom，初始化echarts实例
      const self = this
      var id = self.$refs[self.dataVal.id]
      var myChart = self.$echarts.init(id)
      const dataInfo = self.dataVal
      const data = dataInfo.data
      const total = Number(dataInfo.total)
      let labelFormatter1 = ['{a|' + self.dataVal.total + '}','{b|' + self.dataVal.name + '}'].join('\n')
      let labelFormatter2 = ['{a|' + self.dataVal.total + '}{c|h}','{b|' + self.dataVal.name + '}'].join('\n')
      const option = {
        legend: {
          icon: 'circle',
          orient: self.dataVal.legendOrient || 'vertical', // 'vertical'
          x: self.dataVal.x || 'left', // 图例的水平位置 'center' | 'left' | {number},
          y: self.dataVal.y ||'bottom', // 图例的垂直位置 'center' | 'bottom' | {number}
          padding: 5,
          itemGap: 10,
          textStyle: {
            color: self.echartsColor.fontColor,
            fontSize: self.dataVal.fontSize||'14'
          },
        },
        color: ['#82AEFF', '#82AEFF'],
        series: [
          {
            name: 'Line 1',
            type: 'pie',
            hoverAnimation: false, // 取消鼠标滑过动画
            center: self.dataVal.center || ['50%', '35%'],
            radius: self.dataVal.radius || ['70%', '85%'],
            label: self.dataVal.type !== 'huan' ? {} : {
              normal: {
                show: true,
                position: 'center',
                fontSize: 14,
                formatter: self.dataVal.labelFormatter ==='unite' ? labelFormatter2 : labelFormatter1,
                rich: {
                  a: {
                    color: '#FE8821',
                    fontSize: '16',
                    height: 30,
                  },
                  b: {
                    color: '#7C9DBA',
                    fontSize: '12'
                  },
                  c: {
                    color: '#82aeff',
                    fontSize: '12'
                  },
                },
              }
            },
            itemStyle: { // 每个图例对应的模块 不显示标志线及标志
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                borderWidth: 0,
              }
            },
            data: self.dataVal.data
          }
        ]
      }
       // 饼状图
      if (this.dataVal.type && this.dataVal.type === 'pie') {
        option.series[0].itemStyle.normal = {
          label: {
            show: true,
            position: 'inner',
            formatter: '{d}%',
            color: '#fff'
          }
        }
      }
      
      // 暂时不用 图例文字
      if (this.dataVal.totalShow && this.dataVal.totalShow === true) {
        option.legend.formatter = function (name) {
          let target
          for (let i = 0; i < data.length; i++) {
            if (data[i].name === name) {
              target = data[i].value
            }
          }
          return name + '  ' + target
        }
      }

      // 使用刚指定的配置项和数据显示图表。
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
