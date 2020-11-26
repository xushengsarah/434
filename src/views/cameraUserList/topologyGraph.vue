<template>
  <div class="topologyGraph">
    <div class="topology-title">
      <span class="list-title-name">镜头拓扑图</span>
      <a-icon type="close" @click="closeTopologyGraph"></a-icon>
    </div>
    <div class="topology-list">
      <div class="topology-tag">
        <a-row>
          <a-col :span='8'>
            <div class="tag-box">
              <a-icon type="sync" style="color: #fefa21"></a-icon>检测中
            </div>
          </a-col>
          <a-col :span='8'>
            <div class="tag-box">
              <a-icon type="check-circle" style="color: #1ad4cd"></a-icon>成功
            </div>
          </a-col>
          <a-col :span='8'>
            <div class="tag-box">
              <a-icon type="close-circle" style="color: #fb223d"></a-icon>故障
            </div>
          </a-col>
          <a-col :span='12'>
            <div class="tag-box">
              <span class="tag-item-line1"></span>物理链路
            </div>
          </a-col>
          <a-col :span='12'>
            <div class="tag-box">
              <span class="tag-item-line2"></span>
              <span class="tag-item-icon">></span> 视频流走向
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="topology-list-camera" v-if="topoType=='camera'">
        <ul class="topo-line">
          <li class="topo-line-item">
            <div class="topo-line-item-content">
              <p class="topo-line-item-title">{{activeCameraData.cameraName || activeCameraData.NAME}}</p>
              <p class="topo-line-item-title">{{cameraTrafficData.ip}}</p>
              <div class="img-box">
                <a-icon v-if="cameraTrafficData.ip && pingList.cameraPing == 1" type="check-circle" style="color: #1ad4cd"></a-icon>
                <a-icon v-else-if="cameraTrafficData.ip && pingList.cameraPing == 2" type="close-circle" style="color: #fb223d"></a-icon>
                <a-icon v-else-if="cameraTrafficData.ip" type="sync" spin style="color: #fefa21"></a-icon>
                <img src="@/assets/img/topology/ic_topology_camera.png">
              </div>
            </div>
          </li>
          <li class="topo-line-item">
            <div class="topo-line-item-tail"></div>
            <div class="topo-line-item-tail-left">
              <span class="topo-line-item-tail-arrow">&gt;</span>
            </div>
            <div class="topo-line-item-content">
              <p class="topo-line-item-title">{{cameraTrafficData.pcsName}}S5706交换机</p>
              <p class="topo-line-item-title">暂无网管数据</p>
              <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
            </div>
          </li>
          <li class="topo-line-item">
            <div class="topo-line-item-tail"></div>
            <div class="topo-line-item-tail-left">
              <span class="topo-line-item-tail-arrow">&gt;</span>
            </div>
            <div class="topo-line-item-content">
              <p class="topo-line-item-title">{{(cameraTrafficData.pscSwitchInfo && cameraTrafficData.pscSwitchInfo.name) || (cameraTrafficData.pcsName + '交换机')}}</p>
              <p class="topo-line-item-title">{{(cameraTrafficData.pscSwitchInfo && cameraTrafficData.pscSwitchInfo.ip) || '暂无网管数据'}}</p>
              <div class="img-box">
                <a-icon v-if="(cameraTrafficData.pscSwitchInfo && cameraTrafficData.pscSwitchInfo.ip) && pingList.pscPing == 1" type="check-circle" style="color: #1ad4cd"></a-icon>
                <a-icon v-else-if="(cameraTrafficData.pscSwitchInfo && cameraTrafficData.pscSwitchInfo.ip) && pingList.pscPing == 2" type="close-circle" style="color: #fb223d"></a-icon>
                <a-icon v-else-if="cameraTrafficData.pscSwitchInfo && cameraTrafficData.pscSwitchInfo.ip" type="sync" spin style="color: #fefa21"></a-icon>
                <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
              </div>
            </div>
          </li>
          <li class="topo-line-item">
            <div class="topo-line-item-tail"></div>
            <div class="topo-line-item-tail-left">
              <span class="topo-line-item-tail-arrow">&gt;</span>
            </div>
            <div class="topo-line-item-content">
              <p class="topo-line-item-title">{{(cameraTrafficData.fjSwitchInfo && cameraTrafficData.fjSwitchInfo.name) || (cameraTrafficData.pcsName + '交换机')}}</p>
              <p class="topo-line-item-title">{{(cameraTrafficData.fjSwitchInfo && cameraTrafficData.fjSwitchInfo.ip) || '暂无网管数据'}}</p>
              <div class="img-box">
                <a-icon v-if="(cameraTrafficData.fjSwitchInfo && cameraTrafficData.fjSwitchInfo.ip) && pingList.fjPing == 1" type="check-circle" style="color: #1ad4cd"></a-icon>
                <a-icon v-else-if="(cameraTrafficData.fjSwitchInfo && cameraTrafficData.fjSwitchInfo.ip) && pingList.fjPing == 2" type="close-circle" style="color: #fb223d"></a-icon>
                <a-icon v-else-if="cameraTrafficData.fjSwitchInfo && cameraTrafficData.fjSwitchInfo.ip" type="sync" spin style="color: #fefa21"></a-icon>
                <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
              </div>
            </div>
            <div class="topo-line-item-tree">
              <div class="topo-line-item-tree-tail"></div>
              <div class="topo-line-item-tree-tail-right">
                <div class="topo-line-item-tree-arrow">&gt;</div>
              </div>
              <ul class="topo-line">
                <li class="topo-line-item">
                  <div class="topo-line-item-tail"></div>
                  <div class="topo-line-item-tail-left">
                    <span class="topo-line-item-tail-arrow">&gt;</span>
                  </div>
                  <div class="topo-line-item-content">
                    <p class="topo-line-item-title">{{(cameraTrafficData && cameraTrafficData.fjName) ? cameraTrafficData.fjName : '--'}}S12706交换机</p>
                    <p class="topo-line-item-title">暂无网管数据</p>
                    <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
                  </div>
                </li>
                <li class="topo-line-item">
                  <div class="topo-line-item-tail"></div>
                  <div class="topo-line-item-tail-left">
                    <span class="topo-line-item-tail-arrow">&gt;</span>
                  </div>
                  <div class="topo-line-item-content">
                    <p class="topo-line-item-title">{{(cameraTrafficData && cameraTrafficData.fjName) ? cameraTrafficData.fjName : '--'}}S7706交换机</p>
                    <p class="topo-line-item-title">暂无网管数据</p>
                    <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
                  </div>
                </li>
                <li class="topo-line-item">
                  <div class="topo-line-item-tail"></div>
                  <div class="topo-line-item-tail-left">
                    <span class="topo-line-item-tail-arrow">&gt;</span>
                  </div>
                  <div class="topo-line-item-content">
                    <ul class="topo-list">
                      <li class="topo-list-item">
                        <div class="topo-list-item-tail"></div>
                        <div class="topo-list-item-content">
                          <ul class="topo-list">
                            <li class="topo-list-item">
                              <div class="topo-list-item-tail"></div>
                              <div class="topo-list-item-content">
                                <ul class="topo-line">
                                  <li class="topo-line-item">
                                    <div class="topo-line-item-tail"></div>
                                    <div class="topo-line-item-content">
                                      <p class="topo-line-item-title">{{(cameraTrafficData && cameraTrafficData.fjName) ? cameraTrafficData.fjName : '--'}}S5706交换机</p>
                                      <p class="topo-line-item-title">详见服务信息</p>
                                      <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
                                    </div>
                                  </li>
                                  <li class="topo-line-item">
                                    <div class="topo-line-item-tail"></div>
                                    <div class="topo-line-item-content">
                                      <p class="topo-line-item-title">列表服务</p>
                                      <a class="topo-line-item-title" @click="listServerSetaliClick">查看详情</a>
                                      <img :src="require('@/assets/img/topology/' + (listServerStatus==1 && 'ic_topology_server_unhealthy2.png' || listServerStatus==2 && 'ic_topology_server_alert2.png' || 'ic_topology_server.png'))" alt="">
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li class="topo-list-item">
                              <div class="topo-list-item-tail"></div>
                              <div class="topo-list-item-content">
                                <ul class="topo-line">
                                  <li class="topo-line-item">
                                    <div class="topo-line-item-tail"></div>
                                    <div class="topo-line-item-content">
                                      <p class="topo-line-item-title">{{(cameraTrafficData && cameraTrafficData.fjName) ? cameraTrafficData.fjName : '--'}}S5706交换机</p>
                                      <p class="topo-line-item-title">详见服务信息</p>
                                      <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
                                    </div>
                                  </li>
                                  <li class="topo-line-item">
                                    <div class="topo-line-item-tail"></div>
                                    <div class="topo-line-item-content">
                                      <p class="topo-line-item-title">信令服务</p>
                                      <a class="topo-line-item-title" @click="signalServerSetaliClick">查看详情</a>
                                      <img :src="require('@/assets/img/topology/' + (signServerStatus == 1 && 'ic_topology_xinling_unhealthy2.png' || signServerStatus == 2 && 'ic_topology_xinling_alert2.png' || 'ic_topology_xinling.png'))" alt="">
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="topo-list-item">
                        <div class="topo-list-item-tail"></div>
                        <div class="topo-list-item-tail-left">
                          <div class="topo-list-item-tail-arrow">></div>
                        </div>
                        <div class="topo-list-item-tail-line"></div>
                        <div class="topo-list-item-content">
                          <ul class="topo-line">
                            <li class="topo-line-item">
                              <div class="topo-line-item-tail"></div>
                              <div class="topo-line-item-tail-left">
                                <span class="topo-line-item-tail-arrow">&gt;</span>
                              </div>
                              <div class="topo-line-item-content">
                                <p class="topo-line-item-title">{{(cameraTrafficData && cameraTrafficData.fjName) ? cameraTrafficData.fjName : '--'}}S5706交换机</p>
                                <p class="topo-line-item-title">暂无网管数据</p>
                                <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
                              </div>
                            </li>
                            <li class="topo-line-item">
                              <div class="topo-line-item-tail"></div>
                              <div class="topo-line-item-tail-left">
                                <span class="topo-line-item-tail-arrow">&gt;</span>
                              </div>
                              <div class="topo-line-item-tail-line"></div>
                              <div class="topo-line-item-content">
                                <ul class="topo-list user">
                                  <li v-for="(item, index) in userRelateData"
                                    :key="index"
                                    :value="index"
                                    class="topo-list-item">
                                    <div class="topo-list-item-tail"></div>
                                    <div class="topo-list-item-tail-left">
                                      <div class="topo-list-item-tail-arrow">></div>
                                    </div>
                                    <div class="topo-list-item-content">
                                      <div class="topo-list-item-hover">
                                        <img src="@/assets/img/topology/ic_topology_user.png" alt="">
                                        <div class="topo-list-item-new">
                                          <a-tooltip placement="right">
                                            <template slot="title">{{item.nickName+','+item.orgName+','+item.ip || '--'}}</template>
                                            <span>{{item.nickName}},{{item.orgName}},{{item.ip}}</span>
                                          </a-tooltip>
                                          <a @click="userListDetailClick">查看用户桌面</a>
                                          <a @click="offlineClick(item)">实时断流</a>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li class="topo-line-item">
            <div class="topo-line-item-tail"></div>
            <div class="topo-line-item-tail-left">
              <span class="topo-line-item-tail-arrow">&gt;</span>
            </div>
            <div class="topo-line-item-tail-right">
              <span class="topo-line-item-tail-arrow">&lt;</span>
            </div>
            <div class="topo-line-item-content">
              <p class="topo-line-item-title">{{(cameraTrafficData && cameraTrafficData.fjName) ? cameraTrafficData.fjName : '--'}}S12706交换机</p>
              <p class="topo-line-item-title">暂无网管数据</p>
              <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
            </div>
          </li>
          <li class="topo-line-item">
            <div class="topo-line-item-tail"></div>
            <div class="topo-line-item-tail-left">
              <span class="topo-line-item-tail-arrow">&gt;</span>
            </div>
            <div class="topo-line-item-tail-right">
              <span class="topo-line-item-tail-arrow">&lt;</span>
            </div>
            <div class="topo-line-item-content">
              <p class="topo-line-item-title">{{cameraTrafficData.vcnInfo && cameraTrafficData.vcnInfo.name}}VCN</p>
              <p>{{(cameraTrafficData.vcnInfo && cameraTrafficData.vcnInfo.ip) || '暂无网管数据'}}</p>
              <p>{{cameraTrafficData.vcnCount }}/MBps</p>
              <div class="img-box">
                <a-icon v-if="(cameraTrafficData.vcnInfo && cameraTrafficData.vcnInfo.ip) && pingList.vcnPing == 1" type="check-circle" style="color: #1ad4cd"></a-icon>
                <a-icon v-else-if="(cameraTrafficData.vcnInfo && cameraTrafficData.vcnInfo.ip) && pingList.vcnPing == 2" type="close-circle" style="color: #fb223d"></a-icon>
                <a-icon v-else-if="cameraTrafficData.vcnInfo && cameraTrafficData.vcnInfo.ip" type="sync" spin style="color: #fefa21"></a-icon>
                <img src="@/assets/img/topology/ic_topology_vcn_health.png" alt="">
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="topology-list-user" v-else-if="topoType=='user'">
        <ul class="topo-line">
          <li class="topo-line-item">
            <div class="topo-line-item-tail"></div>
            <div class="topo-line-item-tail-left">
              <span class="topo-line-item-tail-arrow">&gt;</span>
            </div>
            <div class="topo-line-item-content">
              <ul class="topo-line camera"
                v-for="(item, index) in userTrafficData"
                :key="index"
                :value="index">
                <li class="topo-line-item">
                  <div class="topo-line-item-tail"></div>
                  <div class="topo-line-item-tail-left">
                    <span class="topo-line-item-tail-arrow">&gt;</span>
                  </div>
                  <div class="topo-line-item-content">
                    <p class="topo-line-item-title">{{item.cameraName}}</p>
                    <p class="topo-line-item-title">{{item.ip}}</p>
                    <div class="img-box">
                      <a-icon v-if="item.isPing && item.ip && item.cameraPing == 1" type="check-circle" style="color: #1ad4cd"></a-icon>
                      <a-icon v-else-if="item.isPing && item.ip && item.cameraPing == 2" type="close-circle" style="color: #fb223d"></a-icon>
                      <a-icon v-else-if="item.isPing && item.ip" type="sync" spin style="color: #fefa21"></a-icon>
                      <img src="@/assets/img/topology/ic_topology_camera.png">
                    </div>
                    <a class="topo-line-item-title" @click="cameraPingClick(item, index)">链路检测</a>
                  </div>
                </li>
                <li class="topo-line-item">
                  <div class="topo-line-item-tail"></div>
                  <div class="topo-line-item-tail-left">
                    <span class="topo-line-item-tail-arrow">&gt;</span>
                  </div>
                  <div class="topo-line-item-content">
                    <p class="topo-line-item-title">{{item.pcsName}}S5706交换机</p>
                    <p class="topo-line-item-title">暂无网管数据</p>
                    <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
                  </div>
                </li>
                <li class="topo-line-item">
                  <div class="topo-line-item-tail"></div>
                  <div class="topo-line-item-tail-left">
                    <span class="topo-line-item-tail-arrow">&gt;</span>
                  </div>
                  <div class="topo-line-item-content">
                    <p class="topo-line-item-title">{{(item.pscSwitchInfo && item.pscSwitchInfo.name) || (item.pcsName + '交换机')}}</p>
                    <p class="topo-line-item-title">{{(item.pscSwitchInfo && item.pscSwitchInfo.ip) || '暂无网管数据'}}</p>
                    <div class="img-box">
                      <a-icon v-if="item.isPing && (item.pscSwitchInfo && item.pscSwitchInfo.ip) && item.pscPing == 1" type="check-circle" style="color: #1ad4cd"></a-icon>
                      <a-icon v-else-if="item.isPing && (item.pscSwitchInfo && item.pscSwitchInfo.ip) && item.pscPing == 2" type="close-circle" style="color: #fb223d"></a-icon>
                      <a-icon v-else-if="item.isPing && item.pscSwitchInfo && item.pscSwitchInfo.ip" type="sync" spin style="color: #fefa21"></a-icon>
                      <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
                    </div>
                  </div>
                </li>
                <li class="topo-line-item">
                  <div class="topo-line-item-tail"></div>
                  <div class="topo-line-item-tail-left">
                    <span class="topo-line-item-tail-arrow">&gt;</span>
                  </div>
                  <div class="topo-line-item-content">
                    <p class="topo-line-item-title">{{(item.fjSwitchInfo && item.fjSwitchInfo.name) || (item.pcsName + '交换机')}}</p>
                    <p class="topo-line-item-title">{{(item.fjSwitchInfo && item.fjSwitchInfo.ip) || '暂无网管数据'}}</p>
                    <div class="img-box">
                      <a-icon v-if="item.isPing && (item.fjSwitchInfo && item.fjSwitchInfo.ip) && item.fjPing == 1" type="check-circle" style="color: #1ad4cd"></a-icon>
                      <a-icon v-else-if="item.isPing && (item.fjSwitchInfo && item.fjSwitchInfo.ip) && item.fjPing == 2" type="close-circle" style="color: #fb223d"></a-icon>
                      <a-icon v-else-if="item.isPing && item.fjSwitchInfo && item.fjSwitchInfo.ip" type="sync" spin style="color: #fefa21"></a-icon>
                      <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
                    </div>
                  </div>
                  <div class="topo-line-item-tree">
                    <div class="topo-line-item-tree-tail"></div>
                    <div class="topo-line-item-tree-tail-right">
                      <div class="topo-line-item-tree-arrow">&gt;</div>
                    </div>
                    <div class="topo-line-item-tree-tail-left">
                      <div class="topo-line-item-tree-arrow">&gt;</div>
                    </div>
                    <ul class="topo-line">
                      <li class="topo-line-item">
                        <div class="topo-line-item-tail"></div>
                        <div class="topo-line-item-tail-left-reverse">
                          <div class="topo-line-item-tail-arrow">&lt;</div>
                        </div>
                        <div class="topo-line-item-tail-right-reverse">
                          <div class="topo-line-item-tail-arrow">&gt;</div>
                        </div>
                        <div class="topo-line-item-content">
                          <p class="topo-line-item-title">{{item.vcnInfo && item.vcnInfo.name}}VCN</p>
                          <p>{{(item.vcnInfo && item.vcnInfo.ip) || '暂无网管数据'}}</p>
                          <p>{{item.vcnCount }}/MBps</p>
                          <div class="img-box">
                            <a-icon v-if="item.isPing && (item.vcnInfo && item.vcnInfo.ip) && item.vcnPing == 1" type="check-circle" style="color: #1ad4cd"></a-icon>
                            <a-icon v-else-if="item.isPing && (item.vcnInfo && item.vcnInfo.ip) && item.vcnPing == 2" type="close-circle" style="color: #fb223d"></a-icon>
                            <a-icon v-else-if="item.isPing && item.vcnInfo && item.vcnInfo.ip" type="sync" spin style="color: #fefa21"></a-icon>
                            <img src="@/assets/img/topology/ic_topology_vcn_health.png" alt="">
                          </div>
                        </div>
                      </li>
                      <li class="topo-line-item">
                        <div class="topo-line-item-content">
                          <p class="topo-line-item-title">{{(item && item.fjName) ? item.fjName : '--'}}S12706交换机</p>
                          <p class="topo-line-item-title">暂无网管数据</p>
                          <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li class="topo-line-item">
            <div class="topo-line-item-tail"></div>
            <div class="topo-line-item-tail-left">
              <span class="topo-line-item-tail-arrow">&gt;</span>
            </div>
            <div class="topo-line-item-content">
              <p class="topo-line-item-title" style="width: 6.5rem">{{(userTrafficData[0] && userTrafficData[0].fjName) ? userTrafficData[0].fjName : '--'}}S12706交换机</p>
              <p class="topo-line-item-title" style="width: 6.5rem">暂无网管数据</p>
              <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
            </div>
          </li>
          <li class="topo-line-item">
            <div class="topo-line-item-tail"></div>
            <div class="topo-line-item-tail-left">
              <span class="topo-line-item-tail-arrow">&gt;</span>
            </div>
            <div class="topo-line-item-content">
              <p class="topo-line-item-title" style="width: 6.5rem">{{(userTrafficData[0] && userTrafficData[0].fjName) ? userTrafficData[0].fjName : '--'}}S7706交换机</p>
              <p class="topo-line-item-title" style="width: 6.5rem">暂无网管数据</p>
              <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
            </div>
          </li>
          <li class="topo-line-item">
            <div class="topo-line-item-content">
              <ul class="topo-list">
                <li class="topo-list-item">
                  <div class="topo-list-item-tail"></div>
                  <div class="topo-list-item-content">
                    <ul class="topo-list">
                      <li class="topo-list-item">
                        <div class="topo-list-item-tail"></div>
                        <div class="topo-list-item-content">
                          <ul class="topo-line">
                            <li class="topo-line-item">
                              <div class="topo-line-item-tail"></div>
                              <div class="topo-line-item-content">
                                <p class="topo-line-item-title">{{(userTrafficData[0] && userTrafficData[0].fjName) ? userTrafficData[0].fjName : '--'}}S7706交换机</p>
                                <p class="topo-line-item-title">详见服务信息</p>
                                <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
                              </div>
                            </li>
                            <li class="topo-line-item server">
                              <div class="topo-line-item-tail"></div>
                              <div class="topo-line-item-tail-line"></div>
                              <div class="topo-line-item-content">
                                <p class="topo-line-item-title">列表服务</p>
                                <img src="@/assets/img/topology/ic_topology_server.png" alt="">
                                <a class="topo-line-item-title" @click="listServerSetaliClick">查看详情</a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="topo-list-item">
                        <div class="topo-list-item-tail"></div>
                        <div class="topo-list-item-content">
                          <ul class="topo-line">
                            <li class="topo-line-item">
                              <div class="topo-line-item-tail"></div>
                              <div class="topo-line-item-content">
                                <p class="topo-line-item-title">{{(userTrafficData[0] && userTrafficData[0].fjName) ? userTrafficData[0].fjName : '--'}}S7706交换机</p>
                                <p class="topo-line-item-title">详见服务信息</p>
                                <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
                              </div>
                            </li>
                            <li class="topo-line-item server">
                              <div class="topo-line-item-tail"></div>
                              <div class="topo-line-item-tail-line"></div>
                              <div class="topo-line-item-content">
                                <p class="topo-line-item-title">信令服务</p>
                                <img src="@/assets/img/topology/ic_topology_xinling.png" alt="">
                                <a class="topo-line-item-title" @click="signalServerSetaliClick">查看详情</a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="topo-list-item" style="padding-right:0">
                  <div class="topo-list-item-tail"></div>
                  <div class="topo-list-item-tail-left">
                    <div class="topo-list-item-tail-arrow">></div>
                  </div>
                  <div class="topo-list-item-tail-line" style="height:110%; top:-5rem"></div>
                  <div class="topo-list-item-content">
                    <ul class="topo-line">
                      <li class="topo-line-item">
                        <div class="topo-line-item-tail"></div>
                        <div class="topo-line-item-tail-left">
                          <span class="topo-line-item-tail-arrow">&gt;</span>
                        </div>
                        <div class="topo-line-item-content">
                          <p class="topo-line-item-title">{{(userTrafficData[0] && userTrafficData[0].fjName) ? userTrafficData[0].fjName : '--'}}S7706交换机</p>
                          <p class="topo-line-item-title">暂无网管数据</p>
                          <img src="@/assets/img/topology/ic_topology_Aggregation switch_health.png" alt="">
                        </div>
                      </li>
                      <li class="topo-line-item" style="margin:0">
                        <div class="topo-line-item-content">
                          <div class="topo-line-item-hover">
                            <img src="@/assets/img/topology/ic_topology_user.png" alt="">
                            <div class="topo-line-item-new">
                              <a-tooltip placement="right">
                                <template slot="title">{{activeUserData.nickName+','+activeUserData.orgName+','+activeUserData.ip || '--'}}</template>
                                <span>{{activeUserData.nickName}},{{activeUserData.orgName}},{{activeUserData.ip}}</span>
                              </a-tooltip>
                              <a @click="userListDetailClick">查看用户桌面</a>
                              <a @click="offlineClick(item)">实时断流</a>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <a-modal :title="viedoTitle" :visible="isPlayVideo" footer = '' @cancel="handlePlayVideoCancel" width="60%">
      <play-video :videoData="videoData" ref="playVideoModal"></play-video>
    </a-modal>
    <a-modal title="深目·视综平台" :visible="isUserDesktop" footer = '' @cancel="handleUserDesktopCancel" width="60%">
      <user-desktop ref="userDesktop"></user-desktop>
    </a-modal>
    <a-modal title="服务信息" :visible="isServeNews" footer = '' @cancel="handleServeNewsCancel" width="50%">
      <server-news ref="serveNewsDesktop"></server-news>
    </a-modal>
  </div>
