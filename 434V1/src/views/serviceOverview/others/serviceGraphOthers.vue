<template>
    <div id="serviceGraphOthers">
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
                        x: 150,
                        y: 150,
                        linkPoints: { // 指定矩形周围小圆点
                            bottom: true, // 是否显示下部的圆点
                            size: 11, // 圆点的大小
                            fill: '#00172d', // 圆点的填充色
                            stroke: '#2193FE', // 圆点的边框颜色
                            lineWidth: 1, // 圆点边框的宽度
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 1]
                        ],
                        status: [], // 0:正常 1:异常
                    },
                    {
                        id: "http",
                        label: "http网关服务",
                        x: 150,
                        y: 274,
                        linkPoints: { // 指定矩形周围小圆点
                            bottom: true, // 是否显示下部的圆点
                            size: 11, // 圆点的大小
                            fill: '#00172d', // 圆点的填充色
                            stroke: '#2193FE', // 圆点的边框颜色
                            lineWidth: 1, // 圆点边框的宽度
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0],
                            [0.5, 1]
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    },
                    {
                        id: "auth",
                        label: "鉴权服务",
                        x: 150,
                        y: 398,
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
                            [1, 0.5],
                            [0.5, 1]
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    },
                    {
                        id: "note",
                        label: "短信服务",
                        x: 486,
                        y: 398,
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0, 0.5]
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    },
                    {
                        id: "redis",
                        label: "redis",
                        x: 150,
                        y: 522,
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0]
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    }
                ],
                edges: [
                    {
                        source: "client",
                        target: "http",
                        sourceAnchor: 0, // 该边连入 source 点的第 0 个 anchorPoint
                        targetAnchor: 0, // 该边连入 target 点的第 0 个 anchorPoint
                    },{
                        source: "http",
                        target: "auth",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    },{
                        source: "auth",
                        target: "note",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    },{
                        source: "auth",
                        target: "redis",
                        sourceAnchor: 2,
                        targetAnchor: 0,
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
            const width = document.getElementById('serviceGraphOthers').scrollWidth;
            const graph = new G6.Graph({
                container: 'serviceGraphOthers', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
                // width: 798, // Number，必须，图的宽度
                width, // Number，必须，图的宽度
                height: 675, // Number，必须，图的高度
                // renderer: 'svg',
                fitView: true, // 自适应画布大小
                fitCenter: true,
                fitViewPadding: [30, 40, 40, 20], // 画布四周留白
                autoPaint: true,
                defaultNode: {
                    type: 'rectNode',
                    // type: 'rect',
                    size: [252, 62],
                    style: {
                        radius: 4,
                        fill: '#002343',
                        fillOpacity: 0.7,
                        stroke: '#2193FE',
                        lineWidth: 1,
                    },
                    labelCfg: { // 标签文本配置
                        style: {
                            fill: '#fff',
                            fontFamily: 'Source Han Sans SC',
                        }
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
                //shapeType: 'rect',
                draw: (cfg, group) => {
                    const shape = group.addShape('rect', {
                        attrs: {
                            x: 0, // 矩形左上角的x坐标
                            y: 0, // 矩形左上角的y坐标
                            width: 252,
                            height: 62,
                            // 默认的节点样式
                            radius: 4,
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
                            x:  (cfg.size[0]) / 2,
                            y: 30,
                            text: cfg.label,
                            textAlign: 'center',
                            // 默认的标签配置
                            fill: '#fff',
                            fontSize: 16,
                            fontFamily: 'Source Han Sans SC',
                            cursor: 'pointer',
                        },
                        // zIndex: 2,
                    });
                    
                    return shape
                },
                afterDraw(cfg, group) {
                    for (let i = 0; i < cfg.status.length; i++) {
                        if(cfg.status[i]) { // 异常 画红点
                            const back1 = group.addShape('circle', {
                                attrs: {
                                    x: 20 + 15 * i, // 圆心的x坐标
                                    y: 45, // 圆心的y坐标
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
                                    y: 45, // 圆心的y坐标
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
                                    y: 45, // 圆心的y坐标
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
                                    y: 45, // 圆心的y坐标
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
                                    y: 45, // 圆心的y坐标
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
                                    y: 45, // 圆心的y坐标
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
            },'rect');
            graph.on('click', (ev) => {
                if (ev.item._cfg.id === 'http') {
                    self.$store.commit('businessMonitor.changeServeListType', 2) // 2:国标共享网关、国标接入网关
                    self.$store.commit('businessMonitor.changeCurrentServeListType', 2)
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
#serviceGraphOthers {
    background: '#001120';
    .ant-tabs-bar {
        width: 100%;
    }
}
</style>