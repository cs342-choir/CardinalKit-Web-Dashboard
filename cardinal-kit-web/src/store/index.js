import { createStore } from 'vuex'
import modules from './modules'

export default createStore({
  modules:modules,
  actions:{
    reset({commit}){
      Object.keys(modules).forEach(moduleName => {
        commit(`${moduleName}/RESET`);
      })
    }
  }
})
