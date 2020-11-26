<template>
    <div>
        <!-- <svg width="100%" height="100%" version="1.1" xmln="http://www.w3.org/2000/svg">
            <defs>
            <marker
            id="arrow"
            markerWidth="12"
            markerHeight="12"
            viewBox="0 0 12 12"
            refX="6"
            refY="6"
            orient="auto">
            <path d="M2, 2 L10, 6 L2, 10 L6, 6 L2, 2" style="fill: #000000;"></path>
            </marker>
            </defs>
            <line x1="0" y1="0" x2="200" y2="50" stroke="red" stroke-width="2" marker-red="url(#arrow)"></line>
            <path d="M20, 70 T80, 100 T160, 80 T200, 90" fill="white" stroke="red" stroke-width="2" marker-start="url(#arrow)" marker-mid="url(#arrow)" marker-end="url(#arrow)"></path>
        </svg> -->
        <svg width="100%" height="100%">
            <g transform="translate(0,0) scale(1)">
                <g>
                    <defs>
                        <marker id="triangle" markerUnits="strokeWidth" markerWidth="5" markerHeight="4" refX="0" refY="2" orient="auto" stroke="red">
                            <path d="M 0 0 L 5 2 L 0 4 z" />
                        </marker>
                    </defs>
                    <!-- <path d="M 0,0 L 100,100" stroke="red" stroke-width="2" stroke-dasharray="2, 2" fill="none" -->
                    <path :d="M linePositon.from.x,0 L 100,100" stroke="red" stroke-width="2" stroke-dasharray="2, 2" fill="none"
                        style="marker-end: url(#triangle); fill: #fff" />
                </g>
            </g>
        </svg>
    </div>
</template>

<script>
export default {
    props: ['position'],
    computed: {
        linePositon () {
            return position
        }
    }
}
</script>
