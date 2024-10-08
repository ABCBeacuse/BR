import Vue from "vue";
import store from "@/store";

/**
 * 获取 TileLayer 图层
 * @param layerId 图层ID
 * @param path 图层路径
 * @returns {*}
 */
export const creatTileLayer = (layerId, path) => {
    const mapObj = store.getters.getMapObj;
    if (mapObj !== undefined) {
        const layer = mapObj.getLayer(layerId);
        if (layer) {
            return layer;
        }
    }
    return new Vue.prototype.$MapTalk.TileLayer(layerId, {
        'urlTemplate': path,
        repeatWorld: false,
        renderer: 'canvas',
        subdomains: ['a', 'b', 'c', 'd'],
        // 移动缩放时强制渲染
        'forceRenderOnMoving': true,
        'forceRenderOnZooming': true
    })
}

/**
 * 控制一个 TileLayer 的卷帘效果
 *
 * @param mapObj
 * @param layer
 * @param controlDom
 */
export const enableShutter = (mapObj, layer, controlDom) => {
    if (layer === undefined) {
        return;
    }
    const renderer = layer.getRenderer();
    const canvasGetter = renderer.getCanvasImage;
    renderer.getCanvasImage = () => {
        const dpr = mapObj.getDevicePixelRatio();
        const layerImage = canvasGetter.call(renderer);
        if (!layerImage || !layerImage.image) {
            return layerImage;
        }
        const ctx = renderer.context;
        const width = renderer.canvas.width * (controlDom.firstValue / 100);
        const height = ctx.canvas.height;

        const drawnRect = document.createElement('canvas');
        drawnRect.width = width;
        drawnRect.height = ctx.canvas.height;
        drawnRect.getContext('2d').drawImage(layerImage.image, 0, 0);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.rect(0, 0, width / dpr, height / dpr);
        ctx.fillStyle = '#fff';
        ctx.fill();

        ctx.drawImage(drawnRect, 0, 0, width / dpr, height / dpr);
        layerImage.image = ctx.canvas;
        return layerImage
    }
}