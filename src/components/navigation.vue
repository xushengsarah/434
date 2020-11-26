<template>
  <div class="css-indexTabs js-urlActive">
    <ul class="js-tab" ref="urlActive" v-if="activiteNub==='1'" @click="onClose()">
      <li dataUrl="/business">业务概览</li>
      <li dataUrl="/run">运行概览</li>
      <li dataUrl="/cameraUserList">调用概览</li>
      <li dataUrl="/service">服务概览</li>
      <li dataUrl="/netWork">流量概览</li>
      <li dataUrl="/serviceOverview">业务监控</li>
    </ul>
    <ul class="js-tab" ref="urlActive" v-else-if="activiteNub==='5'">
      <li>系统工具</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: [],
      activiteNub: ''
    };
  },
  created() {
    if (window.sessionStorage.getItem("activitePath") === null) {
      window.sessionStorage.setItem("activitePath", "/business");
    }
    this.activiteNub = window.sessionStorage.getItem("activiteNub")
  },
  mounted() {
    this.activeShow()
  },
  methods: {
    activeShow () {
      const _this = this
      _this.$nextTick(() => {
        $('.js-urlActive').find('li').each(function () {
          if ($(this).attr('dataUrl') === window.sessionStorage.getItem("activitePath")) {
            $(this).addClass('active').closest('ul').siblings('span').addClass('active')
          }
        })
      })

      $('.js-urlActive').find('li').click(function () {
        if ($(this).attr('dataurl') != undefined) {
          const url = $(this).attr('dataurl');
          $(this).addClass('active').siblings().removeClass('active');
          window.sessionStorage.setItem("activitePath", url);
          _this.$router.push(url)
        } else {
          return false
        }
      })
    },
    // 点击标题 关闭流程图弹框
    onClose() {
      this.$store.state.businessMonitor.isOthers = false
    }
  },
};
</script>

<style lang="scss" scoped>
.css-indexTabs {
  display: inline-block;
  .js-tab {
    li.active,
    span.active{
      color: $theme-yellow;
    }
    li {
      font-size: 20px;
      float: left;
      margin: 0 10px;
      cursor: pointer;
    }
  }
}
</style>
