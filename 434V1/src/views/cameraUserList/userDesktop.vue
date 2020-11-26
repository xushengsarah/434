<template>
  <div class="userDesktop">
    <div class="wrap-video">
      <img src="@/assets/img/windows2.png" alt="">
      <!-- <img :src="require('@/assets/img/' + imgUrl + '.png')" alt=""> -->
    </div>
    <div class="wrap-operate">
      <div class="contentwrap">
        <div class="video-but">
          <a-row :gutter="8" type="flex" align="middle">
            <a-col :span="1">
              <img src="@/assets/img/ic_vedio play_dark.png">
            </a-col>
            <a-col :span="1">
              <img src="@/assets/img/ic_vedio stop_dark.png">
            </a-col>
            <a-col :span="12">
              <img src="@/assets/img/ic_before day_dark.png">
              <a-date-picker @change="dateCheckedChange()">
              </a-date-picker>
              <img src="@/assets/img/ic_next day_dark.png">
              <a-button type="primary" icon="search" style="margin-left: 2rem"></a-button>
            </a-col>
            <a-col :span="10">
              <div class="tag-box">
                <a-row type="flex" justify="end" align="middle">
                  <a-col :span='4'>
                    <span style="background-color: #00C48C"></span>
                    <p>调用</p>
                  </a-col>
                  <a-col :span='4'>
                    <span style="background-color: #82AEFF"></span>
                    <p>未调用</p>
                  </a-col>
                </a-row>
              </div>
            </a-col>
          </a-row>
        </div>
        <div class="video-slider" id="video-slider">
          <a-slider v-model="colCountKey"
            :step="0.001"
            :min="0"
            :max="Object.keys(colCounts).length - 1"
            :marks="colCounts"
            :tip-formatter="formatter"
            @change="handleChange">
          </a-slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userDesktopType'],
  data () {
    const colCounts = {}
    const colCountsArr = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
      '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
    colCountsArr.forEach((item, index) => {
      colCounts[index] = item
    })
    return {
      confirmLoading: false,
      colCounts,
      colCountKey: '',
    }
  },
  created () {
    this.getScale()
  },
  methods: {
    init () {
      const self = this
    },
    formatter(value) {
      const self = this
      let value00 = (new Date("2020/01/01 00:00:00")).getTime();
      let value24 = (new Date("2020/01/01 24:00:00")).getTime();
      let length = value24 - value00 // 计算一天的时间戳大小
      let size = length * (value / 24) // 通过滑块移动的百分比计算移动时间
      let data = self.$common.timeVideoToTime(value00 + size).time
      return `${data}`
    },
    getScale() {
      this.$nextTick(() => {
        let _html = `<div class="ant-slider-scale">
          <span class="ant-slider-scale-dot" style="left: 2%; width: 1rem"></span>
          <span class="ant-slider-scale-dot" style="left: 5%; width: .1rem"></span>
          <span class="ant-slider-scale-dot" style="left: 30%; width: 8rem"></span>
          <span class="ant-slider-scale-dot" style="left: 60%; width: .3rem"></span>
          <span class="ant-slider-scale-dot" style="left: 90%; width: 4rem"></span>
        </div>`
        $('#video-slider .ant-slider').find('.ant-slider-track').after(_html)
      })
    },
    handleChange(value) {
      console.log(value)
    }
  },
}
</script>

<style lang="scss">
.userDesktop {
  position: relative;
  .wrap-video {
    height: 86%;
    .video-player {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .wrap-operate {
    height: 14%;
    .contentwrap {
      padding: .6rem 1.2rem .6rem 1.2rem;
      width: 100%;
      height: 100%;
      background: $theme-background-bottom;
      overflow: auto;
      .video-but {
        .icon-group {
          font-size: 1.5rem;
          color: #82AEEF;
          text-align: center;
          .anticon{
            cursor: pointer;
            padding: .4rem .8rem;
          }
        }
        .numberInp {
          width: 5rem;
        }
        img {
          display: inline-block;
          margin-bottom: .2rem
        }
      }
      // 时间轴样式
      .video-slider {
        .ant-slider-scale {
          position: absolute;
          width: 100%;
          height: 8px;
          .ant-slider-scale-dot {
            position: absolute;
            width: 1rem;
            height: 100%;
            margin: 0;
            padding: 0;
            background: #00C48C;
          }
        }
        .ant-slider-rail {
          height: 8px;
          background-color:#82AEEF;
          border-radius: 0;
        }
        .ant-slider-track {
          height: 8px;
          background-color: #0987d6;
          border-radius: 0;
        }
        .ant-slider-step {
          height: 8px;
          .ant-slider-dot {
            height: .3rem;
            font-size: 0;
            margin: 0;
            padding: 0;
            top: .8rem;
            width: 0;
            border: .5px solid #82AEEF;
            border-radius: 0;
          }
        }
        .ant-slider-handle {
          margin-top: -3px;
        }
        .ant-slider-mark {
          top: 1.5rem;
          .ant-slider-mark-text {
            color: #82AEEF;
            font-size: 0.8rem;
          }
        }
      }
    }
  }

  .tag-box {
    padding: 0 1rem;
    margin-bottom: .5rem;
    span {
      display: inline-block;
      width: $font-size-small;
      height: $font-size-small;
      background-color: $theme-button;
      margin-right: .3rem;
    }
    .anticon  {
      margin-right: .3rem;
      color: $theme-font;
    }
    p {
      display: inline-block;
      font-size: $font-size-small;
      line-height: $font-size-x-large;
      height: $font-size-x-large;
      color: $theme-font;
    }
  }
}
</style>
