import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        mapObj: undefined,
        currentNewLayer: undefined,
        config: {
            baseId: '',
            newId: ''
        }
    },
    getters: {
        getMapObj: (state) => {
            return state.mapObj;
        },
        getCurrentNewLayer: (state) => {
            return state.currentNewLayer;
        },
        getConfig: (state) => {
            return state.config
        }
    },
    mutations: {
        setMapObj(state, obj) {
            state.mapObj = obj;
        },
        setCurrentNewLayer(state, obj) {
            state.currentNewLayer = obj;
        },
        setConfig(state, obj) {
            state.config = {...obj}
        }
    },
    actions: {},
    modules: {}
})
