import { combineReducers } from "redux"
import { document } from "./document"
import { limit } from "./limit"
import { notification } from "./notification"
import { sattas } from "./sattas"
import { acocuntstatement } from "./acocuntstatement"
const profileReducers = combineReducers({
    document,
    limit,
    notification,
    sattas,
    acocuntstatement,
})

export default profileReducers
