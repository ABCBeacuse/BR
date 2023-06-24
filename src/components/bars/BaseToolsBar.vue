<template>
    <div class="base_tool">
        <Roller :is-roller="isRoller"/>
        <div class="bar">
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-button type="primary" @click="rollerMode">卷帘模式<i class="iconfont icon-juanlian"/>
                    </el-button>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" @click="handleShow('baseListShow')">底图选择<i
                            class="iconfont icon-tupian"/></el-button>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" @click="handleShow('markersListShow')">标记调整<i
                            class="iconfont icon-biaoji"/></el-button>
                </el-col>
            </el-row>
        </div>
        <ImgSelectList v-bind:show="baseListShow"/>
        <MarkerList v-bind:show="markersListShow"/>
    </div>
</template>
<script>
import Roller from "@/components/Sliders/Roller";
import ImgSelectList from "@/components/lists/ImgSelectList";
import MarkerList from "@/components/lists/MarkerList.vue";

export default {
    name: 'BaseToolsBar',
    components: {MarkerList, ImgSelectList, Roller},
    data() {
        return {
            isRoller: false,
            baseListShow: false,
            markersListShow: false,
            showArray: [],
            window:["baseListShow", "markersListShow"]
        }
    },
    watch: {
        showArray: {
            handler(newVal) {
                this.window.forEach(item => {
                    this[item] = false
                })
                this[newVal] = true;
            },
            deep: true
        }
    },
    methods: {
        // 开启卷帘模式
        rollerMode() {
            this.isRoller = !this.isRoller;
        },
        handleShow(key) {
            if(this[key]) {
                this[key] = false;
                return;
            }
            this.$set(this.showArray, 0, key);
        }
    }
}
</script>
<style lang="scss">
:root {
  --barWidth: 380px;
}

.base_tool {
  z-index: 1;
  position: fixed;
  width: 100%;
  top: 18px;
  display: flex;
  justify-content: space-evenly;

  .bar {
    display: block;
    position: absolute;
    right: 2%;
    width: var(--barWidth);

    i {
      margin-left: 6px;
    }
  }

  .img_select, .marker_list {
    position: absolute;
    margin-top: 50px;
    right: 2%;
  }
}
</style>