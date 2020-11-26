<template>
  <!-- 运行概览 -->
  <div class="content">
    <div class="wrap-sidebar wrap-sidebar-left">
      <div class="wrap-card wrap-card-24">
        <div class="css-childBg css-left-1">
          <div class="list-title">
            <span class="list-title-name">主题列表</span>
            <p class="css-tag">
              <a-radio-group v-model="radioType" button-style="solid" size="small" @change="cameraShowChange">
                <a-radio-button value="line">镜头组</a-radio-button>
                <a-radio-button value="bar">镜头机构</a-radio-button>
              </a-radio-group>
            </p>
          </div>
          <a-input class="css-checkedName" ref="userNameInput" v-model="values" placeholder="" @click="showCameraSearch">
            <a-tooltip class="css-tooltip" slot="suffix" @click="showCameraSearch">
              <a-icon :type="isShowCameraList===false?'caret-down':'caret-up'" />
            </a-tooltip>
          </a-input>
          <div class="css-themeData">
            <li>
              <span>实时在线用户数/峰值</span>
              <span>{{maxValue.onlineUserNum}}</span>
              <span>{{maxValue.maxOnlineUserNum}}</span>
            </li>
            <li>
              <span>实时调用数/峰值</span>
              <span>{{maxValue.callNum}}</span>
              <span>{{maxValue.maxCallNum}}</span>
            </li>
            <li>
              <span>实时流量/峰值</span>
              <span>{{maxValue.width}}</span>
              <span>{{maxValue.maxWidth}}</span>
            </li>
          </div>
        </div>
      </div>
      <div class="wrap-card wrap-card-30">
        <div class="css-childBg css-left-2 video-model">
          <div class="list-title">
            <span class="list-title-name">在线情况</span>
          </div>
          <div class="list-counts">
            <a-row>
              <a-col :span="12">
                <span class="">
                  <span class="text first-text">总数</span>
                  <span class="total-num blue-color">{{videoTotalNum}}</span>
                </span>
              </a-col>
              <a-col :span="12">
                <span class="">
                  <span class="list-name text">总在线数</span>
                  <span class="total-num blue-color">{{totalOnlineNum}}</span>
                  <span class="font-size18  blue-color">/{{Math.floor((totalOnlineNum/videoTotalNum)*100)}}%</span>
                </span>
              </a-col>
            </a-row>
          </div>
          <a-row class="online-situation">
            <a-col :span="24">
              <ul class="css-target-number">
                <li v-for="(item, index) in videoPlatformDes1" :key="index">
                  <span><span class="float-l">{{item}}</span><span class="type-num  blue-color">{{videoPlatformData1[index].total}}</span></span>
                  <span><span class="float-l">在线数</span><span class="type-num blue-color">{{videoPlatformData1[index].online}}</span></span>
                  <span><span class="float-l">在线率</span><span class="type-num blue-color">{{Math.floor((videoPlatformData1[index].online/videoPlatformData1[index].total)*100)}}%</span></span>
                  <!-- <span>{{Math.floor((videoPlatformData1[index].online/videoPlatformData1[index].total)*100)}}%</span> -->
                </li>
              </ul>
            </a-col>
          </a-row>
          <a-row class="online-situation">
            <a-col :span="24">
              <ul class="css-target-number">
                <li v-for="(item, index) in videoPlatformDes2" :key="index">
                  <span><span class="float-l">{{item}}</span><span class="type-num  blue-color">{{videoPlatformData2[index].total}}</span></span>
                  <span><span class="float-l">在线数</span><span class="type-num blue-color">{{videoPlatformData2[index].online}}</span></span>
                  <span><span class="float-l">在线率</span><span class="type-num blue-color">{{Math.floor((videoPlatformData2[index].online/videoPlatformData2[index].total)*100)}}%</span></span>
                  <!-- <span>{{Math.floor((videoPlatformData2[index + 2].online/videoPlatformData2[index + 2].total)*100)}}%</span> -->
                </li>
              </ul>
            </a-col>
          </a-row>
          <!-- <ul class="css-target-number">
            <li>
              <span>一类点在线率</span>
              <span>{{maxValue.type1Num===0?0:Math.floor(maxValue.type1OnlineNum/maxValue.type1Num*100)}}%</span>
            </li>
            <li>
              <span>二三类点在线率</span>
              <span>{{maxValue.type23Num===0?0:Math.floor(maxValue.type23OnlineNum/maxValue.type23Num*100)}}%</span>
            </li>
            <li>
              <span>镜头总在线率</span>
              <span>{{maxValue.totalNum===0?0:Math.floor(maxValue.totalOnlineNum/maxValue.totalNum*100)}}%</span>
            </li>
          </ul> -->
          <!-- <div class="css-themeData">
            <li>
              <span>镜头类别</span>
              <span>在线数</span>
              <span>总数</span>
            </li>
            <li>
              <span>全部</span>
              <span>{{maxValue.totalOnlineNum}}</span>
              <span>{{maxValue.totalNum}}</span>
            </li>
            <li>
              <span>一类点</span>
              <span>{{maxValue.type1OnlineNum}}</span>
              <span>{{maxValue.type1Num}}</span>
            </li>
            <li>
              <span>二三类点</span>
              <span>{{maxValue.type23OnlineNum}}</span>
              <span>{{maxValue.type23Num}}</span>
            </li>
          </div> -->
          <!-- <div class="css-pieMsg">
            <echarts-pie :dataVal="statistical.dataVal[0]"></echarts-pie>
          </div> -->
          <!-- <p class="css-newMsg">
            <span>今日新增镜头</span>
            <span>85346</span>
          </p> -->
        </div>
      </div>
      <div class="wrap-card wrap-card-25">
        <div class="css-childBg css-left-3">
          <div class="list-title">
            <span class="list-title-name">排行榜</span>
          </div>
          <a-tabs v-model="activeRank">
            <a-tab-pane key="0" tab="热点镜头(TOP5)">
              <div class="css-list">
                <ul>
                  <li v-for="item in rankList0" :key="item.cameraId">
                    <span>{{item.orgName}}</span>
                    <span>{{item.cameraName}}</span>
                    <span>{{item.count}}次</span>
                  </li>
                </ul>
              </div>
            </a-tab-pane>
            <a-tab-pane key="1" tab="热点区域">
              <div class="css-list">
                <ul>
                  <li v-for="item in rankList1" :key="item.cameraId">
                    <span>{{item.orgName}}</span>
                    <span>{{item.cameraName}}</span>
                    <span>{{item.count}}次</span>
                  </li>
                </ul>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="故障区域">
              <div class="css-list">
                <ul>
                  <li v-for="item in rankList2" :key="item.cameraId">
                    <span>{{item.orgName}}</span>
                    <span>{{item.cameraName}}</span>
                    <span>{{item.count}}次</span>
                  </li>
                </ul>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="wrap-card wrap-card-21">
        <div class="css-childBg css-left-4">
          <div class="list-title">
            <span class="list-title-name">今日数据统计</span>
          </div>
          <div class="table-list-box">
            <ul>
              <li>
                <span>登录用户</span>
                <span>{{todayStatisticsData.onlineUserNum}}</span>
              </li>
              <li>
                <span>服务负载</span>
                <span>{{todayStatisticsData.onlineServiceNum}}</span>
              </li>
              <li>
                <span>共享点播</span>
                <span>{{todayStatisticsData.sharePlayNum}}</span>
              </li>
              <li>
                <span>实况调用</span>
                <span>{{todayStatisticsData.onlinePlayNum}}</span>
              </li>
              <li>
                <span>录像调用</span>
                <span>{{todayStatisticsData.videoCallNum}}</span>
              </li>
            </ul>
            <ul>
              <li>
                <span>人像告警</span>
                <span>{{todayStatisticsData.faceAlarmNum}}</span>
              </li>
              <li>
                <span>融合入库</span>
                <span>{{todayStatisticsData.rhrkNum}}</span>
              </li>
              <li>
                <span>动态入库</span>
                <span>{{todayStatisticsData.dtrkNum}}</span>
              </li>
              <li>
                <span>融合调用</span>
                <span>{{todayStatisticsData.rhCallNum}}</span>
              </li>
              <li>
                <span>动态调用</span>
                <span>{{todayStatisticsData.dtCallNum}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap-sidebar wrap-sidebar-center">
      <div class="css-legend">
        <a-dropdown placement="topLeft" :trigger="['click']" v-model="visibleMap">
          <span><img src="@/assets/img/ic_select_dark.png" />地图图层</span>
          <a-menu class="css-legend-content" slot="overlay">
            <a-menu-item key="999">
              <p class="css-title">地图图层筛选</p>
            </a-menu-item>
            <a-checkbox-group class="mapLayer" v-model="mapLayerList" @change="chengeBox">
              <a-menu-item key="0">
                <a-checkbox value="0">
                  <img src="@/assets/img/ic_map_engine room_nor.png" />
                  机房
                </a-checkbox>
              </a-menu-item>
              <a-menu-item key="1">
                <a-checkbox value="1">
                  <span class="css-color color1 graph-case-color1"></span>
                  <!-- <span class="css-color color1"></span> -->
                  实时在线用户数/峰值
                </a-checkbox>
              </a-menu-item>
              <a-menu-item key="2">
                <a-checkbox value="2">
                  <span class="css-color color2"></span>
                  实时调用数/峰值
                </a-checkbox>
              </a-menu-item>
              <a-menu-item key="3">
                <a-checkbox value="3">
                  <span class="css-color color3"></span>
                  实时流量/峰值
                </a-checkbox>
              </a-menu-item>
              <a-menu-item key="4">
                <a-checkbox value="4">
                  <img src="@/assets/img/ic_layer_theme camera.png" />
                  主题镜头
                </a-checkbox>
              </a-menu-item>
              <a-menu-item key="5">
                <a-checkbox value="5">
                  <img src="@/assets/img/ic_layer_theme error camera.png" />
                  主题故障镜头
                </a-checkbox>
              </a-menu-item>
              <a-menu-item key="6">
                <a-checkbox value="6">
                  <img src="@/assets/img/ic_layer_use camera.png" />
                  实时调用镜头
                </a-checkbox>
              </a-menu-item>
              <a-menu-item key="7">
                <a-checkbox value="7">
                  <img src="@/assets/img/ic_layer_camera use.png" />
                  镜头调用TOP5
                </a-checkbox>
              </a-menu-item>
              <a-menu-item key="8">
                <a-checkbox value="8">
                  <span class="css-colors colors1"><span></span>
                  <span></span>
                  <span></span></span>
                  故障区域热力图
                </a-checkbox>
              </a-menu-item>
              <a-menu-item key="9">
                <a-checkbox value="9">
                  <span class="css-colors colors2">
                  <span class="first-lmap-color"></span>
                  <span class="second-lmap-color"></span>
                  <span class="third-lmap-color"></span></span>
                  热点区域热力图
                </a-checkbox>
              </a-menu-item>
            </a-checkbox-group>
          </a-menu>
        </a-dropdown>
        <span class="css-legends css-legend-content">
          <span @click="legendMessage(1)">
            <span class="css-colors colors2">
              <span :class="['first-lmap-color', !!~mapLayerList.indexOf('9') ? '' : 'gray']"></span>
              <!-- <span class="first-lmap-color"></span> -->
              <span :class="['second-lmap-color', !!~mapLayerList.indexOf('9') ? '' : 'gray']"></span>
              <!-- <span class="second-lmap-color"></span> -->
              <span :class="['third-lmap-color', !!~mapLayerList.indexOf('9') ? '' : 'gray']"></span>
              <!-- <span class="third-lmap-color"></span> -->
            </span>
            热点区域热力图
          </span>
          <span @click="legendMessage(2)">
            <span :class="['css-color','color1','graph-case-color1', !!~mapLayerList.indexOf('1') ? '' : 'gray']"></span>
            <!-- <span class="css-color color1 graph-case-color1"></span> -->
            <!-- <span class="css-color color1"></span> -->
            实时在线用户数/峰值
          </span>
          <span @click="legendMessage(3)">
            <span :class="['css-color','color2',!!~mapLayerList.indexOf('2') ? '' : 'gray']"></span>
            <!-- <span class="css-color color2"></span> -->
            实时调用数/峰值
          </span>
          <span @click="legendMessage(4)">
            <span :class="['css-color','color3',!!~mapLayerList.indexOf('3') ? '' : 'gray']"></span>
            <!-- <span class="css-color color3"></span> -->
            实时流量/峰值
          </span>
        </span>
      </div>
      <div class="wrap-card wrap-card-30">
        <div class="css-childBg">
          <div class="list-title">
            <span class="list-title-name">{{selectName}}</span>
            <ul ref="classify">
              <li v-for="(item, index) in trendAndOrgList" :key="index" :class="[activeIndex === index ? 'active' : '']" @click="classifyData(index, item)">{{item}}</li>
              <!-- <li @click="classifyData(1, '登录用户')" class="active">登录用户</li>
              <li @click="classifyData(2, '服务负载')">服务负载</li>
              <li @click="classifyData(3, '共享点播')">共享点播</li>
              <li @click="classifyData(4, '实况调用')">实况调用</li>
              <li @click="classifyData(5, '录像调用')">录像调用</li>
              <li @click="classifyData(6, '人像告警')">人像告警</li>
              <li @click="classifyData(7, '融合入库')">融合入库</li>
              <li @click="classifyData(8, '动态入库')">动态入库</li>
              <li @click="classifyData(9, '融合调用')">融合调用</li>
              <li @click="classifyData(10, '动态调用')">动态调用</li> -->
            </ul>
          </div>
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
          <div class="css-echarts">
            <echarts-line v-if="showLine===true" :chartData="statistical.chartData"></echarts-line>
            <echarts-bar v-else :chartData="statistical.chartData1"></echarts-bar>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap-sidebar wrap-sidebar-right">
      <div class="wrap-card wrap-card-36">
        <div class="css-childBg css-right-1">
          <div class="list-title">
            <span class="list-title-name">视频云资源情况</span>
          </div>
          <div class="distribute-subtitle">
            <p>分配情况</p>
          </div>
          <ul>
            <li v-for="(item, index) in distributeList" :key="index">
              <span class="css-name">{{item.title}}</span>
              <span class="css-nub">{{item.progressData.usedNum}}/{{item.progressData.totalNum}}</span>
              <span class="css-progress">
                <a-progress
                  :stroke-color="{from: '#1AD4CD',to: '#2744D1',}"
                  :percent="(item.progressData.usedNum/item.progressData.totalNum).toFixed(2)*100"
                  status="active"
                />
              </span>
            </li>
          </ul>
          <div class="load-subtitle">
            <p>负载情况</p>
          </div>
          <a-row>
            <a-col :class="index === 4 ? 'load-col-last' : ''" :span=item.col v-for="(item, index) in loadList" :key="index">
              <div class="load-item">
                <span>{{item.title}}</span>
                <span class="load-percent">{{item.percent}}</span>
                <!-- <img src="@/assets/img/runOverview/load-border.png" alt=""> -->
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="wrap-card wrap-card-23">
        <div class="css-childBg css-right-2 load-info">
          <div class="list-title">
            <span class="list-title-name">视频存储情况</span>
          </div>
          <a-row>
            <a-col :span="9">
              <div class="vcn-count vcn-count-1">
                <span class="num">1821</span>
                <span>VCN数量</span>
              </div>
              <div class="vcn-count">
                <span class="num">352P</span>
                <span>总存储容量</span>
              </div> 
            </a-col>
            <a-col :span="15">
              <div class="storage-content">
                <div :class="['storage-time', index === 5 ? 'storage-last-time' : '']" v-for="(item, index) in storageList" :key="index">
                  <span class="storage-desc">{{item.title}}</span>
                  <span :class="['storage-count',  index === 0 ? 'storage-first-count' : '']">{{item.count}}</span>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="wrap-card wrap-card-41">
        <div class="css-childBg css-right-3">
          <div class="list-title">
            <span class="list-title-name">实时告警</span>
            <div class="css-tag">
              <a-radio-group v-model="alarmType" button-style="solid" size="small" @change="changeRadio">
                <a-radio-button v-for="(item, index) in alarmButtonList" :key="index" :value="index">{{item}}</a-radio-button>
                <!-- <a-radio-button value="a">全部</a-radio-button>
                <a-radio-button value="b">设备</a-radio-button>
                <a-radio-button value="c">链路</a-radio-button>
                <a-radio-button value="d">服务</a-radio-button> -->
              </a-radio-group>
            </div>
          </div>
          <div class="css-pieMsg">
            <echarts-pie :dataVal="statistical.dataVal[2]"></echarts-pie>
          </div>
          <scroll class="css-listBox" :data="scrollData" :class-option="classOption">
            <ul>
              <li v-for="(item, index) in scrollData" :key="index">
                <span>{{item.title}}</span>
                <span>{{item.ip}}</span>
                <span>{{item.time}}</span>
              </li>
            </ul>
          </scroll>
        </div>
      </div>
    </div>

    <!-- <iframe ref="prevIframe" class="css-iframe" :src="'http://190.168.17.2:6083?maptype=1&sessionid='+Sessionids"></iframe> -->
    <iframe ref="prevIframe" class="css-iframe" :src="'http://190.168.17.2:6084?maptype=1&sessionid='+Sessionids"></iframe>

    <!-- 弹框 -->
    <a-modal class="css-msgProp" :visible="isMsg" @cancel.stop="handleCancel" :mask="false" width="20%" :dialogStyle="dialogStyle" footer="">
      <a-tabs v-model="activeKey" default-active-key="1">
        <a-tab-pane key="1" tab="设备告警">
          <div class="css-alarmMsg">
            <p>
              <span>名称</span>
              <span>龙岗派出所1楼</span>
            </p>
            <p>
              <span>IP</span>
              <span>127.0.0.1</span>
            </p>
            <p>
              <span>故障类型</span>
              <span>*****类型告警</span>
            </p>
            <p>
              <span>地理位置</span>
              <span>龙岗派出所1楼</span>
            </p>
            <p>
              <span>责任人联系信息</span>
              <span>李四 13866668888</span>
            </p>
            <p>
              <span>时间</span>
              <span>2020/06/10 15:26:35</span>
            </p>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="链路告警">
          <div class="css-alarmMsg">
            <p>
              <span>名称</span>
              <span>龙岗派出所1楼</span>
            </p>
            <p>
              <span>IP</span>
              <span>127.0.0.1</span>
            </p>
            <p>
              <span>故障类型</span>
              <span>*****类型告警</span>
            </p>
            <p>
              <span>地理位置</span>
              <span>龙岗派出所1楼</span>
            </p>
            <p>
              <span>责任人联系信息</span>
              <span>李四 13866668888</span>
            </p>
            <p>
              <span>时间</span>
              <span>2020/06/10 15:26:35</span>
            </p>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="服务告警">
          <div class="css-alarmMsg">
            <p>
              <span>名称</span>
              <span>龙岗派出所1楼</span>
            </p>
            <p>
              <span>IP</span>
              <span>127.0.0.1</span>
            </p>
            <p>
              <span>故障类型</span>
              <span>*****类型告警</span>
            </p>
            <p>
              <span>地理位置</span>
              <span>龙岗派出所1楼</span>
            </p>
            <p>
              <span>责任人联系信息</span>
              <span>李四 13866668888</span>
            </p>
            <p>
              <span>时间</span>
              <span>2020/06/10 15:26:35</span>
            </p>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-modal>

    <!-- 悬浮框 -->
    <div class="propModal" @click="popHide">
      <!-- 下拉框1 -->
      <div class="search-table-box camera" v-show="isShowCameraList" @click.stop>
        <div class="search-box">
          <a-row v-show="radioType == 'line'" type="flex" justify="space-between" align="top">
            <a-col :span='18'>
              <a-input placeholder="请输入主题名称搜索" />
            </a-col>
            <a-col :span='5'>
              <a-button type="primary">搜索</a-button>
            </a-col>
          </a-row>
        </div>
        <div class="list-box">
          <a-table
            :rowKey="record => record.orgId"
            :columns="cameraTableColumns"
            :data-source="cameraTableData"
            :pagination="false"
            :customRow="handleCameraClickRow"
            :indentSize="28"
            @expand="handleCameraExpand">
            <span slot="name" slot-scope="text, record">
              <img v-show="record.totalCount && record.totalCount != 0" src="@/assets/img/ic_theme map_dark.png" alt="">
              {{ text }}
            </span>
            <span slot="startTime" slot-scope="text" style="max-width: 5rem">
              <a-tooltip placement="right">
                <template slot="title">{{text}}</template>
                {{text}}
              </a-tooltip>
            </span>
            <span slot="totalCount" slot-scope="text" style="color: #00DEDE">{{text}}</span>
            <span slot="faultCount" slot-scope="text" style="color: #FF4D4D">{{text}}</span>
            <span slot="totalNum" slot-scope="text" style="color: #00DEDE">{{text}}</span>
            <span slot="faultNum" slot-scope="text" style="color: #FF4D4D">{{text}}</span>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echartsBar from "@/components/echartsBar";
import echartsPie from "@/components/echartsPie";
import echartsLine from "@/components/echartsLine";
import scroll from "vue-seamless-scroll";
export default {
  components: {
    echartsBar,
    echartsPie,
    echartsLine,
    scroll
  },
  data() {
    const times = () => {
      const d = new Date()
      const y = d.getFullYear()
      const M = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
      const D = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
      return y + '/' + M + '/' + D
    }
    return {
      Sessionids: window.sessionStorage.getItem('loginSessionid'),
      /**
       * 左侧变量
       */
      // 主题列表
      themeName: '', // 主题名称
      checkedList: '', // 主题选择
      values: "", // 主题列表input显示
      radioType: 'bar', // 镜头机构 镜头组
      isShowCameraList: false, // 主题列表下拉框显示&隐藏
      cameraTableColumns: [],
      cameraTableData: [],
      cameraOrgArr: [],
      cameraTemgArr: [],
      isMsg: false,
      dialogStyle: {}, // 弹窗样式
      activeKey: "1", // 弹窗显示active
      // 在线情况
      accessPlatsNum: 1,
      videoTotalNum: 1,
      totalOnlineNum: 1,
      videoPlatformDes1: ['一类点总数', '二三类点总数'],
      videoPlatformDes2: ['移动类总数', '内部视频总数'],
      videoPlatformData1: [{online: 0, total: 1}, {online: 0, total: 1}], // 视综平台
      videoPlatformData2: [{online: 0, total: 1}, {online: 0, total: 1}], // 视综平台
      maxValue: { // 在线情况
        callNum: 0,
        onlineUserNum: 0,
        width: 0,
        maxCallNum: 0,
        maxOnlineUserNum: 0,
        maxWidth: 0,
        totalNum: 0,  // 总数
        totalOnlineNum: 0,  // 在线总数
        type1OnlineNum: 0,  // 1类在线
        type23OnlineNum: 0, // 2、3类在线
        type1Num: 0,
        type23Num: 0,
      },
      // 排行榜
      activeRank: '0',
      rankList0: [],
      rankList1: [],
      rankList2: [],
      // 今日数据统计
      todayStatisticsData: {
        dtCallNum: 0,
        dtrkNum: 0,
        faceAlarmNum: 0,
        onlinePlayNum: 0,
        onlineServiceNum: 0,
        onlineUserNum: 0,
        rhCallNum: 0,
        rhrkNum: 0,
        sharePlayNum: 0,
        videoCallNum: 0
      },

      /**
       * 中间变量
       */
      // mapLayerList: ['0','1','2','3','4','5','6','7','8', '9'], // 地图图层筛选 多选框初始化值
      // mapLayerList: ['0','1','2','3','4','5','6','7', '9'], // 地图图层
      mapLayerList: ['0','1','4','5','6','7',,'9'], // 地图图层
      visibleMap: false, // 地图图层显示&隐藏
      trendAndOrgList: ['登录用户', '服务负载', '共享点播', '实况调用', '录像调用', '人像告警', '融合入库', '动态入库', '融合调用', '动态调用'],
      activeIndex: 0, // 当前选中折线类型的索引
      showLine: true, // 折线图显示&隐藏
      statisticsType: 'line', // 统计图类型
      fieldName: '',  // 中下统计图中的类型
      nowStatisticsData: [],  // 今日统计数据
      yesterDayStatisticsData: [], // 昨日统计数据
      barStatisticsData: [], // 柱状图数据
      selectName: '登录用户',

      /**
       * 右侧变量
       */
      distributeList: [], // 视频云资源情况
      loadList: [ // 负载情况
        {
          title: 'CPU使用率',
          percent: '10.33%',
          col: 5,
        },{
          title: '内存使用率',
          percent: '52.16%',
          col: 5,
        },{
          title: '存储',
          percent: '80%',
          col: 4,
        },{
          title: '网络',
          percent: '41%',
          col: 4,
        },{
          title: 'GPU使用率',
          percent: '86%',
          col: 5,
        },
      ],
      storageList: [ // 视频存储时长
        {
          title: '视频存储时长',
          count: '镜头数',
        },{
          title: '小于一个月',
          count: 14780,
        },{
          title: '等于一个月',
          count: 34763,
        },{
          title: '一到三个月',
          count: 40269,
        },{
          title: '等于三个月',
          count: 1148,
        },{
          title: '大于三个月',
          count: 18940,
        },
      ],
      videoResourceLoadData: { // 视频云负载
        cpuUsedRate: 0,
        gpuUsedRate: 0,
        memoryUsedRate: 0,
        offlineMinutesOneDay: 0,
        offlineMinutesOneMonth: 0,
        offlineMinutesOneWeek: 0
      },
      // 实时告警
      alarmType: 0, // 类型
      alarmButtonList: ['全部','设备', '链路', '服务'],
      copyDataType: null,
      alarmDataObj: {}, // 数据
      sjNub: { // echarts图
        nub1: 0,
        nub2: 0,
        nub3: 0
      },
      // echarts数据
      statistical: {
        dataVal: [
          {
            id: "nub0",
            name: "在线总数",
            position: "left",
            left: '17%',
            total: 0,
            data: [
              {
                value: 0,
                name: "一类点",
                itemStyle: {
                  normal: {
                    color: "#82aeff"
                  }
                }
              },
              {
                value: 0,
                name: "二三类点",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              }
            ],
            time: (new Date()).getTime()
          },
          {
            id: "nub4",
            name: "平台稳定性/日",
            position: "left",
            left: '19%',
            total: "0%",
            percentageShow: 'false', // 是否显示百分比
            data: [
              {
                value: 0,
                name: "日  分钟/离线",
                itemStyle: {
                  normal: {
                    color: "#82aeff"
                  }
                }
              },
              {
                value: 0,
                name: "周  分钟/离线",
                itemStyle: {
                  normal: {
                    color: "#45c9eb"
                  }
                }
              },
              {
                value: 0,
                name: "月  分钟/离线",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              }
            ],
            time: (new Date()).getTime()
          },
          {
            id: "nub5",
            type: "huan", // 环状图
            total: 894,
            name: "告警总数",
            center: ['25%', '52%'],
            x: '50%',
            y: 'center',
            position: "left",
            data: [
              {
                value: 128,
                name: "设备",
                itemStyle: {
                  normal: {
                    color: "#82aeff"
                  }
                }
              },
              {
                value: 98,
                name: "链路",
                itemStyle: {
                  normal: {
                    color: "#45c9eb"
                  }
                }
              },
              {
                value: 245,
                name: "服务",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              }
            ],
            time: (new Date()).getTime()
          },
          {
            id: "nub5",
            name: "已处理告警",
            position: "left",
            total: 894,
            data: [
              {
                value: 128,
                name: "设备",
                itemStyle: {
                  normal: {
                    color: "#82aeff"
                  }
                }
              },
              {
                value: 98,
                name: "",
                itemStyle: {
                  normal: {
                    color: "#28396C"
                  }
                }
              }
            ],
            time: (new Date()).getTime()
          }
        ],
        chartData: {
          name: "chart8",
          type: "bar-line",
          color: ["#db8223", "#82aeff"],
          nameArr: ['昨日趋势', '今日趋势'],
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
      },
      scrollData: [
        { title: '盐田分局【级别：低】', time: times(), ip: '190.198.2.163' },
        { title: '光明分局【级别：低】', time: times(), ip: '190.160.42.112' },
        { title: '宝安分局【级别：低】', time: times(), ip: '190.29.20.27' },
        { title: '福田分局【级别：低】', time: times(), ip: '190.13.14.2' },
        { title: '龙华分局【级别：低】', time: times(), ip: '190.48.20.131' },
        { title: '龙华分局【级别：低】', time: times(), ip: '190.48.20.248' },
        { title: '坪山分局【级别：低】', time: times(), ip: '190.48.14.167' }
      ],
    };
  },
  computed: {
    classOption() {
      return {
        step: 1
      };
    }
  },
  mounted() {
    // this.tabLi();
    this.getBaseInfo();
    this.listening();
    this.themeList()
    this.getCameraOrgList()
    this.todayStatistics()
    this.videoResourceAllocation()
    this.videoResourceLoad()
    this.realTimeAlarm()
    this.brokenStatistics()
    this.barStatistics()
  },
  methods: {
    // 获取左侧 在线情况信息
    async getBaseInfo() {
      const data = await this.$axios("/api/business/getBaseInfo", {
        orgId: 10,
        type: 1
      });
      // 视综平台 左侧数据     
      this.accessPlatsNum = data.totalNum
      this.videoTotalNum = data.totalNum
      this.totalOnlineNum = data.totalOnlineNum
      this.videoPlatformData1 = [
        {online: data.type1OnlineNum, total: data.type1Num},
        {online: data.type23OnlineNum, total: data.type23Num}];
      this.videoPlatformData2 = [
        {online: data.mobileOnlineNum, total: data.mobileNum},
        {online: data.innerOnlineNum, total: data.innerNum}];
    },
    // 全局点击事件 隐藏下拉框
    popHide () {
      const self = this
      $(".propModal").css('display', 'none')
      self.isShowCameraList = false
    },
    // 点击下拉图标 展示镜头数据
    showCameraSearch() {
      const self = this
      if(self.isShowCameraList) {
        self.isShowCameraList = false
      } else {
        $(".propModal").css('display', 'block')
        this.cameraShowChange()
        self.isShowCameraList = true
        if (this.radioType === 'line') {
          this.cameraTableData = this.cameraTemgArr
        } else {
          this.cameraTableData = this.cameraOrgArr
        }
      }
    },
    // 显示下拉框数据
    cameraShowChange () {
      const self = this
      if (this.radioType === 'line') {
        self.cameraTableColumns = [
          { title: '主题名称', dataIndex: 'name', key: 'name', width: '100px', scopedSlots: { customRender: 'name' } },
          { title: '创建时间', dataIndex: 'startTime', key: 'startTime', scopedSlots: { customRender: 'startTime' } },
          { title: '镜头数', dataIndex: 'totalCount', key: 'totalCount', scopedSlots: { customRender: 'totalCount' }  },
          { title: '故障数', dataIndex: 'faultCount', key: 'faultCount', scopedSlots: { customRender: 'faultCount' }  }
        ]
      } else {
        self.cameraTableColumns = [
          { title: '机构名称', dataIndex: 'orgName', key: 'orgName', width: '160px', scopedSlots: { customRender: 'orgName' } },
          { title: '镜头数', dataIndex: 'totalNum', key: 'totalNum', scopedSlots: { customRender: 'totalNum' } },
          { title: '故障数', dataIndex: 'faultNum', key: 'faultNum', scopedSlots: { customRender: 'faultNum' } },
        ]
      }
    },
    // 镜头组/镜头机构列表 扩展加载数据
    handleCameraExpand(expended, record) {
      const self = this
      if(expended && record.children.length == 0) {
        self.getCameraOrgList(record)
      }
    },
    // 点击 主题列表 镜头组 下拉框中的镜头数据
    handleCameraClickRow(record, index) {
      const self = this
      return {
        on: {
          click: () => {
            $(".propModal").css('display', 'none')
            self.isShowCameraList = false
            if (this.radioType === 'line') {
              this.checkedList = record.id
              this.values = record.name
              this.maxValueData(this.checkedList)
              this.rankCameraList(this.checkedList)
              this.rankHotList(this.checkedList)
              this.rankFaultList(this.checkedList)
              const msg = { type: "switchTheme", data: { id: this.checkedList } }
              this.postMessage(msg)
              this.todayStatistics(10)
            } else {
              this.checkedList = record.orgId
              this.values = record.orgName
              this.maxOrgValueData(this.checkedList)
              this.rankOrgCameraList(this.checkedList)
              this.rankOrgHotList(this.checkedList)
              this.rankOrgFaultList(this.checkedList)
              this.todayStatistics(this.checkedList)
              const msg = { type: "changeOrg", data: { id: this.checkedList } }
              this.postMessage(msg)
            }
          }
        }
      }
    },
    changePic () {
      if (this.statisticsType === "line") {
        this.showLine = true;
      } else {
        this.showLine = false;
        this.barDataShow()
      }
    },
    /**
     * 切换图例
     * dataNum : 1 2 3 4
     */
    legendMessage(dataNum) {
      let self = this
      let mapIndex = dataNum
      let arrIndex = dataNum - 1
      if(dataNum === 1) {
        if(!~self.mapLayerList.indexOf('9')) {
          self.$set(self.mapLayerList, self.mapLayerList.length, '9')
        } else {
          self.mapLayerList.forEach((item, index) => {
            if(item === '9') {
              self.mapLayerList.splice(index, 1)
            }
          })
        }
      } else if(dataNum === 2) {
        if(!~self.mapLayerList.indexOf('1')) {
          self.$set(self.mapLayerList, self.mapLayerList.length, '1')
        } else {
          self.mapLayerList.forEach((item, index) => {
            if(item === '1') {
              self.mapLayerList.splice(index, 1)
            }
          })
        }
      } else if(dataNum === 3) {
        if(!~self.mapLayerList.indexOf('2')) {
          self.$set(self.mapLayerList, self.mapLayerList.length, '2')
        } else {
          self.mapLayerList.forEach((item, index) => {
            if(item === '2') {
              self.mapLayerList.splice(index, 1)
            }
          })
        }
      } else {
        if(!~self.mapLayerList.indexOf('3')) {
          self.$set(self.mapLayerList, self.mapLayerList.length, '3')
        } else {
          self.mapLayerList.forEach((item, index) => {
            if(item === '3') {
              self.mapLayerList.splice(index, 1)
            }
          })
        }
      }
      self.chengeBox()
    },
    chengeBox() {
      // 地图图层选择
      const json = {};
      // const length = document.querySelector(".mapLayer").children.length;
      for (let index = 0; index < 10; index++) {
        json[index] = false;
      }
      this.mapLayerList.forEach(v => {
        this.$set(json, v, true)
        // json[v] = true;
      });
      for (const key in json) {
        this.$refs.prevIframe.contentWindow.postMessage(
          { type: "showControl", data: { index: key, data: json[key] } },
          "*"
        );
      }
    },
    listening() {
      // 监听ifram发来的信息
      const _this = this;
      window.addEventListener(
        "message",
        event => {
          const data = event.data;
          if (data.type === "orgMsg") {
            console.log(data.data);
            let scrollTop = "";
            if (
              document.documentElement &&
              document.documentElement.scrollTop
            ) {
              scrollTop = document.documentElement.scrollTop;
            } else if (document.body && document.body.scrollTop) {
              scrollTop = document.body.scrollTop;
            }
            _this.activeKey = "1";
            _this.dialogStyle = {
              position: "absolute",
              top: Math.floor(data.data.y + 90 - scrollTop) + "px",
              left: Math.floor(data.data.x + 20) + "px"
            };
            _this.isMsg = true;
          }
        },
        false
      );
    },
    handleCancel() {
      // 关闭弹窗
      this.isMsg = false;
    },
    /**
     * 切换选中的折线类型
     * index {Number} 选中的折线类型索引
     */
    classifyData(index) {
      // const liList = this.$refs.classify.children;
      // liList.forEach((v, k) => {
      //   if (index === k + 1) {
      //     v.className = "active";
      //   } else {
      //     v.className = "";
      //   }
      // });
      this.activeIndex = index // 默认被选中的折线类型
      this.selectName = this.trendAndOrgList[index];
      let name = ''
      switch (index) {
        case 0:
          name = 'onlineUserNum'
          break;
        case 1:
          name = 'onlineServiceNum'
          break;
        case 2:
          name = 'sharePlayNum'
          break;
        case 3:
          name = 'onlinePlayNum'
          break;
        case 4:
          name = 'videoCallNum'
          break;
        case 5:
          name = 'faceAlarmNum'
          break;
        case 6:
          name = 'rhrkNum'
          break;
        case 7:
          name = 'dtrkNum'
          break;
        case 8:
          name = 'rhCallNum'
          break;
        default:
          name = 'dtCallNum'
      }
      this.fieldName = name
      if (this.statisticsType === "line") { // 折线图
        this.brokenDataShow()
      } else {  // 柱状图
        this.barDataShow()
      }
    },
    // 随机数
    random (min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    // 切换右侧 实时告警
    changeRadio (event) {
      if (this.copyDataType === null) {
        this.copyDataType = JSON.parse(JSON.stringify(this.statistical.dataVal[2]))
      }
      if (event.target.value === 0) { // 全部
        this.copyDataType.time = (new Date()).getTime()
        this.statistical.dataVal[2] = this.copyDataType
      } else if (event.target.value === 1) {  // 设备
        const nub = this.random(1, this.sjNub.nub1)
        this.statistical.dataVal[3].name = '设备告警总数'
        this.statistical.dataVal[3].data[0].itemStyle.normal.color = '#7645eb'
        this.statistical.dataVal[3].data[1].itemStyle.normal.color = '#82aeff'
        this.statistical.dataVal[3].total = this.sjNub.nub1
        const percentage = Math.floor(nub/this.statistical.dataVal[3].total*100)
        this.statistical.dataVal[3].data[0].value = nub
        this.statistical.dataVal[3].data[0].name = '已处理    ' + nub + '/' + percentage + '%'
        this.statistical.dataVal[3].data[1].value = this.statistical.dataVal[3].total - nub
        this.statistical.dataVal[3].time = (new Date()).getTime()
        this.statistical.dataVal[2] = this.statistical.dataVal[3]
      } else if (event.target.value === 2) {  // 链路
        const nub = this.random(1, this.sjNub.nub2)
        this.statistical.dataVal[3].name = '链路告警总数'
        this.statistical.dataVal[3].data[0].itemStyle.normal.color = '#445fde'
        this.statistical.dataVal[3].data[1].itemStyle.normal.color = '#82aeff'
        this.statistical.dataVal[3].total = this.sjNub.nub2
        const percentage = Math.floor(nub/this.statistical.dataVal[3].total*100)
        this.statistical.dataVal[3].data[0].value = nub
        this.statistical.dataVal[3].data[0].name = '已处理    ' + nub + '/' + percentage + '%'
        this.statistical.dataVal[3].data[1].value = this.statistical.dataVal[3].total - nub
        this.statistical.dataVal[3].time = (new Date()).getTime()
        this.statistical.dataVal[2] = this.statistical.dataVal[3]
      } else if (event.target.value === 3) {  // 服务
        const nub = this.random(1, this.sjNub.nub3)
        this.statistical.dataVal[3].name = '服务告警总数'
        this.statistical.dataVal[3].data[0].itemStyle.normal.color = '#ac8851'
        this.statistical.dataVal[3].data[1].itemStyle.normal.color = '#445fde'
        this.statistical.dataVal[3].total = this.sjNub.nub3
        const percentage = Math.floor(nub/this.statistical.dataVal[3].total*100)
        this.statistical.dataVal[3].data[0].value = nub
        this.statistical.dataVal[3].data[0].name = '已处理    ' + nub + '/' + percentage + '%'
        this.statistical.dataVal[3].data[1].value = this.statistical.dataVal[3].total - nub
        this.statistical.dataVal[3].time = (new Date()).getTime()
        this.statistical.dataVal[2] = this.statistical.dataVal[3]
      }
    },
    zh (newJson, json) {
      for (let k = 0; k < newJson.length; k++) {
        for (let j = 0; j < json.length; j++) {
          if (json[j].pId === newJson[k].orgId) {
            if (newJson[k].children === undefined) {
              newJson[k].children = []
            }
            json[j].children = []
            newJson[k].children.push(json[j])
            json.splice(j, 1)
            j -= 1
          }
        }
        if (newJson[k].children.length > 0) {
          this.zh(newJson[k].children, json)
        }
      }
    },
    json (json) {
      const newJson = []
      for (let i = 0; i < json.length; i++) {
        if (json[i].pId == null) {
          json[i].children = []
          newJson.push(json[i])
          json.splice(i, 1)
          i -= 1
        }
      }
      this.zh(newJson, json)
      return newJson
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
        data2.push(item[this.fieldName])
      })
      this.yesterDayStatisticsData.forEach(item => {
        timeArr.push(item.createTime)
        data1.push(item[this.fieldName])
      })
      this.statistical.chartData.nameList = timeArr
      this.statistical.chartData.data1 = data1
      this.statistical.chartData.data2 = data2
      this.statistical.chartData.time = (new Date()).getTime()
    },
    // 传值给地图
    postMessage (data) {
      const _this = this
      if (!/*@cc_on!@*/ 0) {  //if not IE
        if (_this.$refs.prevIframe) {
          _this.$refs.prevIframe.onload = function() {
            _this.$refs.prevIframe.contentWindow.postMessage(data,'*')
          }
        }
        _this.$refs.prevIframe.contentWindow.postMessage(data,'*')
      } else {
        _this.$refs.prevIframe.onreadystatechange = function() {
          if (_this.$refs.prevIframe.readyState == "complete") {
            _this.$refs.prevIframe.contentWindow.postMessage(data,'*')
          }
        };
        _this.$refs.prevIframe.contentWindow.postMessage(data,'*')
      }
    },
    // 主题列表搜索
    async themeList () {
      const data = await this.$axios('/api/homePage/getPlanListByName', {
        name: this.themeName,
        pageNum: 1,
        pageSize: 999
      });
      this.cameraTemgArr = data.list
    },
    // 左-获取镜头机构列表
    async getCameraOrgList(val) {
      const self = this
      let url = '/api/userShotLinkage/getOrgShotInfoNew'
      let param = {
        orgId: '10',
        pageNum: 1,
        pageSize: 100
      }
      if(val) {
        url = '/api/userShotLinkage/getOrgShotInfoNew'
        param.orgId = val.orgId
        // param.pId = val.orgId
      }
      const data = await this.$axios(url, param)
      if(val) {
        self.cameraOrgArr[0].children.map(item => {
          if(item.orgId == val.orgId) {
            item.children = data.list
          }
        })
      } else {
        self.cameraOrgArr = self.json(data.list)
        self.values = self.cameraOrgArr[0].orgName
        self.checkedList = self.cameraOrgArr[0].orgId
        self.maxOrgValueData(self.cameraOrgArr[0].orgId)
        self.rankOrgCameraList(self.cameraOrgArr[0].orgId)
        self.rankOrgHotList(this.checkedList)
        self.rankOrgFaultList(this.checkedList)
        const msg = { type: "changeOrg", data: { id: self.cameraOrgArr[0].orgId } }
        self.postMessage(msg)
      }
    },
    // 主题列表峰值&镜头统计图
    async maxValueData (id) {
      const data = await this.$axios('/api/homePage/getPlanStatisticsById', {
        planId: id
      });
      this.maxValue = data
      this.statistical.dataVal[0].total = data.type1OnlineNum + data.type23OnlineNum
      this.statistical.dataVal[0].data[0].value = data.type1OnlineNum    // 一类点
      this.statistical.dataVal[0].data[0].name = '一类点在线数    ' + data.type1OnlineNum
      this.statistical.dataVal[0].data[1].value = data.type23OnlineNum   // 2、3类点
      this.statistical.dataVal[0].data[1].name = '二三类点在线数    ' + data.type23OnlineNum
      this.statistical.dataVal[0].time = (new Date()).getTime()
    },
    // 机构列表峰值&镜头统计图
    async maxOrgValueData (id) {
      const data = await this.$axios('/api/homePage/getOrgStatisticsById', {
        orgId: id
      });
      this.maxValue = data
      this.statistical.dataVal[0].total = data.type1OnlineNum + data.type23OnlineNum
      this.statistical.dataVal[0].data[0].value = data.type1OnlineNum    // 一类点
      this.statistical.dataVal[0].data[0].name = '一类点    ' + data.type1OnlineNum
      this.statistical.dataVal[0].data[1].value = data.type23OnlineNum   // 2、3类点
      this.statistical.dataVal[0].data[1].name = '二三类点    ' + data.type23OnlineNum
      this.statistical.dataVal[0].time = (new Date()).getTime()
    },
    // 主题下热点镜头排行榜
    async rankCameraList (id) {
      let params = {
        id: id,
        type: 0, // 1：机构
        content: '',
        circleType: [1, 2, 3, 4],
        cameraType: 0,
        onlineCallFlag: 0, // 0:全量 1:实时
        pageNum: '1',
        pageSize: '5'
      }
      const data = await this.$postAxios('/api/userShotLinkage/getCameraInfoBySearch', params);
      this.rankList0 = data.list
    },
    // 机构下热点镜头排行榜
    async rankOrgCameraList (id) {
      let params = {
        id: id,
        type: 1, // 1：机构
        content: '',
        cameraType: 0,
        pageNum: '1',
        pageSize: '5'
      }
      const data = await this.$postAxios('/api/userShotLinkage/getCameraInfoBySearch', params);
      this.rankList0 = data.list
    },
    // 主题热点区域排行榜
    async rankHotList (id) {
      const data = await this.$axios('/api/homePage/getHotAreaTopN', {
        planId: id,
        pid: 10,
        n: 5
      });
      this.rankList1 = data
    },
    // 机构热点区域排行榜
    async rankOrgHotList (id) {
      const data = await this.$axios('/api/homePage/getHotAreaTopNByOrgId', {
        pid: id,
        n: 5
      });
      this.rankList1 = data
    },
    // 主题故障区域排行榜
    async rankFaultList (id) {
      const data = await this.$axios('/api/homePage/getFaultAreaTopN', {
        planId: id,
        pid: 10,
        n: 5
      });
      this.rankList2 = data
    },
    // 主题故障区域排行榜
    async rankOrgFaultList (id) {
      const data = await this.$axios('/api/homePage/getFaultAreaTopNByOrgId', {
        pid: id,
        n: 5
      });
      this.rankList2 = data
    },
    // 今日数据统计
    async todayStatistics (id) {
      const data = await this.$axios('/api/homePage/getTodayStatistics', {
        orgId: id
      });
      this.todayStatisticsData = data
    },
    // 视频资源分配
    async videoResourceAllocation () {
      let self = this
      const data = await self.$axios('/api/homePage/getVideoCloudAllocation', {});
      self.distributeList = [
        {
          title: 'CPU/核',
          progressData: {
            usedNum: data.cpuUsedNum,
            totalNum: data.cpuNum,
          }
        }, {
          title: '内存/GB',
          progressData: {
            usedNum: data.memoryUsedNum,
            totalNum: data.memoryNum,
          }
        }, {
          title: '存储/GB',
          progressData: {
            usedNum: data.storageUsedNum,
            totalNum: data.storageNum,
          }
        }, {
          title: 'GPU/核',
          progressData: {
            usedNum: data.gpuUsedNum,
            totalNum: data.gpuNum,
          }
        }
      ]
      // self.loadList.forEach((item, index) => {
      //   let temp = self.distributeList[index]
      //   self.loadList[index].percent = Math.floor(temp.progressData.usedNum / temp.progressData.totalNum * 100) + '%'
      // })
    },
    // 视频云资源情况 负载情况
    async videoResourceLoad () {
      const data = await this.$axios('/api/homePage/getVideoCloudLoader', {});
      this.videoResourceLoadData = data
      this.statistical.dataVal[1].total = data.platformStability + '%'
      this.statistical.dataVal[1].data[0].value = data.offlineMinutesOneDay
      this.statistical.dataVal[1].data[0].name = '日  分钟/离线' + '    ' + data.offlineMinutesOneDay
      this.statistical.dataVal[1].data[1].value = data.offlineMinutesOneWeek
      this.statistical.dataVal[1].data[1].name = '周  分钟/离线' + '    ' + data.offlineMinutesOneWeek
      this.statistical.dataVal[1].data[2].value = data.offlineMinutesOneWeek
      this.statistical.dataVal[1].data[2].name = '月  分钟/离线' + '    ' + data.offlineMinutesOneWeek
      this.statistical.dataVal[1].time = (new Date()).getTime()
    },
    // 实时告警
    async realTimeAlarm () {
      this.sjNub = {
        nub1: this.random(5, 20),
        nub2: this.random(5, 20),
        nub3: this.random(5, 20)
      }
      const num1 = this.sjNub.nub1
      const num2 = this.sjNub.nub2
      const num3 = this.sjNub.nub3
      const data = await this.$axios('/api/homePage/getAlarmStatistics', {});
      this.alarmDataObj = data
      this.statistical.dataVal[2].total = num1 + num2 + num3
      const percentage1 = Math.floor(num1/this.statistical.dataVal[2].total*100)
      const percentage2 = Math.floor(num2/this.statistical.dataVal[2].total*100)
      const percentage3 = Math.floor(num3/this.statistical.dataVal[2].total*100)
      this.statistical.dataVal[2].data[0].value = num1
      this.statistical.dataVal[2].data[0].name = '设备    ' + num1 + '/' + percentage1 + '%'
      this.statistical.dataVal[2].data[1].value = num2
      this.statistical.dataVal[2].data[1].name = '链路    ' + num2 + '/' + percentage2 + '%'
      this.statistical.dataVal[2].data[2].value = num3
      this.statistical.dataVal[2].data[2].name = '服务    ' + num3 + '/' + percentage3 + '%'
      this.statistical.dataVal[2].time = (new Date()).getTime()
    },
    // 中下的折线统计图
    async brokenStatistics () {
      const nowData = await this.$axios('/api/homePage/getTrendStatistics', {
        orgId: 10,
        pageNum: 1,
        pageSize: 100,
        startTime: this.getTimeStamp(),
        endTime: (new Date()).getTime()
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
        if(item.orgName === "交通") {
          item.orgName = '交警'
        }
      })
      this.barStatisticsData = data.list
    },
    // 数字分割符号
    segmentation(num) {
      return parseFloat(num).toLocaleString()
    },
    totalDay () {
      const mm = new Date().getTime() - new Date('2020/05/09').getTime()
      return Math.floor(mm/1000/60/60)
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem .5rem 1rem;
  box-sizing: border-box;
  user-select: none;
  z-index: 5;
  .video-model {
    .ant-row {
      margin-top: 0.5rem;
    }
    .list-title {
      justify-content: left !important;
    }
    .list-counts {
      .ant-col {
          text-align: right;
          padding-right: .8125rem;
          .text {
            float: left;
          }
          .first-text {
            padding-left: 1.5rem;
          }
      }
    }
    .css-target-number {
      .type-num {
        font-size: 16px;
        margin-left: 0.25rem;
      }
      li {
        > span {
          text-align: left;
          margin-left: 0.5rem;
        }
        > span:last-child {
          font-size: 12px;
          color: #afbcd4;
        }
      }
    }
    .white-color {
      color: #fff;
    }
    .blue-color {
      color: #45c9eb !important;
    }
    .list-name {
      // margin-left: 1.4rem;
    }
    .total-num {
      font-size: 18px;
      color: #fff;
      opacity: 1;
      padding-left: 0.25rem;
    }
    .js-centerProp {
      position: absolute;
      right: 1rem;
    }
    .font-size18 {
      font-size: 18px;
    }
    .online-situation {
      li {
        & > span {
          text-align: right;
          padding-right: 10px;
        }
        .float-l {
          float: left;
          padding-left: 10px;
        }
      }
    }
  }
  .list-title>.list-title-name {
    padding: 0 !important;
  }
  .wrap-sidebar-left {
    .css-left-1 {
      border-left: 4px solid $theme-button;
      position: relative;
      .css-tooltip{
        color: inherit;
        cursor: pointer;
      }
      .css-tag{
        position:absolute;
        top:10px;
        right:10px
      }
      .css-themeData {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: calc(100% - 5.5rem);
        > li {
          display: flex;
          padding: 0.25rem 0;
          > span {
            color: $theme-green;
            font-size: 1rem;
            flex: 1;
          }
          > span:first-child {
            font-size: 1rem;
            flex: 2;
            color: inherit;
          }
          > span:last-child {
            text-align: right;
          }
          > span:nth-of-type(2) {
            // padding-left: 20px;
            text-align: right;
          }
        }
      }
    }
    .css-left-2 {
      overflow: hidden;
      height: 100%;
      .css-imgBox {
        user-select: none;
      }
      .css-newMsg {
        background: $theme-select;
        height: 40px;
        line-height: 40px;
        padding: 0 12px;
        border-radius: 4px;
        margin-top: 10px;
        > span:nth-of-type(1) {
          font-size: 16px;
        }
        > span:nth-of-type(2) {
          float: right;
          color: $theme-green;
          font-size: 20px;
        }
      }
      .css-pieMsg {
        height: calc(100% - 120px);
        max-height: 290px;
      }
      .css-themeData {
        height: calc(100% - 8rem);
        display: flex;
        flex-direction: column;
        > li {
          padding: 0.25rem 0;
          flex: 1;
          display: flex;
          > span {
            color: $theme-green;
            font-size: 14px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          > span:first-child {
            font-size: 14px;
            flex: 2;
            color: inherit;
          }
          > span:last-child {
            text-align: right;
          }
          > span:nth-of-type(2) {
            text-align: right;
          }
        }
        > li:first-child {
          span {
            color: inherit;
          }
        }
      }
    }
    .css-left-3 {
      height: 100%;
      .css-list {
        height: 100%;
        overflow: auto;
        & ul {
          display: flex;
          flex-direction: column;
          height: 100%;
          & li {
            border-bottom: 1px solid #3d586f;
            flex: 1;
            display: flex;
            flex-direction: initial;
            align-items: center;
            & span {
              font-size: 12px;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              vertical-align: bottom;
            }
            & span:first-child {
              width: 31%;
            }
            & span:nth-of-type(2) {
              width: 56%;
            }
            & span:last-child {
              width: 13%;
              float: right;
            }
          }
        }
      }
    }
    .css-left-4 {
      height: 100%;
      overflow: auto;
      .table-list-box {
        padding: 0;
      }
    }
  }
  .wrap-sidebar-center {
    padding: 0;
    .wrap-card {
      position: absolute;
      bottom: 0;
    }
    .list-title {
      overflow: hidden;
      > p {
        float: left;
      }
      > ul {
        margin-top: 7px;
        float: right;
        > li {
          float: left;
          background: $theme-select;
          margin: 0 3px;
          text-align: center;
          line-height: 28px;
          padding: 0 6px;
          cursor: pointer;
        }
        > li.active {
          color: $theme-yellow;
        }
      }
    }
    .css-echarts {
      height: calc(100% - 5.5rem);
    }
    .css-legend {
      width: 100%;
      overflow: hidden;
      position: absolute;
      top: 1rem;
      z-index: 5;
      > span {
        background: $theme-select;
        width: 100px;
        height: 30px;
        display: inline-block;
        text-align: center;
        line-height: 30px;
        font-weight: 500;
        font-size: 16px;
        cursor: pointer;
        > img {
          margin-right: 8px;
          vertical-align: text-top;
        }
        &.css-legends {
          background: initial;
          width: inherit;
          float: right;
          text-align: right;
          margin-left: 20px;
          width: 80%;
          > span {
            display: inline-block;
            margin-left: 20px;
            > span {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  .wrap-sidebar-right {
    .css-right-1 {
      font-size: 12px;
      .load-subtitle {
        margin-top: 1.5rem;
      }
      .distribute-subtitle,
      .load-subtitle {
        margin-bottom: .5rem;
        p {
          border-bottom: 1px #2D343E solid;
          padding-bottom: .3125rem;
          font-size: 14px;
        }
      }
      .ant-row {
        .load-item {
          text-align: center;
          // border-image-source: url('~@/assets/img/runOverview/load-border.png');
          // border-style: none;
          border-right: 1px #3F4956 solid;
          span {
            display: block;
          }
          .load-percent {
            font-size: 20px;
            color: #45c9eb;
          }
        }
        .load-col-last {
          .load-item {
            border-right: none;
          }
        }
      }

      > ul {
        margin: 0;
        > li {
          display: flex;
          margin-bottom: 0.5rem;
          > span:first-child {
            flex: 1;
            padding-top: 4px;
            padding-left: 5px;
          }
          > span:last-child {
            flex: 4;
          }
          > span:nth-of-type(2) {
            flex: 1;
            padding-top: 4px;
          }
        }
        > li:last-child {
          margin: 0;
        }
      }
    }
    .css-right-2 {
      overflow: hidden;
      height: 100%;
      .ant-row {
        .ant-col-9 {
          .vcn-count {
            background: #00172D;
            margin-right: 1rem;
            text-align: center;
            border-radius: 4px;
            span {
              display: block;
            }
            .num {
              font-size: 20px;
              color: #45c9eb;
            }
          }
          .vcn-count-1 {
            margin-top: .75rem;
            margin-bottom: .75rem;
          }
        }
        .ant-col-15 {
          .storage-content {
            width: 100%;
            .storage-time {
              width: 100%;;
              font-size: 14px;
              border-top: 1px #2D343E solid;
              span {
                display: inline-block;
                width: 120px;
                text-align: center;
                // padding-left: .75rem;
              }
              .storage-desc {
                width: 50%;
                border-left: 1px #2D343E solid;
                border-right: 1px #2D343E solid;
              }
              .storage-count {
                width: 50%;
                font-size: 14px;
                color: #45c9eb;
                border-right: 1px #2D343E solid;
              }
              .storage-first-count {
                color: #afbcd4;
              }
            }
            .storage-last-time {
              border-bottom: 1px #2D343E solid;
            }
          }
        }
      }
      > .css-pieMsg {
        height: 59%;
        height: 12rem;
      }
    }
    .css-right-3 {
      .css-tag {
        text-align: right;
      }
      .css-pieMsg {
        height: 12rem;
        width: 100%;
      }
      .css-listBox {
        height: calc(100% - 16rem);
        overflow: hidden;
      }
    }
  }
}
.search-table-box {
  position: absolute;
  top: 16%;
  width: calc(20% - 2rem);
  z-index: 100;
  padding: 1rem;
  box-sizing: border-box;
  background: $theme-select;
  border-radius: .3rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(23, 45, 116);
  max-height: 30rem;
  overflow: auto;
  display: block;
  &.camera {
    left: 2.2rem;
  }
}
.css-listBox li {
  border-bottom: 1px solid #3d586f;
  font-size: 12px;
  padding: 0 3px;
  line-height: 30px;
  > span {
    display: inline-block;
  }
  > span:first-child {
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
  }
  > span:nth-of-type(2) {
    width: 23%;
  }
  > span:last-child {
    width: 37%;
    text-align: center;
  }
}
.css-childBg {
  opacity: 1;
  padding: 0 1rem;
  box-sizing: border-box;
  height: 100%;
}
.load-info {
  padding-bottom: 0px;
}

.css-legend-content {
  background: rgba(11, 18, 81, 0.8);
  li {
    font-size: 12px;
    padding: 5px 12px;
    > span {
      margin-right: 8px;
    }
    p.css-title {
      font-size: 16px;
      color: $theme-font;
    }
    img {
      width: 16px;
      vertical-align: sub;
      margin-right: 10px;
    }
    &:hover {
      background: initial;
    }
    .ant-checkbox {
      margin-right: 10px;
    }
  }
  span.css-color {
    margin-right: 15px;
    width: 10px;
    height: 10px;
    display: inline-block;
  }
  span.color1 {
    background: $theme-legend1;
  }
  span.graph-case-color1 {
    background: $theme-legend5;
  }
  span.color2 {
    background: $theme-legend2;
  }
  span.color3 {
    background: $theme-legend3;
  }
  span.gray {
    background: $theme-legend-gray;
  }
  .css-colors {
    display: inline-block;
    > span {
      display: inline-block;
      width: 10px;
      height: 10px;
    }
  }
  .colors1 {
    margin-right: 8px;
    > span:nth-of-type(1) {
      // background: #f59026;
      background: #04F6FF;
    }
    > span:nth-of-type(2) {
      // background: #5321b8;
      background: #1700FF;
    }
    > span:nth-of-type(3) {
      // background: #4e6cfe;
      background: #C37EFF;
    }
  }
  .colors2 {
    margin-right: 8px;
    > .first-lmap-color {
      background: #BB0944;
    }
    > .second-lmap-color {
      background: #C3B337;
    }
    > .third-lmap-color {
      background: #1CD52E;
    }
    > .gray {
      background: $theme-legend-gray;
    }
  }
  .ant-radio-group {
    width: 100%;
    > li {
      padding: 5px 12px;
    }
  }
}
.css-alarmMsg {
  > p {
    line-height: 30px;
    > span {
      display: inline-block;
    }
    > span:first-child {
      width: 130px;
    }
  }
}
</style>

<style lang="scss">
.css-left-1 {
  .css-checkedName {
    background: $theme-select;
    border-radius: 4px;
  }
}
.css-checkedName input {
  background: $theme-select !important;
  border-color: $theme-select;
  cursor: initial !important;
  &:hover{
    border-color: transparent !important;
  }
}
// 弹框样式
.css-msgProp {
  .ant-modal-content {
    background: rgba($theme-select, 0.9);
    opacity: 1;
    border-radius: 5px;
    overflow: hidden;
  }
  .ant-modal-close {
    color: $theme-font;
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-close-x {
    height: 40px;
    width: 40px;
    line-height: 40px;
    color: $theme-font;
  }

  .ant-tabs {
    color: $theme-font;
  }
  .ant-tabs-bar {
    border: none;
    background: $theme-bar;
    padding: 0 10px;
    margin: 0;
  }
  .ant-tabs-nav .ant-tabs-tab-active {
    color: $theme-font;
  }
  .ant-tabs-nav .ant-tabs-tab:hover {
    color: $theme-font;
  }
  .ant-tabs-ink-bar {
    background-color: $theme-rad-border;
  }
  .ant-tabs-nav .ant-tabs-tab {
    margin-right: 15px;
    padding: 10px 5px;
  }
  .ant-tabs-tabpane {
    padding: 0 10px 15px 20px;
  }
}
.css-childBg {
  .ant-tabs {
    height: calc(100% - 3.5rem);
  }
  .ant-tabs-bar {
    border: none;
    margin: 0;
  }
  .ant-tabs-tab,.ant-tabs-tab:hover {
    color: inherit;
  }
  .ant-tabs-nav .ant-tabs-tab-active,.ant-tabs-nav .ant-tabs-tab-active:hover{
    color: inherit;
    font-weight: initial;
  }
  .ant-tabs-ink-bar{
    background-color: $theme-yellow;
  }
  .ant-tabs-nav .ant-tabs-tab {
    margin-right: 4.1%;
    // width: 33.3%;
    // text-align: center;
  }
  .ant-tabs .ant-tabs-top-content.ant-tabs-content-animated{
    height: calc(100% - 45px);
  }
}
.graph-case-color1 {
  background: $theme-legend5;
}
</style>

