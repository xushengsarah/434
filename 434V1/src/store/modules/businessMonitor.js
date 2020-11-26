let NS = 'businessMonitor.'

export default {
    state: {
        // 业务监控 
        serveListType: 1, // 服务清单类型 1、数据库
        currentServeListType: 1, // 当前左侧点击的服务
        backFlowchartIndex: ['firstCol', 0, 0], // 服务清单 返回

        // 服务图弹框 变量
        isOthers: false,
        serviceTitle: '视频播放业务服务', // 弹框标题
        tabsVal: [ // 弹框当前所有tabs赋值
            {
                name: '实况/录像播放（国标接入）',
                key: '0'
            }],
        tabsCol: 4, // 弹框当前tab占用的位置
        currentItem: '', // 当前显示的拓扑图
        centerData: { // 主页面 模块图数据
            firstCol: [
            {
                title: '视频播放业务',
                tabsCol: 6,
                service: [
                {
                    name: '实况/录像播放（国标接入）',
                    model: 'video',
                    status: 0
                },
                {
                    name: '实况/录像播放（VCN接入）',
                    model: 'video',
                    status: 0
                },
                {
                    name: '实况/录像播放（其他方式接入）',
                    model: 'video',
                    status: 0
                }
                ]
            }, {
                title: '其他业务',
                tabsCol: 4,
                service: [
                {
                    name: '登录视综',
                    model: 'others',
                    status: 1
                },
                {
                    name: '电子地图',
                    model: 'others',
                    status: 0
                },
                {
                    name: '视频研判',
                    model: 'others',
                    status: 0
                },
                {
                    name: '取流管控',
                    model: 'others',
                    status: 0
                }
                ]
            }
            ],
            secondCol: [
            {
                title: '视频共享业务',
                tabsCol: 6,
                service: [
                {
                    name: '上级平台取流（国标共享）',
                    model: 'share',
                    status: 0
                },
                {
                    name: '上级平台取流（星火SDK）',
                    model: 'share',
                    status: 0
                }
                ]
            }, {
                title: '城市人像业务',
                tabsCol: 4,
                service: [
                {
                    name: '静态比对',
                    model: 'city',
                    status: 0
                },
                {
                    name: '动态比对',
                    model: 'city',
                    status: 0
                },{
                    name: '告警推送',
                    model: 'city',
                    status: 0
                },
                {
                    name: '人像布控',
                    model: 'city',
                    status: 0
                },{
                    name: 'PC登录',
                    model: 'city',
                    status: 0
                },
                {
                    name: 'APP登录',
                    model: 'city',
                    status: 0
                },
                ]
            }
            ],
            thirdCol: [
            {
                title: '案件视频网',
                tabsCol: 4,
                service: [
                {
                    name: '警/案情查询',
                    model: 'case',
                    status: 0
                },
                {
                    name: '离线视频播放',
                    model: 'case',
                    status: 0
                }
                ]
            }, {
                title: '运行管理',
                tabsCol: 4,
                service: [
                {
                    name: '运维数据查询',
                    model: 'running',
                    status: 0
                },
                {
                    name: '视频质量检测',
                    model: 'running',
                    status: 0
                },{
                    name: '镜头状态检测',
                    model: 'running',
                    status: 0
                },
                {
                    name: '镜头位置比对',
                    model: 'running',
                    status: 0
                },{
                    name: '镜头故障流程',
                    model: 'running',
                    status: 0
                }
                ]
            }
            ]
        },

    },
    getters: {
        [NS + 'serveListType']: state => {
            return state.serveListType
        },
        [NS + 'currentServeListType']: state => {
            return state.currentServeListType
        },
        [NS + 'backFlowchartIndex']: state => {
            return state.backFlowchartIndex
        },

        [NS + 'isOthers']: state => {
            return state.isOthers
        },
        [NS + 'serviceTitle']: state => {
            return state.serviceTitle
        },
        [NS + 'tabsVal']: state => {
            return state.tabsVal
        },
        [NS + 'tabsCol']: state => {
            return state.tabsCol
        },
        [NS + 'currentItem']: state => {
            return state.currentItem
        },
        [NS + 'centerData']: state => {
            return state.centerData
        },

    },
    mutations: {
        [NS + 'changeServeListType'] (state, val) {
            state.serveListType = val
        },
        [NS + 'changeCurrentServeListType'] (state, val) {
            state.currentServeListType = val
        },
        [NS + 'changeBackFlowchartIndex'] (state, val) {
            state.backFlowchartIndex = val
        },

        [NS + 'changeIsOthers'] (state, val) {
            state.isOthers = val
        },
        [NS + 'changeServiceTitle'] (state, val) {
            state.serviceTitle = val
        },
        [NS + 'changeTabsVal'] (state, val) {
            state.tabsVal = val
        },
        [NS + 'changeTabsCol'] (state, val) {
            state.tabsCol = val
        },
        [NS + 'changeCurrentItem'] (state, val) {
            state.currentItem = val
        },
        [NS + 'changeCenterData'] (state, val) {
            state.centerData = val
        },

    },
    actions: {
        [NS + 'changeServeListType'] (state, val) {
            state.commit('changeServeListType', val)
        },
        [NS + 'changeCurrentServeListType'] (state, val) {
            state.commit('changeCurrentServeListType', val)
        },
        [NS + 'changeBackFlowchartIndex'] (state, val) {
            state.commit('changeBackFlowchartIndex', val)
        },

        [NS + 'changeIsOthers'] (state, val) {
            state.commit('changeIsOthers', val)
        },
        [NS + 'changeServiceTitle'] (state, val) {
            state.commit('changeServiceTitle', val)
        },
        [NS + 'changeTabsVal'] (state, val) {
            state.commit('changeTabsVal', val)
        },
        [NS + 'changeTabsCol'] (state, val) {
            state.commit('changeTabsCol', val)
        },
        [NS + 'changeCurrentItem'] (state, val) {
            state.commit('changeCurrentItem', val)
        },
        [NS + 'changeCenterData'] (state, val) {
            state.commit('changeCenterData', val)
        },

    }
}