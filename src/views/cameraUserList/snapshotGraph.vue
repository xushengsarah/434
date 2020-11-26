<template>
  <div class="snapshotGraph">
    <div class="wrap-car">
      <div class="wrap-face-title" @click="isshowCarBox = !isshowCarBox">
        <p>车辆</p>
        <a-icon type="bell"></a-icon>
        <p>0</p>
      </div>
      <div class="wrap-face-content" v-show="isshowCarBox">
        <ul class="wrap-face-box">
          <li class="wrap-face-item"
            v-for="(item,index) in $store.state.kkGroupIds.snapImg"
            :key="index"
            @click="showBigMask(1,item)">
            <div class="wrap-face-plateNo">{{item.plateNo||'无'}}</div>
            <div class="wrap-face-img">
                <!-- <el-image :src="item.imageUrl1" fit="fill">
                    <div slot="error">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                    <div slot="placeholder">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image> -->
                <img :src="item.imageUrl1" :onerror="errorImg">
            </div>
            <div class="wrap-face-new">
              <p class="wrap-face-new-text">{{item.passTime?item.passTime.split(" ")[1]:item.passTime}}</p>
            </div>
          </li>
        </ul>
        <div class="wrap-face-result">
          <a-icon type="warning"></a-icon>
          <div>暂无返回数据</div>
        </div>
      </div>
    </div>
    <div class="wrap-face">
      <div class="wrap-face-title" @click="isShowFaceBox = !isShowFaceBox">
        <p>人像</p>
        <a-icon type="bell"></a-icon>
        <p>0</p>
      </div>
      <div class="wrap-face-content" v-show="isShowFaceBox">
        <ul class="wrap-face-box">
          <li class="wrap-face-item face"
            v-for="(item,index) in $store.state.cameraGroupIds.snapImg"
            :key="index"
            @click="showBigMask(2,item)">
            <div class="wrap-face-img">
              <img :src="item.thumImageUrl">
            </div>
            <div class="wrap-face-new">
              <p class="wrap-face-new-text">{{item.captureTime?item.captureTime.split(" ")[1]:''}}</p>
            </div>
          </li>
        </ul>
        <div class="wrap-face-result">
          <a-icon type="warning"></a-icon>
          <div>暂无返回数据</div>
        </div>
      </div>
    </div>
    <a-modal title="大图" :visible="isShowBigMask" footer = '' @cancel="handleBigMask" width="60%" class="bigMask">
      <div class="bigMask-info">
          <div class="infoName">{{bigName}}</div>
          <div class="infoTime">{{bigTime}}</div>
      </div>
      <img class="bigMask-img" :src="bigImg">
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: ['cameraSelectedData', 'cameraData','cameraProtectLevel'],
  computed: {
    ...mapGetters({
      sessionId: "sessionId",
      Socket: "Socket",
      SocketData: "SocketData",
      SocketIsClose: "SocketIsClose",
    }),
  },
  data () {
    return {
      isshowCarBox: true,
      isShowFaceBox: true,
      faceCameraId: '',
      snapFaceArr: '',  // 抓拍图数据
      snapFaceResState: '暂无返回结果',
      cameraGroupId:'',  //镜头组id
      cameraIds:[],  //镜头id数组
      kkIds:[],//卡口数组
      realTimeHeart:'',  //心跳
      errorImg:'this.src="'+require('../../assets/img/no-data.png')+'"',
      isShowBigMask:false,
      bigImg:'',
      bigName:'',
      bigTime:''
    }
  },
  created () {
      this.init();
  },
  watch:{
    SocketData(data) {
      let self = this
      console.log('成功接收websocket返回信息....')
      if(data.func == 'uploadFile') {
          self.fileName_.push(data.fileName)
          self.$emit('fileNameChange', self.fileName_)
      };
    },
    SocketIsClose(val) {
      let self = this
      if(val) {
          console.log(`服务器关闭链接，请重新尝试...`)
          self.$store.state.SocketIsClose = false
          self.timerNum = 0
          clearInterval(self.stopWsocketTimer)
      }
    },
  },
  destroyed(){
    //取消订阅
    this.stopMapVideoPush();
  },
  methods: {
    init () {
        const self = this
        let data = self.cameraSelectedData.id || self.cameraData.cameraID
        this.cameraGroupId = data;
        this.getAllCameraIds(0);
        this.getAllCameraIds(1);
    },
    //根据镜头组获取全部镜头id
    async getAllCameraIds(type){
        let level = '';
        this.cameraProtectLevel.forEach(item=>{
            level+=item;
        })
        const data = await this.$http('/api/userShotLinkage/getIdListByPlanId', {
            id: this.cameraGroupId,
            level,
            type,
            pageNum: '1',
            pageSize: '1000'
        })
        const res = data.data;
        if(res.code == 200 && res.data){
            if(type == 0){
                let wsCameraIds = [];
                this.cameraIds = new Set([...res.data.list]);
                this.cameraIds.forEach(item=>{
                    let flag = false;
                    let obj = {
                        type:'addCamera',
                        cameraId:item
                    }
                    this.$store.commit("changeAddCameraGroupIds",obj);
                    //判断是否在实时视频中订阅过
                    this.$store.state.snapImgData.forEach(item1 =>{
                        if(item == item1.cameraId){
                            flag = true;
                        }
                    })
                    if(!flag){
                        wsCameraIds.push(item);
                    }
                })

                let wsSend ={
                    code: 10086,
                    requestType: 1,
                    requestName: "facemsg",
                    requestId: window.sessionStorage.getItem('loginSessionid'),
                    param: {
                        code: wsCameraIds
                    }
                };
                this.$socket.sendCar(wsSend);
            }else{
                this.kkIds = res.data.list;
                let obj = {
                    type:'addKK',
                    kkId: this.kkIds
                };
                this.$store.commit("changeAddKkIds",obj);
                let objSend = {
                    "code": 10086,
                    "requestType": 1,
                    "requestName": "carmsg",
                    "requestId": window.sessionStorage.getItem('userId'),
                    "param": {
                        "code":this.$store.state.kkGroupIds.kkIds
                    }
                };
                this.$socket.sendCar(objSend);
            }
        }
    },
    //停止抓拍图
    async stopMapVideoPush(){
        let cameraIds = [];
        this.$store.state.cameraGroupIds.cameraId.forEach(item1=>{
            let flag = false;
            this.$store.state.snapImgData.forEach(item=>{
                if(item1 == item.cameraId){
                    flag = true;
                }
            });
            if(!flag){
                cameraIds.push(item1);
            }
        })
        let wsSend = {
            code: 10086,
            requestType: 2,
            requestName: "facemsg",
            requestId: window.sessionStorage.getItem('loginSessionid'),
            param: {
                code: cameraIds
            }
        }, obj = {
            type:'delete'
        }, sendObj = {
            "code": 10086,
            "requestType": 2,
            "requestName": "carmsg",
            "requestId": window.sessionStorage.getItem('userId'),
            "param": {
                "code": this.$store.state.kkGroupIds.kkIds
            }
        };
        this.$socket.sendCar(sendObj);
        this.$store.commit("changeAddCameraGroupIds",obj);
        this.$store.commit("changeAddKkIds",{type:'delete'});
        if(cameraIds.length>0){
            this.$socket.sendCar(wsSend);
        }
    },
    /**
     * 显示大图弹窗
     * @param {String} type 当前大图弹窗类型  1：车辆2：人像
     * @param {Object} data 大图弹窗数据
     */
    showBigMask(type,data){
        if(type == 1){
            //车辆
            this.bigImg = data.imageUrl1;
            this.bigName = data.checkpointName;
            this.bigTime = data.passTime;
        }else{
            //人像
            this.bigImg = data.imageUrl;
            this.bigName = data.cameraName;
            this.bigTime = data.captureTime;
        }
        this.isShowBigMask = true;
    },
    //关闭大图弹窗
    handleBigMask(){
        this.isShowBigMask = false;
        this.bigImg = '';
        this.bigName = '';
        this.bigTime = '';
    },
    // 人脸抓拍
    // faceBoxClick(val) {
    //   this.isShowFaceBox = true
    //   this.faceCameraId = val.GUID
    //   this.getMapSnapshotData()
    // },
    // // 获取抓拍图
    // async getMapSnapshotData() {
    //   const self = this
    //   let curDateValue = self.$common.timeVideoToTime((new Date()).getTime()).date
    //   let startTimeData = curDateValue + ' 00:00:00'
    //   let endTimeData = curDateValue + ' 24:00:00'
    //   let url = '/api/userShotLinkage/getSnapshotListByCameraId'
    //   let params = {
    //     id: self.faceCameraId, // 镜头cameraId
    //     startTime: startTimeData,
    //     endTime: endTimeData,
    //     pageNum: self.snapFaceCurPage,
    //     pageSize: self.snapFaceSize,
    //   }
    //   let resData = await self.$http(url, params);
    //   let data = resData.data
    //   if (data.code == '200' && data.data.number != '0') {
    //     $(".wrap-face-result").css({
    //       "display": 'none'
    //     })
    //     self.snapFaceArr = data.data.list
    //     $('.wrap-face-content').scrollTop(0)
    //   } else {
    //     $(".wrap-face-result").css({
    //       "display": 'inline'
    //     })
    //     self.snapFaceArr = []
    //   }
    // }
  },
}
</script>

