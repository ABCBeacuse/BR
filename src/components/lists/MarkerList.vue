<template>
    <div class="marker_list">
        <transition name="el-zoom-in-top">
            <div class="marker_main" v-show="show">
                <el-tag v-if="tagMes.visibility === 'visible'" class="tip" :type="tagMes?.type">{{
                    tagMes?.text
                    }}
                </el-tag>
                <el-tooltip class="item" effect="light" placement="right" v-if="tagMes.visibility === 'hidden'">
                    <template v-slot:content>
                        <div class="tip_body">
                            <div style="padding-bottom: 5px;" v-for="(tip, index) in tips">
                                <i :class="tip.class" :key="index"/>
                                {{ tip.text }}
                            </div>
                        </div>
                    </template>
                    <i class="el-icon-info tip" style="top: 16px;"/>
                </el-tooltip>
                <BaseListLayout
                        :table-data="markersList"
                >
                    <template #controls="{row}">
                        <el-button type="text" size="small"><i class="el-icon-aim"/></el-button>
                        <el-button type="text" size="small"><i class="el-icon-edit-outline"/></el-button>
                        <el-button type="text" size="small"><i class="el-icon-delete"/></el-button>
                    </template>
                </BaseListLayout>
            </div>
        </transition>
    </div>
</template>
<script>
import BaseListLayout from "@/components/lists/BaseList.vue";
import {combinationMap} from "@/config/combinationMap";
import {getMarkersById} from "@/services/marker";
import {creatTileLayer} from "@/utils/layerOptions";
import myAxios from "@/plugins/myAxios";

export default {
    name: "MarkerList",
    components: {BaseListLayout},
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ids: function () {
            return this.$store.getters.getConfig;
        },
        mapObj: function () {
            return this.$store.getters.getMapObj;
        }
    },
    watch: {
        ids: function (newVal) {
            this.tagMes = {...this.renderElTags(newVal.baseId, newVal.newId)};
            this.flushMarkersList(newVal)
        }
    },
    data() {
        return {
            markersList: [],
            currentTilesLayer: undefined,
            tagMes: combinationMap["nono"],
            tips: [{class: 'el-icon-aim', text: "定位"}, {
                class: 'el-icon-edit-outline',
                text: "编辑"
            }, {class: 'el-icon-delete', text: "删除"}]
        }
    },
    methods: {
        initMapObj() {
            if (this.mapObj === undefined) {
            }
        },
        renderElTags(baseId, newId) {
            const combination = (baseId === "" ? "no" : "ok") + (newId === "" ? "no" : "ok")
            return combinationMap[combination];
        },
        async flushMarkersList(obj) {
            const {baseId, newId} = obj;
            if (baseId !== "" && newId !== "") {
                const {boxes, tilesUrl} = await getMarkersById(baseId, newId);
                const baseMapUrl = `${myAxios.defaults.baseURL}/${tilesUrl}/{z}/{y}/{x}.jpg`;
                // 列表
                this.markersList = boxes;
                // 添加透明结果图层
                this.currentTilesLayer = creatTileLayer(`mark_${baseId}_${newId}`, baseMapUrl);
                this.mapObj.addLayer(this.currentTilesLayer);
            } else {
                this.markersList = [];
                if (this.currentTilesLayer !== undefined) {
                    this.mapObj.removeLayer(this.currentTilesLayer);
                }
                this.currentTilesLayer = undefined;
            }
        }
    }
}
</script>
<style scoped lang="scss">
.marker_list {
  .tip {
    position: absolute;
    top: 6px;
    right: 29px;
  }
}
</style>