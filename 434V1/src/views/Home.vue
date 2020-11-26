<template>
  <a-layout>
    <a-layout-header class="css-header">
      <div class="css-logo" @click="goUrl('/index')"><img src="@/assets/img/ic_title_dark.png" /></div>
      <a-icon class="css-goHome" type="home" @click="goUrl('/index')"></a-icon>
      <navigation></navigation>
      <div class="css-ringtContent">
        <div class="css-style">
          <a-dropdown class="css-styles">
            <span style="cursor:pointer"><img src="@/assets/img/ic_skin_dark.png" /></span>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-radio-group v-model="value" @change="onChange">
                  <a-radio value="1">深色</a-radio>
                  <a-radio value="2">蓝色</a-radio>
                  <!-- <a-radio value="3">浅色</a-radio> -->
                </a-radio-group>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="css-time">
          <span>{{time}}</span>
          <span>{{week}}</span>
        </div>
        <div class="css-user">
          <span><img src="@/assets/img/ic_user_head_dark.png" /></span>
          <a-dropdown>
            <span>
              {{userName}}
            </span>
            <a-menu slot="overlay">
              <a-menu-item>
                <span @click="logout">退出</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
    <a-layout-content>
      <div class="css-line-top"></div>
      <!-- <keep-alive include="businessMonitor"> -->
        <!-- <router-view v-if="$route.mata && $route.mata.keepalive"></router-view> -->
      <!-- </keep-alive> -->
      <!-- <router-view v-if="!($route.mata && $route.mata.keepalive)"></router-view> -->
      <router-view></router-view>
      <div class="css-line-bottom"></div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import navigation from '@/components/navigation'
export default {
  components: {
    navigation
  },
  data() {
    return {
      value: '1',
      week: '',
      time: '',
      userName: window.sessionStorage.getItem('userName')
    }
  },
  mounted() {
    this.getWeek()
    setInterval(() => {
      this.getTimes()
    }, 1000)
  },
  created() {
    //this.$socket.createSocket();
    this.$socket.createSocketCar();
    this.value = window.sessionStorage.getItem('themeVal') || ''
    // 改变主题颜色
    if(this.value == ''  || this.value == '1') {
      window.document.documentElement.setAttribute('change-font-color', 'color1')
      window.document.documentElement.setAttribute('change-background-color', 'left1')
      window.document.documentElement.setAttribute('change-background-circle', 'color1')
      // 改变echarts图字体颜色
      this.$store.commit('changeEchartsColor', {
        fontColor: '#afbcd4'
      })
    } else if (this.value == '2') {
      window.document.documentElement.setAttribute('change-font-color', 'color2') // 改变字体颜色
      window.document.documentElement.setAttribute('change-background-color', 'left2') // 改变背景颜色
      window.document.documentElement.setAttribute('change-background-circle', 'color2') // 改变整体背景
      this.$store.commit('changeEchartsColor', {
        fontColor: '#82aeff'
      })
    } else if (this.value == '3') {
      window.document.documentElement.setAttribute('change-font-color', 'color3')
      window.document.documentElement.setAttribute('change-background-color', 'left3')
      window.document.documentElement.setAttribute('change-background-circle', 'color3')
      this.$store.commit('changeEchartsColor', {
        fontColor: '#4f5257'
      })
    }
  },
  destroyed() {
    this.$socket.closeCar();
  },
  methods: {
    onChange(val) {
      window.sessionStorage.setItem("themeVal", val.target.value);
      this.$router.go(0) // 刷新页面
    },
    goUrl (url) {
      this.$router.push(url)
    },
    getTimes () {
      const t = new Date()
      const y = t.getFullYear()
      const M = (t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1
      const d = t.getDate() < 10 ? '0' + t.getDate() : t.getDate()
      const h = t.getHours() < 10 ? '0' + t.getHours() : t.getHours()
      const m = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes()
      const s = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds()
      this.time = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    getWeek () {
      const week = new Date().getDay()
      switch (week) {
        case 0:
          this.week = '星期日'
          break;
        case 1:
          this.week = '星期一'
          break;
        case 2:
          this.week = '星期二'
          break;
        case 3:
          this.week = '星期三'
          break;
        case 4:
          this.week = '星期四'
          break;
        case 5:
          this.week = '星期五'
          break;
        default:
          this.week = '星期六'
      }
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="scss" scoped>
.css-header {
  background: initial;
  padding: 0 40px 0 10px;
  text-align: center;
  .css-logo {
    float: left;
    margin-right: 20px;
    img {
      cursor: pointer;
    }
  }
  .css-goHome {
    font-size: 24px;
    position: absolute;
    left: 20.5%;
    top: 20px;
  }
  > ul {
    overflow: hidden;
    float: left;
    margin-top: 20px;
    > li {
      float: left;
      font-family: 'Source Han Sans CN';
      background: url('../assets/img/btn_status_select_dark.png') no-repeat;
      width: 100px;
      height: 32px;
      line-height: 32px;
      margin-right: 5px;
      font-size: 16px;
      padding-left: 15px;
      box-sizing: border-box;
      cursor: pointer;
    }
    > li.active {
      color: $theme-yellow;
    }
  }
  .css-ringtContent {
    float: right;
    line-height: 40px;
    margin-top: 10px;
    > div {
      float: left;
    }
    > .css-style {
      margin-right: 15px;
    }
    > .css-time{
      font-size: 16px;
      margin-right: 35px;
      > span {
        display: inline-block;
        margin: 0 4px;
      }
    }
    > .css-user {
      font-size: 16px;
      > span {
        display: inline-block;
        margin-right: 10px;
        > img {
          vertical-align: text-bottom;
        }
      }
    }
  }
  .page-menu {
    float: left;
    margin-left: 3rem;
    margin-top: 1.6rem;
    li {
      float: left;
      padding: 0 1rem;
      margin-left: .3rem;
      background: $theme-blue;
      font-size: 0.8rem;
      width: auto;
      height: 2rem;
      line-height: 2rem;
      &.active {
        color: #DB8223;
      }
    }
  }
}
.css-line-top {
  background: url('../assets/img/bg_decorate up_dark.png') no-repeat;
  width: calc(100% - 2rem);
  height: 1rem;
  background-size: 100% 100%;
  position: absolute;
  top: .2rem;
  left: 1rem;
  z-index: 555
}
.css-line-bottom {
  background: url('../assets/img/bg_decorate down_dark.png') no-repeat;
  width: calc(100% - 2rem);
  height: 1rem;
  background-size: 100% 100%;
  position: absolute;
  bottom: .2rem;
  left: 1rem;
  z-index: 555
}
</style>
