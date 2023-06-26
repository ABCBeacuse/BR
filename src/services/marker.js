import myAxios from "@/plugins/myAxios";
import Vue from "vue";

/**
 * 根据 底图 id 和 新图 id 来获取框选列表信息
 *
 * @param ori_id 底图 id
 * @param new_id 新图 id
 * @returns {Promise<*|*[]>}
 */
export const getMarkersById = async (ori_id, new_id) => {
    const res = await myAxios.get("/re_build/new_info/", {
        params: {
            ori_id,
            new_id
        }
    })
    if (!(res?.coord_list?.length)) {
        Vue.prototype.$notify({
            title: '警告',
            message: '获取标记列表为空',
            type: 'warning'
        });
    }
    return {
        boxes: res?.coord_list ?? [],
        tilesUrl: res?.touming_tile ?? ""
    };
}