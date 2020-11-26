<template>
  <div class="flowControl">
    <div class="list-title">
      <span class="list-title-name">{{controlTitle}}</span>
      <a-icon style="font-size:16px;" type="close" @click="closeFlowControl"></a-icon>
    </div>

    <!-- 管控任务列表 -->
    <div class="control-task-list" v-if="controlType == 'task'">
      <a-button type="primary" @click="addNewControlTask">新建管控任务</a-button>
      <a-table
        :rowKey="record => record.id"
        :columns="controlData.controlTableColumns"
        :data-source="controlData.controlTableData"
        :customRow="handleControlClickRow"
        :indentSize="28"
        :scroll="{y: 400}"
        @expand="handleControlExpand"
        @change="changeCameraPage1"
        :pagination="controlData.pagination">
        <span slot="relatedFlag" slot-scope="text, record">
          {{record.relatedFlag ? '关联':'不关联'}}
        </span>
        <span slot="startFlag" slot-scope="text, record" @click="trueFasleClick(record)">
          <a-switch :checked="record.startFlag===1?true:false" size="small"></a-switch>
        </span>
        <span slot="operation" slot-scope="text, record">
          <a @click="onSeeClick(record)">查看</a>
          <a-divider type="vertical"></a-divider>
          <a @click="onDeleClick(record)">删除</a>
        </span>
      </a-table>
    </div>

    <!-- 新建管控任务 -->
    <div class="control-flow-list" v-if="controlType == 'flow'">
      <!-- 新建管控tab切换 -->
      <div class="css-tabWrap">
        <div @click="tabCliak('config')">
          <a-icon type="reconciliation" :class="tabFlag === 'config' ? 'chenkedTab' : ''" />
          <p style="padding-top: 2px">管控任务配置</p>
        </div>
        <p>
          <span></span>
          <a-icon type="caret-right" />
        </p>
        <div @click="tabCliak('camera')">
          <a-icon type="video-camera" :class="tabFlag === 'camera' ? 'chenkedTab' : ''" />
          <p style="padding-top: 2px">关联镜头</p>
        </div>
        <p>
          <span></span>
          <a-icon type="caret-right" />
        </p>
        <div>
          <a-icon type="usergroup-delete" :class="tabFlag === 'user' ? 'chenkedTab' : ''" @click="tabCliak('user')" />
          <p style="padding-top: 2px">白名单配置</p>
        </div>
      </div>

      <!-- 管控配置任务 -->
      <div v-if="tabFlag == 'config'">
        <a-row>
          <a-form-model
            ref="ruleForm"
            :model="formData.form"
            :rules="formData.rules"
            :label-col="formData.labelCol"
            :wrapper-col="formData.wrapperCol">
            <a-row :gutter="8">
              <a-col :span="12">
                <a-form-model-item ref="name" label="任务名称" prop="groupName">
                  <a-input v-model="formData.form.groupName" />
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item label="关联主题" prop="planId" style="padding-left: 9px">
                  <a-select v-model="formData.form.planId" placeholder="请选择关联主题" disabled style="min-width: 424px">
                    <a-select-option v-for="(item, index) in cameraThemeArr"
                    :key="index"
                    :label="item.name"
                    :value="item.id">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-model-item label="管控时间" required prop="date1">
                  <a-range-picker
                    v-model="formData.form.date1"
                    format="YYYY-MM-DD HH:mm:ss"
                    valueFormat="YYYY-MM-DD HH:mm:ss"
                    style="width: 100%;"
                  />
                </a-form-model-item>
              </a-col> -->
              <a-col :span="12">
                <a-form-model-item label="管控时间" required>
                  <div style="display: flex;" class="css-time">
                    <a-date-picker
                      v-model="formData.form.date1"
                      show-time
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="开始时间"
                      @change="chageDate1"
                    />
                    <p style="margin: 0px 6px; color: #b1c0db">至</p>
                    <a-date-picker
                      v-model="formData.form.date2"
                      show-time
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="结束时间"
                      @change="chageDate2"
                    />
                  </div>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item label="是否启动" prop="startFlag">
                  <a-select v-model="formData.form.startFlag" @change="changeStartFlag" style="min-width: 426px;">
                    <a-select-option :value="0">不启动</a-select-option>
                    <a-select-option :value="1">启动</a-select-option>
                  </a-select>
                  <span style="color: red;" v-show="selectMessageFlag">{{ selectMessageData }}</span>
                </a-form-model-item>
              </a-col>
              <a-col :span="24" class="ant-col-24">
                <a-form-model-item label="任务说明" prop="comments">
                  <a-input type="textarea" v-model="formData.form.comments" placeholder="请写任务说明..."  style="height: 88px"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <!-- <a-col :span="8">
              <a-form-model-item label="批量管理" prop="type">
                <a-checkbox-group v-model="formData.form.type">
                  <a-checkbox :value="1" name="type">实时视频</a-checkbox>
                  <a-checkbox :value="2" name="type">云台控制</a-checkbox>
                  <a-checkbox :value="3" name="type">历史视频</a-checkbox>
                </a-checkbox-group>
              </a-form-model-item>
            </a-col> -->
          </a-form-model>
        </a-row>

        <div class="but-group">
          <a-button @click="nextStep('camera')">下一步</a-button>
          <a-button @click="keepFlowControl"  type='primary' :loading='loadingFlag'>保存</a-button>
        </div>
    </div>

      <!-- 镜头列表-穿梭框 -->
      <div v-else-if="tabFlag == 'camera'">
        <a-row>
          <a-col :span="10">
            <div style="margin: 8px 0px;">
              <div class="css-downSearch">
                  <a-row :gutter="8">
                    <a-col :span="12">
                      <a-select v-model="cameraThemeData" placeholder="不限主题" size="small"  @change="cameraThemeDataChange">
                        <a-select-option value="">不限主题</a-select-option>
                        <a-select-option v-for="(item, index) in cameraThemeArr"
                        :key="index"
                        :label="item.name"
                        :value="item.id">{{ item.name }}
                        </a-select-option>
                      </a-select>
                    </a-col>
                    <a-col :span="12">
                        <a-tree-select
                          size="small"
                          v-model="cameraOrgData"
                          tree-data-simple-mode
                          :dropdown-style="{ maxHeight: '400px', overflow: 'auto'}"
                          :tree-data="userOrgArr"
                          placeholder="不限制机构"
                          @change="cameraOrgDataChange"
                          :load-data="handleUserExpand">
                        </a-tree-select>
                    </a-col>
                  </a-row>
              </div>

              <div class="color232c38" style="margin: 8px 0px;" v-show="searchFlag">
                <a-row type="flex" justify="space-between" align="middle">
                  <a-col :span='4'>
                    列表类型:
                  </a-col>
                  <a-col :span='20'>
                    <a-radio-group v-model="flowControlData4.cameraRightPage.type" @change="cameraCheckboxChange">
                      <a-radio :value="2" name="type" style="margin-right: 0px;font-size: 12px;">保障镜头</a-radio>
                      <a-radio :value="0" name="type" style="margin-right: 0px;font-size: 12px;">主题镜头</a-radio>
                    </a-radio-group>
                  </a-col>
                </a-row>
              </div>

              <div class="color232c38" style="margin: 8px 0px;" v-show="searchFlag">
                <a-row type="flex" justify="space-between" align="middle">
                  <a-col :span='4'>
                    镜头类型:
                  </a-col>
                  <a-col :span='20'>
                    <a-radio-group v-model="flowControlData4.cameraRightPage.cameraType" @change="cameraCheckboxChange">
                      <a-radio :value="0" name="type" style="margin-right: 0px;font-size: 12px;">全部</a-radio>
                      <a-radio :value="1" name="type" style="margin-right: 0px;font-size: 12px;">一类点</a-radio>
                      <a-radio :value="2" name="type" style="margin-right: 0px;font-size: 12px;">二三类点</a-radio>
                      <a-radio :value="3" name="type" style="margin-right: 0px;font-size: 12px;">高点</a-radio>
                      <a-radio :value="4" name="type" style="margin-right: 0px;font-size: 12px;">人像</a-radio>
                      <a-radio :value="5" name="type" style="margin-right: 0px;font-size: 12px;">卡口</a-radio>
                    </a-radio-group>
                  </a-col>
                </a-row>
              </div>

              <div class="color232c38" style="margin: 8px 0px;" v-show="searchFlag">
                <a-row type="flex" justify="space-between" align="middle">
                  <a-col :span='3'>
                    防护圈:
                  </a-col>
                  <a-col :span='21'>
                    <a-checkbox-group v-model="flowControlData4.cameraRightPage.circleType" @change="cameraCheckboxChange">
                      <a-checkbox :value="1" name="type">核心圈</a-checkbox>
                      <a-checkbox :value="2" name="type">一级</a-checkbox>
                      <a-checkbox :value="3" name="type">二级</a-checkbox>
                      <a-checkbox :value="4" name="type">三级</a-checkbox>
                    </a-checkbox-group>
                  </a-col>
                </a-row>
              </div>
            </div>

            <div class="tab-title">
              <a-col :span="8">
                <span>镜头列表</span>
              </a-col>
              <div class="search-box">
                <a-row type="flex" justify="space-between" align="top">
                  <a-col :span='18'>
                    <a-input v-model="cameraListSearchVal2" placeholder="请输入所属机构/镜头名称搜索" size="small"/>
                  </a-col>
                  <a-col :span='6'>
                    <a-button type="primary" @click="cameraListSearch2" size="small">搜索</a-button>
                  </a-col>
                </a-row>
              </div>
            </div>

            <a-table
              :rowKey="record => record.cameraId"
              :row-selection="{selectedRowKeys:selectedRowKeys, onChange: onSelectChange}"
              :columns="flowControlData2.controlTableColumns"
              :data-source="flowControlData2.controlTableData"
              :customRow="handleControlClickRow"
              :indentSize="28"
              @change="changeCameraPage2"
              @expand="handleControlExpand"
              :scroll="{y: 350}"
              :pagination="flowControlData2.pagination"
            >
              <span slot="operation" slot-scope="text, record">
                <a @click="lookCamearDetails(record)">查看详情</a>
              </span>
            </a-table>
          </a-col>

          <a-col :span="2" style="padding-top: 5.5rem;">
            <div style="width:100%; text-align:center; padding-top: 14rem">
              <a-button type="primary" @click="addShowCamera">添加 》</a-button>
            </div>
            <div style="width:100%; text-align:center; padding-top: 1rem">
              <a-button type="primary" @click="deleteShowCamera">《 删除</a-button>
            </div>
          </a-col>

          <a-col :span="12" :style="searchFlag ? 'padding-top: 6.5rem;' : 'padding-top: 0rem;'">
            <div style="margin: 8px 0px 12px;" class="color232c38">
              <a-row type="flex" justify="space-between" align="middle">
                <a-col :span='3'>
                  批量管控:
                </a-col>
                <a-col :span='21'>
                  <a-checkbox-group v-model="formData.form.type" @change="controlTypeChange">
                    <a-checkbox :value="1" name="type">实时视频</a-checkbox>
                    <a-checkbox :value="2" name="type">云台控制</a-checkbox>
                    <a-checkbox :value="3" name="type">历史视频</a-checkbox>
                  </a-checkbox-group>
                  <span style="margin-left: 8px; font-size: 12px; color: red;" v-show="controlTypeFlag">注意：管控类型不能不选</span>
                </a-col>
              </a-row>
            </div>

            <a-row>
              <a-col :span="8">
                <span>已管控镜头</span>
              </a-col>
              <a-col :span="16">
                <div class="search-box">
                  <a-row>
                    <a-col :span='13'>
                      <a-input v-model="cameraListSearchVal1" placeholder="请输入镜头名称 /国标编号" size="small"/>
                    </a-col>
                    <a-col :span='5'>
                      <a-button type="primary" @click="cameraListSearch1" size="small" style="margin-left: 8px;">搜索</a-button>
                    </a-col>
                    <a-col :span='5'>
                      <a-button type="danger" size="small" style="margin-left: 8px;background-color: #ff7875;">Exce导入</a-button>
                    </a-col>
                  </a-row>
                </div>
              </a-col>
            </a-row>

            <a-table
              :rowKey="record => record.cameraId"
              :row-selection="{selectedRowKeys:selectedRowKeysRight, onChange: onSelectChangeRight}"
              :columns="flowControlData1.controlTableColumns"
              :data-source="flowControlData1.controlTableData"
              :customRow="handleControlClickRow"
              :indentSize="28"
              :scroll="{y: 350}"
              @expand="handleControlExpand"
              :pagination="flowControlData1.pagination">
              <span slot="controlTypeList" slot-scope="text, record" class="css-checkbox">
                <!--  record.controlTypeList-->
                <a-checkbox-group v-model="formData.form.type" disabled @change="checkboxGroup($event, record.cameraId)">
                  <a-checkbox :value="1" name="type">实时</a-checkbox>
                  <a-checkbox :value="2" name="type">云台</a-checkbox>
                  <a-checkbox :value="3" name="type">历史</a-checkbox>
                </a-checkbox-group>
                <!-- <a-checkbox :value="record.cameraId+'@-1'" disabled name="type" :ref="record.cameraId+'@-1'" @change="checkboxGroup($event, record.cameraId, 1)" :checked="record.controlTypeList.indexOf(1) > -1">实时</a-checkbox>
                <a-checkbox :value="record.cameraId+'@-2'" disabled name="type" :ref="record.cameraId+'@-2'" @change="checkboxGroup($event, record.cameraId, 2)" :checked="record.controlTypeList.indexOf(1) > -1">云台</a-checkbox>
                <a-checkbox :value="record.cameraId+'@-3'" disabled name="type" :ref="record.cameraId+'@-3'" @change="checkboxGroup($event, record.cameraId, 3)" :checked="record.controlTypeList.indexOf(1) > -1">历史</a-checkbox> -->
              </span>
              <span slot="operation" slot-scope="text, record">
                <a @click="lookCamearDetails(record)">查看详情</a> |
                <a @click="delCamera(record)">移除</a>
              </span>
            </a-table>
          </a-col>
        </a-row>

        <div class="but-group">
          <a-button @click="lastStep('config')">上一步</a-button>
          <a-button @click="nextStep('user')">下一步</a-button>
          <a-button @click="keepFlowControl"  type='primary' :loading='loadingFlag'>保存</a-button>
        </div>
      </div>


      <!-- 白名单用户-穿梭框 -->
      <div v-else>
        <a-row>
          <a-col :span="10">
            <div class="css-downSearch">
                <a-row :gutter="8" style="margin: 8px 0px;">
                  <a-col :span="12">
                      <a-select v-model="userGroupCheckedData" size="small" @change="userGroupChange">
                        <a-select-option value="">不限用户组</a-select-option>
                        <a-select-option v-for="(item, index) in userGroupArr"
                        :key="index"
                        :label="item.groupName"
                        :value="item.groupId">{{ item.groupName }}
                        </a-select-option>
                      </a-select>
                  </a-col>
                  <a-col :span="12">
                      <a-tree-select
                        size="small"
                        v-model="curUserOrgArr"
                        tree-data-simple-mode
                        :dropdown-style="{ maxHeight: '400px', overflow: 'auto'}"
                        :tree-data="userOrgArr"
                        placeholder="不限制机构"
                        @change="curUserOrgChange"
                        :load-data="handleUserExpand">
                      </a-tree-select>
                  </a-col>
                </a-row>
            </div>

            <div class="tab-title">
              <a-col :span="8">
                <span>用户列表</span>
              </a-col>
              <div class="search-box" style="padding: 0 0.6rem;">
                <a-row type="flex" justify="space-between" align="top">
                  <a-col :span='18'>
                    <a-input v-model="cameraListSearchVal" placeholder="请输入所属机构/用户姓名/账号搜索" size="small"/>
                  </a-col>
                  <a-col :span='6'>
                    <a-button type="primary" @click="cameraListSearch" size="small">搜索</a-button>
                  </a-col>
                </a-row>
              </div>
            </div>
            <a-table
              :rowKey="record => record.userId"
              :row-selection="{selectedRowKeys:selectedUsers, onChange: onChangeUser}"
              :columns="flowControlData4.controlTableColumns"
              :data-source="flowControlData4.controlTableData"
              :customRow="handleControlClickRow"
              :indentSize="28"
              @expand="handleControlExpand"
              :scroll="{y: 350}"
              @change="changeCameraPage3"
              :pagination="flowControlData4.pagination">
            </a-table>
          </a-col>
          <a-col :span="2">
            <div style="width:100%; text-align:center; padding-top: 14rem">
              <a-button type="primary" @click="addShowUsers">添加 》</a-button>
            </div>
             <div style="width:100%; text-align:center; padding-top: 1rem">
              <a-button type="primary" @click="deleteShowUsers">《 删除</a-button>
            </div>
          </a-col>
          <a-col :span="12" style="padding-top: 3rem;">
            <a-row>
              <a-col :span="8">
                <span>白名单用户</span>
              </a-col>
              <a-col :span="16">
                <div class="search-box">
                  <a-row>
                    <a-col :span='18'>
                      <a-input v-model="userListSearchVal1" placeholder="请输姓名/用户名" size="small"/>
                    </a-col>
                    <a-col :span='5'>
                      <a-button type="primary" @click="userListSearch1" size="small" style="margin-left: 8px;">搜索</a-button>
                    </a-col>
                  </a-row>
                </div>
              </a-col>
            </a-row>

            <a-table
              :rowKey="record => record.userId"
              :row-selection="{selectedRowKeys:selectedUsersRight, onChange: onChangeUserRight}"
              :columns="flowControlData3.controlTableColumns"
              :data-source="flowControlData3.controlTableData"
              :customRow="handleControlClickRow"
              :indentSize="28"
              :scroll="{y: 350}"
              @expand="handleControlExpand"
              :pagination="flowControlData3.pagination">
              <span slot="value4" slot-scope="text, record">
                <a @click="delUser(record)">移除</a>
              </span>
            </a-table>
          </a-col>
        </a-row>
        <div class="but-group">
          <a-button @click="lastStep('camera')">上一步</a-button>
          <a-button @click="keepFlowControl" type='primary' :loading='loadingFlag'>保存</a-button>
        </div>
      </div>
    </div>

    <a-modal title="设备信息" :visible="isDeviceNews" footer="" @cancel="handleDeviceNewsCancel" width="50%">
      <device-news ref="deviceNewsModal"></device-news>
    </a-modal>
  </div>
