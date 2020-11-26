
export const state = {
  userName: '',
  loginName: '',
  sessionId: '',
  userOrgId: '',
  token: '',
  SocketFace: null,
  SocketFaceData: {},
  SocketFaceIsClose: false,
  snapImgData: [],  //实时视频播放
  cameraGroupIds: {  //镜头组人脸集合
    cameraId: [],
    snapImg:[]
  }, //镜头组车辆集合
  kkGroupIds: {
    kkIds: [],
    snapImg:[]
  },
  selectedCameraTypeData: '', // 镜头当前选中数据
  echartsColor: {
    fontColor: '#afbcd4'
  },
};
export const getters = {
  userName() {
    return state.userName
  },
  loginName() {
    return state.loginName
  },
  sessionId() {
    return state.sessionId
  },
  userOrgId() {
    return state.userOrgId
  },
  token() {
    return state.token
  },
  SocketFace() {
    return state.SocketFace
  },
  SocketFaceData() {
    return state.SocketFaceData
  },
  SocketFaceIsClose() {
    return state.SocketFaceIsClose
  },
  titleName () {
    return state.titleName
  },
  selectedCameraTypeData() {
    return state.selectedCameraTypeData
  },
  echartsColor() {
    return state.echartsColor
  },
};
export const mutations = {
  changeUserName(state, val) {
    state.userName = val
  },
  changeLoginName(state, val) {
    state.loginName = val
  },
  changeSessionId(state, val) {
    state.sessionId = val
  },
  changeUserOrgId(state, val) {
    sessionStorage.setItem('userOrgId', val)
    state.userOrgId = val
  },
  changeToken(state, val) {
    sessionStorage.setItem('token', val)
    state.token = val
  },
  changeAddSnapImgData(state, val) {
    if (val.type == 'add') {
      let flag = true;
      state.snapImgData.forEach((element, index) => {
        if (element.cameraId == val.cameraId) {
          flag = false;
        }
      });
      if (flag) {
        state.snapImgData.push(val);
      }
    } else if (val.type == 'pushArr' || val.type == 'delete') {
      state.snapImgData.forEach((element, index) => {
        if (element.cameraId == val.cameraId) {
          if (val.type == 'pushArr') {
            element.snapImgArr.unshift(val.snapImgArr);
            element.snapImgArr.splice(4, element.snapImgArr.length);
          } else {
            state.snapImgData.splice(index, 1);
            return;
          }
        }
      });
    }
  },
  deleteAllSnapImgData(state, val) {
    state.snapImgData = [];
  },
  changeAddCameraGroupIds(state, val) {
    if (val.type == "addCamera") {
      state.cameraGroupIds.cameraId.push(val.cameraId);
    } else if (val.type == "addSnap") {
      state.cameraGroupIds.snapImg.unshift(val.snapImg);
      state.cameraGroupIds.snapImg.splice(15, state.cameraGroupIds.snapImg.length);
    } else {
      state.cameraGroupIds.cameraId = [];
      state.cameraGroupIds.snapImg = [];
    }
  },
  changeAddKkIds(state, val) {
    if (val.type == 'addKK') {
      state.kkGroupIds.kkIds = val.kkId;
    } else if (val.type == 'addSnap') {
      val.snapImg.forEach(item => {
        state.kkGroupIds.snapImg.unshift(item);
        state.kkGroupIds.snapImg.splice(15, state.kkGroupIds.snapImg.length);
      })
      console.log(state.kkGroupIds.snapImg);
    } else {
      state.kkGroupIds.kkIds = [];
      state.kkGroupIds.snapImg = [];
    }
  },
  changeSelectedCameraTypeData(state, val) {
    state.selectedCameraTypeData = val
  },
  changeEchartsColor(state, val) {
    state.echartsColor = val
  },
};
export const actions = {
  changeUserName(state, val) {
    state.commit('changeUserName', val)
  },
  changeLoginName(state, val) {
    state.commit('changeLoginName', val)
  },
  changeSessionId(state, val) {
    state.commit('changeSessionId', val)
  },
  changeUserOrgId(state, val) {
    state.commit('changeUserOrgId', val)
  },
  changeToken(state, val) {
    state.commit('changeToken', val)
  },
}
