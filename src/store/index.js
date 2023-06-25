import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        mapObj: undefined,
        currentNewLayer: undefined
    },
    getters: {
        getMapObj: (state) => {
            return state.mapObj;
        },
        getCurrentNewLayer: (state) => {
            return state.currentNewLayer;
        }
    },
    mutations: {
        setMapObj(state, obj) {
            state.mapObj = obj;
        },
        setCurrentNewLayer(state, obj) {
            state.currentNewLayer = obj;
        }
    },
    actions: {},
    modules: {}
})
