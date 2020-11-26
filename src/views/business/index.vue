<template>
  <!-- 业务概览 -->
  <div class="business">
    <div class="wrap-sidebar wrap-sidebar-left">
      <div class="wrap-card wrap-card-30 video-platform" @click="onChangePlatform(1)">
        <div :class="['css-childBg', 'video-model', 'css-left-1', showType === 1 ? 'divActive' : '']">
          <div class="list-title">
            <span class="list-title-name">视综平台</span>
            <span class="list-name">接入平台数</span>
            <span class="total-num blue-color">{{accessPlatsNum}}</span>
            <a-button class="js-centerProp" size="small" data-title="接入情况" @click="onShowDetail(1)">查看接入详情</a-button>
          </div>
          <div class="counts">
            <a-row>
              <a-col :span="12">
                <span>
                  <span class="text first-text">总数</span>
                  <span class="total-num blue-color">{{videoTotalNum}}</span>
                </span>
              </a-col>
              <a-col :span="12">
                <span class="list-name text">总在线数</span>
                <span class="total-num blue-color">{{totalOnlineNum}}</span>
                <span class="font-size18  blue-color">/{{Math.floor((totalOnlineNum/videoTotalNum)*100)}}%</span>
              </a-col>
            </a-row>
          </div>
          <a-row class="online-situation first-row">
            <a-col :span="24">
              <ul class="css-target-number">
                <li v-for="(item, index) in videoPlatformDes1" :key="index">
                  <span><span class="float-l">{{item}}</span><span class="type-num blue-color">{{videoPlatformData1[index].total}}</span></span>
                  <span><span class="float-l">在线数</span><span class="type-num blue-color">{{videoPlatformData1[index].online}}</span></span>
                  <span><span class="float-l">在线率</span><span class="type-num blue-color">{{Math.floor((videoPlatformData1[index].online/videoPlatformData1[index].total)*100)}}%</span></span>
                  <!-- <span>{{Math.floor((videoPlatformData1[index].online/videoPlatformData1[index].total)*100)}}%</span> -->
                </li>
              </ul>
            </a-col>
          </a-row>
          <a-row class="online-situation second-row">
            <a-col :span="24">
              <ul class="css-target-number">
                <li v-for="(item, index) in videoPlatformDes2" :key="index">
                  <span><span class="float-l">{{item}}</span><span class="type-num blue-color">{{videoPlatformData2[index].total}}</span></span>
                  <span><span class="float-l">在线数</span><span class="type-num blue-color">{{videoPlatformData2[index].online}}</span></span>
                  <span><span class="float-l">在线率</span><span class="type-num blue-color">{{Math.floor((videoPlatformData2[index].online/videoPlatformData2[index].total)*100)}}%</span></span>
                  <!-- <span>{{Math.floor((videoPlatformData2[index + 2].online/videoPlatformData2[index + 2].total)*100)}}%</span> -->
                </li>
              </ul>
            </a-col>
          </a-row>
          <!-- <ul class="css-target-number">
            <li v-for="(item, index) in videoPlatformDes" :key="index">
              <span>{{item}}</span>
              <span>{{Math.floor((videoPlatformData[index].online/videoPlatformData[index].total)*100)}}%</span>
            </li>
          </ul> -->
          <!-- <div class="css-pieMsg">
            <echarts-pie :dataVal="echartsData.videoPlatformAllCameraPieData"></echarts-pie>
          </div> -->
        </div>
      </div>
      <div class="wrap-card wrap-card-16" @click="onChangePlatform(2)">
        <div :class="['css-childBg', 'css-left-2', showType === 2 ? 'divActive' : '']">
          <div class="list-title">
            <span class="list-title-name">城市人像</span>
            <a-button size="small" data-title="接入情况" class="js-centerProp" @click="onShowDetail(2)">查看接入详情</a-button>
          </div>
          <ul class="css-upData">
            <li>
              <p>
                <span>人像抓拍机总数</span>
                <span>{{segmentation(cityFaceData.totalFaceCameraCount)}}</span>
              </p>
              <p>
                <span>抓拍总数</span>
                <span>
                  {{cityFaceData.totalSnapshotCount>100000000 ? Math.floor(cityFaceData.totalSnapshotCount/100000000) : segmentation(cityFaceData.totalSnapshotCount)}}
                  <span class="descripe-color" v-if="cityFaceData.totalSnapshotCount/100000000>1">亿</span>
                </span>
              </p>
            </li>
            <li>
              <p style="width:100%">
                <span style="float:left">全量库入库总数</span>
                <span style="float:right;margin-right:30%">{{segmentation(cityFaceData.totalFullLibCount)}}</span>
              </p>
            </li>
            <li>
              <p style="width:100%">
                <span style="float:left">唯一库入库总数</span>
                <span style="float:right;margin-right:30%">{{segmentation(cityFaceData.totalUniqueLibCount)}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-card wrap-card-18" @click="onChangePlatform(3)">
        <div :class="['css-childBg', 'css-left-3', showType === 3 ? 'divActive' : '']">
          <div class="list-title">
            <span class="list-title-name">视频门禁</span>
          </div>
          <ul class="css-upData">
            <li>
              <p>
                <span>门禁设备总数</span>
                <!-- <span>{{segmentation(videoGuardData.deviceNum)}}</span> -->
                <span>92850</span>
              </p>
              <p>
                <span>人员住址总数</span>
                <!-- <span>{{segmentation(videoGuardData.personAddress)}}</span> -->
                <span>4069377</span>
              </p>
            </li>
            <li>
              <p>
                <span>房屋信息总数</span>
                <!-- <span>{{segmentation(videoGuardData.houseAddress)}}</span> -->
                <span>2515442</span>
              </p>
              <p>
                <span>人像信息总数</span>
                <!-- <span>{{segmentation(videoGuardData.msgTotalNum)}}</span> -->
                <span>1038417</span>
              </p>
            </li>
            <li>
              <p style="width:100%">
                <span style="float:left">门禁轨迹总数</span>
                <!-- <span style="float:right;margin-right:30%">{{segmentation(videoGuardData.accessControlTrack)}}</span> -->
                <span style="float:right;margin-right:30%">462203446</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-card wrap-card-18" @click="onChangePlatform(4)">
        <div :class="['css-childBg', 'css-left-4', showType === 4 ? 'divActive' : '']">
          <div class="list-title">
            <span class="list-title-name">移动视音频</span>
          </div>
          <ul class="css-upData">
            <li>
              <p>
                <span>总数</span>
                <!-- <span>{{segmentation(moveVideoData.total)}}</span> -->
                <span>14612</span>
              </p>
            </li>
            <li>
              <p>
                <span>执法记录仪</span>
                <!-- <span>{{segmentation(moveVideoData.recorderCount)}}</span> -->
                <span>14322</span>
              </p>
              <p>
                <span>车载</span>
                <!-- <span>{{segmentation(moveVideoData.carCount)}}</span> -->
                <span>183</span>
              </p>
            </li>
            <li>
              <p>
                <span>布控球</span>
                <!-- <span>{{segmentation(moveVideoData.ballCount)}}</span> -->
                <span>94</span>
              </p>
              <p>
                <span>无人机</span>
                <span>{{segmentation(moveVideoData.uavCount)}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-card wrap-card-18" @click="onChangePlatform(5)">
        <div :class="['css-childBg', 'css-left-5', showType === 5 ? 'divActive' : '']" style="overflow:auto">
          <div class="list-title">
            <span class="list-title-name">车辆卡口</span>
          </div>
          <ul class="css-upData">
            <li>
              <p>
                <span>卡口总数</span>
                <span>{{segmentation(14755)}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>调用总数</span>
                <span>{{segmentation(carKKData.todayCallUnm)}}</span>
              </p>
              <p>
                <span>调用用户总数</span>
                <span>{{segmentation(carKKData.todayUserCallNum)}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>查询车牌总数</span>
                <span>{{segmentation(carKKData.todayQueryNum)}}</span>
              </p>
              <p>
                <span>返回图片总数</span>
                <span>{{segmentation(carKKData.todayPictureNum)}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="wrap-sidebar wrap-sidebar-center">
      <p class="css-legend" v-if="showType===1">
          <span @click="legendMessage(1)">
              <span :class="['css-color','color1','graph-case-color1', videoCaseList[0] ? '' : 'gray']"></span>
              <!-- <span class="css-color color1 graph-case-color1"></span> -->
              <!-- <span class="css-color color1"></span> -->
              一类点总数/一类点在线率
          </span>
          <span @click="legendMessage(2)">
              <span :class="['css-color','color2',videoCaseList[1] ? '' : 'gray']"></span>
              <!-- <span class="css-color color2"></span> -->
              二三类点总数/二三类点在线率
          </span>
          <span @click="legendMessage(3)">
              <span :class="['css-color','color3',videoCaseList[2] ? '' : 'gray']"></span>
              <!-- <span class="css-color color3"></span> -->
              <!-- 镜头总数/在线率 -->
              镜头总数/总在线率
          </span>
          <span @click="legendMessage(4)">
              <span :class="['css-color','color4',videoCaseList[3] ? '' : 'gray']"></span>
              <!-- <span class="css-color color4"></span> -->
              在线用户数
          </span>
      </p>
      <p class="css-legend" v-else-if="showType===2">
        <span @click="legendMessage(1)">
          <span :class="['css-color','color1','graph-case-color1', videoCaseList[0] ? '' : 'gray']"></span>
          <!-- <span class="css-color color1 graph-case-color1"></span> -->
          <!-- <span class="css-color color1"></span> -->
          抓拍机数
        </span>
        <span @click="legendMessage(2)">
          <span :class="['css-color','color2',videoCaseList[1] ? '' : 'gray']"></span>
          <!-- <span class="css-color color2"></span> -->
          今日抓拍数
        </span>
        <span @click="legendMessage(3)">
          <span :class="['css-color','color3',videoCaseList[2] ? '' : 'gray']"></span>
          <!-- <span class="css-color color3"></span> -->
          今日告警数
        </span>
      </p>
      <p class="css-legend" v-else-if="showType===3">
        <span @click="legendMessage(1)">
          <span :class="['css-color','color1', 'graph-case-color1', videoCaseList[0] ? '' : 'gray']"></span>
          <!-- <span class="css-color color1 graph-case-color1"></span> -->
          <!-- <span class="css-color color1"></span> -->
          <!-- 接入门禁设备数 -->
          门禁设备总数
        </span>
        <span @click="legendMessage(2)">
          <span :class="['css-color','color2',videoCaseList[1] ? '' : 'gray']"></span>
          <!-- <span class="css-color color2"></span> -->
          <!-- 采集人像信息数 -->
          人像信息总数
        </span>
      </p>
      <p class="css-legend" v-else-if="showType===4">
        <span @click="legendMessage(1)">
          <span :class="['css-color','color1', 'graph-case-color1', videoCaseList[0] ? '' : 'gray']"></span>
          <!-- <span class="css-color color1 graph-case-color1"></span> -->
          <!-- <span class="css-color color1"></span> -->
          设备总数
        </span>
        <span @click="legendMessage(2)">
          <span :class="['css-color','color2',videoCaseList[1] ? '' : 'gray']"></span>
          <!-- <span class="css-color color2"></span> -->
          <!-- 在线数 -->
          设备在线数
        </span>
      </p>
      <p class="css-legend" v-else-if="showType===5">
        <span @click="legendMessage(1)">
          <span :class="['css-color','color1', 'graph-case-color1', videoCaseList[0] ? '' : 'gray']"></span>
          <!-- <span class="css-color color1 graph-case-color1"></span> -->
          <!-- <span class="css-color color1"></span> -->
          卡口数
        </span>
      </p>
      <div class="wrap-card wrap-card-28">
        <div class="css-childBg">
          <div class="list-title">
            <span class="list-title-name">{{echartsLineTitle}}</span>
            <p class="css-tag">
              <a-radio-group default-value="line" button-style="solid" size="small" @change="changePic">
                <a-radio-button value="line">
                  趋势
                </a-radio-button>
                <a-radio-button value="bar">
                  机构
                </a-radio-button>
              </a-radio-group>
            </p>
          </div>
          <div class="css-echarts">
            <echarts-line v-if="showLine===true" :chartData="echartsData.echartsLineData"></echarts-line>
            <echarts-bar v-else :chartData="echartsData.echartsBarData"></echarts-bar>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap-sidebar wrap-sidebar-right" v-if="showType===1">
      <div class="wrap-card wrap-card-15">
        <div class="css-childBg css-right-2">
          <div class="list-title">
            <span class="list-title-name">用户情况</span>
          </div>
          <ul class="css-upData">
            <li>
              <p>
                <span>用户总数</span>
                <span>{{segmentation(videoPlatformRightData.userData.totalUserNum)}}</span>
              </p>
              <p>
                <span>用户活跃总数</span>
                <a-tooltip placement="top">
                  <template slot="title">近3月有登录的用户数</template>
                  <span>{{segmentation(videoPlatformRightData.userData.activeUserNum)}}</span>
                </a-tooltip>
              </p>
            </li>
            <li>
              <p>
                <span>今日登录数</span>
                <span>{{segmentation(videoPlatformRightData.userData.loginCount)}}</span>
              </p>
              <p>
                <span>今日使用总时长</span>
                <span>{{Math.floor(videoPlatformRightData.userData.loginTime/3600)}}<span>h</span></span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-card wrap-card-35">
        <div class="css-childBg css-right-3">
          <div class="list-title">
            <span class="list-title-name">调用情况</span>
            <div class="account-time">
              <span class="account-time-label">统计时间</span>
              <a-select class="account-time-select" disabled default-value="1">
                <!-- <a-select-option value="1">建设至今</a-select-option> -->
                <a-select-option value="1">近一周</a-select-option>
              </a-select>
            </div>
          </div>
          <div class="css-tjData">
            <div class="css-pieMsg">
              <echarts-pie :dataVal="echartsData.videoPlatformCallPieData"></echarts-pie>
            </div>
            <div class="css-pieMsg">
              <echarts-pie :dataVal="echartsData.videoPlatformTimePieData"></echarts-pie>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-card wrap-card-18">
        <div class="css-childBg css-right-4">
          <div class="list-title">
            <span class="list-title-name">案件情况</span>
          </div>
          <ul class="css-upData">
            <li>
              <p>
                <span>案件总数</span>
                <span>{{segmentation(videoPlatformRightData.caseData.caseCount)}}</span>
                <!-- <span>493984</span> -->
              </p>
              <!-- <p>
                <span>视频案件总数</span>
                <span>{{segmentation(videoPlatformRightData.caseData.videoCaseCount)}}</span>
              </p> -->
              <p>
                <span>破案数</span>
                <span>{{segmentation(videoPlatformRightData.caseData.breakCaseCount)}}</span>
                <!-- <span>40460</span> -->
              </p>
            </li>
            <li>
              <p>
                <span>人像协助破案数</span>
                <span>{{segmentation(videoPlatformRightData.caseData.breakVideoCaseCount)}}</span>
              </p>
              <p>
                <span>今日案件上传数</span>
                <span>{{segmentation(videoPlatformRightData.caseData.todayUploadCount)}}</span>
              </p>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-card wrap-card-32">
        <div class="css-childBg css-right-5">
          <div class="list-title">
            <span class="list-title-name">共享情况</span>
            <a-button size="small" data-title="共享情况" @click="onShowShareDetail">查看详情</a-button>
          </div>
          <ul class="css-upData">
            <li>
              <p>
                <span>共享平台总数</span>
                <span>{{segmentation(videoPlatformRightData.shareData.platformCount)}}</span>
              </p>
              <p>
                <span>共享镜头数</span>
                <span>{{segmentation(videoPlatformRightData.shareData.cameraCount)}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>省厅</span>
                <span>{{segmentation(videoPlatformRightData.shareData.stPlatformCount)}}</span>
              </p>
              <p>
                <span>共享镜头数</span>
                <span>{{segmentation(videoPlatformRightData.shareData.stCameraCount)}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>公安系统</span>
                <span>{{segmentation(videoPlatformRightData.shareData.gaPlatformCount)}}</span>
              </p>
              <p>
                <span>共享镜头数</span>
                <span>{{segmentation(videoPlatformRightData.shareData.gaCameraCount)}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>政府平台</span>
                <span>{{segmentation(videoPlatformRightData.shareData.zfPlatformCount)}}</span>
              </p>
              <p>
                <span>共享镜头数</span>
                <span>{{segmentation(videoPlatformRightData.shareData.zfCameraCount)}}</span>
              </p>
            </li>
          </ul>
          <div class="css-jd">
            <p>
              <a-tooltip placement="top">
                <template slot="title">近一月总点播数</template>
                <span class="css-jdContent">
                  <span>{{segmentation(videoPlatformRightData.shareData.playCount)}}</span>
                  <span>总点播数</span>
                </span>
              </a-tooltip>
            </p>
            <p>
              <a-tooltip placement="top">
                  <template slot="title">近一月点播总时长</template>
                  <span class="css-jdContent">
                  <span>{{Math.floor(videoPlatformRightData.shareData.playTime/3600)}}<span>h</span></span>
                  <span>总点播时长</span>
                  </span>
              </a-tooltip>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap-sidebar wrap-sidebar-right city" v-else-if="showType===2">
      <div class="wrap-card wrap-card-19">
        <div class="css-childBg css-right-1" data-title="接入情况">
          <div class="list-title">
            <span class="list-title-name">接入情况</span>
          </div>
          <ul class="css-upData">
            <li>
              <p>
                <span>今日抓拍数</span>
                <span>{{Math.floor(cityFaceRightData.accessData.todaySnapshotCount/10000)}}<span>万张</span></span>
              </p>
              <p>
                <span>今日告警数</span>
                <span>{{segmentation(cityFaceRightData.accessData.todayAlarmCount)}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>图片在线率</span>
                <span>{{cityFaceRightData.accessData.snapshotOnlineRate}}%</span>
              </p>
              <p>
                <span>视频在线率</span>
                <span>{{cityFaceRightData.accessData.videoOnlineRate}}%</span>
              </p>
            </li>
            <li>
              <p>
                <span>昨日唯一库新增</span>
                <span>{{segmentation(cityFaceRightData.accessData.uniqueLibTodayAddCount)}}</span>
              </p>
              <p>
                <span>昨日全量库新增</span>
                <span>{{segmentation(cityFaceRightData.accessData.fullLibTodayAddCount)}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-card wrap-card-19">
        <div class="css-childBg css-right-2">
          <div class="list-title">
            <span class="list-title-name">共享情况</span>
          </div>
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
      <div class="wrap-card wrap-card-28">
        <div class="css-childBg css-right-3">
          <div class="list-title">
            <span class="list-title-name">用户情况</span>
            <div class="css-tag">
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
            </div>
          </div>
          <div class="css-tjData">
            <div class="css-divBox">
              <p>深目开通城市人像权限情况</p>
              <div class="css-pieMsg">
              <echarts-pie :dataVal="echartsData.cityFaceAuthPieData"></echarts-pie>
            </div>
          </div>

            <div class="css-divBox">
              <div class="css-pieMsg">
                <p>城市人像用户活跃情况</p>
                <echarts-pie :dataVal="echartsData.cityFaceUserPieData"></echarts-pie>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-card wrap-card-19">
        <div class="css-childBg css-right-4">
          <div class="list-title">
            <span class="list-title-name">调用情况</span>
          </div>
          <ul class="css-upData">
            <li>
              <p>
                <span>动态检索总数</span>
                <span>{{segmentation(cityFaceRightData.callData.dynamicSearchCount)}}</span>
              </p>
              <p>
                <span>日均数</span>
                <span>{{segmentation(cityFaceRightData.callData.dynamicSearchAverageCount)}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>静态检索总数</span>
                <span>{{segmentation(cityFaceRightData.callData.staticSearchCount)}}</span>
              </p>
              <p>
                <span>日均数</span>
                <span>{{segmentation(cityFaceRightData.callData.staticSearchAverageCount)}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>日均告警数</span>
                <span>{{segmentation(cityFaceRightData.callData.controlAlarmAverageCount)}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-card wrap-card-15">
        <div class="css-childBg css-right-5">
          <div class="list-title">
            <span class="list-title-name">案件情况</span>
          </div>
          <ul class="css-upData">
            <li>
              <p>
                <span>支撑案件数</span>
                <span>{{cityFaceRightData.caseData.supportCaseCount}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>人像破案反馈件数</span>
                <span>{{cityFaceRightData.caseData.feedbackCaseCount}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="wrap-sidebar wrap-sidebar-right doorStop" v-else-if="showType===3">
      <div class="wrap-card wrap-card-20">
        <div class="css-childBg css-right-1">
          <div class="list-title">
            <span class="list-title-name">接入情况</span>
          </div>
          <a-tooltip placement="top">
            <template slot="title">今日新增</template>
            <ul class="css-upData">
              <li>
                <p>
                  <span>新增门禁设备</span>
                  <!-- <span>{{segmentation(videoGuardRightData.accessData.deviceNum)}}</span> -->
                  <span>546</span>
                </p>
                <p>
                  <span>新增人员住址</span>
                  <!-- <span>{{segmentation(videoGuardRightData.accessData.personAddress)}}</span> -->
                  <span>3191</span>
                </p>
              </li>
              <li>
                <p>
                  <span>新增房屋信息</span>
                  <!-- <span>{{segmentation(videoGuardRightData.accessData.houseAddress)}}</span> -->
                  <span>536</span>
                </p>
                <p>
                  <span>新增人像信息</span>
                  <!-- <span>{{segmentation(videoGuardRightData.accessData.msgTotalNum)}}</span> -->
                  <span>1001</span>
                </p>
              </li>
              <li>
                <!-- <p style="width:55%"> -->
                <p>
                  <span>新增门禁轨迹</span>
                  <!-- <span>{{segmentation(videoGuardRightData.accessData.accessControlTrack)}}</span> -->
                  <span>2143433</span>
                </p>
              </li>
            </ul>
          </a-tooltip>
        </div>
      </div>
      <div class="wrap-card wrap-card-20">
        <div class="css-childBg css-right-2">
          <div class="list-title">
            <span class="list-title-name">共享情况</span>
          </div>
          <div class="css-jd">
            <p>
              <span class="css-jdContent">
                <span>{{segmentation(videoGuardRightData.shareCase.baseCount)}}</span>
                <span>深目&sdot;视综</span>
              </span>
            </p>
            <p>
              <span class="css-jdContent">
                <span>{{segmentation(videoGuardRightData.shareCase.total)}}</span>
                <span>大数据底座</span>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="wrap-card wrap-card-20">
        <div class="css-childBg css-right-4">
          <div class="list-title">
            <span class="list-title-name">调用情况</span>
          </div>
          <div class="css-noData">暂无数据</div>
        </div>
      </div>
      <div class="wrap-card wrap-card-20">
        <div class="css-childBg css-right-5">
          <div class="list-title">
            <span class="list-title-name">案件情况</span>
          </div>
          <div class="css-noData">暂无数据</div>
        </div>
      </div>
      <div class="wrap-card wrap-card-20">
        <div class="css-childBg css-right-3">
          <div class="list-title">
            <span class="list-title-name">用户情况</span>
          </div>
          <div class="css-noData">暂无数据</div>
        </div>
      </div>
    </div>

    <div class="wrap-sidebar wrap-sidebar-right video" v-else-if="showType===4">
      <div class="wrap-card wrap-card-25">
        <div class="css-childBg css-right-1">
          <div class="list-title">
            <span class="list-title-name">接入情况</span>
          </div>
          <ul class="css-upData">
            <li>
              <p style="width:100%">
                <span>今日入网</span>
                <span>{{segmentation(moveVideoRightData.accessData.todayNetworkNum)}}</span>
              </p>
            </li>
          </ul>
          <div class="css-boxs">
            <div class="css-jd">
              <p>
                <span class="css-jdContent">
                  <span>{{segmentation(moveVideoRightData.accessData.onlineNum)}}</span>
                  <span>实时设备在线数</span>
                </span>
              </p>
              <p>
                <span class="css-jdContent">
                  <span>{{segmentation(moveVideoRightData.accessData.callNum)}}</span>
                  <span>实时设备调用数</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-card wrap-card-30">
        <div class="css-childBg css-right-2">
          <div class="list-title">
            <span class="list-title-name">共享情况</span>
          </div>
          <ul class="css-upData">
            <li>
              <p>
                <span>深目&sdot;视综</span>
                <!-- <span>{{segmentation(moveVideoRightData.shareCase.total)}}</span> -->
                <span>14612</span>
              </p>
              <p>
                <span>ICP</span>
                <!-- <span>{{segmentation(moveVideoRightData.shareCase.icpCount)}}</span> -->
                <span>14612</span>
              </p>
            </li>
          </ul>
          <div class="css-divBox">
            <div class="css-proportion">
              <li>
                <div>
                  <div>
                    <div>
                      <p>
                        <span>{{segmentation(moveVideoRightData.shareCase.playCount)}}</span>
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
                        <span>{{segmentation(moveVideoRightData.shareCase.playTimeLength)}}<span>h</span></span>
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
      <!-- <div class="wrap-card wrap-card-13">
        <div class="css-childBg css-right-3">
          <div class="list-title">
            <span class="list-title-name">用户情况</span>
          </div>
          <div class="css-noData">暂无数据</div>
        </div>
      </div> -->
      <div class="wrap-card wrap-card-25">
        <div class="css-childBg css-right-4">
          <div class="list-title">
            <span class="list-title-name">调用情况</span>
          </div>
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
        </div>
      </div>
      <div class="wrap-card wrap-card-15">
        <div class="css-childBg css-right-5">
          <div class="list-title">
            <span class="list-title-name">案件情况</span>
          </div>
          <ul class="css-upData">
            <li>
              <p>
                <span>支撑案件数</span>
                <span>{{segmentation(moveVideoRightData.caseData.supportCaseCount)}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>支撑保障活动数</span>
                <span>{{segmentation(41)}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="wrap-sidebar wrap-sidebar-right swan" v-else-if="showType===5">
      <div class="wrap-card wrap-card-30">
        <div class="css-childBg css-right-1">
          <div class="list-title">
            <span class="list-title-name">今日状态</span>
          </div>
          <div class="clear"></div>
          <div class="css-boxs">
            <div class="css-jd">
              <p>
                <span class="css-jdContent">
                  <span>{{segmentation(carKKRightData.callNum)}}</span>
                  <span>今日调用数</span>
                </span>
              </p>
              <p>
                <span class="css-jdContent">
                  <span>{{segmentation(carKKRightData.userNum)}}</span>
                  <span>今日调用用户数</span>
                </span>
              </p>
            </div>
            <div class="css-jd">
              <p>
                <span class="css-jdContent">
                  <span>{{segmentation(carKKRightData.carNum)}}</span>
                  <span>今日查询车牌数</span>
                </span>
              </p>
              <p>
                <span class="css-jdContent">
                  <span>{{segmentation(carKKRightData.picNum)}}</span>
                  <span>今日返回图片数</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-card wrap-card-20">
        <div class="css-childBg css-right-3">
          <div class="list-title">
            <span class="list-title-name">调用情况</span>
          </div>
          <div class="css-noData">暂无数据</div>
        </div>
      </div>
      <div class="wrap-card wrap-card-20">
        <div class="css-childBg css-right-4">
          <div class="list-title">
            <span class="list-title-name">案件情况</span>
          </div>
          <div class="css-noData">暂无数据</div>
        </div>
      </div>
      <div class="wrap-card wrap-card-20">
        <div class="css-childBg css-right-5">
          <div class="list-title">
            <span class="list-title-name">用户情况</span>
          </div>
          <div class="css-noData">暂无数据</div>
        </div>
      </div>
    </div>

    <!-- <iframe ref="prevIframe" class="css-iframe" :src="'http://190.168.17.2:6083/?maptype=0&sessionid='+Sessionids"></iframe> -->
    <iframe ref="prevIframe" class="css-iframe" :src="'http://190.168.17.2:6084/?maptype=0&sessionid='+Sessionids"></iframe>

    <a-modal
      class="css-msgProp"
      :visible="isMsg"
      :title="title"
      @cancel.stop="handleCancel"
      :mask="false"
      width="58%"
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
                <span>{{videoPlatformDetailData.vcnCount}}</span>
              </p>
              <p>
                <span>星火流媒体</span>
                <span>{{videoPlatformDetailData.streamServiceCount}}</span>
              </p>
              <p>
                <span>督查</span>
                <span>{{videoPlatformDetailData.overseerCount}}</span>
              </p>
            </div>
            <div class="css-conentList">
              <p class="css-title">{{videoPlatformDetailData.name}}</p>
              <ul>
                <li v-for="(item, index) in videoPlatformDetailData.list" :key="index">
                  <span>
                    <span>{{item.platformName}}</span>
                    <span>{{item.count}}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <div class="css-conentList" v-for="(item, index) in videoPlatformRightData.shareData.list" :key="index">
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
              <li v-for="val in cityFaceData.list" :key="val.id">
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
  components: {
    echartsBar,
    echartsPie,
    echartsLine,
    echartsSemicircle
  },
  data() {
    return {
      Sessionids: window.sessionStorage.getItem("loginSessionid"),
      projectOrgId: 10,
      projectType: [1, 2, 3, 4, 5], // 1-视频综合;2-城市人像;3-视频门禁;4-移动视频;5-车辆卡口
      showType: 1, // 平台类型/右侧显示类型
      radioType: "week", // 城市人像 用户情况 近一周、近一月、近三月
      // 地图图例切换
      videoCaseList: [true, false, false, false], // true表示选中 false表示不选中 仅改变样式
      // 趋势、机构
      showLine: true, // 折线图显示&隐藏
      showBar: false, // 柱状图显示&隐藏
      echartsLineTitle: '在线用户', // 折线图标题
      nowStatisticsData: [],  // 今天数据
      yesterDayStatisticsData: [],  // 昨天数据
      fieldName: 'onlineUserNum', // 折线图展示数据类型

      // 详情弹框
      isMsg: false, // 显示隐藏
      title: "接入情况", // 标题
      propsType: 1, // 区分1 - 接入详情  2 - 共享详情

      /**
       * 左侧基本数据
       */
      accessPlatsNum: 0,
      videoTotalNum: 0,
      totalOnlineNum: 0,
      videoPlatformDes1: ['一类点总数', '二三类点总数'],
      videoPlatformDes2: ['移动类总数', '内部视频总数'],
      videoPlatformData1: [{online: 0, total: 1}, {online: 0, total: 1}], // 视综平台
      videoPlatformData2: [{online: 0, total: 1}, {online: 0, total: 1}], // 视综平台
      cityFaceData: { // 城市人像
        list: [], // 详情列表数据
        totalFaceCameraCount: 0,
        totalFullLibCount: 0,
        totalSnapshotCount: 0,
        totalUniqueLibCount: 0
      },
      videoGuardData: { // 视频门禁
        accessControlTrack: 0,
        deviceNum: 0,
        houseAddress: 0,
        msgTotalNum: 0,
        personAddress: 0,
      },
      moveVideoData: { // 移动视音频
        total: 0
      },
      carKKData: { // 车辆卡口
        todayCallUnm: 0,
        todayPictureNum: 0,
        todayQueryNum: 0,
        todayUserCallNum: 0,
        total: 0
      },

      /**
       * 右侧基本数据
       */
      videoPlatformRightData: { // 视综平台 对应的右侧数据
        userData: { // 用户情况
          activeUserNum: 0,
          loginCount: 0,
          loginTime: 0,
          totalUserNum: 0
        },
        caseData: { // 案件情况
          breakCaseCount: 0,
          breakVideoCaseCount: 0,
          caseCount: 0,
          todayUploadCount: 0,
          videoCaseCount: 0
        },
        shareData: { // 共享情况
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
        }
      },
      cityFaceRightData: { // 城市人像 对应的右侧数据
        accessData: { // 接入情况
          fullLibTodayAddCount: 0,
          snapshotOnlineRate: 0,
          todayAlarmCount: 0,
          todaySnapshotCount: 0,
          uniqueLibTodayAddCount: 0,
          videoOnlineRate: 0
        },
        callData: { // 调用情况
          controlAlarmAverageCount: 0,
          controlPersonCount: 0,
          controlTaskCount: 0,
          dynamicSearchAverageCount: 0,
          dynamicSearchCount: 0,
          staticSearchAverageCount: 0,
          staticSearchCount: 0
        },
        caseData: { // 案件情况
          feedbackCaseCount: 0,
          supportCaseCount: 0
        }
      },
      videoGuardRightData: { // 视频门禁 对应的右侧数据
        accessData: { // 接入情况
          accessControlTrack: 0,
          deviceNum: 0,
          houseAddress: 0,
          msgTotalNum: 0,
          personAddress: 0,
          todayAdd: 0
        },
        shareCase: { // 共享情况
          baseCount: 0,
          total: 0
        }
      },
      moveVideoRightData: { // 移动视音频 对应的右侧数据
        accessData: { // 接入情况
          callNum: 0,
          onlineNum: 0,
          todayNetworkNum: 0,
          totalNum: 0
        },
        shareCase: { // 共享情况
          icpCount: 0,
          playCount: 0,
          playTimeLength: 0,
          total: 0
        },
        caseData: { // 案件情况
          feedbackCaseCount: 0,
          supportCaseCount: 0
        }
      },
      carKKRightData: { // 车辆卡口 对应的右侧数据
        callNum: 0,
        userNum: 0,
        carNum: 0,
        picNum: 0
      },

      // 视综平台 详细数据
      videoPlatformDetailData: {
        list: [],
        overseerCount: 0,
        platformCount: 0,
        streamServiceCount: 0,
        total: 0,
        vcnCount: 0
      },
      // echarts 数据
      echartsData: {
        videoPlatformAllCameraPieData: { // 视综平台 左侧 环状图
          id: "nub0",
          type: "huan", // 环状图
          name: "镜头总数",
          position: "left",
          left: '17%',
          percentageShow: "nub",
          fontSize:'13',
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
        videoPlatformCallPieData: { // 视综平台 右侧 调用情况 调用总数
          id: "nub1",
          type: "huan", // 环状图
          total: 0,
          name: "调用总次数",
          radius: ['57%', '70%'],
          center: ['50%', '35%'],
          x: "center",
          legendOrient: 'horizontal',
          position: "center",
          fontSize:'12',
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
        videoPlatformTimePieData: { // 视综平台 右侧 调用情况 调用总时长
          id: "nub2",
          type: "huan", // 环状图
          total: 0,
          name: "调用总时长",
          labelFormatter: 'unite',
          radius: ['57%', '70%'],
          center: ['50%', '35%'],
          x: "center",
          legendOrient: 'horizontal',
          position: "center",
          fontSize:'12',
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
        cityFaceAuthPieData: { // 城市人像 右侧 人像权限
          id: "nub3",
          type: "pie",
          name: "人像权限",
          radius: ['0%', '60%'],
          center: ['50%', '35%'],
          x: "center",
          position: "center",
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
        cityFaceUserPieData: { // 城市人像 右侧 用户活跃
          id: "nub4",
          type: "pie",
          name: "用户活跃",
          radius: ['0%', '60%'],
          x: "center",
          center: ['50%', '35%'],
          position: "center",
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

        echartsLineData: {
          name: "chart8",
          type: "bar-line",
          color: ["#db8223", "#82aeff"],
          nameArr: ["昨日在线用户", "今日在线用户"],
          nameList: [],
          data1: [],
          data2: [],
          time: new Date().getTime()
        },
        echartsBarData: {
          name: "chart1",
          type: "bar",
          color: ["#00ffff", "#3893e5"],
          nameList: ["福田", "罗湖", "南山", "盐田", "宝安", "龙岗", "光明", "坪山", "龙华", "大鹏", "公交", "机场", "大亚湾", "东深"],
          data: [],
          time: new Date().getTime()
        }
      },
    };
  },
  mounted() {
    this.listening();
    // this.clickProp();
    this.getPlatCount();
    this.getBaseInfo();
    this.getAccessPlatformStatistics(1);
    this.postMessage(1);
    this.brokenStatistics()

    this.carKKRightData = {
      callNum: this.random(1500, 1700),
      userNum: this.random(30000, 33000),
      carNum: this.random(4000, 5000),
      picNum: this.random(1100, 2000)
    }
  },
  methods: {
    // 监听ifram发来的信息
    listening() {
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
    // 获取左侧 视综平台 接入平台数
    async getPlatCount() {
      const data = await this.$axios("/api/business/getAccessPlatformStatistics", {
        orgId: 10,
        type: 1
      });
      this.accessPlatsNum = data.count
    },
    // 获取左侧 平台基础信息
    getBaseInfo() {
      this.projectType.forEach(async v => {
        if(v === 1 || v === 5) {
          const data = await this.$axios("/api/business/getBaseInfo", {
            orgId: this.projectOrgId,
            type: v
          });
          if(v === 1) { // 视综平台 左侧数据     
            this.videoTotalNum = data.totalNum
            this.totalOnlineNum = data.totalOnlineNum
            this.videoPlatformData1 = [
              {online: data.type1OnlineNum, total: data.type1Num},
              {online: data.type23OnlineNum, total: data.type23Num}];
            this.videoPlatformData2 = [
              {online: data.mobileOnlineNum, total: data.mobileNum},
              {online: data.innerOnlineNum, total: data.innerNum}];
          } else {
            this.carKKData = data;
          }
          if(v === 1) {
            let temp = this.echartsData.videoPlatformAllCameraPieData
            temp.total = data.totalCount;
            temp.data[0].value = data.type1Count;
            temp.data[0].name = "一类点总数   " + data.type1Count;
            temp.data[1].value = data.type23Count;
            temp.data[1].name = "二三类点总数   " + data.type23Count;
            temp.time = new Date().getTime();
          }
        } else {
          const accessData = await this.$axios(
            "/api/business/getAccessPlatformStatistics",
            {
              orgId: this.projectOrgId,
              type: v
            }
          );
          if(v === 2) {
            this.cityFaceData = accessData;
          } else if(v === 3) {
            this.videoGuardData = accessData;
          } else {
            this.moveVideoData = accessData;
          }
        }
      });
    },
    /**
     * 切换平台
     * index {Number} 平台在左侧的索引
     */
    onChangePlatform(index) {
      const _this = this;
      const time = new Date().getTime();
      if (index === 1) {
        _this.echartsData.videoPlatformAllCameraPieData.time =  time
        _this.echartsData.videoPlatformCallPieData.time =  time
        _this.echartsData.videoPlatformTimePieData.time =  time
      } else if (index === 2) {
        _this.echartsData.cityFaceAuthPieData.time =  time
        _this.echartsData.cityFaceUserPieData.time =  time
      }
      _this.showType = index;
      _this.postMessage(index);
      // 切换页面的时候 只需要改变样式 点击图例时才需要调用接口
      if(index === 1) {
        _this.videoCaseList = [true, false, false, false]
      } else if(index === 2) {
        _this.videoCaseList = [true, false, false]
      } else if(index === 3) {
        _this.videoCaseList = [true, false]
      } else if(index === 4) {
        _this.videoCaseList = [true, false]
      } else {
        _this.videoCaseList = [true]
      }
      if (index === 3) {
        this.echartsLineTitle = '门禁设备新增数'
        // _this.$refs.imgSrc1.src = require("@/assets/img/doorStop_1.png");
        // _this.$refs.imgSrc2.src = require("@/assets/img/collectFace_2.png");
        // _this.$refs.imgSrc2.style.display = "initial";
      } else if (index === 5) {
        this.echartsLineTitle = '调用趋势'
        // _this.$refs.imgSrc1.src = require("@/assets/img/text_transfer trend_dark.png");
        // _this.$refs.imgSrc2.style.display = "none";
      } else {
        this.echartsLineTitle = '在线用户'
        // _this.$refs.imgSrc1.src = require("@/assets/img/text_trend sel_dark.png");
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
    },
    // 左侧平台 显示详情
    onShowDetail(index) {
      const _this = this;
      _this.isMsg = true;
      _this.propsType = 1;
      _this.title = '接入情况';
    },
    // 右侧共享情况 显示详情
    onShowShareDetail() {
      const _this = this;
      _this.isMsg = true;
      _this.propsType = 2;
      _this.title = '共享情况';
    },
    // 传值给地图
    postMessage(dataNum) {
      if(this.$refs.prevIframe && this.$refs.prevIframe.contentWindow) {
        this.$refs.prevIframe.contentWindow.postMessage(
          { type: "showMapData", data: { type: dataNum } },
          "*"
        );
      }
    },
    // 点击切换 中间下方 趋势、机构
    changePic(val) {
      if (val.target.value === "line") {
        this.showLine = true;
        this.showBar = false;
      } else {
        this.showLine = false;
        this.showBar = true;
        this.barDataShow()
      }
    },
    // 柱状图各个类型切换
    async barDataShow () {
      let adrr = []
      let dataArr = []
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
      data.list.forEach(item => {
        adrr.push(item.orgName)
        dataArr.push(item[this.fieldName])
      })
      this.echartsData.echartsBarData.nameList = adrr
      this.echartsData.echartsBarData.data = dataArr
      this.echartsData.echartsBarData.time = (new Date()).getTime()
    },
    /**
     * 右边数据
     * 调用时机：  mounted、地图区域改变、左侧平台改变时
     * type {Number} 平台索引
     */
    async getAccessPlatformStatistics(type) {
      // 接入情况&弹窗
      let accessData = null
      if (type === 2 || type === 3 || type === 4) {
        const data = await this.$axios("/api/business/getBaseInfo", {
          orgId: this.projectOrgId,
          type: type
        });
        if (type === 2) {
          this.cityFaceRightData.accessData = data;
        } else if (type === 3) {
          this.videoGuardRightData.accessData = data;
        } else {
          this.moveVideoRightData.accessData = data;
        }
      } else {
        accessData = await this.$axios("/api/business/getAccessPlatformStatistics", {
          orgId: this.projectOrgId,
          type: type
        });
      }
      // 共享情况&弹窗
      const shareData = await this.$axios("/api/business/getSharePlatformStatistics", {
        orgId: this.projectOrgId,
        type: type
      });
      // 用户情况&弹窗
      const userData = await this.$axios("/api/business/getUserStatistics", {
        orgId: this.projectOrgId,
        type: type
      });
      // 调用情况&弹窗
      const callData = await this.$axios("/api/business/getCallInfoStatistics", {
        orgId: this.projectOrgId,
        type: type
      });
      // 案件情况&弹窗
      const caseData = await this.$axios("/api/business/getCaseInfoStatistics", {
        orgId: this.projectOrgId,
        type: type
      });
      switch (type) {
        case 1:
          this.videoPlatformDetailData = accessData;
          this.videoPlatformRightData.shareData = shareData;
          this.videoPlatformRightData.shareData.stPlatformCount = shareData.list[0].list.length;
          this.videoPlatformRightData.shareData.stCameraCount = shareData.list[0].count;
          this.videoPlatformRightData.shareData.gaPlatformCount = shareData.list[2].list.length;
          this.videoPlatformRightData.shareData.gaCameraCount = shareData.list[2].count;
          this.videoPlatformRightData.shareData.zfPlatformCount = shareData.list[1].list.length;
          this.videoPlatformRightData.shareData.zfCameraCount = shareData.list[1].count;
          this.videoPlatformRightData.userData = userData;
          this.videoPlatformRightData.caseData = caseData;
          // 视综平台 调用情况 环状图数据
          // this.echartsData.videoPlatformCallPieData.total = callData.totalCount;
          this.echartsData.videoPlatformCallPieData.total = 6097350;
          // this.echartsData.videoPlatformCallPieData.data[0].value = callData.onlineCount;
          this.echartsData.videoPlatformCallPieData.data[0].value = 5990117;
          // this.echartsData.videoPlatformCallPieData.data[0].name = "实时视频     " + callData.onlineCount + "/" + Math.floor(callData.onlineCount / callData.totalCount * 10000) / 100 + "%";
          this.echartsData.videoPlatformCallPieData.data[0].name = "实时视频  " + 5990117 + "/98.24%";
          // this.echartsData.videoPlatformCallPieData.data[1].value = callData.onlineCount;
          this.echartsData.videoPlatformCallPieData.data[1].value = 81252;
          // this.echartsData.videoPlatformCallPieData.data[1].name = "历史回放     " + callData.historyCount + "/" + Math.floor(callData.historyCount / callData.totalCount * 10000) / 100 + "%";
          this.echartsData.videoPlatformCallPieData.data[1].name = "历史回放  " + 81252 + "/1.33%";
          // this.echartsData.videoPlatformCallPieData.data[2].value = callData.downloadCount;
          this.echartsData.videoPlatformCallPieData.data[2].value = 25981;
          // this.echartsData.videoPlatformCallPieData.data[2].name = "录像下载     " + callData.downloadCount + "/" + Math.floor(callData.downloadCount / callData.totalCount * 10000) / 100 + "%";
          this.echartsData.videoPlatformCallPieData.data[2].name = "录像下载  " + 25981 + "/0.43%";
          this.echartsData.videoPlatformCallPieData.time = new Date().getTime();
          // this.echartsData.videoPlatformTimePieData.total = callData.totalLength;
          this.echartsData.videoPlatformTimePieData.total = 316971;
          // this.echartsData.videoPlatformTimePieData.data[0].value = callData.onlineCount;
          this.echartsData.videoPlatformTimePieData.data[0].value = 202326;
          // this.echartsData.videoPlatformTimePieData.data[0].name = "实时视频     " + callData.onlineLength + "/" + Math.floor(callData.onlineLength / callData.totalLength * 10000) / 100 + "%";
          this.echartsData.videoPlatformTimePieData.data[0].name = "实时视频  " + 202326 + "/63.83%";
          // this.echartsData.videoPlatformTimePieData.data[1].value = callData.onlineCount;
          this.echartsData.videoPlatformTimePieData.data[1].value = 82412;
          // this.echartsData.videoPlatformTimePieData.data[1].name = "历史回放     " + callData.historyLength + "/" + Math.floor(callData.historyLength / callData.totalLength * 10000) / 100 + "%";
          this.echartsData.videoPlatformTimePieData.data[1].name = "历史回放  " + 82412 + "/26.00%";
          // this.echartsData.videoPlatformTimePieData.data[2].value = callData.downloadCount;
          this.echartsData.videoPlatformTimePieData.data[2].value = 32233;
          // this.echartsData.videoPlatformTimePieData.data[2].name = "录像下载     " + callData.downloadLength + "/" + Math.floor(callData.downloadLength / callData.totalLength * 10000) / 100 + "%";
          this.echartsData.videoPlatformTimePieData.data[2].name = "录像下载  " + 32233 + "/10.17%";
          this.echartsData.videoPlatformTimePieData.time = new Date().getTime();
          break;
        case 2:
          if (accessData !== null) {
            this.cityFaceData = accessData;
          }
          this.echartsData.cityFaceAuthPieData.data[0].value = userData.openedCount;
          this.echartsData.cityFaceAuthPieData.data[0].name = "开通数     " + userData.openedCount;
          this.echartsData.cityFaceAuthPieData.data[1].value = userData.noOpenedCount;
          this.echartsData.cityFaceAuthPieData.data[1].name = "未开通数     " + userData.noOpenedCount;
          this.echartsData.cityFaceAuthPieData.time = new Date().getTime();
          this.echartsData.cityFaceUserPieData.data[0].value = userData.activeCount;
          this.echartsData.cityFaceUserPieData.data[0].name = "活跃数     " + userData.activeCount;
          this.echartsData.cityFaceUserPieData.data[1].value = userData.noActiveCount;
          this.echartsData.cityFaceUserPieData.data[1].name = "不活跃数     " + userData.noActiveCount;
          this.echartsData.cityFaceUserPieData.time = new Date().getTime();
          this.cityFaceRightData.callData = callData;
          this.cityFaceRightData.caseData = caseData;
          break;
        case 3:
          if (accessData !== null) {
            this.videoGuardData = accessData;
          }
          this.videoGuardRightData.shareCase = shareData;
          break;
        case 4:
          if (accessData !== null) {
            this.moveVideoData = accessData;
          }
          this.moveVideoRightData.shareCase = shareData;
          this.moveVideoRightData.caseData = caseData;
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
      this.echartsData.echartsLineData.nameList = timeArr
      this.echartsData.echartsLineData.data1 = data1
      this.echartsData.echartsLineData.data2 = data2
      this.echartsData.echartsLineData.time = (new Date()).getTime()
      this.echartsData.echartsBarData.data = data1
      this.echartsData.echartsBarData.time = (new Date()).getTime()
    },
    // 随机数
    random (min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    // 关闭详情弹窗
    handleCancel() {
      this.isMsg = false;
    },
    // 数字分割符号
    segmentation(num) {
      return parseFloat(num).toLocaleString()
    },
    /**
     * 切换图例
     * dataNum : 1 2 3 4
     */
    legendMessage(dataNum) {
      let self = this
      let mapIndex = dataNum
      let arrIndex = dataNum - 1
      self.$set(self.videoCaseList, arrIndex, !self.videoCaseList[arrIndex])
      if (self.$refs.prevIframe && self.$refs.prevIframe.contentWindow) {
        self.$refs.prevIframe.contentWindow.postMessage(
            { type: "showLegend", data: { index: mapIndex, data: self.videoCaseList[arrIndex] } },
            "*"
        );
      }
    },
    // 城市人像 切换用户情况 近一周/近一月/近三月
    timeChange() {},
  },
};
</script>

<style lang="scss" scoped>
.business {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem .5rem 1rem;
  box-sizing: border-box;
  user-select: none;
  z-index: 5;
  .list-title>.list-title-name {
    padding: 0 !important;
  }
  .video-model {
    .ant-row {
      margin-top: 0.5rem;
    }
    .list-title {
      justify-content: left !important;
    }
    .counts {
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
  .divActive {
    border-left: 4px solid $theme-button;
    background-image: linear-gradient(to right, rgba($theme-button, 0.3) 0, rgba($theme-button, 0.3) 100%);
  }
  // 模块公共样式
  .css-childBg {
    opacity: 1;
    padding: 0 1rem;
    box-sizing: border-box;
    height: 100%;
  }
  .wrap-sidebar-left {
    .css-left-1 {
      // overflow: auto;
      height: 100%;
      .css-pieMsg {
        height: calc(100% - 100px);
      }
    }
    .css-left-2,
    .css-left-3,
    .css-left-4,
    .css-left-5 {
      height: 100%;
    }
  }
  // 解决高度不够时 局部出现滚动条问题
  .wrap-sidebar-left {
    .video-platform {
      .css-childBg {
        padding-top: 0.5625rem;
        .list-title {
          height: 10%;
          span {
            // height: 100%;
          }
        }
        .counts {
          height: 10%;
        }
        .first-row,
        .second-row {
          height:  calc(38% - 10px);
          .ant-col {
            height: 100%;
            ul {
              height: 100%;
              li {
                height: 100%;
                >span {
                  height: 33%;
                  width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .blue-color {
                  padding-right: .5rem;
                }
              }
            }
          }
        }
      }
    }
  }
  .wrap-sidebar-center {
    padding: 0;
    .wrap-card {
      position: absolute;
      bottom: 0;
    }
    .css-legend {
      position: absolute;
      right: 35px;
      top: 25px;
      height: 18px;
      z-index: 10;
      > span {
        margin-left: 20px;
        cursor: pointer;
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
        &.graph-case-color1 {
            background: $theme-legend5;
        }
        &.gray {
            background: $theme-legend-gray;
        }
      }
    }
    .css-echarts {
      height: calc(100% - 3.5rem);
    }
  }
  .wrap-sidebar-right {
    .css-noData {
      text-align: center;
      height: calc(100% - 3.5rem);
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
    .css-right-1 {
      height: 100%;
    }
    .css-right-2 {
      height: 100%;
    }
    .css-right-3 {
      height: 100%;
      > .css-tjData {
        display: flex;
        height: calc(100% - 3.5rem);
        > .css-pieMsg {
          flex: 1;
        }
      }
    }
    .css-right-4 {
      height: 100%;
      overflow: auto;
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
    .css-right-5 {
      overflow: auto;
      height: 100%;
      .css-upData {
        height: calc(60% - 3.5rem);
      }
      .css-jd {
        overflow: hidden;
        flex: 1;
        display: flex;
        padding-top: 5px;
        height: 40%;
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
            background-size: 100% 100%;
            width: 141px;
            height: 100%;
            text-align: center;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            span {
              display: block;
              &:nth-of-type(1) {
                font-size: 1.5rem;
                color: $theme-yellow;
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
    &.city {
      .css-right-1 {
        height: 100%;
      }
      .css-right-2 {
        min-height: initial;
        .css-thisData {
          height: calc(100% - 4rem);
          > ul {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            > li {
              display: flex;
              flex: 1;
              font-size: $font-size-small;
              > span {
                display: flex;
                align-items: center;
                border-top: 1px solid #415f7a;
                border-left: 1px solid #415f7a;
                &:nth-of-type(1) {
                  flex: 1;
                  padding-left: .5rem;
                }
                &:nth-of-type(2) {
                  flex: 2;
                  border-right: 1px solid #415f7a;
                  padding-left: .5rem;
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
      .css-right-3 {
        position: relative;
        height: 100%;
        > .css-totalShow {
          span {
            padding-left: 30px;
            color: $theme-green;
          }
        }
        > .css-tjData {
          height: calc(100% - 3.5rem);
          overflow: auto;
          display: flex;
          > .css-divBox {
            > p {
              text-align: center;
              font-size: 0.75rem;
            }
            .css-pieMsg {
              height: calc(100% - 21px);
              width: 100%;
              //min-height: 185px;
              text-align: center;
            }
            flex: 1;
          }
        }
      }
      .css-right-4 {
        height: 100%;
      }
      .css-right-5 {
        height: 100%;
        & .css-upData {
          height: calc(100% - 4rem);
          li {
            p {
              width: 100%;
            }
          }
        }
      }
    }
    &.doorStop {
      .css-right-1 {
        height: 100%;
      }
      .css-right-2 {
        height: 100%;
        .css-jd {
          position: relative;
          height: calc(100% - 3.5rem);
          margin-top: 0;
          p {
            // position: relative;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            height: 83px;
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
          > p:nth-of-type(1) {
            left: calc(calc(100% - 282px) / 4);
          }
          > p:nth-of-type(2) {
            right: calc(calc(100% - 282px) / 4);
          }
        }
      }
    }
    &.video {
      .css-right-1 {
        min-height: initial;
        overflow: auto;
        .css-upData {
          height: 2.5rem;
        }
        .css-pieMsg, .css-boxs {
          height: calc(100% - 6rem);
        }
        .css-jd {
          overflow: hidden;
          flex: 1;
          display: flex;
          position: relative;
          height: 100%;
          // top: 50%;
          // transform: translateY(-50%);
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
          height: 2.5rem;
        }
        .css-divBox {
          height: calc(100% - 6rem);
        }
        & .css-proportion {
          flex: 1;
          display: flex;
          position: relative;
          height: 100%;;
          // top: 50%;
          // transform: translateY(-50%);
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
      .css-right-4 {
        overflow: auto;
        .css-divBox {
          height: calc(100% - 3.5rem);
        }
        & .css-proportion {
          flex: 1;
          display: flex;
          position: relative;
          height: 100%;
          // top: 50%;
          // transform: translateY(-50%);
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
          height: calc(100% - 4rem);
          p {
            width: 100%;
          }
        }
      }
    }
    &.swan {
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
      }
    }
  }
  // 两列指标样式
  .css-upData {
    background: $theme-select;
    border-radius: 4px;
    height: calc(100% - 4rem);
    display: flex;
    flex-direction: column;
    > li {
      overflow: hidden;
      flex: 1;
      display: flex;
      align-items: center;
      > p {
        float: left;
        width: 50%;
        font-size: $font-size-medium;
        > span {
          &:nth-of-type(1) {
            margin-left: .5rem;
          }
          &:nth-of-type(2) {
            color: $theme-green;
            float: right;
            margin-right: .5rem;
            > span {
              color: $theme-font;
            }
          }
          .descripe-color {
            color:#afbcd4 !important;
          }
        }
      }
    }
  }
  // 调用情况 右侧选择框样式
  .account-time {
    display: inline-block;
    width: 15rem;
    .account-time-label {
      display: inline-block;
      width: 35%;
    }
    .account-time-select {
      width: 65%;
    }
  }
  .descripe-color {
    color:#afbcd4;
  }
}
</style>
<style lang="scss">
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
