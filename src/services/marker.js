import myAxios from "@/plugins/myAxios";
import Vue from "vue";
import store from "@/store";

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

/**
 * 根据传入的像素点生成矩形框
 *
 * @param markers [ [ , ] ]
 * @param layer 需要将这些标记添加到哪个图层
 */
export const generatorBox = (markers, layer) => {
    let width, height, i = 0;
    const collection = [];
    for (let {point1, point2} of markers) {
        // point1 左上, point2 右下
        point1 = JSON.parse(point1);
        point2 = JSON.parse(point2);
        width = point2[1] - point1[1];
        height = point2[0] - point1[0];
        collection.push(new Vue.prototype.$MapTalk.Rectangle(coordinateToViewPoint(point1), width, height, {
            id: `mark_${i}`,
            symbol: {
                lineColor: '#67C23A',
                lineWidth: 2
            }
        }));
        i++;
    }
    return new Vue.prototype.$MapTalk.GeometryCollection(collection, {}).addTo(layer);
}

/**
 * 像素坐标转换为视图坐标
 *
 * @param coordinate []
 * @returns {*}
 */
const coordinateToViewPoint = (coordinate) => {
    const map = store.getters.getMapObj;
    const point = map?.coordinateToViewPoint(new Vue.prototype.$MapTalk.Coordinate(coordinate));
    const {x, y} = point.toJSON();
    console.log({x, y})
    return [x, y];
}