</template>

<script>
import deviceNews from './deviceNews'
import { mapState } from 'vuex'
import moment from 'moment'
import $http from '@/Http/http.js'
export default {
  components: {
    deviceNews
  },
  props: ['themeData'],
  computed: {
    ...mapState(['selectedCameraTypeData'])
  },
  data () {
    return {
      isDeviceNews: false,

      cameraThemeArr: '',
      controlTitle: '管控任务',
      controlType: 'task',
      controlSelectedData: 'task',
      selectedRowKeys: [],
      selectedRowKeysRight:[], // 右边选中镜头
      selectedUsers: [],
      selectedUsersRight: [], // 右边选中用户
      cameraSelectsobj: [],
      userSelectsobj: [],
      replaceFields: {
        title: 'orgName'
      },
      replaceTheme: {
        title: 'name'
      },
      // 管控任务表单数据
      controlData: {
        isShowControl: false,
        controlTableColumns: [
          { title: '任务名称', dataIndex: 'name', key: 'name' },
          { title: '创建时间', dataIndex: 'rowCreatetime', key: 'rowCreatetime' },
          { title: '关联主题', dataIndex: 'relatedFlag', key: 'relatedFlag', scopedSlots: { customRender: 'relatedFlag' } },
          { title: '管控开始时间', dataIndex: 'startTime', key: 'startTime' },
          { title: '管控结束时间', dataIndex: 'endTime', key: 'endTime' },
          { title: '管控镜头数', dataIndex: 'cameraCount', key: 'cameraCount' },
          { title: '白名单人数', dataIndex: 'userCount', key: 'userCount' },
          { title: '是否启动', dataIndex: 'startFlag', key: 'startFlag', scopedSlots: { customRender: 'startFlag' } },
          { title: '操作', dataIndex: 'operation', key: 'operation', scopedSlots: { customRender: 'operation' } },
        ],
        controlTableData: [],
        pagination: {
          position: 'bottom',
          size: "small",
          total: 10,
          pageNum: 1,
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10','20','30','40']
        },
      },
      formData: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
        form: {
          groupName: '',
          planId: '',
          comments: '',
          // date1: [],
          date1: undefined,
          date2: undefined,
          type: [1,2,3],
          startFlag: 0,
          cameraList: [],
          delCameraList:[],
          userList: [],
          delUserList: []
        },
        copyForm: {
          groupName: '',
          planId: '',
          comments: '',
          // date1: [],
          date1: undefined,
          date2: undefined,
          type: [1,2,3],
          startFlag: 0,
          cameraList: [],
          delCameraList:[],
          userList: [],
          delUserList: []
        },
        // 表单校验是否必填
        rules: {
          groupName: [
            { required: true, message: '请输入任务名称...', trigger: 'blur' },
            { min: 1, max: 100, message: 'Length should be 1 to 100', trigger: 'blur' },
          ],
          // region: [{ required: false, message: 'Please select Activity zone', trigger: 'change' }],
          // // date1: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
          // // date2: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
          // type: [{ type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }],
          // desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
          startFlag: [{ required: true, message: '是否启动不能为空...', trigger: 'change' }],
          comments: [{ required: true, message: '任务说明不能为空...', trigger: 'change' }],
        },
      },

      cameraListSearchVal: '',
      cameraListSearchVal1: '',
      cameraListSearchVal2: '',
      userListSearchVal1: '',
      // 已经关联镜头表格数据
      flowControlData1: {
        isShowControl: false,
        controlTableColumns: [
          { title: '镜头名称', dataIndex: 'cameraName', key: 'cameraName', ellipsis: true},
          { title: '镜头编码', dataIndex: 'gbCode', key: 'gbCode', ellipsis: true},
          { title: '管控类型', dataIndex: 'controlTypeList', key: 'controlTypeList', scopedSlots: { customRender: 'controlTypeList' }, width:180 },
          { title: '操作', dataIndex: 'operation', key: 'operation', scopedSlots: { customRender: 'operation' }, width:100 },
        ],
        controlTableData: [],
        pagination: {
          position: 'bottom',
          size: "small",
          total: 0,
          pageSize: 100,
          showSizeChanger: true,
          pageSizeOptions: ['100','200','300','400','500']
        },
      },
      // 关联镜头表格数据
      flowControlData2: {
        isShowControl: false,
        controlTableColumns: [
          { title: '镜头名称', dataIndex: 'cameraName', key: 'cameraName', ellipsis: true },
          { title: '镜头编码', dataIndex: 'gbCode', key: 'gbCode', ellipsis: true },
          { title: '操作', dataIndex: 'operation', key: 'operation', scopedSlots: { customRender: 'operation' }, width: 70},
        ],
        controlTableData: [],
        pagination: {
          position: 'bottom',
          size: "small",
          total: 0,
          pageSize: 100,
          showSizeChanger: true,
          pageSizeOptions: ['100','200','300','400','500']
        },
      },
      flowControlData3: {
        isShowControl: false,
        controlTableColumns: [
          { title: '姓名', dataIndex: 'nickName', key: 'nickName', },
          { title: '用户名', dataIndex: 'loginName', key: 'loginName', ellipsis: true},
          { title: '所属机构', dataIndex: 'orgName', key: 'orgName', ellipsis: true},
          { title: '操作', dataIndex: 'value4', key: 'value4', width: 60, scopedSlots: { customRender: 'value4' } },
        ],
        controlTableData: [],
        pagination: {
          position: 'bottom',
          size: "small",
          total: 0,
          pageSize: 100,
          showSizeChanger: true,
          pageSizeOptions: ['100','200','300','400', '500']
        }
      },
      flowControlData4: {
        isShowControl: false,
        controlTableColumns: [
          { title: '姓名', dataIndex: 'nickName', key: 'nickName', },
          { title: '用户名', dataIndex: 'loginName', key: 'loginName', ellipsis: true},
          { title: '所属机构', dataIndex: 'orgName', key: 'orgName', ellipsis: true},
        ],
        controlTableData: [],
        pagination: {
          position: 'bottom',
          size: "small",
          total: 80,
          pageNum: 1,
          pageSize: 100,
          showSizeChanger: true,
          pageSizeOptions: ['100','200','300','400','500']
        },
        cameraRightPage: {
          id: '',
          type: 2,
          content: '',
          pageNum: 1,
          pageSize: 100,
          circleType: [1, 2, 3, 4],
          cameraType: 0,
          circleType: [1, 2, 3, 4]
        }
      },
      // ==========xsm==========
      // 控制tab
      tabFlag: 'config',
      cloneControlTableData: [], // 备份已管控镜头
      cloneWhiteList: [], // 备份白名单
      userGroupArr: [], // 用户组下拉数据
      userOrgArr: [], // 用户机构下拉数据
      curUserOrgArr: '10', // 用户机构选中数据
      userGroupCheckedData: '', // 用户组选中数据
      cameraThemeData: '', // 镜头主题选中数据
      cameraOrgData: undefined, // 镜头选中机构
      userTableDataType: '1', // 判断用户table数据是按用户组【'0'】还是机构【'1'】
      cameraTableDataType: 0, // 判断镜头table数据是按主题【'0'】还是机构【'1'】
      selectMessageFlag: false, // 启动提示
      selectMessageData: '', // 启动提示内容
      loadingFlag: false, // 提示保存中loading
      searchFlag: true, // 控制关联镜头主题下的搜索
      controlTypeFlag: false, // 批量管控选择提示
    }
  },

  methods: {
    // 初始化
    init() {
      const self = this
      self.formData.form.region = self.themeData.id
    },

    // 点击×
    closeFlowControl() {
      const self = this
      self.controlTitle = '管控任务'
      self.controlData.isShowControl = false
      self.$emit('closeControl', self.controlData)
    },

    // 新建管控任务
    addNewControlTask() {
      const self = this
      self.getUserList()
      self.controlTitle = '取流管控'
      self.controlType = 'flow'
      self.formData.form = JSON.parse(JSON.stringify(self.formData.copyForm))
      self.flowControlData1.controlTableData = []
      self.cloneControlTableData = [] // 备份已管控镜头
      self.flowControlData1.pagination.total = 0
      self.flowControlData3.controlTableData = []
      self.cloneWhiteList = [] // 备份白名单
      self.flowControlData3.pagination.total = 0
      this.formData.form.planId = this.selectedCameraTypeData.id
      this.flowControlData4.cameraRightPage.id = self.themeData.id
      this.cameraThemeData = this.selectedCameraTypeData.id ? this.selectedCameraTypeData.id : ''
      this.getCameraList()
      this.tabFlag = 'config'
    },
    // 查看
    onSeeClick(val) {
      const self = this
      self.controlType = 'flow'
      self.formData.form.groupName = val.name
      self.formData.form.planId = val.planId
      this.cameraThemeData = val.planId ? val.planId : ''
      self.formData.form.date1 = val.startTime
      self.formData.form.date2 = val.endTime
      self.formData.form.comments = val.comments
      self.formData.form.startFlag = val.startFlag
      self.formData.form.groupId = val.id
      self.getControlCameraList(val)
      self.getglbndData(val)
      this.tabFlag = 'config'
      this.cameraThemeData = val.planId ? val.planId : ''
      self.getCameraList()
      self.getUserList()
      if(val.planId){
        this.searchFlag = true
        this.cameraOrgData = undefined
        this.flowControlData4.cameraRightPage.type = 2
        this.flowControlData4.cameraRightPage.id = val.planId
      }else{
        this.searchFlag = false
        this.cameraOrgData = '10'
        this.flowControlData4.cameraRightPage.type = 1
        this.flowControlData4.cameraRightPage.id = '10'
      }
    },
    // 点击取消
    cancelFlowControl() {
      const self = this
      self.controlTitle = '管控任务'
      self.controlType = 'task'
    },

    // 点击保存
    async keepFlowControl() {
      // 判断必填项是否为空
      if(!this.formData.form.groupName || !this.formData.form.date1 || !this.formData.form.date2 || !this.formData.form.comments){
        this.$message.warning('必填项不能为空')
        return
      }
      if(this.controlTypeFlag){
        this.$message.warning('管控类型不能不选')
        return
      }

      this.loadingFlag = true

      var cameraList = []
      var userList = []
      this.formData.form.startTime = this.formData.form.date1
      this.formData.form.endTime = this.formData.form.date2
      // this.flowControlData1.controlTableData.forEach(item => {
      //   cameraList.push({
      //     id: item.cameraId,
      //     type: this.formData.form.type
      //   })
      // })
      // this.flowControlData3.controlTableData.forEach(item => {
      //   userList.push(item.userId)
      // })
      this.cloneControlTableData.forEach(item => {
        cameraList.push({
          id: item.cameraId,
          type: this.formData.form.type
        })
      })
      this.cloneWhiteList.forEach(item => {
        userList.push(item.userId)
      })

      // 数据
      const data = {
        cameraList: cameraList,
        delCameraList: [],
        info: this.formData.form,
        userList: userList,
        delUserList: []
      }

      const info = await this.$postAxios('/api/limit/addLimitTaskFullInfo', data)
      if (info == 'success') {
        this.loadingFlag = false
        if (this.formData.form.groupId) {
          this.$message.success('修改成功')
        } else {
          this.$message.success('新增成功')
        }
        this.cancelFlowControl()
        this.getControlTaskList()
        this.controlTitle = '管控任务'
        this.controlType = 'task'
      }else{
        this.$message.success('保存失败')
        this.loadingFlag = false
      }
    },

    // 监听防护圈，镜头类型
    cameraCheckboxChange () {
      this.getCameraList()
    },
    cameraListSearch() {
      this.getUserList()
    },

    // 右侧镜头搜索
    cameraListSearch2() {
      this.flowControlData4.cameraRightPage.content = this.cameraListSearchVal2
      this.getCameraList()
    },
    // 镜头组/镜头机构列表 点击事件
    handleControlClickRow(record, index) {
      const self = this
      return {
        on: {
          click: () => {
          }
        }
      }
    },
    // 镜头组/镜头机构列表 扩展加载数据
    handleControlExpand(expended, record) {
      const self = this
      // if(expended && record.children.length == 0) {
      //   self.getCameraOrgList(record)
      // }
    },


    /****** 数据获取 *****/
    // 获取镜头主题列表
    async getControlTaskList() {
      const self = this
      const data = await this.$axios('/api/limit/getLimitTaskPlanList', {
        id: '',
        // type: '123',
        pageNum: self.controlData.pagination.pageNum,
        pageSize: self.controlData.pagination.pageSize,
      })
      self.controlData.controlTableData = data.list
      self.controlData.pagination.total = data.total
    },
    // 获取管控任务列表
    async getThemeList() {
      const self = this
      const data = await this.$axios('/api/userShotLinkage/getPlanListByName', {
        name: "",
        pageNum: 1,
        pageSize: 100
      })
      let dataList = data.list
      self.cameraThemeArr = dataList // 数据保存
    },
    // 获取镜头列表
    async getCameraList() {
      const self = this
      const data = await this.$postAxios('/api/userShotLinkage/getCameraInfoBySearch', self.flowControlData4.cameraRightPage)
      self.flowControlData2.controlTableData = data.list
      self.flowControlData2.pagination.total = data.total
    },
    // 获取用户列表
    async getUserList() {
      const self = this
      const data = await this.$axios('/api/userShotLinkage/getUserInfoBySearch', {
        id: self.userTableDataType == '1' ? self.curUserOrgArr : self.userGroupCheckedData,
        type: self.userTableDataType,
        content: self.cameraListSearchVal,
        pageNum: self.flowControlData4.pagination.pageNum,
        pageSize: self.flowControlData4.pagination.pageSize,
      })
      self.flowControlData4.controlTableData = data.list
      self.flowControlData4.pagination.total = data.total
    },
    // 获镜头列表 - 已管控
    async getControlCameraList(val) {
      const self = this
      const data = await this.$axios('/api/limit/getLimitTaskCameraListById', {
        id: val.id,
        type: '123',
        pageNum: 1,
        pageSize: 1000
        // pageSize: self.flowControlData1.pagination.pageSize,
      })
      self.flowControlData1.controlTableData = data.list
      self.cloneControlTableData = data.list // 备份已管控镜头
      self.formData.form.type = data.list[0].controlTypeList
      self.flowControlData1.pagination.total = data.total
    },
    // 获取户列表 - 白名单
    async getglbndData (value) {
      const self = this
      const data = await this.$axios('/api/limit/getLimitTaskUserListById', {
        id: value.id,
        pageSize: 1000,
        pageNum: 1
      })
      self.flowControlData3.controlTableData = data.list
      self.cloneWhiteList = data.list // 备份白名单
      self.flowControlData3.pagination.total = data.total
    },

    // 删除管控任务
    onDeleClick (info) {
      var that = this
      that.$confirm({
        title: '确定删除管控任务?',
        content: '要删除的管控任务名称：' + info.name,
        okText: '确认',
        cancelText: '取消',
        onOk () {
          (async () => {
            const data = await that.$axios('/api/limit/clearLimitTaskById', {
              id: info.id,
              type: 0
            })
            if (data === 'success') {
              that.$message.success('删除成功')
              setTimeout(() => {
                that.getControlTaskList()
              },100)
            }
          })()
        }
      })
    },
    // 镜头分页
    changeCameraPage2 (page, size, sot) {
      this.flowControlData4.cameraRightPage.pageNum = page.current
      this.flowControlData4.cameraRightPage.pageSize = page.pageSize
      this.getCameraList()
    },
    // 左边镜头选中
    onSelectChange (selectedRowKeys) {
      console.log('左边镜头选中')
      console.log(selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    // 右边用户选择
    onChangeUser (users) {
      this.selectedUsers = users
    },

    // 添加镜头
    addShowCamera () {
      const arr = []
      this.flowControlData2.controlTableData.forEach(v => {
        this.selectedRowKeys.forEach(item => {
          if (v.cameraId === item) {
            v.controlTypeList = this.formData.form.type
            arr.push(v)
          }
        })
      })
      if (this.flowControlData1.controlTableData.length > 0) {
        let arr1 = this.flowControlData1.controlTableData
        if (arr.length > 0) {
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr1.length; j++) {
              if (arr[i] != undefined && arr1[j].cameraId === arr[i].cameraId) {
                arr.splice(i, 1)
                i--
              }
            }
          }
        }
        this.flowControlData1.controlTableData = [...this.flowControlData1.controlTableData, ...arr]
      } else {
        this.flowControlData1.controlTableData = arr
      }

      if (this.cloneControlTableData.length > 0) {
        let arr1 = this.cloneControlTableData
        if (arr.length > 0) {
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr1.length; j++) {
              if (arr[i] != undefined && arr1[j].cameraId === arr[i].cameraId) {
                arr.splice(i, 1)
                i--
              }
            }
          }
        }
        this.cloneControlTableData = [...this.cloneControlTableData, ...arr]
      } else {
        this.cloneControlTableData = arr
      }
      // this.formData.form.cameraList[0].idList = this.selectedRowKeys
      this.selectedRowKeys.forEach(v => {
        const json = {
          id: v,
          type: [1,2,3]
        }
        this.formData.form.cameraList.push(json)
      })
      this.cameraSelectsobj = arr

      this.flowControlData1.pagination.total = this.flowControlData1.controlTableData.length
    },
    // 添加用户
    addShowUsers () {
      const arr = []
      this.flowControlData4.controlTableData.forEach(v => {
        this.selectedUsers.forEach(item => {
          if (v.userId === item) {
            arr.push(v)
          }
        })
      })
      // 去重
      if (this.flowControlData3.controlTableData.length > 0) {
        let arr1 = this.flowControlData3.controlTableData
        if (arr.length > 0) {
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr1.length; j++) {
              if (arr[i] != undefined && arr1[j].userId === arr[i].userId) {
                arr.splice(i, 1)
                i--
              }
            }
          }
        }
        this.flowControlData3.controlTableData = [...this.flowControlData3.controlTableData, ...arr]
        var copyArr = JSON.stringify(this.flowControlData3.controlTableData)
        this.cloneWhiteList = JSON.parse(copyArr) // 备份白名单
      } else {
        this.flowControlData3.controlTableData = arr
        var copyArr = JSON.stringify(this.flowControlData3.controlTableData)
        this.cloneWhiteList = JSON.parse(copyArr) // 备份白名单
      }
      this.formData.form.userList = this.selectedUsers
      this.userSelectsobj = arr
      this.flowControlData3.pagination.total = this.flowControlData3.controlTableData.length
    },

    // 删除镜头
    delCamera (data) {
      if (this.formData.form.cameraList.length > 0) {
        this.formData.form.cameraList.forEach((v, index) => {
          if (v.idList === data.cameraId) {
            this.formData.form.cameraList.splice(index, 1)
          }
        })
        this.cameraSelectsobj.forEach((v, index) => {
          if (v === data.cameraId) {
            this.cameraSelectsobj.splice(index, 1)
          }
        })
      }
      this.flowControlData1.controlTableData.forEach((v,index) => {
        if (v.cameraId === data.cameraId) {
          this.flowControlData1.controlTableData.splice(index, 1)
        }
      })
      this.cloneControlTableData.forEach((item, index) => {
        if (item.cameraId === data.cameraId) {
          this.cloneControlTableData.splice(index, 1)
        }
      })
      // 删除同时去除勾选
      this.selectedRowKeys.forEach((item, index) => {
        if (item === data.cameraId) {
          this.selectedRowKeys.splice(index, 1)
        }
      })

      this.flowControlData1.pagination.total = this.flowControlData1.controlTableData.length
    },

    // 删除用户
    delUser (data) {
      if (this.formData.form.userList.length > 0) {
        this.formData.form.userList.forEach((v, index) => {
          if (v === data.userId) {
            this.formData.form.userList.splice(index, 1)
          }
        })
        this.userSelectsobj.forEach((v, index) => {
          if (v === data.cameraId) {
            this.userSelectsobj.splice(index, 1)
          }
        })
      }

      // 控制选中table
      this.flowControlData3.controlTableData.forEach((v,index) => {
        if (v.userId === data.userId) {
          this.flowControlData3.controlTableData.splice(index, 1)
        }
      })

      this.cloneWhiteList.forEach((v,index) => {
        if (v.userId === data.userId) {
          this.cloneWhiteList.splice(index, 1)
        }
      })
      this.flowControlData3.pagination.total = this.flowControlData3.controlTableData.length
    },

    checkboxGroup (e,id,nub) {
      console.log('监听复选框')
      console.log(e)
      console.log(id)
      console.log(nub)
      this.$refs[id+'@-'+nub].checked = e.target.checked
      // console.log(e)
      // e.target.checked = !e.target.checked
      // e.target.defaultChecked = !e.target.defaultChecked
      // this.flowControlData1.controlTableData.forEach(v => {
      //   if (v.cameraId === id) {
      //     this.$set(v, 'controlTypeList', e)
      //     // console.log(v)
      //   }
      // })
      // console.log(this.flowControlData1.controlTableData)
    },



    // 获取主题下的所有镜头
    async getThemeCameraList () {
      const data = await this.$postAxios('/api/userShotLinkage/getCameraInfoBySearch', {
        id: this.selectedCameraTypeData.id,
        type: 0,
        content: '',
        circleType: [1, 2, 3, 4],
        cameraType: 0,
        pageNum: 1,
        pageSize: 10
      })
      // console.log(data.list)
    },


    // ==============xsm=============
    //  时间选择改变方法
    chageDate1 (time) {
      if(time){
        var currentPicker = moment(time).format('YYYY-MM-DD HH:mm:ss')
        this.formData.form.date1 = currentPicker
      }

    },
    chageDate2 (time) {
      if(time){
        var currentPicker = moment(time).format('YYYY-MM-DD HH:mm:ss')
        this.formData.form.date2 = currentPicker
      }
    },

    // 监听启动
    changeStartFlag (val) {
      if(val === 1) {
        if(Number(new Date().getTime()) < Number(new Date(this.formData.form.date1).getTime())){
          this.selectMessageFlag = true
          this.selectMessageData = '启动配置未生效：当前未达到管控时间，请重新调整管控时间'
          this.formData.form.startFlag = 0
        }else if(Number(new Date().getTime()) > Number(new Date(this.formData.form.date2).getTime())){
          this.selectMessageFlag = true
          this.selectMessageData = '启动配置未生效：管控已过期，请重新调整管控时间'
          this.formData.form.startFlag = 0
        }else{
          this.selectMessageFlag = false
          this.selectMessageData = ''
        }
      }
    },

    // 开关
    async trueFasleClick (data) {
      var that = this
      console.log('点击开关')
      console.log(data)
      const info = await this.$postAxios('/api/limit/addLimitTaskFullInfo', {
        info: {
          groupId: data.id,
          startFlag: data.startFlag === 1 ? 0 : 1,
          svalidState: 1,
          startTime: data.startTime,
          endTime: data.endTime,
          groupName: data.name
        }
      })
      if (info == 'success') {
        setTimeout(function () {
          that.getControlTaskList();
        }, 500)
      }
    },

    // 点击tab
    tabCliak (data) {
      if(this.formData.form.groupName && this.formData.form.date1 && this.formData.form.date2 && this.formData.form.comments){
        this.tabFlag = data
      }else{
        this.$message.warning('必填项不能为空')
      }
      //  this.tabFlag = data
    },

    //点击下一步
    nextStep (data) {
      if(this.formData.form.groupName && this.formData.form.date1 && this.formData.form.date2 && this.formData.form.comments){
        if(this.controlTypeFlag){
          this.$message.warning('管控类型不能不选')
          return
        }else{
          this.tabFlag = data
        }
      }else{
        this.$message.warning('必填项不能为空')
      }
    },

    // 点击上一步
    lastStep (data) {
      if(this.controlTypeFlag){
          this.$message.warning('管控类型不能不选')
          return
        }else{
          this.tabFlag = data
        }
    },

    // 监听右边选中镜头
    onSelectChangeRight ( data ) {
      this.selectedRowKeysRight = data
    },

    // 批量移除选中镜头
    deleteShowCamera () {
      const arr = []
      const arr2 = []
      this.flowControlData1.controlTableData.forEach(v => {
        this.selectedRowKeysRight.forEach(item => {
          if (v.cameraId === item) {
            arr.push(v)
          }
        })
      })

      this.cloneControlTableData.forEach(v => {
        this.selectedRowKeysRight.forEach(item => {
          if (v.cameraId === item) {
            arr2.push(v)
          }
        })
      })

      if (this.formData.form.cameraList.length > 0) {
        arr.forEach((item) => {
          this.formData.form.cameraList.forEach((v, index) => {
            if (v.idList === item.cameraId) {
              this.formData.form.cameraList.splice(index, 1)
            }
          })
          this.cameraSelectsobj.forEach((v, index) => {
            if (v === item.cameraId) {
              this.cameraSelectsobj.splice(index, 1)
            }
          })
        })
      }
      arr.forEach((item) => {
        this.flowControlData1.controlTableData.forEach((v,index) => {
           if (v.cameraId === item.cameraId) {
            this.flowControlData1.controlTableData.splice(index, 1)
          }
        })
      })

      arr2.forEach((item) => {
        this.cloneControlTableData.forEach((v,index) => {
           if (v.cameraId === item.cameraId) {
            this.cloneControlTableData.splice(index, 1)
          }
        })
      })
      // 删除同时去除勾选
      arr.forEach((ele) => {
        this.selectedRowKeys.forEach((item, index) => {
          if (item === ele.cameraId) {
            this.selectedRowKeys.splice(index, 1)
          }
        })
        // 同时删除勾选中的数据
        this.selectedRowKeysRight.forEach((item, index) => {
          if (item === ele.cameraId) {
            this.selectedRowKeysRight.splice(index, 1)
          }
        })
      })

      this.flowControlData1.pagination.total = this.flowControlData1.controlTableData.length
    },

    // 监听右边选中用户
    onChangeUserRight (data) {
      this.selectedUsersRight = data
    },
    // 批量移除选中白名单用户
    deleteShowUsers () {
      const arr = []
      const arr2 = []
      this.flowControlData3.controlTableData.forEach(v => {
        this.selectedUsersRight.forEach(item => {
          if (v.userId === item) {
            arr.push(v)
          }
        })
      })

      this.cloneWhiteList.forEach(v => {
        this.selectedUsersRight.forEach(item => {
          if (v.userId === item) {
            arr2.push(v)
          }
        })
      })

      if (this.formData.form.userList.length > 0) {
        arr.forEach((item) => {
          this.formData.form.userList.forEach((v, index) => {
            if (v === item.userId) {
              this.formData.form.userList.splice(index, 1)
            }
          })
        })

        arr.forEach((item) => {
          this.userSelectsobj.forEach((v, index) => {
            if (v === item.userId) {
              this.userSelectsobj.splice(index, 1)
            }
          })
        })

      }

      // 控制选中table
      arr.forEach((item) => {
        this.flowControlData3.controlTableData.forEach((v,index) => {
          if (v.userId === item.userId) {
            this.flowControlData3.controlTableData.splice(index, 1)
          }
        })

        // 同时删除勾选中的数据
        this.selectedUsersRight.forEach((ele, index) => {
          if (ele === item.userId) {
            this.selectedUsersRight.splice(index, 1)
          }
        })
      })

      arr2.forEach((item) => {
        this.cloneWhiteList.forEach((v,index) => {
          if (v.userId === item.userId) {
            this.cloneWhiteList.splice(index, 1)
          }
        })
      })

      this.flowControlData3.pagination.total = this.flowControlData3.controlTableData.length
    },

    // 检索已管控的镜头
    cameraListSearch1() {
      var searchVal = this.cameraListSearchVal1.replace(/\s*/g,"") // 字符串清楚空格
      if (searchVal) {
        let newArr = []
        this.cloneControlTableData.forEach((item) => {
          if(item.cameraName && item.gbCode){
            if(item.cameraName.indexOf(searchVal) != -1 || item.gbCode.indexOf(searchVal) != -1){
              newArr.push(item)
            }
          }else if(item.cameraName){
            if(item.cameraName.indexOf(searchVal) != -1){
              newArr.push(item)
            }
          }else if(item.gbCode){
            if(item.gbCode.indexOf(searchVal) != -1){
              newArr.push(item)
            }
          }
        })
        this.flowControlData1.controlTableData = newArr
      }else{
        this.flowControlData1.controlTableData = this.cloneControlTableData
      }
      this.flowControlData1.pagination.total = this.flowControlData1.controlTableData.length
    },

    // 检索已管控的白名单用户
    userListSearch1 () {
      var searchVal = this.userListSearchVal1.replace(/\s*/g,"") // 字符串清楚空格
      if (searchVal) {
        let newArr = []
        this.cloneWhiteList.forEach((item) => {
          if(item.nickName && item.loginName) {
            if(item.nickName.indexOf(searchVal) != -1 || item.loginName.indexOf(searchVal) != -1){
              newArr.push(item)
            }
          }else if(item.nickName){
            if(item.nickName.indexOf(searchVal) != -1){
              newArr.push(item)
            }
          }else if(item.loginName){
            if(item.loginName.indexOf(searchVal) != -1){
              newArr.push(item)
            }
          }
        })
        this.flowControlData3.controlTableData = newArr
      }else{
        this.flowControlData3.controlTableData = this.cloneWhiteList
      }

      this.flowControlData3.pagination.total = this.flowControlData3.controlTableData.length
    },
    // 获取用户组下拉数据
    async getUserGroupList() {
      const self = this
      const data = await this.$axios('/api/userShotLinkage/getUserGroupList', {
        pageNum: 1,
        pageSize: 100
      })
      let dataList = data.list
      dataList.map(item => {
        item.key = item.id
        item.name = item.name
        item.value = item.name
        item.isLeaf = true
        item.scopedSlots = {
          title: 'title',
        }
      })
      console.log('获取用户组下拉数据');
      console.log(dataList);
      self.userGroupArr = dataList;
    },

    // 获取机构列表下拉数据
    async getUserOrgList(val) {
      const that = this
      if(val == '10' ){ return }
      let url = '/api/userShotLinkage/getOrgShotInfoNew'
      let param = { orgId: val ? val : '10'}
      const data = await this.$axios(url, param)
      var arr = []
      data.list.forEach(function (item) {
        arr.push({
          id: item.orgId,
          pId: item.pId,
          value: item.orgId,
          orgCode: item.orgCode,
          title : item.orgName,
          faultNum: item.faultNum,
          orderNum: item.orderNum,
          totalNum: item.totalNum
        })
      })
      that.userOrgArr = that.userOrgArr.concat(arr) // 数据保存

    },
    handleUserExpand (treeNode) {
      var that = this
      return new Promise(resolve => {
        const { id } = treeNode.dataRef
        that.getUserOrgList(id)
        resolve();
      })
    },

    // 选中机构数节点回调
    curUserOrgChange(value) {
      this.userGroupCheckedData = ''
      this.userTableDataType = '1'
      this.getUserList()
    },

    // 选中下来用户组回调
    userGroupChange(value){
      if(value){
        this.curUserOrgArr = undefined
        this.userTableDataType = '0'
      }else{
        this.userTableDataType = '1'
        this.curUserOrgArr = '10'
      }
      this.getUserList()
    },
    // 监听镜头主题
    cameraThemeDataChange (value) {
      if(value){
        this.searchFlag = true
        this.cameraOrgData = undefined
        this.flowControlData4.cameraRightPage.type = 2
        this.flowControlData4.cameraRightPage.id = value
      }else{
        this.searchFlag = false
        this.cameraOrgData = '10'
        this.flowControlData4.cameraRightPage.type = 1
        this.flowControlData4.cameraRightPage.id = '10'
      }
      this.getCameraList()
    },
    // 监听镜头机构
    cameraOrgDataChange (value) {
      this.searchFlag = false
      this.cameraThemeData = ''
      this.flowControlData4.cameraRightPage.type = 1
      this.flowControlData4.cameraRightPage.id = value
      this.getCameraList()
    },

    // 用户分页
    changeCameraPage3 ( page, size, sot ) {
      this.flowControlData4.pagination.pageNum = page.current
      this.flowControlData4.pagination.pageSize = page.pageSize
      this.getUserList()
    },

    // 管控列表分页
    changeCameraPage1 ( page, size, sot ) {
      this.controlData.pagination.pageNum = page.current
      this.controlData.pagination.pageSize = page.pageSize
      this.getControlTaskList()
    },

    // 监听批量管控多选
    controlTypeChange () {
      if(this.formData.form.type.length <= 0){
        this.controlTypeFlag = true
      }else{
        this.controlTypeFlag = false
      }
    },

    // 镜头查看详情
    lookCamearDetails (data) {
      const self = this
      self.isDeviceNews = true
      self.$nextTick(() => {
        if (self.$refs.deviceNewsModal) {
          self.$refs.deviceNewsModal.init(data)
        }
      })
    },
    // 关闭设备信息弹框
    handleDeviceNewsCancel() {
      const self = this
      self.isDeviceNews = false
    },
  },

  // ===钩子函数====
  created () {
    // 获取镜头主题列表
    this.getThemeList()
    this.getControlTaskList()
    // this.getCameraList()
    // this.getUserList()
    // this.getOrgArr()
    this.getThemeCameraList()
    this.getUserGroupList()
    this.getUserOrgList()
  },
}
</script>

