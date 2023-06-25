<template>
    <div class="list_layout">
        <div class="select_prefix" v-if="hasPrefixSelect">
            <div class="title">
                {{ title }}
            </div>
            <slot name="prefix"></slot>
        </div>
        <div class="dashed" v-if="hasPrefixSelect"></div>
        <div class="list_main">
            <div class="title">
                汇总列表
            </div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    highlight-current-row
                    :cell-style="{'text-align': 'center','height': '40px'}"
                    :header-cell-style="{'text-align': 'center'}"
                    max-height="350"
            >
                <el-table-column
                        v-for="column in tableConfig"
                        :key="column.label"
                        :label="column.label"
                        :prop="column.prop"
                        :width="column.width ?? ''"
                >
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="100"
                >
                    <template v-slot:default="scope">
                        <slot name="controls" :row="scope.row"></slot>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name: "BaseListLayout",
    props: {
        hasPrefixSelect: {
            type: Boolean,
            default: false
        },
        title: {
            type: String
        },
        tableData: {
            type: Array,
            default: () => []
        },
        tableConfig: {
            type: Array,
            default: () => [{
                label: "默认",
                prop: "default",
            }]
        }
    }
}
</script>
<style scoped lang="scss">
.list_layout {
  width: calc(var(--barWidth) - 60px);
  border-radius: 4px;
  background-color: white;
  padding: 10px 30px 30px 30px;

  .select_prefix {
    margin-bottom: 28px;
  }

  .title {
    color: rgba(0, 0, 0, .85);
    font-weight: 500;
    font-size: 14px;
    padding: 5px 0 10px 0;
  }

  .dashed {
    border-top: 2px dashed #eee;
    margin: 15px 0;
  }
}
</style>