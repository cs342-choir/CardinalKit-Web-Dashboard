const modules = {
    'user':require('./user').default ,
    'auth': (process.env.VUE_APP_AUTH_MODE == "firebase")? require('./authFirebase').default:require('./authApi').default
};
export default modules;