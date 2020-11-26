<template>
  <div class="main">
	  <iframe ref="prevIframe" class="css-iframe" :src="'http://190.168.17.2:6083/keyArea.html?sessionid='+Sessionids"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Sessionids: window.sessionStorage.getItem("loginSessionid")
    };
  },
  methods: {
    postMessage() {
      this.$refs.prevIframe.contentWindow.postMessage(
        { type: "showDrawTool", data: { type: 0, plan_id: "" } },
        "*"
      );
    }
  },
  mounted() {
    const _this = this
    if (!/*@cc_on!@*/ 0) {  //if not IE
      if (_this.$refs.prevIframe) {
        _this.$refs.prevIframe.onload = function() {
          _this.postMessage();
        }
      }
    } else {
      _this.$refs.prevIframe.onreadystatechange = function() {
        if (_this.$refs.prevIframe.readyState == "complete") {
          _this.postMessage();
        }
      };
    }
  }
};
</script>