<style lang="scss">
.snapshotGraph {
    width:100%;
  height: 100%;
  .wrap-car {
    position: relative;
    height: 50%;
  }
  .wrap-face {
    position: relative;
    height: 50%;
    margin-bottom: .5rem;
  }
  .wrap-face-title {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding: 0 .5rem;
    padding-top: 1rem;
    color: $theme-font;
    font-size: $font-size-medium;
    line-height: 1.5rem;
    text-align: center;
    background: rgba(0, 0, 0, .8);
    .anticon {
      color: $theme-red;
    }
  }
  .wrap-face-content {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    background: $theme-background-bottom;
    .wrap-face-box {
      width: 100%;
      height: 100%;
      .wrap-face-item {
        float: left;
        width: calc(6.666% - 1rem);
        height: calc(100% - 1rem);
        background: $theme-color;
        margin: .5rem;
        cursor: pointer;
        .wrap-face-img {
          height: calc(100% - 2rem);
          background: $theme-select;
          img {
            height: 100%;
            width:100%;
          }
        }
        &.face{
            .wrap-face-img {
                height: calc(100% - 1rem);
            }
        }
        .wrap-face-new,.wrap-face-plateNo {
          font-size: $font-size-small;
          color: $theme-font;
          text-align: center;
          height: 1rem;
          line-height: 1rem;
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
</style>
