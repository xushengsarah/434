<template>
  <div class="main">
    <div class="content">
      <div class="title">
        <a-button class="css-goBack" @click="$router.go(-1)">返回</a-button>
        <span>用户组管理</span>
      </div>
      <div class="css-form">
        <a-form-model class="css-boxForm" ref="ruleForm" :model="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-row :gutter="24">
            <a-col :span="5">
              <a-form-model-item label="用户组名称" prop="userGroupName">
                <a-input v-model="form.userGroupName" allow-clear placeholder="请输入用户姓名/账号" />
              </a-form-model-item>
            </a-col>
            <a-col :span="11">
              <a-form-model-item label="创建时间">
              <a-row>
                <a-col :span="8">
                  <a-radio-group class="padding-r-12" v-model="radioType" button-style="solid" size="small" @change="timeChange">
                    <a-radio-button value="3">近3天</a-radio-button>
                    <a-radio-button value="7">近7天</a-radio-button>
                    <a-radio-button value="30">近一个月</a-radio-button>
                  </a-radio-group>
                </a-col>
                <a-col :span="6">
                  <a-form-model-item class="inline-b" prop="startTime">
                    <a-date-picker
                      show-time
                      allow-clear
                      v-model="form.startTime"
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="开始时间"
                      :disabled-date="disabledStartDate"
                      @openChange="handleStartOpenChange"
                      @change="oncChangeStartTime"
                    ></a-date-picker>
                  </a-form-model-item>
                </a-col>
                <a-col :span="1" :offset="2">
                  <!-- <div class="label-color padding-l-8 padding-r-8 font-s-10">至</div> -->
                  <div class="label-color font-s-10">至</div>
                </a-col>
                <a-col :span="6">
                  <a-form-model-item class="inline-b" prop="endTime">
                    <a-date-picker
                      show-time
                      v-model="form.endTime"
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="结束时间"
                      :disabled-date="disabledEndDate"
                      :open="endOpen"
                      @openChange="handleEndOpenChange"
                      @change="oncChangeEndTime"
                    ></a-date-picker>
                  </a-form-model-item>
                </a-col>
              </a-row>
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-form-model-item>
                <a-button @click="getGroup">搜索</a-button>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
      <div class="css-option">
        <a-button @click="addUsersGroup">新增</a-button>
        <a-button class="css-goBack" @click="delGoups">删除</a-button>
      </div>
      <div class="css-tables">
        <a-table
          class="list-table"
          :rowKey="record => record.groupId"
          :row-selection="{selectedRowKeys:groupIdList, onChange: onSelectGroup}"
          :columns="listTableColumns"
          :data-source="listData"
          @change="changeGroups"
          :pagination= listPagination>
          <span slot="value4" slot-scope="text, record">
            <a @click="onEditClick(record)">编辑</a>
            <a-divider type="vertical"></a-divider>
            <a @click="delGoups(record)">移除</a>
          </span>
        </a-table>
      </div>
    </div>

    <a-modal
      class="css-msgProp"
      :visible="isMsg"
      :title="modalTitle"
      @cancel="isMsg=false"
      @ok="submit"
      :mask="false"
      width="65%"
      height="90%"
      :dialogStyle="{
        'z-index': '9999',
        'width': '100%',
        'top': '80px'
      }">
      <div class="css-propContent">
        <a-form-model
          ref="addGroup"
          class="css-boxForm"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          :model="addForm"
          :rules="rules"
          style="margin-top:20px">
            <a-row :gutter="{xs: 80, md: 24}" justify="center" style="overflow:hidden;">
              <a-col :span="10">
                <a-form-model-item class="users-name" label="用户组名称" prop="groupName">
                  <a-input v-model="addForm.groupName" allow-clear placeholder="请输入用户组名称" />
                </a-form-model-item>
              </a-col>
            </a-row>
        </a-form-model>
        <a-row :gutter="7" class="css-table-row">
          <div class="css-tableBox">
            <a-col :span="10">
              <a-row class="css-topSearch">
                <a-col :span="10" class="users-group-option">
                  <a-select
                    v-model="usersSearchVal"
                    defaultValue=""
                    :allowClear="true"
                    placeholder="按用户组"
                    @change="onChangeUsersOption">
                    <a-select-option
                      key="0"
                      value=""
                      label="按用户组">按用户组
                    </a-select-option>
                    <a-select-option
                      v-for="item in usersSearchList"
                      :key="item.groupId"
                      :value="item.groupId"
                      :label="item.groupName">{{item.groupName}}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="10" :offset="2">
                  <a-tree-select
                    :dropdown-style="{ maxHeight: '500px', overflow: 'auto' }"
                    placeholder="按机构"
                    allow-clear
                    tree-data-simple-mode
                    v-model="curOrgTreeVal"
                    :tree-data="orgTreeData"
                    :load-data="onLoadData"
                    @change="handleUserClickRow">
                  </a-tree-select>
                </a-col>
              </a-row>
              <a-row class="css-topSearch">
                <a-col :span="10">
                  <a-input v-model="orgUserSearchVal" allow-clear placeholder="请输入用户姓名/账号" />
                </a-col>
                <a-col :span="2">
                  <a-button class="all-users-search-btn" @click="onSearchAllUsers">搜索</a-button>
                </a-col>
              </a-row>
              <a-table
                :rowKey="record => record.userId"
                :row-selection="{selectedRowKeys:orgUserList, onChange: selectOrgUser}"
                :columns="allUsersTableColumns"
                :data-source="allUsersList"
                @change="changeOrgUser"
                :pagination="false"
                :scroll="{y: 460}">
              </a-table>
              <a-pagination
                :position="allUsersPagination.position"
                :size="allUsersPagination.size"
                v-model="allUsersPagination.current"
                :pageSize="allUsersPagination.pageSize"
                :total="allUsersPagination.total"
                :pageSizeOptions="allUsersPagination.pageSizeOptions"
                showSizeChanger
                :showTotal="allUsersPagination.showTotal"
                showQuckJumper
                @showSizeChange="onShowSizeChangeLeft"
                @change="onChangePageLeft">
              </a-pagination>
            </a-col>
            <a-col :span="4" class="css-center">
              <a-button type="primary" @click="moveUsers">添加用户 >></a-button>
              <a-button type="primary" @click="onMultiDel">批量删除</a-button>
            </a-col>
            <a-col :span="10" class="right-table-box">
              <a-row class="css-topSearch">
                <a-col :span="10">
                  <div class="user-title-text">已选用户</div>
                </a-col>
                <a-col :span="10">
                  <a-input v-model="checkedUserSearchVal" allow-clear placeholder="请输入用户姓名/账号" />
                </a-col>
                <a-col :span="2">
                  <a-button class="all-users-search-btn" @click="onSearchSelectedUsers">搜索</a-button>
                </a-col>
              </a-row>
              <a-table
                :rowKey="record => record.userId"
                :row-selection="{selectedRowKeys:multiSelectedListRight, onChange: onChangeSelectedRight}"
                :columns="checkedUsersTableColumns"
                :data-source="checkedUsersList"
                @change="changecheckedUsers"
                :pagination="false"
                :scroll="{y: 510}">
                <span slot="value4" slot-scope="text, record">
                  <a @click="delUser(record)">移除</a>
                </span>
              </a-table>
              <a-pagination
                :position="checkedUsersPagination.position"
                :size="checkedUsersPagination.size"
                v-model="checkedUsersPagination.current"
                :pageSize="checkedUsersPagination.pageSize"
                :total="checkedUsersPagination.total"
                :pageSizeOptions="checkedUsersPagination.pageSizeOptions"
                showSizeChanger
                :showTotal="checkedUsersPagination.showTotal"
                showQuckJumper
                @showSizeChange="onShowSizeChangeRight"
                @change="onChangePageRight">
              </a-pagination>
            </a-col>
          </div>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  watch: {
    checkedUserSearchVal(val, data) {
      if(!val) {
        this.checkedUsersList = this.AllSelectedList
      }
    }
  },
  data() {
    return {
      // 主页
      radioType: '',
      form: {
        userGroupName: '',
        startTime: '',
        endTime: '',
      },
      endOpen: false, // 不可选时间校验
      searchStartTime: '',
      searchEndTime: '',
      listTableColumns: [
        { title: '用户组名称', dataIndex: 'groupName', key: 'groupName', },
        { title: '人数', dataIndex: 'quantity', key: 'quantity', },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime', },
        { title: '操作', dataIndex: 'value4', key: 'value4', width: 60, scopedSlots: { customRender: 'value4' } },
      ],
      listData: [],
      groupIdList: [], // 所有选中的值
      listPagination: {
        position: 'bottom',
        size: "small",
        current: 1,
        pageSize: 10,
        total: 0,
        pageSizeOptions: ['10','20','30','40'],
        showSizeChanger: true,
        showTotal: (total, range) => `共${total}条数据`,
        showQuckJumper: true,
      },
      opType: 0, // 0 --> 新增 1 --> 编辑
      /**
       * 添加弹框
       */
      isMsg: false,
      modalTitle: '新增用户组',
      addForm: {
        groupName: ''
      },
      curEditRecord: '', // 当前编辑的数据
      // 全部用户
      orgUserSearchVal: '', // 查询条件
      usersSearchList: [], // 按用户组
      usersSearchVal: '',
      orgTreeData: [], // 按机构
      curOrgTreeVal: undefined, // 当前选中数据
      allUsersSpining: true,
      allUsersTableColumns: [
        { title: '姓名', dataIndex: 'nickName', key: 'nickName', width: 120},
        { title: '用户名', dataIndex: 'loginName', key: 'loginName'},
        { title: '所属单位', dataIndex: 'orgName', key: 'orgName', ellipsis: true,}
      ],
      allUsersList: [],
      orgUserList: [], // 所有选中的值
      allUsersPagination: {
        position: 'bottom',
        size: "small",
        current: 1,
        pageSize: 100,
        total: 0,
        pageSizeOptions: ['100','200','300','400'],
        showTotal: (total, range) => `共${total}条数据`,
      },
      // 已选用户列表
      checkedUserSearchVal: '',
      checkedUsersTableColumns: [
        { title: '姓名', dataIndex: 'nickName', key: 'nickName', width: 120},
        { title: '用户名', dataIndex: 'loginName', key: 'loginName', width: 150},
        { title: '所属单位', dataIndex: 'orgName', key: 'orgName', ellipsis: true,},
        { title: '操作', dataIndex: 'value4', key: 'value4', width: 60, scopedSlots: { customRender: 'value4' }, ellipsis: true, },
      ],
      checkedUsersList: [],
      multiSelectedListRight: [], // 所有选中的值
      AllSelectedList: [], // 搜索之前的所有值
      checkedUsersPagination: {
        position: 'bottom',
        size: "small",
        current: 1,
        pageSize: 100,
        total: 0,
        pageSizeOptions: ['100','200','300','400'],
        showSizeChanger: true,
        showTotal: (total, range) => `共${total}条数据`,
        showQuckJumper: true,
      },

      getOrgUserCon: {
        id: 10,
        type: 1,
        content: '',
        pageNum: 1,
        pageSize: 10
      },

      rules: {
        groupName: [
          { required: true, message: '请输入用户组名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在1~100之间', trigger: 'blur' },
        ]
      },
    };
  },
  created () {
    this.getGroup()
    this.getUserOrgList()
  },
  methods: {
    // 获取用户组列表
    async getGroup () {
      let self = this
      let params = {
        groupName: self.form.userGroupName,
        startTime: self.searchStartTime || self.form.startTime,
        endTime: self.searchEndTime || self.form.endTime,
        pageNum: self.listPagination.current,
        pageSize: self.listPagination.pageSize,
      }
      const data = await self.$postAxios("/api/userGroup/getUserGroup",params);
      self.listData = data.list
      self.usersSearchList = data.list
      self.listPagination.total = data.total
    },
    // 改变时间段
    timeChange(event) {
      this.form.startTime = ''
      this.form.endTime = ''
      let temp = ''
      this.searchEndTime = this.$common.formateDate(new Date())
      temp = new Date().setDate(new Date().getDate() - (+event.target.value)) // 获取近n天的时间戳
      this.searchStartTime = this.$common.formateDate(new Date(temp))
    },
    // 改变开始时间
    oncChangeStartTime() {
      this.radioType = ''
      this.searchStartTime = ''
      this.searchEndTime = ''
    },
    // 改变结束时间
    oncChangeEndTime() {
      this.radioType = ''
      this.searchStartTime = ''
      this.searchEndTime = ''
    },
    // 开始时间 不可用区间
    disabledStartDate(startValue) {
      const endValue = this.form.endTime
      if(!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    // 结束时间 不可用区间
    disabledEndDate(endValue) {
      const startValue = this.form.startTime
      if(!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    // 打开结束时间弹框
    handleStartOpenChange(open) {
      if(!open) {
        this.endOpen = true
      }
    },
    // 打开关闭结束时间弹框
    handleEndOpenChange(open) {
      this.endOpen = open
    },
    // 用户组 全选
    onSelectGroup (groupId) {
      this.groupIdList = groupId
    },
    // 新增用户组
    addUsersGroup () {
      this.modalTitle = '新增用户组'
      this.checkedUsersList = []
      this.AllSelectedList = []
      this.addForm.groupName = ''
      this.isMsg = true
      this.opType = 0
      this.onSearchAllUsers()
    },
    // 编辑
    onEditClick (record) {
      this.modalTitle = '编辑用户组'
      this.addForm.groupName = record.groupName
      this.curEditRecord = record
      this.isMsg = true
      this.opType = 1
      this.onSearchAllUsers()
      this.getGroupUsers(record)
    },
    // 用户组 单个删除/批量删除
    delGoups (record) {
      let idArr = [];
      if (record && record.groupId != undefined) { // 单个删除
        idArr = [record.groupId]
      } else {
        idArr = this.groupIdList
      }
      this.delGroup(idArr)
      setTimeout(() => {
        this.getGroup()
      }, 100)
    },
    // 删除组
    async delGroup (idArr) {
      const data = await this.$postAxios("/api/userGroup/deleteUserGroup", idArr);
      if (data === 'success') {
        this.$message.success('删除成功')
        this.getGroup()
      }
    },
    // 组分页
    changeGroups (groupId) {},
    /**
     * 添加弹框
     */
    /**
     * 全部用户
     */
    // 获取所有用户
    async onSearchAllUsers () {
      // this.allUsersSpining = false
      let params = {
        type: this.usersSearchVal ? '0' : '1',
        id: this.usersSearchVal || this.curOrgTreeVal || '10',
        content: this.orgUserSearchVal,
        pageNum: this.allUsersPagination.current,
        pageSize: this.allUsersPagination.pageSize,
      }
      const data = await this.$axios("/api/userShotLinkage/getUserInfoBySearch", params);
      // this.allUsersSpining = false
      this.allUsersList = data.list
      this.allUsersPagination.total = data.total
    },
    // 获取用户机构列表
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
      const data = await self.$axios(url, param)
      let dataList = data.list || []
      if(val) {
        dataList.map(item => {
          item.title = item.orgName
          item.value = item.orgId
          item.key = item.orgId
          item.isLeaf = false
          item.scopedSlots = {
            title: 'title',
          }
        })
        self.orgTreeData[0].children.map(item => {
          if(item.orgId == val.orgId) {
            item.children = dataList
            // self.$set(val, 'children', dataList)
          }
        })
      } else {
        let orgList = []
        dataList.map(item => {
          item.title = item.orgName
          item.value = item.orgId
          item.key = item.orgId
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
        self.orgTreeData = orgList
        // self.curOrgTreeVal = self.orgTreeData[0].orgId
      }
    },
    // 扩展加载数据
    onLoadData(treeNode) {
      const self = this
      return new Promise(resolve => {
        if(!treeNode.dataRef.children || treeNode.dataRef.children.length == 0) {
          self.getUserOrgList(treeNode.dataRef)
        }
        resolve()
      })

    },
    // 点击事件
    handleUserClickRow(val, label) {
      this.usersSearchVal = ''
      this.onSearchAllUsers()
    },
    // 改变多选
    selectOrgUser (orgUserList) {
      this.orgUserList = orgUserList
    },
    // 改变多选
    changeOrgUser (page, size, sot) {
      // this.getOrgUserCon.pageNum = page.current
      // this.getOrgUserCon.pageSize = page.pageSize
      // this.onSearchAllUsers()
    },
    // 改变用户组查询条件
    onChangeUsersOption(val, data) {
      this.curOrgTreeVal = undefined
      this.onSearchAllUsers()
    },
    // 改变每页条数
    onShowSizeChangeLeft(current, pageSize) {
      this.allUsersPagination.pageSize = pageSize
      this.onSearchAllUsers()
    },
    // 改变页码
    onChangePageLeft(current) {
      this.allUsersPagination.current = current
      this.onSearchAllUsers()
    },
    /**
     * 已选用户
     */
    // 获取已选用户列表
    async getGroupUsers (val) {
      let params = {
        userName: val ? '' : this.checkedUserSearchVal, // 初次打开弹框 不能带条件
        groupId: val ? val.groupId : '',
        pageNum: this.checkedUsersPagination.current,
        pageSize: this.checkedUsersPagination.pageSize,
      }
      const data = await this.$postAxios("/api/userGroup/getUserList",params);
      this.checkedUsersList = data.list
      this.AllSelectedList = data.list
      this.checkedUsersPagination.total = data.total
    },
    // 搜索已选用户
    onSearchSelectedUsers() {
      let temp = []
      temp = this.AllSelectedList.filter((item, index) => {
        return item.nickName.indexOf(this.checkedUserSearchVal) > -1
      })
      this.checkedUsersList = temp
      // this.getGroupUsers()
    },
    // 改变多选
    changecheckedUsers () {
    },
    // 改变多选
    onChangeSelectedRight(val) {
      this.multiSelectedListRight = val
    },
    // 改变每页条数
    onShowSizeChangeRight(current, pageSize) {
      this.checkedUsersPagination.pageSize = pageSize
      this.getGroupUsers()
    },
    // 改变页码
    onChangePageRight(current) {
      this.checkedUsersPagination.current = current
      this.getGroupUsers()
    },
    // 已选用户 移除
    async delUser (record) {
      this.checkedUsersList.forEach((v, k) => {
        if (v.userId === record.userId) {
          this.checkedUsersList.splice(k, 1)
        }
      })
      this.AllSelectedList.forEach((v, k) => {
        if (v.userId === record.userId) {
          this.AllSelectedList.splice(k, 1)
        }
      })
      this.checkedUsersPagination.total = this.checkedUsersList.length
    },
    // 移动用户
    moveUsers () {
      const arr = [] // 所有选中的值
      this.allUsersList.forEach(v => {
        this.orgUserList.forEach(item => {
          if (item === v.userId) {
            arr.push(v)
          }
        })
      })

      if (arr.length > 0) {
        arr.forEach(v => {
          let state = true
          this.checkedUsersList.forEach(item => {
            if (v.userId == item.userId) {
              state = false
            }
          })
          if (state) {
            this.checkedUsersList.push(v) // 被选中的用户列表数据
          }
          this.AllSelectedList.forEach(item => {
            if (v.userId == item.userId) {
              state = false
            }
          })
          if (state) {
            this.AllSelectedList.push(v) // 被选中的用户列表数据
          }
        })
      }
      this.checkedUsersPagination.total = this.checkedUsersList.length
    },
    // 批量删除
    onMultiDel() {
      let self = this
      self.checkedUsersList = self.checkedUsersList.filter((item, index) => {
        return self.multiSelectedListRight.indexOf(item.userId) < 0
      })
      self.AllSelectedList = self.AllSelectedList.filter((item, index) => {
        return self.multiSelectedListRight.indexOf(item.userId) < 0
      })
      this.checkedUsersPagination.total = this.checkedUsersList.length
    },
    // 提交
    submit () {
      // let self = this
      this.$refs.addGroup.validate(async vali => {
        if (vali) {
          let self = this
          // 校验用户组名称重复
          const resData = await self.$axios('/api/userGroup/getFlagByGroupName', {
            groupName: self.addForm.groupName,
          })
          if(resData === 1) {
            self.$message.success('用户组名称重复')
            return false
          }

          const idArr = []
          // self.checkedUsersList.forEach(v => {
          self.AllSelectedList.forEach(v => {
            const json = {userId: v.userId}
            idArr.push(json)
          })
          let params = {
            groupId: '',
            groupName: self.addForm.groupName,
            users: idArr, 
          }
          if (self.opType === 1) {
            params.groupId = self.curEditRecord.groupId
          }
          const data = await self.$postAxios("/api/userGroup/addUserGroup", params);
          if (data === 'success') {
            if (self.opType === 0) {
              self.$message.success('新增成功')
            } else {
              self.$message.success('修改成功')
            }
            self.isMsg = false
            self.getGroup()
          }
        } else {
          return false
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.content{
	padding: 30px 35px 15px 35px;
	height: 100%;
	width: 100%;
	.css-goBack {
		background: initial;
		border: 1px solid $theme-color-active;
		color: $theme-color-active;
	}
	> .title{
		margin-top: 10px;
		font-size: 16px;
		> button {
			margin-right: 20px;
		}
		> span {
			color: $theme-color-disabled;
		}
  }
  .css-boxForm {
    margin-top: 20px;
  }
  .css-option {
    margin-top: 20px;
    button {
      &:nth-of-type(1){
        margin-right: 20px;
      }
    }
  }
}
.css-tables{
  margin-top: 20px;
  table {
    border: none;
  }
}
.css-center{
  height: 100%;
  text-align: center;
  // margin-top: 8%;
  button {
    position: relative;
    top: 45%;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
}
.css-propContent{
  padding: 0 15px 0px 15px;
}
.css-topSearch {
  overflow: hidden;
  margin-bottom: 15px;
  .users-group-option {
    .ant-select {
      color: #bfbfbf;
    }
  }
  .user-title-text {
    color: #d5d5d5;
    margin-top: 0.5rem;
  }
}
</style>
<style lang="scss">
.css-boxForm .ant-form-item-label > label,.css-boxForm .ant-calendar-range-picker-separator {
  color: $theme-legend1 !important;
}
.ant-modal-content {
  height: 100% !important;
  .users-name {
    margin-bottom: 1rem;
  }
  .ant-modal-body {
    height: calc(100% - 9rem) !important;
    .css-propContent {
      height: 100%;
      .css-table-row {
        height: calc(100% - 6.5rem);
        .all-users-search-btn {
          margin-left: 1rem;
        }
        .css-tableBox {
          height: 100%;
          .ant-col-10 {
            height: 100%;
            .ant-table-wrapper {
              height: calc(100% - 9.5rem);
              margin-bottom: 0.5rem;
              .ant-table-body {
                height: 100%;
              }
            }
          }
          .right-table-box {
            .ant-table-wrapper {
              height: calc(100% - 5.5rem);
            }
          }
        }
      }
    }
  }
}
.ant-modal-footer{
  // border-top: 1px solid $theme-btn;
  border-top: none;
}
.ant-table-fixed-header > .ant-table-content > .ant-table-scroll > .ant-table-body{
  background: #00172D;
}
.ant-table-fixed-header .ant-table-scroll .ant-table-header{
  background: #00172D;
  margin-bottom: -27px !important;
  padding-bottom: 20px !important;
}
</style>

