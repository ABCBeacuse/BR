<template>
    <div class="roller" v-show="isRoller">
        <el-slider v-model="rollerValue" :show-tooltip="false"></el-slider>
    </div>
</template>
<script>
export default {
    name: "RollerSlider",
    props: {
        isRoller: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            rollerValue: 0
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