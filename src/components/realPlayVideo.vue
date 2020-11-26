<template>
  <div class="realPlayVideo">
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      loginName: "loginName",
    }),
  },
  props: ['videoData'],
  data () {
    return {
      cameraData: '', // 当前镜头所有数据
      idName: '', // 播放器Id名
      playType: 'realplay', // 播放类型: 实时视频realplay 历史视频playback
      mapVideo: [],  // 播放器实例
      sessionid: [], // 视频sessionid
      countError: [], // 错误请求次数
      heartbeat: [],  // 心跳请求定时器 历史视频为防止多个视频请求设置为数组
    }
  },
  created () {
  },
  watch: {},
  methods: {
    // 视频播放初始化
    initCurrentData() {
      const self = this
      self.idName = self.videoData.idName
      self.cameraData = self.videoData.data
      self.cameraData.idName = self.videoData.idName
      self.mapVideo[self.idName] = ''
      self.sessionid[self.idName] = ''
      self.countError[self.idName] = ''
      self.heartbeat[self.idName] = ''
      self.getRealVideoPlay(true)
    },

    /**
     * 开始视频请求
     * @param {boolean} first 是否重置播放器
     */
    async getRealVideoPlay(first) {
      const self = this
      let url = 'http://190.15.117.242:8016/h5Stream/xhwebvideo.xhrtmp'
      let params = {
        cmd: 'start',
        platform: 'pc',
        cameraid: self.cameraData.cameraId || self.cameraData.GUID, // 镜头Id
        type: 'realplay', // 播放类型: 实时视频 历史视频
        userid: self.loginName, // 用户Id
        random: Math.random()
      }
      let resResult = await self.$http(url, params, {timeout: 30000, async: true, dataType: 'json', contentType: 'application/json;charset=utf-8'})
      let data = resResult.data
      if (data.result == '0') {
        self.sessionid[self.idName] = data.sessionid
        var html = `<video id="${self.idName}" class="video-js popup-body-video-play" controls preload="auto">
                      <source src=${data.flvUrl} type="video/x-flv">
                      <p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
                    </video>`
        $('#' + self.idName + '-box').find('.realPlayVideo').html(html);

        self.mapVideo[self.idName] = videojs(self.idName, {
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
          self.mapVideo[self.idName].on("error", function () { // 视频播放错误
            // $('.vjs-modal-dialog').find('.vjs-modal-dialog-content').html((self.cameraData.cameraName || self.cameraData.NAME) +'镜头已被权限管控')
            // 清掉定时器 停止心跳请求
            clearInterval(self.heartbeat[self.cameraData.idName])
            delete self.heartbeat[self.cameraData.idName]
          })
        })

        // 心跳请求 实时视频（实时视频逻辑比较简单5秒请求一次）
        clearInterval(self.heartbeat[self.idName])
        delete self.heartbeat[self.idName]
        self.heartbeat[self.idName] = setInterval(() => {
          self.getRealVideoHeartBeat(data.sessionid);
        }, 5000);
      } else if (data.result == '10003') {
        // 请求返回失败会在执行3次，如果都失败则退出执行
        if (self.countError[self.idName] > 3) {
          self.countError[self.idName] = 0
          self.$message.error('播放失败，请稍后再试');
          self.$message.error(data.describe);
        } else {
          self.countError[self.idName] += self.countError[self.idName] + 1;
          self.getRealVideoPlay(first);
        }
      } else {
        if (self.countError[self.idName] > 3) {
          self.countError[self.idName] = 0
          self.$message.error('播放失败，请稍后再试');
          self.$message.error(data.describe);
          self.stopRealVideoPlay(self.cameraData)
        } else {
          self.countError[self.idName] += self.countError[self.idName] + 1;
          self.getRealVideoPlay(first);
        }
      }
    },
    // 视频停止播放
    async stopRealVideoPlay(val) {
      const self = this
      if(self.mapVideo[self.idName]) {
        self.mapVideo[self.idName].dispose(); // 停止播放
      }
      if (!self.sessionid[val.idName]) {
        return;
      }
      let url = 'http://190.15.117.242:8016/h5Stream/xhwebvideo.xhrtmp'
      let params = {
        cmd: 'stop',
        sessionid: self.sessionid[val.idName],
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
        // 清掉定时器
        clearInterval(self.heartbeat[val.idName])
        delete self.heartbeat[val.idName]
      } else {
        self.$message.error(data.describe);
      }
    },
    // 循环请求心跳请求(5秒)
    async getRealVideoHeartBeat(sessionid) {
      let self = this
      let url = 'http://190.15.117.242:8016/h5Stream/xhwebvideo.xhrtmp'
      let params = {
        cmd: 'heartbeat',
        sessionid: sessionid,
        type: self.playType // 播放类型: 实时视频 历史视频
      }
      let resData = await self.$http(url, params, {timeout: 30000, async: true, dataType: 'json', contentType: 'application/json;charset=utf-8'});
      let data = resData.data
      if (data.result != '0') {
        self.$message.error(data.describe)
        self.stopRealVideoPlay(self.cameraData)
      }
    }
  },
}
</script>

<style lang="scss">
.realPlayVideo {
  width: 100%;
  height: 100%;
  .video-player,
  .mapVideo-dimensions,
  .video-js {
    width: 100%;
    height: 100%;
  }
  .vjs-control-bar{
    height: 0 !important;
    display: none !important;
  }
}
</style>
