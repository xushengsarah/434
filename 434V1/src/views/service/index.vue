<template>
  <!-- 服务概览 -->
  <div class="server">
    <div class="wrap-sidebar wrap-sidebar-left">
      <div class="wrap-card wrap-card-27">
        <div class="css-childBg css-left-1">
          <div class="list-title">
            <span class="list-title-name">服务数量</span>
            <p style="padding-left:5px">{{currentTitle}}</p>
          </div>
          <!-- <svg width="100%" height="100%" version="1.1" xmln="http://www.w3.org/2000/svg">
            <defs>
              <marker
              id="arrow"
              markerWidth="12"
              markerHeight="12"
              viewBox="0 0 12 12"
              refX="6"
              refY="6"
              orient="auto">
              <path d="M2, 2 L10, 6 L2, 10 L6, 6 L2, 2" style="fill: #000000;"></path>
              </marker>
            </defs>
            <line x1="0" y1="0" x2="200" y2="50" stroke="red" stroke-width="2" marker-red="url(#arrow)"></line>
            <path d="M20, 70 T80, 100 T160, 80 T200, 90" fill="white" stroke="red" stroke-width="2" marker-start="url(#arrow)" marker-mid="url(#arrow)" marker-end="url(#arrow)"></path>
          </svg> -->
          <!-- <svg width="100%" height="100%">
            <g transform="translate(0,0) scale(1)">
                <g>
                    <defs>
                        <marker id="triangle" markerUnits="strokeWidth" markerWidth="5" markerHeight="4" refX="0" refY="2" orient="auto" stroke="red">
                            <path d="M 0 0 L 5 2 L 0 4 z" />
                        </marker>
                    </defs>
                    <path d="M 0,0 L 100,100" stroke="red" stroke-width="2" stroke-dasharray="2, 2" fill="none"
                        style="marker-end: url(#triangle); fill: #fff" />
                </g>
            </g>
          </svg> -->

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
      <!-- <div>
        <a-tabs v-model="activeKey" hide-add type="card" @change="onChangeTabs">
          <a-tab-pane key="1" tab="视综登录"></a-tab-pane>
          <a-tab-pane key="2" tab="播放实况（VCN对接）"></a-tab-pane>
          <a-tab-pane key="3" tab="播放实况（国标对接）"></a-tab-pane>
        </a-tabs>
      </div> -->
      <div class="wrap-card wrap-card-72">
        <div class="css-architecture">
          <div class="css-components">
            <p class="css-title">基础服务组件</p>
            <p class="css-diamond css-components1">星火中台</p>
            <ul>
              <li><span class="css-short">管理服务</span></li>
              <li><span class="css-short">异常管理</span></li>
              <li><span class="css-short">指标统计</span></li>
              <li><span class="css-short">远程日志</span></li>
              <li><span class="css-short">发布平台</span></li>
              <li><span class="css-short">配置中心</span></li>
              <li><span class="css-short">业务信息上报</span></li>
            </ul>
          </div>
          <div class="css-serverList">
            <div class="css-apply">
              <div class="css-qian">
                <div class="css-size2">
                  <span class="css-diamond css-nub1">应用层</span>
                </div>
                <div class="css-size5">
                  <span id="pcdashArrow" class="css-long css-nub2 pc-dashArrow">PC-Client/APP/WEB/第三方平台/电视墙</span>
                </div>
                <div class="css-size3">
                  <span class="css-short css-nub3">第三方应用</span>
                </div>
              </div>
              <div class="css-view">
                <div class="css-size1">
                  <span class="css-abnormality css-nub4">视图库应用</span>
                </div>
                <div class="css-size1">
                  <span class="css-abnormality css-nub5">城市人像应用</span>
                </div>
              </div>
            </div>
            <div class="css-gateway">
              <div class="css-qian">
                <div class="css-size1">
                  <span class="css-diamond css-nub1">网关层</span>
                </div>
                <div class="css-size1">
                  <span>
                    <a-badge :count='MXHAAAGATEWEYData.length' :number-style="{backgroundColor: '#0EB4CE'}">
                      <span id="gatewaydashArrow" class="css-short css-nub2 gateway-server gateway-dashArrow" data-code="XH-AAA-GATEWEY" @click="getServerDetail(MXHAAAGATEWEYData)">HTTP网关</span>
                    </a-badge>
                  </span>
                </div>
                <div class="css-size1">
                  <span>
                    <a-badge :count='XPUSHSERVERData.length'  :number-style="{backgroundColor: '#0EB4CE'}">
                      <span class="css-short css-nub3" data-code="XPUSHSERVER" @click="getServerDetail(XPUSHSERVERData)">推送网关</span>
                    </a-badge>
                  </span>
                </div>
                <div class="css-size1">
                  <span>
                    <a-badge :count='XHGBGATEWAYSERVERData.length'  :number-style="{backgroundColor: '#0EB4CE'}">
                      <span class="css-short css-nub4" data-code="XHGBGATEWAYSERVER" @click="getServerDetail(XHGBGATEWAYSERVERData)">国标网关</span>
                    </a-badge>
                  </span>
                </div>
                <div class="css-size1">
                  <span class="css-short css-nub5">统一SDK</span>
                </div>
              </div>
              <div class="css-view">
                <div class="css-size1">
                  <span class="css-abnormality">视图库网关</span>
                </div>
              </div>
            </div>
            <div class="css-business">
              <div class="css-qian">
                <div class="css-size3">
                  <span class="css-diamond css-nub1">业务层</span>
                </div>
                <div class="css-size4">
                  <li>
                    <a-badge :count='XHAAAAUTHData.length'  :number-style="{backgroundColor: '#0EB4CE'}">
                      <span id="authdashArrow" class="css-short css-nub2 auth-server auth-dashArrow" data-code="XH-AAA-AUTH" @click="getServerDetail(XHAAAAUTHData)">鉴权服务</span>
                    </a-badge>
                  </li>
                  <li><span class="css-short css-nub3">案件视频服务</span></li>
                  <li><span class="css-short css-nub4">认证服务</span></li>
                  <li><span class="css-short css-nub5">升级服务</span></li>
                </div>
                <div class="css-size4">
                  <li><span id="infodashArrow" class="css-short css-nub2 info-dashArrow">短信服务</span></li>
                  <li><span class="css-short css-nub3">工作流程服务</span></li>
                  <li><span class="css-short css-nub4">云台管理服务</span></li>
                  <li>
                  <a-badge :count='XHAAAXHLOGData.length'  :number-style="{backgroundColor: '#0EB4CE'}">
                    <span class="css-short css-nub5 log-server" data-code="XH-AAA-XHLOG" @click="getServerDetail(XHAAAXHLOGData)">日志服务</span>
                  </a-badge>
                  </li>
                </div>
                <div class="css-size8">
                  <ul>
                    <li>
                      <span class="css-short css-nub2">列表服务</span>
                      <span class="css-short css-nub3">研判服务</span>
                    </li>
                    <li><span class="css-short css-big">并发数据<br/>处理服务</span></li>
                  </ul>
                  <div>
                    <li><span class="css-short css-nub2">矩阵管理服务</span></li>
                    <li>
                      <span>矩阵服务</span>
                      <span>......</span>
                      <span>矩阵服务N</span>
                    </li>
                  </div>
                </div>
                <div class="css-size1">
                  <div class="css-vertical"><span>综合管理服务</span></div>
                </div>
                <div class="css-size1">
                  <div class="css-vertical"><span>运维管理服务</span></div>
                </div>
                <div class="css-size1">
                  <div class="css-vertical"><span>一机一档服务</span></div>
                </div>
                <div class="css-size4">
                  <ul class="css-vertical list">
                    <li>
                      <a-badge :count='XHVIDEOMAPINNERData.length'  :number-style="{backgroundColor: '#0EB4CE'}">
                        <span class="css-short css-nub2 map-server" data-code="XHVIDEOMAPINNER" @click="getServerDetail(XHVIDEOMAPINNERData)">地图管理服务</span>
                      </a-badge>
                    </li>
                    <li><span>API接口服务</span></li>
                    <li><span>图层服务</span></li>
                    <li><span>地图引擎</span></li>
                  </ul>
                </div>
              </div>
              <div class="css-view">
                <div class="css-vertical list right business">
                  <li>
                    <span>数据检索服务</span>
                    <span>模型分析服务</span>
                    <span>算法调度服务</span>
                    <span>布控告警服务</span>
                    <span>数据清洗服务</span>
                    <span>检索服务</span>
                    <span>库管理服务</span>
                    <span>动静态人像服务</span>
                    <span>镜头接入调度服务</span>
                    <span>数据清洗</span>
                    <span>特征分发服务</span>
                    <span>特征提取</span>
                    <span>布控告警服务</span>
                    <span>数据运维监测服务</span>
                  </li>
                  <li>
                    <span class="css-abnormalityBig">算法</span>
                  </li>
                </div>
              </div>
            </div>
            <div class="css-gateway">
              <div class="css-qian">
                <div class="css-size1">
                  <span class="css-diamond css-nub1">数据层</span>
                </div>
                <div class="css-size1">
                  <span>
                    <a-badge :count='REDISData.length'  :number-style="{backgroundColor: '#0EB4CE'}">
                      <span id="redisdashArrow" class="css-short css-nub2 redis-dashArrow" data-code="REDIS" @click="getServerDetail(REDISData)">Redis</span>
                    </a-badge>
                  </span>
                </div>
                <div class="css-size1">
                  <span>
                    <a-badge :count='MYSQLData.length'  :number-style="{backgroundColor: '#0EB4CE'}">
                      <span class="css-short css-nub3" data-code="MYSQL" @click="getServerDetail(MYSQLData)">Mysql</span>
                    </a-badge>
                  </span>
                </div>
                <div class="css-size1">
                  <span class="css-short css-nub4">视频存储</span>
                </div>
              </div>
              <div class="css-view">
                <div class="css-size1">
                  <span class="css-abnormality">时空大数据平台</span>
                </div>
              </div>
            </div>
            <div class="css-curIn">
              <div class="css-qian">
                <div class="css-size3">
                  <span class="css-diamond css-nub1">接入层</span>
                </div>
                <div class="css-size4">
                  <ul class="css-vertical list">
                    <li><span class="css-short">网管服务</span></li>
                    <li class="css-text">华为网管</li>
                    <li class="css-text">海康网管</li>
                    <li class="css-text">大华网管</li>
                    <li class="css-text">其他</li>
                  </ul>
                </div>
                <div class="css-size12">
                  <ul class="css-vertical list curIn">
                    <li>
                      <a-badge :count='XHCASCADESTREAMSERVERData.length'  :number-style="{backgroundColor: '#0EB4CE'}">
                        <span class="css-short stream-server" data-code="XHCASCADESTREAMSERVER" @click="getServerDetail(XHCASCADESTREAMSERVERData)" @dblclick="goUrl('/serDetails')" >流媒体</span>
                      </a-badge>
                    </li>
                    <li>
                      <ul class="row">
                        <li>
                          <ul>
                            <li>流媒体管理服务</li>
                            <li>华为接入流媒体</li>
                            <li>海康接入流媒体</li>
                            <li>大华接入流媒体</li>
                            <li>国际接入流媒体</li>
                            <li>其他</li>
                          </ul>
                        </li>
                        <li>
                          <ul class="row-center">
                            <li>RTSP</li>
                            <li>RTMP</li>
                            <li>WebRTC</li>
                            <li>HLS</li>
                            <li>GB28181</li>
                          </ul>
                        </li>
                        <li>
                          <ul>
                            <li>转码管理服务</li>
                            <li>硬件转码</li>
                            <li>......</li>
                            <li>软件转码</li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div class="css-size4">
                  <ul class="css-vertical list">
                    <li><span class="css-short">云台控制</span></li>
                    <li class="css-text">云台控制服务1</li>
                    <li class="css-text">......</li>
                    <li class="css-text">云台控制服务n</li>
                  </ul>
                </div>
                <div class="css-size4">
                  <ul class="css-vertical list">
                    <li><span class="css-short css-big">云图采集<br/>管理服务</span></li>
                    <li class="css-text">云图采集服务1</li>
                    <li class="css-text">......</li>
                    <li class="css-text">云图采集服务n</li>
                  </ul>
                </div>
                <div class="css-size1">
                  <div class="css-vertical">
                    <span>视频流存储服务</span>
                  </div>
                </div>
              </div>
              <div class="css-view">
                <ul class="css-vertical list right curIn">
                  <li><span class="css-abnormality">1400服务</span></li>
                  <li>
                    <ul class="row">
                      <li>
                        <ul>
                          <li><span class="css-abnormality">1400图片服务</span></li>
                          <li><span class="css-abnormality">离线接入</span></li>
                        </ul>
                      </li>
                      <li>
                        <ul>
                          <li class="css-text">......</li>
                          <li class="css-text"></li>
                        </ul>
                      </li>
                      <li>
                        <ul>
                          <li><span class="css-abnormality">1400图片服务</span></li>
                          <li><span class="css-abnormality">实时接入</span></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="css-equipment">
              <div class="css-size1">
                <span class="css-diamond css-nub1">设备层</span>
              </div>
              <div class="css-size1">
                <span class="css-diamond css-nub2 js-flicker">华为VCN</span>
              </div>
              <div class="css-size1">
                <span class="css-diamond css-nub3">海康DVR</span>
              </div>
              <div class="css-size1">
                <span class="css-diamond css-nub4">大华DVR</span>
              </div>
              <div class="css-size1">
                <span class="css-diamond css-nub5">IPC</span>
              </div>
              <div class="css-size1">
                <span class="css-diamond css-nub2">第三方平台</span>
              </div>
              <div class="css-size1">
                <span class="css-diamond css-nub3">摄像机</span>
              </div>
              <div class="css-size1">
                <span class="css-diamond css-nub4">抓拍机</span>
              </div>
              <div class="css-size1">
                <span class="css-diamond css-nub5">门禁设备</span>
              </div>
            </div>
          </div>
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

    <a-modal title="服务信息" :visible="isServeNews" footer = '' @cancel="handleServeNewsCancel" width="50%">
      <server-news ref="serveNewsDesktop"></server-news>
    </a-modal>

    <!-- <dash-array ref="serveNewsDesktop0" :position='linePosition[0]'></dash-array>
    <dash-array ref="serveNewsDesktop1" :position='linePosition[1]'></dash-array>
    <dash-array ref="serveNewsDesktop2" :position='linePosition[2]'></dash-array>
    <dash-array ref="serveNewsDesktop3" :position='linePosition[3]'></dash-array>
    <dash-array ref="serveNewsDesktop4" :position='linePosition[4]'></dash-array> -->

    <!-- <svg width="100%" height="100%">
        <g transform="translate(0,0) scale(1)">
            <g>
                <defs>
                    <marker id="triangle" markerUnits="strokeWidth" markerWidth="5" markerHeight="4" refX="0" refY="2" orient="auto" stroke="red">
                        <path d="M 0 0 L 5 2 L 0 4 z" />
                    </marker>
                </defs>
                <path d="M 0,0 L 100,100" stroke="red" stroke-width="2" stroke-dasharray="2, 2" fill="none" />
                <path :d="`${'M '+ linePosition[0].from.x || 0 + ',' + linePosition[0].from.y || 0 + ' L ' + linePosition[0].to.x || 0 + ',' + linePosition[0].to.y || 0}`" stroke="red" stroke-width="2" stroke-dasharray="2, 2" fill="none" />
                <path d="M 0,0 L 100,100" stroke="red" stroke-width="2" stroke-dasharray="2, 2" fill="none" style="marker-end: url(#triangle); fill: #fff" />
            </g>
        </g>
    </svg> -->

  </div>
