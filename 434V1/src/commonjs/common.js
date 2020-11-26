import $axios from 'axios'

$axios.interceptors.request.use(config => {
  config.headers.sessionid = window.sessionStorage.getItem('loginSessionid')
  config.url = config.url.replace('/api/', 'http://190.13.37.20:8088/bigScreen/api/v2/')
  // config.url = config.url.replace('/api/', 'http://190.15.240.159:8088/bigScreen/api/v2/') // 黄乐书
  // config.url = config.url.replace('/api/', 'http://190.13.255.50:18088/bigScreen/api/v2/')
  return config
})

export async function axios(url, data) {
	const { data: res } = await $axios.get(url, {params:data});
  if (res.code === 200 || res.code == '200') {
    if (res.data) {
      return res.data
    } else {
      return 'success'
    }
  } else {
    if (res.code === '618') {
      this.$message.error("session失效，请重新登录")
      this.$router.push('/login')
    } else {
      this.$message.error(res.message)
    }
  }
}

export async function http(url, data,config) {
  const resData = await $axios.get(url, { params: data ,headers:config});
  return resData
}

export async function postAxios(url, data,config) {
  const { data: res } = await $axios.post(url, data,config);
  if (res.retCode === '000' || res.code == 200) {
    if (res.data) {
      return res.data
    } else if (res.token) {
      return res
    } else {
      return 'success'
    }
  } else {
    this.$message.error(res.msg)
  }
}
