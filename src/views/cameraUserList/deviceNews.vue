<template>
  <div class="deviceNews">
    <a-form-model :model="cameraDetail" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-row :gutter="14">
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="镜头名称">
            <a-input disabled v-model="cameraDetail.cameraname" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="经纬度">
            <a-input disabled v-model="cameraDetail.jwd" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="镜头编码">
            <a-input disabled v-model="cameraDetail.cameracode" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="安装位置">
            <a-input disabled v-model="cameraDetail.cameraaddress" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="镜头IP">
            <a-input disabled v-model="cameraDetail.currentip" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="监控方位">
            <a-input disabled v-model="cameraDetail.jkfw" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="镜头类型">
            <a-input disabled v-model="cameraDetail.dev_type" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="建设类型">
            <a-input disabled v-model="cameraDetail.constcategory" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="所属机构">
            <a-input disabled v-model="cameraDetail.orgname" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="建设信息">
            <a-input disabled v-model="cameraDetail.use_project_desc" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="镜头厂商">
            <a-input disabled v-model="cameraDetail.manufacturername" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="维护单位">
            <a-input disabled v-model="cameraDetail.mainunit" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="国际编码">
            <a-input disabled v-model="cameraDetail.gb_code" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="维护人">
            <a-input disabled v-model="cameraDetail.whr" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="镜头ID">
            <a-input disabled v-model="cameraDetail.id" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="挂载设备">
            <a-input disabled v-model="cameraDetail.gzsb" />
          </a-form-model-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-model-item label="镜头通道">
            <a-input disabled v-model="cameraDetail.devicechanid" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cameraDetail: {
        serverName: '123',
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }
  },
  created () {
  },
  methods: {
    init(val) {
      const self = this
      self.getDeviceNewsData(val)
    },
    // 同步主题
    async getDeviceNewsData(val) { // val为镜头数据
      const self = this
      const data = await this.$axios('/api/userShotLinkage/getCameraDetailInfo', {id: val.id||val.GUID||val.cameraId})
      self.cameraDetail = data
    },
  },
}
</script>

<style lang="scss">
.deviceNews {
  width: 100%;
  height: 65vh;
  padding: 1.5rem;
}
</style>
