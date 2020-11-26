<template>
  <div class="serverNews">
    <a-tabs v-model="activeKey" hide-add @change="callback">
      <a-tab-pane v-for="(item, index) in serverData" :key="index" :closable="item.closable">
        <span slot="tab">
          <a-icon v-show="item.checkStatus!='正常'" type="bell"></a-icon>
          {{item.serverIp}}
        </span>
        <a-form-model :model="item" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div class="sever-title">服务信息</div>
          <a-row :gutter="14">
            <a-col class="gutter-row" :span="12">
              <a-form-model-item label="服务名称">
                <a-input disabled v-model="item.serverName" />
              </a-form-model-item>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-form-model-item label="服务状态">
                <a-input disabled v-model="item.checkStatus" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <div class="sever-title">服务器信息</div>
          <a-row :gutter="14">
            <a-col class="gutter-row" :span="12">
              <a-form-model-item label="CPU">
                <a-input disabled v-model="item.CPU" />
              </a-form-model-item>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-form-model-item label="内存">
                <a-input disabled v-model="item.storage" />
              </a-form-model-item>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-form-model-item label="磁盘">
                <a-input disabled v-model="item.disk" />
              </a-form-model-item>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-form-model-item label="位置">
                <a-input disabled v-model="item.serverPosition" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <div class="sever-title">交换机信息</div>
          <a-row :gutter="14">
            <a-col class="gutter-row" :span="12">
              <a-form-model-item label="交换机名称">
                <a-input disabled v-model="item.switchName" />
              </a-form-model-item>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-form-model-item label="位置">
                <a-input disabled v-model="item.switchPosition" />
              </a-form-model-item>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-form-model-item label="ip">
                <a-input disabled v-model="item.switchIp" />
              </a-form-model-item>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-form-model-item label="port">
                <a-input disabled v-model="item.switchPort" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeKey: 0,
      serverData: [],
      newTabIndex: 0,

      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
    }
  },
  created () {
  },
  methods: {
    init (val) {
      const self = this
      this.activeKey = 0
      this.serverData = val
      this.getServerInfoData(val[0])
    },
    callback(key) {
      this.activeKey = key
      let data = this.serverData[key]
      if (!data.disk) {
        this.getServerInfoData(data) // 通过返回的数据再次调用接口获取服务器信息
      }
    },
    async getServerInfoData(val) {
      const self = this
      let param = ''
      if(val.serverIp) {
        param = {
          serverCode: '',
          serverIp: val.serverIp,
          switchIp: ''
        }
      } else {
        param = {
          serverCode: val,
          serverIp: '',
          switchIp: ''
        }
      }
      const data = await this.$postAxios('/api/server/getServerInfo', param)
      if(val.serverIp) {
        let resData = {
          CPU: '',
          storage: '',
          disk: 0
        }
        data.map(item => {
          if (item.guardType == 'CPU') {
            resData.CPU = item.guardValue
          } else if (item.guardType == '内存') {
            resData.storage = item.guardValue
          } else if (item.guardType == '磁盘') {
            resData.disk += parseInt(item.guardValue)
          }
        })
        let sever = self.serverData
        sever.map(item => {
          if(item.id == val.id) {
            item.CPU = resData.CPU + '%'
            item.storage = resData.storage + '%'
            item.disk = resData.disk + 'GB'
          }
        })
        self.serverData = ''
        self.serverData = sever
      } else {
        self.serverData = data
        self.serverData.map(item => {
          item.serverPosition = item.machineRoom + ' ' + item.machinePosition
        })
        self.getServerInfoData(self.serverData[0]) // 通过返回的数据再次调此接口获取服务器信息
      }
    },
  },
}
</script>

<style lang="scss">
.serverNews {
  width: 100%;
  height: 60vh;
  padding: 0 1.5rem;
  .sever-title {
    color: $theme-color-hover;
    font-size: $font-size-large;
    height: 1.5rem;
    line-height: 1.5rem;
    border-left: 3px solid $theme-button;
    padding-left: .5rem;
    margin-bottom: 1rem;
  }
  .anticon {
    color: $theme-red;
  }
}
</style>
