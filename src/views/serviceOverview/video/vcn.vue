<template>
    <div id="vcn">
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
                        x: 100,
                        y: 10,
                        size: [382, 44],
                        linkPoints: { // 指定矩形周围小圆点
                            bottom: true, // 是否显示下部的圆点
                            size: 11, // 圆点的大小
                            fill: '#00172d', // 圆点的填充色
                            stroke: '#2193FE', // 圆点的边框颜色
                            lineWidth: 1, // 圆点边框的宽度
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.328, 1],
                            [0.043, 1],
                        ],
                        status: [], // 0:正常 1:异常
                    },
                    {
                        id: "http",
                        label: "http网关服务",
                        x: 150,
                        y: 115,
                        size: [150, 44],
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
                            [0.5, 1]
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    },
                    {
                        id: "auth",
                        label: "鉴权服务3A",
                        x: 150,
                        y: 220,
                        size: [150, 44],
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
                            [0.5, 1],
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    },
                    {
                        id: "list",
                        label: "列表服务",
                        x: 335,
                        y: 220,
                        size: [150, 44],
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
                        id: "redis",
                        label: "redis",
                        x: 150,
                        y: 335,
                        size: [337, 44],
                        linkPoints: { // 指定矩形周围小圆点
                            right: true, // 是否显示右侧的圆点
                            bottom: true, // 是否显示下部的圆点
                            size: 11, // 圆点的大小
                            fill: '#00172d', // 圆点的填充色
                            stroke: '#2193FE', // 圆点的边框颜色
                            lineWidth: 1, // 圆点边框的宽度
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.224, 0],
                            [0.77, 0],
                        ],
                        status: [0, 0], // 0:正常 1:异常
                    },
                    {
                        id: "vcn",
                        label: "VCN",
                        x: 100,
                        y: 440,
                        size: [150, 44],
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 1],
                            [0.1, 0],
                        ],
                        status: [0, 0], // 0:正常 1:异常
                    },
                    {
                        id: "camera",
                        label: "镜头",
                        x: 100,
                        y: 545,
                        size: [150, 44],
                        linkPoints: { // 指定矩形周围小圆点
                            right: true, // 是否显示右侧的圆点
                            bottom: true, // 是否显示下部的圆点
                            size: 11, // 圆点的大小
                            fill: '#00172d', // 圆点的填充色
                            stroke: '#2193FE', // 圆点的边框颜色
                            lineWidth: 1, // 圆点边框的宽度
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0]
                        ],
                        status: [0, 0], // 0:正常 1:异常
                    },
                    // {
                    //     id: "image",
                    //     img: '../../../assets/img/serviceOverview/shower.png',
                    //     type: "image",
                    //     x: 50,
                    //     y: 20,
                    //     size: [30, 10],
                    //     label: 'image',
                        
                    //     // style: {
                    //     //     fill: '#fa8c16',
                    //     // },
                    //     labelCfg: {
                    //         position: 'bottom'
                    //     }
                    // },
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
                        target: "auth",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    },
                    {
                        source: "auth",
                        target: "list",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    },
                    {
                        source: "auth",
                        target: "redis",
                        sourceAnchor: 2,
                        targetAnchor: 0,
                    },
                    {
                        source: "list",
                        target: "redis",
                        sourceAnchor: 1,
                        targetAnchor: 1,
                    },
                    {
                        source: "camera",
                        target: "vcn",
                        sourceAnchor: 0,
                        targetAnchor: 0,
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
                    {
                        source: "vcn",
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
            const width = document.getElementById('vcn').scrollWidth;
            // const height = document.getElementById('vcn').scrollHeight;
            const graph = new G6.Graph({
                container: 'vcn', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
                width, // Number，必须，图的宽度
                // width: 798, // Number，必须，图的宽度
                // height, // Number，必须，图的高度
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
                    size: [310, 44],
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
                            fontSize: 16,
                            fontFamily: 'Source Han Sans SC',
                        },
                    },
                    // anchorPoints: [0, 0],
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
                    // const color = cfg.dots[0].error ? '#FF2828' : '20FACE';
                    const shape = group.addShape('rect', {
                        attrs: {
                            x: 0, // 矩形左上角的x坐标
                            y: 0, // 矩形左上角的y坐标
                            width: cfg.size[0],
                            height: 44,
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
                            y: 25,
                            text: cfg.label,
                            textAlign: 'center',
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
                    // const circle = group.addShape('image', {
                    //     attrs: {
                    //         x: startPoint.x,
                    //         y: startPoint.y,
                    //         width: 3,
                    //         height: 10,
                    //         img: '../../../../assets/img/serviceOverview/shower.png'
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
                    //     // transform-origin: 100% 0,
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
#vcn {
    background: '#001120';
    .ant-tabs-bar {
        width: 100%;
    }
}
</style>