<template>
    <div class="roller" v-show="isRoller">
        <el-slider ref="slider" v-model="rollerValue" :show-tooltip="false" @input="sliderChange" :min="1"></el-slider>
    </div>
</template>
<script>
import {enableShutter} from "@/utils/layerOptions";

export default {
    name: "RollerSlider",
    props: {
        isRoller: {
            default: false,
            type: Boolean
        }
    },
    computed: {
        map: function () {
            return this.$store.getters.getMapObj
        },
        controlLayer: function () {
            this.hasSet = false;
            return this.$store.getters.getCurrentNewLayer;
        }
    },
    data() {
        return {
            rollerValue: 100,
            hasSet: false
        }
    },
    methods: {
        sliderChange() {
            if (this.controlLayer === undefined) {
                return;
            }
            if (!this.hasSet) {
                enableShutter(this.map, this.controlLayer, this.$refs.slider);
                this.hasSet = true;
            }
            this.controlLayer.getRenderer().setToRedraw();
        }
    }
}
</script>
<style scoped lang="scss">
.roller {
  width: 700px;
  position: fixed;
  bottom: 5%;
}
</style>