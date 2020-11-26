<template>
    <div id="serviceTabsOthers">
        <a-tabs
            class="title-tabs"
            :default-active-key="0"
            :tab-position="tabPosition"
            :style="{height: '100%'}"
            @change="onChangeTabs">
            <a-tab-pane
                v-for="(item, index) in this.$store.state.businessMonitor.tabsVal"
                :key="index"
                :tab="item.name">
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
export default {
    // props: ['tabsVal'],
    data() {
        return {
            tabPosition: 'left',
        }
    },
    methods: {
        // 切换tabs
        onChangeTabs(key) {
            this.$emit('handleTabsChangeItem', key)
        },
    },
}
</script>

<style lang="scss">
#serviceTabsOthers {
    margin-top: 1rem;
    .ant-tabs-left-bar {
        width: 100%;
        float: right;
        .ant-tabs-tab {
            text-align: left;
        }
        .ant-tabs-tab {
            padding-left: 1rem;
        }
        .ant-tabs-tab-active {
            background: #00182E;
        }
    }
}
</style>