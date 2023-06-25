<template>
    <div class="img_select">
        <transition name="el-zoom-in-top">
            <BaseListLayout
                    :has-prefix-select="true"
                    title="底图选择"
                    :table-data="associationList"
                    :table-config="tableConfig"
                    v-show="show"
            >
                <template #prefix>
                    <el-select v-model="baseImage" placeholder="请选择底图" value-key="id" @change="flushBaseMap"
                               clearable>
                        <el-option
                                v-for="(img, index) in baseImages"
                                :key="index"
                                :label="img.pic_name"
                                :value="img"
                        >
                        </el-option>
                    </el-select>
                </template>
                <template #controls="{row}">
                    <el-button type="text" size="small" @click="selectNewMapLayer(row)">选择该图片</el-button>
                </template>
            </BaseListLayout>
        </transition>
    </div>
</template>
<script>

import BaseListLayout from "@/components/lists/BaseList.vue";
import {getBaseMapList} from "@/services/baseMap";
import myAxios from "@/plugins/myAxios";
import {creatTileLayer} from "@/utils/layerOptions";
import {getNewMapListById} from "@/services/newMap";

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
    mounted() {
        this.initBaseMapList()
    },
    data() {
        return {
            baseImage: "",
            baseImages: [],
            associationList: [],
            tableConfig: [{label: "图片名称", prop: "pic_name"}],
            mapObj: undefined,
            currentNewLayer: undefined
        }
    },
    methods: {
        /**
         * 初始化底图信息列表
         * @returns {Promise<void>}
         */
        async initBaseMapList() {
            this.baseImages = await getBaseMapList();
        },
        initMapObj() {
            if (this.mapObj === undefined) {
                this.mapObj = this.$store.getters.getMapObj
            }
        },
        cleanCurrentNewLayer() {
            if (this.currentNewLayer !== undefined) {
                this.mapObj.removeLayer(this.currentNewLayer);
            }
        },
        /**
         * 底图选择
         * @param obj 下拉框选中的底图对象信息
         */
        async flushBaseMap(obj) {
            this.initMapObj();
            this.mapObj.removeBaseLayer();
            // 清除之前基于底图添加的新图图层
            this.cleanCurrentNewLayer();
            if (!obj) {
                this.associationList = [];
                return
            }
            const baseMapUrl = `${myAxios.defaults.baseURL}/${obj.tiles_url}/{z}/{y}/{x}.jpg`;
            const layer = creatTileLayer(`base_${obj.id}`, baseMapUrl);
            this.mapObj.setBaseLayer(layer);
            this.associationList = await getNewMapListById(obj.id);
        },
        /**
         * 新图选择
         * @param row 表格中当前点击行对应的对象信息
         */
        selectNewMapLayer(row) {
            if (!(row?.tiles_url ?? false)) {
                this.$notify({
                    title: '错误',
                    type: "error",
                    message: "所选新图对应的瓦片不存在"
                });
                return;
            }
            this.initMapObj();
            const baseTilesUrl = `${myAxios.defaults.baseURL}/${row.tiles_url}/{z}/{y}/{x}.jpg`;
            // 切换新图图层，需要先清除之前添加的新图图层
            this.cleanCurrentNewLayer();
            this.currentNewLayer = creatTileLayer(`new_${row.id}`, baseTilesUrl);
            this.mapObj.addLayer(this.currentNewLayer);
            this.$store.commit("setCurrentNewLayer", this.currentNewLayer)
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