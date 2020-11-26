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
      var id = this.$refs[this.dataVal.id]
      var myChart = this.$echarts.init(id)
      const dataInfo = this.dataVal
      const data = dataInfo.data
      const total = Number(dataInfo.total)
      // const percentageShow = dataInfo.percentageShow == undefined ? 'true' : dataInfo.percentageShow
      const option = {
        graphic: [
          {
            type: 'text',
            left: '21%',
            top: 'center',
            style: {
              text: this.dataVal.total + '\n',
              textAlign: 'center',
              fill: '#db8223',
              fontSize: '16'
            }
          },
          {
            type: 'text',
            left: '18%',
            top: 'center',
            style: {
              text: '\n\n'+this.dataVal.name,
              textAlign: 'center',
              fill: self.echartsColor.fontColor,
              fontSize: '12',
              width: 200,
              height: 200
            }
          }
        ],
        legend: {
          icon: 'circle',
          orient: 'vertical', // 'vertical'
          x: 'left', // 'center' | 'left' | {number},
          y: 'bottom', // 'center' | 'bottom' | {number}
          padding: 5,
          itemGap: 10,
          textStyle: {
            color: self.echartsColor.fontColor,
            fontSize: this.dataVal.fontSize||'14'
          },
        },
        color: ['#82AEFF', '#82AEFF'],
        series: [
          {
            name: 'Line 1',
            type: 'pie',
            hoverAnimation: false, // 取消鼠标滑过动画
            center: ['50%', '35%'],
            radius: ['70%', '85%'],
            // label: this.dataVal.module !== 'businessStream' ? '' : {
            //   normal: {
            //     show: true,
            //     position: 'center',
            //     fontSize: 14,
            //     formatter: '',
            //     rich: {
            //       a: {
            //         color: '#FE8821',
            //         fontSize: '16',
            //         height: 30,
            //       },
            //       b: {
            //         color: '#7C9DBA',
            //         fontSize: '12'
            //       }
            //     },
            //   }
            // },
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                borderWidth: 0,
                borderColor: 'rgba(43, 59, 136, 0.3)'
              }
            },
            data: this.dataVal.data
          }
        ]
      }

      if (this.dataVal.size && this.dataVal.size === 'small') {
        option.series[0].radius = ['53%', '65%']
      }
      if (this.dataVal.position && this.dataVal.position === 'center') {
        option.legend.x = 'center'
        option.series[0].center = this.dataVal.positionVal || ['50%', '35%']
        option.series[0].radius = ['57%', '70%']
        option.graphic[0].left = 'center'
        option.graphic[0].top = '35%'
        option.graphic[1].left = 'center'
        option.graphic[1].top = '35%'
        delete option.legend.orient
      }
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
      if (this.dataVal.type && this.dataVal.type === 'bread') { // 饼状图
        delete option.series[0].radius
        delete option.graphic
        if(this.dataVal.breadRadius) {
          option.series[0].radius = this.dataVal.breadRadius
        }
        option.series[0].center = this.dataVal.positionVal || ['50%', '35%']
        option.series[0].itemStyle.normal = {
          label: {
            show: true,
            position: 'inner',
            formatter: '{d}%',
            color: '#fff'
          }
        }
      } else if (this.dataVal.type && this.dataVal.type === 'huan') {
        option.series[0].itemStyle.normal = {
          label: {
            show: false
          }
        }
        option.series[0].radius = ['57%', '70%']
        option.graphic = [
          {
            type: 'text',
            left: 'center',
            top: '25%',
            style: {
              text: this.dataVal.total === 316971 ? this.dataVal.total : this.dataVal.total + '\n',
              textAlign: 'center',
              fill: '#db8223',
              fontSize: '16'
            }
          },
          {
            type: 'text',
            left: '66%',
            top: '25%',
            style: {
              text: this.dataVal.total === 316971 ? 'h' : '',
              textAlign: 'right',
              textVerticalAlign: 'bottom',
              fill: '#b1c0db',
              fontSize: '15',
            }
          },
          {
            type: 'text',
            left: 'center',
            top: '25%',
            style: {
              text: '\n\n'+this.dataVal.name,
              textAlign: 'center',
              fill: '#82aeff',
              fontSize: '12',
              width: 200,
              height: 200
            }
          }
        ]
      }
      if (this.dataVal.position && this.dataVal.position === 'left') {
        option.legend.x = '50%'
        option.legend.y = 'center'
        if (this.dataVal.left != undefined) {
          option.graphic[0].left = this.dataVal.left
        }
        option.series[0].center = ['25%', '52%']
      }
      // 业务监控 流媒体
      if (this.dataVal.module && this.dataVal.module === 'businessStream') {
        option.series[0].center = ['25%', '40%']
        option.legend.left = '55%'
        option.legend.top = '20%'
        option.series[0].label.normal.formatter = ['{a|' + this.dataVal.total + '}','{b|' + this.dataVal.name + '}'].join('\n')
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
