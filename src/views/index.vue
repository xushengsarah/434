<template>
  <div class="main">
    <div class="css-content">
      <p><img src="@/assets/img/login_title.png" /></p>
      <div class="css-loginWay">
        <ul>
          <li @click="goUrl('/business', '1')">
            <p>
              <span><img src="@/assets/img/ic_real time.png" /></span>
              <span>实时状态</span>
            </p>
          </li>
          <li>
            <p>
              <span><img src="@/assets/img/ic_file message.png" /></span>
              <span>档案信息</span>
            </p>
          </li>
          <li>
            <p>
              <span><img src="@/assets/img/ic_running management.png" /></span>
              <span>运行管理</span>
            </p>
          </li>
          <li>
            <p>
              <span><img src="@/assets/img/ic_report analysis.png" /></span>
              <span>报表分析</span>
            </p>
          </li>
          <li @click="goUrl('/systemTools',  '5')">
            <p>
              <span><img src="@/assets/img/ic_system tool.png" /></span>
              <span>系统工具</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
	  return {
	  }
  },
  methods: {
    goUrl (url, nub) {
      window.sessionStorage.setItem("activitePath", url);
      window.sessionStorage.setItem("activiteNub", nub);
      this.$router.push(url)
    }
  }
}
</script>


<style lang="less" scoped>
.main{
  background: url('../assets/img/login_bg.png') no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: relative;
  > .css-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    > .css-loginWay {
      margin-top: 110px;
      ul {
        display: flex;
        li {
          flex: 1;
          text-align: center;
          width: 320px;
          height: 320px;
          margin: 0 10px;
          cursor: pointer;
          &:nth-of-type(1){
            background: url('../assets/img/bg_card 01.png') no-repeat;
          }
          &:nth-of-type(2){
            background: url('../assets/img/bg_card 02.png') no-repeat;
          }
          &:nth-of-type(3){
            background: url('../assets/img/bg_card 03.png') no-repeat;
          }
          &:nth-of-type(4){
            background: url('../assets/img/bg_card 04.png') no-repeat;
          }
          &:nth-of-type(5){
            background: url('../assets/img/bg_card 05.png') no-repeat;
          }
        }
        p {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        }
        span {
          color: #fff;
          font-size: 32px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          display: block;
        }
      }

    }
  }
}
</style>
