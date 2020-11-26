<template>
  <div class="main">
    <div class="css-content">
      <div class="left">
        <div>
          <div class="css-childBg css-left-1 divActive">
            <p class="css-imgBox"><img src="@/assets/img/text_shenmu_dark.png" /></p>
            <p class="css-accPlt">
              <a-button size="small" data-title="接入情况" class="js-centerProp">查看接入详情</a-button>
            </p>
            <ul>
              <li>
                <span>一类点在线率</span>
                <span>{{Math.floor((getBaseData.data1.type1OnlineCount/getBaseData.data1.type1Count)*100)}}%</span>
              </li>
              <li>
                <span>二三类点在线率</span>
                <span>{{Math.floor((getBaseData.data1.type23OnlineCount/getBaseData.data1.type23Count)*100)}}%</span>
              </li>
              <li>
                <span>总在线率</span>
                <span>{{Math.floor((getBaseData.data1.totalOnlineCount/getBaseData.data1.totalCount)*100)}}%</span>
              </li>
            </ul>
            <div class="clear"></div>
            <div class="css-pieMsg">
              <echarts-pie :dataVal="statistical.dataVal[0]"></echarts-pie>
            </div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-left-2">
            <p class="css-imgBox"><img src="@/assets/img/text_portrait_dark.png" /></p>
            <p class="css-accPlt">
              <span><a-button size="small" data-title="接入情况" class="js-centerProp">查看接入详情</a-button></span>
            </p>
            <div class="css-upData">
              <li>
                <p>
                  <span>人像抓拍机总数</span>
                  <span>{{segmentation(getRightData.cityFace.data1.totalFaceCameraCount)}}</span>
                </p>
                <p>
                  <span>抓拍总数</span>
                  <span>
                    {{
                      getRightData.cityFace.data1.totalSnapshotCount>100000000
                      ?Math.floor(getRightData.cityFace.data1.totalSnapshotCount/100000000)
                      :segmentation(getRightData.cityFace.data1.totalSnapshotCount)
                    }}
                    <span v-if="getRightData.cityFace.data1.totalSnapshotCount/100000000>1">亿</span>
                  </span>
                </p>
              </li>
              <li>
                <p style="width:100%">
                  <span style="float:left">全量库入库总数</span>
                  <span style="float:left;margin-left:13%">{{segmentation(getRightData.cityFace.data1.totalFullLibCount)}}</span>
                </p>

              </li>
              <li>
                <p style="width:100%">
                  <span style="float:left">唯一库入库总数</span>
                  <span style="float:left;margin-left:13%">{{segmentation(getRightData.cityFace.data1.totalUniqueLibCount)}}</span>
                </p>
              </li>
            </div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-left-3">
            <p>
              <img src="@/assets/img/text_vedio access control_dark.png" />
            </p>
            <div class="css-upData">
              <li>
                <p>
                  <span>门禁设备总数</span>
                  <span>{{segmentation(getRightData.entranceGuard.data1.deviceNum)}}</span>
                </p>
                <p>
                  <span>人员住址总数</span>
                  <span>{{segmentation(getRightData.entranceGuard.data1.personAddress)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>房屋信息总数</span>
                  <span>{{segmentation(getRightData.entranceGuard.data1.houseAddress)}}</span>
                </p>
                <p>
                  <span>人像信息总数</span>
                  <span>{{segmentation(getRightData.entranceGuard.data1.msgTotalNum)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>门禁轨迹总数</span>
                  <span>{{segmentation(getRightData.entranceGuard.data1.accessControlTrack)}}</span>
                </p>
              </li>
            </div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-left-4">
            <p class="css-imgBox"><img src="@/assets/img/text_mobile audio vedio_dark.png" /></p>
            <div class="css-upData">
              <li>
                <p>
                  <span>总数</span>
                  <span>{{segmentation(getRightData.moveVideo.data1.total)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>执法记录仪</span>
                  <span>{{segmentation(getRightData.moveVideo.data1.recorderCount)}}</span>
                </p>
                <p>
                  <span>车载</span>
                  <span>{{segmentation(getRightData.moveVideo.data1.carCount)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>布控球</span>
                  <span>{{segmentation(getRightData.moveVideo.data1.ballCount)}}</span>
                </p>
                <p>
                  <span>无人机</span>
                  <span>{{segmentation(getRightData.moveVideo.data1.uavCount)}}</span>
                </p>
              </li>
            </div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-left-5" style="overflow:auto">
            <p class="css-imgBox">
              <img src="@/assets/img/text_access control_dark.png" />
            </p>
            <div class="css-upData" style="min-height:90px">
              <li>
                <p>
                  <span>卡口总数</span>
                  <span>{{segmentation(14755)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>调用总数</span>
                  <span>{{segmentation(getBaseData.data5.todayCallUnm)}}</span>
                </p>
                <p>
                  <span>调用用户总数</span>
                  <span>{{segmentation(getBaseData.data5.todayUserCallNum)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>查询车牌总数</span>
                  <span>{{segmentation(getBaseData.data5.todayQueryNum)}}</span>
                </p>
                <p>
                  <span>返回图片总数</span>
                  <span>{{segmentation(getBaseData.data5.todayPictureNum)}}</span>
                </p>
              </li>
            </div>
          </div>
        </div>
      </div>

      <div class="center">
        <p class="css-legend" v-if="showType===1">
          <span>
            <span class="css-color color1"></span>
            一类点总数/一类点在线率
          </span>
          <!-- <span>
            <span class="css-color color2"></span>
            二三类点总数/二三类点在线率
          </span> -->
          <span>
            <span class="css-color color3"></span>
            <!-- 镜头总数/在线率 -->
            镜头总数
          </span>
          <span>
            <span class="css-color color4"></span>
            在线用户数
          </span>
        </p>
        <p class="css-legend" v-else-if="showType===2">
          <span>
            <span class="css-color color1"></span>
            抓拍机数
          </span>
          <span>
            <span class="css-color color2"></span>
            今日抓拍数
          </span>
          <span>
            <span class="css-color color3"></span>
            今日告警数
          </span>
        </p>
        <p class="css-legend" v-else-if="showType===3">
          <span>
            <span class="css-color color1"></span>
            接入门禁设备数
          </span>
          <span>
            <span class="css-color color2"></span>
            采集人像信息数
          </span>
        </p>
        <p class="css-legend" v-else-if="showType===4">
          <span>
            <span class="css-color color1"></span>
            设备总数
          </span>
          <span>
            <span class="css-color color2"></span>
            在线数
          </span>
        </p>
        <p class="css-legend" v-else-if="showType===5">
          <span>
            <span class="css-color color1"></span>
            卡口数
          </span>
        </p>
        <div class="css-centent">
          <div class="css-title">
            <p>
              <img ref="imgSrc1" src="@/assets/img/text_trend sel_dark.png" />
              <!-- <img ref="imgSrc2" src="@/assets/img/text_play nor_dark.png" /> -->
            </p>
          </div>
          <div class="clear"></div>
          <p class="css-tag" style="margin:0">
            <a-radio-group default-value="line" button-style="solid" size="small" @change="changePic">
              <a-radio-button value="line">
                趋势
              </a-radio-button>
              <a-radio-button value="bar">
                机构
              </a-radio-button>
            </a-radio-group>
          </p>
          <div style="height:200px">
            <echarts-line v-if="showLine===true" :chartData="statistical.chartData"></echarts-line>
            <echarts-bar v-else :chartData="statistical.chartData1"></echarts-bar>
          </div>
        </div>
      </div>

      <div class="right" v-if="showType===1">
        <div>
          <div class="css-childBg css-right-2" style="position:relative;">
            <p><img src="@/assets/img/text_user transfer situation_dark-1.png" /></p>
            <a-button size="small" class="click" data-title="共享情况" style="position:absolute;top:15px;right:15px;">查看详情</a-button>
            <div class="css-upData">
              <li>
                <p>
                  <span>平台总数</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data2.platformCount)}}</span>
                </p>
                <p>
                  <span>共享镜头数</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data2.cameraCount)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>省厅</span>
                    <span>{{segmentation(getRightData.videoIntegrated.data2.stPlatformCount)}}</span>
                </p>
                <p>
                  <span>共享镜头数</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data2.stCameraCount)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>公安系统</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data2.gaPlatformCount)}}</span>
                </p>
                <p>
                  <span>共享镜头数</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data2.gaCameraCount)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>政府平台</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data2.zfPlatformCount)}}</span>
                </p>
                <p>
                  <span>共享镜头数</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data2.zfCameraCount)}}</span>
                </p>
              </li>
            </div>
            <div class="css-jd">
              <p>
                <span class="css-jdContent">
                  <span>{{segmentation(getRightData.videoIntegrated.data2.playCount)}}</span>
                  <span>总点播数</span>
                </span>
              </p>
              <p>
                <span class="css-jdContent">
                  <span>{{Math.floor(getRightData.videoIntegrated.data2.playTime/3600)}}<span>h</span></span>
                  <span>总点播时长</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-3">
            <p><img src="@/assets/img/text_user situation_dark.png" /></p>
            <div class="css-upData">
              <li>
                <p>
                  <span>用户总数</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data3.totalUserNum)}}</span>
                </p>
                <p>
                  <span>用户活跃总数</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data3.activeUserNum)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>今日登录数</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data3.loginCount)}}</span>
                </p>
                <p>
                  <span>今日使用总时长</span>
                  <span>{{Math.floor(getRightData.videoIntegrated.data3.loginTime/3600)}}<span>h</span></span>
                </p>
              </li>
            </div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-4">
            <p><img src="@/assets/img/text_vedio transfer situation_dark.png" /></p>
            <div class="css-tjData">
              <div class="css-pieMsg">
                <echarts-pie :dataVal="statistical.dataVal[1]"></echarts-pie>
              </div>
              <div class="css-pieMsg">
                <echarts-pie :dataVal="statistical.dataVal[2]"></echarts-pie>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-5">
            <p><img src="@/assets/img/text_case_dark.png" /></p>
            <div class="css-upData">
              <li>
                <p>
                  <span>案件总数</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data5.caseCount)}}</span>
                </p>
                <p>
                  <span>视频案件总数</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data5.videoCaseCount)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>破案数</span>
                    <span>{{segmentation(getRightData.videoIntegrated.data5.breakCaseCount)}}</span>
                </p>
                <p>
                  <span>人像协破案数</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data5.breakVideoCaseCount)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>今日案件上传数</span>
                  <span>{{segmentation(getRightData.videoIntegrated.data5.todayUploadCount)}}</span>
                </p>
              </li>
            </div>
            <!-- <span class="css-jdContent">
              <span>{{segmentation(getRightData.videoIntegrated.data5.todayUploadCount)}}</span>
              <span>今日案件上传数</span>
            </span> -->
          </div>
        </div>
      </div>

      <div class="right city" v-else-if="showType===2">
        <div>
          <div class="css-childBg css-right-1" data-title="接入情况">
            <p><img src="@/assets/img/text_access_dark.png" /></p>
            <div class="css-upData">
              <!-- <li>
                <p>
                  <span>人像抓拍机总数</span>
                  <span>{{segmentation(getRightData.cityFace.data1.totalFaceCameraCount)}}</span>
                </p>
                <p>
                  <span>抓拍总数</span>
                  <span>
                    {{
                      getRightData.cityFace.data1.totalSnapshotCount>100000000
                      ?Math.floor(getRightData.cityFace.data1.totalSnapshotCount/100000000)
                      :segmentation(getRightData.cityFace.data1.totalSnapshotCount)
                    }}
                    <span v-if="getRightData.cityFace.data1.totalSnapshotCount/100000000>1">亿</span>
                  </span>
                </p>
              </li>
              <li>
                <p>
                  <span>全量库入库总数</span>
                  <span>{{segmentation(getRightData.cityFace.data1.totalFullLibCount)}}</span>
                </p>
                <p>
                  <span>唯一库入库总数</span>
                  <span>{{segmentation(getRightData.cityFace.data1.totalUniqueLibCount)}}</span>
                </p>
              </li> -->
              <li>
                <p>
                  <span>今日抓拍数</span>
                  <span>{{Math.floor(getBaseData.data2.todaySnapshotCount/10000)}}<span>万张</span></span>
                </p>
                <p>
                  <span>今日告警数</span>
                  <span>{{segmentation(getBaseData.data2.todayAlarmCount)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>图片在线率</span>
                  <span>{{getBaseData.data2.snapshotOnlineRate}}%</span>
                </p>
                <p>
                  <span>视频在线率</span>
                  <span>{{getBaseData.data2.videoOnlineRate}}%</span>
                </p>
              </li>
              <li>
                <p>
                  <span>昨日唯一库新增</span>
                  <span>{{segmentation(getBaseData.data2.uniqueLibTodayAddCount)}}</span>
                </p>
                <p>
                  <span>昨日全量库新增</span>
                  <span>{{segmentation(getBaseData.data2.fullLibTodayAddCount)}}</span>
                </p>
              </li>
            </div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-2">
            <p><img src="@/assets/img/text_user transfer situation_dark-1.png" /></p>
            <div class="css-thisData">
              <ul>
                <li>
                  <span>平台</span>
                  <span>接口</span>
                </li>
                <li>
                  <span>情报</span>
                  <span>动态检索权限申请</span>
                </li>
                <li>
                  <span>执法闭环</span>
                  <span>
                    <span>静态人像</span>
                    <span>动态检索权限申请</span>
                  </span>
                </li>
                <li>
                  <span>管控一张网</span>
                  <span>布控告警</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-3">
            <p><img src="@/assets/img/text_user situation_dark.png" /></p>
            <p class="css-tag" style="position:absolute;top:20px;right:10px">
              <a-radio-group v-model="radioType" button-style="solid" size="small" @change="timeChange">
                <a-radio-button value="week">
                  近一周
                </a-radio-button>
                <a-radio-button value="month">
                  近一月
                </a-radio-button>
                <a-radio-button value="monthes">
                  近三月
                </a-radio-button>
              </a-radio-group>
            </p>
            <!-- <p class="css-totalShow">深目总用户量<span>{{getRightData.cityFace.data3.total}}</span></p> -->
            <div class="css-tjData">
              <div class="css-divBox">
                <p>深目开通城市人像权限情况</p>
                <div class="css-pieMsg">
                <echarts-pie :dataVal="statistical.dataVal[3]"></echarts-pie>
              </div>
            </div>

              <div class="css-divBox">
                <div class="css-pieMsg">
                  <p>城市人像用户活跃情况</p>
                  <echarts-pie :dataVal="statistical.dataVal[4]"></echarts-pie>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-4">
            <p><img src="@/assets/img/text_vedio transfer situation_dark.png" /></p>
            <div class="css-upData">
              <li>
                <p>
                  <span>动态检索总数</span>
                  <span>{{segmentation(getRightData.cityFace.data4.dynamicSearchCount)}}</span>
                </p>
                <p>
                  <span>日均数</span>
                  <span>{{segmentation(getRightData.cityFace.data4.dynamicSearchAverageCount)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>静态检索总数</span>
                  <span>{{segmentation(getRightData.cityFace.data4.staticSearchCount)}}</span>
                </p>
                <p>
                  <span>日均数</span>
                  <span>{{segmentation(getRightData.cityFace.data4.staticSearchAverageCount)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>日均告警数</span>
                  <span>{{segmentation(getRightData.cityFace.data4.controlAlarmAverageCount)}}</span>
                </p>
              </li>
            </div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-5">
            <p><img src="@/assets/img/text_case_dark.png" /></p>
            <div class="css-upData">
              <li>
                <p>
                  <span>支撑案件数</span>
                  <span>{{getRightData.cityFace.data5.supportCaseCount}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>人像破案反馈件数</span>
                  <span>{{getRightData.cityFace.data5.feedbackCaseCount}}</span>
                </p>
              </li>
            </div>
          </div>
        </div>
      </div>

      <div class="right doorStop" v-else-if="showType===3">
        <div>
          <div class="css-childBg css-right-1">
            <p><img src="@/assets/img/text_access_dark.png" /></p>
            <div class="css-upData">
              <!-- <li>
                <p>
                  <span>门禁设备总数</span>
                  <span>{{segmentation(getRightData.entranceGuard.data1.deviceNum)}}</span>
                </p>
                <p>
                  <span>实有人员住址总数</span>
                  <span>{{segmentation(getRightData.entranceGuard.data1.personAddress)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>实有房屋信息总数</span>
                  <span>{{segmentation(getRightData.entranceGuard.data1.houseAddress)}}</span>
                </p>
                <p>
                  <span>人像信息总数</span>
                  <span>{{segmentation(getRightData.entranceGuard.data1.msgTotalNum)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>门禁轨迹总数</span>
                  <span>{{segmentation(getRightData.entranceGuard.data1.accessControlTrack)}}</span>
                </p>
              </li> -->
              <li>
                <p>
                  <span>新增门禁设备</span>
                  <span>{{segmentation(getBaseData.data3.deviceNum)}}</span>
                </p>
                <p>
                  <span>新增门禁轨迹</span>
                  <span>{{segmentation(getBaseData.data3.accessControlTrack)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>新增实有房屋信息</span>
                  <span>{{segmentation(getBaseData.data3.houseAddress)}}</span>
                </p>
                <p>
                  <span>新增人像信息</span>
                  <span>{{segmentation(getBaseData.data3.msgTotalNum)}}</span>
                </p>
              </li>
              <li>
                <p style="width:55%">
                  <span>新增实有人员地址</span>
                  <span>{{segmentation(getBaseData.data3.personAddress)}}</span>
                </p>
              </li>
            </div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-2">
            <p><img src="@/assets/img/text_user transfer situation_dark-1.png" /></p>
            <div class="css-jd">
              <p>
                <span class="css-jdContent">
                  <span>{{segmentation(getRightData.entranceGuard.data2.baseCount)}}</span>
                  <span>深目&sdot;视综</span>
                </span>
              </p>
              <p>
                <span class="css-jdContent">
                  <span>{{segmentation(getRightData.entranceGuard.data2.total)}}</span>
                  <span>大数据底座</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-3">
            <p><img src="@/assets/img/text_user situation_dark.png" /></p>
            <div class="css-noData">暂无数据</div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-4">
            <p><img src="@/assets/img/text_vedio transfer situation_dark.png" /></p>
            <div class="css-noData">暂无数据</div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-5">
            <p><img src="@/assets/img/text_case_dark.png" /></p>
            <div class="css-noData">暂无数据</div>
          </div>
        </div>
      </div>

      <div class="right video" v-else-if="showType===4">
        <div>
          <div class="css-childBg css-right-1">
            <p><img src="@/assets/img/text_access_dark.png" /></p>
            <div class="css-upData">
              <li>
                <!-- <p>
                  <span>今日新增</span>
                  <span>{{segmentation(getBaseData.data4.totalNum)}}</span>
                </p> -->
                <p style="width:100%">
                  <span>今日入网</span>
                  <span>{{segmentation(getBaseData.data4.todayNetworkNum)}}</span>
                </p>
              </li>
            </div>
            <div class="css-boxs">
              <div class="css-jd">
                <p>
                  <span class="css-jdContent">
                    <span>{{segmentation(getBaseData.data4.onlineNum)}}</span>
                    <span>今日在线数</span>
                  </span>
                </p>
                <p>
                  <span class="css-jdContent">
                    <span>{{segmentation(getBaseData.data4.callNum)}}</span>
                    <span>今日调用数</span>
                  </span>
                </p>
              </div>
            </div>
            <!-- <div class="css-pieMsg">
              <echarts-pie :dataVal="statistical.dataVal[5]"></echarts-pie>
            </div> -->
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-2">
            <p><img src="@/assets/img/text_user transfer situation_dark-1.png" /></p>
            <div class="css-upData">
              <li>
                <p>
                  <span>深目&sdot;视综</span>
                  <span>{{segmentation(getRightData.moveVideo.data2.total)}}</span>
                </p>
                <p>
                  <span>ICP</span>
                  <span>{{segmentation(getRightData.moveVideo.data2.icpCount)}}</span>
                </p>
              </li>
            </div>
            <div class="css-divBox">
              <div class="css-proportion">
                <li>
                  <div>
                    <div>
                      <div>
                        <p>
                          <span>{{segmentation(getRightData.moveVideo.data2.playCount)}}</span>
                          <span>总点播数</span>
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
                          <span>{{segmentation(getRightData.moveVideo.data2.playTimeLength)}}<span>h</span></span>
                          <span>总点播时长</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>
        <!-- <div>
          <div class="css-childBg css-right-3">
            <p><img src="@/assets/img/text_user situation_dark.png" /></p>
            <div class="css-noData">暂无数据</div>
          </div>
        </div> -->
        <div>
          <div class="css-childBg css-right-4">
            <p><img src="@/assets/img/text_vedio transfer situation_dark.png" /></p>
            <div class="css-divBox">
              <div class="css-proportion">
                <li>
                  <div>
                    <div>
                      <div>
                        <p>
                          <span>{{segmentation(6405697)}}</span>
                          <span>执法视频数</span>
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
                          <span>{{segmentation(656147)}}<span>h</span></span>
                          <span>执法视频时长</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            </div>
            <!-- <div class="css-tjData">
              <div class="css-pieMsg">
                <echarts-pie :dataVal="statistical.dataVal[6]"></echarts-pie>
              </div>
              <div class="css-pieMsg">
                <echarts-pie :dataVal="statistical.dataVal[7]"></echarts-pie>
              </div>
            </div> -->
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-5">
            <p><img src="@/assets/img/text_case_dark.png" /></p>
            <div class="css-upData">
              <li>
                <p>
                  <span>支撑案件数</span>
                  <span>{{segmentation(getRightData.moveVideo.data5.supportCaseCount)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>支撑保障活动数</span>
                  <span>{{segmentation(41)}}</span>
                </p>
              </li>
            </div>
          </div>
        </div>
      </div>

      <div class="right swan" v-else-if="showType===5">
        <div>
          <div class="css-childBg css-right-1">
            <p><img src="@/assets/img/text_access_dark_jt.png" /></p>
            <div class="clear"></div>
            <div class="css-boxs">
              <div class="css-jd">
                <p>
                  <span class="css-jdContent">
                    <span>{{segmentation(rightData5.callNum)}}</span>
                    <span>今日调用数</span>
                  </span>
                </p>
                <p>
                  <span class="css-jdContent">
                    <span>{{segmentation(rightData5.userNum)}}</span>
                    <span>今日调用用户数</span>
                  </span>
                </p>
              </div>
              <div class="css-jd">
                <p>
                  <span class="css-jdContent">
                    <span>{{segmentation(rightData5.carNum)}}</span>
                    <span>今日查询车牌数</span>
                  </span>
                </p>
                <p>
                  <span class="css-jdContent">
                    <span>{{segmentation(rightData5.picNum)}}</span>
                    <span>今日返回图片数</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div>
          <div class="css-childBg css-right-2">
            <p><img src="@/assets/img/text_user transfer situation_dark-1.png" /></p>
            <div class="css-upData">
              <li>
                <p>
                  <span>总调用数</span>
                  <span>{{segmentation(getRightData.carSwan.data2.callCount)}}</span>
                </p>
                <p>
                  <span>总调用用户数</span>
                  <span>{{segmentation(getRightData.carSwan.data2.callUserCount)}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>总查询车牌数</span>
                  <span>{{segmentation(getRightData.carSwan.data2.queryCarCount)}}</span>
                </p>
                <p>
                  <span>总返回图片数</span>
                  <span>{{segmentation(getRightData.carSwan.data2.queryPictureCount)}}</span>
                </p>
              </li>
            </div>
          </div>
        </div> -->
        <div>
          <div class="css-childBg css-right-3">
            <p><img src="@/assets/img/text_user situation_dark.png" /></p>
            <div class="css-noData">暂无数据</div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-4">
            <p><img src="@/assets/img/text_vedio transfer situation_dark.png" /></p>
            <div class="css-noData">暂无数据</div>
          </div>
        </div>
        <div>
          <div class="css-childBg css-right-5">
            <p><img src="@/assets/img/text_case_dark.png" /></p>
            <div class="css-noData">暂无数据</div>
          </div>
        </div>
      </div>

      <iframe ref="prevIframe" class="css-iframe" :src="'http://190.168.17.2:6083/?maptype=0&sessionid='+Sessionids"></iframe>
    </div>

    <a-modal
      class="css-msgProp"
      :visible="isMsg"
      :title="title"
      @cancel.stop="handleCancel"
      :mask="false" width="58%"
      :dialogStyle="{
        'z-index': '9999',
        'width': '100%',
        'top': '80px',
        'height': 'calc(100% - 80px)'
      }"
      footer="">
      <div class="css-propContent">
        <template v-if="showType===1">
          <div v-if="propsType===1">
            <div class="css-classification">
              <p>
                <span>一类点VCN</span>
                <span>{{getRightData.videoIntegrated.data1.vcnCount}}</span>
              </p>
              <p>
                <span>星火流媒体</span>
                <span>{{getRightData.videoIntegrated.data1.streamServiceCount}}</span>
              </p>
              <p>
                <span>督查</span>
                <span>{{getRightData.videoIntegrated.data1.overseerCount}}</span>
              </p>
            </div>
            <div class="css-conentList">
              <p class="css-title">{{getRightData.videoIntegrated.data1.name}}</p>
              <ul>
                <li v-for="(item, index) in getRightData.videoIntegrated.data1.list" :key="index">
                  <span>
                    <span>{{item.platformName}}</span>
                    <span>{{item.count}}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <div class="css-conentList" v-for="(item, index) in getRightData.videoIntegrated.data2.list" :key="index">
              <p class="css-title">{{item.name}}</p>
              <ul>
                <li v-for="val in item.list" :key="val.id">
                  <span>
                    <span>{{val.platformName}}</span>
                    <span>{{val.count}}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-else-if="showType===2">
          <div class="css-conentList">
            <ul>
              <li v-for="val in getRightData.cityFace.data1.list" :key="val.id">
                <span>
                  <span>{{val.name}}</span>
                  <span>{{val.snapshotCount}}</span>
                </span>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </a-modal>
  </div>
</template>

<script>
import echartsBar from "@/components/echartsBar";
import echartsPie from "@/components/echartsPie";
import echartsLine from "@/components/echartsLine";
import echartsSemicircle from "@/components/echartsSemicircle";
export default {
  data() {
    return {
      isMsg: false,
      title: "接入情况",
      showLine: true, // 折线图显示&隐藏
      showBar: false, // 柱状图显示&隐藏
      radioType: "week",
      showType: 1,
      projectType: [1, 2, 3, 4, 5], // 1-视频综合;2-城市人像;3-视频门禁;4-移动视频;5-车辆卡口
      projectOrgId: 10,
      propsType: 1, // 1 - 接入  2 - 共享
      Sessionids: window.sessionStorage.getItem("loginSessionid"),
      nowStatisticsData: [],  // 今天数据
      yesterDayStatisticsData: [],  // 昨天数据
      fieldName: 'onlineUserNum',
      getBaseData: {
        data1: {
          totalCount: 1,
          totalOnlineCount: 0,
          type1Count: 1,
          type1OnlineCount: 0,
          type23Count: 1,
          type23OnlineCount: 0
        },
        data2: {
          fullLibTodayAddCount: 0,
          snapshotOnlineRate: 0,
          todayAlarmCount: 0,
          todaySnapshotCount: 0,
          uniqueLibTodayAddCount: 0,
          videoOnlineRate: 0
        },
        data3: {
          accessControlTrack: 0,
          deviceNum: 0,
          houseAddress: 0,
          msgTotalNum: 0,
          personAddress: 0,
          todayAdd: 0
        },
        data4: {
          callNum: 0,
          onlineNum: 0,
          todayNetworkNum: 0,
          totalNum: 0
        },
        data5: {
          todayCallUnm: 0,
          todayPictureNum: 0,
          todayQueryNum: 0,
          todayUserCallNum: 0,
          total: 0
        }
      },
      getRightData: {
        videoIntegrated: {
          data1: {
            list: [],
            overseerCount: 0,
            platformCount: 0,
            streamServiceCount: 0,
            total: 0,
            vcnCount: 0
          },
          data2: {
            cameraCount: 0,
            platformCount: 0,
            playCount: 0,
            playTime: 0,
            stPlatformCount: 0,
            stCameraCount: 0,
            gaPlatformCount: 0,
            gaCameraCount: 0,
            zfPlatformCount: 0,
            zfCameraCount: 0,
            list: []
          },
          data3: {
            activeUserNum: 0,
            loginCount: 0,
            loginTime: 0,
            totalUserNum: 0
          },
          data5: {
            breakCaseCount: 0,
            breakVideoCaseCount: 0,
            caseCount: 0,
            todayUploadCount: 0,
            videoCaseCount: 0
          }
        },
        cityFace: {
          data1: {
            list: [],
            totalFaceCameraCount: 0,
            totalFullLibCount: 0,
            totalSnapshotCount: 0,
            totalUniqueLibCount: 0
          },
          data3: {
            total: 0
          },
          data4: {
            controlAlarmAverageCount: 0,
            controlPersonCount: 0,
            controlTaskCount: 0,
            dynamicSearchAverageCount: 0,
            dynamicSearchCount: 0,
            staticSearchAverageCount: 0,
            staticSearchCount: 0
          },
          data5: {
            feedbackCaseCount: 0,
            supportCaseCount: 0
          }
        },
        entranceGuard: {
          data1: {
            accessControlTrack: 0,
            deviceNum: 0,
            houseAddress: 0,
            msgTotalNum: 0,
            personAddress: 0,
            todayAdd: 0
          },
          data2: {
            baseCount: 0,
            total: 0
          }
        },
        moveVideo: {
          data1: {
            total: 0
          },
          data2: {
            icpCount: 0,
            playCount: 0,
            playTimeLength: 0,
            total: 0
          },
          data5: {
            feedbackCaseCount: 0,
            supportCaseCount: 0
          }
        },
        carSwan: {
          data2: {
            callCount: 0,
            callUserCount: 0,
            queryCarCount: 0,
            queryPictureCount: 0
          }
        }
      },
      statistical: {
        dataVal: [
          {
            id: "nub0",
            name: "镜头总数",
            position: "left",
            left: '17%',
            percentageShow: "nub",
            total: 0,
            data: [
              {
                value: 0,
                name: "一类点总数   0",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              },
              {
                value: 0,
                name: "二三类点总数   0",
                itemStyle: {
                  normal: {
                    color: "#82aeff"
                  }
                }
              }
            ],
            time: new Date().getTime()
          },
          {
            id: "nub1",
            name: "调用总数",
            position: "center",
            type: "huan", // 环状图
            total: 0,
            data: [
              {
                value: 0,
                name: "实时视频     0/0%",
                itemStyle: {
                  normal: {
                    color: "#82aeff"
                  }
                }
              },
              {
                value: 0,
                name: "历史回放     0/0%",
                itemStyle: {
                  normal: {
                    color: "#45c9eb"
                  }
                }
              },
              {
                value: 0,
                name: "录像下载     0/0%",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              }
            ],
            time: new Date().getTime()
          },
          {
            id: "nub2",
            name: "调用总时长",
            position: "center",
            type: "huan", // 环状图
            total: 0,
            data: [
              {
                value: 0,
                name: "实时视频     0/0%",
                itemStyle: {
                  normal: {
                    color: "#82aeff"
                  }
                }
              },
              {
                value: 0,
                name: "历史回放     0/0%",
                itemStyle: {
                  normal: {
                    color: "#45c9eb"
                  }
                }
              },
              {
                value: 0,
                name: "录像下载     0/0%",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              }
            ],
            time: new Date().getTime()
          },
          {
            id: "nub3",
            name: "人像权限",
            position: "center",
            type: "bread", // 饼状图
            data: [
              {
                value: 0,
                name: "开通数     0",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              },
              {
                value: 0,
                name: "未开通数     0",
                itemStyle: {
                  normal: {
                    color: "#0eb4ce"
                  }
                }
              }
            ],
            time: new Date().getTime()
          },
          {
            id: "nub4",
            name: "用户活跃",
            position: "center",
            type: "bread", // 饼状图
            data: [
              {
                value: 0,
                name: "活跃数     0",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              },
              {
                value: 0,
                name: "不活跃数     0",
                itemStyle: {
                  normal: {
                    color: "#0eb4ce"
                  }
                }
              }
            ],
            time: new Date().getTime()
          },
          {
            id: "nub5",
            name: "接入情况",
            position: "left",
            type: "bread", // 饼状图
            data: [
              {
                value: 0,
                name: "执法记录仪     0",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              },
              {
                value: 0,
                name: "车载     0",
                itemStyle: {
                  normal: {
                    color: "#0eb4ce"
                  }
                }
              },
              {
                value: 0,
                name: "无人机     0",
                itemStyle: {
                  normal: {
                    color: "#277eef"
                  }
                }
              },
              {
                value: 0,
                name: "布控球     0",
                itemStyle: {
                  normal: {
                    color: "#82aeff"
                  }
                }
              }
            ],
            time: new Date().getTime()
          },
          {
            id: "nub6",
            name: "调用总数",
            position: "center",
            size: "small",
            type: "huan", // 环状图
            total: 0,
            data: [
              {
                value: 0,
                name: "实时视频     0/0%",
                itemStyle: {
                  normal: {
                    color: "#82aeff"
                  }
                }
              },
              {
                value: 0,
                name: "历史回放     0/0%",
                itemStyle: {
                  normal: {
                    color: "#45c9eb"
                  }
                }
              },
              {
                value: 0,
                name: "录像下载     0/0%",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              }
            ],
            time: new Date().getTime()
          },
          {
            id: "nub7",
            name: "调用总时长",
            position: "center",
            size: "small",
            type: "huan", // 环状图
            total: 0,
            data: [
              {
                value: 0,
                name: "实时视频     0/0%",
                itemStyle: {
                  normal: {
                    color: "#82aeff"
                  }
                }
              },
              {
                value: 0,
                name: "历史回放     0/0%",
                itemStyle: {
                  normal: {
                    color: "#45c9eb"
                  }
                }
              },
              {
                value: 0,
                name: "录像下载     0/0%",
                itemStyle: {
                  normal: {
                    color: "#445fde"
                  }
                }
              }
            ],
            time: new Date().getTime()
          }
        ],
        chartData: {
          name: "chart8",
          type: "bar-line",
          color: ["#db8223", "#82aeff"],
          nameArr: ["昨日在线用户", "今日在线用户"],
          nameList: [],
          data1: [],
          data2: [],
          time: new Date().getTime()
        },
        chartData1: {
          name: "chart1",
          type: "bar",
          color: ["#00ffff", "#3893e5"],
          nameList: [
            "福田",
            "罗湖",
            "南山",
            "盐田",
            "宝安",
            "龙岗",
            "光明",
            "坪山",
            "龙华",
            "大鹏",
            "公交",
            "机场",
            "大亚湾",
            "东深"
          ],
          data: [],
          time: new Date().getTime()
        }
      },
      rightData5: {
        callNum: 0,
        userNum: 0,
        carNum: 0,
        picNum: 0
      }
    };
  },
  methods: {
    clickProp() {
      const _this = this;
      $(".right").on("click", ".click", function() {
        _this.isMsg = true;
        const title = $(this).attr("data-title");
        if (title.indexOf("接入") > -1) {
          _this.propsType = 1;
        } else {
          _this.propsType = 2;
        }
        _this.title = title;
      });

      $(".left").on("click", ".js-centerProp", function() {
        _this.isMsg = true;
        const title = $(this).attr("data-title");
        if (title.indexOf("接入") > -1) {
          _this.propsType = 1;
        } else {
          _this.propsType = 2;
        }
        _this.title = title;
      })

      $(".left").on("click", ".css-childBg", function() {
        const index =
          $(this)
            .parent("div")
            .index() + 1;
        const time = new Date().getTime();
        _this.statistical.dataVal.forEach(v => {
          v.time = time;
        });
        _this.showType = index;
        _this.postMessage(index);
        $(".css-content")
          .find(".css-childBg")
          .removeClass("divActive");
        $(this).addClass("divActive");
        if (index === 3) {
          _this.$refs.imgSrc1.src = require("@/assets/img/doorStop_1.png");
          // _this.$refs.imgSrc2.src = require("@/assets/img/collectFace_2.png");
          // _this.$refs.imgSrc2.style.display = "initial";
        } else if (index === 5) {
          _this.$refs.imgSrc1.src = require("@/assets/img/text_transfer trend_dark.png");
          // _this.$refs.imgSrc2.style.display = "none";
        } else {
          _this.$refs.imgSrc1.src = require("@/assets/img/text_trend sel_dark.png");
          // _this.$refs.imgSrc2.style.display = "initial";
          // _this.$refs.imgSrc2.src = require("@/assets/img/text_play nor_dark.png");
        }
        _this.getAccessPlatformStatistics(index);

        let nemeType = '';
        switch (index) {
          case 1:
            nemeType = 'onlineUserNum'
            break;
          case 2:
            nemeType = 'dtrkNum'
            break;
          case 3:
            nemeType = 'faceAlarmNum'
            break;
          case 4:
            nemeType = 'mjDeviceNum'
            break;
          default:
            nemeType = 'dtCallNum'
        }
        _this.fieldName = nemeType
        _this.brokenDataShow()
      });
    },
    handleCancel() {
      // 关闭弹窗
      this.isMsg = false;
    },
    changePic(val) {
      if (val.target.value === "line") {
        this.showLine = true;
        this.showBar = false;
      } else {
        this.showLine = false;
        this.showBar = true;
      }
    },
    timeChange() {},
    listening() {
      // 监听ifram发来的信息
      const _this = this;
      window.addEventListener(
        "message",
        event => {
          const data = event.data;
          if (data.type === "orgId") {
            _this.projectOrgId = data.data.id;
            _this.getBaseInfo();
            _this.getAccessPlatformStatistics(_this.showType);
          }
        },
        false
      );
    },
    // 数字分割符号
    segmentation(num) {
      return parseFloat(num).toLocaleString()
    },
    // 传值给地图
    postMessage(dataNum) {
      this.$refs.prevIframe.contentWindow.postMessage(
        { type: "showMapData", data: { type: dataNum } },
        "*"
      );
    },
    // 项目基础信息
    getBaseInfo() {
      this.projectType.forEach(async v => {
        if (v === 2) {
          const accessData = await this.$axios(
            "/api/business/getAccessPlatformStatistics",
            {
              orgId: this.projectOrgId,
              type: 2
            }
          );
          this.getRightData.cityFace.data1 = accessData;
        } else if (v === 3) {

          const accessData = await this.$axios(
            "/api/business/getAccessPlatformStatistics",
            {
              orgId: this.projectOrgId,
              type: 3
            }
          );
          this.getRightData.entranceGuard.data1 = accessData;

        } else if (v === 4) {
          const accessData = await this.$axios(
            "/api/business/getAccessPlatformStatistics",
            {
              orgId: this.projectOrgId,
              type: 4
            }
          );
          this.getRightData.moveVideo.data1 = accessData;
        } else  {
          const data = await this.$axios("/api/business/getBaseInfo", {
            orgId: this.projectOrgId,
            type: v
          });
          this.getBaseData["data" + v] = data;
          if (v === 1) {
            this.statistical.dataVal[0].total = data.totalCount;
            this.statistical.dataVal[0].data[0].value = data.type1Count;
            this.statistical.dataVal[0].data[0].name =
              "一类点总数   " + data.type1Count;
            this.statistical.dataVal[0].data[1].value = data.type23Count;
            this.statistical.dataVal[0].data[1].name =
              "二三类点总数   " + data.type23Count;
            this.statistical.dataVal[0].time = new Date().getTime();
          }
        }
      });
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
    // 右边条数据
    async getAccessPlatformStatistics(type) {
      console.log(type)
      // 接入情况&弹窗
      let accessData = null
      if (type === 2 || type === 3 || type === 4) {
        const data = await this.$axios("/api/business/getBaseInfo", {
          orgId: this.projectOrgId,
          type: type
        });
        this.getBaseData["data" + type] = data;
      } else {
        accessData = await this.$axios(
          "/api/business/getAccessPlatformStatistics",
          {
            orgId: this.projectOrgId,
            type: type
          }
        );
      }
      // 共享情况&弹窗
      const shareData = await this.$axios(
        "/api/business/getSharePlatformStatistics",
        {
          orgId: this.projectOrgId,
          type: type
        }
      );

      // 用户情况&弹窗
      const userData = await this.$axios("/api/business/getUserStatistics", {
        orgId: this.projectOrgId,
        type: type
      });

      // 调用情况&弹窗
      const callData = await this.$axios(
        "/api/business/getCallInfoStatistics",
        {
          orgId: this.projectOrgId,
          type: type
        }
      );

      // 案件情况&弹窗
      const caseData = await this.$axios(
        "/api/business/getCaseInfoStatistics",
        {
          orgId: this.projectOrgId,
          type: type
        }
      );
      switch (type) {
        case 1:
          this.getRightData.videoIntegrated.data1 = accessData;
          this.getRightData.videoIntegrated.data2 = shareData;
          this.getRightData.videoIntegrated.data2.stPlatformCount =
            shareData.list[0].list.length;
          this.getRightData.videoIntegrated.data2.stCameraCount =
            shareData.list[0].count;
          this.getRightData.videoIntegrated.data2.gaPlatformCount =
            shareData.list[2].list.length;
          this.getRightData.videoIntegrated.data2.gaCameraCount =
            shareData.list[2].count;
          this.getRightData.videoIntegrated.data2.zfPlatformCount =
            shareData.list[1].list.length;
          this.getRightData.videoIntegrated.data2.zfCameraCount =
            shareData.list[1].count;
          this.getRightData.videoIntegrated.data3 = userData;
          this.statistical.dataVal[1].total = callData.totalCount;
          this.statistical.dataVal[1].data[0].value = callData.onlineCount;
          this.statistical.dataVal[1].data[0].name =
            "实时视频     " +
            callData.onlineCount +
            "/" +
            Math.floor(callData.onlineCount / callData.totalCount * 10000) /
              100 +
            "%";
          this.statistical.dataVal[1].data[1].value = callData.onlineCount;
          this.statistical.dataVal[1].data[1].name =
            "历史回放     " +
            callData.historyCount +
            "/" +
            Math.floor(callData.historyCount / callData.totalCount * 10000) /
              100 +
            "%";
          this.statistical.dataVal[1].data[2].value = callData.downloadCount;
          this.statistical.dataVal[1].data[2].name =
            "录像下载     " +
            callData.downloadCount +
            "/" +
            Math.floor(callData.downloadCount / callData.totalCount * 10000) /
              100 +
            "%";
          this.statistical.dataVal[1].time = new Date().getTime();
          this.statistical.dataVal[2].total = callData.totalLength;
          this.statistical.dataVal[2].data[0].value = callData.onlineCount;
          this.statistical.dataVal[2].data[0].name =
            "实时视频     " +
            callData.onlineLength +
            "/" +
            Math.floor(callData.onlineLength / callData.totalLength * 10000) /
              100 +
            "%";
          this.statistical.dataVal[2].data[1].value = callData.onlineCount;
          this.statistical.dataVal[2].data[1].name =
            "历史回放     " +
            callData.historyLength +
            "/" +
            Math.floor(callData.historyLength / callData.totalLength * 10000) /
              100 +
            "%";
          this.statistical.dataVal[2].data[2].value = callData.downloadCount;
          this.statistical.dataVal[2].data[2].name =
            "录像下载     " +
            callData.downloadLength +
            "/" +
            Math.floor(callData.downloadLength / callData.totalLength * 10000) /
              100 +
            "%";
          this.statistical.dataVal[2].time = new Date().getTime();
          this.getRightData.videoIntegrated.data5 = caseData;
          break;
        case 2:
          if (accessData !== null) {
            this.getRightData.cityFace.data1 = accessData;
          }
          this.getRightData.cityFace.data3 = userData;
          this.statistical.dataVal[3].data[0].value = userData.openedCount;
          this.statistical.dataVal[3].data[0].name =
            "开通数     " + userData.openedCount;
          this.statistical.dataVal[3].data[1].value = userData.noOpenedCount;
          this.statistical.dataVal[3].data[1].name =
            "未开通数     " + userData.noOpenedCount;
          this.statistical.dataVal[3].time = new Date().getTime();
          this.statistical.dataVal[4].data[0].value = userData.activeCount;
          this.statistical.dataVal[4].data[0].name =
            "活跃数     " + userData.activeCount;
          this.statistical.dataVal[4].data[1].value = userData.noActiveCount;
          this.statistical.dataVal[4].data[1].name =
            "不活跃数     " + userData.noActiveCount;
          this.statistical.dataVal[4].time = new Date().getTime();
          this.getRightData.cityFace.data4 = callData;
          this.getRightData.cityFace.data5 = caseData;
          break;
        case 3:
          if (accessData !== null) {
            this.getRightData.entranceGuard.data1 = accessData;
          }
          this.getRightData.entranceGuard.data2 = shareData;
          break;
        case 4:
          if (accessData !== null) {
            this.getRightData.moveVideo.data1 = accessData;
          }

          this.getRightData.moveVideo.data2 = shareData;
          this.statistical.dataVal[6].total = callData.totalCount;
          this.statistical.dataVal[6].data[0].value = callData.onlineCount;
          this.statistical.dataVal[6].data[0].name =
            "实时视频     " +
            callData.onlineCount +
            "/" +
            Math.floor(callData.onlineCount / callData.totalCount * 10000) /
              100 +
            "%";
          this.statistical.dataVal[6].data[1].value = callData.onlineCount;
          this.statistical.dataVal[6].data[1].name =
            "历史回放     " +
            callData.historyCount +
            "/" +
            Math.floor(callData.historyCount / callData.totalCount * 10000) /
              100 +
            "%";
          this.statistical.dataVal[6].data[2].value = callData.downloadCount;
          this.statistical.dataVal[6].data[2].name =
            "录像下载     " +
            callData.downloadCount +
            "/" +
            Math.floor(callData.downloadCount / callData.totalCount * 10000) /
              100 +
            "%";
          this.statistical.dataVal[6].time = new Date().getTime();
          this.statistical.dataVal[7].total = callData.totalLength;
          this.statistical.dataVal[7].data[0].value = callData.onlineCount;
          this.statistical.dataVal[7].data[0].name =
            "实时视频     " +
            callData.onlineLength +
            "/" +
            Math.floor(callData.onlineLength / callData.totalLength * 10000) /
              100 +
            "%";
          this.statistical.dataVal[7].data[1].value = callData.onlineCount;
          this.statistical.dataVal[7].data[1].name =
            "历史回放     " +
            callData.historyLength +
            "/" +
            Math.floor(callData.historyLength / callData.totalLength * 10000) /
              100 +
            "%";
          this.statistical.dataVal[7].data[2].value = callData.downloadCount;
          this.statistical.dataVal[7].data[2].name =
            "录像下载     " +
            callData.downloadLength +
            "/" +
            Math.floor(callData.downloadLength / callData.totalLength * 10000) /
              100 +
            "%";
          this.statistical.dataVal[7].time = new Date().getTime();
          this.getRightData.moveVideo.data5 = caseData;
          break;
        case 5:
          this.getRightData.carSwan.data2 = shareData;
          break;
      }
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

      this.brokenDataShow()
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

      this.statistical.chartData1.data = data1
      this.statistical.chartData1.time = (new Date()).getTime()
    },
    // 随机数
    random (min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
  },
  mounted() {
    this.listening();
    this.clickProp();
    this.getBaseInfo();
    this.getAccessPlatformStatistics(1);
    this.postMessage(1);
    this.brokenStatistics()

    this.rightData5 = {
      callNum: this.random(1500, 1700),
      userNum: this.random(30000, 33000),
      carNum: this.random(4000, 5000),
      picNum: this.random(1100, 2000)
    }
  },
  components: {
    echartsBar,
    echartsPie,
    echartsLine,
    echartsSemicircle
  }
};
</script>

<style lang="scss" scoped>
.css-content {
  width: 100%;
  height: 100%;
  padding: 0 15px 15px 15px;
  box-sizing: border-box;
  display: flex;
  position: relative;
  z-index: 5;
  .divActive {
    border-left: 4px solid #213bb8;
  }
  > .left {
    flex: 1;
    position: relative;
    z-index: 5;
    overflow: hidden;
    > div {
      position: relative;
      overflow: hidden;
      padding-top: 15px;
      &:nth-of-type(1) {
        height: 28%;
      }
      &:nth-of-type(2){
        height: 19%;
      }
      &:nth-of-type(3) {
        height: 20%;
      }
      &:nth-of-type(4) {
        height: 16%;
      }
      &:nth-of-type(5) {
        height: 17%;
      }
    }
    .css-left-1 {
      overflow: auto;
      height: 100%;
      > ul {
        display: flex;
        > li {
          flex: 1;
          background: $theme-select;
          float: left;
          margin: 0 3px;
          padding: 5px 0;
          border-radius: 4px;
          > span {
            display: block;
            text-align: center;
          }
          > span:first-child {
            font-size: 12px;
            color: $theme-font;
          }
          > span:last-child {
            color: $theme-green;
            font-size: 20px;
            font-weight: 400;
          }
        }
      }
      > .css-pieMsg {
        height: calc(100% - 105px);
        max-height: 200px;
      }
    }
    .css-left-2,
    .css-left-3,
    .css-left-4,
    .css-left-5 {
      overflow: hidden;
      height: 100%;
      .css-topTitle {
        float: right;
        padding: 7px;
        font-size: 16px;
        span:nth-of-type(2) {
          color: $theme-green;
          padding-left: 30px;
        }
      }
    }
    .css-left-2 {
      .css-upData {
        height: calc(100% - 40px);
        span {
          margin: 0;
        }
      }
    }
    .css-left-3 {
      .css-upData {
        span {
          margin: 0;
        }
      }
    }
  }
  > .center {
    flex: 3;
    box-sizing: border-box;
    padding: 0 20px;
    position: relative;
    > .css-legend {
      position: absolute;
      right: 35px;
      top: 25px;
      height: 18px;
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
          vertical-align: unset;
        }
        &.color1 {
          background: $theme-legend1;
        }
        &.color2 {
          background: $theme-legend2;
        }
        &.color3 {
          background: $theme-legend3;
        }
        &.color4 {
          background: $theme-legend4;
        }
      }
    }
    > .css-centent {
      background: $theme-background-left;
      width: calc(100% - 40px);
      margin-left: 20px;
      left: 0;
      padding: 15px;
      overflow: hidden;
      position: absolute;
      bottom: 15px;
      z-index: 5;

      > .css-title {
        overflow: hidden;
        > p {
          float: left;
          > img {
            cursor: pointer;
          }
        }
        > ul {
          margin-top: 7px;
          float: right;
          > li {
            float: left;
            background: $theme-select;
            margin: 0 3px;
            color: $theme-font;
            text-align: center;
            line-height: 28px;
            padding: 0 6px;
            cursor: pointer;
          }
          > li.active {
            color: #db8223;
          }
        }
      }
      > .css-tj {
        min-height: 100px;
      }
    }
  }
  > .right {
    flex: 1;
    position: relative;
    z-index: 5;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    > div {
      padding-top: 15px;
      &:nth-of-type(1) {
        height: 34%;
      }
      &:nth-of-type(2) {
        height: 15%;
      }
      &:nth-of-type(3) {
        height: 33%;
      }
      &:nth-of-type(4) {
        height: 18%;
      }
      // &:nth-of-type(5) {
      //   height: 19.5%;
      // }
    }
    .css-noData {
      text-align: center;
      height: calc(100% - 40px);
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
    .css-right-1 {
      font-size: 12px;
      color: $theme-font;
      height: 100%;
      overflow: auto;
      ul {
        height: calc(100% - 40px);
        display: flex;
        flex-direction: column;
        min-height: 42px;
        li {
          overflow: hidden;
          flex: 1;
          p {
            border-radius: 4px;
            float: left;
            width: 48%;
            margin: 0 1%;
            padding-left: 10px;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            > span {
              display: inline-block;
              &:nth-of-type(2) {
                float: right;
                text-align: right;
                margin-right: 10px;
                font-size: 14px;
                color: $theme-green;
              }
            }
          }
        }
      }
    }
    .css-right-2 {
      overflow: auto;
      height: 100%;
      > .css-upData {
        height: calc(100% - 130px);
        min-height: 110px;
        > li {
          > p {
            > span {
              font-size: 14px;
            }
          }
        }
      }
      > .css-jd {
        overflow: hidden;
        flex: 1;
        display: flex;
        margin-top: 5px;
        & p {
          flex: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          & .css-jdContent {
            display: inline-block;
            background: url(~@/assets/img/bg_chart-1.png) no-repeat;
            width: 141px;
            height: 83px;
            text-align: center;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            span {
              display: block;
              &:nth-of-type(1) {
                font-size: 28px;
                color: $theme-yellow;
                margin-top: 5px;
                > span {
                  font-size: 14px;
                  color: $theme-font;
                  display: inline-block;
                }
              }
            }
          }
        }
      }
    }
    .css-right-3 {
      height: 100%;
      > .css-upData {
        background: $theme-select;
        border-radius: 4px;
        > li {
          overflow: hidden;
          > p {
            float: left;
            width: 50%;
            > span {
              font-size: 14px;
              &:nth-of-type(1) {
                margin-left: 10px;
              }
              &:nth-of-type(2) {
                color: $theme-green;
                text-align: right;
                float: right;
                margin-right: 5px;
                > span {
                  font-size: 12px;
                  color: $theme-font;
                }
              }
            }
          }
        }
      }
    }
    .css-right-4 {
      height: 100%;
      overflow: auto;
      > .css-tjData {
        display: flex;
        height: calc(100% - 40px);
        min-height: 200px;
        > .css-pieMsg {
          flex: 1;
        }
      }
    }
    .css-right-5 {
      height: 100%;
      overflow: auto;
      > .css-upData {
        height: calc(100% - 40px);
        > li {
          > p {
            > span {
              &:nth-of-type(1) {
                font-size: 12px;
              }
              &:nth-of-type(2) {
                font-size: 16px;
              }
            }
          }
        }
      }
      > .css-jdContent {
        margin-top: 10px;
        display: inline-block;
        background: url(~@/assets/img/bg_chart-1.png) no-repeat;
        width: 100%;
        height: 83px;
        background-size: 100% 100%;
        text-align: center;
        span {
          display: block;
          &:nth-of-type(1) {
            font-size: 28px;
            color: $theme-yellow;
            margin-top: 5px;
            > span {
              font-size: 14px;
              color: $theme-font;
              display: inline-block;
            }
          }
        }
      }
    }
    &.city {
      > div:nth-of-type(1) {
        height: 20%;
        & .css-right-1 {
          & .css-upData {
            height: calc(100% - 40px);
            & span {
              font-size: 14px;
            }
          }
        }
      }
      > div:nth-of-type(2) {
        height: 20%;
      }
      > div:nth-of-type(3) {
        height: 30%;
      }
      > div:nth-of-type(4) {
        height: 18.5%;
      }
      > div:nth-of-type(5) {
        height: 17%;
      }
      & .css-right-2 {
        min-height: initial;
        .css-thisData {
          height: calc(100% - 40px);
          display: flex;
          > ul {
            flex: 1;
            margin: 0 3px;
            > li {
              display: flex;
              > span {
                font-size: 12px;
                border-top: 1px solid #415f7a;
                border-left: 1px solid #415f7a;
                line-height: 25px;
                &:nth-of-type(1) {
                  flex: 1;
                  padding-left: 3px;
                }
                &:nth-of-type(2) {
                  flex: 2;
                  border-right: 1px solid #415f7a;
                  padding-left: 3px;
                  span {
                    &:nth-of-type(2) {
                      padding-left: 15px;
                    }
                  }
                }
              }
              &:last-child {
                > span {
                  border-bottom: 1px solid #415f7a;
                }
              }
            }
          }
        }
      }
      & .css-right-3 {
        position: relative;
        height: 100%;
        > .css-totalShow {
          span {
            padding-left: 30px;
            color: $theme-green;
          }
        }
        > .css-tjData {
          height: calc(100% - 61px);
          overflow: auto;
          display: flex;
          > .css-divBox {
            > p {
              text-align: center;
            }
            .css-pieMsg {
              height: calc(100% - 21px);
              width: 100%;
              min-height: 185px;
              text-align: center;
            }
            flex: 1;
          }
        }
      }
      & .css-right-4 {
        min-height: initial;
        & .css-upData {
          height: calc(100% - 40px);
          span {
            font-size: 14px;
          }
        }
      }
      & .css-right-5 {
        min-height: initial;
        & .css-upData {
          height: calc(100% - 40px);
          li {
            p {
              width: 100%;
              span {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    &.doorStop {
      > div:nth-of-type(1) {
        height: 22%;
        & .css-right-1 {
          & .css-upData {
            height: calc(100% - 40px);
            & span {
              font-size: 14px;
            }
          }
        }
      }
      > div:nth-of-type(2) {
        height: 23%;
      }
      > div:nth-of-type(3) {
        height: 18%;
        overflow: auto;
      }
      > div:nth-of-type(4) {
        height: 18%;
        div {
          min-height: initial;
        }
      }
      > div:nth-of-type(5) {
        height: 19%;
        div {
          min-height: initial;
        }
      }
      .css-right-2 {
        min-height: initial;
        .css-jd {
          height: calc(100% - 40px);
          margin-top: 0;
          p {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            height: 83px;
          }
        }
      }
    }
    &.video {
      > div:nth-of-type(1) {
        height: 24%;
      }
      > div:nth-of-type(2) {
        height: 31.5%;
      }
      // > div:nth-of-type(3) {
      //   height: 13%;
      // }
      > div:nth-of-type(3) {
        height: 28.5%;
      }
      > div:nth-of-type(4) {
        height: 16%;
        div {
          min-height: initial;
        }
      }
      .css-right-1 {
        min-height: initial;
        overflow: auto;
        .css-upData {
          height: 32px;
        }
        .css-pieMsg {
          height: calc(100% - 72px);
          min-height: 140px;
        }
        .css-boxs {
          height: calc(100% - 72px);
        }
        .css-jd {
          overflow: hidden;
          flex: 1;
          display: flex;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          & p {
            flex: 1;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            & .css-jdContent {
              display: inline-block;
              background: url(~@/assets/img/bg_chart-1.png) no-repeat;
              width: 141px;
              height: 83px;
              text-align: center;
              position: relative;
              left: 50%;
              transform: translateX(-50%);
              span {
                display: block;
                &:nth-of-type(1) {
                  font-size: 28px;
                  color: $theme-yellow;
                  margin-top: 5px;
                  > span {
                    font-size: 14px;
                    color: $theme-font;
                    display: inline-block;
                  }
                }
              }
            }
          }
        }
      }
      .css-right-2 {
        min-height: initial;
        overflow: auto;
        .css-upData {
          height: 32px;
          min-height: inherit;
        }
        .css-divBox {
          height: calc(100% - 72px);
        }
        & .css-proportion {
          flex: 1;
          display: flex;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          li {
            flex: 1;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            margin: 0 5%;
            div {
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
                  background: #0c2058;
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
                      &:nth-of-type(1) {
                        color: $theme-yellow;
                        font-size: 20px;
                        span {
                          font-size: 14px;
                          color: $theme-font;
                          display: inline-block;
                        }
                      }
                      &:nth-of-type(2) {
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
      .css-right-4 {
        overflow: auto;
        .css-divBox {
          height: calc(100% - 72px);
        }
        & .css-proportion {
          flex: 1;
          display: flex;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          li {
            flex: 1;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            margin: 0 5%;
            div {
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
                  background: #0c2058;
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
                      &:nth-of-type(1) {
                        color: $theme-yellow;
                        font-size: 20px;
                        span {
                          font-size: 14px;
                          color: $theme-font;
                          display: inline-block;
                        }
                      }
                      &:nth-of-type(2) {
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
      .css-right-5 {
        overflow: auto;
        .css-upData {
          height: calc(100% - 40px);
          p {
            width: 100%;
            span {
              font-size: 16px !important;
            }
          }
        }
      }
    }
    &.swan {
      > div:nth-of-type(1) {
        height: 31%;
      }
      > div:nth-of-type(2) {
        height: 22%;
      }
      > div:nth-of-type(3) {
        height: 22%;
      }
      > div:nth-of-type(4) {
        height: 22%;
        div {
          min-height: initial;
        }
      }
      // > div:nth-of-type(5) {
      //   height: 18%;
      //   div {
      //     min-height: initial;
      //   }
      // }
      .css-boxs {
          height: calc(100% - 50px);
          display: flex;
          flex-direction: column;
          min-height: 190px;
        }
      .css-jd {
          overflow: hidden;
          flex: 1;
          display: flex;
          & p {
            flex: 1;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            & .css-jdContent {
              display: inline-block;
              background: url(~@/assets/img/bg_chart-1.png) no-repeat;
              width: 141px;
              height: 83px;
              text-align: center;
              position: relative;
              left: 50%;
              transform: translateX(-50%);
              span {
                display: block;
                &:nth-of-type(1) {
                  font-size: 28px;
                  color: $theme-yellow;
                  margin-top: 5px;
                  > span {
                    font-size: 14px;
                    color: $theme-font;
                    display: inline-block;
                  }
                }
              }
            }
          }
        }
      .css-right-2 {
        min-height: initial;
        .css-upData {
          height: 65px;
          min-height: inherit;
        }
      }
    }
  }
  .css-accPlt {
    position: absolute;
    display: flex;
    top: 30px;
    right: 12px;
    margin-bottom: 10px;
    > span {
      flex: 1;
      &:nth-of-type(1) {
        > span {
          display: inline-block;
          padding-left: 15px;
          &:nth-of-type(2) {
            padding-left: 0;
            float: right;
            color: $theme-green;
            font-size: 16px;
          }
        }
      }
      &:nth-of-type(2) {
        text-align: right;
        > button {
          margin-right: 15px;
        }
      }
    }
  }
}
.css-propContent {
  color: $theme-font;
  padding: 15px 40px;
  overflow: hidden;
  .css-classification {
    overflow: hidden;
    margin-bottom: 20px;
    p {
      float: left;
      width: 25%;
      font-size: 16px;
      span:nth-of-type(2) {
        font-size: 20px;
        color: #45c9eb;
        margin-left: 30px;
      }
    }
  }
  .css-conentList {
    overflow: hidden;
    margin-bottom: 15px;
    .css-title {
      font-size: 20px;
    }
    ul {
      li {
        background: url("~@/assets/img/bg_blank one_dark.png") no-repeat;
        width: 140px;
        height: 80px;
        float: left;
        margin: 12px 8px;
        padding: 5px;
        text-align: center;
        > span {
          position: relative;
          top: 50%;
          display: inline-block;
          transform: translateY(-50%);
          span {
            display: block;
            text-align: center;
            &:nth-of-type(1) {
              font-size: 12px;
            }
            &:nth-of-type(2) {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
.css-childBg {
  background: $theme-background-left;
  opacity: 1;
  padding: 10px;
  box-sizing: border-box;
}
</style>
<style lang="scss">
.css-msgProp {
  .ant-modal-content {
    background: rgba($theme-select, 0.9);
    opacity: 1;
    border-radius: 5px;
    overflow: hidden;
    height: calc(100% - 295px);
    .ant-modal-body {
      height: calc(100% - 50px);
      overflow: auto;
    }
  }
}
</style>
