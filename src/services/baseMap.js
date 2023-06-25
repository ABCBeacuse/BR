import myAxios from "@/plugins/myAxios";

/**
 * 获取底图列表
 * @returns {Promise<*|*[]>}
 */
export const getBaseMapList = async () => {
    const res = await myAxios.get("/re_build/ori/");
    if (res?.result.length === 0) {
        this.$notify({
            title: '警告',
            message: '获取底图列表为空',
            type: 'warning'
        });
    }
    return res?.result ?? [];
}