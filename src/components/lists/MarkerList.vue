<template>
    <div class="marker_list">
        <transition name="el-zoom-in-top">
            <BaseListLayout
                    :table-data="markersList"
                    v-show="show"
            >
                <template #options>
                    <el-button type="text" size="small">选择</el-button>
                </template>
            </BaseListLayout>
        </transition>
    </div>
</template>
<script>
import BaseListLayout from "@/components/lists/BaseList.vue";

export default {
    name: "MarkerList",
    components: {BaseListLayout},
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            markersList: []
        }
    }
}
</script>
<style scoped lang="scss">

</style>