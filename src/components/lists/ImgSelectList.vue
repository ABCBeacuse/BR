<template>
    <div class="img_select">
        <transition name="el-zoom-in-top">
            <BaseListLayout
                    :has-prefix-select="true"
                    title="底图选择"
                    :table-data="associationList"
                    v-show="show"
            >
                <template #prefix>
                    <el-select :value="baseImage" placeholder="请选择底图">
                        <el-option
                                v-for="img in baseImages"
                                :key="img.label"
                                :label="img.label"
                                :value="img.value"
                        >
                        </el-option>
                    </el-select>
                </template>
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
    name: "ImgSelectList",
    components: {
        BaseListLayout
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            baseImage: "",
            baseImages: [],
            associationList: []
        }
    }
}
</script>
<style scoped lang="scss">
.img_select {
  .el-select {
    width: 100%;
  }
}
</style>