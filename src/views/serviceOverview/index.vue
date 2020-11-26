<template>
  <!-- 服务概览 -->
  <!-- <keep-active :include="['a']"> -->

    <div class="server" id="service-overview" :is="view" name='businessMonitor'>
      <div class="wrap-sidebar wrap-sidebar-left">
        <div class="wrap-card wrap-card-27">
          <div class="css-childBg css-left-1">
            <div class="list-title">
              <span class="list-title-name">服务数量</span>
              <!-- <a-button class="js-centerProp" size="small" data-title="服务清单"  @click="onShowServiceList()">服务清单</a-button> -->
              <a-button class="js-centerProp" size="small" data-title="服务清单" @click="goUrl('/streamMediaDetails', 0)">服务清单</a-button>
            </div>
            <ul class="css-target-number">
              <li>
                <span>整体响应时间</span>
                <span>{{videoResourceLoadData.cpuUsedRate}}S</span>
              </li>
              <li>
                <span>实时并发值</span>
                <span>{{videoResourceLoadData.gpuUsedRate}}</span>
              </li>
              <li>
                <span>最大并发值</span>
                <span>{{videoResourceLoadData.memoryUsedRate}}</span>
              </li>
              <li>
                <span>使用率</span>
                <span>{{videoResourceLoadData.usedRate}}%</span>
              </li>
            </ul>
            <div class="css-pieMsg">
              <echarts-pie :dataVal="statistical.dataVal[0]"></echarts-pie>
            </div>
          </div>
        </div>
        <div class="wrap-card wrap-card-45">
          <div class="css-childBg css-left-2">
            <div class="list-title">
              <span class="list-title-name">服务类型分布</span>
            </div>
            <!-- <div class="css-pieMsg">
              <echarts-semicircle :dataVal="statistical.dataVal[1]"></echarts-semicircle>
            </div> -->
            <ul>
              <li>
                <span class="css-name">服务</span>
                <span class="css-nub">实时并发值/最大并发值</span>
                <span class="css-progress">使用率</span>
              </li>
              <li>
                <span class="css-name">信令</span>
                <span class="css-nub">{{serDis.data1}}/{{serDis.data1Total}}</span>
                <span class="css-progress">
                  <a-progress
                    :stroke-color="{from: '#1AD4CD',to: '#2744D1',}"
                    :percent="(Math.floor((serDis.data1/serDis.data1Total)*100))"
                    status="active"
                  />
                </span>
              </li>
              <li>
                <span class="css-name">列表服务</span>
                <span class="css-nub">{{serDis.data2}}/{{serDis.data2Total}}</span>
                <span class="css-progress">
                  <a-progress
                    :stroke-color="{from: '#1AD4CD',to: '#2744D1',}"
                    :percent="(Math.floor(serDis.data2/serDis.data2Total*100))"
                    status="active"
                  />
                </span>
              </li>
              <li>
                <span class="css-name">流媒体</span>
                <span class="css-nub">{{serDis.data3}}/{{serDis.data3Total}}</span>
                <span class="css-progress">
                  <a-progress
                    :stroke-color="{from: '#1AD4CD',to: '#2744D1',}"
                    :percent="(Math.floor(serDis.data3/serDis.data3Total*100))"
                    status="active"
                  />
                </span>
              </li>
              <li>
                <span class="css-name">云台服务</span>
                <span class="css-nub">{{serDis.data4}}/{{serDis.data4Total}}</span>
                <span class="css-progress">
                  <a-progress
                    :stroke-color="{from: '#1AD4CD',to: '#2744D1',}"
                    :percent="(Math.floor(serDis.data4/serDis.data4Total*100))"
                    status="active"
                  />
                </span>
              </li>
              <li>
                <span class="css-name">鉴权服务</span>
                <span class="css-nub">{{serDis.data5}}/{{serDis.data5Total}}</span>
                <span class="css-progress">
                  <a-progress
                    :stroke-color="{from: '#1AD4CD',to: '#2744D1',}"
                    :percent="(Math.floor(serDis.data5/serDis.data5Total*100))"
                    status="active"
                  />
                </span>
              </li>
              <li>
                <span class="css-name">人像采集</span>
                <span class="css-nub">{{serDis.data6}}/{{serDis.data6Total}}</span>
                <span class="css-progress">
                  <a-progress
                    :stroke-color="{from: '#1AD4CD',to: '#2744D1',}"
                    :percent="(Math.floor(serDis.data6/serDis.data6Total*100))"
                    status="active"
                  />
                </span>
              </li>
              <li>
                <span class="css-name">人像清洗</span>
                <span class="css-nub">{{serDis.data7}}/{{serDis.data7Total}}</span>
                <span class="css-progress">
                  <a-progress
                    :stroke-color="{from: '#1AD4CD',to: '#2744D1',}"
                    :percent="(Math.floor(serDis.data7/serDis.data7Total*100))"
                    status="active"
                  />
                </span>
              </li>
              <li>
                <span class="css-name">人像建模</span>
                <span class="css-nub">{{serDis.data8}}/{{serDis.data8Total}}</span>
                <span class="css-progress">
                  <a-progress
                    :stroke-color="{from: '#1AD4CD',to: '#2744D1',}"
                    :percent="(Math.floor(serDis.data8/serDis.data8Total*100))"
                    status="active"
                  />
                </span>
              </li>
              <li>
                <span class="css-name">1400图片服务</span>
                <span class="css-nub">{{serDis.data9}}/{{serDis.data9Total}}</span>
                <span class="css-progress">
                  <a-progress
                    :stroke-color="{from: '#1AD4CD',to: '#2744D1',}"
                    :percent="(Math.floor(serDis.data9/serDis.data9Total*100))"
                    status="active"
                  />
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="wrap-card wrap-card-28">
          <div class="css-childBg css-left-3">
            <div class="list-title">
              <span class="list-title-name">服务告警分布</span>
            </div>
            <div class="css-pieMsg">
              <echarts-pie :dataVal="statistical.dataVal[2]"></echarts-pie>
            </div>
          </div>
        </div>
      </div>

      <div class="wrap-sidebar wrap-sidebar-center">
        <div class="wrap-card wrap-card-72">
          <div class="css-architecture">
            <div>
              <ul class="center-legend">
                <li v-for="(item, index) in centerLegend" :key="index">
                  <img class="center-legend-png" :src="item.path" alt="">
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <a-row class="service-box" :gutter="[20, 20]">
              <a-col :span="7" :offset="1">
                <div class="service-box-list" v-for="(item, index) in this.$store.state.businessMonitor.centerData.firstCol" :key="index">
                  <div class="service-box-content">
                    <div class="service-box-title">
                      <span>{{item.title}}</span>
                      <img src="@/assets/img/serviceOverview/title_bottom.png" alt="">
                    </div>
                    <ul>
                      <!-- <li v-for="(serItem, index) in item.service" :key="index" @click="openFirstColGraph(serItem)" :class="serItem.status === 1 ? 'alarm-tips' : 'normal-tips'"> -->
                      <li v-for="(serItem, index) in item.service" :key="index" @click="openFirstColGraph(serItem)" :class="serItem.status === 1 ? 'alarm-bg' : 'normal-bg'">
                        <span>{{serItem.name}}</span>
                        <div :class="serItem.status === 1 ? 'breathe-alarm-btn' : 'breathe-btn'"></div>
                        <img v-if="serItem.status === 1" class="alarm-tips" :src="alarmTips" alt="">
                      </li>
                    </ul>
                  </div>
                </div>
              </a-col>
              <a-col :span="7" class="center-col">
                <div class="service-box-list" v-for="(item, index) in this.$store.state.businessMonitor.centerData.secondCol" :key="index">
                  <div class="service-box-content">
                    <div class="service-box-title">
                      <span>{{item.title}}</span>
                      <img src="@/assets/img/serviceOverview/title_bottom.png" alt="">
                    </div>
                    <ul>
                      <li v-for="(serItem, index) in item.service" :key="index" @click="openFirstColGraph(serItem)" :class="serItem.status === 1 ? 'alarm-tips' : 'normal-tips'">
                        <span>{{serItem.name}}</span>
                        <div :class="serItem.status === 1 ? 'breathe-alarm-btn' : 'breathe-btn'"></div>
                        <!-- <img v-if="serItem.status === 1" class="alarm-tips" :src="alarmTips" alt=""> -->
                      </li>
                    </ul>
                  </div>
                </div>
              </a-col>
              <a-col :span="7">
                <div class="service-box-list" v-for="(item, index) in this.$store.state.businessMonitor.centerData.thirdCol" :key="index">
                  <div class="service-box-content">
                    <div class="service-box-title">
                      <span>{{item.title}}</span>
                      <img src="@/assets/img/serviceOverview/title_bottom.png" alt="">
                    </div>
                    <ul>
                      <li v-for="(serItem, index) in item.service" :key="index" :class="serItem.status === 1 ? 'alarm-tips' : 'normal-tips'">
                        <span>{{serItem.name}}</span>
                        <div :class="serItem.status === 1 ? 'breathe-alarm-btn' : 'breathe-btn'"></div>
                        <!-- <img v-if="serItem.status === 1" class="alarm-tips" :src="alarmTips" alt=""> -->
                      </li>
                    </ul>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
        <div class="wrap-card wrap-card-28">
          <div class="css-childBg">
            <div class="list-title">
              <span class="list-title-name">实时负载</span>
              <!-- <p class="css-tag">
                <a-radio-group v-model="statisticsType" button-style="solid" size="small" @change="changePic">
                  <a-radio-button value="line">
                    趋势
                  </a-radio-button>
                  <a-radio-button value="bar">
                    机构
                  </a-radio-button>
                </a-radio-group>
              </p> -->
            </div>
            <div class="css-pieMsg">
              <echarts-line :chartData="statistical.chartData1"></echarts-line>
            </div>
          </div>
        </div>
      </div>

      <div class="wrap-sidebar wrap-sidebar-right">
        <div class="wrap-card wrap-card-27">
          <div class="css-childBg css-right-1">
            <div class="list-title">
              <span class="list-title-name">服务器数量</span>
              <a-button class="js-centerProp" size="small" data-title="服务器清单" @click="goUrl('/streamMediaDetails', 1)">服务器清单</a-button>
            </div>
            <ul class="css-target-number">
              <li>
                <span>在线率</span>
                <span>{{server.cpuUsedRate}}%</span>
              </li>
              <li>
                <span>告警率</span>
                <span>{{server.memoryUsedRate}}%</span>
              </li>
              <li>
                <span>使用率</span>
                <span>{{server.gpuUsedRate}}%</span>
              </li>
            </ul>
            <div class="css-pieMsg">
              <echarts-pie :dataVal="statistical.dataVal[3]"></echarts-pie>
            </div>
          </div>
        </div>
        <div class="wrap-card wrap-card-45">
          <div class="css-childBg css-right-2">
            <div class="list-title">
              <span class="list-title-name">服务器分布</span>
            </div>
            <div class="css-pieMsg">
              <echarts-pie :dataVal="statistical.dataVal[4]"></echarts-pie>
            </div>
            <div class="css-pieMsg">
              <echarts-line :chartData="statistical.chartData2"></echarts-line>
            </div>
            <div class="css-pieMsg">
              <echarts-line :chartData="statistical.chartData3"></echarts-line>
            </div>
          </div>
        </div>
        <div class="wrap-card wrap-card-28">
          <div class="css-childBg css-right-3">
            <div class="list-title">
              <span class="list-title-name">实时告警</span>
              <div class="css-tag">
                <a-radio-group v-model="alarmType" button-style="solid" size="small" @change="changeRadio">
                  <a-radio-button value="a">
                    全部(20)
                  </a-radio-button>
                  <a-radio-button value="b">
                    服务(15)
                  </a-radio-button>
                  <a-radio-button value="c">
                    服务器(10)
                  </a-radio-button>
                </a-radio-group>
              </div>
            </div>
            <div class="css-listMsg">
              <ul>
                <li>
                  <span>流媒体1</span>
                  <span>IP断开</span>
                </li>
                <li>
                  <span>三楼机房服务器A</span>
                  <span>磁盘满</span>
                </li>
                <li>
                  <span>三楼机房服务器A</span>
                  <span>磁盘满</span>
                </li>
                <li>
                  <span>三楼机房服务器A</span>
                  <span>磁盘满</span>
                </li>
                <li>
                  <span>三楼机房服务器A</span>
                  <span>磁盘满</span>
                </li>
                <li>
                  <span>三楼机房服务器A</span>
                  <span>磁盘满</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <a-modal :title="this.$store.state.businessMonitor.serviceTitle" :visible="this.$store.state.businessMonitor.isOthers" footer = '' @cancel="closeFirstColGraph" width="50%">
        <a-row type="flex">
          <a-col :span="this.$store.state.businessMonitor.tabsCol" class="service-tabs-col">
            <service-tabs-others ref="serviceTabsOthers" :tabsVal='this.$store.state.businessMonitor.tabsVal' @handleTabsChangeItem="handleTabsChangeItem"></service-tabs-others>
          </a-col>
          <a-col :span="24 - this.$store.state.businessMonitor.tabsCol">
            <service-graph-video v-if="this.$store.state.businessMonitor.currentItem === '实况/录像播放（国标接入）'" ref="serviceGraphVideo"></service-graph-video>
            <vcn v-if="this.$store.state.businessMonitor.currentItem === '实况/录像播放（VCN接入）'" ref="vcn"></vcn>
            <service-graph-others v-if="this.$store.state.businessMonitor.currentItem === '登录视综'" ref="serviceGraphOthers"></service-graph-others>

            <static-search v-if="this.$store.state.businessMonitor.currentItem === '静态比对'" ref="staticSearch"></static-search>
            <dynamic-search v-if="this.$store.state.businessMonitor.currentItem === '动态比对'" ref="dynamicSearch"></dynamic-search>
            <alarm-push v-if="this.$store.state.businessMonitor.currentItem === '告警推送'" ref="alarmPush"></alarm-push>
            <control v-if="this.$store.state.businessMonitor.currentItem === '人像布控'" ref="control"></control>
            <pc-login v-if="this.$store.state.businessMonitor.currentItem === 'PC登录'" ref="pcLogin"></pc-login>
            <app-login v-if="this.$store.state.businessMonitor.currentItem === 'APP登录'" ref="appLogin"></app-login>
          </a-col>
        </a-row>
      </a-modal>

    </div>
  <!-- </keep-active> -->
