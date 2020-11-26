<template>
  <div id="serverList">
    <div class="wrap-sidebar wrap-sidebar-left">
      <div class="wrap-card wrap-card-100">
        <div class="list-box">
          <div class="list-title">
            <span class="list-title-name">服务列表</span>
          </div>
          <div class="list-content">
            <a-select v-model="leftListSelectVal" placeholder="请选择">
              <a-select-option 
                v-for="(item, index) in leftListSelect" 
                :value="item.id" 
                :key="index"
                :label="item.name">{{item.name}}</a-select-option>
            </a-select>
            <a-row>
              <a-col :span="19">
                <a-input v-model="leftListSearchVal" placeholder="请输入"></a-input>
              </a-col>
              <a-col :span="5">
                <a-button>搜索</a-button>
              </a-col>
            </a-row>
            <div class="list-tips">
              <p>共计：23条</p>
              <p>190.36.15.44已运行如下服务</p>
            </div>
            <ul>
              <li :class="isLeftActiveIndex === index ? 'active' : ''" v-for="(item, index) in leftServerList" :key="index">
                <span>{{item}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap-sidebar wrap-sidebar-center">
      <div class="wrap-card wrap-card-top24 wrap-card-72">
        <div class="css-architecture">
          <div class="css-div center-first-col">
            <div class="base-info css-state">
              <div class="list-title">
                <span class="list-title-name">基本信息</span>
              </div>
              <div class="base-info-detail">
                <p v-for="(item, index) in baseInfoList" :key="index" class="base-info-item">
                  <span>{{item.title}}：</span>
                  <span>{{item.content}}</span>
                </p>
              </div>
            </div>
            <div class="base-info css-playAdrr">
              <div class="list-title">
                <span class="list-title-name">变动记录</span>
              </div>
              <ul>
                <li v-for="(item, index) in changeList" :key="index">{{index + 1}}、{{item}}</li>
              </ul>
            </div>
          </div>
          <div class="css-div center-second-left-col" v-if="cneterTab==='left'">
            <div class="css-state">
              <div class="list-title">
                <span class="list-title-name">实时状态</span>
              </div>
              <div class="css-pieMsg">
                <echarts-pie :dataVal="statistical.dataVal[0]"></echarts-pie>
              </div>
            </div>
            <div  class="css-playAdrr">
              <div class="list-title">
                <span class="list-title-name">当前点播分布</span>
              </div>
              <div class="css-pieMsg">
                <echarts-pie :dataVal="statistical.dataVal[1]"></echarts-pie>
              </div>
            </div>
          </div>
          <div class="css-div center-second-right-col" v-else>
            <div class="css-state">
              <div class="list-title">
                <span class="list-title-name">实时状态</span>
              </div>
              <div class="css-pieMsg">
                <echarts-pie :dataVal="statistical.dataVal[0]"></echarts-pie>
              </div>
              <div class="css-jd">
                <p>
                  <span class="css-jdContent">
                    <span>596</span>
                    <span>进度数</span>
                  </span>
                </p>
                <p>
                  <span class="css-jdContent">
                    <span>596</span>
                    <span>句柄数</span>
                  </span>
                </p>
              </div>
              <p class="css-diskData">
                <span>磁盘读写吞吐量</span>
                <span>30<span>mb/s</span></span>
              </p>
              <div class="css-proportion">
                <li>
                  <div>
                    <div>
                      <div>
                        <p>
                          <span>60%</span>
                          <span>CPU占用率</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <div>
                      <div>
                        <p>
                          <span>56%</span>
                          <span>内存占用率</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <div>
                      <div>
                        <p>
                          <span>58%</span>
                          <span>网络负载</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            </div>
          </div>
          <div class="css-div center-third-col">
            <div class="alarm-info">
              <div class="list-title">
                <span class="list-title-name">告警信息</span>
              </div>
              <div class="alarm-count-box">
                <a-row v-for="(item, index) in alarmCountList" :key="index">
                  <a-col :span="12">
                    <div class="alarm-item">
                      <p>{{item.firstName}}</p>
                      <p>{{item.firstNum}}</p>
                    </div>
                  </a-col>
                  <a-col :span="12">
                    <div class="alarm-item">
                      <p>{{item.secondName}}</p>
                      <p>{{item.secondNum}}</p>
                    </div>
                  </a-col>
                </a-row>
              </div>
              <div class="alarm-list">
                <ul>
                  <li v-for="(item, index) in alarmList" :key="index">{{index + 1}}、{{item}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-card wrap-card-line wrap-card-28">
        <div class="css-centent">
          <div class="list-title">
            <span class="list-title-name">实时负载</span>
            <p class="css-tag">
              <a-radio-group v-model="statisticsType" button-style="solid" size="small" @change="changePic">
                <a-radio-button value="line">
                  趋势
                </a-radio-button>
                <a-radio-button value="bar">
                  机构
                </a-radio-button>
              </a-radio-group>
            </p>
          </div>
          <div class="css-pieMsg">
            <echarts-line v-if="showLine===true" :chartData="statistical.chartData"></echarts-line>
            <echarts-bar v-else :chartData="statistical.chartData1"></echarts-bar>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap-sidebar wrap-sidebar-right">
      <div class="wrap-card wrap-card-100">
        <div class="list-box">
          <div class="list-title">
            <span class="list-title-name">服务器列表</span>
          </div>
          <div class="list-content">
            <a-select v-model="rightListSelectVal" placeholder="请选择">
              <a-select-option 
                v-for="(item, index) in rightListSelect" 
                :value="item.id" 
                :key="index"
                :label="item.name">{{item.name}}</a-select-option>
            </a-select>
            <a-row>
              <a-col :span="19">
                <a-input v-model="rightListSearchVal" placeholder="请输入"></a-input>
              </a-col>
              <a-col :span="5">
                <a-button>搜索</a-button>
              </a-col>
            </a-row>
            <div class="list-tips">
              <p>共计：23条</p>
              <p>190.36.15.44已运行如下服务</p>
            </div>
            <ul>
              <li :class="isLeftActiveIndex === index ? 'active' : ''" v-for="(item, index) in rightServerList" :key="index">
                <span>{{item}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echartsBar from "@/components/echartsBar";
import echartsPie from "@/components/echartsPie";
import echartsLine from "@/components/echartsLine";
export default {
  components: {
    echartsBar,
    echartsPie,
    echartsLine
  },
  data() {
    return {
      // 左侧服务列表数据
      leftListSelect: [
        {
          name: '3A服务',
          id: '0'
        },
        {
          name: '3A服务1',
          id: '1'
        },
      ],
      leftListSelectVal: '0', // 下拉框选中
      leftListSearchVal: '', // 输入查询条件
      leftServerList: [
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
      ],
      isLeftActiveIndex: 0, // 当前高亮的条目
      // 左侧服务器列表数据
      rightListSelect: [
        {
          name: '3A服务',
          id: '0'
        },
        {
          name: '3A服务1',
          id: '1'
        },
      ],
      rightListSelectVal: '0', // 下拉框选中
      rightListSearchVal: '', // 输入查询条件
      rightServerList: [
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
        '流媒体1',
      ],
      isRightActiveIndex: 0, // 当前高亮的条目
      // 基本信息数据
      baseInfoList: [ // 基本信息 详细数据
        {
          title: 'IP',
          content: '125.255.214.26'
        },
        {
          title: '所属服务器位置',
          content: '市局一号楼机房'
        },
        {
          title: '维护人',
          content: '刘峰 13258455467'
        },
        {
          title: '初始部署时间',
          content: '2020-07-01'
        },
        {
          title: '历史变更',
          content: '10次'
        },
      ],
      // 变动记录数据
      changeList: [ // 列表数据
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
        '2017-07-08服务迁移从服务器1迁移至服务器2',
      ],
      // 告警数据
      alarmCountList: [
        {
          firstName: '总计',
          firstNum: 40,
          secondName: '一级告警',
          secondNum: 16,
        },
        {
          firstName: '二级告警',
          firstNum: 18,
          secondName: '三级告警',
          secondNum: 26,
        },
      ],
      alarmList: [
        '服务过量',
        '告警1',
        '告警1',
        '告警1',
        '告警1',
        '告警1',
        '告警1',
        '告警1',
        '告警1',
      ],

      statisticsType: 'line',
      showLine: true,
      cneterTab: 'right', // left: 显示左侧列表对应状态 right：显示右侧列表对应状态
      fieldName: 'onlineUserNum',
      videoResourceLoadData: {
        cpuUsedRate: 0,
        gpuUsedRate: 0,
        memoryUsedRate: 0,
        offlineMinutesOneDay: 0,
        offlineMinutesOneMonth: 0,
        offlineMinutesOneWeek: 0
      },
      statistical: {
        dataVal: [
          {
            id: "nub0",
            name: "总服务数",
            position: "center",
            positionVal: ['50%', '38%'],
            fontSize: 12,
            totalShow: true,
            percentageShow: false,
            total: 894,
            data: [
              {
                value: 128,
                name: "告警",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              },
              {
                value: 766,
                name: "在线数",
                itemStyle: {
                  normal: {
                    color: "#82aeff"
                  }
                }
              }
            ],
            time: (new Date()).getTime()
          },
          {
            id: 'nub4',
            name: '服务器分布',
            position: "center",
            positionVal: ['50%', '38%'],
            fontSize: 12,
            type: 'bread',  // 饼状图
            breadRadius: ['0', '70%'],
            data: [
              {
                value: 124,
                name: '专网/124',
                itemStyle: {
                  normal: {
                    color: '#45c9eb'
                  }
                }
              },
              {
                value: 175,
                name: '公安网/175',
                itemStyle: {
                  normal: {
                    color: '#445fde'
                  }
                }
              },
              {
                value: 135,
                name: '政务外网/135',
                itemStyle: {
                  normal: {
                    color: '#82aeff'
                  }
                }
              }
            ]
          }
        ],
        chartData: {
          name: "chart8",
          type: "bar-line",
          color: ["#db8223", "#82aeff"],
          nameArr: ['昨日实时负载', '今日实时负载'],
          nameList: [],
          data1: [],
          data2: [],
          time: (new Date()).getTime()
        },
        chartData1: {
          name: "chart1",
          type: "bar",
          color: ["#00ffff", "#3893e5"],
          nameList: [],
          data: [],
          time: (new Date()).getTime()
        }
      }
    }
  },
  computed: {
    classOption() {
      return {
        step: 1.9
      };
    }
  },
  mounted() {
    this.brokenStatistics()
    this.barStatistics()
  },
  methods: {
    changePic () {
      if (this.statisticsType === "line") {
        this.showLine = true;
        this.showBar = false;
      } else {
        this.showLine = false;
        this.showBar = true;
        this.barDataShow()
      }
    },
    // 获取前n天0点时间戳
    getTimeStamp (time) {
      if (time == undefined) {
        return new Date(new Date().toLocaleDateString()).getTime();
      } else {
        return new Date(new Date().toLocaleDateString()).getTime() + time * 24 * 3600 * 1000
      }
    },
    // 时间戳转时间
    getDataTime (time) {
      const t = new Date(time)
      const y = t.getFullYear()
      const M = t.getMonth() + 1
      const d = t.getDate()
      const h = t.getHours() < 10 ? '0' + t.getHours() : t.getHours()
      const m = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes()
      return h + ':' + '00'
    },
    // 柱状图各个类型切换
    barDataShow () {
      let adrr = []
      let data = []
      this.barStatisticsData.forEach(item => {
        adrr.push(item.orgName)
        data.push(item[this.fieldName])
      })
      this.statistical.chartData1.nameList = adrr
      this.statistical.chartData1.data = data
      console.log(data)
      this.statistical.chartData1.time = (new Date()).getTime()
    },
    // 折线图各个类型切换
    brokenDataShow () {
      let timeArr = []
      let data1 = []
      let data2 = []
      this.nowStatisticsData.forEach(item => {
        timeArr.push(item.createTime)
        data2.push(item[this.fieldName])
      })
      this.yesterDayStatisticsData.forEach(item => {
        timeArr.forEach(timer => {
          if (timer === item.createTime) {
            data1.push(item[this.fieldName])
          }
        })
      })
      this.statistical.chartData.nameList = timeArr
      this.statistical.chartData.data1 = data1
      this.statistical.chartData.data2 = data2
      this.statistical.chartData.time = (new Date()).getTime()
    },
    // 折线统计图
    async brokenStatistics () {
      const nowData = await this.$axios('/api/homePage/getTrendStatistics', {
        orgId: 10,
        pageNum: 1,
        pageSize: 100,
        startTime: this.getTimeStamp(),
        endTime: (new Date()).getTime(),
        neb: 1111
      });
      const yesterDayData = await this.$axios('/api/homePage/getTrendStatistics', {
        orgId: 10,
        pageNum: 1,
        pageSize: 100,
        startTime: this.getTimeStamp(-1),
        endTime: this.getTimeStamp()
      });
      nowData.list.forEach(item => {
        item.createTime = this.getDataTime(item.createTime)
      })
      yesterDayData.list.forEach(item => {
        item.createTime = this.getDataTime(item.createTime)
      })
      this.nowStatisticsData = nowData.list
      this.yesterDayStatisticsData = yesterDayData.list
      this.fieldName = 'onlineUserNum'

      this.brokenDataShow()
    },
    // 中下的柱状统计图
    async barStatistics () {
      const data = await this.$axios('/api/homePage/getOrgStatistics', {
        orgId: 10,
        pageNum: 1,
        pageSize: 100
      });
      data.list.forEach(item => {
        item.orgName = item.orgName.substring(0,2)
      })
      this.barStatisticsData = data.list
    }
  },
};
</script>

<style lang="scss" scoped>
#serverList {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  overflow: hidden;
  user-select: none;
  .list-title>.list-title-name {
    padding: 0 !important;
  }
  .wrap-sidebar-left,
  .wrap-sidebar-right { // 左侧模块 服务列表 + 右侧模块 服务器列表
    .wrap-card-100 { // 服务列表 服务器列表
      height: 100%;
      margin-bottom: 0rem;
      .list-box {
        height: 100%;
        padding: .5rem 1rem;
        .list-content { // 内容区
          height: calc(100% - 42px);
          .ant-row {
            margin-top: .5rem;
            margin-bottom: 1.5rem;
            .ant-col-5 {
              text-align: right;
            }
          }
          .list-tips {
            font-size: 12px;
            color: #fff;
          }
          ul {
            height: calc(100% - 132px);
            overflow: auto;
            color: #BAC5CC;
            font-size: 14px;
            li {
              border: 1px solid #00376E;
              border-radius: 2px;
              background: #012447;
              margin-top: 0.5rem;
              margin-right: 1rem;
              opacity: 0.8;
              span {
                padding: 0.5rem 0rem 0.5rem 1rem;
              }
            }
          }
        }
      }
    }
  }
  .wrap-sidebar-center { // 中间模块
    padding: 0;
    background: url(~@/assets/img/serviceOverview/server_list_larg_bg.png) no-repeat;
    background-size: 100% 100%;
    .wrap-card-top24 { // 中间 上方模块
      width: calc(100% - 2px);
      margin-top: 1.5rem;
      margin-bottom: 0.45rem;
      margin-left: 0.0625rem;
      background: #00152D;
      .css-architecture { // 中间模块
        height: 100%;
        display: flex;
        .css-div { // 中间模块 上面三列 下面一行 公共样式
          flex: 9;
          overflow: hidden;
          &:nth-of-type(1),
          &:nth-of-type(3) { // 中间模块 第一列和第三列
            flex: 10;
            padding: 0;
            border-radius: 4px;
          }
        }
        .center-second-left-col { // 点击左侧服务列表 第二列样式
          display: flex;
          flex-direction: column;
          height: 100%;
          padding-left: 0px;
          padding-right: 0px;
          margin-left: 0.25rem;
          margin-right: 0.25rem;
          background: #00152D;
          .css-state{
            flex: 2;
            padding: .5rem 1rem;
            background: $theme-color;
            border-radius: 4px;
            margin-bottom: 1rem;
            .css-pieMsg {
              height: calc(100% - 3.5rem);
            }
          }
          .css-playAdrr{
            flex: 3;
            height: 60%;
            padding: .5rem 1rem;
            background: $theme-color;
            border-radius: 4px;
            .css-pieMsg {
              height: calc(100% - 3.5rem);
            }
          }
        }
        .center-second-right-col { // 点击右侧服务器列表 第二列样式
          padding: 0;
          margin: 0;
          display: flex;
          .css-state{
            flex: 1;
            display: flex;
            flex-direction: column;
            background: $theme-color;
            padding: .5rem 1rem;
            border-radius: 4px;
            .css-pieMsg{ // 环状图
              flex: 2;
            }
            .css-jd{ // 进度
              overflow: hidden;
              flex: 1;
              display: flex;
              p{
                flex: 1;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                .css-jdContent{
                  display: inline-block;
                  background: url(~@/assets/img/bg_chart-1.png) no-repeat;
                  width: 141px;
                  height: 83px;
                  text-align: center;
                  position: relative;
                  left: 50%;
                  transform: translateX(-50%);
                  span{
                    display: block;
                    &:nth-of-type(1){
                      font-size: 28px;
                      color: $theme-yellow;
                      margin-top: 5px;
                    }
                  }
                }
              }
            }
            .css-diskData{ // 磁盘
              background: $theme-select;
              border-radius: 4px;
              padding: 8px 20px;
              display: flex;
              span {
                &:nth-of-type(1){
                  flex: 2;
                  font-size: 16px;
                }
                &:nth-of-type(2){
                  flex: 1;
                  text-align: right;
                  font-size: 24px;
                  color: $theme-green;
                  line-height: 24px;
                  span {
                    font-size: 16px;
                  }
                }
              }
            }
            .css-proportion{ // 占用率
              flex: 1;
              display: flex;
              li {
                flex: 1;
                padding: 2px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                div{
                  background: #82aeff33;
                  border-radius: 50%;
                  width: 100%;
                  padding-top: 100%;
                  height: 0;
                  position: relative;
                  div {
                    position: absolute;
                    width: 86%;
                    padding-top: 86%;
                    background: $theme-font;
                    left: 7%;
                    top: 7%;
                    div {
                      position: absolute;
                      width: 90%;
                      padding-top: 90%;
                      background: $theme-color;
                      left: 5%;
                      top: 5%;
                      p {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 100%;
                        span {
                          display: block;
                          text-align: center;
                          &:nth-of-type(1){
                            color: $theme-yellow;
                            font-size: 20px;
                          }
                          &:nth-of-type(2){
                            font-size: 12px;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .center-first-col { // 中间模块 第一列 单独的样式
          height: 100%;
          display: flex;
          flex-direction: column;
          padding-left: 0px;
          padding-right: 0px;
          margin-left: 1.5rem;
          margin-right: 0.75rem;
          // margin-left: 0.25rem;
          // margin-right: 0.25rem;
          background: #00152d;
          .base-info { // 中间第一列 两个子元素的公共样式
            flex: 1;
            background: #07223B;
          }
          .css-state { // 中间第一列 第一个子元素的单独样式
            flex: 2;
            padding: .5rem 1rem;
            margin-bottom: 1rem;
            border-radius: 4px;
            // background: $theme-select;
            background: #07223B;
            .base-info-detail {
              border: 1px solid #00376E;
              p { // 基本信息 每一行信息
                display: flex;
                span {
                  text-align: left;
                  margin-right: 10px;
                  padding-left: 1rem;
                  font-size: 12px;
                  line-height: 30px;
                  color: #afbcd4;
                  &:nth-of-type(2){
                    text-align: left;
                    padding-left: 0rem;
                    color: #FFF;
                  }
                }
              }
            }
          }
          .css-playAdrr { // 中间第一列 第二个子元素的单独样式
            flex: 3;
            height: 60%;
            padding: .5rem 1rem;
            background: $theme-color;
            border-radius: 4px;
            ul {
              overflow: auto;
              height: calc(100% - 52px);
              color: #d5d5d5;
              li {
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 30px;
              }
            }
          }
        }
        .center-third-col { // 中间模块 第三列 单独的样式
          margin-left: 0.75rem;
          margin-right: 1.5rem;
          background: $theme-color;
          .alarm-info {
            padding: .5rem 1rem;
            .alarm-count-box{ // 统计数据模块布局
              .ant-col-12 {
                &:nth-of-type(1) { // 第一列
                  padding: 0.75rem 0.75rem 0.75rem 0rem;
                }
                &:nth-of-type(2) { // 第二列
                  padding: 0.75rem 0rem 0.75rem 0.75rem;
                }
                .alarm-item { // 统计数据模块
                  background: url(~@/assets/img/serviceOverview/alarm_item_bg.png) no-repeat center;
                  padding: 0.69rem 0rem 0.69rem 1rem;
                  P { // 文字
                    padding-left: 1rem;
                    &:nth-of-type(1) {
                      font-size: 12px;
                      color: #7C9DBA;
                    }
                    &:nth-of-type(2) {
                      font-size: 24px;
                      color: #fff;
                    }
                  }
                }
              }
            }
            .alarm-list{
              margin-top: 10px;
              overflow: auto;
              height: calc(100% - 100px);
              ul {
                color: #d5d5d5;
                li {
                  font-size: 12px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  line-height: 30px;
                  border-bottom: 1px #083661 solid;
                }
              }
            }
          }
          
          
        }
      }
    }
    .wrap-card-line {
      width: calc(100% - 2px);
      margin-left: 0.0625rem;
      background: #00152D;
    }
    
    .css-centent {
      padding: 0 1rem;
      height: 100%;
      .css-pieMsg {
        height: calc(100% - 3.5rem);
      }
    }
  }
}

</style>