</template>

<script>
import echartsBar from "@/components/echartsBar";
import echartsPie from "@/components/echartsPie";
import echartsLine from "@/components/echartsLine";
import echartsSemicircle from '@/components/echartsSemicircle'
import serverNews from '@/components/serverNews'
// import dashArrow from '@/components/dashArrow'
export default {
  components: {
    echartsBar,
    echartsPie,
    echartsLine,
    echartsSemicircle,
    serverNews,
    // dashArrow,
  },
  data() {
    return {
      timer: '', // 定时器
      timer1: '', // 计时器 循环获取数据
      timer2: '', // 计时器 循环获取数据

      fieldName: 'onlineUserNum',
      alarmType: 'a',
      currentTitle: '全部',

      activeKey: 1,
      linePosition: [
        {from: {}, to: {}},
        {from: {}, to: {}},
        {from: {}, to: {}},
        {from: {}, to: {}}
      ], // 所有连线节点的位置
      isServeNews: false, // 是否显示服务信息弹框
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
            id: "nub1",
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
            id: 'nub2',
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
            id: "nub3",
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
            id: 'nub4',
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
    // 获取连线的坐标位置
    // this.getAllArrowPostion()

    // 基础服务组件单击事件
    this.btnClick()

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
    // 获取连线的坐标位置
    // getAllArrowPostion() {
    //   let self = this
    //   let pcPosition = $('.pc-dashArrow')[0].getBoundingClientRect()
    //   // let pcPosition = document.getElementById('pcdashArrow').getBoundingClientRect()
    //   // let gatewayPosition = $('.gateway-dashArrow')[0].getBoundingClientRect()
    //   let gatewayPosition = document.getElementById('gatewaydashArrow').getBoundingClientRect()
    //   // let authPosition = $('.auth-dashArrow')[0].getBoundingClientRect()
    //   let authPosition = document.getElementById('authdashArrow').getBoundingClientRect()
    //   // let infoPosition = $('.info-dashArrow')[0].getBoundingClientRect()
    //   let infoPosition = document.getElementById('infodashArrow').getBoundingClientRect()
    //   // let redisPosition = $('.redis-dashArrow')[0].getBoundingClientRect()
    //   let redisPosition = document.getElementById('redisdashArrow').getBoundingClientRect()
    //   self.linePosition = [
    //     {from: pcPosition, to: gatewayPosition},
    //     {from: gatewayPosition, to: authPosition},
    //     {from: authPosition, to: infoPosition},
    //     {from: authPosition, to: redisPosition}
    //   ]
    //   console.log('9999999' + self.linePosition)
    // },
    // 基础服务组件单击事件
    btnClick() {
      const btnArr = document.querySelectorAll('.css-short')
      btnArr.forEach(item => {
        item.onclick = (event) => {
          this.currentTitle = event.target.innerText
        }
      })
    },
    // 切换tabs
    onChangeTabs(key) {},
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
    // 展示详细信息弹框
    getServerDetail(val) {
      const self = this
      clearTimeout(self.timer)
      self.timer = setTimeout(() => {
        this.isServeNews = true
        self.$nextTick(() => {
          if (self.$refs.serveNewsDesktop) {
            self.$refs.serveNewsDesktop.init(val)
          }
        })
      }, 300)
    },
    // 关闭服务信息弹框
    handleServeNewsCancel() {
      const self = this
      this.isServeNews = false
    },
    goUrl(url) {
      this.$router.push(url)
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
      // 左侧列
      .css-components {
        width: calc(12% - 1rem);
        height: calc(100% - 1rem);
        margin: .5rem;
        float: left;
        background: $theme-server-bg;
        border-radius: 4px;
        text-align: center;
        & .css-title {
          margin-top: 13%;
        }
        & .css-components1 {
          margin: 26% auto 26% auto;
        }
        & ul{
          display: flex;
          flex-direction: column;
          height: 60%;
          & li{
            flex: 1;
            margin: 0 auto;
            & span {
              display: inline-block;
            }
          }
        }
      }
      // 右侧
      .css-serverList {
        width: 88%;
        height: calc(100% - 1rem);
        margin: .5rem 0;
        float: left;
        display: flex;
        flex-direction: column;
        // 公共布局样式
        // left-70%
        .css-qian {
          flex: 7;
          display: flex;
          align-items: center;
          height: 100%;
          span {
            display: inline-block;
          }
        }
        // right-30%
        .css-view {
          flex: 3;
          display: flex;
          align-items: center;
          height: 100%;
          margin-left: 1rem;
          span {
            display: inline-block;
          }
        }
        // flex不同大小布局
        .css-size {
          @for $i from 0 through 100 {
            &#{$i} {
              flex: $i;
              height: 100%;
              display: flex;
              justify-content: center;
              flex-direction: column;
            }
          }
        }
        // 带虚线边框样式
        .css-vertical {
          margin: .5rem 0 .5rem .5rem;
          width: calc(100% - .5rem);
          height: calc(100% - 1rem);
          text-align: center;
          border: 1px dashed $theme-btn;
          border-radius: 4px;
          display: flex;
          & span {
            writing-mode: vertical-lr;
          }
          &.list {
            flex-direction: column;
            justify-content: center;
            span {
              writing-mode: initial;
            }
            & li {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .row {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              & li {
                flex: 3;
                &:nth-of-type(2) {
                  flex: 2;
                  .row-center {
                    background: $theme-select;
                    padding: 0 .3rem;
                  }
                }
              }
            }
            &.curIn {
              display: block;
              &> li {
                &:nth-of-type(1) {
                  height: 30%;
                }
                &:nth-of-type(2) {
                  height: 70%;
                }
              }
            }
          }
          &.list.right {
            margin: .5rem .5rem .5rem 0;
            &.business {
              display: block;
              li {
                display: block;
                &:nth-of-type(1) {
                  height: 75%;
                  & span {
                    padding-top: .5rem;
                    writing-mode: vertical-lr;
                    vertical-align: top;
                  }
                }
                &:nth-of-type(2) {
                  height: 25%;
                }
              }
            }
          }
        }
        // 右侧不同模块
        .css-apply {
          flex: 1;
          display: flex;
          background: $theme-server-bg;
          border-radius: 4px;
          margin-right: .5rem;
        }
        .css-gateway {
          flex: 1;
          display: flex;
          background: $theme-server-bg;
          border-radius: 4px;
          margin: .5rem .5rem 0 0;
        }
        .css-business {
          flex: 3;
          display: flex;
          background: $theme-server-bg;
          border-radius: 4px;
          margin: .5rem .5rem 0 0;
          .css-size8 {
            & ul {
              flex: 1;
              display: flex;
              flex-direction: row;
              align-items: center;
              li {
                flex: 1;
                text-align: center;
              }
            }
            & div {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              border-radius: 4px;
              border: 1px dashed $theme-btn;
              margin-bottom: .5rem;
              & li {
                flex: 6;
                width: 100%;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                &:nth-of-type(2) {
                  flex: 5;
                  & span {
                    display: inline-block;
                    width: 33.33%;
                  }
                }
              }
            }
          }
        }
        .css-curIn {
          flex: 3;
          display: flex;
          background: $theme-server-bg;
          border-radius: 4px;
          margin: .5rem .5rem 0 0;
          .css-text {
            height: 3rem;
          }
        }
        .css-equipment {
          flex: 1;
          display: flex;
          background: $theme-server-bg;
          border-radius: 4px;
          margin: .5rem .5rem 0 0;
        }
      }
      // 公共背景样式
      .css-diamond {
        background: url('~@/assets/img/ic_layer_one_dark.png') no-repeat center;
        width: 5rem;
        height: 4rem;
        line-height: 3.5rem;
        text-align: center;
        color: $theme-white;
      }
      .css-short {
        background: url('~@/assets/img/ic_btn three width_dark.png') no-repeat center;
        width: 5.5rem;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        color: $theme-white;
        cursor: pointer;
        &.css-big {
          height: 3rem;
          margin: .5rem 0;
          padding-top: .3rem;
          line-height: 1rem;
          background-size: 100% 100%;
        }
      }
      .css-long {
        background: url('~@/assets/img/ic_btn long  three_dark.png') no-repeat center;
        width: 17rem;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        color: $theme-white;
      }
      .css-abnormality {
        background: url('~@/assets/img/ic_btn two_dark.png') no-repeat center;
        width: 7.5rem;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        color: $theme-white;
      }
      .css-abnormalityBig {
        background: url('~@/assets/img/ic_btn two small_dark.png') no-repeat center;
        width: 18rem;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        color: $theme-white;
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
</style>