</template>

<script>
import playVideo from './playVideo'
import userDesktop from './userDesktop'
import serverNews from '@/components/serverNews'
export default {
  components: {
    playVideo,
    userDesktop,
    serverNews,
  },
  props: ['topoType', 'activeCameraData', 'userRelateData', 'cameraTrafficData', 'activeUserData', 'userTrafficData'],
  data () {
    return {
      // 视频弹框
      isPlayVideo: false, // 视频弹框是否显示
      viedoTitle: '历史视频',
      videoData: '',
      isShowTopology: true,

      isUserDesktop: false, // 是否显示用户桌面弹框
      isServeNews: false, // 是否显示服务信息弹框

      listServerData: '', // 列表服务数据
      listServerStatus: '', // 列表服务运行状态
      signServerData: '', // 信令服务数据
      signServerStatus: '', // 信令服务运行状态

      pingList: {
        cameraPing: 0, // 镜头ping
        pscPing: 0, // 派出所ping
        fjPing: 0, // 分局ping
        vcnPing: 0, // VCNping
      },
      userPingList: [
        {
          cameraPing: 0, // 镜头ping
          pscPing: 0, // 派出所ping
          fjPing: 0, // 分局ping
          vcnPing: 0, // VCNping
        }
      ]
    }
  },
  created () {},
  methods: {
    init () {
      const self = this
      self.getServerInfoData('XH-SIP') // 获取列表服务数据
      self.getServerInfoData('3A') // 获取信令服务数据
      if(self.topoType == 'camera') {
        self.pingList = {
          cameraPing: 0, // 镜头ping
          pscPing: 0, // 派出所ping
          fjPing: 0, // 分局ping
          vcnPing: 0, // VCNping
        }
        self.$nextTick(() => {
          if(self.cameraTrafficData && self.cameraTrafficData.ip) {
            self.getPingData('cameraPing', self.cameraTrafficData.ip) // 镜头
          }
          if(self.cameraTrafficData.pscSwitchInfo && self.cameraTrafficData.pscSwitchInfo.ip) {
            self.getPingData('pscPing', self.cameraTrafficData.pscSwitchInfo.ip) // 派出所
          }
          if(self.cameraTrafficData.fjSwitchInfo && self.cameraTrafficData.fjSwitchInfo.ip) {
            self.getPingData('fjPing', self.cameraTrafficData.fjSwitchInfo.ip) // 分局
          }
          if(self.cameraTrafficData.vcnInfo && self.cameraTrafficData.vcnInfo.ip) {
            self.getPingData('vcnPing', self.cameraTrafficData.vcnInfo.ip) // VCN
          }
        })
      }
      if($('.topo-list.user').find('.topo-list-item').length == 1){
        $('.topo-list.user').find('.topo-list-item').addClass('noLine')
      } else {
        $('.topo-list.user').find('.topo-list-item').removeClass('noLine')
      }
    },
    cameraPingClick(val, index) {
      const self = this
      self.userTrafficData[index].isPing = true
      let data = self.userTrafficData[index]
      self.$set(self.userTrafficData, index, data)
      if(val && val.ip) {
        self.getPingData('cameraPing', val.ip, 'user', index) // 镜头
      }
      if(val.pscSwitchInfo && val.pscSwitchInfo.ip) {
        self.getPingData('pscPing', val.pscSwitchInfo.ip, 'user', index) // 派出所
      }
      if(val.fjSwitchInfo && val.fjSwitchInfo.ip) {
        self.getPingData('fjPing', val.fjSwitchInfo.ip, 'user', index) // 分局
      }
      if(val.vcnInfo && val.vcnInfo.ip) {
        self.getPingData('vcnPing', val.vcnInfo.ip, 'user', index) // VCN
      }
    },
    closeTopologyGraph() {
      const self = this
      self.isShowTopology = false
      self.$emit('closeTopology', self.isShowTopology)
    },
    // 当前用户关联镜头 单击事件
    cameraListCheckedClick(type, item) {
      const self = this
      if(type == 'realplay') {
        self.viedoTitle = '实时视频'
      } else {
        self.viedoTitle = '历史视频'
      }
      self.isPlayVideo = true
      self.videoData = item
      self.videoData.type = type
      self.$nextTick(() => {
        if (self.$refs.playVideoModal) {
          self.$refs.playVideoModal.initCurrentData()
        }
      })
    },
    // 实时调用用户 用户账号单击事件
    userListDetailClick(item, index) {
      const self = this
      self.isUserDesktop = true
    },
    // 实时调用用户 实时断流
    offlineClick(item) {
      const self = this
      self.$confirm({
        title: '确定实时断流？',
        content: '用户当前播放的本条视频将被强制关闭',
        onOk () {
          self.forceUserOffline(item)
        }
      })
    },
    // 打开列表服务
    listServerSetaliClick() {
      const self = this
      this.isServeNews = true
      self.$nextTick(() => {
        if (self.$refs.serveNewsDesktop) {
          self.$refs.serveNewsDesktop.init(self.listServerData)
        }
      })
    },
    // 打开信令服务
    signalServerSetaliClick() {
      const self = this
      this.isServeNews = true
      self.$nextTick(() => {
        if (self.$refs.serveNewsDesktop) {
          self.$refs.serveNewsDesktop.init(self.signServerData)
        }
      })
    },
    // 关闭视频播放弹框
    handlePlayVideoCancel() {
      const self = this
      self.isPlayVideo = false
    },
    // 关闭用户桌面弹框
    handleUserDesktopCancel() {
      const self = this
      this.isUserDesktop = false
    },
    // 关闭服务信息弹框
    handleServeNewsCancel() {
      const self = this
      this.isServeNews = false
    },

    // 左/右-实时断流
    async forceUserOffline(val) {
      const self = this
      const data = await this.$axios('/api/userShotLinkage/makeUserOffline', {
        id: val.id
      })
      if(data == 'success') {
        self.$message.success('实时断流成功，请刷新界面');
      } else {
        self.$message.error('实时断流失败！！');
      }
    },
    // 获取列表服务 信令服务详情
    async getServerInfoData(val) {
      const self = this
      let param = {
        serverCode: val,
        serverIp: '',
        switchIp: ''
      }
      const data = await this.$postAxios('/api/server/getServerInfo', param)
      let statusData = ''
      let statusType = ''
      data.map(item => {
        item.serverPosition = item.machineRoom + ' ' + item.machinePosition
        if(item.checkStatus != '正常') {
          statusData += '2'
        } else {
          statusData += '1'
        }
      })
      if (statusData.indexOf('2') > -1) {
        if (statusData.indexOf('1') > -1) {
          statusType = 1
        } else {
          statusType = 2
        }
      } else {
        statusType = 0
      }
      if(val == 'XH-SIP') {
        self.listServerData = data
        self.listServerStatus = statusType
      } else {
        self.signServerData = data
        self.signServerStatus = statusType
      }
    },
    // 获取ping状态
    async getPingData(type, val, isuser, index) {
      const self = this
      let param = {
        host: val,
        port: '',
        pingTimes: 3,
        checkType: 1
      }
      const data = await this.$postAxios('/api/server/connectCheck', param)
      if(isuser) {
        if(type == 'cameraPing') {
          self.userTrafficData[index].cameraPing = (data && data.connectable) ? 1 : 2
          let arrData = self.userTrafficData[index]
          self.$set(self.userTrafficData, index, arrData)
        } else if (type == 'pscPing') {
          self.userTrafficData[index].pscPing = (data && data.connectable) ? 1 : 2
          let arrData = self.userTrafficData[index]
          self.$set(self.userTrafficData, index, arrData)
        } else if (type == 'fjPing') {
          self.userTrafficData[index].fjPing = (data && data.connectable) ? 1 : 2
          let arrData = self.userTrafficData[index]
          self.$set(self.userTrafficData, index, arrData)
        } else if (type == 'vcnPing') {
          self.userTrafficData[index].vcnPing = (data && data.connectable) ? 1 : 2
          let arrData = self.userTrafficData[index]
          self.$set(self.userTrafficData, index, arrData)
        }
      } else {
        if(type == 'cameraPing') {
          self.pingList.cameraPing = (data && data.connectable) ? 1 : 2
        } else if (type == 'pscPing') {
          self.pingList.pscPing = (data && data.connectable) ? 1 : 2
        } else if (type == 'fjPing') {
          self.pingList.fjPing = (data && data.connectable) ? 1 : 2
        } else if (type == 'vcnPing') {
          self.pingList.vcnPing = (data && data.connectable) ? 1 : 2
        }
      }
    },
  }
}
</script>