<style lang="scss">
.flowControl {
  border: 1px solid #2193ef;
  margin-top: 16px;
  position: relative;
  width: 100%;
  .list-title {
    width: 100%;
    background: $theme-color;
    .anticon {
      float: right;
      height: 3rem;
      line-height: 3rem;
    }
  }
  .control-task-list {
    padding: 1rem;
    .ant-btn {
      margin-bottom: 1rem;
    }
  }
  .control-flow-list {
    padding: 1rem;
    .css-tag.block {
      float: none;
    }
    .but-group {
      text-align: right;
      .ant-btn {
        margin-right: 1rem;
      }
    }
    .tab-title {
      height: 2.5rem;
      line-height: 2.5rem;
      .css-tag.block {
        float: left;
      }
      .search-box {
        width: 20rem;
        float: right;
        margin: 0;
      }
    }
  }
}
.css-orgList{
  border: 1px solid $theme-color-active;
  padding: 3px 5px;
  cursor: pointer;
  &:nth-of-type(1) {
    border-right: none;
    border-radius: 3px 0 0 3px;
  }
  &:nth-of-type(2) {
    border-radius: 0 3px 3px 0;
  }
  .anticon{
    font-size: 12px !important;
    margin: .5rem 1px !important;
  }
}
</style>
<style lang="scss">
.ant-calendar-range-picker-separator{
  color: $theme-color-disabled;
}
.ant-checkbox-disabled + span{
  color: inherit;
}
.ant-tree-node-content-wrapper,.ant-tree{
  color: $theme-color-disabled !important;
}
.ant-tree li .ant-tree-node-content-wrapper:hover{
  background-color: $theme-bar !important;
}
.ant-table-fixed-header > .ant-table-content > .ant-table-scroll > .ant-table-body{
  background: #00172D;
}
.ant-table-fixed-header .ant-table-scroll .ant-table-header{
  background: #00172D;
  margin-bottom: -27px !important;
  padding-bottom: 20px !important;
}
.css-downSearch .ant-form-item{
  margin: 8px 0px;
}
.ant-table-placeholder{
      background: #00172D;
      border: 1px solid #00172D;
}
.ant-empty-description{
  color: #fff;
}
</style>
<style lang="scss">
  .control-flow-list{
    .css-tabWrap{
      height: 109px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 24px 80px 0px;
      div{
        width: 88px;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        color: #d8d8d8;
        i{
          font-size: 40px;
        }
      }
      p{
        padding-top: 12px;
        span{
          display: inline-block;
          height: 6px;
          width: 285px;
          border-top: 1px dashed;
          margin-right: -2px;
        }
      }
      .chenkedTab{
        color: #2193fe;
      }
    }
    .color232c38{background: #232c38;}
    .ant-col-24 .ant-col-6{width: 8%;}
    .ant-col-24 .ant-col-18{width: 92%;}
    .ant-form-item-control, .ant-form-item-label{line-height: 32px;}
    .ant-col-6{width: auto;}
    span.ant-radio + *{padding-left: 4px;}
    .ant-radio-wrapper, .ant-checkbox-wrapper{color: #b1c0db;}
    .css-checkbox .ant-checkbox + span{padding-right: 4px;padding-left: 4px; font-size: 12px;}
    .css-checkbox .ant-checkbox-wrapper + .ant-checkbox-wrapper{margin-left: 8px; font-size: 12px;}
    .css-time .ant-calendar-picker{min-width: 182px !important;}
  }

</style>