</template>

<script>
import echartsBar from "@/components/echartsBar";
import echartsPie from "@/components/echartsPie";
import echartsLine from "@/components/echartsLine";
import echartsSemicircle from '@/components/echartsSemicircle'
import firstLegend from '@/assets/img/serviceOverview/light_red_rect.png'
import secondLegend from '@/assets/img/serviceOverview/light_green_rect.png'
import thirdLegend from '@/assets/img/serviceOverview/light_blue_rect.png'
import forthLegend from '@/assets/img/serviceOverview/light_abnormal.png'
import alarmTips from '@/assets/img/serviceOverview/animate_red_icon.png'

import serviceGraphVideo from './video/serviceGraphVideo.vue'
import vcn from './video/vcn.vue'
import serviceGraphOthers from './others/serviceGraphOthers.vue'
import staticSearch from './city/staticSearch.vue'
import dynamicSearch from './city/dynamicSearch.vue'
import alarmPush from './city/alarmPush.vue'
import control from './city/control.vue'
import pcLogin from './city/pcLogin.vue'
import appLogin from './city/appLogin.vue'
import serviceTabsOthers from './serviceTabsOthers.vue'
export default {
  components: {
    echartsBar,
    echartsPie,
    echartsLine,
    echartsSemicircle,
    vcn,
    serviceGraphVideo,
    serviceGraphOthers,

    staticSearch, // 城市人像
    dynamicSearch,
    alarmPush,
    control,
    pcLogin,
    appLogin,

    serviceTabsOthers,
  },
  data() {
    return {
      view: 'a',
      // 主页面 业务图变量
      colArr: [0, 1, 2],
      alarmTips: alarmTips,
      centerLegend: [
        {
          name: '业务异常',
          iconName: 'light_red_rect.png',
          path: firstLegend
        },{
          name: '业务正常',
          iconName: 'light_green_rect.png',
          path: secondLegend
        },{
          name: '暂未纳管',
          iconName: 'light_blue_rect.png',
          path: thirdLegend
        },{
          name: '异常说明',
          iconName: 'light_abnormal.png',
          path: forthLegend
        }],
      
      timer: '', // 定时器
      timer1: '', // 计时器 循环获取数据
      timer2: '', // 计时器 循环获取数据

      fieldName: 'onlineUserNum',
      alarmType: 'a',

      isServerList: false, // 是否显示 服务清单弹框
      MYSQLData: [], // MySQL
      REDISData: [], // redis
      XHAAAAUTHData: [], // 鉴权服务
      MXHAAAGATEWEYData: [], // HTTP网关
      XHAAAXHLOGData: [], // 日志服务
      XHCASCADESTREAMSERVERData: [], // 流媒体
      XHGBGATEWAYSERVERData: [], // 国标网关
      XHVIDEOMAPINNERData: [], // 地图管理服务
      XPUSHSERVERData: [], // 推送服务

      videoResourceLoadData: {
        cpuUsedRate: 3,
        gpuUsedRate: 1200,
        memoryUsedRate: 1500,
        usedRate: 80
      },
      server: {
        cpuUsedRate: 100,
        gpuUsedRate: 80,
        memoryUsedRate: 2.8
      },
      progressData: {
        cpuNum: 5856,
        gpuNum: 622,
        memoryNum: 1024,
        storageNum: 4096,
        usedCpuNum: 256,
        usedGpuNum: 357,
        usedMemoryNum: 845,
        usedStorageNum: 856
      },
      serDis: {
        data1: this.random(800, 1000),
        data1Total: 3000,
        data2: this.random(90, 120),
        data2Total: 200,
        data3: this.random(70, 85),
        data3Total: 120,
        data4: this.random(20, 35),
        data4Total: 100,
        data5: this.random(70, 90),
        data5Total: 200,
        data6: this.random(40, 60),
        data6Total: 100,
        data7: this.random(1, 10),
        data7Total: 100,
        data8: this.random(1, 10),
        data8Total: 100,
        data9: this.random(14000, 15500),
        data9Total: 16000
      },
      statistical: {
        dataVal: [
          {
            id: "overviewHuan1",
            type: "huan", // 环状图
            total: 241,
            name: "总服务数",
            x: "50%",
            y: "center",
            center: ['25%', '52%'],
            position: "left",
            fontSize:'12',
            data: [
              {
                value: 6,
                name: "告警     6/2.5%",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              },
              {
                value: 235,
                name: "正常运行数     235/97.5%",
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
            id: 'nub1',
            name: '服务',
            percentageShow: false, // 是否显示百分比
            data: [
              {
                value: 6,
                name: '流媒体',
                color: '#82aeff'
              },
              {
                value: 26,
                name: '列表服务',
                color: '#45c9eb'
              },
              {
                value: 8,
                name: '矩阵服务',
                color: '#445fde'
              },
              {
                value: 8,
                name: 'xxx服务',
                color: '#82aeff'
              }
            ]
          },
          {
            id: 'overviewPie1',
            type: 'pie',
            name: '告警总数',
            center: ['25%', '52%'],
            radius: ['0%', '60%'],
            x: "50%",
            y: "center",
            position: 'left',
            data: [
              {
                value: 20,
                name: '流媒体     9.3%',
                itemStyle: {
                  normal: {
                    color: '#445fde'
                  }
                }
              },
              {
                value: 30,
                name: '转码服务     13.95%',
                itemStyle: {
                  normal: {
                    color: '#0eb4ce'
                  }
                }
              },
              {
                value: 18,
                name: '人像服务     8.37%',
                itemStyle: {
                  normal: {
                    color: '#277eef'
                  }
                }
              },
              {
                value: 15,
                name: '列表服务     6.89%',
                itemStyle: {
                  normal: {
                    color: '#82aeff'
                  }
                }
              },
              {
                value: 132,
                name: '其他     61.4%',
                itemStyle: {
                  normal: {
                    color: '#2392fd'
                  }
                }
              }
            ]
          },
          {
            id: "overviewHuan2",
            type: "huan", // 环状图
            total: 213,
            name: "服务器总数",
            center: ['25%', '52%'],
            x: "50%",
            y: "center",
            position: "left",
            fontSize:'12',
            data: [
              {
                value: 6,
                name: "告警      6",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              },
              {
                value: 207,
                name: "正常运行数      207",
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
            id: 'overViewPie2',
            type: 'pie',
            name: '服务器分布',
            radius: ['0%', '80%'],
            center: ['25%', '52%'],
            x: "50%",
            y: "center",
            position: 'left',
            data: [
              {
                value: 148,
                name: '专网     148台',
                itemStyle: {
                  normal: {
                    color: '#45c9eb'
                  }
                }
              },
              {
                value: 61,
                name: '公安网     61台',
                itemStyle: {
                  normal: {
                    color: '#445fde'
                  }
                }
              },
              {
                value: 4,
                name: '政务外网     4台',
                itemStyle: {
                  normal: {
                    color: '#82aeff'
                  }
                }
              }
            ]
          }
        ],
        chartData1: {
          name: "chart9",
          type: "bar-line",
          color: ["#db8223", "#82aeff"],
          nameArr: ['今日负载', '昨日负载'],
          nameList: [],
          data1: [],
          data2: [],
          time: (new Date()).getTime()
        },
        chartData2: {
          name: "chart10",
          type: "bar-line",
          color: ["#db8223", "#82aeff"],
          nameArr: ['CPU占用率', '内存占用率'],
          position: {
            top: '15%',
            right: '5%',
            left: '12%',
            bottom: '15%'
          },
          nameList: [],
          data1: [],
          data2: [],
          time: (new Date()).getTime()
        },
        chartData3: {
          name: "chart11",
          type: "bar-line",
          color: ["#db8223", "#82aeff"],
          nameArr: ['磁盘占用率', '网络负载'],
          position: {
            top: '15%',
            right: '5%',
            left: '12%',
            bottom: '15%'
          },
          nameList: [],
          data1: [],
          data2: [],
          time: (new Date()).getTime()
        }
      },
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
    // 获取连线的坐标位置
    // this.getAllArrowPostion()

    // 获取列表服务数据 1分钟获取一次
    this.serverState()
    this.timer1 = setInterval(() => {
      this.serverState()
    }, 60000)

    // 折线统计图数
    this.brokenStatistics()

    // 服务类型分布 3秒动态改变数值
    this.timer1 = setInterval(() => {
      this.serDis = {
        data1: this.random(800, 1000),
        data1Total: 3000,
        data2: this.random(90, 120),
        data2Total: 200,
        data3: this.random(70, 85),
        data3Total: 120,
        data4: this.random(20, 35),
        data4Total: 100,
        data5: this.random(70, 90),
        data5Total: 200,
        data6: this.random(40, 60),
        data6Total: 100,
        data7: this.random(1, 10),
        data7Total: 100,
        data8: this.random(1, 10),
        data8Total: 100,
        data9: this.random(14000, 15500),
        data9Total: 16000
      }
    }, 3000)
  },
  methods: {
    // G6 业务图G6弹框 切换tab
    handleTabsChangeItem(val) {
      let self = this
      Object.keys(self.$store.state.businessMonitor.centerData).forEach((key) => {
        self.$store.state.businessMonitor.centerData[key].forEach((item, index) => {
          if(item.title + '服务' === self.$store.state.businessMonitor.serviceTitle) {
            self.$store.state.businessMonitor.currentItem = item.service[val].name
          }
        })
      })
    },
    // G6 点击业务列表 打开业务图G6弹框
    openFirstColGraph(val) {
        let self = this
        self.$store.commit('businessMonitor.changeServiceTitle', '')
        self.$store.commit('businessMonitor.changeTabsVal', [])
        self.$store.commit('businessMonitor.changeCurrentItem', val.name)
        Object.keys(self.$store.state.businessMonitor.centerData).forEach((key) => {
            self.$store.state.businessMonitor.centerData[key].forEach((item, index) => {
            if(item.service[0].model === val.model) {
                self.$store.commit('businessMonitor.changeServiceTitle', item.title + '服务')
                self.$store.commit('businessMonitor.changeTabsCol', item.tabsCol)
                self.$store.commit('businessMonitor.changeTabsVal', [{
                    name: val.name,
                    key: '0',
                }])
            }
            })
        })
        self.$store.commit('businessMonitor.changeIsOthers', true)
        // self.serviceTitle = '';
        // self.tabsVal = [] // 给弹框中的tabs赋值
        // self.currentItem = val.name; // 当前tab对应的流程图
        // Object.keys(self.centerData).forEach((key) => {
        //     self.centerData[key].forEach((item, index) => {
        //     if(item.service[0].model === val.model) {
        //         self.serviceTitle = item.title + '服务';
        //         self.tabsCol = item.tabsCol;
        //         self.tabsVal.push({
        //         name: val.name,
        //         key: '0',
        //         })
        //     }
        //     })
        // })
        // this.isOthers = true
    },

    // 关闭 业务图G6弹框
    closeFirstColGraph() {
      this.$store.state.businessMonitor.isOthers = false
    },

    // 打开弹框 服务清单
    onShowServiceList(val) {
      // const self = this
      // clearTimeout(self.timer)
      // self.timer = setTimeout(() => {
      //   this.isServerList = true
      //   // self.$nextTick(() => {
      //   //   if (self.$refs.serveNewsDesktop) {
      //   //     self.$refs.serveNewsDesktop.init(val)
      //   //   }
      //   // })
      // }, 300)
    },
    goUrl(url, val) {
      let self = this
      if (val === 0) {
        self.$store.commit('businessMonitor.changeServeListType', 1) // 点击服务清单 默认进入到 1:数据库服务
        self.$store.commit('businessMonitor.changeCurrentServeListType', 1) // 当前服务列表类型
      } else {
        self.$store.commit('businessMonitor.changeServeListType', 7) // 点击服务器清单 7:服务器服务
        self.$store.commit('businessMonitor.changeCurrentServeListType', 7) // 当前服务列表类型
      }
      self.$router.push(url)
    },

    // 获取不同列表服务数据
    serverState() {
      this.getServerInfoData('MYSQL')
      this.getServerInfoData('REDIS')
      this.getServerInfoData('XH-AAA-AUTH')
      this.getServerInfoData('XH-AAA-GATEWEY')
      this.getServerInfoData('XH-AAA-XHLOG')
      this.getServerInfoData('XHCASCADESTREAMSERVER')
      this.getServerInfoData('XHGBGATEWAYSERVER')
      this.getServerInfoData('XHVIDEOMAPINNER')
      this.getServerInfoData('XPUSHSERVER')
    },

    // 关闭服务信息弹框
    closeServerList() {
      const self = this
      this.isServerList = false
    },
    // 折线图各个类型切换
    brokenDataShow() {
      let timeArr = []
      let timeArr2 = []
      let data1 = []
      let data2 = []
      this.nowStatisticsData.forEach(item => {
        data2.push(item[this.fieldName])
        timeArr2.push(item.createTime)
      })
      this.yesterDayStatisticsData.forEach(item => {
        data1.push(item[this.fieldName])
        timeArr.push(item.createTime)
      })
      this.statistical.chartData1.nameList = timeArr
      this.statistical.chartData1.data1 = data1
      this.statistical.chartData1.data2 = data2
      this.statistical.chartData1.time = (new Date()).getTime()

      this.statistical.chartData2.nameList = timeArr2
      this.statistical.chartData2.data1 = data1
      this.statistical.chartData2.data2 = data2
      this.statistical.chartData2.time = (new Date()).getTime()

      this.statistical.chartData3.nameList = timeArr2
      this.statistical.chartData3.data1 = data1
      this.statistical.chartData3.data2 = data2
      this.statistical.chartData3.time = (new Date()).getTime()
    },
    // 随机数
    random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    // 实时告警 切换全部、服务、服务器
    changeRadio() {},

    /****** 数据获取 *****/
    // 获取列表服务数据
    async getServerInfoData(val) {
      const self = this
      let param = {
        serverCode: val,
        serverIp: '',
        switchIp: ''
      }
      const data = await this.$postAxios('/api/server/getServerInfo', param)

      let statusData = ''
      data.map(item => {
        item.serverPosition = item.machineRoom + ' ' + item.machinePosition
        if(item.checkStatus != '正常') {
          statusData += '2'
        } else {
          statusData += '1'
        }
      })

      switch (val) {
        case 'MYSQL':
          self.MYSQLData = data
          break;
        case 'REDIS':
          self.REDISData = data
          break;
        case 'XH-AAA-AUTH':
          self.XHAAAAUTHData = data
          break;
        case 'XH-AAA-GATEWEY':
          self.MXHAAAGATEWEYData = data
          break;
        case 'XH-AAA-XHLOG':
          self.XHAAAXHLOGData = data
          break;
        case 'XHCASCADESTREAMSERVER':
          self.XHCASCADESTREAMSERVERData = data
          break;
        case 'XHGBGATEWAYSERVER':
          self.XHGBGATEWAYSERVERData = data
          break;
        case 'XHVIDEOMAPINNER':
          self.XHVIDEOMAPINNERData = data
          break;
        case 'XPUSHSERVER':
          self.XPUSHSERVERData = data
          break;
        default:
          break;
      }

      // 异常效果添加
      this.$nextTick(() => {
        if (statusData.indexOf('2') > -1) {
          $(`[data-code="${val}"]`).addClass('css-flicker')
        } else {
          if ($(`[data-code="${val}"]`).hasClass('css-flicker')) {
            $(`[data-code="${val}"]`).removeClass('css-flicker')
          }
        }
      })
    },
    // 折线统计图
    async brokenStatistics() {
      const nowData = await this.$axios('/api/homePage/getTrendStatistics', {
        orgId: 10,
        pageNum: 1,
        pageSize: 100,
        startTime: this.$common.getTimeStamp(),
        endTime: (new Date()).getTime(),
        neb: 1111
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
      this.fieldName = 'onlineUserNum'

      this.brokenDataShow()
    },
  },
  destroyed() {
    clearInterval(this.timer1)
    clearInterval(this.timer2)
  },
};
</script>

<style lang="scss" scoped>
.server {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem .5rem 1rem;
  box-sizing: border-box;
  user-select: none;
  .list-title>.list-title-name {
    padding: 0 !important;
  }
  .wrap-sidebar-left {
    .css-left-1 {
      .css-pieMsg {
        height: calc(100% - 8rem);
      }
    }
    .css-left-2 {
      overflow: hidden;
      height: 100%;
      > .css-pieMsg {
        height: calc(45% - 40px);
        max-height: 230px;
      }
      > ul {
        display: flex;
        flex-direction: column;
        overflow: auto;
        padding-bottom: 10px;
        height: calc(100% - 40px);
        > li {
          flex: 1;
          display: flex;
          margin-bottom: 0.71rem;
          overflow: hidden;
          > span:first-child {
            flex: 30;
          }
          > span:last-child {
            flex: 56;
          }
          > span:nth-of-type(2) {
            flex: 30;
          }
          &:nth-of-type(1){
            > span:first-child {
              flex: 25;
              padding-top: 4px;
              padding-left: 5px;
            }
            span:nth-of-type(2) {
              flex: 56;
              padding-top: 4px;
            }
            > span:last-child {
              flex: 19;
              text-align: right;
            }
          }
        }
        > li:last-child {
          margin: 0;
        }
      }

    }
    .css-left-3 {
      height: 100%;
      .css-pieMsg {
        height: calc(100% - 40px);
      }
    }
  }
  .wrap-sidebar-center {
    padding: 0;
    // 中间拓扑结构图
    .css-architecture {
      position: relative;
      width: 100%;
      height: 100%;
      font-size: 12px;
      border: 2px solid $theme-button;
      background: $theme-select;
      border-radius: 10px;
      overflow: hidden;
      span {
        font-size: 12px;
      }
    }
    .css-pieMsg {
      height: calc(100% - 4rem);
    }
  }
  .wrap-sidebar-right {
    .css-right-1 {
      .css-pieMsg {
        height: calc(100% - 8rem);
      }
    }
    .css-right-2 {
      height: 100%;
      & .css-pieMsg {
        height: calc(calc(100% - 40px) / 3);
      }
      & .css-pieMsg:nth-of-type(1){
        max-height: 200px;
      }
    }
    .css-right-3 {
      height: 100%;
      > p.css-tag {
        text-align: right;
        margin-bottom: .5rem;
      }
      & .css-listMsg {
        height: calc(100% - 4rem);
        overflow: auto;
        > ul {
          height: 100%;
          display: flex;
          flex-direction: column;
          // justify-content: center;
          & li {
            display: flex;
            justify-content: center;
            border-bottom: 1px solid #3d586f;
            padding: 0 0.5%;
            line-height: 1.8rem;
            & span:first-child{
              flex: 5;
            }
            & span:last-child{
              flex: 1;
            }
          }
        }
      }
    }
  }
}

.css-childBg {
  opacity: 1;
  padding: 0 1rem;
  box-sizing: border-box;
  height: 100%;
}

.css-flicker {
  animation-name: flicker;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes flicker {
  from {
    background: url('~@/assets/img/ic_btn three width_dark_red.png') no-repeat center;
  }
  to {
    background: url('~@/assets/img/ic_btn three width_dark.png') no-repeat center;
  }
}

.css-left-2 {
  .ant-progress-text{
    display: inline-block;
    color: $theme-font;
  }
  .ant-progress-show-info .ant-progress-outer {
    margin-right: calc(-2em - 8px);
    padding-right: calc(2em + 8px);
  }
}



#service-overview {
  .wrap-sidebar-center {
    .wrap-card {
      background: transparent;
      .css-architecture {
        // background: url('~@/assets/img/serviceOverview/large_bg.png') no-repeat center;
        background-size: calc(100% - 1.5rem) calc(100% - 1.5rem);
        .center-legend {
          text-align: right;
          margin-top: 2.5rem;
          margin-right: 3.5rem;
          li {
            display: inline-block;
            margin-left: 1.1875rem;
            font-size: 0.875rem;
          }
          .center-legend-png {
            height: 1rem;
            width: 1rem;
            margin-right: 0.25rem;
          }
        }
        .service-box {
          margin-left: 4% !important;
          .center-col {
            padding-top: 0rem !important;
          }
          .service-box-list {
            text-align: center;
            background: url('~@/assets/img/serviceOverview/hori_vert_total.png') no-repeat center;
            background-size: calc(100% - 1.5rem) calc(100% - 1.5rem);
            border: 1px solid transparent;
            .service-box-content {
              margin-left: 12%;
              margin-right: 10%;
              .service-box-title {
                height: 31px;
                line-height: 31px;
                // font-family: '优设标题黑';
                font-family: '方正综艺简体';
                font-weight: 400;
                color: #FFF;
                text-align: left;
                margin-top: 2.5rem;
                margin-bottom: 2rem;
                span {
                  font-size: 24px;
                }
                img {
                  display: block;
                }
              }
              li {
                font-size: 14px;
                background: url('~@/assets/img/serviceOverview/normal_blue-bg.png') no-repeat center;
                background-size: 100% 100%;
                height: 2.4375rem;
                line-height: 2.4375rem;
                text-align: left;
                padding-left: 0.625rem;
                margin-bottom: 0.5rem;
                cursor: pointer;
                &:last-child {
                  margin-bottom: 1.8125rem;
                }
                span {
                  font-size: 14px;
                }
                .breathe-btn {
                  position: relative;
                  float: right;
                  padding: 0;
                  margin: 0 !important;
                  width: 8px;
                  height: 8px;
                  top: 50%;
                  transform: translate(-150%, -50%);
                  margin: 40px auto;
                  line-height: 40px;
                  border: 1px solid #2b92d4;
                  border-radius: 5px;
                  color: #fff;
                  font-size: 20px;
                  text-align: center;
                  cursor: pointer;
                  box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
                  overflow: hidden;
                  background-image: -webkit-gradient(linear, left top, left bottom, from(#6cc3fe), to(#21a1d0));
                  animation-timing-function: ease-in-out;
                  animation-name: breathe;
                  animation-duration: 2700ms;
                  animation-iteration-count: infinite;
                  animation-direction: alternate;
                }
                @keyframes breathe {
                  0% {
                    opacity: .2;
                    box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
                  }
                  100% {
                    opacity: 1;
                    border: 1px solid rgba(59, 255, 255, 1);
                    box-shadow: 0 1px 20px rgba(59, 255, 255, 1);
                  }
                }
                .breathe-alarm-btn {
                  position: relative;
                  float: right;
                  padding: 0;
                  margin: 0 !important;
                  width: 8px;
                  height: 8px;
                  top: 50%;
                  transform: translate(-150%, -50%);
                  margin: 40px auto;
                  line-height: 40px;
                  border: 1px solid #d62828;
                  border-radius: 5px;
                  color: #fff;
                  font-size: 20px;
                  text-align: center;
                  cursor: pointer;
                  box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
                  overflow: hidden;
                  background-image: -webkit-gradient(linear, left top, right bottom, from(#d62828), to(#d00000));
                  animation-timing-function: ease-in-out;
                  animation-name: breathealarm;
                  animation-duration: 2700ms;
                  animation-iteration-count: infinite;
                  animation-direction: alternate;
                }
                @keyframes breathealarm {
                  0% {
                    opacity: .3;
                    box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
                  }
                  100% {
                    opacity: 1;
                    border: 1px solid #dc2f02;
                    box-shadow: 0 1px 20px #ff1515;
                  }
                }
                .alarm-tips {
                  float: right;
                  transform: translate(60%, -30%);
                  // background: url('~@/assets/img/serviceOverview/alarm_animate.png') no-repeat center !important;
                }
              }
              .alarm-bg {
                background: url('~@/assets/img/serviceOverview/animate_red_bg.png') no-repeat center;
                background-size: 100% 100%;
              }

            }
          }
        }
        
      }
    }
  }
}

.service-tabs-col {
  background: #001120;
}

</style>
<style lang="scss">
// 设置弹框 服务清单  高度自适应
#monitor-server-list {
  height: 100%;
  .ant-modal-wrap  {
    height: 100%;
    .ant-modal {
      height: 93.75%;
      top: 3.125%;
      padding-bottom: 0px;
      .ant-modal-content {
        height: 100%;
        .ant-modal-body {
          height: calc(100% - 50px);
        }
      }
    }
  }
}
</style>

