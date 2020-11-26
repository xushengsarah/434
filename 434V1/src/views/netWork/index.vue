
<template>
  <!-- 流量概览 -->
  <div class="netWork">
    <!-- left -->
    <div class="wrap-sidebar wrap-sidebar-left">
      <div class="wrap-card wrap-card-27">
        <div class="list-title">
          <span class="list-title-name">VCN流量</span>
        </div>
        <div class="table-list-box">
          <ul>
            <li v-for="(item, index) in vcnFlow.vcnFlow1" :key="index">
              <span>{{ item.orgName }}</span>
              <span>{{ item.flow }}</span>
            </li>
          </ul>
          <ul>
            <li v-for="(item, index) in vcnFlow.vcnFlow2" :key="index">
              <span>{{ item.orgName }}</span>
              <span>{{ item.flow }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-card wrap-card-45">
        <div class="list-title">
          <span class="list-title-name">VCN负载</span>
        </div>
        <div class="list-box">
          <echarts-bar :chartData="chartDataVCNLoad"></echarts-bar>
        </div>
      </div>
      <div class="wrap-card wrap-card-28">
        <div class="list-title">
          <span class="list-title-name">VCN告警</span>
        </div>
        <div class="list-box">
          <scroll class="css-listBox" :data="VCNAlarmScrollData" :class-option="classOption">
            <ul>
              <li v-for="(item, index) in VCNAlarmScrollData" :key="index" style="display: flex; justify-content: space-between;">
                <span style="width: 120px;" :title="item.title">{{item.title}}</span>
                <span>{{item.ip}}</span>
                <span>{{item.time}}</span>
              </li>
            </ul>
          </scroll>
        </div>
      </div>
    </div>
    <!-- center -->
    <div class="wrap-sidebar wrap-sidebar-bottom">
      <p class="css-legend">
        <span class="c-pointer" @click="legendMessage(1)">
          <span :class="['css-color','color1','graph-case-color1', videoCaseList[0] ? '' : 'gray']"></span>
          <!-- <span class="css-color color1 graph-case-color1"></span> -->
          <!-- <span class="css-color color1"></span> -->
          VCN流量
        </span>
        <span class="c-pointer" @click="legendMessage(2)">
          <span :class="['css-color','color2', videoCaseList[1] ? '' : 'gray']"></span>
          <!-- <span class="css-color color2"></span> -->
          交换机流量
        </span>
        <span class="c-pointer" @click="legendMessage(3)">
          <span :class="['css-color','color3', videoCaseList[2] ? '' : 'gray']"></span>
          <!-- <span class="css-color color3"></span> -->
          边界流量
        </span>
      </p>
      <div class="wrap-card wrap-card-28">
        <div class="list-title">
          <div class="css-fzBtnWrap">
            <span :class="isVCNLoadActive ? 'list-title-name active' : 'list-title-name'" @click="change(true)">VCN负载</span>
            <span :class="!isVCNLoadActive ? 'list-title-name active' : 'list-title-name'" @click="change(false)">交换机负载</span>
          </div>
          <div class="css-tag">
            <a-radio-group v-model="statisticsType" button-style="solid" size="small">
              <a-radio-button value="line">趋势</a-radio-button>
              <a-radio-button value="bar"> 机构</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div class="list-box">
          <echarts-line v-if="statisticsType=='line'" :chartData="chartDataLine"></echarts-line>
          <echarts-bar v-else :chartData="chartDataBar"></echarts-bar>
        </div>
      </div>
    </div>
    <!-- right -->
    <div class="wrap-sidebar wrap-sidebar-right">
      <div class="wrap-card wrap-card-27">
        <div class="list-title" id="flowTitle">
          <div class="css-fzBtnWrap">
            <span :class="['list-title-name', isInterchangerFlow ? 'active' : '']" @click="onChangeType(true)">交换机流量</span>
            <span :class="['list-title-name', !isInterchangerFlow ? 'active' : '']" @click="onChangeType(false)">边界流量</span>
          </div>
        </div>
        <div class="table-list-box"  v-if="isInterchangerFlow">
          <ul>
            <li v-for="(item, index) in interchangerFlowData.interchangerFlowData1" :key="index">
              <span>{{ item.orgName }}</span>
              <span>{{ item.flow }}</span>
            </li>
          </ul>
          <ul>
            <li v-for="(item, index) in interchangerFlowData.interchangerFlowData2" :key="index">
              <span>{{ item.orgName }}</span>
              <span>{{ item.flow }}</span>
            </li>
          </ul>
        </div>
        <div class="table-list-box" v-else>
          <ul>
            <li v-for="(item, index) in BoundaryFlow.BoundaryFlow1" :key="index">
              <span>{{ item.orgName }}</span>
              <span>{{ item.flow }}</span>
            </li>
          </ul>
          <ul>
            <li v-for="(item, index) in BoundaryFlow.BoundaryFlow2" :key="index">
              <span>{{ item.orgName }}</span>
              <span>{{ item.flow }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-card wrap-card-45">
        <div class="list-title">
          <span class="list-title-name">交换机负载</span>
        </div>
        <div class="list-box">
          <echarts-bar :chartData="chartDataInterchangerLoad"></echarts-bar>
        </div>
      </div>
      <div class="wrap-card wrap-card-28">
        <div class="list-title">
          <span class="list-title-name">交换机告警</span>
        </div>
        <div class="list-box">
          <scroll class="css-listBox" :data="interchangerScrollData" :class-option="classOption">
            <ul>
              <li v-for="(item, index) in interchangerScrollData" :key="index">
                <span>{{item.title}}</span>
                <span>{{item.time}}</span>
              </li>
            </ul>
          </scroll>
        </div>
      </div>
    </div>
    <!-- map -->
    <!-- <iframe ref="prevIframe" class="css-iframe" :src="'http://190.168.17.2:6083?maptype=2&sessionid='+Sessionids"></iframe> -->
    <iframe ref="prevIframe" class="css-iframe" :src="'http://190.168.17.2:6084?maptype=2&sessionid='+Sessionids"></iframe>
  </div>
</template>

<script>
import scroll from "vue-seamless-scroll";
import echartsBar from "@/components/echartsBar";
import echartsLine from "@/components/echartsLine";
import apiHttp from "@/Http/http.js";
export default {
  components: {
    scroll,
    echartsBar,
    echartsLine
  },
  data () {
    return {
      /**
       * 地图
       */
      Sessionids: window.sessionStorage.getItem('loginSessionid'),
      // 地图图例切换 true表示选中 false表示不选中 仅改变样式
      videoCaseList: [true, false, false],

      /**
       * 左侧
       */
      // VCN流量
      vcnFlow: {
        vcnFlow1: [],
        vcnFlow2: []
      },
      // VCN负载柱状数据
      chartDataVCNLoad: {
        name: "chartY-1",
        type: "bar-Y",
        color: ["#1034E6", "#07ECE4"],
        nameList: [],
        data: [],
        time: new Date().getTime()
      },
      // VCN告警 滚动数据
      VCNAlarmScrollData: [
        { title: '光明分局【级别：低】', time: '2020/7/12 07:10:11', ip: '190.160.42.112' },
        { title: '宝安分局【级别：低】', time: '2020/8/15 00:15:45', ip: '190.29.20.27' }
      ],

      /**
       * 右侧
       */
      isInterchangerFlow: true, // true:交换机流量 false:边界流量
      // 交换机流量
      interchangerFlowData: {
        interchangerFlowData1: [],
        interchangerFlowData2: []
      },
      // 边界流量
      BoundaryFlow: {
        BoundaryFlow1: [],
        BoundaryFlow2: []
      },
      // 交换机负载 柱状数据
      chartDataInterchangerLoad: {
        name: "chartY-2",
        type: "bar-Y",
        color: ["#16DDFC", "#E2A601"],
        nameList: [],
        data: [],
        time: new Date().getTime()
      },
      // 交换机告警 滚动数据
      interchangerScrollData: [
        { title: '坪山_石井所S7706AB【级别：低】', time: '2020/08/14 19:50:11' },
        { title: '龙岗_平湖所S7706AB【级别：低】', time: '2020/09/01 20:12:45' }
      ],

      /**
       * 中间下方
       */
      statisticsType: 'line', // 切换折线图、柱状图
      fieldName: 'onlineUserNum', // 昨日趋势 今日趋势
      isVCNLoadActive: true, // VCN负载 交换机负载 选中样式切换
      // 折线图数据
      chartDataLine: {
        name: "chart8",
        type: "bar-line",
        color: ["#db8223", "#82aeff"],
        nameArr: ['昨日趋势', '今日趋势'],
        nameList: [],
        data1: [],
        data2: [],
        time: new Date().getTime()
      },
      // 柱状图数据
      chartDataBar: {
        name: "chartDataBar",
        type: "bar",
        color: ["#00ffff", "#3893e5"],
        nameList: [],
        data: [],
        time: (new Date()).getTime()
      },

      timer: '', // 定时器 获取数据
    }
  },
  computed: {
    classOption() {
      return {
        step: 0
      };
    }
  },
  created () {
    var that = this
    that.getData();
    this.timer = setInterval(() => {
      that.getData();
    }, 3000)
  },
  mounted() {
    this.brokenStatistics()
  },
  methods: {
    /**
     * 切换图例
     * dataNum : 1 2 3 4
     */
    legendMessage(dataNum) {
      let self = this
      let mapIndex = dataNum
      let arrIndex = dataNum - 1
      self.$set(self.videoCaseList, arrIndex, !self.videoCaseList[arrIndex])
      self.$refs.prevIframe.contentWindow.postMessage(
          { type: "showLegend", data: { index: mapIndex, data: self.videoCaseList[arrIndex] } },
          "*"
      );
    },
    // 切换 交换机流量、边界流量
    onChangeType(val) {
      this.isInterchangerFlow = val
    },

    // 获取左侧 VCN流量/VCN负载 获取中下 VCN负载   // 获取右侧 交换机流量 交换机负载 边界流量
    getData () {
      var that = this
      that.chartDataVCNLoad.nameList = [] // 左侧 VCN负载
      that.chartDataVCNLoad.data = []
      that.chartDataBar.nameList = [] // 中下 趋势、机构
      that.chartDataBar.data = []
      that.chartDataInterchangerLoad.nameList = [] // 右侧 交换机负载
      that.chartDataInterchangerLoad.data = []
      apiHttp.getVcnFlowData({ // 获取左侧 VCN流量/VCN负载 获取中下 VCN负载
        method: 'get'
      }).then(function (res) {
        that.vcnFlow.vcnFlow1 = res.data.data.slice(0, Math.ceil(res.data.data.length / 2)) // 获取左侧 VCN流量数据
        that.vcnFlow.vcnFlow2 = res.data.data.slice(Math.ceil(res.data.data.length / 2), res.data.data.length)

        res.data.data.forEach(item => {
          if(item.orgName != '深圳市公安局'){
            that.chartDataVCNLoad.nameList.push(item.orgName) // 获取左侧 VCN负载数据
            that.chartDataVCNLoad.data.push(item.flow)

            that.chartDataBar.nameList.push(item.orgName) // 获取中下 VCN负载柱状图数据
            that.chartDataBar.data.push(item.flow)
          }
        });
        that.chartDataVCNLoad.time = new Date().getTime()
      })

      apiHttp.getInterchangerFlowData({ // 获取右侧 交换机流量 交换机负载
        method: 'get'
      }).then( (res) => {
        if(res.data.code == '200'){
          that.interchangerFlowData.interchangerFlowData1 = res.data.data.slice(0, Math.ceil(res.data.data.length / 2))// 获取右侧 交换机流量数据
          that.interchangerFlowData.interchangerFlowData2 = res.data.data.slice(Math.ceil(res.data.data.length / 2), res.data.data.length)
        }
        res.data.data.forEach((ele) => { // 获取右侧 交换机负载数据
          if(ele.orgName != '深圳市公安局'){
            that.chartDataInterchangerLoad.nameList.push(ele.orgName)
            that.chartDataInterchangerLoad.data.push(ele.flow)
          }
        });
        that.chartDataInterchangerLoad.time = new Date().getTime()
      })

      apiHttp.getBoundaryFlow({ // 获取右侧 边界流量
        method: 'get'
      }).then((res) => {
        if(res.data.code == '200'){
          that.BoundaryFlow.BoundaryFlow1 = res.data.data.slice(0, Math.ceil(res.data.data.length / 2))
          that.BoundaryFlow.BoundaryFlow2 = res.data.data.slice(Math.ceil(res.data.data.length / 2), res.data.data.length)
          // res.data.data.forEach((ele) => { // 边界Echart数据
          //   if(ele.orgName != '深圳市公安局'){
          //     that.chartDataInterchangerLoad.nameList.push(ele.orgName)
          //     that.chartDataInterchangerLoad.data.push(ele.flow)
          //   }
          // });
        }
      })

      // apiHttp.getTendencyData ({ // 获取VNC和交换机趋势
      //   params:{
      //     orgId: 10,
      //     pageNum: 1,
      //     pageSize: 100,
      //     startTime: new Date().getTime() - 24 * 60 * 60 * 1000,
      //     endTime:  new Date().getTime()
      //   }
      // }).then((res) => {
      //   console.log('8989')
      //   console.log(res)
      // })
    },
    // 获取中下 折线图数据
    async brokenStatistics () {
      const nowData = await this.$axios('/api/homePage/getTrendStatistics', {
        orgId: 10,
        pageNum: 1,
        pageSize: 100,
        startTime: this.$common.getTimeStamp(),
        endTime: (new Date()).getTime()
      });
      const yesterDayData = await this.$axios('/api/homePage/getTrendStatistics', {
        orgId: 10,
        pageNum: 1,
        pageSize: 100,
        startTime: this.$common.getTimeStamp(-1),
        endTime: this.$common.getTimeStamp()
      });
      nowData.list.forEach(item => {
        item.createTime = this.$common.getDataTime(item.createTime)
      })
      yesterDayData.list.forEach(item => {
        item.createTime = this.$common.getDataTime(item.createTime)
      })
      this.nowStatisticsData = nowData.list
      this.yesterDayStatisticsData = yesterDayData.list

      this.brokenDataShow()
    },

    // 绘制折线图
    brokenDataShow () {
      let timeArr = []
      let data1 = []
      let data2 = []
      this.nowStatisticsData.forEach(item => {
        data2.push(item[this.fieldName])
      })
      this.yesterDayStatisticsData.forEach(item => {
        timeArr.push(item.createTime)
        data1.push(item[this.fieldName])
      })
      this.chartDataLine.nameList = timeArr
      this.chartDataLine.data1 = data1
      this.chartDataLine.data2 = data2
      this.chartDataLine.time = (new Date()).getTime()
      // console.log(this.chartDataLine)
      // this.statistical.chartDataVCNLoad.data = data1
      // this.statistical.chartDataVCNLoad.time = (new Date()).getTime()
    },
    // 折线图 切换vcn负载和交换机负载
    change ( data ) {
      this.isVCNLoadActive = data
      if (this.isVCNLoadActive) {
        this.fieldName = 'onlineUserNum'
        this.chartDataBar.nameList = this.chartDataVCNLoad.nameList
        this.chartDataBar.data = this.chartDataVCNLoad.data
        this.chartDataBar.time = new Date().getTime()
      } else {
        this.fieldName = 'sharePlayNum'
        this.chartDataBar.nameList = this.chartDataInterchangerLoad.nameList
        this.chartDataBar.data = this.chartDataInterchangerLoad.data
        this.chartDataBar.time = new Date().getTime()
      }
      this.brokenDataShow()
    },
  },
  destroyed() {
    clearInterval(this.timer)
  },
}
</script>

<style lang="scss" scoped>
.netWork {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem .5rem 1rem;
  box-sizing: border-box;
  .list-box {
    padding: 0 1rem;
    overflow: auto;
    height: calc(100% - 3.5rem);
  }
  .css-tag {
    float: left;
    width: auto;
    margin-right: 1rem;
    :first-child {
      margin-right: 0;
    }
  }
  .list-title {
    .css-fzBtnWrap {
      .list-title-name {
        cursor: pointer;
        padding: 0 0 0 1rem !important;
        color: inherit !important;
      }
      .active {
        color: $theme-yellow !important;
      }
    }
  }
  .css-legend {
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 10;
    > span {
      margin-left: 20px;
    }
    span {
      display: inline-block;
      font-size: 16px;
      &.css-color {
        width: 10px;
        height: 10px;
        margin-right: 5px;
      }
      &.color1 {
        background: $theme-legend1;
      }
      &.graph-case-color1 {
          background: $theme-legend5;
      }
      &.color2 {
        background: $theme-legend2;
      }
      &.color3 {
        background: $theme-legend3;
      }
      &.gray {
          background: $theme-legend-gray;
      }
    }
  }
}
</style>
