/**
 * https://www.jianshu.com/p/938004c22ed9
 */

import store from '../store'

/**建立连接 */
// export function createSocket() {
//   return new Promise((resolve, reject) => {
//     if (!store.state.SocketFace) {
//       console.log('正在建立websocket连接...')
//       store.state.SocketFace = new WebSocket(WSS_URL_FACE)
//       store.state.SocketFace.onopen = function () {
//         console.log('websocket-face连接成功...')
//         resolve();
//       }
//       store.state.SocketFace.onmessage = onmessageWS
//       store.state.SocketFace.onerror = onerrorWS
//       store.state.SocketFace.onclose = oncloseWS
//     } else {
//       console.log('websocket-face已连接');
//       resolve();
//     }

//     if (!store.state.SocketCar) {
//       console.log('正在建立websocket连接...')
//       store.state.SocketCar = new WebSocket(WSS_URL_CAR)
//       store.state.SocketCar.onopen = function () {
//         console.log('websocket-car连接成功...')
//         resolve();
//       }
//       store.state.SocketCar.onmessage = onmessageWS
//       store.state.SocketCar.onerror = onerrorWS
//       store.state.SocketCar.onclose = oncloseWS
//     } else {
//       console.log('websocket-car已连接');
//       resolve();
//     }
//   });
// }

// /**打开WS之后发送心跳 */
// export function onopenWS() {
//   console.log('websocket已连接')
// }

// /**连接失败重连 */
// export function onerrorWS() {
//   console.log('websocket连接失败重连...')
//   store.state.SocketFace.close();
//   store.state.SocketFace = null;
//   store.state.SocketCar.close();
//   store.state.SocketCar = null;
//   // createSocket() //重连
// }

// /**WS数据接收统一处理 */
// export function onmessageWS(e) {
//   console.log('接收到websocket值。。。。。。。')
//   store.state.SocketFaceData = JSON.parse(e.data)

//   // 人像数据赋值
//   let retData = JSON.parse(e.data)
//   if (retData.type == 'snapImg') {
//     store.state.SocketFaceData = retData
//   } else if (retData.requestName == 'carmsg' && retData.requestType == 1) {
//     store.state.SocketCarData = retData
//   } else {
//     console.log('error:' + retData.msg)
//   }

//   window.dispatchEvent(new CustomEvent('onmessageWS', {
//     detail: {
//       data: e
//     }
//   }))
// }

// /**发送数据
//  * @param eventType
//  * readyState:
//     0 (WebSocket.CONNECTING)正在链接中
//     1 (WebSocket.OPEN)已经链接并且可以通讯
//     2 (WebSocket.CLOSING)连接正在关闭
//     3 (WebSocket.CLOSED)连接已关闭或者没有链接成功
// */
// export function sendWSPush(eventTypeArr) {
//   if (store.state.SocketFace !== null && store.state.SocketFace.readyState === 3) {
//     //重连
//     store.state.SocketFace.close()
//     createSocket().then(() => {
//       store.state.SocketFace.send(eventTypeArr);
//     })
//   } else if (store.state.SocketFace.readyState === 1) {
//     store.state.SocketFace.send(eventTypeArr); // JSON.string(eventTypeArr);
//   } else if (store.state.SocketFace.readyState === 0) {
//     setTimeout(() => {
//       store.state.SocketFace.send(eventTypeArr);
//     }, 3000)
//   }
// }

// /**关闭WS */
// export function oncloseWS() {
//   store.state.SocketFaceIsClose = true;
//   console.log('websocket已断开', store.state.SocketFace && store.state.SocketFace.readyState);
//   store.state.SocketFace = null;
//   // createSocket() //重连
// }

// function userLogin() {
//     if (!window.WebSocket) {
//         window.WebSocket = window.MozWebSocket;
//     }
//     if (window.WebSocket) {

//         window.socket.onopen = function (event) {
//             console.log("connection success!!");
//             //openInvake(event);
//         };
//         window.socket.onmessage = function (event) {
//             var data = JSON.parse(event.data);

//             switch (data.type) {
//                 //实时视频和抓拍图
//                 case "snapImg":
//                     console.log(data);
//                     break;
//             }
//         };
//         window.socket.onclose = function (event) {
//             console.log("connection close!!!");
//         };
//     } else {
//         //alert("您的浏览器不支持WebSocket！！！");
//     }
// }

