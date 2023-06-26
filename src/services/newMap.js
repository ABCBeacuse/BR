import myAxios from "@/plugins/myAxios";
import Vue from "vue";

/**
 * 根据选中的底图，来获取与底图相关的新图列表
 * @param ori_id
 * @returns {Promise<*|*[]>}
 */
export const getNewMapListById = async (ori_id) => {
    const res = await myAxios.get("/re_build/ori_info/",{
        params: {
            ori_id
        }
    })
    if (res?.result.length === 0) {
        Vue.prototype.$notify({
            title: '警告',
            message: '获取该底图相关新图列表为空',
            type: 'warning'
        });
    }
    return res?.result ?? [];
}