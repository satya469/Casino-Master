import { AXIOS_REQUEST } from './index'
import { toast } from "react-toastify"

export const Againregister = async (user) => {
  const rdata = await AXIOS_REQUEST("users/againusersave", { user })
  return rdata
}

export const changepassword = (user) => {
  return async (dispatch) => {
    const rdata = await AXIOS_REQUEST("users/adminchangepassword", { user }, dispatch)
    if (rdata.status) {
      toast.success("successfully changed")
    } else {
      toast.error(rdata.error)
    }
  }
}

export const profilesave = async (user) => {
  const response = await AXIOS_REQUEST("profile/profilesave", user)
  return response
}