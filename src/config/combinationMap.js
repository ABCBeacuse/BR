/**
 * 标记调整部分，组合对应 tag 信息
 *
 * @type {{nono: {text: string, type: string}, okno: {text: string, type: string}, okok: {text: string, type: string}, nook: {text: string, type: string}}}
 */
export const combinationMap = {
    nono: {type: "danger", text: "请选择底图和新图", visibility: 'visible'},
    okno: {type: "warning", text: "请选择新图", visibility: 'visible'},
    nook: {type: "warning", text: "请选择底图", visibility: 'visible'},
    okok: {type: "success", text: "底图和新图选择完毕", visibility: 'hidden'}
}