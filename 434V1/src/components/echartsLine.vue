<template>
    <div :id='chartData.name' :ref="chartData.name" class='echarts'>
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
      this.$nextTick(() => {
        this.myEcharts()
      })
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
    myEcharts () {
      // 基于准备好的dom，初始化echarts实例
      const self = this
      var id = this.$refs[this.chartData.name]
      var myChart = this.$echarts.init(id)
      var nameData = this.chartData.nameArr
      const option = {
        grid: {
          top: '15%',
          right: '1%',
          left: '5%',
          bottom: '12%'
        },
        legend: {
          data: nameData,
          right: '1%',
          textStyle: {
            color: self.echartsColor.fontColor,
            fontSize: 12
          },
          itemWidth: 20,
          itemHeight: 12
        },
        tooltip: {
          trigger: 'axis', // axis , item
          axisPointer: {
            type: 'line', // 'line' | 'cross' | 'shadow' | 'none
            lineStyle: {
              color: '#c9caca',
              width: 1,
              type: 'dotted'
            }
          },
          x: 'left',
          textStyle: {
            fontSize: 12
          }
        },
        xAxis: {
          data: this.chartData.nameList,
          // 坐标轴
          axisLine: {
            lineStyle: {
              color: '#82aeff80'
            }
          },
          // 坐标值标注
          axisLabel: {
            show: true,
            textStyle: {
              color: self.echartsColor.fontColor,
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
              color: self.echartsColor.fontColor,
            }
          },
          // 分格线
          splitLine: {
            lineStyle: {
              color: '#566381'
            }
          }
        },
      }

      if (this.chartData.type === 'one-line') {
        option.series = [
          {
            name: nameData[0],
            type: 'line',
            stack: nameData[0],
            symbol: 'circle',
            symbolSize: 6,
            smooth:true,
            itemStyle: {
              normal: {
                color: '#0092f6',
                lineStyle: {
                  color: '#0092f6',
                  width: 1
                }
              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            },
            data: this.chartData.data1,
          }
        ]
        option.grid =  {
          top: '15%',
          right: '1%',
          left: '10%',
          bottom: '12%'
        }
      } else if (this.chartData.type === 'one-line-alarm') {
        option.series = [
          {
            name: nameData[0],
            type: 'line',
            stack: nameData[0],
            symbol: 'circle',
            symbolSize: 6,
            smooth:true,
            itemStyle: {
              normal: {
                color: '#0092f6',
                lineStyle: {
                  color: '#0092f6',
                  width: 1
                }
              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            },
            data: this.chartData.data1,
            markLine: {
              symbol: 'none',
              data: [
                {
                  name: '平均线',
                  type: 'average'
                }
              ],
              label: {
                distance: [10, 8]
              },
              lineStyle: {
                color: 'red'
              }
            }
          }
        ]
        option.grid =  {
          top: '15%',
          right: '1%',
          left: '10%',
          bottom: '12%'
        }
        // option.visualMap = {
        //   show: false,
        //   dimension: 0,
        //   top: 10,
        //   right: 10,
        //   pieces: [{
        //     gte: 0,
        //     lte: 1,
        //     color: '#096'
        //   } ],
        //   outOfRange: {
        //     color: 'green'
        //   }
        // }
      } else {
        option.series = [
          {
            name: nameData[0],
            type: 'line',
            stack: nameData[0],
            symbol: 'circle',
            symbolSize: 6,
            smooth:true,
            itemStyle: {
              normal: {
                color: '#0092f6',
                lineStyle: {
                  color: '#0092f6',
                  width: 1
                }
              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            },
            data: this.chartData.data1
          },
          {
            name: nameData[1],
            type: 'line',
            stack: nameData[1],
            symbol: 'circle',
            symbolSize: 6,
            smooth:true,
            itemStyle: {
              normal: {
                color: '#00d4c7',
                lineStyle: {
                  color: '#00d4c7',
                  width: 1
                }
              }
            },
            data: this.chartData.data2
          }
        ]
        if (this.chartData.xLeft) {
          option.grid =  {
            top: '15%',
            right: '1%',
            left: '10%',
            bottom: '12%'
          }
        }
      }

      if (this.chartData.color || this.chartData.type === 'one-line' || this.chartData.type === 'one-line-alarm') {
        option.series[0].itemStyle.normal.color = this.chartData.color[0]
        option.series[0].itemStyle.normal.lineStyle.color = this.chartData.color[0]
      } 
      if (this.chartData.type !== 'one-line' && this.chartData.type !== 'one-line-alarm') {
        option.series[1].itemStyle.normal.color = this.chartData.color[1]
        option.series[1].itemStyle.normal.lineStyle.color = this.chartData.color[1]
      }

      if(this.chartData.position){
        option.grid = this.chartData.position;
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style lang='less' scope>
.echarts {
  width: 100%;
  height: 100%;
  color: rgb(37, 91, 185);
  div {
    height: 100%;
  }
}
</style>