// userLogin();
let socket = '';
let socketCar = '';
let lockReconnect = '';
let isClose = false;
const WSS_URL_FACE = `ws://190.13.37.2:8077/facePlatform/websocket`
const WSS_URL_CAR = `ws://190.15.116.8:8083/websocket`
const sendCar = (data) => {
    //console.log(socketCar);
    //console.log(JSON.stringify(data));
    socketCar.send(JSON.stringify(data));
}
//断开连接的请求
const getMapVideoPush = () => {
    let wsFaceSend = {
        code: 10086,
        requestType: 1,
        requestName: "facemsg",
        requestId: window.sessionStorage.getItem('userId'),
        param: {
            code: store.state.cameraGroupIds.cameraId
        }
    }, wsCarSend = {
            "code": 10086,
            "requestType": 1,
            "requestName": "carmsg",
            "requestId": window.sessionStorage.getItem('userId'),
            "param": {
                "code": store.state.kkGroupIds.kkIds
            }
    }
    sendCar(wsCarSend);
    sendCar(wsFaceSend);
}
const createSocket = () => {
    if (window.WebSocket) {
        socket = new WebSocket(WSS_URL_FACE + '?token=' + window.sessionStorage.getItem('token'));
        socket.onopen = function (event) {
            console.log("connection success!!");
            //openInvake(event);
            //console.log(store.state.snapImgData);
        };
        socket.onmessage = function (event) {
            var data = JSON.parse(event.data);
            switch (data.type) {
                //实时视频和抓拍图
                // case "snapImg":
                //     console.log(data);
                //     store.state.cameraGroupIds.cameraId.forEach(element => {
                //         if (element == data.data.cameraId) {
                //             let obj = {
                //                 type: 'addSnap',
                //                 snapImg: data.data
                //             }

                //             store.commit("changeAddCameraGroupIds", obj);
                //         }
                //     });
                //     store.state.snapImgData.forEach(item => {
                //         if (item.cameraId == data.data.cameraId) {
                //             let objSnapImg = {
                //                 type: 'pushArr',
                //                 cameraId: data.data.cameraId,
                //                 snapImgArr: data.data
                //             };
                //             store.commit("changeAddSnapImgData", objSnapImg);
                //         }
                //     })
                //     console.log(store.state.snapImgData, store.state.cameraGroupIds);
                //     break;
                //抓拍数推送地图
                case "cameraSnapStatistics":
                    // 地图展示
                    let searchMapIframe = document.getElementById('cameraUserMap')
                    let targetOrigin = 'http://190.168.17.2:6083/keyArea.html'
                    let locationData = {
                        type: "cameraSnapStatistics",
                        data: data
                    }
                    if (searchMapIframe.contentWindow) {
                        searchMapIframe.contentWindow.postMessage(locationData, targetOrigin);
                    }
                    break;
            }
        };
        socket.onclose = function (event) {
            console.log("connection close!!!");
        };
    }
}
//type=1代表重连
const createSocketCar = (type) => {
    if (window.WebSocket) {
        socketCar = new WebSocket(WSS_URL_CAR);
        socketCar.onopen = function (event) {
            isClose = false;
            console.log("connection success car!!");
            clearTimeout(lockReconnect);
            let wsLoginSend = {
                code: 10000,
                nick: window.sessionStorage.getItem('userName'),
                sessionid: window.sessionStorage.getItem('loginSessionid'),
                userid: window.sessionStorage.getItem('userId')+"_web",
                sourceType: "1"
            };
            sendCar(wsLoginSend);
        };
        socketCar.onmessage = function (event) {
            var data = JSON.parse(event.data);
            //console.log(data);
            if (data.extend&&data.extend.mess == true &&type) {
                getMapVideoPush();
            }
            if (data.uri == '476') {
                sendCar({code:10016});
            }
            if (data.retcode == '000' && data.msg == 'success') {
                if (data.requestName == 'facemsg') {
                    data.body.forEach(item => {
                        //console.log(item);
                        store.state.cameraGroupIds.cameraId.forEach(element => {
                            if (element == item.cameraId) {
                                let obj = {
                                    type: 'addSnap',
                                    snapImg: item
                                }

                                store.commit("changeAddCameraGroupIds", obj);
                            }
                        });
                        store.state.snapImgData.forEach(element => {
                            if (element.cameraId == item.cameraId) {
                                let objSnapImg = {
                                    type: 'pushArr',
                                    cameraId: element.cameraId,
                                    snapImgArr: item
                                };
                                store.commit("changeAddSnapImgData", objSnapImg);
                            }
                        })
                        //console.log(store.state.snapImgData, store.state.cameraGroupIds);
                    })
                } else {
                    let obj = {
                        type: 'addSnap',
                        snapImg: data.body
                    }

                    store.commit("changeAddKkIds", obj);
                }
            }
        };
        socketCar.onclose = function (event) {
            console.log("connection car close!!!");
            if (!isClose) {
                reconnect();
            }
        };
        socketCar.onerror = function () {
            reconnect();
        }
    }
}
const reconnect = ()=>{
    lockReconnect = setTimeout(() => {
        createSocketCar(true);
    },2000)
}
//断开
const closeCar = () => {
    isClose = true;
    socketCar.close();
}
export default {createSocket,createSocketCar,sendCar,closeCar}
