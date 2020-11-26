<template>
    <div :id="chartData.name" :ref="chartData.name" class="echarts">
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
  props: ['chartData'],
  data () {
    return {}
  },
  watch: {
    'chartData.time': function () {
      this.myEcharts()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.myEcharts()
      window.addEventListener('resize', () => {
        const myChart = this.$echarts.init(document.getElementById(this.chartData.name))
        myChart.resize()
      })
    })
  },
  methods: {
    myEcharts() {
      const self = this
      // 基于准备好的dom，初始化echarts实例
      var id = this.$refs[this.chartData.name]
      var myChart = this.$echarts.init(id)

      const option = {
        grid: {
          top: '10%',
          right: '1%',
          left: '5%',
          bottom: '12%'
        },
        legend: {
          data: [],
          right: '1%',
          textStyle: {
            color: self.echartsColor.fontColor,
            fontSize: 12
          },
          itemWidth: 20,
          itemHeight: 12
          // borderWidth: 2,
          // borderColor: '#00ffff',
          // barBorderRadius: 3,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          textStyle: {
            fontSize: 12
          }
        },
        xAxis: {
          data: this.chartData.nameList,
          // 坐标轴
          axisLine: {
            lineStyle: {
              color: '#566381'
            }
          },
          // 坐标值标注
          axisLabel: {
            show: true,
            textStyle: {
              color: self.echartsColor.fontColor
            }
          }
        },
        yAxis: {
          // 坐标轴
          axisLine: {
            show: false
          },
          // 坐标值标注
          axisLabel: {
            show: true,
            formatter: '{value}',
            textStyle: {
              color: self.echartsColor.fontColor
            }
          },
          // 分格线
          splitLine: {
            lineStyle: {
              color: '#566381'
            }
          }
        },
        series: [
          {
            name: '视频监控',
            type: 'bar',
            barWidth: 16,
            barGap: '50%',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#3893e5' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#00ffff' // 100% 处的颜色
                }], false)
              }
            },
            data: this.chartData.data
          }
        ]
      }
      const optionY = {
        grid: {
          top: '0',
          bottom: '8%',
          left: '13%',
          right: '5%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          textStyle: {
            fontSize: 12
          }
        },
        xAxis: {
          show: true,                //是否显示x轴
          splitLine: {
            lineStyle: {
              color: 'rgb(43, 49, 56)'
            }
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: {
                default: "dashed",
              },
              color: "#86B4DC"
            }
          },
          axisLabel: {
            show: true,
            fontWeight: 'lighter',
            textStyle: {
              color: self.echartsColor.fontColor
            }
          },
        },
        yAxis: {
          type: 'category',
          inverse: true,               //让y轴数据逆向
          axisLabel: {
            show: true,
            textStyle: {
              color: self.echartsColor.fontColor,   //y轴字体颜色
              fontSize: 12
            },
            //定义富文本标签
            rich: {
              lg: {
                fontWeight: 'bold',
                fontSize: 12,       //字体默认12
                color: self.echartsColor.fontColor,
                padding: [0, 5, 0, 0]
              },
              title: {
                color: self.echartsColor.fontColor,
                fontWeight: 'lighter'
              }
            }
          },
          splitLine: { show: false },   //横向的线
          axisTick: { show: false },    //y轴的端点
          axisLine: { show: false },    //y轴的线
          data: this.chartData.nameList
        },
        series: [{
          // name: '数据内框',
          name: '',
          type: 'bar',
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0 , 1, 0, [{
                offset: 0,
                color: this.chartData.color[0] // 0% 处的颜色
              }, {
                offset: 1,
                color: this.chartData.color[1] // 100% 处的颜色
              }], false)
            }
          },
          barWidth: 6,
          data: this.chartData.data
        }]
      };

      if (this.chartData.type && this.chartData.type == "bar-border") {
        option.series[0].itemStyle = {
          normal: {
            color: "rgba(225,225,225,0.2)",
            borderWidth: 2,
            borderColor: "#00ffff",
            barBorderRadius: 3
          }
        }
        if (this.chartData.color) {
          option.series[0].itemStyle.normal.borderColor = this.chartData.color[0]
        }
      } else if (this.chartData.type && this.chartData.type == "bar" && this.chartData.color) {
        option.series[0].itemStyle.normal.color = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: this.chartData.color[0] // 0% 处的颜色
          }, {
            offset: 1,
            color: this.chartData.color[1] // 100% 处的颜色
          }], false)
      }

      // 使用刚指定的配置项和数据显示图表。
      if(this.chartData.type == "bar-Y") {
        myChart.setOption(optionY)
      } else {
        myChart.setOption(option)
      }
    }
  }
}
</script>

<style lang='less' scope>
.echarts {
  width: 100%;
  height: 100%;
  color: rgb(37, 91, 185);
}
</style>
