<template>
  <div id="serverList">
    <div class="sticky-bar">
      <button @click="goBack()">返回</button>
    </div>
    <div class="wrap-sidebar wrap-sidebar-left">
      <div class="wrap-card wrap-card-100">
        <div class="list-box">
          <div class="list-title">
            <span class="list-title-name">服务列表</span>
          </div>
          <div class="list-content">
            <a-select v-model="leftListSelectVal" placeholder="请选择" @change="onChangeLeftServe">
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
              <p>共计：{{leftServerList.length}}条</p>
              <p v-if="relateServe">{{leftSelectName}} 已运行如下服务</p>
            </div>
            <div class="relate-title" v-if="relateServe">
              <a-tooltip placement="top">
                <template slot="title">{{rightListName}} 运行服务</template>
                <span class="name">{{rightListName}}</span>
              </a-tooltip>
              <a-tooltip placement="top">
                <template slot="title">{{rightListName}} 运行服务</template>
                <span class="type">运行服务</span>
              </a-tooltip>
              <a-icon type="close-circle" @click="onCloseRelateServe"/>
            </div>
            <ul :class="relateServe ? 'relate-ul' : ''">
              <li :class="isLeftActiveIndex === index ? 'active' : ''" v-for="(item, index) in leftServerList" :key="index" @click='onSelectLeftServe(item, index)'>
                <a-tooltip placement="right">
                  <template slot="title">{{item.name}}</template>
                  <span :class="item.status === 0 ? 'alarm' : ''">{{item.name}}</span>
                </a-tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 1:数据库 7:服务器 -->
    <div class="wrap-sidebar wrap-sidebar-center" v-if="this.$store.state.businessMonitor.serveListType === 1 || this.$store.state.businessMonitor.serveListType === 5 || this.$store.state.businessMonitor.serveListType === 7">
      <div class="wrap-card wrap-card-push wrap-card-72">
        <div class="css-architecture">
          <div class="css-div center-first-col">
            <div class="base-info css-state css-state-database">
              <div class="list-title">
                <span class="list-title-name">基本信息</span>
              </div>
              <div class="base-info-detail">
                <!-- <div>基本信息</div> -->
                <p v-for="(item, index) in baseInfoList" :key="index" class="base-info-item">
                  <span>{{item.title}}：</span>
                  <span>{{item.content}}</span>
                </p>
                <p class="history-change">
                  <span>历史变更：</span>
                  <span>{{changeList.length}}次</span>
                </p>
                <ul>
                  <li v-for="(item, index) in changeList" :key="index">{{index + 1}}、{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="base-info css-playAdrr css-playAdrr-database">
              <div class="list-title">
                <span class="list-title-name">实时告警</span>
                <a-button class="js-centerProp" size="small" data-title="历史告警">历史告警</a-button>
              </div>
              <a-row>
                <a-col :class="'alarm-col-'+index" :span="6" v-for="(item, index) in alarmCountList" :key="index">
                  <div class="alarm-item">
                    <p>{{item.title}}</p>
                    <p>{{item.num}}</p>
                  </div>
                </a-col>
              </a-row>
              <div class="alarm-list">
                <ul>
                  <li v-for="(item, index) in alarmList" :key="index">{{index + 1}}、{{item}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="css-div center-second-col">
            <div class="realtime-state">
              <div class="list-title">
                <span class="list-title-name">实时状态</span>
              </div>
              <div class="progress" v-if="this.$store.state.businessMonitor.serveListType === 1 || this.$store.state.businessMonitor.serveListType === 5">
                <div class="subtitle">实时负载</div>
                <div>
                  <a-progress 
                  class="realtime-progress" 
                  :percent="90" 
                  :success-percent="80" 
                  :show-info="true" 
                  :stroke-color="{from: 'orange',to: '#d00000',}"
                  status="active"></a-progress>
                </div>
                <div class="progress-des">
                  <span>{{this.$store.state.businessMonitor.serveListType === 1 ? '实时执行数 900' : '实时推送量 900'}}</span>
                  <span class="max-num">{{this.$store.state.businessMonitor.serveListType === 1 ? '最大执行数 1000' : '最大推送量 1000'}}</span>
                </div>
              </div>
              <a-row class="realtime-model">
                <a-col :span="6">
                  <div :class="['first', lineIndex === 1 ? 'active' : '']" @click="onChangeLine(1)">
                    <span>CPU占用率</span>
                    <span>10%</span>
                  </div>
                </a-col>
                <a-col :span="6">
                  <div :class="['second', lineIndex === 2 ? 'active' : '']" @click="onChangeLine(2)">
                    <span>内存占用</span>
                    <span>89MB</span>
                  </div>
                </a-col>
                <a-col :span="6">
                  <div  :class="['third', lineIndex === 3 ? 'active' : '']" @click="onChangeLine(3)">
                    <span>网络宽带占用</span>
                    <span>10mbps</span>
                  </div>
                </a-col>
                <a-col :span="6">
                  <div :class="['forth', lineIndex === 4 ? 'active' : '']" @click="onChangeLine(4)">
                    <span>句柄数占用</span>
                    <span>90个</span>
                  </div>
                </a-col>
              </a-row>
              <div :class="['css-line', 'css-line-database', this.$store.state.businessMonitor.serveListType === 7 ? 'css-line-servers' : '']">
                <div class="title">{{lineName}}</div>
                <div class="unit">{{lineUnit}}</div>
                <echarts-line :chartData="responseLineData"></echarts-line>
              </div>
              <div class="css-line thread-line css-line-database"  v-if="this.$store.state.businessMonitor.serveListType !== 5">
                <div class="title">{{this.$store.state.businessMonitor.serveListType === 1 ? '请求次数 （累计量）' : '句柄数'}}</div>
                <div class="unit">{{this.$store.state.businessMonitor.serveListType === 1 ? '单位: 次' : '单位: 个'}}</div>
                <echarts-line :chartData="threadLine"></echarts-line>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-card wrap-card-line wrap-card-28">
        <div class="css-centent">
          <div class="list-title">
            <span class="list-title-name">{{centerBottomTitle}}</span>
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
            <echarts-line v-if="showLine===true" :chartData="statistical.chartData"></echarts-line>
            <!-- <echarts-bar v-else :chartData="statistical.chartData1"></echarts-bar> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 2:国标接入网关 国标共享网关 4:其他java通用-->
    <div class="wrap-sidebar wrap-sidebar-center" v-if="this.$store.state.businessMonitor.serveListType === 2 || this.$store.state.businessMonitor.serveListType === 4">
      <div class="wrap-card wrap-card-top24 wrap-card-100">
        <div class="css-architecture">
          <div class="css-div center-first-col">
            <div class="base-info css-state css-state-gateway">
              <div class="list-title">
                <span class="list-title-name">基本信息</span>
              </div>
              <div class="base-info-detail">
                <!-- <div>基本信息</div> -->
                <p v-for="(item, index) in baseInfoList" :key="index" class="base-info-item">
                  <span>{{item.title}}：</span>
                  <span>{{item.content}}</span>
                </p>
                <p class="history-change">
                  <span>历史变更：</span>
                  <span>{{changeList.length}}次</span>
                </p>
                <ul>
                  <li v-for="(item, index) in changeList" :key="index">{{index + 1}}、{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="base-info css-playAdrr css-playAdrr-gateway">
              <div class="list-title">
                <span class="list-title-name">实时告警</span>
                <a-button class="js-centerProp" size="small" data-title="历史告警">历史告警</a-button>
              </div>
              <a-row>
                <a-col :class="'alarm-col-'+index" :span="6" v-for="(item, index) in alarmCountList" :key="index">
                  <div class="alarm-item">
                    <p>{{item.title}}</p>
                    <p>{{item.num}}</p>
                  </div>
                </a-col>
              </a-row>
              <div class="alarm-list">
                <ul>
                  <li v-for="(item, index) in alarmList" :key="index">{{index + 1}}、{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="base-info css-playAdrr css-playAdrr-gateway">
              <div class="list-title">
                <span class="list-title-name">{{leftBottomTitle}}</span>
              </div>
              <div class="css-line report-data">
                <!-- <div class="title">请求次数 （累计量）</div>
                <div class="unit">单位: 次</div> -->
                <echarts-line :chartData="reportLineGateway"></echarts-line>
              </div>
            </div>
          </div>
          <div class="css-div center-second-col center-second-col-gateway">
            <div class="realtime-state realtime-state-gateway">
              <div class="list-title">
                <span class="list-title-name">实时状态</span>
              </div>
              <div class="progress">
                <div class="subtitle">实时负载</div>
                <div>
                  <a-progress 
                  class="realtime-progress" 
                  :percent="90" 
                  :success-percent="80" 
                  :show-info="true" 
                  :stroke-color="{from: 'orange',to: '#d00000',}"
                  status="active"></a-progress>
                </div>
                <div class="progress-des">
                  <span>实时{{leftBottomTitle}} 900</span>
                  <span class="max-num">最大{{leftBottomTitle}} 1000</span>
                </div>
              </div>
              <a-row class="realtime-model realtime-model-gateway">
                <a-col :span="6">
                  <div :class="['first', lineIndex === 1 ? 'active' : '']" @click="onChangeLine(1)">
                    <span>CPU占用率</span>
                    <span>10%</span>
                  </div>
                </a-col>
                <a-col :span="6">
                  <div :class="['second', lineIndex === 2 ? 'active' : '']" @click="onChangeLine(2)">
                    <span>内存占用</span>
                    <span>89MB</span>
                  </div>
                </a-col>
                <a-col :span="6">
                  <div  :class="['third', lineIndex === 3 ? 'active' : '']" @click="onChangeLine(3)">
                    <span>网络宽带占用</span>
                    <span>10mbps</span>
                  </div>
                </a-col>
                <a-col :span="6">
                  <div :class="['forth', lineIndex === 4 ? 'active' : '']" @click="onChangeLine(4)">
                    <span>句柄数占用</span>
                    <span>90个</span>
                  </div>
                </a-col>
              </a-row>
              <div class="css-line cpu-line-gateway">
                <div class="title">{{lineName}}</div>
                <div class="unit">{{lineUnit}}</div>
                <echarts-line :chartData="responseLineData"></echarts-line>
              </div>
              <div class="css-line response-line-gateway">
                <div class="title">{{this.$store.state.businessMonitor.serveListType === 2 ? '响应时长' : '线程数'}}</div>
                <div class="unit">{{this.$store.state.businessMonitor.serveListType === 2 ? '单位: 秒' : '单位: 次'}}</div>
                <echarts-line :chartData="responseLineGateway"></echarts-line>
              </div>
              <div class="css-line request-line-gateway">
                <div class="title">{{this.$store.state.businessMonitor.serveListType === 2 ? '请求次数 （累计量）' : '响应时长'}}</div>
                <div class="unit">{{this.$store.state.businessMonitor.serveListType === 2 ? '单位: 次' : '单位: 秒'}}</div>
                <echarts-line :chartData="threadLine"></echarts-line>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 3:流媒体 -->
    <div class="wrap-sidebar wrap-sidebar-center" v-if="this.$store.state.businessMonitor.serveListType === 3">
      <div class="wrap-card wrap-card-top24 wrap-card-100">
        <div class="css-architecture">
          <div class="css-div center-first-col">
            <div class="base-info css-state css-state-gateway">
              <div class="list-title">
                <span class="list-title-name">基本信息</span>
              </div>
              <div class="base-info-detail">
                <p v-for="(item, index) in baseInfoList" :key="index" class="base-info-item">
                  <span>{{item.title}}：</span>
                  <span>{{item.content}}</span>
                </p>
                <p class="history-change">
                  <span>历史变更：</span>
                  <span>{{changeList.length}}次</span>
                </p>
                <ul>
                  <li v-for="(item, index) in changeList" :key="index">{{index + 1}}、{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="base-info css-playAdrr css-playAdrr-gateway">
              <div class="list-title">
                <span class="list-title-name">实时告警</span>
                <a-button class="js-centerProp" size="small" data-title="历史告警">历史告警</a-button>
              </div>
              <a-row>
                <a-col :class="'alarm-col-'+index" :span="6" v-for="(item, index) in alarmCountList" :key="index">
                  <div class="alarm-item">
                    <p>{{item.title}}</p>
                    <p>{{item.num}}</p>
                  </div>
                </a-col>
              </a-row>
              <div class="alarm-list">
                <ul>
                  <li v-for="(item, index) in alarmList" :key="index">{{index + 1}}、{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="base-info css-playAdrr css-playAdrr-gateway">
              <div class="list-title">
                <span class="list-title-name">转发数</span>
              </div>
              <div class="css-line report-data">
                <!-- <div class="title">请求次数 （累计量）</div>
                <div class="unit">单位: 次</div> -->
                <echarts-line :chartData="reportLineGateway"></echarts-line>
              </div>
            </div>
          </div>
          <div class="css-div center-second-col center-second-col-gateway">
            <div class="realtime-state realtime-state-gateway">
              <div class="list-title">
                <span class="list-title-name">实时状态</span>
              </div>
              <div class="progress">
                <div class="subtitle">实时负载</div>
                <div>
                  <a-progress 
                  class="realtime-progress" 
                  :percent="90" 
                  :success-percent="80" 
                  :show-info="true" 
                  :stroke-color="{from: 'orange',to: '#d00000',}"
                  status="active"></a-progress>
                </div>
                <div class="progress-des">
                  <span>实时转发数 900</span>
                  <span class="max-num">最大转发数 1000</span>
                </div>
              </div>
              <a-row class="realtime-model realtime-model-stream">
                <a-col :span="16">
                  <div class="realtime-load">
                    <div class="title">实时负载</div>
                    <div class="css-pieMsg">
                      <echarts-pie :dataVal="streamPieData"></echarts-pie>
                    </div>
                  </div>
                </a-col>
                <a-col :span="8">
                  <div class="realtime-load">
                    <div class="title">实时拉流</div>
                    <div class="content">
                      <div class="content-des">实时拉流数</div>
                      <div class="content-num">
                        <span>400</span>
                        <span>路</span>
                      </div>
                    </div>
                  </div>
                </a-col>
              </a-row>
              <a-row class="realtime-model realtime-model-gateway realtime-model-row">
                <a-col :span="6">
                  <div :class="['first', lineIndex === 1 ? 'active' : '']" @click="onChangeLine(1)">
                    <span>CPU占用率</span>
                    <span>10%</span>
                  </div>
                </a-col>
                <a-col :span="6">
                  <div :class="['second', lineIndex === 2 ? 'active' : '']" @click="onChangeLine(2)">
                    <span>内存占用</span>
                    <span>89MB</span>
                  </div>
                </a-col>
                <a-col :span="6">
                  <div  :class="['third', lineIndex === 3 ? 'active' : '']" @click="onChangeLine(3)">
                    <span>网络宽带占用</span>
                    <span>10mbps</span>
                  </div>
                </a-col>
                <a-col :span="6">
                  <div :class="['forth', lineIndex === 4 ? 'active' : '']" @click="onChangeLine(4)">
                    <span>句柄数占用</span>
                    <span>90个</span>
                  </div>
                </a-col>
              </a-row>
              <div class="css-line cpu-line-gateway">
                <div class="title">{{lineName}}</div>
                <div class="unit">{{lineUnit}}</div>
                <echarts-line :chartData="responseLineData"></echarts-line>
              </div>
              <div class="css-line response-line-gateway">
                <div class="title">响应时长</div>
                <div class="unit">单位: 秒</div>
                <echarts-line :chartData="responseLineGateway"></echarts-line>
              </div>
            </div>
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
              <p>共计：{{rightServerList.length}}条</p>
            </div>
            <div class="relate-title" v-if="relateServers">
              <a-tooltip placement="top">
                <template slot="title">{{leftListName}} 所在服务器</template>
                <span class="name name-right">{{leftListName}}</span>
              </a-tooltip>
              <a-tooltip placement="top">
                <template slot="title">{{leftListName}} 所在服务器</template>
                <span class="type type-right">所在服务器</span>
              </a-tooltip>
              <a-icon type="close-circle" @click="onCloseRelateServers"/>
            </div>
            <ul :class="relateServers ? 'relate-ul' : ''">
              <li :class="isRightActiveIndex === index ? 'active' : ''" v-for="(item, index) in rightServerList" :key="index" @click='onSelectRightServers(item, index)'>
                <a-tooltip placement="right">
                  <template slot="title">{{item}}</template>
                  <span>{{item}}</span>
                </a-tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import echartsBar from "@/components/echartsBar";
import echartsPie from "@/components/echartsPie";
import echartsLine from "@/components/echartsLine";
export default {
  computed: {
    // ...mapGetters({
    //   serveListType: "serveListType",
    //   echartsColor: "echartsColor",
    // }),
    // serveListType () {
    //   return this.$store.state.businessMonitor.serveListType
    // }
  },
  components: {
    echartsBar,
    echartsPie,
    echartsLine
  },
  computed: {
    classOption() {
      return {
        step: 1.9
      };
    }
  },
  data() {
    return {
      // 左侧服务列表数据
      leftListSelect: [], // 服务下拉框数据
      leftListSelectVal: '5', // 服务下拉框选中
      leftSelectName: '', // 下拉框选中名称
      leftListSearchVal: '', // 输入查询条件
      leftServerList: [], // 0：告警（红色） 1： 正常
      leftServerListOrigin: [], // 0：告警（红色） 1： 正常
      relateServe: false, // 左侧是否显示右侧服务器对应的服务
      leftListName: '', // 列表选中名称
      isLeftActiveIndex: -1, // 当前高亮的条目
      // 右侧 服务器列表数据
      rightListSelect: [], // 服务器下拉框数据
      rightListSelectVal: '', // 服务器下拉框选中
      rightListSearchVal: '', // 输入查询条件
      rightServerList: [], // 服务器展示的列表 包含： 左侧不选择、左侧选择 2种方案
      rightServerListOrigin: [], // 服务器列表的全部数据
      relateServers: false, // 右侧是否显示左侧服务对应的服务器
      rightListName: '', // 列表选中名称
      isRightActiveIndex: -1, // 当前高亮的条目
      baseInfoList: [], // 基本信息数据
      changeList: [], // 变动记录数据
      // 告警数据
      alarmCountList: [
        {
          title: '告警总数',
          num: 40,
        },
        {
          title: '一级告警',
          num: 16,
        },
        {
          title: '二级告警',
          num: 18,
        },
        {
          title: '三级告警',
          num: 26,
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
      lineName: 'CPU占用率', // 折线标题
      lineUnit: '单位：%', // 折线单位
      responseLineData: {
        name: "responseLine1",
        type: "one-line-alarm",
        color: ["#82aeff"],
        nameArr: ['CPU占用率'],
        nameList: ["00:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
        data1: [20,94, 20, 30, 50, 80 ,22 , 65 , 89,30, 64],
        time: (new Date()).getTime()
      },
      responseLine: [
        {
          name: "responseLine1",
          type: "one-line-alarm",
          color: ["#82aeff"],
          nameArr: ['CPU占用率'],
          nameList: ["00:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
          data1: [20,94, 20, 30, 50, 80 ,22 , 65 , 89,30, 64],
          time: (new Date()).getTime()
        },{
          name: "responseLine2",
          type: "one-line-alarm",
          color: ["#82aeff"],
          nameArr: ['内存占用'],
          nameList: ["00:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
          data1: [89,90, 100, 500, 50, 10 ,22 , 100 , 155,0, 64],
          time: (new Date()).getTime()
        },{
          name: "responseLine3",
          type: "one-line-alarm",
          color: ["#82aeff"],
          nameArr: ['网络宽带占用'],
          nameList: ["00:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
          data1: [10,90, 60, 30, 50, 10 ,22 , 65 , 89,0, 64],
          time: (new Date()).getTime()
        },{
          name: "responseLine4",
          type: "one-line-alarm",
          color: ["#82aeff"],
          nameArr: ['句柄数占用'],
          nameList: ["00:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
          data1: [35,85, 76, 44, 50, 10 ,22 , 68 , 99,24, 64],
          time: (new Date()).getTime()
        },
      ],
      threadLine: {
        name: "threadLine",
        type: "line",
        xLeft: true,
        color: ["#db8223"],
        nameArr: ['成功', '错误'],
        nameList: ["00:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
        data1: [10,50, 380, 60, 30, 20, 40, 10, 120, 100,],
        data2: [100,56, 38, 68, 365, 54, 60, 85, 47, 56,],
        time: (new Date()).getTime()
      }, 
      lineIndex: 1, // 实时状态折线图类型
      reportLineGateway: { // 上报数 国标网关 
        name: "reportLineGateway",
        type: "line",
        xLeft: true,
        color: ["#db8223", "#82aeff"],
        nameArr: ['今日', '昨日'],
        nameList: ["00:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
        data1: [10,50, 380, 60, 30, 20, 40, 10, 120, 100,],
        data2: [100,56, 38, 68, 365, 54, 60, 85, 47, 56,],
        time: (new Date()).getTime()
      }, 
      responseLineGateway: { // 响应时长 国标网关 
        name: "responseLineGateway",
          type: "one-line-alarm",
          color: ["#db8223"],
          nameArr: ['响应时长'],
          nameList: ["00:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
          data1: [20,94, 20, 30, 50, 80 ,22 , 65 , 89,30, 64],
          time: (new Date()).getTime()
      }, 
      threadLineJava: { // 线程数 其他java通用 
        name: "threadLineJava",
          type: "one-line-alarm",
          color: ["#db8223"],
          nameArr: ['线程数'],
          nameList: ["00:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
          data1: [20,94, 20, 30, 50, 80 ,22 , 65 , 89,30, 64],
          time: (new Date()).getTime()
      }, 
      responseLineJava: { // 响应时长 其他java通用 
        name: "threadLineJava",
          type: "one-line-alarm",
          color: ["#db8223"],
          nameArr: ['响应时长'],
          nameList: ["00:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
          data1: [20,94, 20, 30, 50, 80 ,22 , 65 , 89,30, 64],
          time: (new Date()).getTime()
      }, 
      threadLineServers: { // 句柄数 服务器服务 
        name: "threadLineJava",
          type: "one-line-alarm",
          color: ["#db8223"],
          nameArr: ['句柄数'],
          nameList: ["00:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
          data1: [20,94, 20, 30, 50, 80 ,22 , 65 , 89,30, 64],
          time: (new Date()).getTime()
      }, 
      streamPieData: {
        id: "streamPie",
        total: 100,
        name: "实时转发总数",
        module: 'businessStream',
        center: ['25%', '50%'],
        radius: ['57%', '70%'],
        x: '55%',
        y: 'center',
        fontSize:'12',
        data: [
          {
            value: 200,
            name: "实时点播 42%",
            itemStyle: {
              normal: {
                color: "#FE8821"
              }
            }
          },
          {
            value: 235,
            name: "历史点播 38%",
            itemStyle: {
              normal: {
                color: "#1AD4CD"
              }
            }
          },
          {
            value: 135,
            name: "录像下载 20%",
            itemStyle: {
              normal: {
                color: "#2193FE"
              }
            }
          },
        ],
        time: (new Date()).getTime()
      },
      leftBottomTitle: '上报数',
      centerBottomTitle: '执行数', // 数据库 推送服务 服务器服务

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
          nameArr: ['昨日', '今日'],
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
  mounted() {
    this.brokenStatistics()
    this.barStatistics()

    this.initVar()
  },
  methods: {
    // 变量初始化
    initVar() {
      this.baseInfoList = [
        {
          title: '名称',
          content: '数据库1'
        },
        {
          title: 'IP',
          content: '125.255.214.26'
        },
        {
          title: '所属服务器位置',
          content: '市局N楼机房'
        },
        {
          title: '维护人',
          content: '刘峰 13258455467'
        },
        {
          title: '初始部署时间',
          content: '2020-07-01'
        },
      ]
      switch(this.$store.state.businessMonitor.serveListType) {
        case 1: // 数据库
          this.baseInfoList[0].content = '数据库1';
          this.centerBottomTitle = '执行数'
          break;
        case 2: // 国标共享网关、国标接入网关
          this.baseInfoList[0].content = '国标接入网关1';
          this.leftBottomTitle = "上报数"
          break;
        case 3: // 流媒体
          this.baseInfoList[0].content = '流媒体1';
          break;
        case 4: // 其他java通用
          this.baseInfoList[0].content = '其他java服务';
          this.leftBottomTitle = "调用数"
          this.responseLineGateway = this.threadLineJava
          this.threadLine = this.responseLineJava
          break;
        case 5: // 推送服务
          this.baseInfoList[0].content = '推送服务1';
          this.centerBottomTitle = '推送量'
          break;
        case 7: // 服务器服务
          this.baseInfoList[0].content = '服务器1';
          this.centerBottomTitle = '进程数'
          this.threadLine = this.threadLineServers
          break;
        default:
          break;
      }
      this.leftListSelect = [
        {
          name: '采集服务',
          id: '0'
        },
        {
          name: '数据库服务',
          id: '1'
        },
        {
          name: '国标接入网关服务',
          id: '2'
        },
        {
          name: '流媒体服务',
          id: '3'
        },
        {
          name: '其他java通用服务',
          id: '4'
        },
        {
          name: '推送服务',
          id: '5'
        },
        {
          name: '国标共享网关服务',
          id: '6'
        },
        {
          name: '服务器服务',
          id: '7'
        },
      ]
      
      this.leftListSelectVal = this.$store.state.businessMonitor.serveListType + ''
      for (let i = 0; i < this.leftListSelect.length; i++) {
        if (this.leftListSelect[i].id === this.leftListSelectVal) {
          this.leftSelectName = this.leftListSelect[i].name
        }
      }
      for (let i = 0; i < 100; i++) {
        this.changeList.push('2017-07-08服务迁移从服务器1迁移至服务器2')
        this.rightServerListOrigin.push('190.36.15.44 市局大院主楼10楼机房' + (i + 1))
        let temp = 0
        if (i > 5) {
          temp = 1
        }
        this.leftServerListOrigin.push({
          id: i,
          name: this.leftSelectName + (i + 1),
          status: temp,
        })
      }
      this.rightServerList = this.rightServerListOrigin
      this.leftServerList = this.leftServerListOrigin

    },
    // 左侧 改变服务列表 下拉框选中
    onChangeLeftServe(val) {
      let self = this
      self.leftListSelect.forEach((item, index) => {
        if(item.id === val) {
          self.leftSelectName = item.name
        }
      })
    },
    // 左侧 服务列表 选中状态 背景变蓝色
    onSelectLeftServe(data, index) {
      if (!this.relateServe) {
        this.isLeftActiveIndex = index
        let temp = []
        for(let i = 0; i < 1; i++) {
          temp.push(this.leftSelectName + (index+1) + '对应的服务器' + (i+1))
        }
        this.rightServerList = temp
        this.relateServers = true // 显示右侧对应的服务器
        this.leftListName = data.name
        this.$store.commit('businessMonitor.changeServeListType', this.$store.state.businessMonitor.currentServeListType) // 左侧对应服务类型
      }
    },
    // 右侧 服务器列表 选中状态 背景变蓝色
    onSelectRightServers(data, index) {
      if (!this.relateServers) {
        this.isRightActiveIndex = index
        let temp = []
        for(let i = 0; i < index + 5; i++) {
          temp.push(
            {
              id: index,
              name: data + '运行的服务' + (i+1)
            }
            )
        }
        this.leftServerList = temp
        this.relateServe = true // 显示左侧对应的服务
        this.rightListName = data
        this.$store.commit('businessMonitor.changeServeListType', 7) // 7:服务器服务
        this.initVar()
      }
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
    // 左侧 点击关闭图标 关闭服务器对应的服务列表
    onCloseRelateServe() {
      this.relateServe = false
      this.leftServerList = this.leftServerListOrigin
    },
    // 右侧 点击关闭图标 关闭服务对应的服务器列表
    onCloseRelateServers() {
      this.relateServers = false
      this.rightServerList = this.rightServerListOrigin
    },
    // 实时状态 切换折线图
    onChangeLine(val) {
      this.lineIndex = val
      this.responseLine[val - 1].time = (new Date()).getTime()
      this.responseLineData = this.responseLine[val - 1]
      if (val === 1) {
        this.lineName = 'CPU占用率'
        this.lineUnit = '单位：%'
      } else if (val === 2) {
        this.lineName = '内存占用'
        this.lineUnit = '单位：MB'
      } else if (val === 3) {
        this.lineName = '网络宽带占用'
        this.lineUnit = '单位：mbps'
      } else {
        this.lineName = '句柄数占用'
        this.lineUnit = '单位：个'
      }
    },
    // 返回
    goBack() {
      let self = this
      self.$router.push('/serviceOverview')
      // let index1 = self.$store.state.businessMonitor.backFlowchartIndex[0]
      // let index2 = self.$store.state.businessMonitor.backFlowchartIndex[1]
      // let index3 = self.$store.state.businessMonitor.backFlowchartIndex[2]
      // let temp = self.$store.state.businessMonitor.centerData[index1][index2].service[index3]
      // self.openFirstColGraph(temp)
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
  .sticky-bar {
    position: fixed;
    top: 78px;
    left: 0;
    z-index: 9999;
    width: 20px;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    border: none;
    border-radius: 0px 3px 0px 3px;
    border-top-left-radius: 0px;
    border-top-right-radius: 3px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 3px;
    button {
      width: 20px;
      height: 50px;
      background: #2193FE;
      cursor: pointer;
      border: none;
      border-radius: 0px 3px 0px 3px;
      border-top-left-radius: 0px;
      border-top-right-radius: 3px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 3px;
      box-shadow: 0 0 4px 4px rgba(33, 147, 254, 0.3);
      user-select:none;
    }
  }
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
          height: calc(100% - 52px);
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
              // border: 1px solid #00376E;
              border-radius: 2px;
              // background: #012447;
              // margin-top: 0.5rem;
              margin-right: 1rem;
              opacity: 0.8;
              cursor: pointer;
              height: 2rem;
              line-height: 2rem;
              color: #afbcd4;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:hover {
                background-color: rgba(35, 146, 253, .6);
              }
              span {
                padding: 0.5rem 0rem 0.5rem 1rem;
              }
              .alarm {
                color: red;
              }
            }
            .active {
              background: #0189ff;
            }
          }
          .relate-ul {
            height: calc(100% - 168px);
            li {
              background: rgba(12, 92, 163, 0.5);
              border-radius: 0px;
            }
          }
          // 关联数据样式
          .relate-title {
            // width: calc(100% - 2rem);
            margin: 0 1rem .5rem 0rem;
            height: 2rem;
            color: $theme-white;
            line-height: 2rem;
            background: $theme-button;
            padding: 0 .5rem;
            box-sizing: border-box;
            @extend .over-ellipsis;
            .name {
              display: inline-block;
              padding-right: 1rem;
              box-sizing: border-box;
              width: 70%;
            }
            .type {
              display: inline-block;
              padding-right: 1rem;
              box-sizing: border-box;
              width: 25%;
            }
            .name-right {
              width: 60%;
            }
            .type-right {
              width: 35%;
            }
            .anticon {
              padding-top: .5rem;
              color: rgba(0, 0, 0, 0.8);
              float: right;
            }
          }
        }
      }
    }
  }
  .wrap-sidebar-left {
    .list-content {
      height: calc(100% - 100px);
      ul {
        height: calc(100% - 150px);
      }
    }
  }
  .wrap-sidebar-center { // 中间模块
    padding: 0;
    background: url(~@/assets/img/serviceOverview/server_list_larg_bg.png) no-repeat;
    background-size: 100% 100%;
    .wrap-card-top24 { // 中间 上方模块
      width: calc(100% - 2px);
      height: calc(100% - 2rem);
      margin-top: 1.5rem;
      margin-bottom: 0.45rem;
      margin-left: 0.0625rem;
      background: #00152D;
    }
    .wrap-card-push {
      width: calc(100% - 2px);
      margin-top: 1.5rem;
      margin-bottom: 0.45rem;
      margin-left: 0.0625rem;
      background: #00152D;
    }
    .wrap-card-top24,
    .wrap-card-push { // 中间 上方模块
      .css-architecture { // 中间模块
        height: 100%;
        display: flex;
        .css-div { // 中间模块 上面三列 下面一行 公共样式
          flex: 9;
          overflow: hidden;
          &:nth-of-type(1),
          &:nth-of-type(3) { // 中间模块 第一列和第三列
            // flex: 10;
            padding: 0;
            border-radius: 4px;
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
          background: #00152d;
          .base-info { // 中间第一列 两个子元素的公共样式
            background: #07223B;
          }
          .css-state { // 中间第一列 第一个子元素的单独样式
            padding: .5rem 1rem;
            margin-bottom: 1rem;
            border-radius: 4px;
            background: #07223B;
            .base-info-detail {
              height: calc(100% - 50px);
              overflow: auto;
              padding-left: 0.625rem;
              font-size: 12px;
              color: #d5d5d5;
              .history-change {
                padding-top: 1.5rem;
                li {
                  line-height: 20px;
                }
              }
              p { // 基本信息 每一行信息
                display: flex;
                span {
                  text-align: left;
                  margin-right: .5rem;
                  line-height: 20px;
                }
              }
            }
          }
          .css-playAdrr { // 中间第一列 第二个子元素的单独样式
            padding: .5rem 1rem;
            background: $theme-color;
            border-radius: 4px;
            .ant-col {
              .alarm-item { // 统计数据模块
                // background: url(~@/assets/img/serviceOverview/alarm_item_bg.png) no-repeat center;
                // background: url(~@/assets/img/serviceOverview/alarm-red-border.png) no-repeat center;
                background-size: contain;
                margin-left: -1rem;
                P { // 文字
                  padding-left: 2.5rem;
                  &:nth-of-type(1) {
                    font-size: 12px;
                    color: #7C9DBA;
                    padding-top: .5rem;
                  }
                  &:nth-of-type(2) {
                    font-size: 24px;
                    color: #fff;
                    padding-bottom: .2rem;
                  }
                }
              }
            }
            .alarm-col-0 {
              .alarm-item {
                background: url(~@/assets/img/serviceOverview/alarm-gray-border.png) no-repeat center;
              }
            }
            .alarm-col-1 {
              .alarm-item {
                background: url(~@/assets/img/serviceOverview/alarm-red-border.png) no-repeat center;
              }
            }
            .alarm-col-2 {
              .alarm-item {
                background: url(~@/assets/img/serviceOverview/alarm-orange-border.png) no-repeat center;
              }
            }
            .alarm-col-3 {
              .alarm-item {
                background: url(~@/assets/img/serviceOverview/alarm-blue-border.png) no-repeat center;
              }
            }
            .alarm-list {
              height: calc(100% - 123px);
              overflow: auto;
            }
            ul {
              color: #d5d5d5;
              li {
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 30px;
                border-bottom: 1px #083661 solid;
                margin: 0 1rem 0 .5rem ;
              }
            }
          }
          .css-state-database { // 数据库
            flex: 2;
            height: 50%;
          }
          .css-playAdrr-database { // 数据库
            flex: 2;
            height: 50%;
          }
          .css-state-gateway { // 国标网关
            height: 33.33%;
          }
          .css-playAdrr-gateway { // 国标网关
            height: 33.33%;
            margin-bottom: 1rem;
            .report-data {
              height: calc(100% - 42px);
            }
          }
        }
        .center-second-col { // 中间模块 第二列 单独的样式
          margin-left: 0.75rem;
          margin-right: 1.5rem;
          background: $theme-color;
          .realtime-state {
            padding: 0rem 1rem;
            color: #d5d5d5;
            height: 100%;
            .progress {
              .progress-des {
                width: 90%;
                font-size: 12px;
                color: #7C9DBA;
                .max-num {
                  float: right;
                }
              }
            }
            .css-line {
              margin-top: .1rem;
              .title {
                border-bottom: 1px solid #012447;
                color: #d5d5d5;
              }
              .unit {
                font-size: 12px;
                color: #7C9DBA;
                float: left;
              }
            }
            .css-line-servers {
              margin-top: 2rem; // 服务器详情 与 数据库详情 公用一个页面 样式不同
            }
            .thread-line {
              margin-top: 2rem;
            }
            .realtime-model {
              margin-top: 1rem;
              margin-bottom: .5rem;
              .first,
              .second,
              .third,
              .forth {
                border: 1px solid #00376E;
                background: #00172D;
                border-radius: 6px;
                cursor: pointer;
                text-align: center;
              }
              .first {
                margin-right: .5rem;
              }
              .second,
              .third {
                margin-left: .5rem;
                margin-right: .5rem;
              }
              .forth {
                margin-left: .5rem;
              }
              .active {
                background-color: #063462;
                border-color: #2193FE;
              }
              span {
                display: block;
                &:nth-of-type(1) {
                  color: #7C9DBA;
                  font-size: 12px;
                }
              }
            }
            .realtime-model-row {
              margin-top: 0px;
            }
          }
          .css-line-database {
            height: calc(50% - 105px);
            .echarts {
              height: 90%;
            }
          }
          .realtime-model-gateway {
            margin-bottom: 1rem;
          }
          .cpu-line-gateway,
          .response-line-gateway,
          .request-line-gateway { // 国标网关
            height: calc(33.33% - 60px);
            .echarts {
              height: calc(100% - 22px);
            }
          }
          .realtime-model-stream {
            height: calc(30% - 60px);
            .ant-col {
              height: 100%;
              .realtime-load {
                height: 100%;
                .title {
                  margin-right: 2rem;
                  height: 25px;
                  border-bottom: 1px solid #083661;
                }
                .content {
                  position: relative;
                  height: 50%;
                  margin-top: 20%;
                  border: 1px solid #415F7A;
                  .content-des {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-100%);
                    font-size: 14px;
                    color: #d5d5d5;
                    padding-left: 1.25rem;
                  }
                  .content-num {
                    position: absolute;
                    top: 50%;
                    padding-left: 1.25rem;
                    span {
                      display: inline-block;
                      padding-left: 0px;
                    }
                    span:nth-of-type(1) {
                      font-size: 18px;
                      color: #fff;
                    }
                  }
                }
                .css-pieMsg {
                  height: calc(100% - 22px);
                  div {
                    height: 100%;
                  }
                }
              }
            }
          }
        }
        .center-second-col-gateway { // 国标网关
          margin-bottom: 1rem;
          border-radius: 4px;
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
