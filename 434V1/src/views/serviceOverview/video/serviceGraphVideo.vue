<!-- 国标接入 -->
<template>
    <div id="serviceGraphVideo">
    </div>
</template>

<script>
import G6 from '@antv/g6'
export default {
    data() {
        return {
            sourceData: {
                nodes: [
                    {
                        id: "client",
                        label: "客户端",
                        x: 160,
                        y: 30,
                        size: [350, 100],
                        linkPoints: { // 指定矩形周围小圆点
                            bottom: true, // 是否显示下部的圆点
                            size: 11, // 圆点的大小
                            fill: '#00172d', // 圆点的填充色
                            stroke: '#2193FE', // 圆点的边框颜色
                            lineWidth: 1, // 圆点边框的宽度
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.67, 1],
                            [0.14, 1],
                        ],
                        status: [],
                    },
                    {
                        id: "http",
                        label: "http网关服务",
                        x: 284,
                        y: 115,
                        size: [222, 44],
                        linkPoints: { // 指定矩形周围小圆点
                            top: true, // 是否显示上部的圆点
                            bottom: true, // 是否显示下部的圆点
                            size: 11, // 圆点的大小
                            fill: '#00172d', // 圆点的填充色
                            stroke: '#2193FE', // 圆点的边框颜色
                            lineWidth: 1, // 圆点边框的宽度
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0],
                            [0.78, 1]
                        ],
                        status: [0, 0, 0, 0], // 0:正常 1:异常
                    },
                    {
                        id: "rtsp",
                        label: "rtsp服务",
                        x: 160,
                        y: 200,
                        size: [96, 44],
                        linkPoints: { // 指定矩形周围小圆点
                            right: true, // 是否显示右侧的圆点
                            bottom: true, // 是否显示下部的圆点
                            size: 11, // 圆点的大小
                            fill: '#00172d', // 圆点的填充色
                            stroke: '#2193FE', // 圆点的边框颜色
                            lineWidth: 1, // 圆点边框的宽度
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 1],
                            [0.5, 0],
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    },
                    {
                        id: "address",
                        label: "取地址服务",
                        x: 286,
                        y: 200,
                        size: [96, 44],
                        linkPoints: { // 指定矩形周围小圆点
                            right: true, // 是否显示右侧的圆点
                            bottom: true, // 是否显示下部的圆点
                            size: 11, // 圆点的大小
                            fill: '#00172d', // 圆点的填充色
                            stroke: '#2193FE', // 圆点的边框颜色
                            lineWidth: 1, // 圆点边框的宽度
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [1, 0.5],
                            [0.5, 1]
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    },
                    {
                        id: "list",
                        label: "列表服务",
                        x: 410,
                        y: 200,
                        size: [96, 44],
                        linkPoints: { // 指定矩形周围小圆点
                            right: true, // 是否显示右侧的圆点
                            bottom: true, // 是否显示下部的圆点
                            size: 11, // 圆点的大小
                            fill: '#00172d', // 圆点的填充色
                            stroke: '#2193FE', // 圆点的边框颜色
                            lineWidth: 1, // 圆点边框的宽度
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0],
                            [0, 0.5],
                            [0.5, 1]
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    },
                    {
                        id: "rtsp2",
                        label: "rtsp服务",
                        x: 410,
                        y: 288,
                        size: [96, 44],
                        linkPoints: { // 指定矩形周围小圆点
                            right: true, // 是否显示右侧的圆点
                            bottom: true, // 是否显示下部的圆点
                            size: 11, // 圆点的大小
                            fill: '#00172d', // 圆点的填充色
                            stroke: '#2193FE', // 圆点的边框颜色
                            lineWidth: 1, // 圆点边框的宽度
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0],
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    },
                    {
                        id: "stream",
                        label: "流媒体服务",
                        x: 160,
                        y: 376,
                        size: [196, 44],
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.89, 0],
                            [1, 0.5],
                            [0.355, 1],
                            [0.25, 0],
                        ],
                        status: [0, 0], // 0:正常 1:异常
                    },
                    {
                        id: "standard",
                        label: "国标网关",
                        x: 410,
                        y: 376,
                        size: [96, 44],
                        linkPoints: { // 指定矩形周围小圆点
                            right: true, // 是否显示右侧的圆点
                            bottom: true, // 是否显示下部的圆点
                            size: 11, // 圆点的大小
                            fill: '#00172d', // 圆点的填充色
                            stroke: '#2193FE', // 圆点的边框颜色
                            lineWidth: 1, // 圆点边框的宽度
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0, 0.5],
                            [0.5, 1]
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    },
                    {
                        id: "third",
                        label: "第三方平台",
                        x: 160,
                        y: 464,
                        size: [350, 100],
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.85, 0],
                            [0.5, 1],
                            [0.2, 0],
                        ],
                        status: [], // 0:正常 1:异常
                    },
                    {
                        id: "camera",
                        label: "镜头",
                        x: 160,
                        y: 552,
                        size: [350, 100],
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0]
                        ],
                        status: [], // 0:正常 1:异常
                    },
                ],
                edges: [
                    {
                        source: "client",
                        target: "http",
                        sourceAnchor: 0, // 该边连入 source 点的第 0 个 anchorPoint
                        targetAnchor: 0, // 该边连入 target 点的第 0 个 anchorPoint
                    },
                    {
                        source: "http",
                        target: "list",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    },
                    {
                        source: "address",
                        target: "list",
                        sourceAnchor: 0,
                        targetAnchor: 1,
                    },
                    {
                        source: "list",
                        target: "rtsp2",
                        sourceAnchor: 2,
                        targetAnchor: 0,
                    },
                    {
                        source: "address",
                        target: "stream",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    },
                    {
                        source: "stream",
                        target: "standard",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    },
                    {
                        source: "standard",
                        target: "third",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    },
                    {
                        source: "camera",
                        target: "third",
                        sourceAnchor: 0,
                        targetAnchor: 1,
                        type: 'line-dash',
                        style: {
                            stroke: '#d62828',
                            endArrow: {
                                path: G6.Arrow.triangle(7, 7, 0), // 箭头宽度、长度、偏移量
                                d: 0,
                                fill: '#d62828',
                            },
                        }
                    },
                    {
                        source: "third",
                        target: "stream",
                        sourceAnchor: 2,
                        targetAnchor: 2,
                        type: 'line-dash',
                        style: {
                            stroke: '#d62828',
                            endArrow: {
                                path: G6.Arrow.triangle(7, 7, 0), // 箭头宽度、长度、偏移量
                                d: 0,
                                fill: '#d62828',
                            },
                        }
                    },
                    {
                        source: "stream",
                        target: "rtsp",
                        sourceAnchor: 3,
                        targetAnchor: 0,
                        type: 'line-dash',
                        style: {
                            stroke: '#d62828',
                            endArrow: {
                                path: G6.Arrow.triangle(7, 7, 0), // 箭头宽度、长度、偏移量
                                d: 0,
                                fill: '#d62828',
                            },
                        }
                    },
                    {
                        source: "rtsp",
                        target: "client",
                        sourceAnchor: 1,
                        targetAnchor: 1,
                        type: 'line-dash',
                        style: {
                            stroke: '#d62828',
                            lineDash: [1, 2, 3],
                            endArrow: {
                                path: G6.Arrow.triangle(7, 7, 0), // 箭头宽度、长度、偏移量
                                d: 0,
                                fill: '#d62828',
                            },
                        }
                    },
                ]
            }
        }
    },
    mounted() {
        this.initG6()
    },
    methods: {
        // 其他业务
        initG6() {
            let self = this
            const width = document.getElementById('serviceGraphVideo').scrollWidth;
            const graph = new G6.Graph({
                container: 'serviceGraphVideo', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
                // width: 798, // Number，必须，图的宽度
                width, // Number，必须，图的宽度
                height: 680, // Number，必须，图的高度
                // renderer: 'svg',
                fitView: true, // 自适应画布大小
                fitCenter: true,
                fitViewPadding: [30, 40, 40, 20], // 画布四周留白
                // linkCenter: true,
                autoPaint: true,
                defaultNode: {
                    // type: 'rect',
                    type: 'rectNode',
                    size: [222, 44],
                    style: {
                        radius: 4,
                        fill: '#002343',
                        fillOpacity: 0.7,
                        stroke: '#2193FE',
                        lineWidth: 1,
                        cursor: 'pointer',
                    },
                    labelCfg: { // 标签文本配置
                        style: {
                            fill: '#fff',
                            fontSize: 16,
                            fontFamily: 'Source Han Sans SC',
                            cursor: 'pointer',
                        },
                    },
                },
                defaultEdge: {
                    style: {
                        stroke: '#2193FE',
                        lineWidth: 1,
                        endArrow: {
                            path: G6.Arrow.triangle(7, 7, 0), // 箭头宽度、长度、偏移量
                            d: 0,
                            fill: '#2193FE',
                        },
                    }
                }
            });
            G6.registerNode('rectNode', {
                shapeType: 'rect',
                draw: (cfg, group) => {
                    const shape = group.addShape('rect', {
                        attrs: { // 图像shape及其属性
                            x: 0, // 矩形左上角的x坐标
                            y: 0, // 矩形左上角的y坐标
                            width: cfg.size[0],
                            height: 44,
                            radius: 4,
                            // 默认的节点样式
                            fill: '#002343',
                            fillOpacity: 0.7,
                            stroke: '#2193FE',
                            lineWidth: 1,
                            label: cfg.label,
                            cursor: 'pointer',
                        },
                        draggable: true,
                    });
                    // 里面的那层
                    group.addShape('text', {
                        attrs: {
                            x: (cfg.size[0]) / 2,
                            y: 25,
                            textAlign: 'center',
                            text: cfg.label,
                            // 默认的标签配置
                            fill: '#fff',
                            fontSize: 16,
                            fontFamily: 'Source Han Sans SC',
                            cursor: 'pointer',
                        },
                        zIndex: 2,
                    });
                    
                    return shape
                },
                // 
                afterDraw(cfg, group) {
                    for (let i = 0; i < cfg.status.length; i++) {
                        if(cfg.status[i]) { // 异常 画红点
                            const back1 = group.addShape('circle', {
                                attrs: {
                                    x: 20 + 15 * i, // 圆心的x坐标
                                    y: 35, // 圆心的y坐标
                                    r: 2, // 圆的半径
                                    // 默认的节点样式
                                    fill: '#d00000',
                                    cursor: 'pointer',
                                },
                                draggable: true,
                                zIndex: 3,
                                name: 'back1-shape',
                            });
                            const back2 = group.addShape('circle', {
                                attrs: {
                                    x: 20 + 15 * i, // 圆心的x坐标
                                    y: 35, // 圆心的y坐标
                                    r: 2, // 圆的半径
                                    // 默认的节点样式
                                    fill: '#ff1515',
                                    cursor: 'pointer',
                                },
                                draggable: true,
                                zIndex: 2,
                                name: 'back2-shape',
                            });
                            const back3 = group.addShape('circle', {
                                attrs: {
                                    x: 20 + 15 * i, // 圆心的x坐标
                                    y: 35, // 圆心的y坐标
                                    r: 2, // 圆的半径
                                    // 默认的节点样式
                                    fill: '#ff1515',
                                    cursor: 'pointer',
                                },
                                draggable: true,
                                zIndex: 1,
                                name: 'back3-shape',
                            });
                            group.sort()
                            back1.animate(
                                {
                                    r: 6,
                                    opacity: 0.3,
                                },
                                {
                                    duration: 3000,
                                    easing: 'easeCubic',
                                    delay: 0,
                                    repeat: true,
                                }
                            );
                            back2.animate(
                                {
                                    r: 6,
                                    opacity: 0.3,
                                },
                                {
                                    duration: 3000,
                                    easing: 'easeCubic',
                                    delay: 1000,
                                    repeat: true,
                                }
                            );
                            back3.animate(
                                {
                                    r: 6,
                                    opacity: 0.3,
                                },
                                {
                                    duration: 3000,
                                    easing: 'easeCubic',
                                    delay: 2000,
                                    repeat: true,
                                }
                            );
                        } else { // 正常 画蓝点
                            const blueBack1 = group.addShape('circle', {
                                attrs: {
                                    x: 20 + 15 * i, // 圆心的x坐标
                                    y: 35, // 圆心的y坐标
                                    r: 2, // 圆的半径
                                    // 默认的节点样式
                                    fill: '#6cc3fe',
                                    cursor: 'pointer',
                                },
                                draggable: true,
                                zIndex: 3,
                            });
                            const blueBack2 = group.addShape('circle', {
                                attrs: {
                                    x: 20 + 15 * i, // 圆心的x坐标
                                    y: 35, // 圆心的y坐标
                                    r: 2, // 圆的半径
                                    // 默认的节点样式
                                    fill: '#2b92d4',
                                    cursor: 'pointer',
                                },
                                draggable: true,
                                zIndex: 2,
                            });
                            const blueBack3 = group.addShape('circle', {
                                attrs: {
                                    x: 20 + 15 * i, // 圆心的x坐标
                                    y: 35, // 圆心的y坐标
                                    r: 2, // 圆的半径
                                    // 默认的节点样式
                                    fill: '#3BFFFF',
                                    cursor: 'pointer',
                                },
                                draggable: true,
                                zIndex: 1,
                            });
                            group.sort()
                            blueBack1.animate(
                                {
                                    r: 6,
                                    opacity: 0.3,
                                },
                                {
                                    duration: 3000,
                                    easing: 'easeCubic',
                                    delay: 0,
                                    repeat: true,
                                }
                            );
                            blueBack2.animate(
                                {
                                    r: 6,
                                    opacity: 0.3,
                                },
                                {
                                    duration: 3000,
                                    easing: 'easeCubic',
                                    delay: 1000,
                                    repeat: true,
                                }
                            );
                            blueBack3.animate(
                                {
                                    r: 6,
                                    opacity: 0.3,
                                },
                                {
                                    duration: 3000,
                                    easing: 'easeCubic',
                                    delay: 2000,
                                    repeat: true,
                                }
                            );
                        }
                    }
                },
            });
            const lineDash = [4, 2, 1, 2];
            G6.registerEdge('line-dash', {
                afterDraw(cfg, group) {
                    const shape = group.get('children')[0];
                    
                    // 动态虚线上的效果
                    // const startPoint = shape.getPoint(0);
                    // const circle = group.addShape('circle', {
                    //     attrs: {
                    //         x: startPoint.x,
                    //         y: startPoint.y,
                    //         fill: '#1890ff',
                    //         r: 3,
                    //     },
                    //     name: 'circle-shape',
                    // })
                    // circle.animate((ratio) => {
                    //     const tmpPoint = shape.getPoint(ratio);
                    //     return {
                    //         x: tmpPoint.x,
                    //         y: tmpPoint.y,
                    //     };
                    // },
                    // {
                    //     repeat: true,
                    //     duration: 3000,
                    //     transform-origin: 100% 0,
                    // });

                    let index = 0;
                    shape.animate(() => {
                        index++;
                        if (index > 9) {
                            index = 0;
                        }
                        const res = {
                            lineDash,
                            lineDashOffset: -index,
                        };
                        return res
                    },
                    {
                        repeat: true,
                        duration: 3000,
                    },);
                }
            },'circle');
            graph.on('click', (ev) => {
                if (ev.item._cfg.id === 'standard' || ev.item._cfg.id === 'http') {
                    self.$store.commit('businessMonitor.changeServeListType', 2) // 2:国标共享网关、国标接入网关
                    self.$store.commit('businessMonitor.changeCurrentServeListType', 2)
                } else if (ev.item._cfg.id === 'stream') {
                    self.$store.commit('businessMonitor.changeServeListType', 3) // 3:流媒体
                    self.$store.commit('businessMonitor.changeCurrentServeListType', 3)
                } else if (ev.item._cfg.id.indexOf('rtsp') > -1) {
                    self.$store.commit('businessMonitor.changeServeListType', 5) // 5: 推送服务
                    self.$store.commit('businessMonitor.changeCurrentServeListType', 5)
                } else {
                    self.$store.commit('businessMonitor.changeServeListType', 4) // 4:其他java通用
                    self.$store.commit('businessMonitor.changeCurrentServeListType', 4)
                }
                self.$router.push('/streamMediaDetails')
            })
            graph.data(self.sourceData)
            graph.render()
        },
    }
}
</script>

<style lang="scss">
#serviceGraphVideo {
    background: '#001120';
    .ant-tabs-bar {
        width: 100%;
    }
}
</style>