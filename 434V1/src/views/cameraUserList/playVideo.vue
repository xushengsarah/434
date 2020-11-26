<template>
  <div class="playVideo">
    <a-spin :spinning="confirmLoading">
      <div class="wrap-video" id="video-warp">
        <!-- <video id="mapVideo" class="video-js" controls preload="auto">
          <source :src="flvUrl" type="rtmp/flv" />
          <p class="vjs-no-js">不支持播放</p>
        </video> -->
      </div>
      <div class="wrap-operate" v-show="videoData.type == 'playback'">
        <div class="contentwrap">
          <div class="video-but">
            <a-row :gutter="8" type="flex" align="middle">
              <a-col :span="1">
                <img src="@/assets/img/ic_vedio play_dark.png" @click="startPlayVideoClick">
              </a-col>
              <a-col :span="1">
                <img src="@/assets/img/ic_vedio stop_dark.png" @click="stopPlayVideoClick">
              </a-col>
              <a-col :span="12">
                <img src="@/assets/img/ic_before day_dark.png" @click="prevTimeClick" style="margin: 0 .5rem">
                <a-date-picker v-model="curDateValue" :format="dateFormat" :disabled-date="disabledDate" @change="dateCheckedChange">
                </a-date-picker>
                <img src="@/assets/img/ic_next day_dark.png" @click="nextTimeClick" style="margin: 0 .5rem">
                <a-button type="primary" icon="search" style="margin-left: 2rem" @click="timeSearchClick"></a-button>
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
            <a-slider v-model="curDataTime"
              :step="0.001"
              :min="0"
              :max="Object.keys(colCounts).length - 1"
              :marks="colCounts"
              :tip-formatter="formatter"
              @beforeChange="timeSliderhandleChange"
              @afterChange="timeSliderhandleAfterChange">
            </a-slider>
          </div>
        </div>
      </div>
      <div class="wrap-face" v-show="videoData.type == 'playback'">
        <div class="wrap-face-title">人脸抓拍图
          <a-pagination size="small"
            show-size-changer
            show-quick-jumper
            v-model="snapFaceCurPage"
            :total="snapFaceTotalNumb"
            :hide-on-single-page="true"
            :page-size-options="['12','24','36','48']"
            :page-size="snapFaceSize"
            @change="handleShowPageChange"
            @showSizeChange="handleShowSizeChange">
          </a-pagination>
        </div>
        <div class="wrap-face-content">
          <ul class="wrap-face-box">
            <li class="wrap-face-item"
              v-for="(item) in snapFaceArr"
              :key="item.picId"
              :label="item.name"
              :value="item.picId">
              <div class="wrap-face-img">
                <img :src="item.smallPicUrl">
              </div>
              <div class="wrap-face-new">
                <p class="wrap-face-new-text">{{item.captureTime}}</p>
              </div>
            </li>
          </ul>
          <div class="wrap-face-result">
            <a-icon type="warning"></a-icon>
            <div>暂无返回数据</div>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      loginName: "loginName",
    }),
  },
  props: ['videoData'],
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

      dateFormat: 'YYYY-MM-DD',
      curDateValue: '', // 当前选中时间
      curDataTime: '', // 已播放时间
      startTime: '', // 时间戳格式
      endTime: '', // 时间戳格式

      mapVideo: '',  // 播放器实例
      flvUrl: '', // 视频流地址
      sessionid: '', // 视频sessionid
      nextFlvUrl: '',
      nextSessionid: '',
      countError: 1, // 错误请求次数
      playType: 'realplay', // 播放类型: 实时视频realplay 历史视频playback
      heartbeat: [],  // 心跳请求定时器 历史视频为防止多个视频请求设置为数组

      flag60: true, // 播放59分钟预请求下一个视频
      stopVideo: false,
      dropProgress: false,  // 是否拖动进度条标志

      snapFaceArr: '',  // 抓拍图数据
      snapFaceCurPage: 1,
      snapFaceTotalNumb: 1,
      snapFaceSize: 36,
      snapFaceResState: '暂无返回结果',
    }
  },
  created () {
    this.timeSliderUserInvoke()
  },
  methods: {
    moment,
    // 时间可选限制
    disabledDate(current) {
      return current > moment()
    },
    // 视频播放初始化
    initCurrentData() {
      const self = this
      self.confirmLoading = true
      self.playType = self.videoData.type
      if (self.playType == 'playback') {
        self.curDateValue = self.$common.timeVideoToTime((new Date()).getTime()).date
        self.startTime = (new Date(self.curDateValue + ' 00:00:00')).getTime()
        self.endTime = (new Date(self.curDateValue + ' 00:00:00')).getTime() + 60 * 60 * 1000
      }
      self.getMapVideoPlay(true, self.startTime, self.endTime)
      self.getSnapshotData()
      return self.curDateValue;
    },
    // 时间轴下标(历史专用)
    formatter(value) {
      const self = this
      let value00 = (new Date('2020-01-01 00:00:00')).getTime();
      let value24 = (new Date('2020-01-01 24:00:00')).getTime();
      let length = value24 - value00 // 计算一天的时间戳大小
      let size = length * (value / 24) // 通过滑块移动的百分比计算移动时间
      let data = self.$common.timeVideoToTime(value00 + size).time
      return `${data}`
    },
    // 时间轴获取用户调用情况(历史专用)
    timeSliderUserInvoke() {
      const self = this
      self.$nextTick(() => {
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
    // 时间轴拖动(历史专用)
    timeSliderhandleChange() {
      const self = this
      self.dropProgress = true
    },
    // 时间轴拖动(历史专用)
    timeSliderhandleAfterChange(value) {
      const self = this
      self.dropProgress = false
      let dateTime1h = 60 * 60 * 1000
      let size = (dateTime1h * 24) * (value / 24)

      if(((new Date(self.curDateValue + ' 00:00:00')).getTime() + size) > (new Date()).getTime()) {
        self.$message.error('选择时间已超过当前时间，无视频记录')
      } else {
        self.curDataTime = value
        // 重新开始请求一段视频(1h)
        self.startTime = (new Date(self.curDateValue + ' 00:00:00')).getTime() + size
        self.endTime = (new Date(self.curDateValue + ' 00:00:00')).getTime() + size + dateTime1h
        self.stopMapVideoPlay(true)
        self.getMapVideoPlay(true, self.startTime, self.endTime)
      }
    },
    // 日期选择前一天(历史专用)
    prevTimeClick() {
      const self = this
      let dateVal = self.curDateValue
      let oneDay = 1000*60*60*24
      self.curDateValue = self.$common.timeVideoToTime((new Date(dateVal)).getTime() - oneDay).date
    },
    // 日期选择后一天(历史专用)
    nextTimeClick() {
      const self = this
      let dateVal = self.curDateValue
      let oneDay = 1000*60*60*24
      self.curDateValue = self.$common.timeVideoToTime((new Date(dateVal)).getTime() + oneDay).date
    },
    // 日期选择(历史专用)
    dateCheckedChange(date, dateString) {
      const self = this
      self.curDateValue = dateString
    },
    // 根据日期搜索历史视频(历史专用)
    timeSearchClick() {
      const self = this
      // 重新开始请求一段视频(1h)
      self.stopMapVideoPlay(false)
      let dateTime1h = 60 * 60 * 1000
      self.startTime = (new Date(self.curDateValue + ' 00:00:00')).getTime()
      self.endTime = (new Date(self.curDateValue + ' 00:00:00')).getTime() + dateTime1h
      self.getMapVideoPlay(true, self.startTime, self.endTime)
    },
    // 开始点击事件(历史专用)
    startPlayVideoClick() {
      const self = this
      self.mapVideo.play()
    },
    // 暂停点击事件(历史专用)
    stopPlayVideoClick() {
      const self = this
      self.mapVideo.pause()
    },
    // 视频刷新
    mapVideoPlayRefresh(flvUrl, sessionid) {
      const self = this
      self.flvUrl = flvUrl
      self.sessionid = sessionid
      self.nextFlvUrl = ''
      self.nextSessionid = ''
      var html = `<video id="mapVideo" class="video-js popup-body-video-play" controls preload="auto">
                    <source src=${flvUrl} type="video/x-flv">
                    <p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
                  </video>`
      $("#video-warp").html(html);

      self.mapVideo = videojs('mapVideo', {
        techOrder: ["html5", "flvjs"],
        flvjs: {
          mediaDataSource: {
            isLive: true,
            cors: true,
            withCredentials: false
          }
        },
        autoplay: true,
      }, function onPlayerReady() {
        self.mapVideo.on("play", function () { // 播放事件
          if(self.curDataTime >= 24) { // 清空数据 重新开始请求
            self.stopMapVideoPlay(false)
            self.startTime = (new Date(self.curDateValue + ' 00:00:00')).getTime()
            self.endTime = (new Date(self.curDateValue + ' 00:00:00')).getTime() + 60 * 60 * 1000
            self.getMapVideoPlay(true, self.startTime, self.endTime)
          }
        });
        self.mapVideo.on("pause", function () { // 暂停事件
        });
        self.mapVideo.on("timeupdate", function () { // 时间轴拖动
          if (self.playType == 'playback') {
            // 拖动进度条的时候不变
            if (!self.dropProgress) {
              var mapVideoTime = self.mapVideo.currentTime() // 视频播放XX秒
              var dateTime24 = 60 * 60 * 24; // 一天XX秒
              var percent = mapVideoTime / dateTime24
              let startDataTime = self.startTime - (new Date(self.curDateValue + ' 00:00:00')).getTime()
              let timeNumber = (startDataTime / 1000) / 3600
              self.curDataTime = timeNumber + percent * 24
            }

            // 时间间隔到一个小时 切换视频/暂停播放
            if (Math.floor(self.mapVideo.currentTime()) >= 60*60 && self.stopVideo && self.curDataTime <= 24) {
              if (!self.nextFlvUrl) {
                // 暂停视频
                self.stopVideo = false
                self.stopPlayVideoClick()
              } else { // 切换下一个视频
                var dateTime1h = 60 * 60 * 1000
                self.startTime = self.startTime + dateTime1h
                self.endTime = self.endTime + dateTime1h
                clearInterval(self.heartbeat['history_' + self.sessionid]);
                delete self.heartbeat['history_' + self.sessionid];
                // 切换下一个视频 清除video重新创建
                self.mapVideo.dispose()
                self.mapVideoPlayRefresh(self.nextFlvUrl, self.nextSessionid)

                // 切换下一个视频（此方法不起作用）
                // self.mapVideo.src({ type: "video/x-flv", src: self.nextFlvUrl });
                // self.mapVideo.load({ type: "video/x-flv", src: self.nextFlvUrl });
                // self.mapVideo.play();
              }
            } else if (Math.floor(self.mapVideo.currentTime()) == 60*59.5 && self.flag60 && self.curDataTime <= 24) { // 视频播放到59.5分钟的时候请求下一个视频
              self.flag60 = false
              // 下一个视频的开始时间就是上一段的结束时间
              var dateTime1h = 60 * 60 * 1000
              var startTime = self.startTime + dateTime1h
              var endTime = self.startTime + 2*dateTime1h
              // 请求下一段历史视频
              self.getMapVideoPlay(false, startTime, endTime);
            } else if (self.curDataTime >= 24) {
              self.stopVideo = false
              self.stopPlayVideoClick()
            }
          }
        });
        self.mapVideo.on("ended", function () { // 视频播放结束
          if (self.playType == 'playback') {
            // 最后一个视频播放完毕 或者 时间轴结束
            if (self.curDataTime >= 24) {
              self.stopPlayVideoClick()
            }
            // else { // 切换下一个视频
            //   var dateTime1h = 60 * 60 * 1000
            //   self.startTime = self.startTime + dateTime1h
            //   self.endTime = self.endTime + dateTime1h
            //   clearInterval(self.heartbeat['history_' + self.sessionid]);
            //   delete self.heartbeat['history_' + self.sessionid];
            //   // 切换下一个视频 清除video重新创建
            //   //self.mapVideo.currentTime(0)
            //   self.mapVideo.dispose()
            //   self.mapVideoPlayRefresh(self.nextFlvUrl, self.nextSessionid)
          }
        });
        self.mapVideo.on("error", function () { // 视频播放错误
          self.stopMapVideoPlay(true)
        })
      })
    },
    // 人脸抓拍 页码点击事件
    handleShowPageChange(pageNumber) {
      this.snapFaceCurPage = pageNumber
      this.getSnapshotData()
    },
    // 人脸抓拍 分页点击事件
    handleShowSizeChange(current, pageSize) {
      this.snapFaceSize = pageSize
      this.getSnapshotData()
    },

    /**
     * 开始视频请求
     * @param {boolean} first 是否重置播放器
     * @param {string} startTime 历史需要开始时间
     * @param {string} endTime 历史需要结束时间
     */
    async getMapVideoPlay(first, startTime, endTime) {
      const self = this
      let startTimeData = self.$common.timeVideoToTime(startTime - 1000 * 60 * 60 * 8).videoTime // 请求时间提前8小时
      let endTimeData = self.$common.timeVideoToTime(endTime - 1000 * 60 * 60 * 8).videoTime // 请求时间提前8小时
      let url = 'http://190.15.117.242:8016/h5Stream/xhwebvideo.xhrtmp'
      let params = {
        cmd: 'start',
        platform: 'pc',
        cameraid: self.videoData.cameraId || self.videoData.GUID, // 镜头Id
        type: self.playType, // 播放类型: 实时视频 历史视频
        userid: self.loginName, // 用户Id
        starttime: startTimeData,
        endtime: endTimeData,
        random: Math.random()
      }
      let resResult = await self.$http(url, params, {timeout: 30000, async: true, dataType: 'json', contentType: 'application/json;charset=utf-8'})
      self.confirmLoading = false

      let data = resResult.data
      if (data.result == '0') {
        self.flag60 = true;
        self.stopVideo = true;
        if (first) {
          self.mapVideoPlayRefresh(data.flvUrl, data.sessionid)
        } else {
          self.nextFlvUrl = data.flvUrl,
          self.nextSessionid = data.sessionid
        }

        // 心跳请求
        if (self.playType == 'playback') { // 历史视频的时候
          // 执行历史心跳请求以‘history’加sessionid为key存在全局变量
          if(self.heartbeat && self.heartbeat.length > 0) {
            for (var key in self.heartbeat) {
              if(key.indexOf("history_") > -1) {
                clearInterval(self.heartbeat[key])
                delete self.heartbeat[key]
              }
            }
          }
          self.heartbeat['history_' + data.sessionid] = setInterval(() => {
            self.getHeartBeatData(data.sessionid);
          }, 5000);
        } else { // 实时视频（实时视频逻辑比较简单5秒请求一次）
          if(self.heartbeat) {
            clearInterval(self.heartbeat);
          }
          self.heartbeat = ''
          self.heartbeat = setInterval(() => {
            self.getHeartBeatData(data.sessionid);
          }, 5000);
        }
      } else if (data.result == '10003') {
        // 请求返回失败会在执行3次，如果都失败则退出执行
        if (self.countError > 3) {
          self.countError = 0
          self.$message.error('播放失败，请稍后再试');
        } else {
          self.countError += self.countError + 1;
          self.getMapVideoPlay(first, startTime, endTime);
        }
      } else {
        if (self.countError > 3) {
          self.countError = 0
          self.$message.error('播放失败，请稍后再试');
          self.$message.error(data.describe);
          self.stopMapVideoPlay(false)
        } else {
          self.countError += self.countError + 1;
          self.getMapVideoPlay(first, startTime, endTime);
        }
      }
    },
    // 视频停止播放
    async stopMapVideoPlay(progress) {
      const self = this
      if(self.mapVideo) {
        self.mapVideo.dispose(); // 停止播放
      }
      if (!self.sessionid) {
        return;
      }
      let url = 'http://190.15.117.242:8016/h5Stream/xhwebvideo.xhrtmp'
      let params = {
        cmd: 'stop',
        sessionid: self.sessionid,
        type: self.playType
      }
      let resData = await self.$http(url, params, {
          timeout: 30000,
          async: true,
          dataType: 'json',
          contentType: 'application/json;charset=utf-8',
      });
      let data = resData.data
      if (data.result == '0') {
        // 清掉所有定时器
        clearInterval(self.heartbeat)
        for (var key in self.heartbeat) {
          if(key.indexOf("history_") > -1) {
            clearInterval(self.heartbeat[key])
            delete self.heartbeat[key]
          }
        }
        self.mapVideo = ''
        self.nextFlvUrl = ''
        self.nextSession = ''
        if (!progress) {
          // 清空已播放的时间(不是拖拽的情况)
          self.curDataTime = '0';
        }
      } else {
        self.$message.error(data.describe);
      }
    },
    // 循环请求心跳请求(5秒)
    async getHeartBeatData(sessionid) {
      let self = this
      let url = 'http://190.15.117.242:8016/h5Stream/xhwebvideo.xhrtmp'
      let params = {
        cmd: 'heartbeat',
        sessionid: sessionid,
        type: self.playType, // 播放类型: 实时视频 历史视频
      }
      let resData = await self.$http(url, params, {timeout: 30000, async: true, dataType: 'json', contentType: 'application/json;charset=utf-8'});
      let data = resData.data
      if (data.result != '0') {
        self.$message.error(data.describe)
        // 清掉所有定时器
        clearInterval(self.heartbeat)
        for (var key in self.heartbeat) {
          if(key.indexOf("history_") > -1) {
            clearInterval(self.heartbeat[key])
            delete self.heartbeat[key]
          }
        }
        // self.stopMapVideoPlay(false)
        self.stopPlayVideoClick()
      }
    },
    // 获取抓拍图
    async getSnapshotData() {
      const self = this
      let startTimeData = self.curDateValue + ' 00:00:00'
      let endTimeData = self.curDateValue + ' 24:00:00'
      let url = '/api/userShotLinkage/getSnapshotListByCameraId'
      let params = {
        id: self.videoData.cameraId || self.videoData.GUID, // 镜头cameraId
        // id: 'cacb8a62e1794ea38e036800b2257be3',
        startTime: startTimeData,
        endTime: endTimeData,
        pageNum: self.snapFaceCurPage,
        pageSize: self.snapFaceSize,
      }
      let resData = await self.$http(url, params);
      let data = resData.data
      if (data.code == '200' && data.data.number != '0') {
        $(".wrap-face-result").css({
          "display": 'none'
        })
        self.snapFaceTotalNumb = +data.data.total
        self.snapFaceArr = data.data.list
        $('.wrap-face-content').scrollTop(0)
      } else {
        $(".wrap-face-result").css({
          "display": 'inline'
        })
        self.snapFaceTotalNumb = 0
        self.snapFaceArr = []
      }
    }
  },
}
</script>

<style lang="scss">
.playVideo {
  position: relative;
  .wrap-video {
    width: 100%;
    height: 46rem;
    .video-player,
    .mapVideo-dimensions,
    .video-js {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .vjs-control-bar{
      height: 0 !important;
      display: none !important;
    }
  }
  .wrap-face {
    height: 12rem;
    padding: .5rem;
    .wrap-face-title {
      padding: 0 1rem;
      color: $theme-font;
      font-size: $font-size-medium;
      line-height: 2rem;
    }
    .wrap-face-content {
      overflow: auto;
      height: calc(100% - 2rem);
      .wrap-face-box {
        width: 100%;
        .wrap-face-item {
          float: left;
          width: calc(8.333% - 1rem);
          background: $theme-color;
          margin: 0 .5rem 1rem .5rem;
          .wrap-face-img {
            width: 100%;
            height: 6rem;
            background: $theme-select;
            img {
              height: 100%;
              width: 100%;
            }
          }
          .wrap-face-new {
            font-size: $font-size-small;
            color: $theme-font;
            text-align: center;
          }
        }
      }
      .wrap-face-result {
        display: none;
        padding: 1rem 0;
        color: #aaaaaa;
        text-align: center;
        .anticon {
          width: 100%;
          font-size: $font-size-x-largest;
          color: $theme-color-original;
        }
      }
    }
  }
  .wrap-operate {
    height: 7.5rem;
    background: $theme-background-bottom;
    .contentwrap {
      padding: .6rem 1.2rem .6rem 1.2rem;
      width: 100%;
      height: 100%;
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
