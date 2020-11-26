<template>
  <div class="serviceDetails">
    <div class="wrap-sidebar wrap-sidebar-left">
      <div class="wrap-card wrap-card-100">
        <div class="css-left-1">
          <div class="list-title">
            <span class="list-title-name">服务列表</span>
          </div>
          <ul class="js-leftBtn">
            <li class="active">
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="wrap-sidebar wrap-sidebar-center">
      <div class="wrap-card wrap-card-7">
        <div class="css-goBlcak">
          <a-icon type="home" @click="$router.go(-1)"></a-icon>
        </div>
      </div>
      <div class="wrap-card wrap-card-65">
        <div class="css-architecture">
          <div class="css-div">
            <div class="list-title">
              <span class="list-title-name">基本信息</span>
            </div>
            <div class="css-details">
              <p>
                <span>IP</span>
                <span>127.0.0.1</span>
              </p>
              <p>
                <span>所属服务位置</span>
                <span>市局一号楼机房</span>
              </p>
              <p>
                <span>维护人</span>
                <span>刘峰&nbsp;&nbsp;13665475135</span>
              </p>
              <p>
                <span>初始部署时间</span>
                <span>2020-07-24</span>
              </p>
              <p>
                <span>历史变更</span>
                <span>10次</span>
              </p>
            </div>
            <ul>
              <li>1、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>2、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>3、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>4、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>5、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>6、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>7、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>8、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>9、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>10、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>11、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>12、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>13、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>14、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>15、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>16、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>17、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>18、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>19、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>20、2017-07-08服务迁移从服务器1迁移至服务器2</li>
              <li>21、2017-07-08服务迁移从服务器1迁移至服务器2</li>
            </ul>
          </div>
          <div class="css-div css-twoSon" v-if="cneterTab==='left'">
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
          <div class="css-div css-oneSon" v-else>
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
          <div class="css-div">
            <div class="list-title">
              <span class="list-title-name">告警信息</span>
            </div>
            <div class="css-dataTj">
              <ul>
                <li>
                  <span>总计</span>
                  <span>40</span>
                </li>
                <li>
                  <span>一级告警</span>
                  <span>15</span>
                </li>
                <li>
                  <span>二级告警</span>
                  <span>17</span>
                </li>
                <li>
                  <span>三级告警</span>
                  <span>8</span>
                </li>
              </ul>
            </div>
            <div class="css-showDeta">
              <ul>
                <li>1、服务过量</li>
                <li>2、告警1</li>
                <li>3、告警1</li>
                <li>4、告警1</li>
                <li>5、告警1</li>
                <li>6、告警1</li>
                <li>7、告警1</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-card wrap-card-28">
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
        <div class="css-left-1">
          <div class="list-title">
            <span class="list-title-name">服务列表</span>
          </div>
          <ul class="js-rightBtn">
            <li>
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
            <li>
              <span>流媒体1</span>
            </li>
          </ul>
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
      statisticsType: 'line',
      showLine: true,
      cneterTab: 'left',
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
            type: "huan", // 环状图
            total: 894,
            name: "总服务数",
            radius: ['57%', '70%'],
            center: ['50%', '38%'],
            x: "center",
            position: "center",
            fontSize: 12,
            legendOrient: 'horizontal',
            totalShow: true,
            percentageShow: false,
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
            type: 'pie',
            name: '服务器分布',
            radius: ['0', '70%'],
            center: ['50%', '38%'],
            x: "center",
            position: "center",
            legendOrient: 'horizontal',
            fontSize: 12,
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
    this.clickBtn()
    this.barStatistics()
  },
  methods: {
    clickBtn () {
      const _this = this
      $('.js-leftBtn').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.js-rightBtn').find('li').removeClass('active')
        _this.cneterTab = 'left'
      })
      $('.js-rightBtn').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.js-leftBtn').find('li').removeClass('active')
        _this.cneterTab = 'right'
      })
    },
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
.serviceDetails {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem .5rem 1rem;
  box-sizing: border-box;
  overflow: hidden;
  user-select: none;
  .list-title>.list-title-name {
    padding: 0 !important;
  }
  .wrap-sidebar-left,
  .wrap-sidebar-right {
    .css-left-1 {
      height: 100%;
      padding: .5rem 1rem;
      > ul {
        overflow: auto;
        > li {
          float: left;
          width: 25%;
          text-align: center;
          margin-bottom: 3%;
          span {
            display: inline-block;
            background: $theme-color;
            padding: 6% 18%;
            border-radius: 4px;
            cursor: pointer;
          }
          &.active{
            span {
              background: $theme-button;
              color: $theme-white;
            }
          }
        }
      }
    }
  }
  .wrap-sidebar-center {
    padding: 0;
    .css-goBlcak {
      height: 100%;
      padding: 0 1rem;
      font-size: 24px;
      line-height: 3rem;
      cursor: pointer;
      box-sizing: border-box;
    }
    .css-architecture {
      height: 100%;
      display: flex;
      .css-div {
        flex: 9;
        overflow: hidden;
        &:nth-of-type(1),&:nth-of-type(3){
          flex: 10;
          background: $theme-color;
          padding: .5rem 1rem;
          border-radius: 4px;
        }
        &:nth-of-type(1) {
          & .css-details {
            background: $theme-select;
            border-radius: 4px;
            p {
              display: flex;
              span {
                flex: 1;
                text-align: right;
                margin-right: 10px;
                font-size: 12px;
                line-height: 30px;
                &:nth-of-type(2){
                  flex: 3;
                  text-align: left;
                }
              }
            }
          }
          ul {
            overflow: auto;
            margin-top: 10px;
            height: calc(100% - 200px);
            li {
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 30px;
            }
          }
        }
        &:nth-of-type(3) {
          & .css-dataTj{
            & ul {
              display: flex;
              margin-top: 0.71rem;
              & li {
                flex: 1;
                background: $theme-select;
                float: left;
                margin: 0 3px;
                padding: 5px 0;
                border-radius: 4px;
                & span {
                  display: block;
                  text-align: center;
                }
                & span:first-child {
                  font-size: 12px;
                }
                & span:last-child {
                  color: $theme-green;
                  font-size: 20px;
                  font-weight: 400;
                }
              }
            }
          }
          & .css-showDeta{
            margin-top: 10px;
            overflow: auto;
            height: calc(100% - 100px);
            ul {
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
        &.css-twoSon {
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          & .css-state{
            flex: 1;
            padding: .5rem 1rem;
            background: $theme-color;
            border-radius: 4px;
            margin-bottom: 1rem;
            .css-pieMsg {
              height: calc(100% - 3.5rem);
            }
          }
          & .css-playAdrr{
            flex: 1;
            padding: .5rem 1rem;
            background: $theme-color;
            border-radius: 4px;
            .css-pieMsg {
              height: calc(100% - 3.5rem);
            }
          }
        }
        &.css-oneSon {
          padding: 0 1rem;
          display: flex;
          & .css-state{
            flex: 1;
            display: flex;
            flex-direction: column;
            background: $theme-color;
            padding: .5rem 1rem;
            border-radius: 4px;
            & .css-pieMsg{
              flex: 2;
            }
            & .css-jd{
              overflow: hidden;
              flex: 1;
              display: flex;
              & p{
                flex: 1;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                & .css-jdContent{
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
            & .css-diskData{
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
            & .css-proportion{
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
      }
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
