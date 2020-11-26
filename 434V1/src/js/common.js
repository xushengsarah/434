export default {

  /** 列表中 后台返回的数字 经过字典转换为文字显示
   * @param {Object} listArr 字典数据
   * @param {Object} transferArr 需要转换数据
   * @param {string} fieldName 需要转换的字段名
   */
  transferNumToText(listArr, transferArr, fieldName) {
      if (listArr.length > 0 && transferArr && fieldName) {
          for (let i = 0; i < transferArr.length; i++) { // 列表中的机构类型 数字转换为文字显示
              for (let j = 0; j < listArr.length; j++) {
                  if (transferArr[i][fieldName] === listArr[j].code || transferArr[i][fieldName] + '' === listArr[j].code + '') {
                      transferArr[i][fieldName + 'Text'] = listArr[j].name
                  }
              }
          }
      }
  },

  // 根据时间戳获取标准时间
  timeVideoToTime(timestamp) {
      var date = new Date(parseInt(timestamp));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

      var YV = date.getFullYear();
      var MV = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      var DV = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      var hv = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
      var mv = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
      var sv = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return {'date': Y + M + D, 'time': h + m + s, 'dateTime': Y + M + D + ' ' + h + m + s, 'stamp': Date.parse(date), 'videoTime': YV + MV + DV + hv + mv + sv };
  },


  /**
   * 中国标准时间 转换为 yyyy-MM-dd HH:mm:ss
   * val 中国标准时间
   */
  formateDate(val, toDay) {
      let self = this
      let d = new Date(val)
      let _year = d.getFullYear()
      let _month = d.getMonth() + 1
      let _date = d.getDate()
      let _hour = d.getHours()
      let _minute = d.getMinutes()
      let _second = d.getSeconds()
      if (toDay) {
          return _year + '-' + self.formatTen(_month) + '-' + self.formatTen(_date)
      } else {
          return _year + '-' + self.formatTen(_month) + '-' + self.formatTen(_date) + ' ' + self.formatTen(_hour) + ':' + self.formatTen(_minute) + ':' + self.formatTen(_second)
      }
  },
  /**
   * 中国标准时间 转换为 yyyy-MM-dd HH:mm:ss
   * val 中国标准时间
   * 注：分号为中文，表示导出文件的名字
   */
  formateDateToExportName(val) {
      let self = this
      let d = new Date(val)
      let _year = d.getFullYear()
      let _month = d.getMonth() + 1
      let _date = d.getDate()
      let _hour = d.getHours()
      let _minute = d.getMinutes()
      let _second = d.getSeconds()
      return _year + self.formatTen(_month) + self.formatTen(_date) + self.formatTen(_hour) + self.formatTen(_minute) + self.formatTen(_second)
  },
  /**
   * 中国标准时间 转换为 yyyyMMddHHmmss
   * val 中国标准时间
   */
  formateToParam(d, toDay) {
      let self = this
      let _year = d.getFullYear()
      let _month = d.getMonth() + 1
      let _date = d.getDate()
      let _hour = d.getHours()
      let _minute = d.getMinutes()
      let _second = d.getSeconds()
      if (toDay) {
          return _year  + self.formatTen(_month) + self.formatTen(_date)
      } else {
          return _year + self.formatTen(_month) + self.formatTen(_date) + self.formatTen(_hour) + self.formatTen(_minute) + self.formatTen(_second)
      }
  },
  // 小于10的数字，补齐两位
  formatTen(s) {
      return s < 10 ? '0' + s : s + ''
  },

  /**
   * 获取前n天0点时间戳
   * @param {Num} time 前n天
   */
  getTimeStamp (time) {
      if (time == undefined) {
          return new Date(new Date().toLocaleDateString()).getTime();
      } else {
          return new Date(new Date().toLocaleDateString()).getTime() + time * 24 * 3600 * 1000
      }
  },
  /**
   * 时间戳转小时
   * @param {Num} time 后台返回13位时间戳
   */
  getDataTime (time) {
      const t = new Date(time)
      const y = t.getFullYear()
      const M = t.getMonth() + 1
      const d = t.getDate()
      const h = t.getHours() < 10 ? '0' + t.getHours() : t.getHours()
      const m = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes()
      return h + ':' + '00'
  },
}
