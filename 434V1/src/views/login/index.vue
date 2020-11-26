<template>
  <div class="main">
    <div class="css-content">
      <p><img src="@/assets/img/login_title.png" /></p>
      <div class="css-loginWay">
        <p><img src="@/assets/img/img_illustration.png" /></p>
        <span class="css-segmentation"></span>
        <div class="css-tab">
          <p class="css-title">用户登录</p>
          <a-form-model ref="refModel" :rules="rules" :model="from">
            <a-form-model-item prop="loginName">
              <a-input :maxLength="40" class="css-inputStyle css-feelStyle" @keyup.enter="login" v-model="from.loginName" placeholder="用户名" />
            </a-form-model-item>
            <a-form-model-item prop="password">
              <a-input type="password" :maxLength="40" class="css-inputStyle css-feelStyle" @keyup.enter="login" v-model="from.password" placeholder="密码" show-password />
            </a-form-model-item>
          </a-form-model>
          <a-form-model-item prop="checkbox">
            <a-checkbox-group v-model="checkbox">
              <a-checkbox value="1">记住用户名</a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" class="css-btnStyle" @click="login">登录</a-button>
            <a-button type="primary" class="css-btnStyle" @click="$refs.refModel.resetFields()">重置</a-button>
          </a-form-model-item>
          <!-- <a-tabs v-model="activeKey" default-active-key="1">
            <a-tab-pane key="1" tab="账号登录">
              <a-form-model ref="refModel" :rules="rules" :model="from">
                <a-form-model-item prop="loginName">
                  <a-input :maxLength="40" class="css-inputStyle css-feelStyle" @keyup.enter="login" v-model="from.loginName" placeholder="用户名" />
                </a-form-model-item>
                <a-form-model-item prop="password">
                  <a-input type="password" :maxLength="40" class="css-inputStyle css-feelStyle" @keyup.enter="login" v-model="from.password" placeholder="密码" show-password />
                </a-form-model-item>
              </a-form-model>
              <a-form-model-item prop="checkbox">
                <a-checkbox-group v-model="from.checkbox">
                  <a-checkbox value="1">记住用户名</a-checkbox>
                </a-checkbox-group>
              </a-form-model-item>
              <a-form-model-item>
                <a-button type="primary" class="css-btnStyle" @click="login">登录</a-button>
                <a-button type="primary" class="css-btnStyle" @click="$refs.refModel.resetFields()">重置</a-button>
              </a-form-model-item>
            </a-tab-pane>
            <a-tab-pane key="2" tab="扫码登录">
              <div class="css-loginEr">
                <p class="css-ErPic">
                  <img />
                  <span class="css-refresh">
                    <span>
                      <a-icon type="reload"></a-icon>
                      <span>请刷新重试</span>
                    </span>
                  </span>
                </p>
                <p class="css-msg">请使用警务云扫码登录</p>
              </div>
            </a-tab-pane> -->
            <!-- <a-tab-pane key="3" tab="PKI登录">3</a-tab-pane> -->
          <!-- </a-tabs> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
	  return {
      activeKey: '1',
      from: {
        loginName: '',
        password: ''
      },
      checkbox: [],
      disabled: false,
      rules: {
        loginName: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      }
	  }
  },
  methods: {
    login () {
      let self = this
      this.$refs.refModel.validate(async state => {
        if (state) {
          const data = await this.$postAxios('/api/login/loginInByUser', this.from)
          window.sessionStorage.setItem('loginSessionid', data.sessionid)
          window.sessionStorage.setItem('userName', data.nickName)
            window.sessionStorage.setItem('userId', data.id)
          self.$store.commit('changeUserName', data.nickName) // 登录昵称赋值
          self.$store.commit('changeSessionId', data.sessionid) // sessionid赋值
          self.$store.commit('changeUserOrgId', data.id) // 用户权限所在机构
          self.$store.commit('changeToken', data.token) // 用户权限所在机构

          self.getMapVideoToken() // 通过sessionid获取的token
          this.$router.push('/')
        } else {
          return false
        }
      })
    },
    //抓拍图登录
    async getMapVideoToken() {
      let self = this
      let params = {
        sessionid:window.sessionStorage.getItem('loginSessionid')
      }
      const data = await this.$postAxios('http://190.13.37.2:8077/facePlatform/v2/face/apiAuthorty',params)
      if(data.code == '200') {
        window.sessionStorage.setItem('token', data.token);
        self.$store.commit('changeToken', data.token); // 存储token
      }
    },
  }
}
</script>


<style lang="scss" scoped>
.main {
  background: url('../../assets/img/login_bg.png') no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: relative;
  > .css-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    > p {
      text-align: center;
      margin-bottom: 40px;
    }
  }
}
.css-loginWay{
  background: rgba(33, 59, 184, .7);
  width: 920px;
  height: 480px;
  border-radius: 20px;
  position: relative;
  > p {
    display: block;
    width: 300px;
    height: 300px;
    margin: 60px 0 0 84px;
    float: left;
  }
  > .css-segmentation {
    display: block;
    width: 1px;
    height: 320px;
    margin: 80px 0 0 52px;
    background: $theme-background-login;
    opacity: 1;
    float: left;
  }
  > .css-tab {
    float: left;
    width: 483px;
    padding: 0 52px 0 63px;
    margin-top: 80px;
    > .css-title {
      font-size: 18px;
      text-align: center;
      color: $theme-white;
      margin-bottom: 15px;
    }
  }
}

.css-inputStyle,.has-error .ant-input, .has-error .ant-input:hover{
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #1ad4cd;
  border-radius: 0;
  outline: none;
  color: #fff;
  font-size: 18px;
   input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #1ad4cd;
    border-radius: 0;
    outline: none;
    color: #fff;
    font-size: 18px;
  }
}
.css-inputStyle:focus{
  outline: none;
  box-shadow: none;
}
.css-fromBtn{
  float: right;
  margin-top: 3px;
  background-color: transparent;
  color: $theme-blue1;
  border: 1px solid #1890ff;
  &:hover,&:focus{
    background-color: transparent;
    color: $theme-blue1;
  }
  &.ant-btn-primary[disabled]{
    background-color: transparent;
    color: $theme-blue1;
    border-color: $theme-blue1;
  }
}
.css-btnStyle{
  width: 112px;
  border-radius: 60px;
  &:first-child{
    color: #0e193d;
    background-color: #1890ff;
  }
  &:last-child{
    margin-left:20px;
    background-color: transparent;
    color: $theme-blue1;
    border: 1px solid $theme-blue1;
  }
}
.css-loginEr{
  text-align: center;
  > .css-ErPic {
    height: 140px;
    width: 140px;
    margin: 0 auto;
    cursor: pointer;
    > .css-refresh {
      display: inline-block;
      width: 140px;
      height: 140px;
      background: rgba(14, 25, 61, .8);
      opacity: 0;
      transition: opacity .5s;
      > span{
        display: inline-block;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        cursor: pointer;
        > span {
          display: block;
          margin-top: 5px;
        }
        > i {
          font-size: 20px;
        }
      }
    }
    &:hover .css-refresh{
      opacity: 1;
    }
  }
  > .css-msg {
    margin-top: 20px;
  }
}
.ant-form {
  height: 130px;
  overflow: hidden;
}
</style>
<style lang="scss">
.css-tab .ant-checkbox-inner{
  border: 1px solid $theme-color-hover;
}
</style>
