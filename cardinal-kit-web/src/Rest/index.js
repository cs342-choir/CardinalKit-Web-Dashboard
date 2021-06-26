import * as firebaseRest from './firebase'
import * as apiRest from './api'

export default process.env.VUE_APP_AUTH_MODE == "firebase"?firebaseRest:apiRest