<style lang="scss">
.topologyGraph {
  width: 100%;
  height: 90vh;
  .topology-title {
    background: $theme-color;
    .list-title-name {
      font-family: '方正综艺简体';
      padding: 0 1rem;
      font-size: 1.4rem;
      height: 3rem;
      line-height: 3rem;
      color: $theme-yellow;
    }
    .anticon {
      float: right;
      padding: 0 1rem;
      font-size: $font-size-x-large;
      font-weight: 600;
      color: $theme-font;
      height: 3rem;
      line-height: 3rem;
    }
  }
  // 拓扑图样式
  .topology-list {
    position: relative;
    width: 100%;
    height: calc(100% - 3rem);
    color: $theme-font;
    font-size: $font-size-small;
    line-height: 1.5;
    overflow: auto;
    box-sizing: border-box;
    .topology-tag {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 18rem;
      padding: 1rem;
      background: rgba(0, 0, 0, .6);
      z-index: 2;
      .tag-box {
        padding: 0 .5rem;
        margin-bottom: .5rem;
        text-align: center;
        img {
          width: 2rem;
          height: 1.5rem;
        }
        .tag-item-line1 {
          display: inline-block;
          width: 1.5rem;
          height: .35rem;
          margin-right: .3rem;
          border-top: 1px solid #09D1AF;
        }
        .tag-item-line2 {
          display: inline-block;
          width: 1.5rem;
          height: .35rem;
          border-top: 2px dashed #fefa21;
        }
        .tag-item-icon {
          display: inline-block;
          font-size: $font-size-medium;
          margin-right: .3rem;
          margin-left: -.4rem;
          color: #fefa21;
          font-weight: 600;
        }
        .anticon  {
          margin-right: .3rem;
        }
        p {
          display: inline-block;
          font-size: $font-size-small;
          line-height: $font-size-x-large;
          height: $font-size-x-large;
          color: $theme-font;
        }
      }
    }
    .topology-list-camera {
      position: relative;
      height: 100%;
      max-width: 56w;
      padding: 1.5rem 0;
      overflow: auto;
      .topo-line {
        .topo-line-item {
          position: relative;
          width: auto;
          margin: 0;
          margin-left: 1rem;
        }
      }
    }
    .topology-list-user {
      position: relative;
      height: 100%;
      max-width: 56vw;
      padding: 1.5rem 0;
      overflow: auto;
      .topo-line {
        .topo-line-item {
          margin: 0;
          margin-right: 1rem;
          &:first-child {
            .topo-line-item-tail, .topo-line-item-tail-left, .topo-line-item-tail-right {
              display: block;
            }
            .topo-line-item-content {
              .topo-line.camera {
                padding-bottom: 8rem;
                position: relative;
                &:last-child {
                  &::before {
                    content: "";
                    position: absolute;
                    width: 1px;
                    height: calc((100% - 8rem)/2);
                    top: 0;
                    right: 0;
                    border-right: 1px solid #09D1AF;
                    overflow: hidden;
                  }
                  &::after {
                    content: "";
                    position: absolute;
                    width: 1px;
                    height: calc((100% - 8rem)/2);
                    top: 0;
                    right: 0;
                    border-right: 2px dashed #fefa21;
                    overflow: hidden;
                  }
                }
                &:first-child {
                  &::before {
                    content: "";
                    position: absolute;
                    width: 1px;
                    height: calc(100% - 3rem);
                    top: 3rem;
                    right: 0;
                    border-right: 1px solid #09D1AF;
                    overflow: hidden;
                  }
                  &::after {
                    content: "";
                    position: absolute;
                    width: 1px;
                    height: calc(100% - 3rem);
                    top: 3rem;
                    right: 0;
                    border-right: 2px dashed #fefa21;
                    overflow: hidden;
                  }
                }
                &::before {
                  content: "";
                  position: absolute;
                  width: 1px;
                  height: 100%;
                  top: 0;
                  right: 0;
                  border-right: 1px solid #09D1AF;
                  overflow: hidden;
                }
                &::after {
                  content: "";
                  position: absolute;
                  width: 1px;
                  height: 100%;
                  top: 0;
                  right: 0;
                  border-right: 2px dashed #fefa21;
                  overflow: hidden;
                }
                .topo-line-item {
                  .topo-line-item-tree {
                    width: 17rem;
                    right: 0;
                    margin: 0;
                    padding-top: .5rem;
                    .topo-line-item-tree-tail {
                      right: 4rem;
                      left: inherit;
                    }
                    .topo-line-item-tree-tail-left {
                      right: 3rem;
                      left: inherit;
                    }
                    .topo-line-item-tree-tail-right {
                      right: 4rem;
                      left: inherit;
                    }
                    .topo-line {
                      margin: 0;
                      padding: 0;
                      border: 0;
                      &::before {
                        display: none;
                      }
                    }
                  }
                }
              }
            }
          }
          .topo-line-item-tail, .topo-line-item-tail-left, .topo-line-item-tail-right{
            left: inherit;
            right: -1rem;
            &-reverse {
              left: inherit;
              right: -1rem;
            }
          }
          &.server {
            .topo-line-item-tail {
              border-top: 2px dashed #fefa21;
            }
            .topo-line-item-tail-line {
              height: 140%;
              top: 2.8rem;
              right: -1rem;
              left: inherit;
              border-right: 2px dashed #fefa21;
              &::before {
                display: none;
              }
            }
          }
        }
      }
    }
    // 拓扑横向样式
    .topo-line {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      .topo-line-item {
        position: relative;
        width: auto;
        // margin: 0;
        // margin-left: 1rem;
        &:first-child {
          padding: 0;
          .topo-line-item-tail, .topo-line-item-tail-left, .topo-line-item-tail-right {
            display: none;
          }
        }
        .topo-line-item-tail {
          position: absolute;
          width: 1rem;
          height: 0;
          top: 50%;
          left: -1rem;
          border-top: 1px solid #09D1AF;
          &-left {
            position: absolute;
            width: 1rem;
            height: 1rem;
            top: calc(50% - 1rem);
            left: -1rem;
            overflow: hidden;
            .topo-line-item-tail-arrow {
              position: absolute;
              top: 0;
              right: -2px;
              color: #fefa21;
              font-weight: 600;
              font-size: .8rem;
              line-height: 1rem;
              height: 1rem;
            }
            &::before {
              content: "";
              position: absolute;
              width: 6rem;
              height: 2px;
              top: 50%;
              transform: translateX(-100%);
              z-index: 3;
              background: -webkit-repeating-linear-gradient(0deg,#fefa21 0,#fefa21 3px,rgba(0,0,0,0) 3px,rgba(0,0,0,0) 6px);
              animation: out-left linear 2s infinite;
            }
            &-reverse {
              position: absolute;
              width: 1rem;
              height: 1rem;
              top: calc(50% - 1rem);
              left: -1rem;
              overflow: hidden;
              .topo-line-item-tail-arrow {
                position: absolute;
                top: 0;
                left: -2px;
                color: #fefa21;
                font-weight: 600;
                font-size: .8rem;
                line-height: 1rem;
                height: 1rem;
              }
              &::before {
                content: "";
                position: absolute;
                width: 6rem;
                height: 2px;
                top: 50%;
                transform: translateX(-100%);
                z-index: 3;
                background: -webkit-repeating-linear-gradient(0deg,#fefa21 0,#fefa21 3px,rgba(0,0,0,0) 3px,rgba(0,0,0,0) 6px);
                animation: out-right linear 2s infinite;
              }
            }
          }
          &-right {
            position: absolute;
            width: 1rem;
            height: 1rem;
            top: calc(50%);
            left: -1rem;
            overflow: hidden;
            .topo-line-item-tail-arrow {
              position: absolute;
              top: 0;
              left: -2px;
              color: #fefa21;
              font-weight: 600;
              font-size: .8rem;
              line-height: 1rem;
              height: 1rem;
            }
            &::before {
              content: "";
              position: absolute;
              width: 6rem;
              height: 2px;
              top: 50%;
              transform: translateX(-100%);
              z-index: 3;
              background: -webkit-repeating-linear-gradient(0deg,#fefa21 0,#fefa21 3px,rgba(0,0,0,0) 3px,rgba(0,0,0,0) 6px);
              animation: out-right linear 2s infinite;
            }
            &-reverse {
              position: absolute;
              width: 1rem;
              height: 1rem;
              top: 50%;
              left: -1rem;
              overflow: hidden;
              .topo-line-item-tail-arrow {
                position: absolute;
                top: 0;
                right: -2px;
                color: #fefa21;
                font-weight: 600;
                font-size: .8rem;
                line-height: 1rem;
                height: 1rem;
              }
              &::before {
                content: "";
                position: absolute;
                width: 6rem;
                height: 2px;
                top: 50%;
                transform: translateX(-100%);
                z-index: 3;
                background: -webkit-repeating-linear-gradient(0deg,#fefa21 0,#fefa21 3px,rgba(0,0,0,0) 3px,rgba(0,0,0,0) 6px);
                animation: out-left linear 2s infinite;
              }
            }
          }
          &-line {
            position: absolute;
            width: 1rem;
            height: calc(100% - 4rem);
            top: 1.5rem;
            left: 0;
            overflow: hidden;
            &::before {
              content: "";
              position: absolute;
              width: 2px;
              height: 200%;
              left: 0;
              transform: translateX(-100%);
              z-index: 3;
              background: -webkit-repeating-linear-gradient(90deg,#fefa21 0,#fefa21 3px,rgba(0,0,0,0) 3px,rgba(0,0,0,0) 6px);
              animation: out-down linear 5s infinite;
            }
          }
        }
        .topo-line-item-content {
          text-align: center;
          .topo-line-item-title {
            display: block;
            width: 8rem;
          }
          .topo-line-item-hover {
            position: relative;
            padding: 0 .5rem;
            width: 14rem;
            @extend .over-ellipsis;
            img {
              float: left;
              width: 3rem;
              height: 3rem;
            }
            .topo-line-item-new {
              float: left;
              width: 10rem;
              span {
                display: block;
                width: 100%;
                overflow: hidden;
                padding-left: .5rem;
              }
              a {
                padding-left: .5rem;
              }
            }
          }
        }
        .topo-line-item-tree {
          position: absolute;
          margin-left: -1rem;
          .topo-line {
            align-items: center;
          }
          .topo-line-item-tree-tail {
            position: absolute;
            width: 0;
            height: 50%;
            bottom: 50%;
            left: 5rem;
            border-left: 1px solid #09D1AF;
            &-left {
              position: absolute;
              width: 1rem;
              height: 50%;
              bottom: 50%;
              left: 4rem;
              overflow: hidden;
              .topo-line-item-tree-arrow {
                position: absolute;
                top: 0;
                left: .1rem;
                color: #fefa21;
                font-weight: 600;
                font-size: .8rem;
                line-height: 1rem;
                height: 1rem;
                transform: rotate(-90deg);
              }
              &::before {
                content:"";
                position:absolute;
                width: 2px;
                height: 200%;
                left: calc(50% - 1px);
                transform: translateX(-100%);
                z-index: 3;
                background: -webkit-repeating-linear-gradient(90deg,#fefa21 0,#fefa21 3px,rgba(0,0,0,0) 3px,rgba(0,0,0,0) 6px);
                animation: out-up linear 5s infinite;
              }
            }
            &-right {
              position: absolute;
              width: 1rem;
              height: 50%;
              bottom: 50%;
              left: 5rem;
              overflow: hidden;
              .topo-line-item-tree-arrow {
                position: absolute;
                left: .25rem;
                bottom: 0;
                color: #fefa21;
                font-weight: 600;
                font-size: .8rem;
                line-height: 1rem;
                height: 1rem;
                transform: rotate(90deg);
              }
              &::before {
                content:"";
                position:absolute;
                width: 2px;
                height: 200%;
                left: calc(50% - 1px);
                transform: translateX(-100%);
                z-index: 3;
                background: -webkit-repeating-linear-gradient(90deg,#fefa21 0,#fefa21 3px,rgba(0,0,0,0) 3px,rgba(0,0,0,0) 6px);
                animation: out-down linear 5s infinite;
              }
            }
          }
        }
      }
    }
    // 拓扑纵向样式
    .topo-list {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      .topo-list-item {
        position: relative;
        padding: .5rem 1rem .5rem 1rem;
        &:first-child { // 头条数据竖线
          border: none;
          &::before {
            position: absolute;
            display: block;
            height: 50%;
            content: "";
            top: 50%;
            left: 0;
            border-right: 1px solid #09D1AF;
          }
          .topo-list-item-tail-line {
            height: 50%;
            top: -.5rem;
            left: 0;
            &::before {
              animation: out-up linear 5s infinite;
            }
          }
        }
        &:last-child { // 末条数据竖线
          border: none;
          &::before {
            position: absolute;
            display: block;
            height: 50%;
            content: "";
            bottom: 50%;
            left: 0;
            border-right: 1px solid #09D1AF;
          }
          .topo-list-item-tail-line {
            height: 50%;
            top: -.5rem;
            left: 0;
          }
        }
        &::before { // 中间数据竖线
          position: absolute;
          display: attr(display-type);
          height: 100%;
          content: "";
          top: 0;
          left: 0;
          border-right: 1px solid #09D1AF;
        }
        &:hover {
          .menu-list.user{
            display: block;
          }
        }
        &.noLine {
          &::before { // 中间数据竖线不显示
            display: none;
          }
        }
        .topo-list-item-tail {
          position: absolute;
          width: 1rem;
          height: 0;
          top: 50%;
          left: 0;
          border-top: 1px solid #09D1AF;
          &-left {
            position: absolute;
            width: 1rem;
            height: 1rem;
            top: calc(50% - 1rem);
            left: 0;
            overflow: hidden;
            .topo-list-item-tail-arrow {
              position: absolute;
              top: 0;
              right: -2px;
              color: #fefa21;
              font-weight: 600;
              font-size: .8rem;
              line-height: 1rem;
              height: 1rem;
            }
            &::before {
              content:"";
              position:absolute;
              width: 6rem;
              height: 2px;
              top: 50%;
              transform: translateX(-100%);
              z-index: 3;
              background: -webkit-repeating-linear-gradient(0deg,#fefa21 0,#fefa21 3px,rgba(0,0,0,0) 3px,rgba(0,0,0,0) 6px);
              animation: out-left linear 2s infinite;
            }
          }
          &-right {
            position: absolute;
            width: 1rem;
            height: .5rem;
            top: calc(50% + .5rem);
            left: 0;
            overflow: hidden;
            .topo-list-item-tail-arrow {
              position: absolute;
              top: 0;
              right: -2px;
              color: #fefa21;
              font-weight: 600;
              font-size: .8rem;
              line-height: 1rem;
              height: 1rem;
            }
            &::before {
              content:"";
              position:absolute;
              width: 6rem;
              height: 2px;
              top: 0;
              transform: translateX(-100%);
              z-index: 3;
              background: -webkit-repeating-linear-gradient(0deg,#fefa21 0,#fefa21 3px,rgba(0,0,0,0) 3px,rgba(0,0,0,0) 6px);
              animation: out-right linear 2s infinite;
            }
          }
          &-line {
            position: absolute;
            width: 1rem;
            height: 100%;
            top: 0;
            left: 0;
            overflow: hidden;
            &::before {
              content:"";
              position:absolute;
              width: 2px;
              height: 200%;
              left: 0;
              transform: translateX(-100%);
              z-index: 3;
              background: -webkit-repeating-linear-gradient(90deg,#fefa21 0,#fefa21 3px,rgba(0,0,0,0) 3px,rgba(0,0,0,0) 6px);
              animation: out-down linear 5s infinite;
            }
          }
        }
        .topo-list-item-content {
          text-align: center;
          .topo-list-item-title {
            width: 10rem;
          }
          .topo-list-item-hover {
            position: relative;
            padding: 0 .5rem;
            width: 14rem;
            @extend .over-ellipsis;
            img {
              float: left;
            }
            .topo-list-item-new {
              float: left;
              width: 10rem;
              span {
                display: block;
                width: 100%;
                overflow: hidden;
                padding-left: .5rem;
              }
              a {
                padding-left: .5rem;
              }
            }
          }
        }
      }
    }
    @keyframes out-right {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
    @keyframes out-left {
      from {
        transform: translateX(-50%);
      }
      to {
        transform: translateX(0);
      }
    }
    @keyframes out-down {
      from {
        transform: translateY(-50%);
      }
      to {
        transform: translateY(0);
      }
    }
    @keyframes out-up {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(-50%);
      }
    }
  }
  .img-box {
    position: relative;
    width: 100%;
    .anticon {
      position: absolute;
      right: 1.5rem;
      top: 0;
      z-index: 2;
    }
  }
}

</style>
