<template>
    <div id="img_container"></div>
</template>
<script>
export default {
    name: "ImgContainer",
    data() {
        return {
            map: null
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            const baseLayer = this.creatTileLayer("base_layer", "./tiles/ori/{z}/{y}/{x}.jpg")
            const nowLayer = this.creatTileLayer("now_layer", "./tiles/now/{z}/{y}/{x}.jpg")
            this.map = new this.$MapTalk.Map('img_container', {
                center: [-0.09270712, 51.50615],
                zoom: 17,
                minZoom: 3,
                maxZoom: 6,
                baseLayer,
                layer: [nowLayer]
            })
        },
        /**
         * 获取 TileLayer 图层
         * @param layerId 图层ID
         * @param path 图层路径
         * @returns {*}
         */
        creatTileLayer(layerId, path) {
            return new this.$MapTalk.TileLayer(layerId, {
                'urlTemplate': path,
                subdomains: ['a', 'b', 'c', 'd'],
                // 移动缩放时强制渲染
                'forceRenderOnMoving': true,
                'forceRenderOnZooming': true
            })
        }
    }
}
</script>
<style scoped lang="scss">
#img_container {
  height: 100%;
  width: 100%;
}
</style>