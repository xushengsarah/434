<template>
  <!-- 调用概览 -->
  <div class="cameraUserPage">
    <!-- left -->
    <div class="wrap-sidebar wrap-sidebar-left">
      <div class="wrap-card wrap-card-10">
        <div class="list-title">
          <span class="list-title-name">镜头列表</span>
          <div class="css-tag">
            <a-radio-group :value="cameraShowType" button-style="solid" size="small" @change="cameraShowChange">
              <a-radio-button value="theme">
                镜头组
              </a-radio-button>
              <a-radio-button value="organ">
                镜头机构
              </a-radio-button>
            </a-radio-group>
            <a-tooltip placement="top">
              <template slot="title">同步主题</template>
              <a-icon type="sync" @click="syncThemeCamera"/>
            </a-tooltip>
          </div>
        </div>
        <div class="search-box">
          <a-tree-select
            v-model="curCameraTypeData.value"
            :dropdown-style="{ maxHeight: '500px', overflow: 'auto' }"
            :tree-data="cameraTableData"
            :load-data="handleCameraExpand"
            @select="handleCameraClickRow">
            <span slot="title" slot-scope="record">
              <img v-show="record.totalCount && record.totalCount != 0" src="@/assets/img/ic_theme map_dark.png" alt="">
              {{ record.name }}
            </span>
          </a-tree-select>
        </div>
      </div>
      <div class="wrap-card wrap-card-90">
        <a-spin :spinning="cameraListSpinning">
          <div class="list-title">
            <span v-if="curCameraShowType != 'theme'" class="list-title-name">{{callType == 'real' ? '实时调用镜头' : '全量镜头'}}</span>
            <div v-else class="camera-list-name">
              <span :class="['list-title-name', cameraEnsureType != 'theme' ? 'active' : '']" @click="cameraListNameClick('1')">保障镜头</span>
              <span :class="['list-title-name', cameraEnsureType == 'theme' ? 'active' : '']" @click="cameraListNameClick('2')">主题镜头</span>
            </div>
            <div class="css-tag">
              <a-radio-group v-model="callType" button-style="solid" size="small" @change="callTypeChange">
                <a-radio-button value="real">
                  实时调用
                </a-radio-button>
                <a-radio-button value="all">
                  全量镜头
                </a-radio-button>
              </a-radio-group>
            </div>
          </div>
          <div class="search-box">
            <a-row>
              <a-col :span='19'>
                <a-input v-model="cameraListSearchVal" placeholder="请输入镜头名称搜索" />
              </a-col>
              <a-col :span='5' style="text-align: right">
                <a-button type="primary" @click="cameraListSearch">搜索</a-button>
              </a-col>
            </a-row>
          </div>
          <div v-if="curCameraShowType == 'theme'" class="tag-box-check">
            <a-row>
              <a-col :span='4'>
                防护圈:
              </a-col>
              <a-col :span='20'>
                <a-checkbox-group v-model="cameraProtectLevel" @change="cameraCheckboxChange">
                  <a-checkbox :value="1" name="type">核心圈</a-checkbox>
                  <a-checkbox :value="2" name="type">一级</a-checkbox>
                  <a-checkbox :value="3" name="type">二级</a-checkbox>
                  <a-checkbox :value="4" name="type">三级</a-checkbox>
                </a-checkbox-group>
              </a-col>
            </a-row>
          </div>
          <div class="relate-title" v-if="isCloseCameraRelateData">
            <span class="name" @click="isShowCameraRelateData = !isShowCameraRelateData">用户：{{activeUserData.nickName}}</span>
            <a-tooltip placement="top">
              <template slot="title">调用{{curCameraTypeData.name}}镜头数：{{cameraRelateDataLength}}</template>
              <span class="number" @click="isShowCameraRelateData = !isShowCameraRelateData">调用{{curCameraTypeData.name}}镜头数：{{cameraRelateDataLength}}</span>
            </a-tooltip>
            <a-icon type="close-circle" @click="isCloseCameraRelateData = false"/>
          </div>
          <div class="list-box"
            :style="isCloseCameraRelateData ? (curCameraShowType != 'theme' ? 'height:calc(100% - 8rem)' : 'height:calc(100% - 11rem)') : (curCameraShowType != 'theme' ? 'height:calc(100% - 6rem)' : 'height:calc(100% - 8rem)')"
            id="cameraListBox">
            <div v-if="curCameraShowType != 'theme' && (!isShowCameraRelateData || !isCloseCameraRelateData)"
              class="camera-box"
              id="cameraTreeBox"
              @mousewheel="cameraHandleScroll">
              <ul class="camera-list" id="cameraDataList">
                <li v-for="(item, index) in cameraOrgData"
                  :class="(item.selected && 'camera-list-item selected') || 'camera-list-item'"
                  :key="index"
                  :label="item.name"
                  :value="item.cameraId">
                    <div class="camera-list-item-new">
                      <div @click="cameraListClick(item, index)" @contextmenu="cameraUserListRightMenu($event, item, index)">
                        <span class="item item-10">
                          <img :src="require('@/assets/img/list_camera_icon/' +
                          ((item.deviceStatus == 0 && item.constCategoryId == 1 && item.devTypeId == 9 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_man first ball_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.devTypeId == 9 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_man first gun_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.locationTypeId == 2 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_high first ball_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.locationTypeId == 2 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_high first gun_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_traffic first ball_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_traffic first gun_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.cameraQuality == 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_hd first ball_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.cameraQuality == 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_hd first gun_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.cameraQuality !== 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Sd first ball_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.cameraQuality !== 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_Sd first gun_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.devTypeId == 9 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_man 2&3 ball_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.devTypeId == 9 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_man 2&3 gun_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.locationTypeId == 2 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_high 2&3 ball_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.locationTypeId == 2 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_high 2&3 gun_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_traffic 2&3 ball_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_traffic 2&3 gun_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.cameraQuality == 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_hd 2&3 ball_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.cameraQuality == 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_hd 2&3 gun_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.cameraQuality !== 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Sd 2&3 ball_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.cameraQuality !== 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_SD 2&3 gun_dark.svg' )||

                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.devTypeId == 9 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_man first ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.devTypeId == 9 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_man first gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.locationTypeId == 2 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_high first ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.locationTypeId == 2 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_high first gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_traffic first ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_traffic first gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.cameraQuality == 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Hd first ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.cameraQuality == 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_hd first gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.cameraQuality !== 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Sd first ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.cameraQuality !== 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_Sd first gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.devTypeId == 9 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_man 2&3 ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.devTypeId == 9 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_man 2&3 gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.locationTypeId == 2 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_high 2&3 ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.locationTypeId == 2 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_high 2&3 gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_traffic 2&3 ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_traffic 2&3 gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.cameraQuality == 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_hd 2&3 ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.cameraQuality == 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_hd 2&3 gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.cameraQuality !== 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Sd 2&3 ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.cameraQuality !== 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_SD 2&3 gun_dark_offline.svg' )))"
                          style="width: 1.2rem; height: 1.2rem">
                        </span>
                        <span class="item item-40">
                          <a-tooltip placement="right">
                            <template slot="title">{{item.cameraName || '--'}}</template>
                            {{item.cameraName || '--'}}
                          </a-tooltip>
                        </span>
                        <span class="item item-30">
                          <a-tooltip placement="right">
                            <template slot="title">{{item.orgName || '--'}}</template>
                            {{item.orgNameShort}}
                          </a-tooltip>
                        </span>
                        <span class="item item-10">{{item.count}}</span>
                      </div>
                      <span class="item item-10" @click="cameraFollowClick(index)"><img :src="require('@/assets/img/' + (item.showValue == 1  ? 'baseline-star-24px.png':'baseline-star_border-24px.png'))" alt=""></span>
                    </div>
                    <!-- <span class="follow" @click="cameraFollowClick(index)"><img :src="require('@/assets/img/' + (item.showValue == 1  ? 'baseline-star-24px.png':'baseline-star_border-24px.png'))" alt=""></span> -->
                  </li>
              </ul>
            </div>
            <div v-else-if="curCameraShowType == 'theme' && (!isShowCameraRelateData || !isCloseCameraRelateData)" class="collapse-box">
              <a-collapse accordion v-model="collapseActiveKey" :bordered="false">
                <template #expandIcon="props">
                  <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
                </template>
                <a-collapse-panel v-for="item in cameraCollapse"
                  :key="item.id"
                  :header="item.header">
                  <span slot="extra">{{item.online}}/{{item.total}}</span>
                  <div :class="'list-box h100 ' + 'theme' + item.key" @mousewheel="cameraHandleThemeScroll(item.key)">
                    <ul class="camera-list" :id="'cameraThemeList-' + item.key">
                      <li v-for="(item, index) in cameraThemeData['theme' + item.key]"
                        :class="(item.selected && 'camera-list-item selected') || 'camera-list-item'"
                        :key="index"
                        :label="item.name"
                        :value="item.cameraId">
                          <div class="camera-list-item-new">
                            <div @click="cameraListClick(item, index)" @contextmenu="cameraUserListRightMenu($event, item, index)">
                              <span class="item item-10">
                                <img :src="require('@/assets/img/list_camera_icon/' +
                                ((item.deviceStatus == 0 && item.constCategoryId == 1 && item.devTypeId == 9 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_man first ball_dark_online.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId == 1 && item.devTypeId == 9 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_man first gun_dark_online.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId == 1 && item.locationTypeId == 2 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_high first ball_dark_online.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId == 1 && item.locationTypeId == 2 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_high first gun_dark_online.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId == 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_traffic first ball_dark_online.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId == 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_traffic first gun_dark_online.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId == 1 && item.cameraQuality == 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_hd first ball_dark.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId == 1 && item.cameraQuality == 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_hd first gun_dark.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId == 1 && item.cameraQuality !== 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Sd first ball_dark_online.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId == 1 && item.cameraQuality !== 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_Sd first gun_dark_online.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.devTypeId == 9 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_man 2&3 ball_dark.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.devTypeId == 9 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_man 2&3 gun_dark.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.locationTypeId == 2 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_high 2&3 ball_dark.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.locationTypeId == 2 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_high 2&3 gun_dark.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId !== 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_traffic 2&3 ball_dark.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId !== 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_traffic 2&3 gun_dark.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.cameraQuality == 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_hd 2&3 ball_dark.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.cameraQuality == 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_hd 2&3 gun_dark.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.cameraQuality !== 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Sd 2&3 ball_dark.svg' ) ||
                                (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.cameraQuality !== 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_SD 2&3 gun_dark.svg' )||

                                (item.deviceStatus != 0 && item.constCategoryId == 1 && item.devTypeId == 9 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_man first ball_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId == 1 && item.devTypeId == 9 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_man first gun_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId == 1 && item.locationTypeId == 2 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_high first ball_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId == 1 && item.locationTypeId == 2 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_high first gun_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId == 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_traffic first ball_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId == 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_traffic first gun_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId == 1 && item.cameraQuality == 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Hd first ball_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId == 1 && item.cameraQuality == 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_hd first gun_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId == 1 && item.cameraQuality !== 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Sd first ball_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId == 1 && item.cameraQuality !== 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_Sd first gun_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.devTypeId == 9 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_man 2&3 ball_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.devTypeId == 9 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_man 2&3 gun_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.locationTypeId == 2 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_high 2&3 ball_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.locationTypeId == 2 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_high 2&3 gun_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId !== 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_traffic 2&3 ball_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId !== 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_traffic 2&3 gun_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.cameraQuality == 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_hd 2&3 ball_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.cameraQuality == 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_hd 2&3 gun_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.cameraQuality !== 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Sd 2&3 ball_dark_offline.svg' ) ||
                                (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.cameraQuality !== 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_SD 2&3 gun_dark_offline.svg' )))"
                                style="width: 1.2rem; height: 1.2rem">
                              </span>
                              <span class="item item-50">
                                <a-tooltip placement="right">
                                  <template slot="title">{{item.cameraName || '--'}}</template>
                                  {{item.cameraName || '--'}}
                                </a-tooltip>
                              </span>
                              <span class="item item-30">
                                <a-tooltip placement="right">
                                  <template slot="title">{{item.orgName || '--'}}</template>
                                  {{item.orgNameShort}}
                                </a-tooltip>
                              </span>
                              <span class="item item-10">{{item.count}}</span>
                            </div>
                          </div>
                        </li>
                    </ul>
                  </div>
                </a-collapse-panel>
              </a-collapse>
            </div>
            <div v-else-if="isCloseCameraRelateData" class="relate-box">
              <ul class="camera-list" id="cameraRelateList">
                <li v-for="(item, index) in cameraRelateData"
                  :class="(item.selected && 'camera-list-item selected') || 'camera-list-item'"
                  :key="index"
                  :label="item.name"
                  :value="item.cameraId">
                    <div class="camera-list-item-new">
                      <div @click="cameraListClick(item, index)" @contextmenu="cameraUserListRightMenu($event, item, index)">
                        <span class="item item-10">
                          <img :src="require('@/assets/img/list_camera_icon/' +
                          ((item.deviceStatus == 0 && item.constCategoryId == 1 && item.devTypeId == 9 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_man first ball_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.devTypeId == 9 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_man first gun_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.locationTypeId == 2 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_high first ball_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.locationTypeId == 2 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_high first gun_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_traffic first ball_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_traffic first gun_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.cameraQuality == 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_hd first ball_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.cameraQuality == 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_hd first gun_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.cameraQuality !== 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Sd first ball_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId == 1 && item.cameraQuality !== 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_Sd first gun_dark_online.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.devTypeId == 9 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_man 2&3 ball_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.devTypeId == 9 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_man 2&3 gun_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.locationTypeId == 2 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_high 2&3 ball_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.locationTypeId == 2 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_high 2&3 gun_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_traffic 2&3 ball_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_traffic 2&3 gun_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.cameraQuality == 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_hd 2&3 ball_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.cameraQuality == 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_hd 2&3 gun_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.cameraQuality !== 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Sd 2&3 ball_dark.svg' ) ||
                          (item.deviceStatus == 0 && item.constCategoryId !== 1 && item.cameraQuality !== 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_SD 2&3 gun_dark.svg' )||

                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.devTypeId == 9 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_man first ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.devTypeId == 9 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_man first gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.locationTypeId == 2 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_high first ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.locationTypeId == 2 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_high first gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_traffic first ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_traffic first gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.cameraQuality == 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Hd first ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.cameraQuality == 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_hd first gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.cameraQuality !== 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Sd first ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId == 1 && item.cameraQuality !== 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_Sd first gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.devTypeId == 9 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_man 2&3 ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.devTypeId == 9 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_man 2&3 gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.locationTypeId == 2 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_high 2&3 ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.locationTypeId == 2 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_high 2&3 gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_traffic 2&3 ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && (item.cameraPoliceType == 3 || item.cameraPoliceType == 8) && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_traffic 2&3 gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.cameraQuality == 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_hd 2&3 ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.cameraQuality == 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_hd 2&3 gun_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.cameraQuality !== 1 && (item.cameraType == 1 || item.cameraType == 2) && 'ic_vedio_Sd 2&3 ball_dark_offline.svg' ) ||
                          (item.deviceStatus != 0 && item.constCategoryId !== 1 && item.cameraQuality !== 1 && (item.cameraType !== 1 && item.cameraType !== 2) && 'ic_vedio_SD 2&3 gun_dark_offline.svg' )))"
                          style="width: 1.2rem; height: 1.2rem">
                        </span>
                        <span class="item item-50">
                          <a-tooltip placement="right">
                            <template slot="title">{{item.cameraName || '--'}}</template>
                            {{item.cameraName || '--'}}
                          </a-tooltip>
                        </span>
                        <span class="item item-30">
                          <a-tooltip placement="right">
                            <template slot="title">{{item.orgName || '--'}}</template>
                            {{item.orgNameShort}}
                          </a-tooltip>
                        </span>
                        <span class="item item-10">{{item.count}}</span>
                      </div>
                    </div>
                  </li>
              </ul>
            </div>
          </div>
        </a-spin>
      </div>
    </div>

    <!-- center -->
    <div class="wrap-sidebar wrap-sidebar-center">
      <div class="wrap-card wrap-card-left">
        <div class="icon-but-group">
          <div class="img-but" @click="shrinkButClick">
            <a-tooltip placement="right">
              <template slot="title">{{shrinkState ? '列表展示' : '地图全屏'}}</template>
              <a-icon :type="shrinkState ? 'shrink' : 'arrows-alt'"></a-icon>
            </a-tooltip>
          </div>
          <div class="img-but" @click="protectNewsClick">
            <a-tooltip placement="right">
              <template slot="title">详细情况</template>
              <img src="@/assets/img/ic_online statistics_dark.png">
            </a-tooltip>
          </div>
          <!-- <div class="img-but" @click="rightClickTopology">
            <a-tooltip placement="right">
              <template slot="title">拓扑图</template>
              <img src="@/assets/img/ic_map_Topology.png">
            </a-tooltip>
          </div>
          <div v-show="curCameraShowType == 'theme'" class="img-but" @click="editThemeButClick">
            <a-tooltip placement="right">
              <template slot="title">编辑主题</template>
              <a-icon type="edit"></a-icon>
            </a-tooltip>
          </div>
          <div class="img-but" @click="addThemeButClick">
            <a-tooltip placement="right">
              <template slot="title">新增主题</template>
              <a-icon type="plus-circle"></a-icon>
            </a-tooltip>
          </div> -->
          <div v-show="curCameraShowType == 'theme'" class="img-but" @click="flowControlButClick">
            <a-tooltip placement="right">
              <template slot="title">取流管控</template>
              <img src="@/assets/img/ic_map_edit theme-2.png">
            </a-tooltip>
          </div>
          <div v-show="curCameraShowType == 'theme'" class="img-but" :class="isShowFaceBox?'active':''" @click="snapshotButClick">
            <a-tooltip placement="right">
              <template slot="title">抓拍图</template>
              <a-icon type="picture"></a-icon>
            </a-tooltip>
          </div>
        </div>
      </div>
      <div class="wrap-card wrap-card-auto">
        <!-- 拓扑图 -->
        <topology-graph v-if="certerShowType == 'topology'"
          ref="topologyGraphModule"
          :topoType="topoType"
          :activeCameraData="activeCameraData"
          :userRelateData="userRelateData"
          :activeUserData="activeUserData"
          :cameraTrafficData="cameraTrafficData"
          :userTrafficData="userTrafficData"
          @closeTopology="handelcloseTopology"></topology-graph>
        <!-- 取流管控 -->
        <flow-control v-if="certerShowType == 'control'"
          ref="flowControlModule"
          :themeData='curCameraTypeData'
          @closeControl="handelCloseControl"></flow-control>
      </div>
      <div class="wrap-card wrap-card-right">
        <!-- <div class="icon-but-group">
          <div class="img-but"><img src="@/assets/img/ic_windows unfold_dark.png" ></div>
          <div class="img-but"><img src="@/assets/img/ic_windows unfold_dark.png" ></div>
          <div class="img-but"><img src="@/assets/img/ic_windows unfold_dark.png" ></div>
          <div class="img-but"><img src="@/assets/img/ic_windows unfold_dark.png" ></div>
          <div class="img-but"><img src="@/assets/img/ic_windows unfold_dark.png" ></div>
        </div> -->
      </div>
      <!-- 小窗口播放 -->
      <div class="wrap-card wrap-sidebar-video">
        <div class="camera-video-box"
          v-for="(item, index) in playVideoData"
          :class="item.isShowVideo ? item.idName : (item.idName + ' displayNone')"
          :key="index"
          :value="item.idName">
          <div class="wrap-title">
            <!-- :key="item.idName" -->
            <p>{{item.data.NAME || item.data.cameraName}}</p>
            <a-icon type="close" @click="closeVideoBoxClick(item)"></a-icon>
            <a-icon type="block" @click="enlargeVideoBoxClick(item)"></a-icon>
          </div>
          <div class="wrap-video" :id="item.idName+'-box'" :cameraId="item.cameraId">
            <div class="wrap-video-img" v-show="item.snapImg.length">
              <img v-for="(item1, index) in item.snapImg" :key="index" :src="item1.thumImageUrl"  @click="showBigMask(item1)" alt="">
            </div>
            <real-play-video ref="realPlayVideoModal" :videoData="item" :style="{width:(item.snapImg.length>0?'85%':'100%')}"></real-play-video>
          </div>
        </div>
      </div>
      <!-- 抓拍图 -->
      <div v-if="isShowFaceBox" class="wrap-card wrap-sidebar-face">
        <snapshot-graph ref="snapshotGraphModule" :cameraSelectedData="curCameraTypeData" :cameraProtectLevel="cameraProtectLevel" :key="snapshotGraphTimer"></snapshot-graph>
      </div>
    </div>

    <!-- right -->
    <div class="wrap-sidebar wrap-sidebar-right">
      <div class="wrap-card wrap-card-10">
        <div class="list-title">
          <span class="list-title-name">用户列表</span>
          <div class="css-tag">
            <a-radio-group :value="userShowType" button-style="solid" size="small" @change="userShowChange">
              <a-radio-button value="theme">
                用户组
              </a-radio-button>
              <a-radio-button value="organ">
                用户机构
              </a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div class="search-box">
          <a-tree-select
            v-model="curUserTypeData.value"
            :dropdown-style="{ maxHeight: '500px', overflow: 'auto' }"
            :tree-data="userTableData"
            :load-data="handleUserExpand"
            @select="handleUserClickRow">
            <span slot="title" slot-scope="record">
              {{ record.name }}
            </span>
          </a-tree-select>
        </div>
      </div>
      <div class="wrap-card wrap-card-90">
        <a-spin :spinning="userListSpinning">
          <div class="list-title">
            <span class="list-title-name">实时在线用户</span>
          </div>
          <div class="search-box">
            <a-row type="flex" justify="space-between" align="top">
              <a-col :span='18'>
                <a-input v-model="userListSearchVal" placeholder="请输入用户名称/IP搜索" />
              </a-col>
              <a-col :span='5'>
                <a-button type="primary" @click="userListSearch">搜索</a-button>
              </a-col>
            </a-row>
          </div>
          <div class="relate-title" v-if="isCloseUserRelateData">
            <a-tooltip placement="top">
              <template slot="title">镜头：{{activeCameraData.cameraName}}</template>
              <span class="name" @click="isShowUserRelateData = !isShowUserRelateData">镜头：{{activeCameraData.cameraName}}</span>
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">调用{{curUserTypeData.name}}用户数：{{userRelateDataLength}}</template>
              <span class="number" @click="isShowUserRelateData = !isShowUserRelateData">调用此镜头用户数：{{userRelateDataLength}}</span>
              <!-- {{curUserTypeData.name}} -->
            </a-tooltip>
            <a-icon type="close-circle" @click="isCloseUserRelateData = false"/>
          </div>
          <div class="list-box" id="userTreeBox" @mousewheel="userHandleScroll" :style="isCloseUserRelateData ? 'height: calc(100% - 8.5rem)':'height: calc(100% - 6rem)'">
            <ul v-if="!isShowUserRelateData || !isCloseUserRelateData" class="camera-list" id="userDataList">
              <li v-for="(item, index) in userData"
                :class="(item.selected && 'camera-list-item selected') || 'camera-list-item'"
                :key="index"
                :label="item.nickName"
                :value="item.userId">
                <div class="camera-list-item-new">
                  <div @click="userListClick(item, index)" @contextmenu="cameraUserListRightMenu($event, item, index)">
                    <span class="item item-10">
                      <img :src="require('@/assets/img/' + (
                        item.clientSrc == 1 && 'ic_home_COMPUTER.png' ||
                        item.clientSrc == 12 && 'ic_home_mechanism.png' ||
                        item.clientSrc == 13 && 'ic_home_PHINE.png' || 'ic_home_COMPUTER.png')) ">
                    </span>
                    <span class="item item-15">{{item.nickName || '--'}}</span>
                    <span class="item item-35">
                      <a-tooltip placement="right">
                        <template slot="title">{{item.orgName || '--'}}</template>
                        {{item.orgNameShort || '--'}}
                      </a-tooltip>
                    </span>
                    <span class="item item-20">
                      <a-tooltip placement="right">
                        <template slot="title">{{item.callTime || '--'}}</template>
                        {{item.timeDate || '--'}}
                      </a-tooltip>
                    </span>
                    <span class="item item-10">{{item.count}}</span>
                  </div>
                  <span class="item item-10" :value="item.showValue" @click="userFollowClick(index)"><img :src="require('@/assets/img/' + (item.showValue === 1 ? 'baseline-star-24px.png':'baseline-star_border-24px.png'))" alt=""></span>
                </div>
                <!-- <span class="item item-5" @click="offlineClick(item, index)" title="实时断流"><img src="@/assets/img/baseline-star_border-24px.png"></span> -->
                <!-- <span class="follow" @click="userFollowClick(index)"><img :src="require('@/assets/img/' + (item.showValue == 1 ? 'baseline-star-24px.png':'baseline-star_border-24px.png'))" alt=""></span> -->
              </li>
            </ul>
            <div v-else-if="isCloseUserRelateData" class="relate-box">
              <ul class="camera-list" id="userRelateList">
                <li v-for="(item, index) in userRelateData"
                  :class="(item.selected && 'camera-list-item selected') || 'camera-list-item'"
                  :key="index"
                  :label="item.nickName"
                  :value="item.userId">
                  <div class="camera-list-item-new">
                    <div @click="userListClick(item, index)" @contextmenu="cameraUserListRightMenu($event, item, index)">
                      <span class="item item-10">
                        <img :src="require('@/assets/img/' + (
                          item.clientSrc == 1 && 'ic_home_COMPUTER.png' ||
                          item.clientSrc == 12 && 'ic_home_mechanism.png' ||
                          item.clientSrc == 13 && 'ic_home_PHINE.png' || 'ic_home_COMPUTER.png'
                        )) ">
                      </span>
                      <span class="item item-15">{{item.nickName || '--'}}</span>
                      <span class="item item-35">
                        <a-tooltip placement="right">
                          <template slot="title">{{item.orgName || '--'}}</template>
                          {{item.orgNameShort || '--'}}
                        </a-tooltip>
                      </span>
                      <span class="item item-30">
                        <a-tooltip placement="right">
                          <template slot="title">{{item.callTime || '--'}}</template>
                          {{item.timeDate || '--'}}
                        </a-tooltip>
                      </span>
                      <span class="item item-10">{{item.count}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </a-spin>
      </div>
    </div>

    <!-- 悬浮框 防护圈信息 -->
    <div class="protect-news" v-if="isShowProtectNews">
      <a-spin :spinning="protectNewsSpinning">
        <div class="protect-news-title">
          <span>{{protectNewsTitle}}</span>
          <a-icon type="close" @click="isShowProtectNews=false"></a-icon>
        </div>
        <div class="protect-news-content">
          <div class="protect-news-index">
            <a-row :gutter="32" type="flex" justify="space-between" align="top">
              <a-col :span='8'>
                <span class="protect-news-tag">镜头总数:</span>
                <span class="protect-news-val">{{protectNewsDataArr.totalCount}}</span>
              </a-col>
              <a-col :span='8'>
                <span class="protect-news-tag">一类点:</span>
                <span class="protect-news-val">{{protectNewsDataArr.type1Count}}</span>
              </a-col>
              <a-col :span='8'>
                <span class="protect-news-tag">二三类点:</span>
                <span class="protect-news-val">{{protectNewsDataArr.type23Count}}</span>
              </a-col>
              <a-col :span='8'>
                <span class="protect-news-tag">人脸:</span>
                <span class="protect-news-val">{{protectNewsDataArr.faceCount}}</span>
              </a-col>
              <a-col :span='8'>
                <span class="protect-news-tag">高点:</span>
                <span class="protect-news-val">{{protectNewsDataArr.highPointCount}}</span>
              </a-col>
            </a-row>
          </div>
          <div class="protect-news-table">
            <a-table
              :rowKey="record => record.index"
              :columns="protectNewsColumns"
              :data-source="protectNewsData"
              :pagination="false">
            </a-table>
          </div>
        </div>
      </a-spin>
    </div>

    <!-- 右键菜单 -->
    <div class="css-rightClickProp" :style="propStyle" v-show="rightClickProp">
      <li v-show="!isUserList" @click="rightClickPlay">实时监控和抓拍图</li>
      <li v-show="!isUserList" @click="rightClickHis">历史视频和抓拍图</li>
      <li @click="rightClickTopology">查看拓扑图</li>
      <li v-show="!isUserList" @click="rightClickCameraInfo">设备信息</li>
      <li @click="rightClickOffline">实时断流</li>
    </div>

    <!-- map -->
    <iframe id="cameraUserMap" class="css-iframe" :src="'http://190.168.17.2:6083/keyArea.html?sessionid='+Sessionids"></iframe>

    <!-- 弹框 -->
    <a-modal :title="viedoTitle" :visible="isPlayVideo" footer="" @cancel="handlePlayVideoCancel" width="60%">
      <play-video :videoData="videoData" ref="playVideoModal"></play-video>
    </a-modal>
    <a-modal title="大图" :visible="isShowBigMask" footer="" @cancel="handleBigMask" width="60%" class="bigMask">
      <div class="bigMask-info">
          <div class="infoName">{{bigName}}</div>
          <div class="infoTime">{{bigTime}}</div>
      </div>
      <img class="bigMask-img" :src="bigImg">
    </a-modal>
    <a-modal title="设备信息" :visible="isDeviceNews" footer="" @cancel="handleDeviceNewsCancel" width="50%">
      <device-news ref="deviceNewsModal"></device-news>
    </a-modal>
  </div>
</template>

<script>
import playVideo from './playVideo'
import deviceNews from './deviceNews'
import flowControl from './flowControl'
import topologyGraph from './topologyGraph'
import snapshotGraph from './snapshotGraph'
import realPlayVideo from '@/components/realPlayVideo'

import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    playVideo,
    deviceNews,
    flowControl,
    topologyGraph,
    snapshotGraph,
    realPlayVideo,
  },
  computed: {
    ...mapGetters({
      token: "token",
      sessionId: "sessionId",
      Socket: "Socket",
      SocketData: "SocketData",
      SocketIsClose: "SocketIsClose",
    }),
  },
  watch:{
    '$store.state.snapImgData':{
      handler(val) {
        this.playVideoData.forEach(item=>{
          val.forEach(item1=>{
            if(item1.cameraId == item.data.cameraId ||item1.cameraId == item.data.GUID){
              let arr = item1.snapImgArr;
              item.snapImg = arr;
            }
          })
        })
        console.log(this.playVideoData);
      },
      immediate: true,
      deep: true
    },
    'cameraMapData':{
        handler(data) {
            let self = this;
            if (data.type === "playvideo") {
                // 小窗口实时视频
                for(let i = 0; i < self.playVideoData.length; i++) {
                    if (self.playVideoData[i].isShowVideo === false) {
                        self.playVideoData[i].isShowVideo = true
                        self.playVideoData[i].data = data.atrs // 添加镜头数据
                        self.$nextTick(() => {
                            if (self.$refs.realPlayVideoModal[i]) {
                            self.$refs.realPlayVideoModal[i].initCurrentData()
                            }
                        })
                        self.getMapVideoPush(self.playVideoData[i]);
                        break
                    } else if(i==3 && self.playVideoData[i].isShowVideo === true) {
                        self.$message.warning('可同时播放四个视频！！！')
                    }
                }
            } else if (data.type == 'replayvideo') {
                self.viedoTitle = '历史视频'
                self.isPlayVideo = true
                self.videoData = data.atrs
                self.videoData.type = 'playback'
                self.$nextTick(() => {
                    if (self.$refs.playVideoModal) {
                        self.$refs.playVideoModal.initCurrentData()
                    }
                })
            }
        },
        immediate: true,
        deep: true
    }
  },
  data () {
    return {
      Sessionids: window.sessionStorage.getItem('loginSessionid'),
      shrinkState: false,// 收缩状态

      // 存储数据
      cameraThemeArr: [], // 镜头主题列表
      userGroupArr: [], // 用户主题列表
      cameraOrgArr: [], // 镜头机构列表
      userOrgArr: [], // 用户机构列表

      // 镜头列表 用户列表 选择
      cameraShowType: 'theme', // 下拉框类型：主题theme/机构organ
      cameraTableData: [], // 镜头类型下拉列表
      curCameraShowType: 'theme', // 镜头当前选中数据类型：主题theme/机构organ
      cameraEnsureType: 'ensure', // ensure保障/theme主题
      curCameraTypeData: '', // 镜头当前选中数据
      userShowType: 'organ', // 下拉框类型：主题theme/机构organ
      userTableData: [], // 用户类型下拉列表
      curUserShowType: 'organ', // 用户当前选中数据类型
      curUserTypeData: '', // 用户当前选中数据

      // 防护圈弹框数据
      protectNewsSpinning: true, // 加载状态
      isShowProtectNews: true, // 防护圈信息展示
      protectNewsTitle: '',
      protectNewsColumns: [
        { title: '防护圈级别', dataIndex: 'levelVal', key: 'levelVal', align: 'center' },
        { title: '镜头数', dataIndex: 'totalCount', key: 'totalCount', align: 'center' },
        { title: '一类点数/在线率', dataIndex: 'onlineRate1', key: 'onlineRate1', align: 'center' },
        { title: '二三类点数/在线率', dataIndex: 'onlineRate23', key: 'onlineRate23', align: 'center' },
        { title: '人脸', dataIndex: 'faceCount', key: 'faceCount', align: 'center' },
        { title: '高点', dataIndex: 'highPointCount', key: 'highPointCount', align: 'center' },
      ],
      protectNewsDataArr: '', // 防护圈信息详情
      protectNewsData: [],

      // 实时镜头列表
      callType: 'all', // 实时调用/全量镜头
      collapseActiveKey: 'a1', // 折叠面板默认展开
      cameraProtectLevel: [1,2,3,4], // 防护圈筛选
      cameraCollapse: [ // 多层折叠面板统计数据
        {
          key: 1,
          id: 'a1',
          header: '一类点镜头',
          total: '0',
          online: '0',
          currentPage: 1,
          totalPage: 1
        }, {
          key: 2,
          id: 'a2',
          header: '二三类点镜头',
          total: '0',
          online: '0',
          currentPage: 1,
          totalPage: 1
        }, {
          key: 3,
          id: 'a3',
          header: '高点镜头',
          total: '0',
          online: '0',
          currentPage: 1,
          totalPage: 1
        }, {
          key: 4,
          id: 'a4',
          header: '人像镜头',
          total: '0',
          online: '0',
          currentPage: 1,
          totalPage: 1
        }, {
          key: 5,
          id: 'a5',
          header: '卡口镜头',
          total: '0',
          online: '0',
          currentPage: 1,
          totalPage: 1
        }, {
          key: 0,
          id: 'a0',
          header: '全部',
          total: '0',
          online: '0',
          currentPage: 1,
          totalPage: 1
        }
      ],
      cameraListSpinning: false,
      cameraListSearchVal: '',
      activeCameraData: '',
      cameraOrgData: [], // 机构镜头
      cameraThemeData: {}, // 主题镜头
      realCameraOrgData: [], // 机构镜头(实时)
      realCameraThemeData: {}, // 主题镜头(实时)
      allCameraOrgData: [], // 机构镜头(全量)
      allCameraThemeData: {}, // 主题镜头(全量)
      cameraCurrentPage: 1, // 当前页码
      cameraTotalPage: 1, // 分页总数
      // 用户关联镜头数据
      isShowCameraRelateData: false,
      isCloseCameraRelateData: false,
      cameraRelateData: [], // 用户关联镜头数据
      cameraRelateDataLength: '', // 用户关联镜头数据长度
      cameraRelateDataList: [], // 拓扑结构用户关联镜头数据集合
      cameraTrafficData: '',

      // 实时用户列表
      userListSpinning: false,
      userListSearchVal: '',
      activeUserData: '',
      originUserData: [],
      userData: [],
      userCurrentPage: 1, // 当前页码
      userTotalPage: 1, // 分页总数
      // 镜头关联用户数据
      isShowUserRelateData: false,
      isCloseUserRelateData: false,
      userRelateData: [], // 镜头关联用户数据
      userRelateDataLength: '', // 镜头关联用户数据长度
      userTrafficData: '',

      // 拓扑结构
      topoType: 'camera', // 拓扑结构不同类型
      certerShowType: false, // 是否展示拓扑结构
      isShowButton1: false, // 鼠标经过显示菜单

      // 弹框
      isPlayVideo: false, // 是否显示视频弹框
      viedoTitle: '历史视频',
      videoData: '',

      isDeviceNews: false, // 设备信息

      realTimeHeart:'',  //心跳
      // 实时播放参数
      playVideoData: [
        {
          idName: 'mapVideo-1',
          isShowVideo: false,
          data: "",
          snapImg:[]  //抓拍图
        }, {
          idName: 'mapVideo-2',
          isShowVideo: false,
          data: "",
          snapImg:[]  //抓拍图
        }, {
          idName: 'mapVideo-3',
          isShowVideo: false,
          data: "",
          snapImg:[]  //抓拍图
        }, {
          idName: 'mapVideo-4',
          isShowVideo: false,
          data: "",
          snapImg:[]  //抓拍图
        }
      ],

      isShowFaceBox: false, // 是否显示人脸抓拍

      // 右击弹窗
      propStyle: '',
      isUserList: false,
      rightCameraUserData: {},
      rightClickProp: false,
      cameraMapData:{},  //为了防止地图重复传来数据导致重复调用函数，watch监听
      snapshotGraphTimer:'',  //抓拍图组件重新加载时间戳
      isShowBigMask:false,
      bigImg:'',
      bigName:'',
      bigTime:''
    }
  },
  created () {
    const self = this
    // 左-获取镜头主题列表
    self.getCameraThemeList()
    // 左-获取镜头机构列表
    self.getCameraOrgList()
    // 右-获取用户组列表
    self.getUserGroupList()
    // 右-获取用户机构列表
    self.getUserOrgList()
    // 监听地图数据
    self.listeningMap()

    // 关闭右键弹窗
    document.onclick = () => {
      self.rightClickProp = false
    }

    // 给地图发送token数据
    setTimeout(() => {
      let searchMapIframe = document.getElementById('cameraUserMap')
      let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
      let locationData = {
          type: "token",
          data: {
            token: self.token,
          }
      }
      if (searchMapIframe && searchMapIframe.contentWindow) {
        searchMapIframe.contentWindow.postMessage(locationData, targetOrigin);
      }
    }, 2000);
  },
  // 清除监听事件
  beforeRouteLeave (to, from, next) {
    const self = this
    if(from.path === '/cameraUserList') {
      window.removeEventListener("message", self.listeningFun);
    }
    next()
  },
  beforeDestroy() {
    //清掉定时器
    this.playVideoData.forEach(item=>{
      if(item.isShowVideo){
        this.stopMapVideoPush(item);
      }
    })
    this.$store.commit("deleteAllSnapImgData");
  },
  destroyed() {},
  methods: {
    // 保障镜头/主题镜头切换
    cameraListNameClick(code) {
      const self = this
      if (self.curCameraShowType == 'theme') {
        let searchMapIframe = document.getElementById('cameraUserMap')
        let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
        let locationData = {
            type: "switchBZorPTcamera",
            data: {
              type: 2,
              id: self.curCameraTypeData.id
            }
        }
        if(code == '1') {
          self.cameraEnsureType = 'ensure'
          locationData.data.type = 2
        } else {
          self.cameraEnsureType = 'theme'
          locationData.data.type = 1
        }
        // 地图切换
        if (searchMapIframe && searchMapIframe.contentWindow) {
          searchMapIframe.contentWindow.postMessage(locationData, targetOrigin);
        }

        // 获取防护圈数据
        self.protectNewsTitle = self.curCameraTypeData.name + (self.cameraEnsureType == 'theme' ? '防护圈(主题镜头)' : '防护圈(保障镜头)')
        self.getOnlineCameraStatistics()

        self.getCameraListByThemeIdOrOrgId(true, 1) // 获取主题一类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 2) // 获取主题二三类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 3) // 获取主题高点镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 4) // 获取主题人像镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 5) // 获取主题卡口镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 0) // 获取主题全部镜头列表数据
      }
    },
    // 展开/收缩按钮
    shrinkButClick(e) {
      const self = this
      self.isShowProtectNews = false // 关闭主题数据详情
      self.certerShowType = false // 关闭取流管控和拓扑图
      $('.cameraUserPage .img-but').removeClass('active')
      $(e.currentTarget).addClass('active')
      if(self.shrinkState == false) {
        self.shrinkState = true
        $('.cameraUserPage .wrap-sidebar-left').css('flex', '0 0 0px')
        $('.cameraUserPage .wrap-sidebar-right').css('flex', '0 0 0px')
        $('.cameraUserPage .wrap-card-auto').css('height', '0') // 收缩
        // 地图展示
        let searchMapIframe = document.getElementById('cameraUserMap')
        let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
        let locationData = {
            type: "isExpand",
            data: {
              isExpand: false,  //true 展开 false 收起
            }
        }
        if (searchMapIframe && searchMapIframe.contentWindow) {
          searchMapIframe.contentWindow.postMessage(locationData, targetOrigin);
        }
      } else {
        self.shrinkState = false
        $('.cameraUserPage .wrap-sidebar-left').css('flex', "1 1 0%")
        $('.cameraUserPage .wrap-sidebar-right').css('flex', "1 1 0%")
        $('.cameraUserPage .wrap-card-auto').css('height', 'auto')
        // 地图展示
        let searchMapIframe = document.getElementById('cameraUserMap')
        let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
        let locationData = {
            type: "isExpand",
            data: {
              isExpand: true,  //true 展开 false 收起
            }
        }
        if (searchMapIframe && searchMapIframe.contentWindow) {
          searchMapIframe.contentWindow.postMessage(locationData, targetOrigin);
        }
      }
    },
    // 展示/关闭 防护圈信息展示
    protectNewsClick(e) {
      const self = this
      self.certerShowType = false // 关闭取流管控和拓扑图
      $('.cameraUserPage .img-but').removeClass('active')
      $(e.currentTarget).addClass('active')
      if(self.shrinkState == false) {
        if (self.isShowProtectNews) {
          self.isShowProtectNews = false
        } else {
          self.isShowProtectNews = true
        }
      }
    },
    // // 展示 编辑主题
    // editThemeButClick(e) {
    //   const self = this
    //   self.isShowProtectNews = false // 关闭主题数据详情
    //   self.certerShowType = false // 关闭取流管控和拓扑图
    //   $('.cameraUserPage .img-but').removeClass('active')
    //   $(e.currentTarget).addClass('active')
    //   // 主题编辑栏展示
    //   let searchMapIframe = document.getElementById('cameraUserMap')
    //   let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
    //   let locationData = {
    //       type: "showDrawTool",
    //       data: {
    //         type: 1,
    //         plan_id: self.curCameraTypeData.id
    //       }
    //   }
    //   searchMapIframe.contentWindow.postMessage(locationData, targetOrigin);
    // },
    // 展示 添加主题
    // addThemeButClick(e) {
    //   const self = this
    //   self.isShowProtectNews = false // 关闭主题数据详情
    //   self.certerShowType = false // 关闭取流管控和拓扑图
    //   $('.cameraUserPage .img-but').removeClass('active')
    //   $(e.currentTarget).addClass('active')
    //   // 主题编辑栏展示
    //   let searchMapIframe = document.getElementById('cameraUserMap')
    //   let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
    //   let locationData = {
    //       type: "showDrawTool",
    //       data: {
    //         type: 0,
    //       }
    //   }
    //   searchMapIframe.contentWindow.postMessage(locationData, targetOrigin);
    // },
    // 展示/关闭 取流管控
    flowControlButClick(e) {
      const self = this
      self.isShowProtectNews = false
      $('.cameraUserPage .img-but').removeClass('active')
      $(e.currentTarget).addClass('active')
      if(self.shrinkState == false) {
        if(self.certerShowType !== 'control'){
          self.certerShowType = 'control'
          self.$nextTick(() => {
            if (self.$refs.flowControlModule) {
              self.$refs.flowControlModule.init()
            }
          })
        } else {
          self.certerShowType = false
        }
      }
    },
    // 展示/关闭 抓拍图
    snapshotButClick(e) {
      const self = this
      self.isShowProtectNews = false
      // $('.cameraUserPage .img-but').removeClass('active')
      // $(e.currentTarget).addClass('active')
      if(self.shrinkState == false) {
        if(self.isShowFaceBox !== 'control'){
          self.isShowFaceBox = 'control'
          // self.$nextTick(() => {
          //   if (self.$refs.snapshotGraphModule) {
          //     self.$refs.snapshotGraphModule.init()
          //   }
          // })
        } else {
          self.isShowFaceBox = false
        }
      }
    },
    // 关闭 拓扑图
    handelcloseTopology(val) {
      const self = this
      if(val == false) {
        self.certerShowType = false
      }
    },
    // 关闭 取流管控
    handelCloseControl(val) {
      const self = this
      if(val.isShowControl == false) {
        self.certerShowType = false
      }
    },

    // 镜头组/镜头机构 搜索事件
    cameraThemeSearch() {
      const self = this
      if (self.curCameraShowType == 'theme') {
        self.getCameraListByThemeIdOrOrgId(true, 1) // 获取主题一类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 2) // 获取主题二三类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 3) // 获取主题高点镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 4) // 获取主题人像镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 5) // 获取主题卡口镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 0) // 获取主题全部镜头列表数据
      } else {
        self.getCameraListByThemeIdOrOrgId(true)// 获取镜头列表数据
      }
    },
    // 镜头组/镜头机构tab 切换事件
    cameraShowChange(val) {
      const self = this
      self.cameraShowType = val.target.value
      if (self.cameraShowType == "theme") {
        self.cameraTableData = self.cameraThemeArr
      } else {
        self.cameraTableData = self.cameraOrgArr
      }
    },
    // 实时调用&全量调用
    callTypeChange() {
      const self = this
      if (self.curCameraShowType == 'theme') {
        self.getCameraListByThemeIdOrOrgId(true, 1) // 获取主题一类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 2) // 获取主题二三类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 3) // 获取主题高点镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 4) // 获取主题人像镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 5) // 获取主题卡口镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 0) // 获取主题全部镜头列表数据
      } else {
        self.getCameraListByThemeIdOrOrgId(true)// 获取镜头列表数据
      }
    },
    // 用户组/用户机构tab 切换事件
    userShowChange(val) {
      const self = this
      self.userShowType = val.target.value
      if (self.userShowType == "theme") {
        self.userTableData = self.userGroupArr
      } else {
        self.userTableData = self.userOrgArr
      }
    },
    // 镜头组/镜头机构列表 点击事件
    handleCameraClickRow(val, label) {
      const self = this
      self.curCameraTypeData = label.dataRef
      self.$store.commit('changeSelectedCameraTypeData', self.curCameraTypeData) // 保存数据

      if (self.cameraShowType == 'theme') {
        self.curCameraShowType = 'theme'
        self.isShowProtectNews = true // 打开主题数据详情 防护圈信息展示
        self.getCameraListByThemeIdOrOrgId(true, 1) // 获取主题一类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 2) // 获取主题二三类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 3) // 获取主题高点镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 4) // 获取主题人像镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 5) // 获取主题卡口镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 0) // 获取主题全部镜头列表数据
        if(self.curCameraTypeData.totalCount && self.curCameraTypeData.totalCount != 0) { // 有镜头数说明有防护圈
          self.protectNewsTitle = self.curCameraTypeData.name + (self.cameraEnsureType == 'theme' ? '防护圈(主题镜头)' : '防护圈(保障镜头)')
          self.getOnlineCameraStatistics() // 获取防护圈数据

          // 防护圈定位
          let searchMapIframe = document.getElementById('cameraUserMap')
          let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
          let locationData = {
              type: "showKeyArea",
              data: {
                id: self.curCameraTypeData.id
              }
          }
          if (searchMapIframe && searchMapIframe.contentWindow) {
            searchMapIframe.contentWindow.postMessage(locationData, targetOrigin);
          }
        }
        if(self.isShowFaceBox == 'control'){
          self.snapshotGraphTimer = new Date().getTime();
        }
      } else { // 防护圈定位清空
        self.curCameraShowType = 'organ'
        self.isShowProtectNews = false // 关闭主题数据详情 防护圈信息展示
        self.isShowFaceBox = false;
        self.getCameraListByThemeIdOrOrgId(true) // 获取镜头列表数据
        self.protectNewsTitle = self.curCameraTypeData.orgName + '一三五防护圈'
        self.getOnlineCameraStatistics() // 获取防护圈数据
        let searchMapIframe = document.getElementById('cameraUserMap')
        let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
        let locationData = {
            type: "changeArea",
            data: {
              // PCcode: '4403'
              PCcode: self.curCameraTypeData.orgCode
            }
        }
        if (searchMapIframe && searchMapIframe.contentWindow) {
          searchMapIframe.contentWindow.postMessage(locationData, targetOrigin);
        }
      }
    },
    // 用户组/用户机构列表 点击事件
    handleUserClickRow(val, label) {
      const self = this
      self.curUserTypeData = label.dataRef
      if (self.userShowType == 'theme') { // 防护圈信息展示
        self.curUserShowType = 'theme'
      } else {
        self.curUserShowType = 'organ'
      }
      // 获取数据
      self.getUserListByGroupIdOrOrgId(true)
    },
    // 镜头组/镜头机构列表 扩展加载数据
    handleCameraExpand(treeNode) {
      const self = this
      if(treeNode.dataRef.children.length == 0) {
        self.getCameraOrgList(treeNode.dataRef)
      }
    },
    // 镜头组/镜头机构列表 扩展加载数据
    handleUserExpand(treeNode) {
      const self = this
      if(treeNode.dataRef.children.length == 0) {
        self.getUserOrgList(treeNode.dataRef)
      }
    },

    // 右击查看菜单
    cameraUserListRightMenu(e, item, index) {
      const self = this
      e.preventDefault()
      const left = e.pageX + 10
      const top = e.pageY - 50
      self.propStyle = 'left:' + left + 'px;top:' + top + 'px;'
      self.rightCameraUserData = item
      self.rightClickProp = true
      if(item.nickName) {
        self.isUserList = true
        // // 用户->镜头 展示拓扑结构
        // self.topoType = 'user'
      } else {
        self.isUserList = false
        // // 镜头->用户 展示拓扑结构
        // self.topoType = 'camera'
      }
    },
    // 右击菜单 实时监控和抓拍图
    rightClickPlay() {
      const self = this
      for(let i = 0; i < self.playVideoData.length; i++) {
        if (self.playVideoData[i].isShowVideo === false) {
          self.playVideoData[i].isShowVideo = true
          self.playVideoData[i].data = self.rightCameraUserData // 添加镜头数据
          self.$nextTick(() => {
            if (self.$refs.realPlayVideoModal[i]) {
              self.$refs.realPlayVideoModal[i].initCurrentData()
            }
          })
          this.getMapVideoPush(self.playVideoData[i]);
          break
        } else if(i == 3 && self.playVideoData[i].isShowVideo === true) {
          self.$message.warning('可同时播放四个视频！！！')
        }
      }
      self.rightClickProp = false
    },
    // 右击菜单 历史视频和抓拍图
    rightClickHis() {
      const self = this
      self.viedoTitle = '历史视频'
      self.isPlayVideo = true
      self.videoData = self.rightCameraUserData
      self.videoData.type = 'playback'
      self.$nextTick(() => {
        if (self.$refs.playVideoModal) {
          self.$refs.playVideoModal.initCurrentData()
        }
      })
    },
    // 右击菜单 展示/关闭 拓补图
    rightClickTopology() {
      const self = this
      self.isShowProtectNews = false // 关闭主题数据详情
      if(self.shrinkState == false) {
        self.certerShowType = 'topology'
        if(self.rightCameraUserData.nickName) {
          // 用户->镜头 展示拓扑结构
          self.topoType = 'user'
          self.activeUserData = self.rightCameraUserData
          // 赋值用户当前选中
          self.$nextTick(() => {
            $('#userTreeBox').find('.camera-list-item.active').removeClass('active')
            $('#userTreeBox').find(`[value*=${self.activeUserData.userId}]`).addClass('active')
          })
          // 获取镜头关联数据
          self.getCameraListByUserId(false, self.activeUserData)
        } else {
          // 镜头->用户 展示拓扑结构
          self.topoType = 'camera'
          self.activeCameraData = self.rightCameraUserData
          // 赋值镜头当前选中
          self.$nextTick(() => {
            $('#cameraListBox').find('.camera-list-item.active').removeClass('active')
            $('#cameraListBox').find(`[value*=${self.activeCameraData.cameraId}]`).addClass('active')
          })
          // 获取用户关联数据
          self.getUserListByCameraId(false, self.activeCameraData)
        }
      }
    },
    // 右击菜单 展示/关闭 设备信息
    rightClickCameraInfo() {
      const self = this
      self.isDeviceNews = true
      self.$nextTick(() => {
        if (self.$refs.deviceNewsModal) {
          self.$refs.deviceNewsModal.init(self.rightCameraUserData)
        }
      })
    },
    // 右击菜单 展示/关闭 实时断流
    rightClickOffline() {
      const self = this
      let data = self.rightCameraUserData
      self.$message.warning("开发中...")
    },

    // 实时调用镜头 单击事件
    cameraListClick(item, index) {
      const self = this
      // 添加选中数据
      self.activeCameraData = item
      // 赋值镜头当前选中
      self.$nextTick(() => {
        $('#cameraListBox').find('.camera-list-item.active').removeClass('active')
        $('#cameraListBox').find(`[value*=${self.activeCameraData.cameraId}]`).addClass('active')
      })
      // 获取用户关联用户
      self.getUserListByCameraId(false, item)
      // 获取用户关联数据实时数量
      self.getUserListByCameraId(true, item)

      // 摄像头位置定位
      let searchMapIframe = document.getElementById('cameraUserMap')
      let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
      let locationData = {
          type: "locationTo",
          data: {
            cameraId: item.cameraId,
            px: parseFloat(item.px),
            py: parseFloat(item.py)
          }
      }
      if (searchMapIframe && searchMapIframe.contentWindow) {
        searchMapIframe.contentWindow.postMessage(locationData, targetOrigin);
      }
    },
    // 实时调用镜头 关注/取消关注
    cameraFollowClick(index) {
      const self = this
      if (self.cameraOrgData[index].showValue) {
        self.followOrCancel(self.cameraOrgData[index], 0, 1)
      } else {
        self.followOrCancel(self.cameraOrgData[index], 0, 0)
      }
      self.$nextTick(() => {
        $('#cameraListBox').find('.camera-list-item.active').removeClass('active') // 取消当前选中
        $('#cameraListBox').find(`[value*=${self.activeCameraData.cameraId}]`).addClass('active') // 添加选中
      })
    },
    // 实时调用镜头 搜索事件
    cameraListSearch() {
      // 获取数据
      const self = this
      if (self.curCameraShowType == 'theme') {
        self.getCameraListByThemeIdOrOrgId(true, 1) // 获取主题一类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 2) // 获取主题二三类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 3) // 获取主题高点镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 4) // 获取主题人像镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 5) // 获取主题卡口镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 0) // 获取主题全部镜头列表数据
      } else {
        self.getCameraListByThemeIdOrOrgId(true)
      }
    },
    // 镜头列表 机构 滚动添加数据
    cameraHandleScroll() {
      const self = this
      let $box = $('#cameraTreeBox'), // 可视窗口
        $currentContainer = $('#cameraDataList'), // 内容
        viewHeight = $box.height(), //可视窗口高度
        contentHeight = $currentContainer.height(), //内容高度
        scrollHeight = $box.scrollTop(), // 已经滚动了的高度
        currentPage = self.cameraCurrentPage,
        cameraTotalPage = self.cameraTotalPage
      if(!self.cameraListSpinning && contentHeight - viewHeight - scrollHeight <= 0 && currentPage < cameraTotalPage) {
        self.cameraCurrentPage = currentPage + 1
        self.getCameraListByThemeIdOrOrgId(false)
      }
    },
    // 镜头列表 主题 滚动添加数据
    cameraHandleThemeScroll(val) { // val=key值
      const self = this
      let data = ''
      self.cameraCollapse.map(item => {
        if(item.key == val) {
          data = item
        }
      })
      let $box = $('.theme' + val), // 可视窗口
        $currentContainer = $('#cameraThemeList-' + val), // 内容
        viewHeight = $box.height(), //可视窗口高度
        contentHeight = $currentContainer.height(), //内容高度
        scrollHeight = $box.scrollTop(), // 已经滚动了的高度
        currentPage = data.currentPage,
        cameraTotalPage = data.totalPage
      if(!self.cameraListSpinning && contentHeight - viewHeight - scrollHeight - 1 <= 0 && currentPage < cameraTotalPage) {
        self.cameraCollapse.map(item => {
          if(item.key == val) {
            item.currentPage = currentPage + 1
          }
        })
        self.getCameraListByThemeIdOrOrgId(false, val)
      }
    },
    // 防护圈展示筛选
    cameraCheckboxChange(val) {
      const self = this
      // 地图主题图改变展示
      let data = [false, false, false, false]
      val.map(item => {
        if(item == 1) {
          data[0] = true
        } else if (item == 2) {
          data[1] = true
        } else if (item == 3) {
          data[2] = true
        } else if (item == 4) {
          data[3] = true
        }
      })
      let searchMapIframe = document.getElementById('cameraUserMap')
      let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
      let locationData = {
          type: "filterThemeCamera",
          expression: {
            cir1: data[0],
            cir2: data[1],
            cir3: data[2],
            cir4: data[3]
          }
      }
      if (searchMapIframe && searchMapIframe.contentWindow) {
        searchMapIframe.contentWindow.postMessage(locationData, targetOrigin);
      }
      
      if (self.curCameraShowType == 'theme') {
        self.getCameraListByThemeIdOrOrgId(true, 1) // 获取主题一类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 2) // 获取主题二三类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 3) // 获取主题高点镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 4) // 获取主题人像镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 5) // 获取主题卡口镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 0) // 获取主题全部镜头列表数据
        self.snapshotGraphTimer = new Date().getTime();
      } else {
        self.getCameraListByThemeIdOrOrgId(true)
      }
    },
    // 打开/关闭 关联镜头
    cameraRelateTitleClick() {
      const self = this
      if(self.isShowCameraRelateData) {
        self.isShowCameraRelateData = false
      } else {
        self.isShowCameraRelateData = true
      }
    },

    // 实时调用用户 单击事件
    userListClick(item, index) {
      const self = this
      // 添加选中数据
      self.activeUserData = item
      // 赋值用户当前选中
      self.$nextTick(() => {
        $('#userTreeBox').find('.camera-list-item.active').removeClass('active')
        $('#userTreeBox').find(`[value*=${self.activeUserData.userId}]`).addClass('active')
      })
      // 获取镜头关联数据
      self.getCameraListByUserId(false, item)
      // 获取镜头关联数据实时数量
      self.getCameraListByUserId(true, item)
    },
    // 实时调用用户 关注/取消关注
    userFollowClick(index) {
      const self = this
      if (self.userData[index].showValue) {
        self.followOrCancel(self.userData[index], 1, 1)
      } else {
        self.followOrCancel(self.userData[index], 1, 0)
      }
      self.$nextTick(() => {
        $('#userTreeBox').find('.camera-list-item.active').removeClass('active') // 取消当前选中
        $('#userTreeBox').find(`[value*=${self.activeUserData.userId}]`).addClass('active') // 添加选中
      })
    },
    // 实时调用用户 搜索事件
    userListSearch() {
      // 获取数据
      const self = this
      self.getUserListByGroupIdOrOrgId(true)
    },
    // 用户列表 滚动添加数据
    userHandleScroll() {
      const self = this
      let $box = $('#userTreeBox'), // 可视窗口
        $currentContainer = $('#userDataList'), // 内容
        viewHeight = $box.height(), //可视窗口高度
        contentHeight = $currentContainer.height(), //内容高度
        scrollHeight = $box.scrollTop(), // 已经滚动了的高度
        currentPage = self.userCurrentPage,
        userTotalPage = self.userTotalPage
      if(!self.userListSpinning && contentHeight - viewHeight - scrollHeight <= 0 && currentPage < userTotalPage) {
        self.userCurrentPage = currentPage + 1
        self.getUserListByGroupIdOrOrgId(false)
      }
    },

    // 关闭小窗口视频播放
    closeVideoBoxClick(val) {
      const self = this
      console.log(val,self.playVideoData);
      self.playVideoData.forEach((item, index) => {
        if(item.idName == val.idName) {
          self.stopMapVideoPush(item);
        }
      })
    },
    // 放大/缩小 小窗口视频播放
    enlargeVideoBoxClick(val) {
      if($('.' + val.idName).css('position') == 'relative') {
        $('.' + val.idName).css({
          'position': 'fixed',
          'top': '7%',
          'left': '22%',
          'right': '20%',
          'bottom': '23%',
          'width': 'auto',
          'height': 'auto',
          'z-index': '11'
        })
      } else {
        $('.' + val.idName).css({
          'position': 'relative',
          'top': 'unset',
          'left': 'unset',
          'right': 'unset',
          'bottom': 'unset',
          'width': '100%',
          'height': '13rem',
          'z-index': '10'
        })
      }
    },
    // 同步主题镜头
    syncThemeCamera() {
      const self = this
      if (self.curCameraShowType == 'theme') {
        self.syncThemeData()
      }
    },
    /**
     * 显示大图弹窗
     * @param {String} type 当前大图弹窗类型  1：车辆 2：人像
     * @param {Object} data 大图弹窗数据
     */
    showBigMask(data){
      //人像
      this.bigImg = data.imageUrl;
      this.bigName = data.cameraName;
      this.bigTime = data.captureTime;
      this.isShowBigMask = true;
    },

    // 关闭历史视频播放弹框事件
    handlePlayVideoCancel() {
      const self = this
      self.isPlayVideo = false
      self.$nextTick(() => {
        if (self.$refs.playVideoModal) {
          self.$refs.playVideoModal.stopMapVideoPlay(false)
        }
      })
    },
    // 关闭设备信息弹框
    handleDeviceNewsCancel() {
      const self = this
      self.isDeviceNews = false
    },
    // 关闭抓拍图大图弹窗
    handleBigMask() {
      this.isShowBigMask = false;
      this.bigImg = '';
      this.bigName = '';
      this.bigTime = '';
    },

    // 监听地图数据
    listeningMap() {
      // 监听ifram发来的信息
      const self = this
      window.addEventListener("message", self.listeningFun
      // event => {
      //   const data = event.data;
      //   self.cameraMapData = data;
      //   if (data.type == 'initMap') { // 地图初始化
      //     if(self.curCameraShowType == 'theme') {
      //       // 初始化地图数据 默认防护圈定位
      //       let searchMapIframe = document.getElementById('cameraUserMap')
      //       let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
      //       let locationData = {
      //           type: "showKeyArea",
      //           data: {
      //             id: self.curCameraTypeData.id
      //           }
      //       }
      //       setTimeout(() => {
      //         searchMapIframe.contentWindow.postMessage(locationData, targetOrigin)
      //       }, 1000)
      //     }
      //   } else if (data.type == 'exitThemeEdit') { // 搜索框位置
      //     self.shrinkState = false
      //     $('.cameraUserPage .wrap-sidebar-left').css('flex', "1 1 0%")
      //     $('.cameraUserPage .wrap-sidebar-right').css('flex', "1 1 0%")
      //     // $('.cameraUserPage .wrap-card-auto').css('height', 'auto')
      //   } else if (data.type == 'detailContent') { // 镜头详情
      //     self.isDeviceNews = true
      //     self.$nextTick(() => {
      //       if (self.$refs.deviceNewsModal) {
      //         self.$refs.deviceNewsModal.init(data.atrs)
      //       }
      //     })
      //   } else if (data.type == 'topology') { // 拓扑结构
      //     self.isShowProtectNews = false // 关闭主题数据详情
      //     // if(self.shrinkState == false) {
      //       $('.cameraUserPage .wrap-card-auto').css('height', 'auto')
      //       self.certerShowType = 'topology'
      //       // 镜头->用户 展示拓扑结构
      //       self.topoType = 'camera'

      //       self.activeCameraData = data.atrs
      //       // 赋值镜头当前选中
      //       self.$nextTick(() => {
      //         $('#cameraListBox').find('.camera-list-item.active').removeClass('active')
      //         $('#cameraListBox').find(`[value*=${self.activeCameraData.GUID}]`).addClass('active')
      //       })
      //       // 获取用户关联数据
      //       self.getUserListByCameraId(false, self.activeCameraData)
      //     // }
      //   }
      // }
      );
    },
    listeningFun(event) {
      const self = this
      const data = event.data;
      self.cameraMapData = data;
      if (data.type == 'initMap') { // 地图初始化
        if(self.curCameraShowType == 'theme') {
          // 初始化地图数据 默认防护圈定位
          let searchMapIframe = document.getElementById('cameraUserMap')
          let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
          let locationData = {
              type: "showKeyArea",
              data: {
                id: self.curCameraTypeData.id
              }
          }
          setTimeout(() => {
            if (searchMapIframe && searchMapIframe.contentWindow) {
              searchMapIframe.contentWindow.postMessage(locationData, targetOrigin)
            }
          }, 1000)
        }
      } else if (data.type == 'exitThemeEdit') { // 搜索框位置
        self.shrinkState = false
        $('.cameraUserPage .wrap-sidebar-left').css('flex', "1 1 0%")
        $('.cameraUserPage .wrap-sidebar-right').css('flex', "1 1 0%")
        // $('.cameraUserPage .wrap-card-auto').css('height', 'auto')
      } else if (data.type == 'detailContent') { // 镜头详情
        self.isDeviceNews = true
        self.$nextTick(() => {
          if (self.$refs.deviceNewsModal) {
            self.$refs.deviceNewsModal.init(data.atrs)
          }
        })
      } else if (data.type == 'topology') { // 拓扑结构
        self.isShowProtectNews = false // 关闭主题数据详情
        // if(self.shrinkState == false) {
          $('.cameraUserPage .wrap-card-auto').css('height', 'auto')
          self.certerShowType = 'topology'
          // 镜头->用户 展示拓扑结构
          self.topoType = 'camera'

          self.activeCameraData = data.atrs
          // 赋值镜头当前选中
          self.$nextTick(() => {
            $('#cameraListBox').find('.camera-list-item.active').removeClass('active')
            $('#cameraListBox').find(`[value*=${self.activeCameraData.GUID}]`).addClass('active')
          })
          // 获取用户关联数据
          self.getUserListByCameraId(false, self.activeCameraData)
        // }
      }
    },

    /****** 数据获取 *****/
    // 左-获取镜头主题列表/获取防护圈详情数据
    async getOnlineCameraStatistics() {
      const self = this
      self.protectNewsSpinning = true
      const data = await this.$axios('/api/userShotLinkage/getCircleListById', {
        id: self.curCameraShowType == "theme" ? self.curCameraTypeData.id : self.curCameraTypeData.orgId,
        type: self.curCameraShowType == "theme" ? (self.cameraEnsureType == 'theme' ? 0 : 2) : 1,
      })
      self.protectNewsSpinning = false
      if (data.length > 0) {
        if (self.curCameraShowType == "theme") {
          self.protectNewsDataArr = data[0]
          self.protectNewsData = []
          for(var i = 1; i <= 4; i++) {
            if(data[i]) {
              if(data[i].level == 1) {
                data[i].levelVal = '核心防护圈'
              } else if(data[i].level == 2) {
                data[i].levelVal = '一级防护圈'
              } else if(data[i].level == 3) {
                data[i].levelVal = '二级防护圈'
              } else if(data[i].level == 4) {
                data[i].levelVal = '三级防护圈'
              }
              data[i].onlineRate1 = data[i].type1Count ? ((data[i].type1OnlineCount/data[i].type1Count)*100).toFixed(2) + '%' : '100.00%'
              data[i].onlineRate23 = data[i].type23Count ? ((data[i].type23OnlineCount/data[i].type23Count)*100).toFixed(2) + '%' : '100.00%'
              data[i].index = i
              self.protectNewsData.push(data[i])
            }
          }
        } else {
          self.protectNewsDataArr = data[0]
          self.protectNewsData = []
          for(var i = 1; i <= 3; i++) {
            if(data[i]) {
              if(data[i].level == 1) {
                data[i].levelVal = '一分钟防护圈'
              } else if(data[i].level == 2) {
                data[i].levelVal = '三分钟防护圈'
              } else if(data[i].level == 3) {
                data[i].levelVal = '五分钟防护圈'
              }
              data[i].onlineRate1 = data[i].type1Count ? ((data[i].type1OnlineCount/data[i].type1Count)*100).toFixed(2) + '%' : '100.00%'
              data[i].onlineRate23 = data[i].type23Count ? ((data[i].type23OnlineCount/data[i].type23Count)*100).toFixed(2) + '%' : '100.00%'
              data[i].index = i
              self.protectNewsData.push(data[i])
            }
          }
        }
      } else {
        self.protectNewsDataArr = {
          totalCount: 0,
          type1Count: 0,
          faceCount: 0,
          type23Count: 0,
          highPointCount: 0,
        }
        self.protectNewsData = ''
      }
    },
    // 左-获取镜头主题列表
    async getCameraThemeList(isSearch) {
      const self = this
      const data = await this.$axios('/api/userShotLinkage/getPlanListByName', {
        name: self.curCameraTypeData.name,
        pageNum: 1,
        pageSize: 100
      })
      let dataList = data.list
      self.cameraThemeArr = dataList // 数据保存
      self.cameraThemeArr.map(item => {
        item.key = item.id
        item.name = item.name
        item.value = item.name
        item.isLeaf = true
        item.scopedSlots = {
          title: 'title',
        }
      })
      if(isSearch) {
        self.cameraTableData = self.cameraThemeArr
      } else {
        self.cameraTableData = self.cameraThemeArr // 下拉赋值
        // 左-赋值默认主题列表相关数据
        self.curCameraTypeData = self.cameraTableData[0]
        self.$store.commit('changeSelectedCameraTypeData', self.curCameraTypeData) // 保存数据
        self.getCameraListByThemeIdOrOrgId(true, 1) // 获取主题一类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 2) // 获取主题二三类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 3) // 获取主题高点镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 4) // 获取主题人像镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 5) // 获取主题卡口镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 0) // 获取主题全部镜头列表数据
        self.protectNewsTitle = self.curCameraTypeData.name + (self.cameraEnsureType == 'theme' ? '防护圈(主题镜头)' : '防护圈(保障镜头)')
        self.getOnlineCameraStatistics() // 获取防护圈数据
        // // 默认防护圈定位
        // let searchMapIframe = document.getElementById('cameraUserMap')
        // let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
        // let locationData = {
        //     type: "showKeyArea",
        //     data: {
        //       id: self.curCameraTypeData.id
        //     }
        // }
        // setTimeout(() => {
        //   searchMapIframe.contentWindow.postMessage(locationData, targetOrigin);
        // }, 2000);
      }
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
        param.orgId = val.orgId
      }
      const data = await this.$axios(url, param)
      let dataList = data.list || []
      if(val) {
        dataList.map(item => {
          item.key = 'camera-' + item.orgId
          item.name = item.orgName
          item.value = item.orgName
          item.isLeaf = true
          item.scopedSlots = {
            title: 'title',
          }
        })
        self.cameraOrgArr[0].children.map(item => {
          if(item.orgId == val.orgId) {
            item.children = dataList
          }
        })
      } else {
        // 机构排序
        let orgList = []
        dataList.map(item => {
          item.key = 'camera-' + item.orgId
          item.name = item.orgName
          item.value = item.orgName
          item.isLeaf = false
          item.scopedSlots = {
            title: 'title',
          }
        })
        for (let i = 0; i < dataList.length; i++) {
          dataList[i].children = []
          for (let j = 0; j < dataList.length; j++) {
            if (dataList[i].orgId == dataList[j].pId) {
              dataList[i].children.push(dataList[j])
            }
            if (dataList[i].pId == null) {
              orgList = []
              orgList.push(dataList[i])
            }
          }
        }
        self.cameraOrgArr = orgList // 数据保存

        // 下拉赋值
        // self.cameraTableData = self.cameraOrgArr
        // // 左-赋值默认主题列表相关数据
        // self.curCameraTypeData = self.cameraTableData[0]
        // self.getCameraListByThemeIdOrOrgId(true) // 左-获取默认镜头列表
        // self.protectNewsTitle = self.cameraTableData[0].orgName + '一三五防护圈'
        // self.getOnlineCameraStatistics() // 获取防护圈数据
        // // 默认防护圈定位
        // let searchMapIframe = document.getElementById('cameraUserMap')
        // let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
        // let locationData = {
        //     type: "changeArea",
        //     data: {
        //       // PCcode: '4403'
        //       PCcode: self.cameraTableData[0].orgCode
        //     }
        // }
        // searchMapIframe.contentWindow.postMessage(locationData, targetOrigin);
      }
    },
    /**
     * 左-根据主题id/机构id获取镜头列表
     * @param {boolean} isFirst 是否首次加载
     * @param {boolean} cameraType 镜头种类: 0-全部 1-一类点 2-二三类点 3-高点镜头 4-人脸镜头 5-卡口镜头
     */
    async getCameraListByThemeIdOrOrgId(isFirst, cameraType) {
      const self = this
      self.cameraListSpinning = true
      let currentPage = ''
      if(isFirst) {
        currentPage = 1
      } else {
        if (cameraType != null) {
          self.cameraCollapse.map(item => {
            if(item.key == cameraType) {
              currentPage = item.currentPage
            }
          })
        } else {
          currentPage = self.cameraCurrentPage
        }
      }
      let params = {
        id: self.curCameraShowType == "theme" ? self.curCameraTypeData.id : self.curCameraTypeData.orgId,
        type: self.curCameraShowType == "theme" ? (self.cameraEnsureType == 'theme' ? 0 : 2) : 1,
        content: self.cameraListSearchVal,
        circleType: self.cameraProtectLevel,
        cameraType: cameraType,
        onlineCallFlag: self.callType == "all" ? 0 : 1, // 0:全量 1:实时
        pageNum: currentPage,
        pageSize: '50'
      }
      const data = await this.$postAxios('/api/userShotLinkage/getCameraInfoBySearch', params)
      self.cameraListSpinning = false
      let dataArr = []
      if(data.list.length > 0 && !isFirst) {
        if(self.curCameraShowType == "theme") {
          dataArr = self.cameraThemeData['theme' + cameraType].concat(data.list)
        } else {
          dataArr = self.cameraOrgData.concat(data.list)
        }
      } else {
        dataArr = data.list
        if(self.curCameraShowType == "theme") {
          self.cameraCollapse.map(item => {
            if (item.key == cameraType) {
              item.total = data.total
              item.online = data.online
              item.totalPage = data.pages
            }
          })
        } else {
          self.cameraTotalPage = data.pages
        }
      }
      // 关注数据排序
      dataArr.map((item, index) => {
        item.orgNameShort = item.orgName.replace(/分局/g, '').replace(/派出所/g, '所').replace(/交通警察支队/g, '交警').replace(/治安巡警支队/g, '治安')
        if (item.showValue === 1) {
          item.selected = true
          let arrayBox = item
          dataArr.splice(index, 1)
          dataArr.splice(0, 0, arrayBox)
        }
      })
      self.cameraOrgData = []
      if(self.curCameraShowType == "theme") {
        self.$set(self.cameraThemeData, 'theme' + cameraType, dataArr)
      } else {
        self.cameraOrgData = dataArr
      }
    },
    /**
     * 左-根据镜头id获取实时调用的用户
     * @param {boolean} isGetNub 获取当前镜头调用用户数
     * @param {Object} val 镜头数据
     */
    async getUserListByCameraId(isGetNub, val) {
      const self = this
      const data = await this.$axios('/api/userShotLinkage/getOnlineCallUserListByCameraId', {
        cameraId: val.cameraId || val.GUID,
        id: isGetNub ? '10' : (self.curUserShowType == "theme" ? self.curUserTypeData.id : self.curUserTypeData.orgId),
        type: isGetNub ? 1 : (self.curUserShowType == "theme" ? 0 : 1), // 0：主题 1：机构
        pageNum: '1',
        pageSize: '100'
      })
      let dataArr = data.list
      if(isGetNub) {
        // 改变镜头被调用数量
        if (self.isCloseCameraRelateData && self.isShowCameraRelateData) { // 关联镜头数据
          self.cameraRelateData.map((item) => {
            item.selected = false
            if(item.cameraId == val.cameraId) {
              item.count = dataArr.length
            }
          })
        } else {
          if(self.curCameraShowType == "theme") { // 主题数据
            for (let i = 0; i < 6; i++) {
              self.cameraThemeData['theme' + i].map(item => {
                item.selected = false
                if(item.cameraId == val.cameraId) {
                  item.count = dataArr.length
                }
              })
            }
          } else { // 机构数据
            self.cameraOrgData.map((item) => {
              item.selected = false
              if(item.cameraId == val.cameraId) {
                item.count = dataArr.length
              }
            })
          }
        }
      } else {
        dataArr.map((item, index) => {
          item.timeDate = item.callTime ? item.callTime.substring(5, 20) : item.callTime
          item.orgNameShort = item.orgName.replace(/分局/g, '').replace(/派出所/g, '所').replace(/交通警察支队/g, '交警').replace(/治安巡警支队/g, '治安')
        })

        self.isCloseUserRelateData = true
        self.isShowUserRelateData = true
        self.userRelateData = dataArr
        self.userRelateDataLength = dataArr.length.toString()

        // 清空用户当前选中
        // self.activeUserData = ""
        // self.$nextTick(() => {
        //   $('#userTreeBox').find('.camera-list-item.active').removeClass('active') // 取消当前选中
        // })
        $('#userTreeBox').scrollTop(0) // 用户列表滚动到顶部

        // 拓扑结构为打开状态
        if(self.certerShowType == 'topology') {
          self.getNetworkTrafficNew() // 获取拓扑结构的流数据
        }
      }
    },

    // 右-获取用户组列表
    async getUserGroupList() {
      const self = this
      const data = await this.$axios('/api/userShotLinkage/getUserGroupList', {
        pageNum: 1,
        pageSize: 100
      })
      let dataList = data.list
      dataList.map(item => {
        item.key = item.groupId
        item.name = item.groupName
        item.value = item.groupName
        item.isLeaf = true
        item.scopedSlots = {
          title: 'title',
        }
      })
      self.userGroupArr = dataList // 数据保存
    },
    // 右-获取用户机构列表
    async getUserOrgList(val) {
      const self = this
      let url = '/api/userShotLinkage/getUserShotInfoNew'
      let param = {
        orgId: '10',
        pageNum: 1,
        pageSize: 100
      }
      if(val) {
        param.orgId = val.orgId
      }
      const data = await this.$axios(url, param)
      self.curUserShowType = 'organ'
      let dataList = data.list || []
      if(val) {
        dataList.map(item => {
          item.key = 'user-' + item.orgId
          item.name = item.orgName
          item.value = item.orgName
          item.isLeaf = true
          item.scopedSlots = {
            title: 'title',
          }
        })
        self.userOrgArr[0].children.map(item => {
          if(item.orgId == val.orgId) {
            item.children = dataList
          }
        })
      } else {
        // 机构排序
        let orgList = []
        dataList.map(item => {
          item.key = 'user-' + item.orgId
          item.name = item.orgName
          item.value = item.orgName
          item.isLeaf = false
          item.scopedSlots = {
            title: 'title',
          }
        })
        for (let i = 0; i < dataList.length; i++) {
          dataList[i].children = []
          for (let j = 0; j < dataList.length; j++) {
            if (dataList[i].orgId == dataList[j].pId) {
              dataList[i].children.push(dataList[j])
            }
            if (dataList[i].pId == null) {
              orgList = []
              orgList.push(dataList[i])
            }
          }
        }
        self.userOrgArr = orgList

        // 下拉赋值
        self.userTableData = self.userOrgArr
        // 右-获取默认用户列表
        self.curUserTypeData = self.userTableData[0]
        self.getUserListByGroupIdOrOrgId(true)
      }
    },
    /**
     * 右-根据用户组id/机构id获取用户列表
     * @param {boolean} isFirst 是否页面首次进入加载
     */
    async getUserListByGroupIdOrOrgId(isFirst) {
      const self = this
      self.userListSpinning = true
      if(isFirst) {
        self.userCurrentPage = 1
      }
      let params = {
        id: self.curUserShowType == "theme" ? self.curUserTypeData.groupId : self.curUserTypeData.orgId,
        type: self.curUserShowType == "theme" ? 0 : 1,
        content: self.userListSearchVal,
        pageNum: self.userCurrentPage,
        pageSize: '50'
      }
      const data = await this.$axios('/api/userShotLinkage/getUserInfoBySearch', params)
      self.userListSpinning = false
      self.userTotalPage = data.pages
      let dataArr = []
      if(data.list.length > 0 && !isFirst) {
        dataArr = self.originUserData.concat(data.list)
      } else {
        dataArr = data.list
      }
      // 关注数据排序
      dataArr.map((item, index) => {
        item.timeDate = item.callTime ? item.callTime.substring(5, 20) : item.callTime
        item.orgNameShort = item.orgName.replace(/分局/g, '').replace(/派出所/g, '所').replace(/交通警察支队/g, '交警').replace(/治安巡警支队/g, '治安')
        if (item.showValue === 1) {
          item.selected = true
          let arrayBox = item
          dataArr.splice(index, 1)
          dataArr.splice(0, 0, arrayBox)
        }
      })

      self.originUserData = dataArr
      self.userData = dataArr
    },
    /**
     * 右-根据用户id获取实时调用的镜头
     * @param {boolean} isGetNub 获取当前镜头调用用户数
     */
    async getCameraListByUserId(isGetNub, val) {
      const self = this
      const data = await this.$axios('/api/userShotLinkage/getOnlineCallCameraListByUserId', {
        userId: val.userId,
        id: isGetNub ? '10' : (self.curCameraShowType == "theme" ? self.curCameraTypeData.id : self.curCameraTypeData.orgId),
        type: isGetNub ? 1 : (self.curCameraShowType == "theme" ? 0 : 1),
        pageNum: '1',
        pageSize: '50'
      })
      let dataArr = data.list
      if(isGetNub) {
        // 改变当前用户调用镜头数量
        if (self.isCloseUserRelateData && self.isShowUserRelateData) { // 关联镜头数据
          self.userRelateData.map((item) => {
            item.selected = false
            if(item.userId == val.userId) {
              item.count = dataArr.length
            }
          })
        } else {
          self.userData.map((item) => {
            item.selected = false
            if(item.userId == val.userId) {
              item.count = dataArr.length
            }
          })
        }
      } else {
        dataArr.map(item => {
          item.orgNameShort = item.orgName.replace(/分局/g, '').replace(/派出所/g, '所').replace(/交通警察支队/g, '交警').replace(/治安巡警支队/g, '治安')
        })

        self.isCloseCameraRelateData = true
        self.isShowCameraRelateData = true
        self.cameraRelateData = dataArr
        self.cameraRelateDataLength = dataArr.length.toString()

        // 拓扑结构用户关联数据重构
        self.cameraRelateDataList = self.cameraRelateData

        // 清空镜头当前选中
        // self.activeCameraData = ""
        // self.$nextTick(() => {
        //   $('#cameraListBox').find('.camera-list-item.active').removeClass('active') // 取消当前选中
        // })

        $('#cameraTreeBox').scrollTop(0) // 镜头列表滚动到顶部

        // 拓扑结构为打开状态
        if(self.certerShowType == 'topology') {
          self.getNetworkTrafficNew() // 获取拓扑结构的流数据
        }
      }
    },

    // 左/右-关注或取消关注
    async followOrCancel(val, type, state) {
      const self = this
      const data = await this.$axios('/api/userShotLinkage/showShotAndUser', {
        id: val.cameraId || val.userId,
        object: type,
        action: state
      })
      if(data == 'success') {
        if (type === 1) {
          self.getUserListByGroupIdOrOrgId(true)
        } else if (type === 0) {
          self.getCameraListByThemeIdOrOrgId(true)
        }
      }
    },
    // 同步主题
    async syncThemeData(val) {
      const self = this
      const data = await this.$axios('/api/homePage/syncPlanCameraInfo')
      if(data == 'success' && self.curCameraShowType == 'theme') {
        self.getCameraListByThemeIdOrOrgId(true, 1) // 获取主题一类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 2) // 获取主题二三类镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 3) // 获取主题高点镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 4) // 获取主题人像镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 5) // 获取主题卡口镜头列表数据
        self.getCameraListByThemeIdOrOrgId(true, 0) // 获取主题全部镜头列表数据
      }
    },
    // 根据调用的镜头和用户获取流量信息
    async getNetworkTrafficNew() {
      const self = this
      let param = []
      let val = ""
      if(self.topoType == 'camera') {
        param = [self.activeCameraData.cameraId || self.activeCameraData.GUID]
      } else {
        self.cameraRelateData.map(item => {
          param.push(item.cameraId)
        })
      }
      if(param.length != 0) {
        const data = await this.$postAxios('/api/userShotLinkage/postNetworkTrafficById', param)
        if(self.topoType == 'camera') {
          self.cameraTrafficData = data[0]
        } else {
          let userData = data
          self.cameraRelateDataList.map((item, index) => {
            userData.map(val => {
              if(item.id == val.id) {
                item.isPing = false
                item.cameraPing = 0, // 镜头ping
                item.pscPing = 0, // 派出所ping
                item.fjPing = 0, // 分局ping
                item.vcnPing = 0, // VCNping

                item.ip = val.ip ? val.ip : ''
                item.fjId = val.fjId ? val.fjId : ''
                item.fjName = val.fjName ? val.fjName : ''
                item.fjSwitchCount = val.fjSwitchCount
                item.fjSwitchInfo = val.fjSwitchInfo
                item.pcsId = val.pcsId
                item.pcsName = val.pcsName
                item.pcsSwitchCount = val.pcsSwitchCount
                item.pscSwitchInfo = val.pscSwitchInfo
                item.vcnCount = val.vcnCount
                item.vcnInfo = val.vcnInfo
              }
            })
          })
          self.userTrafficData = self.cameraRelateDataList
        }
        // 拓扑图ping数据/服务列表数据重新请求
        self.$nextTick(() => {
          if (self.$refs.topologyGraphModule) {
            self.$refs.topologyGraphModule.init()
          }
        })
      } else {
        self.userTrafficData = '' // 清空之前的拓扑结构
        self.$message.warning(self.curCameraTypeData.name + "区域暂无关联镜头")
      }
    },

    // 抓拍图请求
    async getMapVideoPush(val) {
      //判断是否在抓拍图中订阅过
      console.log(this.$store.state.cameraGroupIds.cameraId);
      if(!this.$store.state.cameraGroupIds.cameraId.includes(val.data.cameraId)){
        let wsSend ={
          code: 10086,
          requestType: 1,
          requestName: "facemsg",
          requestId: window.sessionStorage.getItem('loginSessionid'),
          param: {
            code: [val.data.cameraId|| val.data.GUID]
          }
        };
        this.$socket.sendCar(wsSend);
      }
      let obj = {
        type:'add',
        cameraId:val.data.cameraId || val.data.GUID,
        snapImgArr:[]
      }
      this.$store.commit("changeAddSnapImgData",obj);
    },
    // 停止抓拍图
    async stopMapVideoPush(val){
      let cameraId = val.data.cameraId,
        wsSend = {
          code: 10086,
          requestType: 2,
          requestName: "facemsg",
          requestId: window.sessionStorage.getItem('loginSessionid'),
          param: {
            code: [cameraId]
          }
        };
      this.playVideoData.forEach((element,index) => {
        if(element.data.cameraId == cameraId){
          element.isShowVideo = false
          element.data = []
          $('#' + element.idName + '-box').find('.realPlayVideo').empty()
          this.$nextTick(() => {
            if (this.$refs.realPlayVideoModal[index]) {
                this.$refs.realPlayVideoModal[index].stopRealVideoPlay(element)
            }
          })
        }
      });
      if(!this.$store.state.cameraGroupIds.cameraId.includes(cameraId)){
        this.$socket.sendCar(wsSend);
      }

      //清掉vuex中的数据
      this.$store.state.snapImgData.forEach(item=>{
        if(item.cameraId == cameraId){
          let obj = {
            type:'delete',
            cameraId: item.cameraId
          }
          this.$store.commit("changeAddSnapImgData",obj);
        }
      })
    },

    // 停止抓拍图
    // async stopMapVideoPush(val){
    //   let flagStop = false,
    //       flag = false,
    //       cameraId = val.data.cameraId;
    //   //判断在不在镜头组抓拍图中
    //   this.$store.state.cameraGroupIds.cameraId.forEach(item=>{
    //     if(item == cameraId){
    //         flagStop = true;
    //     }
    //   })
    //   this.playVideoData.forEach((element,index) => {
    //     if(element.data.cameraId == cameraId){
    //       element.isShowVideo = false
    //       element.data = []
    //       $('#' + element.idName + '-box').find('.realPlayVideo').empty()
    //       this.$nextTick(() => {
    //         if (this.$refs.realPlayVideoModal[index]) {
    //         this.$refs.realPlayVideoModal[index].stopRealVideoPlay(element)
    //         }
    //       })
    //     }
    //     if(element.isShowVideo){
    //       flag = true;
    //     }
    //   });

    //   if(!flagStop){
    //         const data = await this.$postAxios('http://190.13.37.2:8077/facePlatform/v2/index/unSubscribeCamera',{
    //         cameraIds:[cameraId],
    //         token:window.sessionStorage.getItem('token')
    //         },{
    //         headers: {
    //             token: window.sessionStorage.getItem('token'),
    //             platAccount: "facePlatform"
    //         },
    //         })
    //     if(data== 'success'){
    //       //清掉vuex中的数据
    //       this.$store.state.snapImgData.forEach(item=>{
    //         if(item.cameraId == cameraId){
    //           let obj = {
    //             type:'delete',
    //             cameraId: item.cameraId
    //           }
    //           this.$store.commit("changeAddSnapImgData",obj);
    //         }
    //       })
    //       if(!flag){
    //         //清掉定时器
    //         clearInterval(this.realTimeHeart);
    //       }
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.cameraUserPage {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem .5rem 1rem;
  box-sizing: border-box;
  overflow: hidden;
  .wrap-card {
    .list-title {
      width: 100%;
      overflow: hidden;
      .camera-list-name {
        float: left;
        .list-title-name {
          cursor: pointer;
          padding: 0 0 0 1rem;
          color: inherit;
        }
        .active {
          color: $theme-yellow;
        }
        span {
          &:nth-of-type(2){
            padding-left: 1rem;
          }
        }
      }
      .css-tag {
        padding-right: 1rem;
        img {
          margin-left: 1rem;
        }
        .anticon {
          margin: .5rem;
          font-size: 1.25rem;
        }
      }
    }
    .search-box {
      padding: 0 1rem;
      margin-bottom: .5rem;
    }
    .tag-box-check {
      margin: 0 1rem .5rem 1rem;
      padding: .2rem 0 .2rem .5rem;
      background: $theme-button;
      color: $theme-white;
      span {
        color: $theme-white;
      }
    }
    .list-box {
      padding: 0 1rem;
      height: calc(100% - 8.5rem);
      overflow: auto;
      &.h100 {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      .camera-box {
        height: 100%;
        overflow: auto;
      }
      .camera-list {
        padding: 0 .5rem;
        .camera-list-item {
          position: relative;
          cursor: pointer;
          width: 100%;
          line-height: 2rem;
          box-sizing: border-box;
          overflow: auto;
          text-align: center;
          .follow {
            display: none;
          }
          &.followed {
            .follow {
              position: absolute;
              top: 0;
              right: 0;
              display: block;
              width: 15%;
            }
            .item.item-15 {
              visibility: hidden;
            }
          }
          &.selected {
            color: #0EB4CE;
            // background: #137774;
          }
          &.active {
            // border-left: 3px solid #1890ff;
            // background-image: linear-gradient(to right,rgba(59,158,243,.5) 0,rgba(59,158,243,0) 100%);
            background: $theme-button;
          }
          &:hover {
            background: rgba($theme-button, 0.6);
            .follow {
              display: block;
              background: rgba($theme-button, 0.6);
              position: absolute;
              top: 0;
              right: 0;
              width: 15%;
            }
          }
          &-new {
            width: 100%;
            span {
              display: block;
              font-size: 12px;
              float: left;
            }
            .bell {
              width: 10%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .content {
              width: 75%;
              span {
                width: 100%;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .item {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              @for $i from 0 through 100 {
                &-#{$i} {
                  @extend .over-ellipsis;
                  width: 1% * $i;
                }
              }
              &-10 {
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
  // 小窗口视频播放
  .wrap-sidebar-video {
    position: absolute !important;
    top: 0;
    left: 75%;
    right: 0;
    bottom: auto;
    background: none !important;
    .camera-video-box {
      position: relative;
      width: 100%;
      height: 13rem;
      margin-bottom: .5rem;
      background: $theme-color;
      box-sizing: border-box;
      &:hover {
        .wrap-title {
          visibility: initial;
        }
      }
      .wrap-title {
        position: absolute;
        top: 0;
        visibility: hidden;
        width: 100%;
        height: 2.5rem;
        padding-left: 1rem;
        font-size: $font-size-medium;
        line-height: 2.5rem;
        background: rgba(0, 0, 0, 0.6);
        z-index: 10;
        @extend .over-ellipsis;
        p {
          float: left;
          width: 60%;
        }
        .anticon {
          float: right;
          font-size: $font-size-large;
          font-weight: 600;
          line-height: 2.5rem;
          padding: 0 .5rem;
        }
      }
      .wrap-video {
        position: relative;
        width: 100%;
        height: 100%;
        background: $theme-select;
        .wrap-video-img {
          position: absolute;
          top: 0;
          right: 0;
          width: 15%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1;
          padding: 0 .5rem;
          img {
            width: 100%;
            height: 25%;
            padding-top: .5rem;
            &:last-child {
              padding-bottom: .5rem;
            }
          }
        }
      }
    }
  }
  // 抓拍图窗口
  .wrap-sidebar-face {
    position: absolute !important;
    height: 20%;
    left: 0;
    right: 0;
    max-width: 100%;
    bottom: 1.5rem;
    background: none !important;
  }
  // 按钮组
  .icon-but-group {
    .img-but {
      width: 2rem;
      height: 2rem;
      border: 1px solid #4c5077;
      text-align: center;
      .anticon {
        font-size: $font-size-x-large;
        line-height: 2rem;
      }
      img {
        width: 100%;
        height: 100%;
      }
      &.active {
        color: $theme-white;
        background: $theme-button;
      }
      &:hover {
        color: $theme-white;
        background: $theme-button;
      }
    }
  }
  // 下拉框样式
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
    border: 1px solid rgb(43, 55, 88);
    max-height: 30rem;
    overflow: auto;
    &.camera {
      left: 2rem;
    }
    &.user {
      right: 0;
    }
    .search-box {
      margin-bottom: .5rem;
    }
  }
  // 悬浮框样式
  .protect-news {
    position: absolute;
    top: 0;
    left: 22%;
    width: 36rem;
    height: 20rem;
    margin: 1.5rem 0;
    border-radius: .3rem;
    background: $theme-select;
    font-size: $font-size-small;
    line-height: 2rem;
    z-index: 6;
    overflow: hidden;
    .protect-news-title {
      width: 100%;
      height: 2.5rem;
      line-height: 2.5rem;
      background: $theme-color;
      font-size: $font-size-large;
      padding: 0 1rem;
      .anticon {
        float: right;
        height: 2.5rem;
        line-height: 2.5rem;
      }
    }
    .protect-news-content {
      width: 100%;
      padding: 1rem;
      box-sizing: border-box;
      .protect-news-index {
        width: 100%;
        .protect-news-tag {
          float: left;
          width: 50%;
          text-align: left;
        }
        .protect-news-val {
          float: left;
          width: 50%;
          font-weight: 600;
          color: #00DEDE;
        }
      }
    }
  }
  // 右键菜单样式
  .css-rightClickProp{
    position: absolute;
    z-index: 10;
    line-height: 30px;
    font-size: 12px;
    background: $theme-select;
    border-radius: 4px;
    overflow: hidden;
    > li {
      padding: 0 10px;
      cursor: pointer;
      &:hover{
        background: $theme-bar;
      }
    }
  }
  // 关联数据样式
  .relate-title {
    width: calc(100% - 2rem);
    margin: 0 1rem .5rem 1rem;
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
      width: 40%;
    }
    .number {
      display: inline-block;
      padding-right: 1rem;
      box-sizing: border-box;
      width: 53%;
    }
    .anticon {
      padding-top: .5rem;
      color: rgba(0, 0, 0, 0.8);
      float: right;
    }
  }
  .relate-box {
    height: 100%;
    .camera-list {
      background: rgba(12, 92, 163, 0.5);
    }
  }
}
</style>
