// ==定义全局axios请求==
import axios from 'axios'

const httpIP = 'http://190.13.37.20:8088/bigScreen/api/v2/';

const axiosHttp = axios.create({
  baseURL: httpIP,
  timeout: 60000,
  headers: {'Content-Type': 'application/json;charset=utf-8'}
});

// 监听请求头带sessionid
axiosHttp.interceptors.request.use(
  config => {
      if (sessionStorage.getItem('loginSessionid')) {
          config.headers.sessionid = sessionStorage.getItem('loginSessionid')
      }else{
          config.headers.sessionid = ''
      }
      return config
  },err => {
      return Promise.reject(err)
  }
);


// ==暴露定义好的axios请求==
export default {
  // 获取SVN流量数据
  getVcnFlowData ( data ) { return axiosHttp('flow/getVcnFlow', data); },

  // 获取交换机流量统计
  getInterchangerFlowData ( data ) { return axiosHttp('flow/getSwitchFlow', data); },

  // 获取边界流量统计
  getBoundaryFlow ( data ) { return axiosHttp('flow/getBoundaryFlow', data); },

  // 获取VNC和交换机趋势
  getTendencyData(data) { return axiosHttp.get('homePage/getTrendStatistics', data); }

}
