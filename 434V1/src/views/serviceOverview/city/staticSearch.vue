<template>
    <div id="staticSearch">
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
                        id: "videoNet",
                        label: "视频专网",
                        x: 170,
                        y: 20,
                        size: [262, 30],
                        type: 'image',
                        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAAcCAYAAACH+sFIAAAABHNCSVQICAgIfAhkiAAAAz9JREFUeF7tnU9u1DAUxp/jxElZd1EWcIIuQCxg2Z4EjoE4AHCMIg4yww6QQIgjAFIRB2AS27HRSzWjNnE8/eeEqb4s8xSN/JvvfZO85zcRx89feQoci3evReg8zoEACOw+gbG8Fxzwwh33l7g8ebvc/WVjBSAAAiECRy9eHvXPC58tOkPA3QBEAwIgwF5wdUPYP/RldY9Elg0IeueoqVdUVnuIgw/00SMwR37UPz5e+tH/WoYgDx577z2psgpaqjGaeOGIg09IINBH2vywRpM7l3/JDaF88NQ39V9SqqRM5sNfAe8JcfCBPubNj0JVJKWk5IZQPXzmrTHUtrZ7NAgdrTVkLeLgA33Mlh/GkKr2qPn5Ke0jAxsCPzLoZkW5VCSL4V0CQ+BaQi4LxMEn+KMBfaTND93UlGWS7OmX9IbA33BrLRnTUFdgFMPPdK0lrREHH+hjlvxwjoyuyf/5Po0hsCmwC3G3oShUuMCoGyIhEAcf6CNAwCTPj5ra39+mM4RLtVGaFZVlpA2JOPhAH+Nt+pvmx6/P0xkCm16/zdE3Qqs1OT/ehkQcfKCPdPkxSZfhfNJzgZHbjEVRkszH25CIgw/0MX1+TG4IZwVGbjMaUnzrFygwcgHSWo04+EAfE+fHLIawbjNKmVNeFMECErcpswxx8IE+QgmSKj9mM4RNm3GkQORc23UlxgqMiIMP9HEL+dHbBpDcEOTBI8/bIoP71HXdnUYcfKCPIQHeF5A8P8TFbQDJDYH2Dz1vieRdUP1j3YZUVTUeb1bd4NPo9YiDD/Rxg/yoSZXl5vrkhpDff+Kds12BMHSctSHbSNxQ/HrEwSemL+jjKvpIbgg87djNMeRqtM2IOPhAH/9HfiQ3BB5u2jbHgHh8zgN8wCc2B3Qb+li3+SeZdlzPMWQio1yF5xi6NoqQkXhN8esRB5+YvqCPrfqYctqxKyBG9llvayNuux7xOF/wAZ9Y/rE+9NTTjvx3WOTdeJsRcfCBPmbNj/b0a9rhpmBrASdBAAR2nsC1/mR151eNBYAACAQJbAyBnB+8tGHx/s0HcAMBELibBPhFLaIVF9/aloll916G0JLx8pa7KQSsCgSYwFje/wN89LScFD2AsAAAAABJRU5ErkJggg==',
                        labelCfg: {
                            style: {
                                fill: '#ce7617',
                                y: -9
                            },
                        },
                        tag: true,
                        status: [], // 0:正常 1:异常
                    },
                    {
                        id: "policeNet",
                        label: "公安网",
                        x: 536,
                        y: 20,
                        size: [262, 30],
                        type: 'image',
                        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAAcCAYAAACH+sFIAAAABHNCSVQICAgIfAhkiAAAAz9JREFUeF7tnU9u1DAUxp/jxElZd1EWcIIuQCxg2Z4EjoE4AHCMIg4yww6QQIgjAFIRB2AS27HRSzWjNnE8/eeEqb4s8xSN/JvvfZO85zcRx89feQoci3evReg8zoEACOw+gbG8Fxzwwh33l7g8ebvc/WVjBSAAAiECRy9eHvXPC58tOkPA3QBEAwIgwF5wdUPYP/RldY9Elg0IeueoqVdUVnuIgw/00SMwR37UPz5e+tH/WoYgDx577z2psgpaqjGaeOGIg09IINBH2vywRpM7l3/JDaF88NQ39V9SqqRM5sNfAe8JcfCBPubNj0JVJKWk5IZQPXzmrTHUtrZ7NAgdrTVkLeLgA33Mlh/GkKr2qPn5Ke0jAxsCPzLoZkW5VCSL4V0CQ+BaQi4LxMEn+KMBfaTND93UlGWS7OmX9IbA33BrLRnTUFdgFMPPdK0lrREHH+hjlvxwjoyuyf/5Po0hsCmwC3G3oShUuMCoGyIhEAcf6CNAwCTPj5ra39+mM4RLtVGaFZVlpA2JOPhAH+Nt+pvmx6/P0xkCm16/zdE3Qqs1OT/ehkQcfKCPdPkxSZfhfNJzgZHbjEVRkszH25CIgw/0MX1+TG4IZwVGbjMaUnzrFygwcgHSWo04+EAfE+fHLIawbjNKmVNeFMECErcpswxx8IE+QgmSKj9mM4RNm3GkQORc23UlxgqMiIMP9HEL+dHbBpDcEOTBI8/bIoP71HXdnUYcfKCPIQHeF5A8P8TFbQDJDYH2Dz1vieRdUP1j3YZUVTUeb1bd4NPo9YiDD/Rxg/yoSZXl5vrkhpDff+Kds12BMHSctSHbSNxQ/HrEwSemL+jjKvpIbgg87djNMeRqtM2IOPhAH/9HfiQ3BB5u2jbHgHh8zgN8wCc2B3Qb+li3+SeZdlzPMWQio1yF5xi6NoqQkXhN8esRB5+YvqCPrfqYctqxKyBG9llvayNuux7xOF/wAZ9Y/rE+9NTTjvx3WOTdeJsRcfCBPmbNj/b0a9rhpmBrASdBAAR2nsC1/mR151eNBYAACAQJbAyBnB+8tGHx/s0HcAMBELibBPhFLaIVF9/aloll916G0JLx8pa7KQSsCgSYwFje/wN89LScFD2AsAAAAABJRU5ErkJggg==',
                        labelCfg: {
                            style: {
                                fill: '#ce7617',
                                y: -9
                            },
                        },
                        tag: true,
                        status: [], // 0:正常 1:异常
                    },
                    {
                        id: "web",
                        label: "城市人像WEB",
                        x: 105,
                        y: 95,
                        linkPoints: { // 指定矩形周围小圆点
                            right: true, // 是否显示右侧的圆点
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
                        id: "backNginx",
                        label: "人像后台Nginx",
                        x: 105,
                        y: 170,
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0],
                            [0.5, 1],
                        ],
                        status: [0, 0, 0, 0], // 0:正常 1:异常
                    },
                    {
                        id: "backServer",
                        label: "城市人像后台服务",
                        x: 105,
                        y: 245,
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0],
                            [0.2, 1],
                            [0.786, 1],
                            [1, 0.5],
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    }, {
                        id: "base",
                        label: "数据库",
                        x: 96,
                        y: 324,
                        size: [76, 44],
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0]
                        ],
                        status: [0, 0], // 0:正常 1:异常
                    }, {
                        id: "redis",
                        label: "redis",
                        x: 180,
                        y: 324,
                        size: [76, 44],
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0]
                        ],
                        status: [0, 0], // 0:正常 1:异常
                    }, {
                        id: "boundary",
                        label: "视频专网>公安网边界",
                        x: 275,
                        y: 245,
                        size: [170, 44],
                        boundary: true,
                        style: {
                            stroke: '#1AD4CD',
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0, 0.5],
                            [1, 0.5],
                        ],
                        status: [], // 0:正常 1:异常
                    }, {
                        id: "nginx1",
                        label: "边界映射Nginx",
                        x: 468,
                        y: 245,
                        size: [131, 44],
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0, 0.5],
                            [0.5, 1],
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    }, {
                        id: "static",
                        label: "静态人像服务",
                        x: 468,
                        y: 322,
                        size: [131, 44],
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0],
                            [0.2, 1],
                            [0.832, 1],
                        ],
                        status: [1, 0], // 0:正常 1:异常
                    }, {
                        id: "base1",
                        label: "数据库",
                        x: 456,
                        y: 403,
                        size: [76, 44],
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0]
                        ],
                        status: [0, 0], // 0:正常 1:异常
                    }, {
                        id: "redis1",
                        label: "redis",
                        x: 540,
                        y: 403,
                        size: [76, 44],
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 0]
                        ],
                        status: [0, 0], // 0:正常 1:异常
                    },
                    {
                        id: "boundarystart",
                        label: "",
                        x: 360,
                        y: 0,
                        size: [0, 0],
                        labelCfg: {
                            fillOpacity: 1,
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 1]
                        ],
                        status: [], // 0:正常 1:异常
                    },
                    {
                        id: "boundaryend",
                        label: "",
                        x: 360,
                        y: 450,
                        size: [0, 0],
                        labelCfg: {
                            fillOpacity: 1,
                        },
                        anchorPoints: [ // 该节点可选的连接点集合
                            [0.5, 1]
                        ],
                        status: [], // 0:正常 1:异常
                    },
                ],
                edges: [
                    {
                        source: "web",
                        target: "backNginx",
                        sourceAnchor: 0, // 该边连入 source 点的第 0 个 anchorPoint
                        targetAnchor: 0, // 该边连入 target 点的第 0 个 anchorPoint
                    }, {
                        source: "backNginx",
                        target: "backServer",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    }, {
                        source: "backServer",
                        target: "base",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    }, {
                        source: "base",
                        target: "backServer",
                        sourceAnchor: 0,
                        targetAnchor: 1,
                    }, {
                        source: "backServer",
                        target: "redis",
                        sourceAnchor: 2,
                        targetAnchor: 0,
                    }, {
                        source: "redis",
                        target: "backServer",
                        sourceAnchor: 0,
                        targetAnchor: 2,
                    }, {
                        source: "backServer",
                        target: "boundary",
                        sourceAnchor: 3,
                        targetAnchor: 0,
                    }, {
                        source: "boundary",
                        target: "nginx1",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    }, {
                        source: "nginx1",
                        target: "static",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    }, {
                        source: "nginx1",
                        target: "static",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    }, {
                        source: "static",
                        target: "base1",
                        sourceAnchor: 1,
                        targetAnchor: 0,
                    }, {
                        source: "base1",
                        target: "static",
                        sourceAnchor: 0,
                        targetAnchor: 1,
                    }, {
                        source: "static",
                        target: "redis1",
                        sourceAnchor: 2,
                        targetAnchor: 0,
                    }, {
                        source: "redis1",
                        target: "static",
                        sourceAnchor: 0,
                        targetAnchor: 2,
                    },
                    {
                        source: "boundarystart",
                        target: "boundaryend",
                        sourceAnchor: 0, // 该边连入 source 点的第 0 个 anchorPoint
                        targetAnchor: 0, // 该边连入 target 点的第 0 个 anchorPoint
                        type: 'line-dash',
                        style: {
                            stroke: '#1B5B96',
                            lineWidth: 1,
                        },
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
            const width = document.getElementById('staticSearch').scrollWidth;
            const graph = new G6.Graph({
                container: 'staticSearch', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
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
                    size: [144, 44],
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
                            y: 0, // 矩形左上角的y坐标cfg.size[0]
                            width: cfg.size[0],
                            height: cfg.size[1],
                            // 默认的节点样式
                            radius: 4,
                            fill: '#002343',
                            fillOpacity: cfg.labelCfg.fillOpacity ? 0 : .7,
                            stroke: (cfg.labelCfg.fillOpacity || cfg.tag) ? 'transparent' : (cfg.style.stroke ? cfg.style.stroke : '#2193FE'),
                            lineWidth: 1,
                            label: cfg.label,
                            cursor: 'pointer',
                            // backgroundSize: 'contain',
                        },
                        draggable: true,
                    });
                    // 里面的那层
                    group.addShape('text', {
                        attrs: {
                            x: (cfg.size[0]) / 2,
                            y: cfg.tag ? 18 : (cfg.boundary ? cfg.size[1] / 2 + 6 : (cfg.size[1]) / 3.5 * 2),
                            text: cfg.label,
                            textAlign: 'center',
                            // 默认的标签配置
                            fill: (cfg.labelCfg && cfg.labelCfg.style && cfg.labelCfg.style.fill) ? cfg.labelCfg.style.fill : '#fff',
                            fontSize: 12,
                            fontFamily: 'Source Han Sans SC',
                            cursor: 'pointer',
                        },
                        // zIndex: 2,
                    });
                    if (cfg.tag) { // 节点为网络a
                        //shape.attr('fill', 'p(n)data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAAcCAYAAACH+sFIAAAABHNCSVQICAgIfAhkiAAAAz9JREFUeF7tnU9u1DAUxp/jxElZd1EWcIIuQCxg2Z4EjoE4AHCMIg4yww6QQIgjAFIRB2AS27HRSzWjNnE8/eeEqb4s8xSN/JvvfZO85zcRx89feQoci3evReg8zoEACOw+gbG8Fxzwwh33l7g8ebvc/WVjBSAAAiECRy9eHvXPC58tOkPA3QBEAwIgwF5wdUPYP/RldY9Elg0IeueoqVdUVnuIgw/00SMwR37UPz5e+tH/WoYgDx577z2psgpaqjGaeOGIg09IINBH2vywRpM7l3/JDaF88NQ39V9SqqRM5sNfAe8JcfCBPubNj0JVJKWk5IZQPXzmrTHUtrZ7NAgdrTVkLeLgA33Mlh/GkKr2qPn5Ke0jAxsCPzLoZkW5VCSL4V0CQ+BaQi4LxMEn+KMBfaTND93UlGWS7OmX9IbA33BrLRnTUFdgFMPPdK0lrREHH+hjlvxwjoyuyf/5Po0hsCmwC3G3oShUuMCoGyIhEAcf6CNAwCTPj5ra39+mM4RLtVGaFZVlpA2JOPhAH+Nt+pvmx6/P0xkCm16/zdE3Qqs1OT/ehkQcfKCPdPkxSZfhfNJzgZHbjEVRkszH25CIgw/0MX1+TG4IZwVGbjMaUnzrFygwcgHSWo04+EAfE+fHLIawbjNKmVNeFMECErcpswxx8IE+QgmSKj9mM4RNm3GkQORc23UlxgqMiIMP9HEL+dHbBpDcEOTBI8/bIoP71HXdnUYcfKCPIQHeF5A8P8TFbQDJDYH2Dz1vieRdUP1j3YZUVTUeb1bd4NPo9YiDD/Rxg/yoSZXl5vrkhpDff+Kds12BMHSctSHbSNxQ/HrEwSemL+jjKvpIbgg87djNMeRqtM2IOPhAH/9HfiQ3BB5u2jbHgHh8zgN8wCc2B3Qb+li3+SeZdlzPMWQio1yF5xi6NoqQkXhN8esRB5+YvqCPrfqYctqxKyBG9llvayNuux7xOF/wAZ9Y/rE+9NTTjvx3WOTdeJsRcfCBPmbNj/b0a9rhpmBrASdBAAR2nsC1/mR151eNBYAACAQJbAyBnB+8tGHx/s0HcAMBELibBPhFLaIVF9/aloll916G0JLx8pa7KQSsCgSYwFje/wN89LScFD2AsAAAAABJRU5ErkJggg==');
                        // shape.attr('backgroundSize', 'contain')
                        // shape.attr('height', 30)
                    }
                    return shape
                },
                afterDraw(cfg, group) {
                    for (let i = 0; i < cfg.status.length; i++) {
                        if (cfg.status[i]) { // 异常 画红点
                            const back1 = group.addShape('circle', {
                                attrs: {
                                    x: 20 + 15 * i, // 圆心的x坐标
                                    y: 35, // 圆心的y坐标
                                    r: 1, // 圆的半径
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
                                    r: 1, // 圆的半径
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
                                    r: 1, // 圆的半径
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
                                    r: 1, // 圆的半径
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
                                    r: 1, // 圆的半径
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
                                    r: 1, // 圆的半径
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
            }, 'rect');
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
                        });
                }
            }, 'circle');
            graph.on('click', (ev) => {
                if (ev.item._cfg.id === 'base' || ev.item._cfg.id === 'base1') {
                    self.$store.commit('businessMonitor.changeServeListType', 1) // 改变服务类型 1:数据库
                    self.$store.commit('businessMonitor.changeCurrentServeListType', 1)
                } else if (ev.item._cfg.id !== 'boundary') {
                    self.$store.commit('businessMonitor.changeServeListType', 4) // 改变服务类型 4:其他java通用
                    self.$store.commit('businessMonitor.changeCurrentServeListType', 4)
                } else {
                    return
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
#staticSearch {
    background: "#001120";
    .ant-tabs-bar {
        width: 100%;
    }
}
</style>