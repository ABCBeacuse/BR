<template>
    <div id="img_container"></div>
</template>
<script>
import {creatTileLayer} from "@/utils/layerOptions";

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
            const baseLayer = creatTileLayer("base_layer", "./tiles/ori/{z}/{y}/{x}.jpg")
            this.map = new this.$MapTalk.Map('img_container', {
                center: [-0.09270712, 51.50615],
                zoom: 4,
                minZoom: 3,
                maxZoom: 6,
                baseLayer
            })
            this.$store.commit("setMapObj", this.map)
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